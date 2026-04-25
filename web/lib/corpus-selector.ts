/**
 * corpus-selector.ts
 *
 * Picks the right corpus entry to show when a user tries to open a blocked app.
 * Runs entirely client-side — no network, no LLM, no server.
 *
 * Rules:
 *   - Never repeat an entry shown in the last 45 days
 *   - Never repeat any of the last 30 entries shown
 *   - Prefer entries that match the current time of day
 *   - Prefer entries that match the user's current mood/bucket
 *   - Fall back gracefully if the pool is too small
 */

import type { Mood } from "./types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TimeBias = "morning" | "evening" | "night" | "any";

export interface CorpusEntry {
  id: string;
  bucket: string;
  verse_ref: string;
  verse_testament: "NT" | "OT";
  verse_book_category: "gospel" | "pauline" | "general_epistle" | "apocalyptic";
  mood_tags: string[];
  time_bias: TimeBias;
  tone: string;
  situation_hint: string;
  advice: string;
  prayer: string;
}

interface BucketFile {
  bucket: string;
  description: string;
  total_entries: number;
  entries: CorpusEntry[];
}

/** Persisted in localStorage. Tracks what was shown and when. */
interface SelectorState {
  /** Ordered oldest→newest. Max length = RECENT_WINDOW. */
  recentIds: string[];
  /** entryId → Unix timestamp (ms) of last time it was shown. */
  shownAt: Record<string, number>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COOLDOWN_MS = 45 * 24 * 60 * 60 * 1000; // 45 days
const RECENT_WINDOW = 30;
const STATE_KEY = "dp_selector_v1";

// ---------------------------------------------------------------------------
// All available buckets (add new ones here as the corpus grows)
// ---------------------------------------------------------------------------

const ALL_BUCKETS: string[] = [
  "addiction_urge",
  "anger_frustration",
  "anger_god",
  "anx_general",
  "betrayal_trust",
  "chronic_pain",
  "comparison_envy",
  "depression_low",
  "disappointment_god",
  "divorce_separation",
  "envy_success",
  "evening_gratitude",
  "family_conflict",
  "fear_future",
  "financial_stress",
  "forgiveness_self",
  "gratitude_small",
  "gratitude_specific",
  "grief_loss",
  "guilt_relapse",
  "health_fear",
  "identity_crisis",
  "joy_overflow",
  "loneliness",
  "longing_love",
  "migration_displacement",
  "morning_start",
  "new_beginning",
  "night_restless",
  "overwhelm_decisions",
  "parenting_struggle",
  "perfectionism",
  "pornography_struggle",
  "prodigal_return",
  "purpose_lost",
  "rejection",
  "relationship_pain",
  "rest_mental",
  "sad_general",
  "self_worth",
  "shame_past",
  "social_anxiety",
  "spiritual_dryness",
  "temptation_general",
  "waiting_prayer",
  "work_stress",
  "conflict_coworker",
  "crisis_faith",
  "pride_humility",
  "suicidal_thoughts",
];

// ---------------------------------------------------------------------------
// Mood → relevant buckets
// When the user picks a mood at onboarding, these are the buckets we
// prioritize. Ordered by relevance (first = most relevant).
// ---------------------------------------------------------------------------

const MOOD_BUCKETS: Record<Mood, string[]> = {
  ansiedad: [
    "anx_general",
    "fear_future",
    "night_restless",
    "social_anxiety",
    "overwhelm_decisions",
    "health_fear",
    "work_stress",
    "rest_mental",
  ],
  vacio: [
    "spiritual_dryness",
    "purpose_lost",
    "depression_low",
    "loneliness",
    "identity_crisis",
    "sad_general",
    "disappointment_god",
    "grief_loss",
  ],
  culpa: [
    "guilt_relapse",
    "forgiveness_self",
    "shame_past",
    "perfectionism",
    "addiction_urge",
    "pornography_struggle",
    "anger_god",
  ],
  aburrimiento: [
    "purpose_lost",
    "gratitude_small",
    "gratitude_specific",
    "joy_overflow",
    "morning_start",
    "new_beginning",
    "prodigal_return",
  ],
  "no-se": ALL_BUCKETS,
};

// ---------------------------------------------------------------------------
// Time bias
// ---------------------------------------------------------------------------

function getTimeBias(): TimeBias {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 20) return "evening";
  return "night"; // 20:00–04:59
}

