"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  MessageSquareWarning,
  Server,
} from "lucide-react";
import { Eq } from "@/components/site/effects";

export function Cta() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    const text = "163.176.35.133:9987";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="beam noise relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c1130] via-[#140d22] to-[#0d1520] px-6 py-14 sm:px-12 sm:py-16"
        >
          {/* Aurora */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="aurora absolute left-1/2 top-[-160px] h-[340px] w-[680px] -translate-x-1/2 rounded-full bg-[#8b31e8]/[0.2] blur-[110px]" />
            <div className="aurora-2 absolute bottom-[-180px] right-[-80px] h-[300px] w-[300px] rounded-full bg-[#22d3ee]/[0.12] blur-[100px]" />
          </div>

          <div className="relative z-[2]">
            <div className="flex items-center gap-3">
              <Eq bars={5} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d8bcf7]">
                servidor oficial · aberto ao público
              </span>
            </div>

            <h2 className="mt-5 max-w-2xl text-balance text-left text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
              Entre no servidor oficial
              <br className="hidden sm:block" /> e dê sua opinião
            </h2>
            <p className="mt-4 max-w-2xl text-left text-base leading-relaxed text-zinc-400">
              Canais permanentes e temporários para testar áudio de baixa
              latência, compartilhamento de tela e o ecossistema completo — do
              Desktop e do Mobile. Encontrou um bug ou tem uma sugestão? O
              canal de feedback é oficial e direto.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <button
                onClick={copyAddress}
                className="group flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-black/40 px-5 py-3.5 font-mono text-sm text-zinc-200 transition-all hover:border-[#b57bee]/40 hover:text-white"
                aria-label="Copiar endereço do servidor oficial"
              >
                <Server className="h-4 w-4 text-[#b57bee]" aria-hidden="true" />
                163.176.35.133:9987
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                ) : (
                  <Copy
                    className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-zinc-300"
                    aria-hidden="true"
                  />
                )}
              </button>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScwy7k_HyeNnl8kuNfMSs8H-pHUGfhuKijAxkYkzd7m_aX4NA/viewform"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#8b31e8] to-[#6d28d9] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,49,232,0.6)] transition-shadow hover:shadow-[0_0_46px_-6px_rgba(139,49,232,0.85)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <MessageSquareWarning className="h-4 w-4" aria-hidden="true" />
                Reportar bug ou sugerir melhoria
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            {copied && (
              <p className="mt-3 text-xs text-emerald-400" role="status">
                Endereço copiado — cole no Connect do cliente Halla.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
