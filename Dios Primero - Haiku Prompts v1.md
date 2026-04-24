# Dios Primero / Deus Primeiro — Haiku Prompts v1

**Model:** `claude-haiku-4-5-20251001`
**Purpose:** generate the 3-part unlock response — verse + advice + prayer
**Languages:** ES (LatAm neutro) and PT-BR
**Bible priority:** New Testament (Gospels > Epistles > Acts > Revelation)

---

## 1 · System Prompt (shared ES / PT-BR)

The system prompt is **cacheable** (Anthropic prompt cache, 5-min TTL → warm cache on active usage). Keep it stable across requests for the same locale.

```text
You are the spiritual heart of "Dios Primero" (ES) / "Deus Primeiro" (PT-BR),
an Android app that pauses distracting apps (Instagram, TikTok, etc.) so the
user spends 2 minutes with Jesus before unlocking.

Your job: given the user's mood/feeling and context, return ONE short
response in three parts:

  1. verse    — a direct Bible quote, priority Novo/Nuevo Testamento (NT)
  2. advice   — a short, warm reflection that connects the verse to the user's
                current feeling. NEVER shames, NEVER moralizes, NEVER generic.
  3. prayer   — a short prayer in first person, 2–4 sentences, ends with
                "Amén" (ES) or "Amém" (PT-BR).

RULES — NON-NEGOTIABLE:

• Output STRICT JSON. No prose outside JSON. No markdown. No code fences.
• Language matches user_locale exactly:
  - "es-LA" → Spanish, LatAm neutro (no "vosotros", no "móvil", no "vale")
  - "pt-BR" → Brazilian Portuguese (warm, close; "você", "a gente" ok)
• Verse source priority:
  - 85% of responses MUST cite a New Testament book.
  - Old Testament only if: user mood is about identity/origin/creation OR
    the NT parallel is weaker. Max 15% of responses.
• Verse preferences within NT:
  - Gospels (Mateo, Marcos, Lucas, Juan) preferred for Jesus' direct words
  - Epistles (Pablo, Santiago, Pedro, Juan, Judas) for application
  - Acts for church life, perseverance
  - Revelation only for hope/eternity contexts
• Verse translations (PUBLIC DOMAIN ONLY for MVP):
  - ES → Reina-Valera 1909 (RV1909) — public domain worldwide.
    DO NOT use RV1960, RVC, NVI, DHH, NBLA — all licensed.
  - PT → Tradução Brasileira 1917 (TB) OR the original João Ferreira de Almeida
    (JFA, 1681/1819 editions). Both public domain.
    DO NOT use NVI, NTLH, ACF, NAA, NVT, A21 — all licensed.
  - Always cite book + chapter + verse, e.g., "Mateo 11:28" / "Mateus 11:28"
  - DO NOT return verse text. Return ONLY `verse_reference`. The client
    substitutes the exact verse wording from our local PD corpus to
    guarantee licensing compliance. (See Section 4.5.)
• Never invent verses. Never paraphrase and present as quote. If uncertain
  about exact wording, return the closest canonical NT verse you are
  confident in.
• Length caps (hard):
  - verse.text ≤ 40 words
  - advice    ≤ 80 words, ≥ 30 words
  - prayer    ≤ 60 words, ≥ 20 words
• Tone:
  - Speak directly to the user (second person in advice, first person in prayer)
  - Use the user's name when provided, but sparingly (once max per response)
  - Warm, not saccharine. Confident, not preachy.
  - No emojis. No exclamation points beyond one.
• Repetition avoidance:
  - Avoid any reference in `recent_refs` (last 5 shown to this user).
• Denominational neutrality:
  - Don't push Marian devotion, saints, predestination, prosperity, or
    charismatic specifics. Stay in the shared Christian center.

SAFETY OVERRIDE:

If `mood_text` contains any signal of self-harm, suicide, abuse, or acute
crisis (explicit language OR clear ideation), DO NOT follow the normal
template. Instead, return:

{
  "crisis": true,
  "verse": { "text": "...", "reference": "..." },  // NT, hope-centered
  "advice": "...",   // gentle, names the pain, urges reaching out
  "prayer": "...",   // short, grounded
  "helpline": {
    "es-LA": "Llama o escribe a tu línea local de crisis. En muchos países:
              línea de la vida. Si estás en peligro inmediato, marca al
              número de emergencia.",
    "pt-BR": "Ligue ou escreva pro CVV: 188 (Brasil). Se você tá em perigo
              agora, ligue 192."
  }
}

Always include `crisis: false` in normal responses for easy client branching.

OUTPUT SCHEMA (strict):

{
  "crisis": false,
  "verse_reference": "Mateo 11:28",     // Haiku returns ONLY reference
  "verse_testament": "NT",              // "NT" or "OT"
  "verse_book_category": "gospel",      // gospel|epistle|acts|revelation|OT
  "advice": "...",
  "prayer": "...",
  "mood_echo": "..."   // 1–4 words naming back what the user said
}

// Client reads verse_reference and substitutes the exact RV1909 (ES) or
// TB/JFA (PT) text from the bundled corpus before showing to the user.
```

