"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/site/effects";
import { SHOTS } from "@/lib/shots-store";
import { ShotDrop } from "@/components/site/shot-drop";

const tabs = SHOTS.map((s) => ({ id: s.id, label: s.label, src: s.fallback, caption: s.caption }));

export function Screenshots() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-160px] top-0 h-[380px] w-[380px] rounded-full bg-[#22d3ee]/[0.07] blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Interface"
          accent="cyan"
          title={
            <>
              Limpa, clássica e
              <br className="hidden sm:block" /> direta ao ponto
            </>
          }
          description="A interface segue a tradição dos grandes clientes de voz: densa em informação, fácil de dominar e com tema claro e escuro trocáveis em tempo real — sem reiniciar."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Vertical tab list */}
          <div
            className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-label="Capturas de tela do Halla"
          >
            {tabs.map((t, i) => (
              <motion.button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                onClick={() => setActive(t.id)}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`group flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-300 lg:w-full ${
                  active === t.id
                    ? "border-[#b57bee]/45 bg-[#b57bee]/[0.1]"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15]"
                }`}
              >
                <span
                  className={`font-mono text-[11px] ${
                    active === t.id ? "text-[#c99bf5]" : "text-zinc-600"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-sm font-medium ${
                    active === t.id ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {t.label}
                </span>
                <ChevronRight
                  className={`ml-auto hidden h-4 w-4 transition-all lg:block ${
                    active === t.id
                      ? "translate-x-0 text-[#c99bf5] opacity-100"
                      : "-translate-x-1 text-zinc-600 opacity-0 group-hover:opacity-60"
                  }`}
                  aria-hidden="true"
                />
              </motion.button>
            ))}
          </div>

          {/* Image panel */}
          <div className="relative lg:col-span-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-4 -top-4 bottom-[-16px] rounded-[26px] bg-gradient-to-b from-[#8b31e8]/[0.13] to-transparent blur-2xl"
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#120d1c] shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.985, x: 12 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.99, x: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShotDrop
                    id={current.id}
                    fallback={current.src}
                    alt={`Captura de tela do Halla: ${current.caption}`}
                    width={1180}
                    height={760}
                    className="rounded-2xl"
                  />
                </motion.figure>
              </AnimatePresence>
            </div>
            <motion.p
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-sm text-zinc-500"
            >
              {current.caption}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
