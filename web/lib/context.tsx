"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SCREENS, type ScreenKey } from "./flow";
import { copy, type ScreenCopy } from "./copy";
import { initialUserState, type Locale, type UserState } from "./types";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: ScreenCopy;

  user: UserState;
  update: (patch: Partial<UserState>) => void;

  index: number;
  screen: ScreenKey;
  next: () => void;
  back: () => void;
  restart: () => void;
  jumpTo: (key: ScreenKey) => void;
};

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");
  const [user, setUser] = useState<UserState>(initialUserState);
  const [index, setIndex] = useState(0);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      setLocale,
      t: copy[locale],
      user,
      update: (patch) => setUser((prev) => ({ ...prev, ...patch })),
      index,
      screen: SCREENS[index],
      next: () =>
        setIndex((i) => Math.min(SCREENS.length - 1, i + 1)),
      back: () => setIndex((i) => Math.max(0, i - 1)),
      restart: () => {
        setUser(initialUserState);
        setIndex(0);
      },
      jumpTo: (key) => {
        const i = SCREENS.indexOf(key);
        if (i >= 0) setIndex(i);
      },
    }),
    [locale, user, index],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
