# Dios Primero — Corpus Generation Prompt v1

**Author model:** `claude-opus-4-7` (Opus 4.7, 1M context)
**Runtime model:** not used at inference for 95% of unlocks — only rare edge cases
**Tagline:** **"La oración correcta para el momento correcto."** / **"A oração certa para o momento certo."**

---

## 1 · Positioning — "the right prayer for the right moment"

Every other prayer app offers generic devotionals. Dios Primero is different
because the prayer you receive is *precisely tuned* to what you're feeling,
what time of day it is, what app you're about to open, and where you are
in your journey.

For this to be true (not just a tagline), the local corpus must:

1. **Cover every common emotional state and life situation** a user brings
   to the unlock screen.
2. **Have enough variation within each state** that the right prayer feels
   specific, not recycled.
3. **Be editorially distinct** — each entry reads like it was written for
   *this exact person in this exact moment*.

That's why we use **Opus 4.7** to author. Haiku or Sonnet can't hold the
level of editorial voice and theological precision we need across ~2,000+
entries.

---

## 2 · Expanded emotion taxonomy (40 states + 10 life-moments = 50 buckets)

### Emotional states (40)

**Cluster A — Exhaustion / Fatigue (4)**
- `rest_physical` — body is tired
- `rest_mental` — mind won't stop, burned out from work/study
- `rest_emotional` — drained from caring for others
- `rest_spiritual` — feel distant from God, going through motions

**Cluster B — Anxiety (6)**
- `anx_general` — free-floating
- `anx_work` — deadline, meeting, performance
- `anx_money` — bills, finances, scarcity
- `anx_health` — own or loved one's
- `anx_future` — "what if", uncertainty
- `anx_night` — 2 AM spiral

**Cluster C — Sadness / Grief (4)**
- `sad_general`
- `grief_loss` — loss of person
- `grief_relationship` — breakup, distance
- `melancholy` — no reason, heavy fog

**Cluster D — Loneliness (3)**
- `lonely_physical` — alone, no one around
- `lonely_relational` — surrounded but unseen
- `lonely_spiritual` — feel abandoned by God

**Cluster E — Guilt / Shame (4)**
- `guilt_specific` — did something today
- `guilt_relapse` — fell into same thing again
- `shame_past` — haunted by old actions
- `shame_identity` — "I'm bad / I don't deserve"

**Cluster F — Fear (4)**
- `fear_failure`
- `fear_rejection`
- `fear_death` — self or loved one
- `fear_unknown` — change, transition, big decision

**Cluster G — Anger / Frustration (3)**
- `anger_at_person` — someone wronged me
- `anger_at_situation` — injustice, impotence
- `anger_at_self` — disappointment in self

**Cluster H — Emptiness / Purpose (3)**
- `emptiness_general` — hollow, numb
- `purpose_lost` — don't know what I'm doing with my life
- `boredom_existential` — nothing excites me

**Cluster I — Doubt (3)**
- `doubt_god_exists`
- `doubt_god_hears` — silence
- `doubt_worth` — "does it matter if I pray?"

**Cluster J — Temptation (3)**
- `temptation_impulse` — scroll, porn, gossip, substance
- `temptation_recurring` — same fight, again
- `temptation_compromise` — small moral shortcut

**Cluster K — Positive states (3)**
- `joy` — grateful, happy
- `gratitude_specific` — something good just happened
- `hope_renewed` — just came through something hard

### Life-moment states (10)

These override the emotion when the user's context (time, app, behavior)
is more salient than their mood.

- `moment_morning` — first unlock of the day
- `moment_night` — last unlock before bed
- `moment_sunday` — Sunday, church/misa context
- `moment_before_difficult` — user wrote about a meeting, conversation, exam
- `moment_after_fight` — user wrote about an argument
- `moment_after_bad_news` — user wrote about a loss, diagnosis, rejection
- `moment_weekly_milestone` — streak day 7, 30, 100
- `moment_first_unlock` — day 1, first ever interaction
- `moment_return` — user hasn't opened app in 7+ days
- `moment_celebration` — birthday, anniversary, holiday

