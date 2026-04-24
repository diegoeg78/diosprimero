# Dios Primero — Local Corpus Architecture v1

**Thesis:** ship a big-enough, varied-enough local database of NT-based
unlock responses. Call Haiku only on edge cases. Result: ~95% of unlocks
are instant, offline, and free.

---

## 1 · Why local-first

| Dimension | Live-only (Haiku each call) | Local-first (DB + Haiku edge) |
|---|---|---|
| Latency | 800–1500ms | <50ms |
| Offline | Broken | Works fully |
| Cost @ 300 calls/mo | ~$0.48/user | ~$0.03/user |
| Privacy (mood text) | Leaves device | Stays local (except edge) |
| API dependency | Hard | Soft (graceful degrade) |
| Variety | Theoretically infinite | 30–50 per topic (plenty) |
| Moderation / safety | Per-call | Audited once per batch |

The product doesn't need infinite variety. It needs **relevant** variety —
enough that a user doesn't see the same response twice in a month.

---

## 2 · Corpus schema

One file per language, bundled with the APK.

```
assets/corpus/
  unlock_es.json     # ~800 KB, ~600 entries
  unlock_pt.json     # ~800 KB, ~600 entries
```

**Entry shape:**

```json
{
  "id": "anx_014",
  "topic": "anxiety",
  "verse_ref": "Juan 14:27",
  "verse_testament": "NT",
  "verse_book_category": "gospel",
  "mood_tags": ["ansiedad", "preocupación", "noche", "trabajo"],
  "time_bias": "any",              // "morning" | "night" | "any"
  "advice": "La ansiedad no desaparece porque abras Instagram — solo se posterga. Jesús no te pide que apagues tu cabeza; te ofrece una paz distinta a la del mundo. Antes de hacer scroll, respira. Lo que pesa ya está en sus manos.",
  "prayer": "Jesús, vengo con la mente llena. Recíbela, con el trabajo y todo. Déjame tu paz. Amén.",
  "weight": 1.0                    // editorial boost; default 1.0
}
```

Verse text itself is still resolved from the PD bible corpus at render time
(Section 4.5 of the Haiku Prompts doc). This file holds only: reference +
advice + prayer + routing metadata.

---

## 3 · Topic taxonomy (16 core NT themes)

Each topic maps to dominant NT passages. Keep the list tight so each topic
gets enough entries.

| # | Topic | NT anchors |
|---|---|---|
| 1 | **rest** (cansancio) | Mat 11:28-30 · Mc 6:31 · 2Co 12:9 |
| 2 | **anxiety** (ansiedad) | Jn 14:27 · Fil 4:6-7 · 1Pe 5:7 · Mat 6:25-34 |
| 3 | **emptiness** (vacío) | Jn 4:13-14 · Jn 10:10 · Ef 3:19 |
| 4 | **guilt** (culpa) | 1Jn 1:9 · Ro 8:1 · Jn 8:11 · Lc 15 |
| 5 | **loneliness** (soledad) | Mat 28:20 · Heb 13:5 · Jn 14:18 |
| 6 | **sadness** (tristeza) | Mat 5:4 · Jn 16:20 · 2Co 1:3-4 |
| 7 | **fear** (miedo) | Jn 14:1 · 2Ti 1:7 · 1Jn 4:18 · Mat 14:27 |
| 8 | **anger** (enojo) | Stg 1:19-20 · Ef 4:26-27 · Col 3:13 |
| 9 | **joy** (alegría) | Fil 4:4 · Stg 1:17 · Ro 12:12 |
| 10 | **motivation** (motivación) | Fil 3:13-14 · Heb 12:1-2 · Gá 6:9 |
| 11 | **doubt** (duda) | Jn 20:27 · Mc 9:24 · Stg 1:5-6 |
| 12 | **temptation** (tentación) | 1Co 10:13 · Mat 26:41 · Stg 4:7 |
| 13 | **gratitude** (gratitud) | 1Ts 5:18 · Col 3:17 · Ef 5:20 |
| 14 | **purpose** (propósito) | Ef 2:10 · Ro 12:1-2 · Mat 5:14-16 |
| 15 | **patience** (paciencia) | Ro 12:12 · Stg 5:7-8 · Gá 5:22 |
| 16 | **trust** (confianza) | Pr 3:5-6* · Jn 10:27-28 · Ro 8:28 |

