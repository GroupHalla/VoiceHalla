"use client";

import { motion } from "framer-motion";
import {
  AudioWaveform,
  Bot,
  Ear,
  FileAudio,
  FolderTree,
  MessageSquareText,
  MonitorPlay,
  Puzzle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Eq, SectionHeader, SpotlightCard } from "@/components/site/effects";
import { useI18n } from "@/i18n/provider";

const FEATURE_ICONS = [Ear, FolderTree, MessageSquareText, Puzzle, ShieldCheck, FileAudio, Users, Bot];
const FEATURE_TAGS = ["whisper", "granular", "bbcode", "plugins", "ed25519", "wav · tts", "admin", "v6"];

const qualityPills = ["480p", "720p", "1080p", "2K", "4K"];

export function Features() {
  const { t } = useI18n();
  return (
    <section
      id="features"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-180px] top-1/4 h-[400px] w-[400px] rounded-full bg-[#7c2ae8]/[0.08] blur-[130px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker={t.features.kicker}
          accent="purple"
          title={
            <>
              {t.features.title}
              <br className="hidden sm:block" /> {t.features.titleLine2}
            </>
          }
          description={t.features.description}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured: voice */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="sm:col-span-2"
          >
            <SpotlightCard className="h-full rounded-2xl border border-[#b57bee]/20 bg-gradient-to-br from-[#b57bee]/[0.09] via-white/[0.02] to-transparent p-6 transition-colors hover:border-[#b57bee]/35 sm:p-7">
              <div className="flex h-full flex-col justify-between gap-6 sm:flex-row">
                <div className="max-w-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#b57bee]/25 bg-[#b57bee]/[0.1]">
                    <AudioWaveform className="h-5 w-5 text-[#c99bf5]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {t.features.voiceTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {t.features.voiceDesc}
                  </p>
                </div>
                {/* Live visual */}
                <div className="flex shrink-0 flex-col items-center justify-center gap-4 rounded-xl border border-white/[0.07] bg-black/30 px-8 py-6">
                  <Eq bars={9} className="scale-[2.1] origin-center" />
                  <p className="font-mono text-[11px] text-zinc-500">
                    48 kHz · opus · 20 ms
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Featured: screens */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <SpotlightCard
              rgb="34, 211, 238"
              className="h-full rounded-2xl border border-[#22d3ee]/20 bg-gradient-to-br from-[#22d3ee]/[0.08] via-white/[0.02] to-transparent p-6 transition-colors hover:border-[#22d3ee]/35"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#22d3ee]/25 bg-[#22d3ee]/[0.1]">
                <MonitorPlay className="h-5 w-5 text-[#7de8f7]" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {t.features.screenTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {t.features.screenDesc}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {qualityPills.map((q, i) => (
                  <span
                    key={q}
                    className={`rounded-md border px-2.5 py-1 font-mono text-[11px] ${
                      i === qualityPills.length - 1
                        ? "border-[#22d3ee]/40 bg-[#22d3ee]/[0.12] text-[#7de8f7]"
                        : "border-white/[0.08] bg-black/25 text-zinc-500"
                    }`}
                  >
                    {q}
                  </span>
                ))}
                <span className="rounded-md border border-white/[0.08] bg-black/25 px-2.5 py-1 font-mono text-[11px] text-zinc-500">
                  30/60 fps
                </span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Regular grid */}
          {t.features.items.map((f, i) => {
            const Icon = FEATURE_ICONS[i] ?? Ear;
            return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <SpotlightCard className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-colors hover:border-white/[0.15]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#b57bee]/20 bg-[#b57bee]/[0.08]">
                    <Icon className="h-5 w-5 text-[#c99bf5]" aria-hidden="true" />
                  </div>
                  <span className="rounded-md border border-white/[0.08] bg-black/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    {FEATURE_TAGS[i]}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {f.description}
                </p>
              </SpotlightCard>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