**Total buckets:** 50

---

## 3 · Entries per bucket (tiered for variety)

The Bible has enough material to cover any emotion dozens of ways.
We tier allocation so heavy-use buckets get deep variety and niche
buckets stay lean.

**Tier 1 — hot buckets (70 entries each):**
Common daily emotions. Heavy users will hit these most.
- anx_general, anx_night, anx_work, anx_future
- rest_physical, rest_mental
- sad_general, melancholy
- guilt_relapse, shame_identity
- lonely_relational
- temptation_impulse
- gratitude_specific, joy
- moment_morning, moment_night

= **16 buckets × 70 = 1,120 entries**

**Tier 2 — standard buckets (40 entries each):**
Common but less frequent.
- anx_money, anx_health
- grief_loss, grief_relationship, sad_general (variant), rest_emotional, rest_spiritual
- lonely_physical, lonely_spiritual
- guilt_specific, shame_past
- fear_failure, fear_rejection, fear_death, fear_unknown
- anger_at_person, anger_at_situation, anger_at_self
- emptiness_general, purpose_lost, boredom_existential
- doubt_god_exists, doubt_god_hears, doubt_worth
- temptation_recurring, temptation_compromise
- hope_renewed, moment_before_difficult, moment_after_fight, moment_after_bad_news, moment_return

= **~27 buckets × 40 = 1,080 entries**

**Tier 3 — niche / life-moment (20 entries each):**
Edge or rare.
- moment_sunday, moment_weekly_milestone, moment_first_unlock, moment_celebration
- Any seasonal buckets added later (easter, advent, christmas)

= **~7 buckets × 20 = 140 entries**

**Per-language total: ~2,340 entries.**
**Both languages: ~4,680 entries.**

---

### Variety requirements per bucket (STRICT)

For a bucket of 70 entries:
- **Minimum 20 distinct verse references** (was 6)
- **Maximum 4 entries** may cite the same verse (was 6, and only when
  the angle is substantially different)
- **At least 40%** of cited verses must come from outside the Gospels
  (Epistles, Acts, Revelation) — prevents Matthew/John monoculture
- **Tone rotation:** no more than 5 consecutive entries (by creation
  order) share the same tone

For a bucket of 40 entries:
- Minimum 12 distinct verses, max 4 entries per verse
- Same 40% non-Gospel rule

For a bucket of 20 entries:
- Minimum 8 distinct verses, max 3 entries per verse

### Corpus-wide verse coverage target

Across the full corpus (both languages combined), cite **≥ 450 distinct
New Testament verses**. The NT has ~7,957 verses; 450 is ~5.7% — a deep
well with plenty of headroom for v2 expansion.

Track a `verse_coverage_report.json` during generation:

```json
{
  "total_distinct_verses_cited": 487,
  "by_book": { "Mateo": 54, "Juan": 61, "Romanos": 38, ... },
  "overused_verses": [
    { "ref": "Mateo 11:28", "count_across_buckets": 24 }
  ]
}
```

If any verse appears in more than 6 buckets across the corpus, flag
for reviewer — likely we're leaning too hard on crowd-pleasers.

---

### Rotation math (how long before any repeat at runtime)

With this corpus and a `recent_refs` window of 30 entries + 45-day
cooldown per entry:

| Usage profile | Days before any repeat |
|---|---|
| Light (1 unlock/day, anxiety only) | ~70 days |
| Typical (5/day, mix of buckets) | >90 days |
| Heavy (20/day, all anxiety) | ~35 days in same bucket, but mix of verses |

Even a heavy user cycling one emotion sees a fresh verse almost
every time.

---

## 4 · Opus 4.7 system prompt (corpus authoring)

Cacheable across all calls in a batch.

