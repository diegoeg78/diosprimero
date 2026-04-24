# Dios Primero — Regional Pricing v1

**Goal:** price aggressively enough to convert in LatAm/Brasil *without*
killing margin. Use Google Play's per-country pricing (built-in feature,
free to configure) rather than a single USD price that kills conversion
outside the US.

---

## 1 · Why one price fails

| Region | US price $49.99/yr feels like… |
|---|---|
| US | Normal (Hallow: $59.99, Glorify: $47.99) |
| Brasil | R$260/yr — 2–3x what BR users pay for YouTube Premium |
| México | M$900/yr — uncomfortable for an app |
| Argentina | Too volatile to price in pesos; most apps USD-peg |
| Perú / Ecuador / CA | $50 = groceries for a few days |

Top-converting prayer/devotional apps in LatAm charge **$10–$20/year
effective** (after store fees), not $50. The category loses to free
alternatives (YouVersion, Bíblia JFA gratis) above that ceiling.

---

## 2 · Proposed regional price grid

All prices are **Google Play customer-facing** (before store fee).
Weekly price intentionally kept high so annual looks like an obvious win.

| Region (Play locale) | Weekly | Annual | Annual USD equiv | Relative to US |
|---|---|---|---|---|
| **US / EN / EU** | $4.99 | $29.99 | $30.00 | 100% |
| **Brasil** | R$ 9,90 | R$ 49,90 | ~$10 | 33% |
| **México** | M$ 69 | M$ 299 | ~$15 | 50% |
| **Colombia** | COP 18.900 | COP 59.900 | ~$14 | 47% |
| **Argentina** | USD 2.99 (pegged) | USD 12.99 (pegged) | $13 | 43% |
| **Chile** | CLP 3.990 | CLP 14.990 | ~$16 | 53% |
| **Perú** | S/ 14,90 | S/ 39,90 | ~$10 | 33% |
| **Uruguay** | UYU 149 | UYU 499 | ~$12 | 40% |
| **Paraguay / Bolivia / CA** | USD 2.99 | USD 11.99 | $12 | 40% |
| **Ecuador** (USD) | $2.99 | $14.99 | $15 | 50% |
| **Venezuela / Cuba** | USD 1.99 | USD 7.99 | $8 | 27% |

**Trial:** 7 days free everywhere. Notification sent 1 day before expiration.

---

## 3 · Why those specific numbers

- **R$ 49,90 / yr in Brasil** is the magic psychological price band for
  subscription apps — below R$ 50 feels "cheap enough to try", well above
  it feels premium. Weekly R$ 9,90 is where users round up to "about R$
  10". That ratio (annual ≈ 5 × weekly) makes the annual look like 90%
  off, which it effectively is.
- **M$ 299 México** — below the M$ 300 psychological barrier; same logic.
- **Argentina USD-pegged** — Google Play allows this, protects you from
  inflation churn. Users expect it for subscription apps.
- **Venezuela/Cuba** — set to lowest tier Google Play allows; conversion
  here is a bonus, not a business line.
- **Chile/Colombia/Perú** — each has its own "$10-equivalent" sticker
  price that resonates locally. Don't convert mechanically.

---

## 4 · Google Play store fees

Google takes **15%** on the first $1M of a publisher's annual revenue, then
**30%** above it. In practice, MVPs are at 15%. Below numbers assume 15%.

(Apple is 15% under Small Business Program, 30% after. Play Store's Media
Experience Program is not relevant here.)

---

## 5 · Net revenue vs COGS by region

Net/month = (annual price × 0.85 store fee) / 12.
COGS/month assumes **local-first corpus architecture** (§10 of the Corpus
doc): typical user ~$0.03/mo, heavy user ~$0.06/mo.

| Region | Annual customer price | Net to us/mo | COGS typical | **Margin typical** | COGS heavy | **Margin heavy** |
|---|---|---|---|---|---|---|
| US | $29.99 | $2.12 | $0.03 | **98.6%** | $0.06 | **97.2%** |
| Brasil | R$ 49,90 (~$10) | $0.71 | $0.03 | **95.8%** | $0.06 | **91.5%** |
| México | M$ 299 (~$15) | $1.06 | $0.03 | **97.2%** | $0.06 | **94.3%** |
| Colombia | COP 59.900 (~$14) | $0.99 | $0.03 | **97.0%** | $0.06 | **93.9%** |
| Chile | CLP 14.990 (~$16) | $1.13 | $0.03 | **97.3%** | $0.06 | **94.7%** |
| Perú | S/ 39,90 (~$10) | $0.71 | $0.03 | **95.8%** | $0.06 | **91.5%** |
| Ecuador | $14.99 | $1.06 | $0.03 | **97.2%** | $0.06 | **94.3%** |
| Argentina | $12.99 USD | $0.92 | $0.03 | **96.7%** | $0.06 | **93.5%** |
| Venezuela/Cuba | $7.99 | $0.57 | $0.03 | **94.7%** | $0.06 | **89.5%** |

