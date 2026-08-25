"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/site/effects";

const tabs = [
  {
    id: "demo",
    label: "Servidor conectado",
    src: "/shots/demo.png",
    caption:
      "Conectado: árvore de canais à esquerda, painel de informações do servidor e chat em abas na parte inferior.",
  },
  {
    id: "main",
    label: "Boas-vindas",
    src: "/shots/main.png",
    caption:
      "Tela inicial do cliente desktop: barra de menus, atalhos de conexão e assistente de boas-vindas.",
  },
  {
    id: "channel",
    label: "Criar canal",
    src: "/shots/channel.png",
    caption:
      "Editor de canal: nome, tópico, senha, codec, qualidade, bitrate e limite de clientes.",
  },
  {
    id: "whisper",
    label: "Sussurro",
    src: "/shots/opt-whisper.png",
    caption:
      "Listas de sussurro: alveje canais específicos ou conjuntos de usuários com indicador próprio.",
  },
  {
    id: "hotkeys",
    label: "Atalhos",
    src: "/shots/opt-hotkeys.png",
    caption:
      "Teclas de atalho globais configuráveis — inclusive botões laterais do mouse, capturados em múltiplas camadas.",
  },
  {
    id: "options",
    label: "Opções",
    src: "/shots/options.png",
    caption:
      "Janela de opções com navegação por categoria: aplicativo, captura, reprodução, aparência e notificações.",
  },
];

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
                  <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
                    <span className="ml-3 font-mono text-xs text-zinc-500">
                      Halla — {current.label}
                    </span>
                  </div>
                  <img
                    src={current.src}
                    alt={`Captura de tela do Halla: ${current.caption}`}
                    className="w-full transition-transform duration-700 hover:scale-[1.015]"
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
