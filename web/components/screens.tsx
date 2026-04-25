"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/context";
import {
  Body,
  Button,
  Choice,
  Fade,
  FooterCta,
  Screen,
  Spacer,
  Subtitle,
  TextInput,
  Title,
} from "./ui";
import { phoneHoursValue, type PhoneHours } from "@/lib/types";
import { selectEntry, markShown, type CorpusEntry } from "@/lib/corpus-selector";

/* -------------------- Screen 1 — Welcome -------------------- */
export function Welcome() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Spacer />
      <Fade>
        <h1 className="font-serif text-[64px] leading-none tracking-tight text-fg">
          {t.welcomeTitle}
        </h1>
        <p className="mt-4 text-[17px] text-fg/70">{t.welcomeSub}</p>
      </Fade>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.welcomeCta}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 2 — Problem -------------------- */
export function Problem() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Spacer />
      <Title>{t.problemTitle}</Title>
      <Subtitle>{t.problemSub}</Subtitle>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.continue}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 3 — Solution -------------------- */
export function Solution() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Spacer />
      <Title>{t.solutionTitle}</Title>
      <Body>{t.solutionBody}</Body>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.solutionCta}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 4 — Name -------------------- */
export function NameScreen() {
  const { t, next, user, update } = useApp();
  return (
    <Screen>
      <div className="mt-8">
        <Title>{t.nameTitle}</Title>
        <TextInput
          autoFocus
          value={user.name}
          onChange={(e) => update({ name: e.target.value })}
          placeholder={t.namePlaceholder}
          maxLength={40}
        />
      </div>
      <Spacer />
      <FooterCta>
        <Button disabled={user.name.trim().length < 1} onClick={next}>
          {t.next}
        </Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 5 — Age -------------------- */
export function Age() {
  const { t, next, user, update } = useApp();
  return (
    <Screen>
      <Title>{t.ageTitle(user.name)}</Title>
      <div className="mt-6 space-y-3">
        {t.ageOptions.map((o) => (
          <Choice
            key={o.value}
            selected={user.age === o.value}
            onClick={() => {
              update({ age: o.value as typeof user.age });
              setTimeout(next, 250);
            }}
          >
            {o.label}
          </Choice>
        ))}
      </div>
      <Spacer />
    </Screen>
  );
}

/* -------------------- Screen 6 — Phone usage -------------------- */
export function Phone() {
  const { t, next, user, update } = useApp();
  return (
    <Screen>
      <Title>{t.phoneTitle}</Title>
      <div className="mt-6 space-y-3">
        {t.phoneOptions.map((o) => (
          <Choice
            key={o.value}
            selected={user.phoneHours === o.value}
            onClick={() => {
              update({ phoneHours: o.value as PhoneHours });
              setTimeout(next, 250);
            }}
          >
            {o.label}
          </Choice>
        ))}
      </div>
      <Spacer />
    </Screen>
  );
}

/* -------------------- Screen 7 — Bomb -------------------- */
export function Bomb() {
  const { t, next, user } = useApp();
  const hoursPerDay = user.phoneHours
    ? phoneHoursValue[user.phoneHours]
    : 5;
  const totalHours = Math.round(hoursPerDay * 365);
  const days = Math.round(totalHours / 24);
  const months = Math.round(days / 30);

  return (
    <Screen>
      <Spacer />
      <Title>{t.bombTitle(user.name, hoursPerDay)}</Title>
      <div className="mt-6 space-y-3">
        <Fade delay={0.8}>
          <p className="text-[17px] text-fg/85">{t.bombLine1(days)}</p>
        </Fade>
        <Fade delay={1.8}>
          <p className="text-[17px] text-fg/85">{t.bombLine2(months)}</p>
        </Fade>
        <Fade delay={2.8}>
          <p className="text-[17px] italic text-accent">{t.bombLine3}</p>
        </Fade>
      </div>
      <Spacer />
      <Fade delay={3.6}>
        <FooterCta>
          <Button onClick={next}>{t.bombCta}</Button>
        </FooterCta>
      </Fade>
    </Screen>
  );
}

/* -------------------- Screen 8 — Bridge -------------------- */
export function Bridge() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Spacer />
      <Title>{t.bridgeTitle}</Title>
      <Body>{t.bridgeBody}</Body>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.bridgeCta}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 9 — Q1 -------------------- */
export function Q1() {
  const { t, next, user, update } = useApp();
  return (
    <Screen>
      <Title>{t.q1Title}</Title>
      <div className="mt-6 space-y-3">
        {t.q1Options.map((o) => (
          <Choice
            key={o.value}
            selected={user.mood === o.value}
            onClick={() => {
              update({ mood: o.value as typeof user.mood });
              setTimeout(next, 250);
            }}
          >
            {o.label}
          </Choice>
        ))}
      </div>
      <Spacer />
    </Screen>
  );
}

/* -------------------- Screen 10 — R1 -------------------- */
export function R1() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Spacer />
      <Fade>
        <p className="font-serif text-[26px] leading-snug text-fg">
          {t.r1Body}
        </p>
      </Fade>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.continue}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 11 — Q2 -------------------- */
