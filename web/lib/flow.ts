// Ordered list of screen keys. Keep in sync with components/screens.tsx.
export const SCREENS = [
  "welcome",      // 1
  "problem",      // 2
  "solution",     // 3
  "name",         // 4
  "age",          // 5
  "phone",        // 6
  "bomb",         // 7
  "bridge",       // 8
  "q1",           // 9
  "r1",           // 10
  "q2",           // 11
  "r2",           // 12
  "q3",           // 13
  "r3",           // 14
  "r15",          // 15
  "q16",          // 16
  "q17",          // 17
  "mirror",       // 18
  "chart",        // 19
  "chooseApp",    // 20
  "tell",         // 21
  "response",     // 22
  "day1",         // 23
  "review",       // 24
  "loading",      // 25
  "summary",      // 26
  "commitment",   // 27
  "affirmation",  // 28
  "finalYes",     // 29
  "snapshot",     // 30
  "acc",          // 31
  "notif",        // 32
  "proof",        // 33
  "paywall",      // 34
  "outro",        // demo end
] as const;

export type ScreenKey = (typeof SCREENS)[number];

export const TOTAL = 34;
