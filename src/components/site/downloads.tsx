"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Apple,
  ArrowUpRight,
  Check,
  Container,
  Copy,
  Download,
  Github,
  Monitor,
  Smartphone,
  Terminal,
} from "lucide-react";
import { SectionHeader, SpotlightCard } from "@/components/site/effects";
import { useLatestRelease, type UseLatestRelease } from "@/hooks/use-latest-release";
import { latestRelease } from "@/lib/github";
import { useI18n } from "@/i18n/provider";

type PlatformId = "desktop" | "mobile" | "server";

type DownloadTarget = {
  id: string;
  label: string;
  match: (name: string) => boolean;
};

/* Static platform metadata (repo/links/icons); text comes from the dict. */
const PLATFORM_META: {
  id: PlatformId;
  repoName: string;
  repo: string;
  icon: typeof Monitor;
}[] = [
  { id: "desktop", repoName: "Halla", repo: "https://github.com/GroupHalla/Halla", icon: Monitor },
  { id: "mobile", repoName: "Halla-Mobile", repo: "https://github.com/GroupHalla/Halla-Mobile", icon: Smartphone },
  { id: "server", repoName: "HallaServer", repo: "https://github.com/GroupHalla/HallaServer", icon: Container },
];

/* Qual asset de cada repo o botão de download deve pegar na última release. */
const downloadTargets: Record<PlatformId, DownloadTarget[]> = {
  desktop: [
    {
      id: "windows",
      label: "Windows",
      match: (n) => n.toLowerCase().endsWith(".exe"),
    },
  ],
  mobile: [
    {
      id: "android",
      label: "Android",
      match: (n) => n.toLowerCase().endsWith(".apk"),
    },
  ],
  server: [
    {
      id: "win64",
      label: "Windows x64",
      match: (n) => n.toLowerCase().includes("win64"),
    },
    {
      id: "linux-x64",
      label: "Linux x64",
      match: (n) => n.toLowerCase().includes("linux-x64"),
    },
    {
      id: "linux-arm64",
      label: "Linux arm64",
      match: (n) => n.toLowerCase().includes("linux-arm64"),
    },
  ],
};

/* Default do Server: detecta o SO do visitante (Windows primeiro, resto vira Linux). */
function defaultServerTarget(): string {
  if (typeof navigator === "undefined") return "win64";
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "win64";
  if (/(aarch64|arm64|armv8)/i.test(ua)) return "linux-arm64";
  return "linux-x64";
}

function CodeBlock({ code, filename }: { code: string; filename: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-black/55">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        </div>
        <span className="font-mono text-[11px] text-zinc-500">{filename}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-zinc-400 transition-colors hover:text-white"
          aria-label={t.downloads.copyAria}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" aria-hidden="true" />
              {t.downloads.copied}
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" aria-hidden="true" />
              {t.downloads.copy}
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function Downloads() {
  const { t } = useI18n();
  const platforms = PLATFORM_META.map((p) => ({
    ...p,
    ...t.downloads.platforms[p.id],
  }));
  const [active, setActive] = useState<PlatformId>("desktop");
  const current = platforms.find((p) => p.id === active) ?? platforms[0];

  // Última release de cada repo (API do GitHub, cache local de ~1h)
  const desktopRel = useLatestRelease("Halla");
  const mobileRel = useLatestRelease("Halla-Mobile");
  const serverRel = useLatestRelease("HallaServer");
  const rel: UseLatestRelease =
    current.id === "desktop"
      ? desktopRel
      : current.id === "mobile"
        ? mobileRel
        : serverRel;

  const [serverTarget, setServerTarget] = useState<string>(() =>
    defaultServerTarget()
  );
  const targets = downloadTargets[current.id];
  const activeTargetId =
    current.id === "server" ? serverTarget : targets[0].id;
  const activeTarget = targets.find((t) => t.id === activeTargetId) ?? targets[0];
  const asset = rel.release?.assets.find((a) => activeTarget.match(a.name));

  // Clique: baixa direto o asset da última release; se a API falhar, abre releases.
  const handleDownload = async () => {
    let data = rel.release;
    if (!data) data = await latestRelease(current.repoName);
    const found = data?.assets.find((a) => activeTarget.match(a.name));
    if (found) {
      window.location.assign(found.browser_download_url);
    } else {
      window.open(`${current.repo}/releases/latest`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="download"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#7c2ae8]/[0.08] blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker={t.downloads.kicker}
          accent="purple"
          title={t.downloads.title}
          description={t.downloads.description}
        />

        <div
          className="mt-10 flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label={t.downloads.platformsAria}
        >
          {platforms.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === p.id}
              onClick={() => setActive(p.id)}
              className={`relative flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === p.id
                  ? "border-[#b57bee]/50 bg-[#b57bee]/[0.14] text-white"
                  : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200"
              }`}
            >
              <p.icon className="h-4 w-4" aria-hidden="true" />
              {p.label}
              {active === p.id && (
                <motion.span
                  layoutId="tab-glow"
                  className="absolute inset-0 -z-10 rounded-full bg-[#b57bee]/[0.14]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32 }}
            className="mt-8"
          >
            <SpotlightCard className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 sm:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-bold text-white">
                    {current.title}
                  </h3>
                  <p className="mt-1 font-mono text-[13px] text-[#c99bf5]">
                    {current.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {current.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-stretch gap-2 md:items-end">
                  {current.id === "server" && (
                    <div
                      className="flex flex-wrap gap-1.5 md:justify-end"
                      role="group"
                      aria-label={t.downloads.targetsAria}
                    >
                      {targets.map((tg) => (
                        <button
                          key={tg.id}
                          type="button"
                          onClick={() => setServerTarget(tg.id)}
                          aria-pressed={serverTarget === tg.id}
                          className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                            serverTarget === tg.id
                              ? "border-[#b57bee]/50 bg-[#b57bee]/[0.14] text-white"
                              : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200"
                          }`}
                        >
                          {tg.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="group relative inline-flex shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-xl bg-gradient-to-r from-[#8b31e8] to-[#6d28d9] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,49,232,0.6)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_44px_-6px_rgba(139,49,232,0.85)] active:scale-[0.97]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                    />
                    <span className="flex items-center gap-2">
                      <Download className="h-4 w-4" aria-hidden="true" />
                      {rel.tag
                        ? t.downloads.downloadTag.replace("{tag}", rel.tag)
                        : t.downloads.downloadFallback}
                    </span>
                    {asset && (
                      <span className="max-w-[280px] truncate font-mono text-[10px] font-normal text-white/75">
                        {asset.name}
                      </span>
                    )}
                  </button>
                  <a
                    href={`${current.repo}/releases`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-medium text-zinc-500 transition-colors hover:text-[#c99bf5]"
                  >
                    {t.downloads.releasesLink}
                  </a>
                </div>
              </div>

              <div className="mt-7">
                <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.downloads.buildTitle}
                </p>
                <CodeBlock code={current.code} filename={current.filename} />
                <p className="mt-3 flex items-center gap-1.5 text-[13px] text-zinc-500">
                  <Apple className="h-3.5 w-3.5" aria-hidden="true" />
                  {current.releaseNote}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {current.deps.map((d) => (
                  <span
                    key={d}
                    className="rounded-md border border-white/[0.08] bg-black/25 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <a
                href={current.repo}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#c99bf5] transition-colors hover:text-[#e3cdfa]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                {t.downloads.sourceLink}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </SpotlightCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
