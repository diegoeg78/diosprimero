# Dios Primero — Haiku Ranker Architecture v1

**Design:**
1. One-time: Sonnet 4.6 authors ~2,500 curated entries → bundled as the
   "initial cache" in the APK.
2. At runtime: Haiku 4.5 reads the user's mood + a small filtered slice
   of the cache, picks the single best entry by ID.
3. Client renders the full entry from local storage.

This replaces "regex picks bucket → random pick" with "Haiku picks the
right entry for the right moment" — which is the marketing promise
made literal.

---

## 1 · Runtime flow

```
User opens Instagram
    ↓
Dios Primero intercepts (AccessibilityService)
    ↓
Screen: "Cuéntale a Jesús cómo te sientes"
    ↓
User types mood_text (or picks emoji)
    ↓
[On-device pre-filter]   ~5ms, free
    - Match keywords + emoji → top 2–3 candidate buckets
    - Pull top 4 entries from each bucket by recency/weight
    - Result: ~10–12 candidates
    ↓
[Haiku ranker call]   ~500–800ms, ~$0.0014
    - Input: system prompt (cached) + mood + candidate metadata
    - Output: {chosen_id, reason}
    ↓
[Render locally from cache]   <50ms, free
    - Look up full entry by id
    - Substitute verse text from PD bible corpus
    - Show verse + advice + prayer
    ↓
User taps "Amén, desbloquear"
```

---

## 2 · On-device pre-filter (why it matters)

Sending all 1,250 per-locale entries to Haiku every call would cost
~$0.20/unlock. Unworkable. The pre-filter narrows to ~12 candidates
while preserving choice.

### Filter stages

```python
def prefilter(mood_text, emoji, user_ctx) -> list[EntryMeta]:
    # Stage 1 — keyword regex: score every bucket
    bucket_scores = score_buckets_by_keywords(mood_text)
    top_buckets = top_n(bucket_scores, n=3)

    # Stage 2 — emoji fallback if no strong keyword
    if max(bucket_scores.values()) < THRESHOLD:
        top_buckets = emoji_to_buckets(emoji) or ["rest_physical"]

    # Stage 3 — life-moment override (time, streak, first-unlock)
    if user_ctx.streak == 1:
        top_buckets = ["moment_first_unlock", *top_buckets]
    elif now.hour < 7 or now.hour >= 22:
        top_buckets = ["moment_night", *top_buckets][:3]
    # Stage 4 — pull candidates, filter out recent
    candidates = []
    for bucket in top_buckets[:3]:
        entries = corpus.entries_for(bucket)
        entries = [e for e in entries if e.id not in user_ctx.recent_ids[-20:]]
        candidates.extend(entries[:4])  # top 4 by weight per bucket

    return candidates[:12]  # hard cap
```

**Output:** up to 12 candidate entries, each carrying only
`{id, verse_ref, tone, situation_hint, mood_tags, time_bias}` —
not the full advice/prayer text. This keeps the Haiku call small.

---

## 3 · Candidate metadata format (compact, token-efficient)

Each candidate is sent to Haiku as a one-line summary (~50 tokens):

```
id=anx_night_03 · verse=Mateo 6:34 · tone=gentle · time=night · sit="11pm, la cabeza ya corre mañana" · tags=[ansiedad,noche,trabajo]
```

Haiku does NOT need the full advice/prayer text. It only needs enough
to judge relevance. The full text stays on device.

12 candidates × ~50 tokens = **~600 tokens of candidate data per call**.

---

## 4 · Haiku ranker system prompt (cacheable)

```text
You are the dispatcher for "Dios Primero" / "Deus Primeiro", an app that
offers a pre-written verse, reflection, and prayer for the user's exact
moment.

Your job: from a list of candidate entries, pick the ONE that best fits
the user's current mood, time, and context.

You do NOT generate content. You do NOT write verses or prayers. You
pick an existing entry by ID.

INPUT you receive:
  - mood_text: what the user typed (free text, may be empty)
  - mood_emoji: optional
  - time_of_day, streak_day, app_being_unlocked
  - favorite_jesus_phrase_ref (from onboarding)
  - candidates: a list of entry summaries (id, verse_ref, tone,
    situation_hint, time_bias, mood_tags)
  - recent_refs: last 5 verse references shown to this user
  - recent_tones: last 5 tones used

SELECTION RULES:

1. Pick the entry whose `situation_hint` most closely matches what the
   user is expressing — specificity beats generality.
2. Prefer entries whose `time_bias` matches the current time_of_day,
   unless mood strongly overrides.
3. Avoid any entry whose `verse_ref` is in `recent_refs`.
4. Avoid repeating the last tone when possible (variety > streak of
   gentle entries, for example).
5. If the user's mood_text contains crisis signals (self-harm, suicide,
   acute despair), return `{"chosen_id": null, "crisis": true}` — the
   client will route to the crisis path.
6. If no candidate is a clean fit (all feel generic for this mood),
   return `{"chosen_id": "<best_available_id>", "fit_score": <0.0-1.0>}`
   with a fit_score below 0.4 to signal the client could show a "try
   another" option.

OUTPUT (strict JSON, no prose):

{
  "chosen_id": "anx_night_03",
  "reason": "short phrase, ≤15 words, for logging only",
  "fit_score": 0.85,
  "crisis": false
}

RULES:
- Output only JSON. No markdown, no fences, no explanation.
- Always include all four fields.
- `reason` is internal — the user never sees it.
- Never invent an ID not in the candidates list.
```

