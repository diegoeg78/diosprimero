"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export function Screen({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex min-h-dvh flex-col px-6 pb-8 pt-16"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-serif text-[34px] leading-[1.1] tracking-tight text-fg">
      {children}
    </h1>
  );
}

export function Subtitle({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 font-serif text-[22px] italic leading-snug text-accent">
      {children}
    </p>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-relaxed text-fg/80">{children}</p>
  );
}

export function Spacer() {
  return <div className="flex-1" />;
}

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: BtnProps) {
  const base =
    "w-full rounded-2xl px-5 py-4 text-[16px] font-medium transition active:scale-[0.985] disabled:opacity-40 disabled:pointer-events-none";
  const styles = {
    primary: "bg-accent text-bg hover:brightness-110",
    secondary:
      "border border-border bg-card text-fg hover:border-accent/60",
    ghost: "text-muted hover:text-fg",
  }[variant];
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Choice({
  selected,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button
      className={`w-full rounded-2xl border px-5 py-4 text-left text-[15px] transition active:scale-[0.985] ${
        selected
          ? "border-accent bg-accent/10 text-fg"
          : "border-border bg-card text-fg/90 hover:border-accent/50"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`mt-6 w-full rounded-2xl border border-border bg-card px-5 py-4 text-[17px] text-fg outline-none placeholder:text-muted/60 focus:border-accent ${props.className ?? ""}`}
    />
  );
}

export function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = Math.min(100, (value / total) * 100);
  return (
    <div className="fixed left-6 right-6 top-4 z-20 h-[3px] overflow-hidden rounded-full bg-border">
      <div
        className="h-full bg-accent transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function FooterCta({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 space-y-3 pb-[env(safe-area-inset-bottom,0)]">
      {children}
    </div>
  );
}

export function Fade({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
