"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Monitor,
  Server,
  Smartphone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ecosystem = [
  {
    name: "Halla Desktop",
    version: "v1.1.0",
    icon: Monitor,
    repo: "https://github.com/GroupHalla/Halla",
    repoName: "GroupHalla/Halla",
    description:
      "O cliente completo para Windows e Linux, escrito em C++17 com Qt 6 Widgets. Ícones desenhados em tempo de execução, tema claro/escuro instantâneo e todas as ferramentas de administração que uma comunidade precisa.",
    features: [
      "Push-to-talk com tecla ou botão do mouse",
      "Sussurro para canais e listas de usuários",
      "Hotkeys globais configuráveis",
      "Overlay de chamada e gravação em WAV",
    ],
    accent: "from-[#a855f7] to-[#7c3aed]",
    glow: "rgba(139,49,232,0.35)",
  },
  {
    name: "Halla Mobile",
    version: "v1.0.83",
    icon: Smartphone,
    repo: "https://github.com/GroupHalla/Halla-Mobile",
    repoName: "GroupHalla/Halla-Mobile",
    description:
      "App Android nativo (Kotlin + núcleo C++/JNI) — sem Qt, sem wrapper. Voz com AEC e supressão de ruído, botão de PTT flutuante sobre outros apps e serviço em primeiro plano que sobrevive à tela apagada.",
    features: [
      "PTT flutuante sobre outros aplicativos",
      "Reconexão automática Wi-Fi ↔ dados móveis",
      "Transmissão de tela via MediaProjection",
      "Localizado em português, inglês e espanhol",
    ],
    accent: "from-[#22d3ee] to-[#0891b2]",
    glow: "rgba(34,211,238,0.3)",
  },
  {
    name: "Halla Server",
    version: "v1.1.60",
    icon: Server,
    repo: "https://github.com/GroupHalla/HallaServer",
    repoName: "GroupHalla/HallaServer",
    description:
      "Servidor auto-hospedável em C++/Qt, com TLS no controle e voz em relay puro — ele nunca decifra o áudio. SQLite ou MySQL, Docker, systemd e egg para Pterodactyl. Você controla cada limite do seu ambiente.",
    features: [
      "Certificado autoassinado ou Let's Encrypt",
      "Limites de resolução, FPS e bitrate configuráveis",
      "ServerQuery via TLS para administração remota",
      "TURN opcional para NATs restritivos",
    ],
    accent: "from-[#34d399] to-[#059669]",
    glow: "rgba(52,211,153,0.28)",
  },
];

export function Ecosystem() {
  return (
    <section id="ecossistema" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-[#b26bf0]/25 bg-[#b26bf0]/[0.07] px-3.5 py-1 text-xs font-medium text-[#d8bcf7]"
          >
            Um protocolo, três projetos
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Um ecossistema completo,
            <br className="hidden sm:block" /> do bolso ao datacenter
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400">
            Desktop, Mobile e Server falam o mesmo protocolo aberto v5. Entre
            no mesmo servidor pelo PC ou pelo celular, transmita sua tela de
            qualquer um dos dois e hospede tudo na sua própria infraestrutura.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ecosystem.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 transition-colors hover:border-white/[0.14]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[130%] -translate-x-1/2 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: item.glow }}
              />

              <div className="relative flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} shadow-lg`}
                >
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <Badge
                  variant="secondary"
                  className="border-white/10 bg-white/[0.05] font-mono text-[11px] text-zinc-300"
                >
                  {item.version}
                </Badge>
              </div>

              <h3 className="relative mt-5 text-xl font-semibold text-white">
                {item.name}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                {item.description}
              </p>

              <ul className="relative mt-5 space-y-2.5">
                {item.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#b57bee]"
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={item.repo}
                target="_blank"
                rel="noreferrer"
                className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#c99bf5] transition-colors hover:text-[#e3cdfa]"
              >
                {item.repoName}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
