# Dios Primero — Daily Experience v1

What happens *after* onboarding. This is the real product — the loop the
user pays for.

---

## 1 · The Core Loop (every time they open a blocked app)

```
User taps Instagram icon
    ↓
AccessibilityService fires → Dios Primero launches full-screen takeover
    ↓
[1] Cuéntale a Jesús cómo te sientes
    - Text input + 6 emoji quick-picks
    - Streak counter visible at top
    ↓
[2] Dios Primero shows the matched entry (from local corpus)
    - Verse (NT, big, serif)
    - Advice (warm, 60 words)
    - Prayer (first person, ≤50 words)
    - Button: "Amén · Desbloquear Instagram"
    ↓
User taps Amén
    ↓
[3] Instagram unlocks. User does their thing.
    ↓
When they close Instagram → lock re-engages automatically
```

**Key rule:** the lock re-engages on every fresh open. Not time-based,
not session-based. Every intentional open = one moment with Jesus. This
is the core product promise.

---

## 2 · Rapid re-opens (the "I just closed it and opened it again" case)

Common case: user closes Instagram, then opens it again within 30 seconds
("I forgot to check one thing"). Three options for how to handle:

| Option | Behavior | Feel |
|---|---|---|
| **A. Fresh prayer every time** | Same full ritual | Rigid, could frustrate |
| **B. Grace window (≤2 min)** | No takeover if reopened within 2 min | Forgiving, feels smart |
| **C. Quick pass** | Show just the Amén button, no new prayer | Fast but keeps the gesture |

**Recommended: B (2-minute grace window).** Respects the user's time
while keeping the discipline. A configurable setting (Settings → Grace
window: 0 / 2 / 5 / 10 min).

---

## 3 · Tracking Instagram opens (and all blocked apps)

Two Android APIs work together:

### 3a · AccessibilityService (already required for blocking)

Detects every app-open event in real-time:

```kotlin
override fun onAccessibilityEvent(event: AccessibilityEvent) {
    if (event.eventType == TYPE_WINDOW_STATE_CHANGED) {
        val pkg = event.packageName?.toString() ?: return
        if (pkg in blockedApps) {
            onBlockedAppOpened(pkg)
        }
    }
}
```

**What we log per open:**
- Timestamp
- Package name (instagram, tiktok, etc.)
- Whether user completed the prayer (Amén) or cancelled
- Time from takeover → Amén (engagement signal)

### 3b · UsageStatsManager (optional but powerful)

Requires `PACKAGE_USAGE_STATS` permission. Gives historical data:
- Open count per app per day
- Time-in-app per app
- Works retroactively (shows data from *before* install)

**When to ask for this permission:**
- NOT during onboarding (friction)
- Day 2 in the dashboard, framed as: "Ver tu resumen real semanal"
- ~40% grant rate expected (vs 90% for Accessibility if framed well)

**What it unlocks:**
- "Esta semana pasaste 14h 22min en Instagram"
- "Ayer lo abriste 62 veces"
- Weekly comparison: "hace 1 semana: 18h → esta semana: 14h"
- Real data powers a compelling share-graphic: *"Recuperé 4 horas con Jesús"*

---

## 4 · Home Dashboard (opens when they tap the Dios Primero icon)

```
┌─────────────────────────────────────┐
│  🔥 Día 12                          │
│  Tu caminar con Jesús               │
├─────────────────────────────────────┤
│                                     │
│  Hoy te detuviste 8 veces.          │
│  Oraste 8 veces.                    │
│                                     │
│  Instagram — 4 veces, 18 min        │
│  TikTok    — 3 veces, 12 min        │
│  YouTube   — 1 vez,    5 min        │
│                                     │
├─────────────────────────────────────┤
│  Esta semana                        │
│  ■■■■■■□ 6/7 días                  │
│                                     │
│  Versículo del día:                 │
│  "La paz les dejo, mi paz les doy." │
│  — Juan 14:27                       │
│                                     │
├─────────────────────────────────────┤
│  [ Orar ahora ] [ Ajustes ]         │
└─────────────────────────────────────┘
```

**What to compute on-device from our two data sources:**

| Metric | Source | Refresh |
|---|---|---|
| Streak (day count) | Our event log | live |
| Opens blocked today | AccessibilityService log | live |
| Prayers completed today | Our Amén log | live |
| Time saved per app | UsageStatsManager (if granted) | every hour |
| Weekly chart | Our event log + UsageStats | daily |
| Verse of the day | Rotates from NT corpus by day-of-year | daily |

---

## 5 · Weekly summary (Sunday morning push)

Every Sunday at 9 AM local time:

```
Sábado de descanso.

Esta semana:
  • 37 veces que Dios Primero te detuvo
  • 37 oraciones
  • Recuperaste 4h 18min de tu vida

Sigue el caminar.
[ Abrir el resumen ]
```

Tapping the push opens a rich weekly summary screen:
- Chart: opens prevented per day
- Top verse you saw (most-matched bucket this week)
- Mood trend (did "ansiedad" go down over the week?)
- Shareable image for Instagram/WhatsApp Stories