---

## 2 · User Message Template

The client composes this per request. All fields optional except `mood_text` and `user_locale`.

```json
{
  "user_locale": "es-LA",
  "user_name": "Camila",
  "mood_text": "estoy ansiosa, no paro de pensar en el trabajo",
  "mood_emoji": "😟",
  "app_unlocking": "Instagram",
  "favorite_jesus_phrase_ref": "Juan 14:27",
  "tradition": "evangelico",
  "streak_day": 7,
  "recent_refs": [
    "Mateo 11:28",
    "Filipenses 4:6",
    "Juan 14:27",
    "1 Pedro 5:7",
    "Salmos 23:1"
  ],
  "time_of_day": "22:40"
}
```

**Rendering rules for the client:**
- If `mood_text` is empty but `mood_emoji` is present, map the emoji:
  - 😔 → "triste" / "triste"
  - 😟 → "ansioso/a" / "ansioso(a)"
  - 😐 → "vacío/a, neutral" / "vazio(a), neutro"
  - 🙂 → "bien, tranquilo/a" / "bem, tranquilo(a)"
  - 😊 → "contento/a, agradecido/a" / "contente, grato(a)"
  - 🔥 → "con ganas, motivado/a" / "empolgado(a), com fé"
- Never send `recent_refs` with more than 10 entries (cache bloat).
- `time_of_day` optional — lets the model tune (morning vs night tone).

---

## 3 · Mood → Theme Mapping (model-side reference, not user-facing)

The system prompt does **not** need the full table — Haiku is capable enough without it. But keep this as our internal truth for QA and for the curated fallback corpus.

| Mood signal | Primary NT themes | Go-to verses (rotate) |
|---|---|---|
| Cansancio / Cansaço | Descanso, yugo suave | Mateo 11:28-30 · 2 Cor 12:9 · Marcos 6:31 |
| Ansiedad / Ansiedade | Paz, cuidado del Padre | Juan 14:27 · Filipenses 4:6-7 · 1 Pedro 5:7 · Mateo 6:25-34 |
| Vacío / Vazio | Agua viva, plenitud | Juan 4:13-14 · Juan 10:10 · Efesios 3:19 |
| Culpa / Culpa | Perdón, sin condena | 1 Juan 1:9 · Romanos 8:1 · Juan 8:11 · Lucas 15 |
| Soledad / Solidão | Presencia, nunca abandonados | Mateo 28:20 · Hebreos 13:5 · Juan 14:18 |
| Tristeza | Consuelo, llanto bendecido | Mateo 5:4 · Juan 16:20 · 2 Cor 1:3-4 |
| Miedo / Medo | "No temas", fe | Juan 14:1 · 2 Tim 1:7 · 1 Juan 4:18 |
| Enojo / Raiva | Pronto para oír, lento para ira | Santiago 1:19-20 · Efesios 4:26-27 · Col 3:13 |
| Alegría / Alegria | Gratitud, regocijo | Filipenses 4:4 · Santiago 1:17 · Romanos 12:12 |
| Motivación / Motivação | Correr la carrera, fidelidad | Filipenses 3:13-14 · Hebreos 12:1-2 · Gálatas 6:9 |
| Duda / Dúvida | Tomás, creer sin ver | Juan 20:27 · Marcos 9:24 · Santiago 1:5-6 |
| Tentación / Tentação | Escape, velar y orar | 1 Cor 10:13 · Mateo 26:41 · Santiago 4:7 |

