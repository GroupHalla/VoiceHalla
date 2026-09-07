"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  dictionaries,
  isLang,
  LANG_STORAGE_KEY,
  LOCALE_TAGS,
  type Dict,
  type Lang,
} from "./dictionaries";

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Active dictionary (plain object — safe to read during render). */
  t: Dict;
  /** BCP-47 tag for number/date formatting (en-US / pt-BR / es-ES). */
  localeTag: string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

/* ---------- External language store (localStorage-backed) ----------
 * useSyncExternalStore keeps React happy: the server snapshot is always
 * "en" (matching the static export), and the persisted preference is
 * picked up right after hydration without setState-in-effect. */

let currentLang: Lang = "en";
const listeners = new Set<() => void>();

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* localStorage unavailable — keep English */
  }
  return "en";
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Lang {
  return currentLang;
}

function getServerSnapshot(): Lang {
  return "en";
}

if (typeof window !== "undefined") {
  // Pick up the stored preference once, before the first client snapshot.
  currentLang = readStoredLang();
}

function setLang(next: Lang) {
  currentLang = next;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
  } catch {
    /* ignore persistence failures */
  }
  for (const listener of listeners) listener();
}

/**
 * English is the site default and the SSR/static-export language; the user's
 * persisted choice (localStorage) applies immediately after hydration.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = LOCALE_TAGS[lang];
  }, [lang]);

  return (
    <I18nContext.Provider
      value={{
        lang,
        setLang,
        t: dictionaries[lang],
        localeTag: LOCALE_TAGS[lang],
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