\* Pr 3:5-6 is OT but so central to the topic that it's the one permitted OT
entry in that bucket. Max 15% OT across the corpus as per the rule.

**Target entries per topic:** 35 (avg) → 560 entries total per language.

---

## 4 · Variety target per topic

```
35 entries × 3 time biases (morning / night / any) × 2 languages ≈ 2,100 variants
Per topic → user can cycle ~35 variants before any repeat.
At 2 unlocks per topic per week → ~17 weeks to exhaust.
Repeat tolerance: after 30 days, a verse can reappear.
```

Combine with per-user `recent_refs` + `recent_advice_ids` tracking (last 20
shown) and rotation feels fresh indefinitely.

---

## 5 · Matching logic (mood_text → topic)

Two-stage, both on-device.

### Stage 1 — Keyword regex (fast, explainable)

```
ANXIETY    /ansios|nervios|preocup|no puedo parar|cabeza llena|estrés/i
REST       /cansad|agotad|sin fuerza|quemad|burned? out|exhaust/i
GUILT      /culpa|me arrepiento|hice algo malo|pecad|vergüenza/i
SADNESS    /triste|lloro|depri|solo quiero dormir|desanimad/i
LONELINESS /solo|sola|nadie|abandonad|aislad/i
FEAR       /miedo|tengo temor|asustad|pánic|no puedo más/i
ANGER      /enojad|molest|rabia|furio|bronca|raiva/i
JOY        /feliz|alegr|content|agradec|grato|grata/i
DOUBT      /no sé si|duda|no creo|no lo siento|dónde está Dios/i
TEMPTATION /tentad|caer|no debería|me jala|otra vez/i
GRATITUDE  /gracias|agradec|bendecid|no merezco/i
PURPOSE    /no sé qué hacer|para qué|propósito|vacío sin rumbo/i
PATIENCE   /esperand|no viene|tarda|no aguanto más|ya/i
TRUST      /confiar|no puedo confiar|por qué|por qué Dios/i
MOTIVATION /tengo que|vamos|hoy sí|empezar de nuevo|fuerzas/i
EMPTINESS  /vací|sin sentido|sin ganas|nada me llena|aburrid/i
```

Mirror for PT-BR with equivalents (`ansios|preocup|cabeça cheia...` etc.).

Run all patterns, pick the one with the most matches. Tiebreaker by weight.

### Stage 2 — Emoji fallback (when no keyword fires or input is emoji only)

```
😔 → sadness | loneliness       (pick more recent-used less)
😟 → anxiety | fear
😐 → emptiness | rest
🙂 → gratitude | trust
😊 → joy | gratitude
🔥 → motivation | purpose
```

### Stage 3 — Semantic fallback (optional v2)