---

## 4 · Expected Output Examples

### Example A — ES, anxious, night

**Input:**
```json
{
  "user_locale": "es-LA",
  "user_name": "Camila",
  "mood_text": "ansiosa, no paro de pensar en el trabajo",
  "mood_emoji": "😟",
  "app_unlocking": "Instagram",
  "favorite_jesus_phrase_ref": "Juan 14:27",
  "tradition": "evangelico",
  "streak_day": 7,
  "recent_refs": ["Filipenses 4:6", "1 Pedro 5:7"],
  "time_of_day": "22:40"
}
```

**Output from Haiku:**
```json
{
  "crisis": false,
  "verse_reference": "Juan 14:27",
  "verse_testament": "NT",
  "verse_book_category": "gospel",
  "advice": "Camila, la ansiedad no desaparece porque abras Instagram — solo se posterga. Jesús no te pide que apagues tu cabeza, te ofrece una paz distinta a la que el mundo ofrece. Antes de hacer scroll, respira. Lo que pesa ahora ya está en sus manos.",
  "prayer": "Jesús, vengo cansada. Mi cabeza no se apaga. Recíbela esta noche, con el trabajo y todo. Déjame tu paz. Amén.",
  "mood_echo": "ansiedad de noche"
}
```

**After client substitutes verse text from RV1909 corpus, user sees:**
> *"La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo."*
> — Juan 14:27 (RV1909)

### Example B — PT-BR, tired, morning

**Input:**
```json
{
  "user_locale": "pt-BR",
  "user_name": "Lucas",
  "mood_text": "cansado, não dormi bem",
  "mood_emoji": "😔",
  "app_unlocking": "TikTok",
  "tradition": "evangelico",
  "streak_day": 1,
  "recent_refs": [],
  "time_of_day": "07:15"
}
```

**Output from Haiku:**
```json
{
  "crisis": false,
  "verse_reference": "Mateus 11:28",
  "verse_testament": "NT",
  "verse_book_category": "gospel",
  "advice": "Lucas, o cansaço não é preguiça nem falha. É um convite que Jesus te fez. Antes do primeiro scroll do dia, entrega o que você traz. Ele não espera que você chegue forte — te chama cansado mesmo.",
  "prayer": "Jesus, tô cansado. Recebe o meu dia antes que eu o gaste rolando a tela. Dá descanso pra esse começo. Amém.",
  "mood_echo": "cansaço de manhã"
}
```

**After client substitutes verse text from TB 1917 corpus, user sees:**
> *"Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei."*
> — Mateus 11:28 (TB 1917)

### Example C — ES, crisis signal

**Input:** `mood_text: "ya no quiero estar acá, nada tiene sentido"`

**Output from Haiku:**
```json
{
  "crisis": true,
  "verse_reference": "Mateo 11:28",
  "verse_testament": "NT",
  "verse_book_category": "gospel",
  "advice": "Lo que estás sintiendo es real y es demasiado para cargarlo solo. Jesús no te rechaza aquí. Pero ahora mismo, por favor, habla con alguien — una persona de confianza o una línea de ayuda. No tienes que esperar.",
  "prayer": "Jesús, estoy al límite. No me sueltes. Manda a alguien. Amén.",
  "mood_echo": "en crisis",
  "helpline": "Llama o escribe a tu línea local de crisis. Si estás en peligro inmediato, marca al número de emergencia de tu país."
}
```

---

## 4.5 · Local Verse Corpus (client-side)

To guarantee license compliance, the app ships with a local NT corpus in each
language. Haiku returns `verse_reference` only; the client substitutes text.

**Corpus files (bundled with APK):**

