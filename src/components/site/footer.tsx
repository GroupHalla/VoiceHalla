"use client";

import { ArrowUp, FileText, Github, Scale } from "lucide-react";
import Image from "next/image";
import { Eq } from "@/components/site/effects";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { useI18n } from "@/i18n/provider";

const PROJECT_LINKS = [
  { name: "Halla Desktop", href: "https://github.com/GroupHalla/Halla" },
  { name: "Halla Mobile", href: "https://github.com/GroupHalla/Halla-Mobile" },
  { name: "Halla Server", href: "https://github.com/GroupHalla/HallaServer" },
  { name: "WebRTC Builds", href: "https://github.com/GroupHalla/Halla-WebRTC-Builds" },
];

const RESOURCE_LINKS = [
  {
    name: "spec",
    href: "https://github.com/GroupHalla/HallaServer/blob/main/PROTOCOL.md",
  },
  {
    name: "plugins",
    href: "https://github.com/GroupHalla/Halla/blob/main/docs/PLUGINS.md",
  },
  {
    name: "security",
    href: "https://github.com/GroupHalla/HallaServer/blob/main/SECURITY.md",
  },
  {
    name: "feedback",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScwy7k_HyeNnl8kuNfMSs8H-pHUGfhuKijAxkYkzd7m_aX4NA/viewform",
  },
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative border-t border-white/[0.07] bg-black/40">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#a855f7]/50 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/halla-logo.png`}
                alt={t.footer.logoAlt}
                className="h-9 w-9 rounded-lg"
                width={36}
                height={36}
              />
              <span className="text-lg font-semibold tracking-tight text-white">
                Halla
              </span>
              <Eq bars={4} className="ml-1 opacity-60" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              {t.footer.tagline}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/GroupHalla"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:border-[#b57bee]/40 hover:bg-white/[0.09] hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                {t.footer.github}
              </a>
              <LanguageSwitcher />
            </div>
          </div>

          <nav aria-label={t.footer.projectsAria}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              {t.footer.projectsTitle}
            </h3>
            <ul className="mt-4 space-y-3.5">
              {PROJECT_LINKS.map((p, i) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col"
                  >
                    <span className="text-sm font-medium text-zinc-200 transition-colors group-hover:text-[#c99bf5]">
                      {p.name}
                    </span>
                    <span className="text-xs text-zinc-500">{t.footer.projects[i]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.resourcesAria}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
              {t.footer.resourcesTitle}
            </h3>
            <ul className="mt-4 space-y-3.5">
              {RESOURCE_LINKS.map((r, i) => (
                <li key={r.name}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
                  >
                    {t.footer.resources[i]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 sm:flex-row">
          <p className="flex items-center gap-2 text-xs text-zinc-500">
            <Scale className="h-3.5 w-3.5" aria-hidden="true" />
            {t.footer.license}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-400 transition-all hover:border-[#b57bee]/40 hover:text-white"
            aria-label={t.footer.backToTopAria}
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            {t.footer.backToTop}
          </a>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[11px] text-zinc-600">
          <FileText className="h-3 w-3" aria-hidden="true" />
          {t.footer.thirdParty}
        </p>
      </div>
    </footer>
  );
}
