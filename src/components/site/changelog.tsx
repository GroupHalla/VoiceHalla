"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bug,
  Container,
  Gauge,
  Monitor,
  Network,
  PlusCircle,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { SectionHeader } from "@/components/site/effects";
import { useI18n } from "@/i18n/provider";
import {
  CHANGELOG,
  CHANGELOG_CHANNELS,
  CHANGELOG_REPOS,
  releaseUrl,
  type ChangelogCategory,
  type ChangelogChannel,
  type ChangelogRelease,
} from "@/data/changelog";

/* Channel tabs mirror the Downloads section (same icons, same pill style). */
const CHANNEL_ICONS: Record<ChangelogChannel, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  server: Container,
};

/* Keep-a-changelog semantics: green for new, red for fixes, amber for
 * changes, violet for security, cyan for protocol, sky for performance. */
const CATEGORY_META: Record<
  ChangelogCategory,
  { icon: typeof ShieldCheck; cls: string }
> = {
  protocol: {
    icon: Network,
    cls: "border-[#22d3ee]/25 bg-[#22d3ee]/[0.08] text-[#67e8f9]",
  },
  security: {
    icon: ShieldCheck,
    cls: "border-[#a855f7]/25 bg-[#a855f7]/[0.08] text-[#d8b4fe]",
  },
  added: {
    icon: PlusCircle,
    cls: "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300",
  },
  changed: {
    icon: RefreshCw,
    cls: "border-amber-400/25 bg-amber-400/[0.08] text-amber-300",
  },
  fixed: {
    icon: Bug,
    cls: "border-rose-400/25 bg-rose-400/[0.08] text-rose-300",
  },
  performance: {
    icon: Gauge,
    cls: "border-sky-400/25 bg-sky-400/[0.08] text-sky-300",
  },
};

function formatDate(iso: string, localeTag: string): string {
  return new Intl.DateTimeFormat(localeTag, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

function CategoryChip({ category }: { category: ChangelogCategory }) {
  const { t } = useI18n();
  const meta = CATEGORY_META[category];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] ${meta.cls}`}
    >
      <meta.icon className="h-3 w-3" aria-hidden="true" />
      {t.changelog.categories[category]}
    </span>
  );
}

function ReleaseCard({
  release,
  isLatest,
}: {
  release: ChangelogRelease;
  isLatest: boolean;
}) {
  const { t, lang, localeTag } = useI18n();
  const tag = `v${release.version}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative pl-10 sm:pl-14"
    >
      {/* Timeline dot + connecting line */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-2.5 z-[1] flex h-4 w-4 items-center justify-center rounded-full border-2 ${
          release.milestone
            ? "border-[#22d3ee] bg-[#0a0712] shadow-[0_0_14px_rgba(34,211,238,0.55)]"
            : isLatest
              ? "border-[#b57bee] bg-[#0a0712] shadow-[0_0_14px_rgba(181,123,238,0.5)]"
              : "border-zinc-600 bg-[#0a0712]"
        }`}
      />

      <div
        className={`group rounded-2xl border p-5 transition-colors duration-300 sm:p-6 ${
          release.milestone
            ? "border-[#22d3ee]/[0.22] bg-gradient-to-b from-[#22d3ee]/[0.05] to-white/[0.015] hover:border-[#22d3ee]/[0.4]"
            : "border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.012] hover:border-white/[0.16]"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="bg-gradient-to-br from-white via-[#d8bcf7] to-[#a855f7] bg-clip-text font-mono text-xl font-bold tracking-tight text-transparent">
                {tag}
              </h3>
              {isLatest && (
                <span className="rounded-full border border-[#b57bee]/40 bg-[#b57bee]/[0.12] px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#d8b4fe]">
                  {t.changelog.latest}
                </span>
              )}
              {release.milestone && (
                <span className="rounded-full border border-[#22d3ee]/40 bg-[#22d3ee]/[0.1] px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#67e8f9]">
                  {t.changelog.milestone}
                </span>
              )}
            </div>
            <p className="mt-2 text-[15px] font-semibold leading-snug text-zinc-100">
              {release.headline[lang]}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 pt-0.5 text-[12px] text-zinc-500">
            <time dateTime={release.date}>
              {formatDate(release.date, localeTag)}
            </time>
            <span aria-hidden="true" className="text-zinc-700">
              ·
            </span>
            <a
              href={releaseUrl(release)}
              target="_blank"
              rel="noreferrer"
              aria-label={t.changelog.viewReleaseAria.replace("{tag}", tag)}
              className="inline-flex items-center gap-1 font-medium text-zinc-500 transition-colors hover:text-[#c99bf5]"
            >
              {t.changelog.viewRelease}
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <ul className="mt-4 flex flex-col gap-3">
          {release.entries.map((entry, i) => (
            <li key={i} className="flex flex-col gap-2 sm:flex-row sm:items-start">
              <span className="sm:pt-0.5">
                <CategoryChip category={entry.category} />
              </span>
              <p className="text-[13.5px] leading-relaxed text-zinc-400">
                {entry.text[lang]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Changelog() {
  const { t } = useI18n();
  const [active, setActive] = useState<ChangelogChannel>("desktop");

  const releases = CHANGELOG.filter((r) => r.channel === active);

  return (
    <section
      id="changelog"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-[#22d3ee]/[0.06] blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker={t.changelog.kicker}
          accent="cyan"
          title={
            <>
              {t.changelog.title}
              <br />
              <span className="bg-gradient-to-r from-[#67e8f9] to-[#a855f7] bg-clip-text text-transparent">
                {t.changelog.titleLine2}
              </span>
            </>
          }
          description={t.changelog.description}
        />

        <div
          className="mt-10 flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label={t.changelog.channelAria}
        >
          {CHANGELOG_CHANNELS.map((channel) => {
            const Icon = CHANNEL_ICONS[channel];
            const isActive = active === channel;
            return (
              <button
                key={channel}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(channel)}
                className={`relative flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "border-[#b57bee]/50 bg-[#b57bee]/[0.14] text-white"
                    : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="changelog-tab-glow"
                    className="absolute inset-0 -z-10 rounded-full bg-[#b57bee]/[0.14]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="h-4 w-4" aria-hidden="true" />
                {t.changelog.channels[channel]}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32 }}
            className="mt-10"
          >
            <div className="relative flex flex-col gap-5 before:absolute before:left-[7.5px] before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-[#b57bee]/40 before:via-white/[0.09] before:to-transparent sm:gap-6">
              {releases.map((release, i) => (
                <ReleaseCard
                  key={release.version}
                  release={release}
                  isLatest={i === 0}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 pl-10 sm:pl-14">
          <p className="text-[12.5px] text-zinc-500">{t.changelog.sinceNote}</p>
          <a
            href={`${CHANGELOG_REPOS[active]}/releases`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#c99bf5] transition-colors hover:text-[#e3cdfa]"
          >
            {t.changelog.fullHistory}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