Even at the **lowest tier ($7.99 Venezuela)**, a heavy user is 89% gross
margin. The local-first architecture is what makes the aggressive LatAm
pricing sustainable — without it, Brasil at R$ 49,90 would be ~30% margin
for heavy users, not 91%.

---

## 6 · Weekly vs Annual conversion anchoring

The weekly price is a **decoy** — most users pick annual once they see
the math. Paywall should display:

```
──────────────────────────────────
  ◯  Semanal   R$ 9,90 / semana
──────────────────────────────────
  ◉  Anual     R$ 49,90 / año
       R$ 0,96/semana · ahorra 90%
       [ 7 días gratis ]
──────────────────────────────────
```

The "equivalente semanal" line under Annual is the key copy — it makes
the decision obvious.

**Expected split:** ~70–80% pick Annual, ~15–25% pick Weekly, ~5% bail.
Weekly plan exists mostly to make Annual look good, and to catch users
who "just want to try" but won't commit to a year.

---

## 7 · Lifetime / one-time option (optional)

Some users refuse subscriptions. Offering a one-time lifetime payment
captures that segment without damaging the core plan.

| Region | Lifetime price | Annual payback |
|---|---|---|
| US | $99.99 | 3.3 years |
| Brasil | R$ 149,90 | 3.0 years |
| México | M$ 899 | 3.0 years |
| Default LatAm | $39.99 | 2.7–3.0 years |

**Tradeoff:** lifetime is more revenue up front but kills recurring LTV.
Only offer if you can absorb the one-time hit and need the ARPU bump early.

**Recommendation:** skip lifetime for v1. Add in v2 after LTV is measured.

---

## 8 · Introductory discount for first 100 countries-specific users

To break cold start, offer each new country's first ~100 subscribers:

```
[50% OFF lanzamiento]  R$ 24,95 / primer año
después, R$ 49,90 / año
```

Google Play supports introductory prices. This kicks conversion in early
weeks and creates social proof (those users tend to review). Disable once
you hit 100 paid in that country.

---

## 9 · LTV projection (back-of-envelope)

Assumptions:
- Onboarding→Trial conversion: 10% (Prayer Lock-like target)
- Trial→Paid conversion: 50% (industry average 40-60% for faith apps)
- Annual churn: 40% (conservative — faith apps tend to retain better)
- Average user tenure: **2.5 years**

**LTV per paid user (Brasil, most price-pressured):**
- Year 1: R$ 49,90 × 0.85 (store fee) × 0.85 (BRL→USD) ≈ $6.05
  Wait — conversion already done. Net: R$ 49,90 × 0.85 = R$ 42,42/yr ≈ **$8.50/yr**
- Over 2.5 years: ~**$21.25 gross profit per paying user, Brasil**
- Minus COGS (2.5 yrs × 12 mo × $0.03) = $0.90
- **Net LTV ≈ $20.35 per Brasil paying user**

Same math for US user: ~$63 net LTV.

**CAC target (to keep LTV/CAC > 3):**
- US/EN: CAC ≤ $21
- Brasil: CAC ≤ $6.80
- México: CAC ≤ $10

Meta ads CPI in LatAm faith niche typically runs $0.60–$1.50. At 10%
install→paid conversion, **CAC lands ~$6–15 in LatAm** — on the edge of
the constraint. This is why onboarding conversion matters so much: every
point of onboarding conversion pushes CAC down proportionally.

---

## 10 · Decisions to make

- [ ] Confirm the regional grid or adjust
- [ ] Weekly as decoy or drop it entirely (forces annual commitment,
      may hurt trial conversion)
- [ ] 7-day trial vs 3-day trial (7 is standard, 3 converts better but
      riles users)
- [ ] Offer the "first 100 intro" discount in each country
- [ ] Bundle feature differentiation (free tier vs hard paywall — right
      now spec assumes hard paywall like Prayer Lock)

---

## 11 · Store setup notes

- Google Play Console → Monetize → Subscriptions → add per-country prices
  for each SKU.
- Test prices sync to all local currencies before launch.
- Consider `com.diosprimero.sub.annual` and `com.diosprimero.sub.weekly`
  as two separate SKUs.
- Pricing changes on existing subscribers grandfather them in by default —
  Google emails them, they can accept or cancel. Plan a "launch price
  lock" messaging for early adopters so they feel rewarded.