---

## 5 · Example call

**Input (compact):**

```json
{
  "mood_text": "no puedo dormir, la cabeza sigue con el trabajo",
  "mood_emoji": "😟",
  "time_of_day": "23:40",
  "streak_day": 12,
  "app_being_unlocked": "Instagram",
  "favorite_jesus_phrase_ref": "Juan 14:27",
  "recent_refs": ["Mateo 11:28", "1 Pedro 5:7"],
  "recent_tones": ["comforting", "gentle"],
  "candidates": [
    "id=anx_night_03 · verse=Mateo 6:34 · tone=gentle · time=night · sit='11pm, la cabeza ya corre mañana' · tags=[ansiedad,noche,trabajo]",
    "id=anx_night_07 · verse=Juan 14:1 · tone=direct · time=night · sit='corazón turbado, no deja descansar' · tags=[ansiedad,noche]",
    "id=anx_work_02 · verse=Filipenses 4:6 · tone=practical · time=any · sit='presión laboral' · tags=[ansiedad,trabajo]",
    "id=rest_mental_05 · verse=Mateo 11:29 · tone=comforting · time=any · sit='cabeza que no para' · tags=[cansancio,mental]",
    "..."
  ]
}
```

**Output:**

```json
{
  "chosen_id": "anx_night_03",
  "reason": "exact match: night + work + racing mind",
  "fit_score": 0.91,
  "crisis": false
}
```

Client then renders entry `anx_night_03` from local cache.

---

## 6 · Token economics per call

Using Claude Haiku 4.5 pricing: input $1/MTok, output $5/MTok, cache
read $0.10/MTok, cache write $1.25/MTok.

| Component | Tokens | Cold cost | Warm cost |
|---|---|---|---|
| System prompt (cached) | ~1,000 | $0.0010 (write) | $0.0001 (read) |
| User context | ~200 | $0.0002 | $0.0002 |
| 12 candidate summaries | ~600 | $0.0006 | $0.0006 |
| Output JSON | ~80 | $0.0004 | $0.0004 |
| **Total** | ~1,880 in / 80 out | **~$0.0022** | **~$0.0013** |

With 70% warm cache hit rate (users unlock in bunches), blended average:
**~$0.0016 per call.**

---

## 7 · Monthly cost per user

| Profile | Calls/mo | Cost |
|---|---|---|
| Light (3/day) | 90 | **~$0.14** |
| Typical (10/day) | 300 | **~$0.48** |
| Heavy (20/day) | 600 | **~$0.96** |

This is **higher** than the pure-local architecture ($0.03/mo typical)
because Haiku fires on every unlock. But it's roughly the **same** as
pure-Haiku-generation — with major upsides:

- Content was human-reviewed before ship (safety)
- Offline fallback works (weighted random from filtered pool)
- Latency 500–800ms vs 800–1500ms for generation
- Verse text comes from PD corpus (licensing clean)
- Marketing promise is real, not hand-wavy

---

## 8 · Margin check by region

Net revenue per paid user (annual plan, after Google 15% fee):

| Region | Annual | Net/mo | Typical COGS | **Margin typical** | Heavy COGS | **Margin heavy** |
|---|---|---|---|---|---|---|
| US | $29.99 | $2.12 | $0.48 | **77%** | $0.96 | **55%** |
| Brasil | R$ 49,90 (~$10) | $0.71 | $0.48 | **32%** | $0.96 | **neg −35%** |
| México | M$ 299 (~$15) | $1.06 | $0.48 | **55%** | $0.96 | **9%** |
| Argentina | $12.99 | $0.92 | $0.48 | **48%** | $0.96 | **−4%** |
| Perú | S/ 39,90 (~$10) | $0.71 | $0.48 | **32%** | $0.96 | **neg** |

