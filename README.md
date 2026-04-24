# Dios Primero / Deus Primeiro

Android app for LatAm + Brasil. Before opening distracting apps (Instagram,
TikTok, etc.), the user pauses, tells Jesus how they feel, and receives a
verse from the New Testament + a short reflection + a short prayer — then
taps "Amén" to unlock.

**Tagline:** *"La oración correcta para el momento correcto."*

---

## Repository contents

### Product specs

- [Onboarding ES (LatAm neutro)](Dios%20Primero%20-%20Onboarding%20ES%20v1.md) — 34 screens
- [Onboarding PT-BR](Deus%20Primeiro%20-%20Onboarding%20PT-BR%20v1.md) — 34 screens
- [Regional Pricing](Dios%20Primero%20-%20Regional%20Pricing%20v1.md) — per-country Google Play tiers + margin math

### Architecture

- [Local Corpus Architecture](Dios%20Primero%20-%20Local%20Corpus%20Architecture%20v1.md) — local DB design, bucket taxonomy, routing
- [Corpus Generation Prompt](Dios%20Primero%20-%20Corpus%20Generation%20Prompt%20v1.md) — how Sonnet authors the ~2,500 entries
- [Haiku Prompts](Dios%20Primero%20-%20Haiku%20Prompts%20v1.md) — legacy live-inference design (retained for crisis path only)
- [Haiku Ranker Architecture](Dios%20Primero%20-%20Haiku%20Ranker%20Architecture%20v1.md) — **deprecated** (see decision log below)

### Reference material

- [Mobile App Onboarding Deep Dive — ES](Mobile%20App%20Onboarding%20Deep%20Dive%20-%20ES.md) — translated reference (HubSpot/Starter Story)
- [Mobile App Onboarding Deep Dive — PT](Mobile%20App%20Onboarding%20Deep%20Dive%20-%20PT.md) — translated reference (HubSpot/Starter Story)
- Source PDF — gitignored (HubSpot copyrighted material)

---

## Current architecture decision

**Pure local cache, no runtime LLM.**

1. Sonnet 4.6 authors a ~2,500-entry curated cache once (~$35 one-time).
2. Bundle cache + PD Bible corpus (RV1909 ES / TB 1917 PT) in the APK.
3. At runtime: keyword + emoji + time-of-day + streak context picks a
   bucket; weighted random within the bucket (filtered by recency) picks
   the entry. Latency <50ms, fully offline, $0 per call.
4. Crisis regex → curated safe-path response (no LLM).

**Trade-off accepted:** no "AI picks the perfect one" on ambiguous input.
Users get a well-matched entry from a filtered pool instead.

**Runtime cost:** essentially $0 per user — ~99% gross margin at every
regional price tier.

---

## Decision log

| Date | Decision | Reason |
|---|---|---|
| 2026-04-24 | Authoring model: Opus 4.7 → **Sonnet 4.6** | Sonnet is 5x cheaper; editorial quality is enough for curated entries. |
| 2026-04-24 | **Skip runtime Haiku ranker** | Pure local beats margin math everywhere, especially Brasil heavy users. |
| 2026-04-24 | Bible translations locked to **RV1909 (ES)** + **TB 1917 (PT)** | Public domain; zero licensing risk. Client substitutes verse text from bundled corpus. |
| 2026-04-24 | Name: **Dios Primero** / **Deus Primeiro** | User chose; works in both markets. |

---

## Next steps

1. Generate `bucket_spec.json` — 50 bucket definitions for Sonnet authoring
2. Write `generate_corpus.py` — one-time Sonnet batch script
3. Bundle PD Bible JSON files (RV1909, TB 1917)
4. Build the runtime selector (on-device, Kotlin)
5. Build Android app shell with AccessibilityService permission flow