export function Q2() {
  const { t, next, user, update } = useApp();
  return (
    <Screen>
      <Title>{t.q2Title}</Title>
      <div className="mt-6 space-y-3">
        {t.q2Options.map((o) => (
          <Choice
            key={o.value}
            selected={user.jesusPhrase === o.value}
            onClick={() => {
              update({ jesusPhrase: o.value as typeof user.jesusPhrase });
              setTimeout(next, 250);
            }}
          >
            {o.label}
          </Choice>
        ))}
      </div>
      <Spacer />
    </Screen>
  );
}

/* -------------------- Screen 12 — R2 -------------------- */
export function R2() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Spacer />
      <Fade>
        <p className="font-serif text-[26px] leading-snug text-fg">
          {t.r2Body}
        </p>
      </Fade>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.continue}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 13 — Q3 -------------------- */
export function Q3() {
  const { t, next, user, update } = useApp();
  return (
    <Screen>
      <Title>{t.q3Title}</Title>
      <div className="mt-6 space-y-3">
        {t.q3Options.map((o) => (
          <Choice
            key={o.value}
            selected={user.lastPrayed === o.value}
            onClick={() => {
              update({ lastPrayed: o.value as typeof user.lastPrayed });
              setTimeout(next, 250);
            }}
          >
            {o.label}
          </Choice>
        ))}
      </div>
      <Spacer />
    </Screen>
  );
}

/* -------------------- Screen 14 — R3 -------------------- */
export function R3() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Spacer />
      <Fade>
        <p className="font-serif text-[26px] leading-snug text-fg">
          {t.r3Body}
        </p>
      </Fade>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.continue}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 15 — R15 final reflection -------------------- */
