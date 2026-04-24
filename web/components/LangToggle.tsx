"use client";

import { useApp } from "@/lib/context";

export default function LangToggle() {
  const { locale, setLocale } = useApp();
  return (
    <div className="fixed right-5 top-5 z-30 flex rounded-full border border-border bg-card/80 p-1 text-[12px] backdrop-blur">
      <button
        onClick={() => setLocale("es")}
        className={`rounded-full px-3 py-1.5 transition ${
          locale === "es" ? "bg-accent text-bg" : "text-muted hover:text-fg"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLocale("pt")}
        className={`rounded-full px-3 py-1.5 transition ${
          locale === "pt" ? "bg-accent text-bg" : "text-muted hover:text-fg"
        }`}
      >
        PT
      </button>
    </div>
  );
}
