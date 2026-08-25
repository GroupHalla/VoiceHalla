"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Fingerprint,
  Github,
  Lock,
  MonitorSmartphone,
  Radio,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SERVER_ADDRESS = "163.176.35.133";
const SERVER_PORT = "9987";

const highlights = [
  { icon: Lock, text: "Voz cifrada por canal" },
  { icon: Zap, text: "Opus de baixa latência" },
  { icon: MonitorSmartphone, text: "Desktop + Android" },
  { icon: Radio, text: "Tela em 4K via WebRTC" },
];

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${SERVER_ADDRESS}:${SERVER_PORT}`);
    } catch {
      const el = document.createElement("textarea");
      el.value = `${SERVER_ADDRESS}:${SERVER_PORT}`;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-280px] h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-[#7c2ae8]/[0.22] blur-[120px]" />
        <div className="absolute right-[-160px] top-[220px] h-[380px] w-[380px] rounded-full bg-[#0ea5b7]/[0.14] blur-[110px]" />
        <div className="absolute left-[-180px] top-[420px] h-[340px] w-[340px] rounded-full bg-[#9333ea]/[0.12] blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0)",
            backgroundSize: "36px 36px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 32%, black 35%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 32%, black 35%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-[#b26bf0]/30 bg-[#b26bf0]/[0.08] px-4 py-1.5 text-xs font-medium text-[#d8bcf7]"
            >
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Código aberto · Domínio público (Unlicense)
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl"
          >
            Sua voz,{" "}
            <span className="bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#22d3ee] bg-clip-text text-transparent">
              seu servidor
            </span>
            <br className="hidden sm:block" /> sua liberdade.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            O Halla é um ecossistema completo de comunicação por voz — cliente
            desktop para Windows e Linux, app Android nativo e servidor
            auto-hospedável. Áudio Opus cifrado, canais com permissões
            granulares, sussurro, compartilhamento de tela em 4K e um protocolo
            aberto documentado. Sem telemetria, sem intermediários, sem custo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-12 w-full gap-2 bg-gradient-to-r from-[#8b31e8] to-[#6d28d9] px-7 text-[15px] font-semibold text-white shadow-[0_0_38px_-8px_rgba(139,49,232,0.65)] transition-all hover:from-[#9b46f0] hover:to-[#7c3aed] hover:shadow-[0_0_48px_-6px_rgba(139,49,232,0.8)] sm:w-auto"
            >
              <a href="#download">
                <Download className="h-5 w-5" aria-hidden="true" />
                Baixar o Halla
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 w-full gap-2 border-white/12 bg-white/[0.04] px-7 text-[15px] font-semibold text-zinc-200 hover:bg-white/[0.09] hover:text-white sm:w-auto"
            >
              <a
                href="https://github.com/GroupHalla"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
                Ver no GitHub
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {highlights.map((h) => (
              <li
                key={h.text}
                className="flex items-center gap-2 text-sm text-zinc-400"
              >
                <h.icon
                  className="h-4 w-4 text-[#b57bee]"
                  aria-hidden="true"
                />
                {h.text}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Official server card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div className="rounded-2xl border border-[#b26bf0]/20 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-5 shadow-[0_20px_60px_-30px_rgba(139,49,232,0.45)] backdrop-blur-sm sm:p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <span className="relative mt-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Servidor oficial no ar — teste agora
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Canais permanentes e temporários, aberto ao público.
                  </p>
                </div>
              </div>
              <button
                onClick={copyAddress}
                className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 font-mono text-sm text-zinc-200 transition-colors hover:border-[#b57bee]/40 hover:text-white sm:w-auto"
                aria-label="Copiar endereço do servidor oficial"
              >
                <Fingerprint className="h-4 w-4 text-[#b57bee]" aria-hidden="true" />
                {SERVER_ADDRESS}
                <span className="text-zinc-500">:</span>
                {SERVER_PORT}
                {copied ? (
                  <Check
                    className="h-4 w-4 text-emerald-400"
                    aria-hidden="true"
                  />
                ) : (
                  <Copy
                    className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-zinc-300"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            {copied && (
              <p className="mt-3 text-center text-xs text-emerald-400 sm:text-left" role="status">
                Endereço copiado — cole no Connect do cliente Halla.
              </p>
            )}
          </div>
        </motion.div>

        {/* App screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -top-8 bottom-[-24px] rounded-[32px] bg-gradient-to-b from-[#8b31e8]/[0.16] via-[#8b31e8]/[0.05] to-transparent blur-2xl"
          />
          <div className="relative overflow-hidden rounded-t-2xl border border-white/10 bg-[#120d1c] shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
              <span className="ml-3 font-mono text-xs text-zinc-500">
                Halla — meuservidor.exemplo.com
              </span>
            </div>
            <img
              src="/shots/demo.png"
              alt="Janela principal do Halla com a árvore de canais, painel de informações do servidor e chat em abas"
              className="w-full"
              width={1180}
              height={760}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