If stage 1+2 find nothing confident, use a small on-device embedding model
(MiniLM ~80MB, or Apple/Google's built-in on-device text embedders) to
compare mood_text to each topic's centroid. Threshold < 0.3 cosine → call
Haiku instead (see §7).

---

## 6 · Selection within a topic — DETERMINISTIC (no LLM, no randomness)

Once the topic is picked, the selection is a pure function of:
the user's state + the entry's last-shown timestamp + stable entry IDs.

Same inputs → same entry. Always. Testable, debuggable, predictable.

```python
def pick_entry(bucket: str, ctx: UserContext) -> Entry:
    # 1. All entries in this bucket
    entries = corpus.by_bucket[bucket]

    # 2. Hard filter: cooldown
    RECENT_ENTRY_WINDOW = 30   # last N entry IDs shown
    RECENT_VERSE_WINDOW = 30   # last N verse refs shown
    COOLDOWN_DAYS = 45         # an entry can repeat only after 45 days

    candidates = [
        e for e in entries
        if e.id not in ctx.recent_ids[-RECENT_ENTRY_WINDOW:]
        and e.verse_ref not in ctx.recent_refs[-RECENT_VERSE_WINDOW:]
        and (ctx.now - e.last_shown_at).days >= COOLDOWN_DAYS
    ]

    # 3. If filter empties the pool, relax in three steps
    if not candidates:
        candidates = [e for e in entries
                      if e.id not in ctx.recent_ids[-10:]]
    if not candidates:
        candidates = [e for e in entries
                      if e.verse_ref not in ctx.recent_refs[-10:]]
    if not candidates:
        candidates = entries  # full pool, signal a soft-repeat

    # 4. Deterministic scoring — higher = better
    def score(e: Entry) -> tuple:
        time_match = 1 if e.time_bias == ctx.time_of_day else 0
        any_bias  = 1 if e.time_bias == "any" else 0
        tone_penalty = -1 if e.tone in ctx.recent_tones[-3:] else 0
        fav_verse_match = (
            1 if ctx.favorite_jesus_phrase_ref
                 and e.verse_ref == ctx.favorite_jesus_phrase_ref
            else 0
        )
        lru_rank = -e.last_shown_at.timestamp()  # older = higher
        # Tuple sort: time_match > fav_verse > lru > weight > id (stable tiebreak)
        return (
            time_match,
            fav_verse_match,
            any_bias,
            tone_penalty,
            lru_rank,
            e.weight,
            -hash(e.id),  # deterministic tiebreak
        )

    return max(candidates, key=score)
```

**Properties:**
- **Pure function** of `(bucket, user_context, corpus)` — no randomness.
- **LRU-biased**: least-recently-shown entries float to the top.
- **Verse-diversity guaranteed** by the `recent_refs` cooldown window.
- **No seed, no shuffle, no LLM call.** Runs in ~1ms.
- **Fully testable** — write a fixture of context + corpus, assert a
  specific entry is returned.

---

### Why not randomness?

- Random pools need seed management (reproducible bugs are hard).
- Two unlocks 30 seconds apart with the same mood should yield the
  *same* entry in the grace window — random would thrash.
- When we ship the corpus, we want to audit: "for this persona +
  this bucket, what's the top 5?" Deterministic makes that possible.
- If an entry is broken, we can find exactly which users will see it
  next — random can't.

### Why not an LLM ranker?

- Every unlock would cost ~$0.001 in Haiku fees → $0.30–0.90/user/month
  at scale; deterministic is $0.
- 500–800ms latency per unlock → >95% on deterministic is <10ms.
- Offline would break. Deterministic works on a plane.
- The corpus is already human-reviewed. Ranking doesn't need intelligence
  to match emotion → bucket → entry; it needs consistency.

The LLM earns its keep in the *one-time* corpus generation. Runtime is
just code.

---

## 7 · When to call Haiku (the "occasional" part)

Haiku is called in these cases only:

1. **Crisis signal** (regex pre-check caught it). Always Haiku so the
   response is tuned to the exact wording.
2. **No topic matched** (stage 1 + 2 found nothing, stage 3 below threshold).
   Haiku gets a free-form shot.
3. **Corpus exhausted for this topic** (user has seen all 35 variants in
   the last 14 days — unusual, implies very heavy use of one emotion).
4. **Streak milestones** (day 7, 30, 100) — generate a personal message
   tied to their journey.
5. **Developer kill-switch turned on** (remote config) — always Haiku,
   e.g. to test new prompt versions.

Expected rate: **~3–7% of unlocks.** At 300 calls/mo typical user → ~15–20
Haiku calls → **~$0.03/month per user** in LLM cost.

---

## 8 · Corpus generation pipeline (Haiku as author, not live inference)

The corpus isn't hand-written — Haiku (or a larger model like Sonnet for
better prose) generates it **offline**, reviewed by a human, committed to
the repo.

### Pipeline

