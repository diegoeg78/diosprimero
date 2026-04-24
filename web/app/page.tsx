"use client";

import { AppProvider, useApp } from "@/lib/context";
import { TOTAL } from "@/lib/flow";
import { ProgressBar } from "@/components/ui";
import LangToggle from "@/components/LangToggle";
import {
  Accessibility,
  Affirmation,
  Age,
  Bomb,
  Bridge,
  ChartScreen,
  ChooseApp,
  Commitment,
  Day1,
  FinalYes,
  Loading,
  Mirror,
  NameScreen,
  Notifications,
  Outro,
  Paywall,
  Phone,
  Problem,
  Q1,
  Q16,
  Q17,
  Q2,
  Q3,
  R1,
  R15,
  R2,
  R3,
  Response,
  Review,
  SocialProof,
  Snapshot,
  Solution,
  Summary,
  Tell,
  Welcome,
} from "@/components/screens";

function Router() {
  const { screen, index } = useApp();

  // Map screen key → component
  const view = (() => {
    switch (screen) {
      case "welcome": return <Welcome />;
      case "problem": return <Problem />;
      case "solution": return <Solution />;
      case "name": return <NameScreen />;
      case "age": return <Age />;
      case "phone": return <Phone />;
      case "bomb": return <Bomb />;
      case "bridge": return <Bridge />;
      case "q1": return <Q1 />;
      case "r1": return <R1 />;
      case "q2": return <Q2 />;
      case "r2": return <R2 />;
      case "q3": return <Q3 />;
      case "r3": return <R3 />;
      case "r15": return <R15 />;
      case "q16": return <Q16 />;
      case "q17": return <Q17 />;
      case "mirror": return <Mirror />;
      case "chart": return <ChartScreen />;
      case "chooseApp": return <ChooseApp />;
      case "tell": return <Tell />;
      case "response": return <Response />;
      case "day1": return <Day1 />;
      case "review": return <Review />;
      case "loading": return <Loading />;
      case "summary": return <Summary />;
      case "commitment": return <Commitment />;
      case "affirmation": return <Affirmation />;
      case "finalYes": return <FinalYes />;
      case "snapshot": return <Snapshot />;
      case "acc": return <Accessibility />;
      case "notif": return <Notifications />;
      case "proof": return <SocialProof />;
      case "paywall": return <Paywall />;
      case "outro": return <Outro />;
      default: return <Welcome />;
    }
  })();

  return (
    <>
      {/* Hide progress on first (welcome) and last (outro) */}
      {index > 0 && screen !== "outro" && (
        <ProgressBar value={index} total={TOTAL} />
      )}
      <LangToggle />
      {view}
    </>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <main className="mx-auto min-h-dvh max-w-md">
        <Router />
      </main>
    </AppProvider>
  );
}
