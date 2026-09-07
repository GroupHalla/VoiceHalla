"use client";

import { motion } from "framer-motion";
import {
  Fingerprint,
  KeyRound,
  Lock,
  RefreshCcw,
  ShieldCheck,
  Vault,
} from "lucide-react";
import { SectionHeader, Aurora } from "@/components/site/effects";
import { useI18n } from "@/i18n/provider";

const ITEM_ICONS = [Fingerprint, Lock, RefreshCcw, KeyRound, Vault, ShieldCheck];

export function Security() {
  const { t } = useI18n();
  return (
    <section
      id="security"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      <Aurora variant="mixed" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Sticky intro + audio flow diagram */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                kicker={t.security.kicker}
                accent="emerald"
                title={
                  <>
                    {t.security.title}
                    <br className="hidden sm:block" /> {t.security.titleLine2}
                  </>
                }
                description={t.security.description}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="mt-8 rounded-2xl border border-white/[0.08] bg-black/40 p-5 sm:p-6"
              >
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  {t.security.flowTitle}
                </p>
                <div className="space-y-3 font-mono text-[13px] leading-relaxed">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-zinc-300">
                    <span className="rounded bg-[#b57bee]/15 px-1.5 py-0.5 text-[11px] text-[#c99bf5]">
                      mic
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">→</span>
                    <span className="text-[#c99bf5]">Opus 20 ms</span>
                    <span aria-hidden="true" className="text-zinc-600">→</span>
                    <span className="text-emerald-400">ChaCha20-Poly1305</span>
                  </p>
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[11px] text-zinc-400">
                      {t.security.flowServerChip}
                    </span>
                    <span className="text-zinc-400">
                      {t.security.flowServer} <span className="text-red-400">{t.security.flowServerDenied}</span>
                    </span>
                  </p>
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-zinc-300">
                    <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 text-[11px] text-emerald-300">
                      {t.security.flowYou}
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">→</span>
                    <span className="text-emerald-400">{t.security.flowValidateTag}</span>
                    <span aria-hidden="true" className="text-zinc-600">→</span>
                    <span className="text-[#c99bf5]">{t.security.flowDecode}</span>
                    <span aria-hidden="true" className="text-zinc-600">→</span>
                    <span className="text-zinc-300">{t.security.flowSpeaker}</span>
                  </p>
                </div>
                <div className="flow-line mt-5 h-px w-full" aria-hidden="true" />
              </motion.div>
            </div>
          </div>

          {/* Timeline items */}
          <div className="relative lg:col-span-7">
            <div
              aria-hidden="true"
              className="flow-line absolute bottom-6 left-[27px] top-6 hidden w-px sm:block"
            />
            <div className="space-y-4">
              {t.security.items.map((item, i) => {
                const Icon = ITEM_ICONS[i] ?? ShieldCheck;
                return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="group relative rounded-2xl border border-emerald-400/[0.12] bg-gradient-to-r from-emerald-400/[0.045] to-transparent p-5 pl-5 transition-all duration-300 hover:border-emerald-400/30 hover:from-emerald-400/[0.08] sm:p-6 sm:pl-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-[#0a0712] shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