**The Sunday share mechanic is a growth loop:** users post the
summary, friends see it, friends install.

---

## 6 · Settings (one screen, minimal)

```
AJUSTES

Apps bloqueadas
  Instagram          ◉
  TikTok             ◉
  YouTube            ○
  + Añadir app

Ventana de gracia              2 min  >
Hora del recordatorio          21:00  >
Idioma                         ES     >

Notificaciones                 ◉
Permisos de uso                Activado  >
Accesibilidad                  Activado  >

Cuenta
  Mi suscripción                      >
  Privacidad                          >
  Cerrar sesión

Versión 1.0.0
```

---

## 7 · Notifications (only 3 kinds)

| # | When | Copy |
|---|---|---|
| 1 | **Daily** (default 21:00) if no opens today | `¿Un minuto antes de dormir? 🙏` |
| 2 | **Streak at risk** — no opens by 22:00 | `Tu racha de 12 días espera 2 minutos.` |
| 3 | **Sunday summary** — 09:00 | `Tu semana. Entra cuando quieras.` |

All optional, all off-by-default except daily. No spam. No push for
every prayer (users do that ~10x/day — we'd burn goodwill).

---

## 8 · Crisis path (runs BEFORE the normal flow)

On the **"Cuéntale a Jesús"** input (step [1] of the core loop), local
regex checks for crisis signals. If matched:

```
Full-screen takeover (NOT the normal flow):

  Escuchaste algo dentro de ti
  que es muy pesado para cargar solo.

  Jesús no te rechaza aquí.
  Pero este momento pide a alguien más.

  [Línea de crisis — Brasil: 188]
  [Línea de crisis — tu país]

  [ Llamar ]   [ Escribir ]   [ Hablar con Jesús ]

  (El app no se desbloquea en este momento.
   Pero está contigo.)
```

The blocked app stays blocked. The user can still pray, but the
primary CTA is **reach out to a human**. Logged for internal review
(anonymized).

---

## 9 · Per-app customization (v1.1)

Some apps deserve different rituals:

| App | Default ritual | Why |
|---|---|---|
| Instagram | Full prayer | Scroll / comparison trap |
| TikTok | Full prayer | Dopamine loop |
| YouTube | Full prayer | Can be legit learning — maybe lighter |
| WhatsApp / Messages | **Skip by default** | Communication is necessary |
| Email | **Skip by default** | Work |
| Bible apps / devotionals | **Whitelist** | Never block these |

Default "skip" list prevents frustration. User can flip any of these.

---

## 10 · What the API ACTUALLY touches (privacy copy)

For the privacy page and Play Store listing:

> **Qué guardamos:**
> - Qué apps bloqueaste (tu lista)
> - Cuántas veces abriste cada app bloqueada
> - Qué escribiste en "cómo te sientes" (solo si optas entrar en el plan de
>   mejora del modelo)
> - Tu racha y progreso
>
> **Qué NO guardamos:**
> - Lo que escribes dentro de otras apps (imposible, no lo podemos ver)
> - Tu ubicación
> - Tus contactos
> - Nada que no sea estrictamente del caminar

Ship a separate `privacy.json` file that any reviewer can read. Build
trust from day one.

---

## 11 · The home screen widget (v1.1, optional)

Android widget on the home screen showing:
- 🔥 Streak
- Today's verse (one line)
- Tap → opens app, initiates a voluntary prayer

Free growth: users put it on their home screen, friends see it,
friends ask, friends install.

---

## 12 · Summary of what we need to build (beyond onboarding)

| Component | Effort | Priority |
|---|---|---|
| AccessibilityService (detect + block) | 3–4 days | **P0** |
| Full-screen takeover UI | 2–3 days | **P0** |
| Local corpus loader + selector | 2 days | **P0** |
| Amén flow + unlock | 1 day | **P0** |
| Home dashboard | 3 days | **P0** |
| Streak + event log (local DB) | 2 days | **P0** |
| Weekly summary + push | 2 days | **P1** |
| Settings screen | 2 days | **P1** |
| UsageStatsManager integration | 2 days | **P1** |
| Crisis path | 1 day | **P1** |
| Home widget | 2 days | **P2** |
| Onboarding (from current spec) | 5 days | **P0** |

**Total P0: ~3 weeks of dev work.** A focused Kotlin dev can ship v1
in a month. v1 is what we sell; P1 and P2 wait until we see real
retention signal.

---

## 13 · What I recommend next

Two parallel tracks that don't block each other:

1. **Validate onboarding copy with ads/waitlist** — Vercel deploy →
   Meta ads → waitlist → iterate copy. Cost: ~$50 + 2 weeks of
   watching. No Android dev needed.

2. **Start the Android shell** — empty project with just the
   AccessibilityService + full-screen intercept + one hard-coded
   prayer. Prove the core mechanic works on a real device. Cost: ~3
   days of dev. No UI polish.

Track 1 answers: *do people want this?* Track 2 answers: *can we
actually ship this?* Both fail-fast. Launch v1 only if both tracks
are green.