```text
You are the founding editorial voice of "Dios Primero" (ES) / "Deus
Primeiro" (PT-BR), an app that offers a short New Testament verse, a
personal reflection, and a prayer — each carefully matched to what the
user is feeling in the moment.

Marketing promise: "La oración correcta para el momento correcto."
Your job: author that promise.

You are producing a CORPUS of pre-written entries that will live on the
user's phone. Each entry is the "right prayer for a specific moment."
The same user may see several entries in the same bucket over weeks —
so every entry you write must feel distinct, specific, and warm.

OUTPUT FORMAT — STRICT JSON per entry:

{
  "id": "{bucket}_{NN}",
  "bucket": "anx_night",
  "verse_ref": "Juan 14:27",
  "verse_testament": "NT",
  "verse_book_category": "gospel",
  "mood_tags": ["ansiedad", "noche", "trabajo", "no puedo dormir"],
  "time_bias": "night",
  "tone": "comforting",
  "situation_hint": "La persona no puede dormir, la cabeza no para.",
  "advice": "...",
  "prayer": "...",
  "length_report": { "advice_words": 62, "prayer_words": 34 }
}

HARD RULES:

• Language: matches target locale exactly. "es-LA" is LatAm neutro
  (no "vosotros", no "móvil", use "celular"; use "orar" not "rezar").
  "pt-BR" is close Brazilian Portuguese (can use "você", "a gente",
  "pra"; avoid European PT words like "ecrã", "telemóvel").
• Verse must be New Testament unless explicitly told otherwise. Max
  15% of entries across the whole corpus may be OT, and only when
  the OT verse is significantly more apt.
• Verse translations: do NOT include the verse text. Return ONLY the
  reference (book chapter:verse). The client substitutes the wording
  from the licensed corpus (RV1909 ES, TB 1917 PT).
• Never invent verses or paraphrase and present as quote.
• Advice:
  - 40–85 words
  - Speaks TO the user in second person
  - Names the feeling without diagnosing it
  - Connects the feeling to the verse concretely, not abstractly
  - Never shames, never moralizes, never "should"
  - Warm, specific, adult voice — not Hallmark, not sermon
• Prayer:
  - 20–50 words
  - First person (the user's voice)
  - Plain language, conversational
  - Ends with "Amén" (ES) or "Amém" (PT-BR)
• No emojis, max one exclamation point per entry.
• Tone options (pick one per entry, rotate across the bucket):
  contemplative · urgent · comforting · practical · celebratory ·
  honest · gentle · direct
• Denominational neutrality: don't push Marian devotion, saints,
  predestination, prosperity, or charismatic specifics. Stay in
  the shared Christian center.

DISTINCTIVENESS REQUIREMENT:

You will receive `existing_entries_in_bucket` — a list of already-
authored entries in the same bucket. Your new entry must be
MEANINGFULLY different:

- Different verse reference (or same verse but clearly different
  angle, only allowed after 4 different verses are used in that
  bucket)
- Different opening of the advice (don't start the same way)
- Different tone if >3 prior entries share this tone
- Different "situation_hint" — no two entries describe the same
  specific moment

If you cannot produce a meaningfully distinct entry, return:
{"error": "cannot_differentiate", "reason": "..."}
and explain what angles are already covered.

VERSE VARIETY TARGET (per bucket of 25 entries):
- Minimum 6 distinct verse references
- Maximum 6 entries citing the same verse (covering different angles)
- At least 2 references from outside the Gospels (Epistles, Acts)
  when appropriate

OUTPUT:
Return ONLY the JSON entry. No prose outside. No markdown fences.
```

---

## 5 · User message template (per-call)