/** True if the entry's time_bias is compatible with the current time. */
function matchesTime(entry: CorpusEntry, current: TimeBias): boolean {
  return entry.time_bias === "any" || entry.time_bias === current;
}

// ---------------------------------------------------------------------------
// State management (localStorage)
// ---------------------------------------------------------------------------

function loadState(): SelectorState {
  if (typeof window === "undefined") return { recentIds: [], shownAt: {} };
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return { recentIds: [], shownAt: {} };
    return JSON.parse(raw) as SelectorState;
  } catch {
    return { recentIds: [], shownAt: {} };
  }
}

function saveState(state: SelectorState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silently skip
  }
}

// ---------------------------------------------------------------------------
// Bucket loading — fetch + in-memory cache
// ---------------------------------------------------------------------------

const bucketCache = new Map<string, CorpusEntry[]>();

async function loadBucket(name: string): Promise<CorpusEntry[]> {
  if (bucketCache.has(name)) return bucketCache.get(name)!;
  try {
    const res = await fetch(`/corpus/${name}_es.json`);
    if (!res.ok) return [];
    const data: BucketFile = await res.json();
    bucketCache.set(name, data.entries);
    return data.entries;
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Filtering helpers
// ---------------------------------------------------------------------------

function isOnCooldown(entry: CorpusEntry, state: SelectorState): boolean {
  const lastShown = state.shownAt[entry.id];
  if (!lastShown) return false;
  return Date.now() - lastShown < COOLDOWN_MS;
}

function isInRecentWindow(entry: CorpusEntry, state: SelectorState): boolean {
  return state.recentIds.includes(entry.id);
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Select the best corpus entry to show right now.
 *
 * @param mood  The user's current mood (from UserState). Pass undefined to
 *              draw from the full corpus.
 * @returns     A CorpusEntry, or null if the corpus couldn't be loaded.
 */
export async function selectEntry(mood?: Mood | null): Promise<CorpusEntry | null> {
  const state = loadState();
  const timeBias = getTimeBias();

  // 1. Determine which buckets to pull from
  const targetBuckets =
    mood && mood !== "no-se"
      ? MOOD_BUCKETS[mood]
      : ALL_BUCKETS;

  // 2. Load all target buckets in parallel
  const loaded = await Promise.all(
    targetBuckets
      .filter((b) => ALL_BUCKETS.includes(b)) // only existing buckets
      .map((b) => loadBucket(b))
  );
  const pool: CorpusEntry[] = loaded.flat();

  if (pool.length === 0) return null;

  // 3. Remove entries that are on cooldown or in the recent window
  const available = pool.filter(
    (e) => !isOnCooldown(e, state) && !isInRecentWindow(e, state)
  );

  // 4. Prefer entries that match the current time of day
  const timeMatched = available.filter((e) => matchesTime(e, timeBias));

  // 5. Pick from the best pool available, relaxing constraints if needed
  let candidate: CorpusEntry | null = null;

  if (timeMatched.length > 0) {
    candidate = pickRandom(timeMatched);
  } else if (available.length > 0) {
    // Good entries, but none match the time — that's fine
    candidate = pickRandom(available);
  } else {
    // All entries are on cooldown. Relax: ignore cooldown, keep recent window
    const relaxed = pool.filter((e) => !isInRecentWindow(e, state));
    if (relaxed.length > 0) {
      candidate = pickRandom(relaxed);
    } else {
      // Complete fallback: show anything from the pool
      candidate = pickRandom(pool);
    }
  }

  return candidate;
}

/**
 * Record that an entry was shown. Call this right after displaying it.
 * Updates both the 45-day cooldown map and the 30-entry recent window.
 */
export function markShown(entryId: string): void {
  const state = loadState();

  // Update cooldown timestamp
  state.shownAt[entryId] = Date.now();

  // Update recent window (append, then trim to max size)
  state.recentIds = [...state.recentIds.filter((id) => id !== entryId), entryId];
  if (state.recentIds.length > RECENT_WINDOW) {
    state.recentIds = state.recentIds.slice(-RECENT_WINDOW);
  }

  saveState(state);
}

/**
 * Wipe all selector history. Useful for testing or if the user resets the app.
 */
export function resetSelectorState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STATE_KEY);
  bucketCache.clear();
}

/**
 * Returns the raw state — useful for a debug screen.
 */
export function getSelectorState(): SelectorState {
  return loadState();
}