export function R15() {
  const { t, next, user } = useApp();
  const moodLabel =
    t.q1Options.find((o) => o.value === user.mood)?.label.toLowerCase() ?? "algo";
  const lines = t.r15Lines(user.name, moodLabel);

  return (
    <Screen>
      <Spacer />
      <div className="space-y-4 stagger-fade">
        {lines.map((line, i) => (
          <p
            key={i}
            className={`font-serif leading-snug ${
              i === lines.length - 1
                ? "text-[30px] text-accent"
                : "text-[22px] text-fg/85"
            }`}
          >
            {line}
          </p>
        ))}
      </div>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.r15Final}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 16 — Tradition -------------------- */
export function Q16() {
  const { t, next, user, update } = useApp();
  return (
    <Screen>
      <p className="text-sm text-muted">{t.q16Intro}</p>
      <div className="mt-3">
        <Title>{t.q16Title}</Title>
      </div>
      <div className="mt-6 space-y-3">
        {t.q16Options.map((o) => (
          <Choice
            key={o.value}
            selected={user.tradition === o.value}
            onClick={() => {
              update({ tradition: o.value as typeof user.tradition });
              setTimeout(next, 250);
            }}
          >
            {o.label}
          </Choice>
        ))}
      </div>
      <Spacer />
    </Screen>
  );
}

/* -------------------- Screen 17 — Source -------------------- */
export function Q17() {
  const { t, next, user, update } = useApp();
  return (
    <Screen>
      <Title>{t.q17Title}</Title>
      <div className="mt-6 space-y-3">
        {t.q17Options.map((o) => (
          <Choice
            key={o.value}
            selected={user.source === o.value}
            onClick={() => {
              update({ source: o.value as typeof user.source });
              setTimeout(next, 250);
            }}
          >
            {o.label}
          </Choice>
        ))}
      </div>
      <Spacer />
    </Screen>
  );
}

/* -------------------- Screen 18 — Mirror -------------------- */
export function Mirror() {
  const { t, next, user } = useApp();
  const hoursPerDay = user.phoneHours
    ? phoneHoursValue[user.phoneHours]
    : 5;
  const moodLabel =
    t.q1Options.find((o) => o.value === user.mood)?.label.toLowerCase() ?? "—";
  const phraseLabel =
    t.q2Options.find((o) => o.value === user.jesusPhrase)?.label.split(" — ")[1] ?? "—";
  const whenLabel =
    t.q3Options.find((o) => o.value === user.lastPrayed)?.label.toLowerCase() ?? "—";

  return (
    <Screen>
      <Title>{t.mirrorTitle(user.name)}</Title>
      <ul className="mt-6 space-y-3">
        {[
          t.mirrorBullet1(moodLabel),
          t.mirrorBullet2(phraseLabel),
          t.mirrorBullet3(whenLabel),
          t.mirrorBullet4(hoursPerDay),
        ].map((line, i) => (
          <li
            key={i}
            className="rounded-2xl border border-border bg-card px-5 py-4 text-[15px] leading-relaxed text-fg/90"
          >
            {line}
          </li>
        ))}
      </ul>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.continue}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 19 — Chart -------------------- */
export function ChartScreen() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Title>{t.chartTitle}</Title>

      <div className="mt-8 h-56 rounded-2xl border border-border bg-card p-4">
        <svg viewBox="0 0 300 180" className="h-full w-full">
          {/* grid */}
          <g stroke="#2a2720" strokeWidth="1">
            <line x1="20" y1="160" x2="290" y2="160" />
            <line x1="20" y1="20" x2="20" y2="160" />
          </g>
          {/* bad line */}
          <path
            d="M 20 50 C 80 70, 140 95, 290 145"
            stroke="#7a7268"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 4"
          />
          {/* good line */}
          <path
            d="M 20 145 C 90 115, 180 70, 290 25"
            stroke="#c9a96a"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="mt-4 flex gap-5 text-[13px]">
        <span className="flex items-center gap-2 text-muted">
          <span className="inline-block h-[2px] w-4 bg-muted" /> {t.chartLegendBad}
        </span>
        <span className="flex items-center gap-2 text-accent">
          <span className="inline-block h-[2px] w-4 bg-accent" /> {t.chartLegendGood}
        </span>
      </div>

      <p className="mt-8 font-serif text-[20px] italic leading-snug text-fg/85">
        {t.chartVerse}
      </p>

      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.chartCta}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 20 — Choose app -------------------- */
export function ChooseApp() {
  const { t, next, user, update } = useApp();
  return (
    <Screen>
      <Title>{t.appsTitle}</Title>
      <p className="mt-2 text-[15px] text-fg/70">{t.appsSub}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {t.appsOptions.map((o) => (
          <Choice
            key={o.value}
            selected={user.blockedApp === o.value}
            onClick={() => {
              update({ blockedApp: o.value as typeof user.blockedApp });
              setTimeout(next, 300);
            }}
          >
            <div className="flex flex-col items-start">
              <span className="text-[20px]">{iconFor(o.value)}</span>
              <span className="mt-2 text-[14px]">{o.label}</span>
            </div>
          </Choice>
        ))}
      </div>
      <Spacer />
    </Screen>
  );
}

function iconFor(v: string) {
  return (
    {
      instagram: "📸",
      tiktok: "🎵",
      youtube: "▶️",
      twitter: "𝕏",
      otra: "✳︎",
    } as Record<string, string>
  )[v] ?? "·";
}

/* -------------------- Screen 21 — Tell Jesus -------------------- */
export function Tell() {
  const { t, next, user, update } = useApp();
  const appLabel =
    t.appsOptions.find((o) => o.value === user.blockedApp)?.label ?? "Instagram";

  const emojis = ["😔", "😟", "😐", "🙂", "😊", "🔥"];

  return (
    <Screen>
      <Title>{t.tellTitle(appLabel)}</Title>
      <p className="mt-2 text-[15px] text-fg/70">{t.tellSub}</p>

      <TextInput
        autoFocus
        value={user.currentFeeling}
        onChange={(e) => update({ currentFeeling: e.target.value })}
        placeholder={t.tellPlaceholder}
      />

      <div className="mt-4 flex justify-between">
        {emojis.map((e) => (
          <button
            key={e}
            onClick={() => update({ currentEmoji: e })}
            className={`rounded-full text-[28px] transition ${
              user.currentEmoji === e
                ? "scale-125"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      <Spacer />
      <FooterCta>
        <Button
          disabled={!user.currentFeeling.trim() && !user.currentEmoji}
          onClick={next}
        >
          {t.tellCta}
        </Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 22 — Response -------------------- */
export function Response() {
  const { t, next, user } = useApp();
  const appLabel =
    t.appsOptions.find((o) => o.value === user.blockedApp)?.label ?? "Instagram";

  const [entry, setEntry] = useState<CorpusEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    selectEntry(user.mood).then((result) => {
      setEntry(result);
      setLoading(false);
      if (result) markShown(result.id);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen>
      <p className="mt-2 text-[13px] uppercase tracking-widest text-muted">
        {t.responseTitle}
      </p>

      {loading && (
        <div className="mt-8 space-y-3 animate-pulse">
          <div className="h-5 w-3/4 rounded-lg bg-border" />
          <div className="h-5 w-full rounded-lg bg-border" />
          <div className="h-5 w-2/3 rounded-lg bg-border" />
          <div className="mt-2 h-3 w-24 rounded bg-border" />
        </div>
      )}

      {!loading && entry && (
        <>
          <Fade delay={0.1}>
            <p className="mt-4 font-serif text-[22px] leading-snug text-fg">
              {entry.advice}
            </p>
            <p className="mt-3 text-[13px] text-accent">— {entry.verse_ref}</p>
          </Fade>

          <Fade delay={0.7}>
            <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-[15px] italic leading-relaxed text-fg">
                {entry.prayer}
              </p>
            </div>
          </Fade>
        </>
      )}

      {!loading && !entry && (
        /* Fallback si el corpus no cargó (offline, etc.) */
        <Fade delay={0.1}>
          <p className="mt-4 font-serif text-[22px] leading-snug italic text-fg">
            {t.responseVerseText}
          </p>
          <p className="mt-2 text-[13px] text-accent">— {t.responseVerseRef}</p>
          <p className="mt-8 text-[15px] leading-relaxed text-fg/85">
            {t.responseAdvice}
          </p>
          <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-5">
            <p className="text-[15px] italic leading-relaxed text-fg">
              {t.responsePrayer}
            </p>
          </div>
        </Fade>
      )}

      <Spacer />
      <Fade delay={1.4}>
        <FooterCta>
          <Button onClick={next}>{t.responseCta(appLabel)}</Button>
        </FooterCta>
      </Fade>
    </Screen>
  );
}

/* -------------------- Screen 23 — Day 1 -------------------- */
export function Day1() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Spacer />
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="font-serif text-[96px] leading-none tracking-tight text-accent">
          1
        </p>
        <p className="mt-2 font-serif text-[28px] text-fg">{t.day1Title}</p>
        <p className="mt-2 text-[16px] text-fg/70">{t.day1Sub}</p>
      </motion.div>

      <div className="mt-10 grid grid-cols-3 gap-3">
        {[
          { icon: "🔥", label: t.day1StatStreak, value: "1" },
          { icon: "🙏", label: t.day1StatPrayers, value: "1" },
          { icon: "📖", label: t.day1StatVerses, value: "1" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card px-3 py-4 text-center"
          >
            <div className="text-[22px]">{s.icon}</div>
            <div className="mt-1 font-serif text-[26px] text-fg">{s.value}</div>
            <div className="text-[11px] uppercase tracking-wider text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.continue}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 24 — Review modal -------------------- */
export function Review() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Spacer />
      <div className="mx-auto w-full max-w-sm rounded-3xl border border-border bg-card p-6 text-center">
        <div className="mx-auto mb-3 flex justify-center text-[28px] text-accent">
          {"★★★★★"}
        </div>
        <h2 className="font-serif text-[22px] leading-snug text-fg">
          {t.reviewTitle}
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-fg/75">
          {t.reviewBody}
        </p>
        <div className="mt-5 space-y-2">
          <Button onClick={next}>{t.reviewCta}</Button>
          <button
            onClick={next}
            className="w-full py-2 text-[14px] text-muted hover:text-fg"
          >
            {t.reviewSkip}
          </button>
        </div>
      </div>
      <Spacer />
    </Screen>
  );
}

/* -------------------- Screen 25 — Loading -------------------- */
export function Loading() {
  const { t, next, user } = useApp();
  const phraseRef =
    t.q2Options.find((o) => o.value === user.jesusPhrase)?.label.split(" — ")[1] ??
    "Mateo 11:28";

  useEffect(() => {
    const timer = setTimeout(next, 4200);
    return () => clearTimeout(timer);
  }, [next]);

  const lines = [
    t.loadingLine1,
    t.loadingLine2(phraseRef),
    t.loadingLine3,
  ];

  return (
    <Screen>
      <Spacer />
      <div className="space-y-4">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 1.1, duration: 0.6 }}
            className={`font-serif leading-snug ${
              i === lines.length - 1
                ? "text-[28px] text-accent"
                : "text-[20px] text-fg/80"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
      <Spacer />
      <div className="mx-auto h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="h-full bg-accent"
        />
      </div>
    </Screen>
  );
}

/* -------------------- Screen 26 — Summary -------------------- */
export function Summary() {
  const { t, next, user } = useApp();
  const moodLabel =
    t.q1Options.find((o) => o.value === user.mood)?.label.toLowerCase() ?? "—";
  return (
    <Screen>
      <Title>{t.summaryTitle(user.name)}</Title>
      <div className="mt-6 space-y-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-[14px] text-muted">Hoy</p>
          <p className="mt-1 text-[15px] text-fg/90">
            {t.summaryToday(moodLabel)}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-[14px] text-muted">Meta</p>
          <p className="mt-1 text-[15px] text-fg/90">{t.summaryGoal}</p>
        </div>
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
          <p className="text-[14px] text-accent">30 días</p>
          <p className="mt-1 text-[15px] text-fg">{t.summaryIn30}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-[12px] text-muted">
          <span>Día 1</span>
          <span>Día 30</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-border">
          <div className="h-full w-[3%] bg-accent" />
        </div>
      </div>

      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.continue}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 27 — Commitment -------------------- */
export function Commitment() {
  const { t, next, user, update } = useApp();
  return (
    <Screen>
      <Title>{t.commitmentTitle}</Title>
      <div className="mt-6 space-y-3">
        {t.commitmentOptions.map((o) => (
          <Choice
            key={o.value}
            selected={user.commitment === o.value}
            onClick={() => {
              update({ commitment: o.value as typeof user.commitment });
              setTimeout(next, 250);
            }}
          >
            {o.label}
          </Choice>
        ))}
      </div>
      <Spacer />
    </Screen>
  );
}

/* -------------------- Screen 28 — Affirmation -------------------- */
export function Affirmation() {
  const { t, next, user } = useApp();
  const msg =
    user.commitment === "totalmente"
      ? t.affirmationTotalmente
      : user.commitment === "muy"
        ? t.affirmationMuy
        : user.commitment === "poco"
          ? t.affirmationPoco
          : t.affirmationProbando;

  return (
    <Screen>
      <Spacer />
      <Fade>
        <p className="font-serif text-[22px] leading-snug text-fg">{msg}</p>
      </Fade>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.continue}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 29 — Final yes -------------------- */
export function FinalYes() {
  const { t, next, update } = useApp();
  return (
    <Screen>
      <Spacer />
      <Title>{t.finalYesTitle}</Title>
      <p className="mt-6 font-serif text-[22px] italic leading-snug text-accent">
        {t.finalYesQuote}
      </p>
      <Spacer />
      <FooterCta>
        <Button
          onClick={() => {
            update({ finalYes: true });
            next();
          }}
        >
          {t.finalYesYes}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            update({ finalYes: false });
            next();
          }}
        >
          {t.finalYesNo}
        </Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 30 — Snapshot -------------------- */
export function Snapshot() {
  const { t, next, user } = useApp();
  const hoursPerDay = user.phoneHours ? phoneHoursValue[user.phoneHours] : 5;
  const moodLabel =
    t.q1Options.find((o) => o.value === user.mood)?.label.toLowerCase() ?? "—";
  const prayedLabel =
    t.q3Options.find((o) => o.value === user.lastPrayed)?.label.toLowerCase() ??
    "—";

  return (
    <Screen>
      <Title>{t.snapshotTitle(user.name)}</Title>
      <div className="mt-6 space-y-3">
        <div className="rounded-2xl border border-border bg-card p-4 text-[14px] text-fg/85">
          {t.snapshotToday(moodLabel, hoursPerDay, prayedLabel)}
        </div>
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 text-[14px] text-fg">
          {t.snapshotFuture}
        </div>
      </div>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.snapshotCta}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 31 — Accessibility -------------------- */
export function Accessibility() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Title>{t.accTitle}</Title>
      <Body>{t.accBody}</Body>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.accCta}</Button>
        <button className="w-full py-3 text-[13px] text-muted hover:text-fg">
          {t.accPrivacy}
        </button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 32 — Notifications -------------------- */
export function Notifications() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Title>{t.notifTitle}</Title>
      <Body>{t.notifBody}</Body>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.notifCta}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 33 — Social proof -------------------- */
export function SocialProof() {
  const { t, next } = useApp();
  return (
    <Screen>
      <Title>{t.proofTitle}</Title>
      <div className="mt-6 space-y-3">
        <Fade delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-4 text-[15px] text-fg">
            {t.proofStat1}
          </div>
        </Fade>
        <Fade delay={0.5}>
          <div className="rounded-2xl border border-border bg-card p-4 text-[15px] text-fg">
            {t.proofStat2}
          </div>
        </Fade>
        <Fade delay={0.9}>
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4 text-[14px] italic text-fg/90">
            {t.proofQuote}
          </div>
        </Fade>
      </div>
      <Spacer />
      <FooterCta>
        <Button onClick={next}>{t.proofCta}</Button>
      </FooterCta>
    </Screen>
  );
}

/* -------------------- Screen 34 — Paywall -------------------- */
export function Paywall() {
  const { t, next, user } = useApp();
  const [selected, setSelected] = useState<"annual" | "weekly">("annual");
  return (
    <Screen>
      <Title>{t.paywallTitle(user.name)}</Title>

      <div className="mt-6 space-y-3">
        <button
          onClick={() => setSelected("annual")}
          className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
            selected === "annual"
              ? "border-accent bg-accent/10"
              : "border-border bg-card"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] uppercase tracking-wider text-muted">
                {t.paywallAnnualLabel}
              </div>
              <div className="mt-1 font-serif text-[22px] text-fg">
                {t.paywallAnnualPrice}
              </div>
              <div className="mt-1 text-[13px] text-accent">
                {t.paywallAnnualSub}
              </div>
            </div>
            <Ring on={selected === "annual"} />
          </div>
        </button>

        <button
          onClick={() => setSelected("weekly")}
          className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
            selected === "weekly"
              ? "border-accent bg-accent/10"
              : "border-border bg-card"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] uppercase tracking-wider text-muted">
                {t.paywallWeeklyLabel}
              </div>
              <div className="mt-1 font-serif text-[22px] text-fg">
                {t.paywallWeeklyPrice}
              </div>
            </div>
            <Ring on={selected === "weekly"} />
          </div>
        </button>
      </div>

      <ul className="mt-6 space-y-2 text-[13px] text-fg/80">
        {t.paywallFeatures.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-accent">✓</span> {f}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[12px] leading-relaxed text-muted">
        {t.paywallTrust}
      </p>

      <FooterCta>
        <Button onClick={next}>{t.paywallCta}</Button>
        <button
          onClick={next}
          className="w-full py-2 text-[13px] text-muted hover:text-fg"
        >
          {t.paywallLater}
        </button>
      </FooterCta>
    </Screen>
  );
}

function Ring({ on }: { on: boolean }) {
  return (
    <div
      className={`h-5 w-5 rounded-full border-2 ${
        on ? "border-accent bg-accent" : "border-muted"
      }`}
    />
  );
}

/* -------------------- Outro -------------------- */
export function Outro() {
  const { t, restart } = useApp();
  return (
    <Screen>
      <Spacer />
      <Title>{t.outroTitle}</Title>
      <Body>{t.outroBody}</Body>
      <Spacer />
      <FooterCta>
        <Button onClick={restart}>{t.outroCta}</Button>
      </FooterCta>
    </Screen>
  );
}
