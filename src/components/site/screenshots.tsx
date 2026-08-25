"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const tabs = [
  {
    id: "main",
    label: "Boas-vindas",
    src: "/shots/main.png",
    caption:
      "Tela inicial do cliente desktop: barra de menus, atalhos de conexão e assistente de boas-vindas.",
  },
  {
    id: "demo",
    label: "Servidor conectado",
    src: "/shots/demo.png",
    caption:
      "Conectado: árvore de canais à esquerda, painel de informações do servidor e chat em abas na parte inferior.",
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
  const [active, setActive] = useState(tabs[1].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[1];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-[#b26bf0]/25 bg-[#b26bf0]/[0.07] px-3.5 py-1 text-xs font-medium text-[#d8bcf7]"
          >
            Interface
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Limpa, clássica e direta ao ponto
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400">
            A interface segue a tradição dos grandes clientes de voz: densa em
            informação, fácil de dominar e com tema claro e escuro trocáveis em
            tempo real — sem reiniciar o aplicativo.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Capturas de tela do Halla"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                active === t.id
                  ? "border-[#b57bee]/50 bg-[#b57bee]/[0.14] text-white"
                  : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative mt-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 top-[-12px] bottom-[-12px] rounded-[28px] bg-gradient-to-b from-[#8b31e8]/[0.13] to-transparent blur-2xl"
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#120d1c] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.28 }}
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
                  className="w-full"
                />
              </motion.figure>
            </AnimatePresence>
          </div>
          <p className="mt-4 text-center text-sm text-zinc-500">
            {current.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
