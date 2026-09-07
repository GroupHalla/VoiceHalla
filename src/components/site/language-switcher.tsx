"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { LANGS } from "@/i18n/dictionaries";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.lang.ariaLabel}
      className={`inline-flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/[0.04] p-0.5 ${className}`}
    >
      <Languages
        className="mx-1.5 h-3.5 w-3.5 text-zinc-500"
        aria-hidden="true"
      />
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          title={l.title}
          aria-pressed={lang === l.code}
          onClick={() => setLang(l.code)}
          className={`rounded-md px-2 py-1 text-[11px] font-bold tracking-wide transition-colors ${
            lang === l.code
              ? "bg-[#b57bee]/20 text-[#e3cdfa]"
              : "text-zinc-500 hover:text-zinc-200"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