```json
{
  "locale": "es-LA",
  "bucket": "anx_night",
  "bucket_description": "La persona está ansiosa de noche, usualmente por el trabajo, y no puede apagar la cabeza. Probable usuario entre 22:00–03:00.",
  "tone_target": "comforting",
  "time_bias_target": "night",
  "avoid_verse_refs": ["Mateo 11:28", "Filipenses 4:6"],
  "existing_entries_in_bucket": [
    {"id": "anx_night_01", "verse_ref": "Juan 14:27", "advice_opening": "La ansiedad no desaparece porque..."},
    {"id": "anx_night_02", "verse_ref": "1 Pedro 5:7", "advice_opening": "Lo que cargás esta noche..."},
    ...
  ],
  "index_in_bucket": 3,
  "user_persona_hint": "LatAm neutro, edad 18-45, mezcla de católicos y evangélicos, nivel de español conversacional"
}
```

---

## 6 · Example output (Opus 4.7)

**Bucket:** `anx_night` · **Index:** 3 · **Language:** es-LA

```json
{
  "id": "anx_night_03",
  "bucket": "anx_night",
  "verse_ref": "Mateo 6:34",
  "verse_testament": "NT",
  "verse_book_category": "gospel",
  "mood_tags": ["ansiedad", "noche", "mañana", "lista mental", "preocupación"],
  "time_bias": "night",
  "tone": "gentle",
  "situation_hint": "Son las 11 de la noche y la cabeza ya está corriendo la lista de mañana antes de que el día siquiera empezara.",
  "advice": "Tu cabeza ya está en mañana antes de que mañana empiece. Jesús no te pide que apagues la lista — te pide que sueltes el peso de adelantarla. Lo de hoy llegó con su afán, lo de mañana llegará con el suyo. Ahora mismo, este minuto no pide resolverlo todo. Pide solo entregarlo.",
  "prayer": "Jesús, mi cabeza corrió a mañana otra vez. Tráela de regreso. Tomo este minuto contigo. Mañana viene con vos. Amén.",
  "length_report": { "advice_words": 72, "prayer_words": 31 }
}
```

---

## 7 · Generation pipeline

```text
for each locale in [es-LA, pt-BR]:
  for each bucket in 50 buckets:
    existing = []
    while len(existing) < 25:
      payload = build_user_message(
        locale, bucket, tone_target, avoid_refs_in_existing, existing
      )
      response = opus_47.create(
        system=CORPUS_AUTHOR_PROMPT,  # cached
        user=payload,
        max_tokens=800,
        temperature=0.85   # higher for variety
      )
      entry = parse(response)
      if entry.error: log + break (bucket is full/saturated)
      existing.append(entry)
    emit_bucket_file(locale, bucket, existing)

combine_into_corpus_file(locale, all_buckets)
```

**Parallelization:** buckets are independent. Run 10 concurrently. Full
corpus takes a weekend on a laptop.

---

## 8 · Cost projection (Sonnet 4.6, selected authoring model)

Pricing (2026):
- Input: **$3.00 / MTok**
- Output: **$15.00 / MTok**
- Cache read: **$0.30 / MTok**

Per entry (cached system prompt, growing avoid-list):
- System prompt cache read: ~$0.0008
- User payload: ~$0.0045
- Output: ~$0.009
- **~$0.014 per entry**

Corpus total (expanded for variety):
- ~4,680 entries × $0.014 = **~$66 one-time**

Add ~40% overhead for regeneration of weak entries during review
(higher because we reject more for distinctiveness/verse-diversity
violations):
- **Total budget: ~$95 one-time.**

Quarterly refresh (add 8 entries per bucket × ~50 buckets × 2 locales):
- ~800 entries × $0.014 = **~$12/quarter**

---

## 9 · Human review rubric

Every generated entry gets graded before committing to the corpus.

### Pass criteria (all must hold)

- [ ] JSON parses, schema valid
- [ ] Verse reference is real (check against PD bible corpus)
- [ ] Verse is NT (unless flagged OT exception)
- [ ] Advice is 40–85 words, no moralizing, no shaming
- [ ] Prayer is 20–50 words, first person, ends in Amén/Amém
- [ ] Tone matches `tone_target`
- [ ] Language is locale-correct (no Spain-specific in es-LA, no
      European PT in pt-BR)