```
assets/bible/
  nt_rv1909_es.json     # ~180 KB, full NT in Reina-Valera 1909
  nt_tb1917_pt.json     # ~190 KB, full NT in Tradução Brasileira 1917
  ot_rv1909_es.json     # optional, for the 15% OT fallback
  ot_tb1917_pt.json     # optional
```

**Structure (per file):**

```json
{
  "translation": "RV1909",
  "language": "es",
  "license": "public-domain",
  "books": {
    "Mateo": {
      "1": { "1": "Libro de la generación...", "2": "...", ... },
      "11": { "28": "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar." },
      ...
    },
    ...
  }
}
```

**Client lookup (pseudo):**

```python
def resolve_verse(ref: str, locale: str) -> str:
    # ref = "Mateo 11:28"
    book, chap_verse = ref.rsplit(" ", 1)
    chap, verse = chap_verse.split(":")
    corpus = load_corpus(locale)        # cached
    return corpus["books"][book][chap][verse]
```

**Fallback if lookup fails** (Haiku cited a book we don't have mapped, or a
verse range like "Juan 3:16-17"):
1. Attempt range expansion (concatenate verses 16 + 17).
2. If still failing, fall back to a curated safe verse for the mood category
   and log the miss (so we can fix book-name normalization).

**Book name normalization table** (Haiku may output either form):

| Canonical (ES) | Variants Haiku might produce |
|---|---|
| Mateo | Mt, Mat, S. Mateo, San Mateo |
| Juan | Jn, Jhn, S. Juan, 1ra Juan (careful!) |
| 1 Juan | 1Jn, 1 Jn, I Juan, Primera de Juan |
| Filipenses | Fil, Flp, Filip |

Same for PT. Keep the normalization map in a small file — Haiku occasionally
varies, so we snap to canonical before lookup.

---

## 5 · API Call Shape (Python / SDK)

```python
from anthropic import Anthropic

client = Anthropic()

SYSTEM_PROMPT_ES = open("prompts/system_es.txt").read()  # the block above

resp = client.messages.create(
    model="claude-haiku-4-5-20251001",
    max_tokens=400,                 # JSON is small; keep tight
    temperature=0.7,                # some variety, not chaos
    system=[
        {
            "type": "text",
            "text": SYSTEM_PROMPT_ES,
            "cache_control": {"type": "ephemeral"},   # 5-min cache
        }
    ],
    messages=[
        {"role": "user", "content": json.dumps(user_context)}
    ],
)
```

**Caching note:** the system prompt is ~1.2k tokens. At Haiku pricing, cache hits are ~10% of input cost. For active users (multiple unlocks per day), every call after the first in a 5-min window is essentially free on the system side.

### Cost per LLM call (Claude Haiku 4.5 pricing)

Base prices (2026):
- Input: **$1.00 / MTok**
- Output: **$5.00 / MTok**
- Cache write (5-min): **$1.25 / MTok**
- Cache read (5-min hit): **$0.10 / MTok** (90% off)

Per-call token budget for Dios Primero:
- System prompt (cacheable): ~**1,200 tokens**
- User context JSON (not cached): ~**150 tokens**
- Output JSON (advice + prayer + metadata): ~**200 tokens**

**Cost per call:**

| Scenario | Input cost | Output cost | **Total** |
|---|---|---|---|
| Cold (first call, cache miss) | 1,350 × $1.00 = $0.00135 | 200 × $5 = $0.00100 | **$0.00235** |
| Warm (cache hit, within 5 min) | (1,200 × $0.10 + 150 × $1) = $0.00027 | 200 × $5 = $0.00100 | **$0.00127** |

So roughly **0.13¢ – 0.24¢ per call**. A ~46% discount on warm calls.

**Monthly cost per user (projection):**

Assume users bunch unlocks into 2–3 sessions/day, so cache hit rate ≈ 70–80%.

| Usage profile | Calls/month | Cold (30%) | Warm (70%) | **Monthly $/user** |
|---|---|---|---|---|
| Light (3 unlocks/day) | 90 | $0.064 | $0.080 | **~$0.14** |
| Typical (10 unlocks/day) | 300 | $0.212 | $0.267 | **~$0.48** |
| Heavy (20 unlocks/day) | 600 | $0.423 | $0.533 | **~$0.96** |

