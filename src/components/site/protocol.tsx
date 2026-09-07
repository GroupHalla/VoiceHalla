"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Terminal } from "lucide-react";
import { SectionHeader } from "@/components/site/effects";
import { useI18n } from "@/i18n/provider";

const loginSteps = [
  { dir: "C→S", msg: "hello", payload: "{ proto, uid, nick, idPub }", color: "purple" },
  { dir: "S→C", msg: "identity_challenge", payload: "{ nonce }", color: "emerald" },
  { dir: "C→S", msg: "identity_proof", payload: "{ sig }", color: "purple" },
  { dir: "S→C", msg: "welcome", payload: "UID = hash(idPub) ✓", color: "emerald" },
];

const stepStyles = {
  purple: {
    chip: "bg-[#b57bee]/15 text-[#c99bf5]",
    msg: "text-zinc-200",
  },
  emerald: {
    chip: "bg-emerald-400/15 text-emerald-300",
    msg: "text-zinc-200",
  },
};

export function Protocol() {
  const { t } = useI18n();
  return (
    <section
      id="protocol"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker={t.protocol.kicker}
          accent="cyan"
          title={
            <>
              {t.protocol.title}
              <br className="hidden sm:block" /> {t.protocol.titleLine2}
            </>
          }
          description={t.protocol.description}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Transports table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] lg:col-span-7"
          >
            <div className="hidden grid-cols-[1.1fr_1.4fr_0.8fr] gap-4 border-b border-white/[0.07] bg-white/[0.03] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 md:grid">
              <span>{t.protocol.thChannel}</span>
              <span>{t.protocol.thTransport}</span>
              <span>{t.protocol.thPort}</span>
            </div>
            <div className="divide-y divide-white/[0.05]">
              {t.protocol.transports.map((tr, i) => (
                <motion.div
                  key={tr.channel}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="grid gap-2 px-6 py-5 transition-colors hover:bg-white/[0.025] md:grid-cols-[1.1fr_1.4fr_0.8fr] md:items-start md:gap-4"
                >
                  <div className="text-sm font-semibold text-white">
                    {tr.channel}
                    <p className="mt-1.5 text-[13px] font-normal leading-relaxed text-zinc-400 md:hidden">
                      {tr.use}
                    </p>
                  </div>
                  <div className="font-mono text-[13px] text-[#7de8f7]">
                    {tr.transport}
                  </div>
                  <div className="font-mono text-[13px] text-zinc-400">
                    {tr.port}
                  </div>
                  <p className="hidden text-[13px] leading-relaxed text-zinc-400 md:col-span-3 md:block">
                    {tr.use}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Animated login flow */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 lg:col-span-5"
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="h-4 w-4 text-[#c99bf5]" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-300">
                {t.protocol.loginTitle}
              </h3>
            </div>

            <div className="relative mt-6 space-y-0">
              {loginSteps.map((step, i) => {
                const styles = stepStyles[step.color as keyof typeof stepStyles];
                return (
                  <div key={step.msg}>
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.2 + i * 0.35 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${styles.chip}`}
                      >
                        {step.dir}
                      </span>
                      <div className="min-w-0">
                        <p className={`font-mono text-[13px] font-semibold ${styles.msg}`}>
                          {step.msg}
                        </p>
                        <p className="mt-0.5 truncate font-mono text-[11.5px] text-zinc-500">
                          {step.payload}
                        </p>
                      </div>
                    </motion.div>
                    {i < loginSteps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45 + i * 0.35 }}
                        className="py-1 pl-[26px]"
                      >
                        <ArrowDown
                          className="h-3.5 w-3.5 animate-pulse text-zinc-600"
                          style={{ animationDelay: `${i * 0.3}s` }}
                          aria-hidden="true"
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.7 }}
              className="mt-5 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.05] p-3 text-[13px] leading-relaxed text-zinc-400"
            >
              {t.protocol.spoofNote}
            </motion.p>

            <a
              href="https://github.com/GroupHalla/HallaServer/blob/main/PROTOCOL.md"
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#7de8f7] transition-colors hover:text-[#a5f0fb]"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              {t.protocol.readSpec}
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
