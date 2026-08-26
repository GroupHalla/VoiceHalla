"use client";

import { useEffect, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Check,
  Copy,
  Download,
  Fingerprint,
  Github,
  Lock,
  MonitorPlay,
  ShieldCheck,
} from "lucide-react";
import { Eq } from "@/components/site/effects";
import type { Shot } from "@/data/screenshots";
import Image from "next/image";

const SERVER_ADDRESS = "163.176.35.133";
const SERVER_PORT = "9987";

type HeroProps = {
  heroShot?: Shot | null;
};

const DEFAULT_HERO = {
  src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/screenshots/01-janela-principal.png`,
  alt: "Janela principal do Halla no tema escuro atual: árvore de canais com indicadores de fala, painel de informações com banner roxo e chat em abas",
  label: "Janela principal",
};

const ROTATING = [
  "seu servidor.",
  "sua regra.",
  "sua comunidade.",
  "sua liberdade.",
];

const wordReveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: 0.12 * i, ease: "easeOut" as const },
  }),
};

export function Hero({ heroShot }: HeroProps) {
  const hero = heroShot ?? DEFAULT_HERO;
  const [copied, setCopied] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  // Mouse parallax for the app mockup
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 60,
    damping: 16,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 60,
    damping: 16,
  });

  useEffect(() => {
    const t = setInterval(
      () => setWordIndex((v) => (v + 1) % ROTATING.length),
      2500
    );
    return () => clearInterval(t);
  }, []);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const copyAddress = async () => {
    const text = `${SERVER_ADDRESS}:${SERVER_PORT}`;
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
    <section
      onMouseMove={onMouseMove}
      className="noise relative overflow-hidden pt-32 pb-10 sm:pt-40"
    >
      {/* Background: aurora + drifting grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora absolute left-1/2 top-[-300px] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[#7c2ae8]/[0.2] blur-[130px]" />
        <div className="aurora-2 absolute right-[-160px] top-[240px] h-[380px] w-[380px] rounded-full bg-[#0ea5b7]/[0.12] blur-[110px]" />
        <div className="aurora-3 absolute left-[-180px] top-[460px] h-[340px] w-[340px] rounded-full bg-[#9333ea]/[0.12] blur-[110px]" />
        <div
          className="grid-drift absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.09) 1px, transparent 0)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 75% 60% at 50% 30%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 60% at 50% 30%, black 30%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ---- Left: copy ---- */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#b26bf0]/25 bg-[#b26bf0]/[0.08] px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-[#d8bcf7]">
                Código aberto · Livre para uso não comercial
              </span>
            </motion.div>

            <h1 className="mt-6 text-left text-[2.6rem] font-bold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.1rem]">
              <motion.span
                variants={wordReveal}
                initial="hidden"
                animate="show"
                custom={0}
                className="block"
              >
                Sua voz,
              </motion.span>
              <span className="block min-h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING[wordIndex]}
                    initial={{ y: "65%", opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-65%", opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                    className="text-shimmer inline-block bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#22d3ee] bg-clip-text text-transparent"
                  >
                    {ROTATING[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="mt-6 max-w-xl text-left text-base leading-relaxed text-zinc-400 sm:text-lg"
            >
              O Halla é um ecossistema completo de comunicação por voz —
              cliente desktop para Windows e Linux, app Android nativo e
              servidor auto-hospedável. Áudio Opus cifrado, canais com
              permissões granulares, sussurro, tela em 4K e um protocolo aberto
              documentado. Sem telemetria, sem intermediários, sem custo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45 }}
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row"
            >
              <a
                href="#download"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#8b31e8] to-[#6d28d9] px-7 text-[15px] font-semibold text-white shadow-[0_0_38px_-8px_rgba(139,49,232,0.65)] transition-all hover:shadow-[0_0_52px_-6px_rgba(139,49,232,0.85)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <Download className="h-5 w-5" aria-hidden="true" />
                Baixar o Halla
              </a>
              <a
                href="https://github.com/GroupHalla"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-7 text-[15px] font-semibold text-zinc-200 transition-all hover:border-white/25 hover:bg-white/[0.09] hover:text-white"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
                Ver no GitHub
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <span className="flex items-center gap-2.5 text-sm text-zinc-400">
                <Eq bars={5} />
                Opus de baixa latência
              </span>
              <span className="flex items-center gap-2 text-sm text-zinc-400">
                <ShieldCheck className="h-4 w-4 text-[#b57bee]" aria-hidden="true" />
                Voz cifrada por canal
              </span>
              <span className="flex items-center gap-2 text-sm text-zinc-400">
                <Lock className="h-4 w-4 text-[#7de8f7]" aria-hidden="true" />
                Sem telemetria
              </span>
            </motion.div>
          </div>

          {/* ---- Right: 3D app mockup with floating chips ---- */}
          <div className="relative lg:col-span-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8b31e8]/[0.16] blur-[90px]"
            />

            <motion.div
              initial={{ opacity: 0, y: 48, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1100 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#080D1C] shadow-2xl transition-shadow duration-500 hover:shadow-[0_30px_90px_-30px_rgba(139,49,232,0.5)]">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  width={1180}
                  height={760}
                  className="block h-auto w-full rounded-2xl"
                  priority
                />
              </div>

              {/* Floating chips */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="animate-float absolute -left-3 top-8 z-10 flex items-center gap-2.5 rounded-xl border border-emerald-400/25 bg-[#0d0916]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:-left-8"
              >
                <span className="speaking-ring relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8b31e8] to-[#6d28d9] text-xs font-bold text-white">
                  A
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Admin</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <Eq bars={3} /> falando agora
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.05, duration: 0.5 }}
                className="animate-float-delayed absolute -right-2 top-1/4 z-10 flex items-center gap-2 rounded-xl border border-[#22d3ee]/25 bg-[#0d0916]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:-right-6"
              >
                <MonitorPlay className="h-4 w-4 text-[#7de8f7]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-white">Live · 1080p60</p>
                  <p className="text-[11px] text-zinc-500">WebRTC P2P</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="animate-float-slow absolute -bottom-4 left-10 z-10 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0d0916]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md"
              >
                <Fingerprint className="h-4 w-4 text-[#b57bee]" aria-hidden="true" />
                <p className="font-mono text-[11px] text-zinc-300">
                  Ed25519 · UID verificado
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.35, duration: 0.5 }}
                className="animate-float absolute -bottom-3 right-8 z-10 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0d0916]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md [animation-delay:2s]"
              >
                <Lock className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <p className="font-mono text-[11px] text-zinc-300">
                  ChaCha20-Poly1305
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ---- Official server banner (beam border) ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="beam mt-16 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-sm sm:mt-20"
        >
          <div className="relative z-[2] flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex items-start gap-3">
              <span className="relative mt-1.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  Servidor oficial no ar — teste agora
                </p>
                <p className="mt-0.5 text-sm text-zinc-400">
                  Canais permanentes e temporários, aberto ao público, acesso
                  multiplataforma.
                </p>
              </div>
            </div>
            <button
              onClick={copyAddress}
              className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 font-mono text-sm text-zinc-200 transition-all hover:border-[#b57bee]/40 hover:text-white sm:w-auto"
              aria-label="Copiar endereço do servidor oficial"
            >
              {SERVER_ADDRESS}
              <span className="text-zinc-600">:</span>
              {SERVER_PORT}
              {copied ? (
                <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              ) : (
                <Copy
                  className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-zinc-300"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
          {copied && (
            <p
              className="relative z-[2] px-5 pb-4 text-xs text-emerald-400 sm:px-6"
              role="status"
            >
              Endereço copiado — cole no Connect do cliente Halla.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