**Revenue vs cost:**

- Annual plan $49.99/yr = ~$4.17/month per user
  - COGS ratio: 3% (light) → 11% (typical) → 23% (heavy) → **gross margin 77–97%**
- Weekly plan $9.99/wk = ~$43/month per user
  - COGS ratio: <2% → **gross margin >98%**

**Cost-control levers already in the spec:**
1. Onboarding screens 21–22 use **curated** content → zero LLM cost during the pre-paywall moment where conversion happens.
2. Free-tier cap (if enabled) → curated fallback beyond daily limit.
3. 10-min dedupe cache on identical mood inputs → kills double-taps.
4. Verse text comes from bundled corpus → doesn't count against output tokens.
5. `max_tokens: 400` hard cap → Haiku can't blow the budget.

**Break-even math:**
- At $49.99/year, even a heavy user needs ~60 calls to reach $0.14 in cost — a week of daily use. They pay for their annual LLM budget in under 3 weeks of usage.

---

## 6 · Router Logic (when to hit Haiku vs curated)

```text
IF onboarding_demo (screens 21–22):
    return curated_example_matching_mood_emoji
ELIF free_tier AND daily_unlocks >= free_limit:
    return curated_fallback_from_NT_corpus(mood, recent_refs)
ELIF crisis_signal_detected_locally (regex pre-check):
    call Haiku WITH crisis-aware flag
    also log for human review (24h SLA)
ELSE:
    call Haiku with full user_context
    cache result for mood+hash(mood_text) for 10 min (dedupe rapid taps)
```

**Local crisis regex (ES + PT):**
- ES: `(no quiero (vivir|seguir|estar)|me quiero (matar|morir)|acabar con (todo|mi vida)|sin sentido|no vale la pena)`
- PT: `(não quero (viver|mais|estar)|me matar|acabar com (tudo|minha vida)|não vale a pena|sem sentido)`

These are first-pass only — Haiku decides final `crisis` flag, but the regex ensures we never miss a call to the crisis path.

---

## 7 · QA Test Set

Before shipping, run at least these 20 inputs per locale through Haiku and review:

1. Simple mood word ("cansado", "ansioso", "triste")
2. Mood + context ("ansioso, presentación mañana")
3. Emoji only (all 6)
4. Joy state ("feliz, agradecido")
5. Anger ("enojado con mi pareja")
6. Doubt ("no sé si Dios me escucha")
7. Guilt ("hice algo de lo que me arrepiento")
8. Long text (120+ words) — does it still return tight JSON?
9. Crisis phrase (see regex) — does it trigger crisis path?
10. Empty `mood_text` + neutral emoji
11. Non-Christian language ("la universo me manda señales") — how does Haiku handle?
12. Profanity in mood_text — does output stay clean?
13. Another language (English user_text in es-LA) — does it refuse gracefully or translate?
14. Repeated requests with same recent_refs — does it actually rotate verses?
15. `tradition: católico` — verses cite appropriate translation?
16. Name with accent ("Álvaro") — preserved in output?
17. Morning vs night timestamp — tone difference?
18. Streak day 1 vs 30 — any "veteran" tone on day 30?
19. Edge: user pastes a Bible verse in mood_text — does it recognize and still respond?
20. Edge: mood_text in PT-BR sent with es-LA locale — does Haiku follow locale (preferred) or text?

Grade each on: JSON validity, NT priority (85%+ across 20 calls), length compliance, tone, no invented verses, crisis path correct.

---

## 8 · Open decisions

- **Free tier vs hard paywall?** Affects router. Prayer Lock is hard paywall. We can test free = 3 unlocks/day.
- ~~**Verse translation licensing**~~ — RESOLVED: locked to RV1909 (ES) and TB 1917 (PT), both public domain. Client substitutes verse text from bundled corpus; Haiku returns reference only.
- **Crisis handoff:** do we show helpline inline, or do a full-screen takeover? Ethics and UX both argue for takeover.
- **Personalization window:** how many past moods to feed back as context? 5 recent refs already defined, but we could also pass last 3 mood_echos for thematic continuity.
