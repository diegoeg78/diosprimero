export type Locale = "es" | "pt";

export type Mood =
  | "vacio"
  | "ansiedad"
  | "aburrimiento"
  | "culpa"
  | "no-se";

export type JesusPhrase =
  | "cansados"
  | "paz"
  | "camino"
  | "no-turbe"
  | "no-se";

export type LastPrayed =
  | "hoy"
  | "semana"
  | "mes"
  | "mas-mes"
  | "no-me-acuerdo";

export type Tradition =
  | "catolico"
  | "evangelico"
  | "sin-denominacion"
  | "buscando"
  | "prefiero-no-decir";

export type Source =
  | "social"
  | "youtube"
  | "amigo"
  | "busqueda"
  | "otro";

export type BlockedApp =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "twitter"
  | "otra";

export type Commitment =
  | "totalmente"
  | "muy"
  | "poco"
  | "probando";

export type AgeBucket =
  | "13-17"
  | "18-24"
  | "25-34"
  | "35-44"
  | "45-54"
  | "55+";

export type PhoneHours = "lt2" | "2-4" | "4-6" | "6-8" | "gt8";

export interface UserState {
  name: string;
  age: AgeBucket | null;
  phoneHours: PhoneHours | null;
  mood: Mood | null;
  jesusPhrase: JesusPhrase | null;
  lastPrayed: LastPrayed | null;
  tradition: Tradition | null;
  source: Source | null;
  blockedApp: BlockedApp | null;
  currentFeeling: string;
  currentEmoji: string;
  commitment: Commitment | null;
  finalYes: boolean | null;
}

export const initialUserState: UserState = {
  name: "",
  age: null,
  phoneHours: null,
  mood: null,
  jesusPhrase: null,
  lastPrayed: null,
  tradition: null,
  source: null,
  blockedApp: null,
  currentFeeling: "",
  currentEmoji: "",
  commitment: null,
  finalYes: null,
};

// Map phoneHours bucket to representative hours/day for "bomb" math
export const phoneHoursValue: Record<PhoneHours, number> = {
  lt2: 1.5,
  "2-4": 3,
  "4-6": 5,
  "6-8": 7,
  gt8: 9,
};