```text
# Input per batch:
topic = "anxiety"
target_count = 40
language = "es-LA"
avoid_refs = [already-covered in corpus for this topic]

# Generate:
for i in range(target_count):
    response = client.messages.create(
        model="claude-sonnet-4-6",   # bigger model for corpus authoring
        system=CORPUS_AUTHOR_PROMPT,
        messages=[{
            "role": "user",
            "content": json.dumps({
                "topic": topic,
                "language": language,
                "avoid_refs": avoid_refs,
                "index": i,
                "time_bias_target": ["morning","night","any"][i % 3]
            })
        }]
    )
    entry = parse(response)
    avoid_refs.append(entry["verse_ref"])
    candidates.append(entry)

# Human review step:
# - Discard duplicates in spirit (similar advice wording)
# - Fix tone issues
# - Verify NT citation is correct
# - Commit to corpus file
```

### `CORPUS_AUTHOR_PROMPT` (different from runtime prompt)

Much looser on latency, much stricter on uniqueness and editorial voice.
Asks for: one verse ref + one advice + one prayer + mood_tags + time_bias.
Specifies: "make this distinct from the following N entries on the same
topic: [paste prior advice bodies]."

### Review SLA

- Generate 50% more than target (if target = 40, generate 60 → cherry-pick
  best 40).
- Theology reviewer (1 person, 1h per topic) signs off.
- Ship to corpus file with a version stamp.

### Cadence

- v1 ship: full corpus authored over 2–3 weeks
- Quarterly refresh: add 5 entries per topic, retire 2 low-performing ones
  (tracked by user dismissal rate if we add telemetry)

---

## 9 · Storage / bundle size impact

| File | Size |
|---|---|
| `unlock_es.json` (~600 entries) | ~800 KB |
| `unlock_pt.json` (~600 entries) | ~800 KB |
| `nt_rv1909_es.json` (NT verses) | ~180 KB |
| `nt_tb1917_pt.json` (NT verses) | ~190 KB |
| Total added to APK | **~2 MB** |

Negligible. Google Play Store APK budget is 150 MB for base + expansion.

---

## 10 · Updated cost projection

| Usage profile | Calls/mo | Local hits (95%) | Haiku calls (~5%) | **Monthly $/user** |
|---|---|---|---|---|
| Light (3/day) | 90 | 85 × $0 | 5 × $0.00235 | **~$0.012** |
| Typical (10/day) | 300 | 285 × $0 | 15 × $0.002 | **~$0.03** |
| Heavy (20/day) | 600 | 570 × $0 | 30 × $0.002 | **~$0.06** |

Drop of **~90%** vs live-only Haiku.

At $49.99/year ($4.17/month): **COGS ratio <1.5% even for heavy users** →
gross margin 98%+.

Remaining variable cost shifts toward one-time corpus authoring:

- 16 topics × 40 entries × 2 languages = 1,280 entries
- Per entry via Sonnet: ~$0.005 (author + review cycles)
- **Total corpus seed cost: ~$6–10 one-time.**
- Quarterly refresh: ~$1.

---

## 11 · Edge cases & guardrails

- **Language drift in mood_text** (user writes in English inside es-LA
  locale): stage-1 keywords miss → stage-3 embeddings → Haiku. Acceptable.
- **Gibberish input** ("asdfghj"): no match at any stage → Haiku with
  an "unintelligible" instruction → falls back to a generic "vengan a mí
  los cansados" entry. Log for QA.
- **Repeated identical mood_text within 10 min**: dedupe, return the same
  response (don't burn a new variant or a Haiku call).
- **Holiday / seasonal**: v2 can add `season_bias` tag (Adviento, Semana
  Santa, Navidad) — not needed for MVP.
- **Cross-topic moods** ("estoy cansado y ansioso"): stage-1 keyword match
  returns multiple; pick the one with more hits or let Haiku decide. An
  alternative is a "combo" topic with pre-authored combos — probably
  overkill for v1.

---

## 12 · Open decisions

- **Embedding model on device?** MiniLM ~80MB APK impact. Defer to v2
  unless users report generic matches.
- **Telemetry on dismissal/"show another"?** Helps find weak entries
  but means we log per-entry impressions. Likely yes, but anonymized.
- **Allow user to favorite a response?** Would enable a future "mis
  versículos" tab and give us implicit quality labels.
- **Corpus updates: OTA vs app update?** JSON file OTA is trivial; check
  Play Store policy on content updates without a new APK.