**Problem:** heavy users in LatAm markets are break-even or loss-making
at these LLM costs.

### Fixes (pick one or combine)

**A. Daily unlock cap on Haiku path**
- First 10 unlocks/day → Haiku-ranked
- After 10 → weighted random local (free)
- Cuts heavy-user cost to ~$0.48 (capped at typical)
- Users barely notice — after 10 unlocks the emotional state is usually the same

**B. Confidence-gated hybrid**
- High-confidence keyword match → local weighted random (free)
- Ambiguous / emoji-only / multi-bucket → Haiku ranker
- Expected split: 40% local free / 60% Haiku
- Typical user cost drops from $0.48 → $0.29

**C. Smaller candidate pool (6 instead of 12)**
- Cuts per-call cost by ~30%
- Typical drops to ~$0.34/mo
- Tradeoff: less variety in Haiku's options, but still plenty

**D. All three combined**
- Pre-filter → 8 candidates (compact)
- Confidence gate → 60% Haiku / 40% local
- Daily cap → 15/day on Haiku path
- **Typical cost: ~$0.18/mo**
- **Heavy cost: ~$0.32/mo**
- Brasil typical margin: 75%, heavy margin: 55% ✓

---

## 9 · Recommended settings (Option D — the sane default)

| Parameter | Value |
|---|---|
| Candidates sent to Haiku | 8 |
| Keyword confidence threshold for local-only | 2+ matches in single bucket |
| Haiku daily cap per user | 15 |
| Beyond cap | local weighted random within filtered bucket |
| Offline fallback | local weighted random, flagged with "offline" note |
| Cache TTL (dedupe identical inputs) | 10 minutes |

---

## 10 · Fallback behavior

Haiku fails (timeout, API error, offline):

```python
def fallback_pick(candidates, user_ctx):
    # Weighted random, biased by: weight, time_bias match,
    # inverse of tags-overlap with recent
    pool = filter_by_time_bias(candidates, user_ctx.time_of_day)
    pool = filter_by_recent_tones(pool, user_ctx.recent_tones)
    return weighted_random(pool, key="weight")
```

User sees the exact same quality response — just no AI "choice"
behind it. They don't know the difference. Latency <50ms.

---

## 11 · Crisis handling (unchanged)

Local regex pre-check runs BEFORE Haiku:

```
ES: (no quiero (vivir|seguir|estar)|me quiero (matar|morir)|acabar con (todo|mi vida)|sin sentido|no vale la pena)
PT: (não quero (viver|mais|estar)|me matar|acabar com (tudo|minha vida)|não vale a pena|sem sentido)
```

If triggered → full-screen crisis takeover (helpline + curated verse +
brief prayer). Haiku is NOT called in crisis path — response must be
predictable and audited.

---

## 12 · Summary comparison

| Approach | Content source | Runtime cost typical | Marketing promise | Offline |
|---|---|---|---|---|
| Pure local (regex) | Curated cache | ~$0.03/mo | Weak — random within bucket | ✓ |
| **Haiku ranker (this doc)** | Curated cache + Haiku picks | **~$0.18–0.48/mo** (by settings) | **Strong — "AI picks the right prayer"** | ✓ (fallback) |
| Pure Haiku generation | Live LLM | ~$0.48/mo | Strong but content-risk | ✗ |

**Recommended:** Haiku ranker with Option D settings.

---

## 13 · One-time setup cost recap

| Step | Cost |
|---|---|
| Sonnet 4.6 authors corpus (2,500 entries, batched) | **~$35** |
| Human review (1 reviewer × ~40h × $25/h) | ~$1,000 |
| Bundle corpus + bible PD files into APK | free |
| **Total to ship** | **~$1,035** |

Review is the big line item if you outsource. If you (or a trusted
community member) review yourself, corpus ships for **~$35 in API
fees + your time.**

---

## 14 · Next concrete steps

1. Generate `bucket_spec.json` — the 50 bucket definitions (descriptions,
   tone targets, time biases, sample mood_tags) — so Sonnet has its
   inputs.
2. Write `generate_corpus.py` — Python script that batches Sonnet calls,
   dedupes, writes JSON.
3. Write `rank_at_runtime.py` — the Haiku ranker client with pre-filter,
   candidate compaction, and fallback.
4. Build the review UI (simple HTML page) — accept/fix/discard per entry.
5. QA the first 200 entries end-to-end before generating the rest.
