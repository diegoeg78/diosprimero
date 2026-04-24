# Dios Primero — Web Prototype

Clickable web prototype of the 34-screen onboarding flow. Built to be
opened on a phone. **Not the real Android app** — no app blocking, no
paywall integration, no backend. Just the flow, copy, and feel.

## Run locally

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000 on your laptop, or http://<your-local-ip>:3000
on your phone (same Wi-Fi).

## Deploy to Vercel

Option A — **one click via Vercel CLI**, no GitHub push needed:

```bash
cd web
npx vercel
```

Follow the prompts (first time asks you to sign in). Takes ~2 minutes.
You get a live URL you can share.

Option B — **connect your GitHub repo** (once the push issue is resolved):
push the `web/` folder to GitHub, import the repo in Vercel dashboard,
set Root Directory to `web`. Every push auto-deploys.

## Language toggle

ES / PT-BR switcher in the top-right corner. Content is fully mirrored.

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion (for fades and sequences)
- No backend, no database. Client state only.

## File map

```
web/
  app/
    page.tsx            Router (switches between the 34 screens)
    layout.tsx          Root layout, fonts, meta
    globals.css         Tailwind + custom animations
  components/
    screens.tsx         All 34 screen components
    ui.tsx              Reusable primitives (Button, Choice, Title…)
    LangToggle.tsx      ES / PT-BR switch
  lib/
    copy.ts             All copy in both languages
    context.tsx         App state (locale, user, current screen)
    flow.ts             Screen sequence
    types.ts            User state types
```

## Editing copy

All copy lives in `lib/copy.ts`. Each language is a single object
that implements the `ScreenCopy` type. Change a word, hot-reload,
see it live.

## Screen order

1. Welcome · 2. Problem · 3. Solution · 4. Name · 5. Age · 6. Phone
usage · 7. Bomb · 8. Bridge · 9–14. Questions + reflections · 15.
Final reflection · 16–17. Analytics · 18. Mirror · 19. Chart · 20.
Choose app · 21. Tell Jesus · 22. Response (verse + advice + prayer) ·
23. Day 1 · 24. Review modal · 25. Loading · 26. Summary · 27.
Commitment · 28. Affirmation · 29. Final yes · 30. Faith snapshot · 31.
Accessibility · 32. Notifications · 33. Social proof · 34. Paywall ·
End.

## Known limitations (intentional)

- No real app-blocking (the whole point of the Android app).
- No real paywall. The paywall CTA just advances to the outro.
- No analytics wired. Add PostHog / Plausible later.
- Review modal has no real App Store rating. Tapping "Dejar reseña"
  just advances.
- Accessibility / Notifications screens are visual — they don't
  actually request anything.

## Next steps

- Add basic analytics (PostHog) to measure drop-off per screen
- Add email capture on outro screen to build a waitlist
- A/B test paywall copy variants
- Run paid traffic (Meta ads) to the live URL to validate conversion
  before committing to the Android build
