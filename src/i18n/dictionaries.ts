import en from "./dict-en";
import pt from "./dict-pt";
import es from "./dict-es";

export type Lang = "en" | "pt" | "es";

/** Canonical shape — derived from the English dictionary. */
export type Dict = typeof en;

export const dictionaries: Record<Lang, Dict> = { en, pt, es };

export const LANG_STORAGE_KEY = "halla-lang";

export const LANGS: { code: Lang; label: string; title: string }[] = [
  { code: "en", label: "EN", title: "English" },
  { code: "pt", label: "PT", title: "Português (Brasil)" },
  { code: "es", label: "ES", title: "Español" },
];

/** BCP-47 tag per language, for number formatting and <html lang>. */
export const LOCALE_TAGS: Record<Lang, string> = {
  en: "en-US",
  pt: "pt-BR",
  es: "es-ES",
};

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "pt" || value === "es";
}