- [ ] Entry is meaningfully distinct from others in bucket
- [ ] Theology is within shared Christian center (no Marian,
      prosperity, predestination, charismatic specifics)

### Discard criteria (any triggers discard)

- Made-up or misquoted verse reference
- Advice tells user what to do in life (moralizing)
- Prayer feels like a sermon, not a user's voice
- Tone is saccharine, corporate, or therapist-like
- Word repetition with an existing entry (>30% phrase overlap)
- Uses emojis or more than one exclamation point
- Trigger warning: any response to a crisis-coded input that doesn't
  point to the crisis safety path

### Process

- Reviewer tags each entry: **pass / fix / discard**
- Fixes go back to Opus with specific instructions
- 20% random audit by a second reviewer for calibration
- Sign-off by a theologically-trained reviewer before shipping a
  locale

Target pass rate: **60–70%** first-pass, **>90%** after one fix cycle.

---

## 10 · Runtime detection (cheap, local)

Once the corpus exists, runtime is nearly free.

### Detection stack (all on-device)

1. **Keyword regex** per bucket — fires in < 1ms
2. **Emoji fallback** if no keyword — instant lookup
3. **Time-of-day + streak context** — picks `moment_*` buckets
4. **Semantic fallback** (optional, v2) — MiniLM 80MB on-device
   embedding → cosine distance to each bucket's centroid

If confidence < threshold (or no match at all):
- → call Haiku (the ~5% edge case from corpus architecture doc)

### Detection latency

| Stage | Latency | % of unlocks |
|---|---|---|
| Keyword match | < 5ms | ~80% |
| Emoji fallback | < 1ms | ~10% |
| Context-based (moment_*) | < 5ms | ~5% |
| Semantic / Haiku | 50ms / 800ms | ~5% |

**Total: 95% of unlocks resolve in under 10ms, fully offline, zero LLM cost.**

---

## 11 · The marketing promise, made operational

> **"La oración correcta para el momento correcto."**

What makes this true (not marketing copy):

- **50 buckets** covering every common emotion and life moment
- **25 entries per bucket** × editorial variety across tone, verse,
  structure → feels personal, not templated
- **Context-aware matching** — time of day, streak, app being unlocked,
  prior favorite verse
- **Under 10ms detection** — feels instant, like the app "read" you
- **Opus 4.7 editorial voice** — the warmth comes from the best model
  authoring, not the cheapest model reacting
- **Public-domain verse text** — theological integrity, no licensing risk
- **Curated first, then AI fallback** — 95% of responses were seen by
  a human reviewer before ship

---

## 12 · Deliverables

- [ ] `CORPUS_AUTHOR_SYSTEM_PROMPT.txt` — the block in §4
- [ ] `bucket_spec.json` — 50 buckets with descriptions, tone targets,
      time biases
- [ ] `generation_pipeline.py` — Python script with Opus 4.7 client,
      dedup logic, review queue
- [ ] `reviewer_interface.html` — simple web UI: read entry, choose
      pass/fix/discard, send fixes back to Opus
- [ ] `unlock_es.json` — final corpus, ~800 KB
- [ ] `unlock_pt.json` — final corpus, ~800 KB
- [ ] QA report with stats: verse variety per bucket, tone distribution,
      avg word counts, pass rate

---

## 13 · Open decisions

- Do we want a **`moment_easter` / `moment_advent`** seasonal bucket
  family? Adds 6–8 buckets. Can ship as v1.1 via OTA corpus update.
- Should the corpus include **short audio** of each prayer? Defer —
  TTS on-device or pre-rendered MP3 is a v2 premium feature that
  could justify a higher tier.
- Do we let users **rate entries** to find weak ones? Valuable for
  quarterly refresh but adds telemetry burden. Likely yes, anonymized.
