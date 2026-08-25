"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageSquareWarning, Server } from "lucide-react";

export function Cta() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-[#b57bee]/20 bg-gradient-to-br from-[#1c1130] via-[#140d22] to-[#0d1520] px-6 py-14 text-center sm:px-12 sm:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-140px] h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-[#8b31e8]/[0.22] blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-160px] right-[-80px] h-[280px] w-[280px] rounded-full bg-[#22d3ee]/[0.12] blur-[100px]"
          />

          <div className="relative">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Entre no servidor oficial e dê sua opinião
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400">
              O primeiro servidor oficial do Halla está aberto ao público, com
              canais permanentes e temporários para você testar áudio de baixa
              latência, compartilhamento de tela e o ecossistema completo —
              do Desktop e do Mobile. Encontrou um bug ou tem uma sugestão? O
              canal de feedback é oficial e direto.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/40 px-5 py-3 font-mono text-sm text-zinc-200">
                <Server className="h-4 w-4 text-[#b57bee]" aria-hidden="true" />
                163.176.35.133:9987
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScwy7k_HyeNnl8kuNfMSs8H-pHUGfhuKijAxkYkzd7m_aX4NA/viewform"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8b31e8] to-[#6d28d9] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,49,232,0.6)] transition-all hover:from-[#9b46f0] hover:to-[#7c3aed]"
              >
                <MessageSquareWarning className="h-4 w-4" aria-hidden="true" />
                Reportar bug ou sugerir melhoria
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
