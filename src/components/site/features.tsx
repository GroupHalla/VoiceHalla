"use client";

import { motion } from "framer-motion";
import {
  AudioWaveform,
  Bot,
  Ear,
  FileAudio,
  FolderTree,
  MessageSquareText,
  MonitorPlay,
  Puzzle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Eq, SectionHeader, SpotlightCard } from "@/components/site/effects";

const smallFeatures = [
  {
    icon: Ear,
    title: "Sussurro",
    description:
      "Fale apenas com um canal, um canal e seus subcanais, ou uma lista fixa de usuários — com indicador visual próprio, distinto do indicador normal de fala.",
    tag: "whisper",
  },
  {
    icon: FolderTree,
    title: "Canais e permissões",
    description:
      "Árvore com subcanais, salas temporárias sob demanda, canais com senha, moderados e vinculados. Grupos com permissões granulares e talk power.",
    tag: "granular",
  },
  {
    icon: MessageSquareText,
    title: "Chat de texto",
    description:
      "Abas por servidor e canal, BBCode com negrito, itálico, cores e links, emojis, mensagens offline e transferência de arquivos.",
    tag: "bbcode",
  },
  {
    icon: Puzzle,
    title: "Complementos",
    description:
      "Pacotes .halla-addon com ABI C pública compartilhada entre Desktop e Mobile: hooks de áudio PCM, efeito de rádio e transporte de dados v5.",
    tag: "plugins",
  },
  {
    icon: ShieldCheck,
    title: "Emblemas verificáveis",
    description:
      "Emblemas globais vinculados à sua UID, distribuídos por registro assinado Ed25519 e mantidos em cache — funcionam até offline.",
    tag: "ed25519",
  },
  {
    icon: FileAudio,
    title: "Gravação e TTS",
    description:
      "Grave chamadas localmente em WAV, ouça avisos por narração texto-para-voz e receba alertas sonoros de conexão e permissões.",
    tag: "wav · tts",
  },
  {
    icon: Users,
    title: "Comunidade moderada",
    description:
      "Cutucar, reclamações, lista de banidos, avatares, descrições em BBCode e múltiplas identidades locais com perfis de áudio.",
    tag: "admin",
  },
  {
    icon: Bot,
    title: "Protocolo aberto",
    description:
      "Especificação v5 documentada publicamente para implementar clientes, bots e ferramentas. Controle TCP/TLS com JSON e voz UDP cifrada.",
    tag: "v5",
  },
];

const qualityPills = ["480p", "720p", "1080p", "2K", "4K"];

export function Features() {
  return (
    <section
      id="recursos"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-180px] top-1/4 h-[400px] w-[400px] rounded-full bg-[#7c2ae8]/[0.08] blur-[130px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Recursos"
          accent="purple"
          title={
            <>
              Feito para comunidades
              <br className="hidden sm:block" /> que levam voz a sério
            </>
          }
          description="Cada recurso existe para dar controle total: sobre o áudio, sobre as permissões e sobre a infraestrutura. Nada de recursos pagos, anúncios ou contas obrigatórias."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured: voice */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="sm:col-span-2"
          >
            <SpotlightCard className="h-full rounded-2xl border border-[#b57bee]/20 bg-gradient-to-br from-[#b57bee]/[0.09] via-white/[0.02] to-transparent p-6 transition-colors hover:border-[#b57bee]/35 sm:p-7">
              <div className="flex h-full flex-col justify-between gap-6 sm:flex-row">
                <div className="max-w-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#b57bee]/25 bg-[#b57bee]/[0.1]">
                    <AudioWaveform className="h-5 w-5 text-[#c99bf5]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    Voz de baixa latência
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Codec Opus com quadros de 20 ms, cancelamento de eco,
                    remoção de ruído, atenuação de digitação e ducking
                    automático. Push-to-talk (tecla ou botão do mouse),
                    detecção de voz ou transmissão contínua.
                  </p>
                </div>
                {/* Live visual */}
                <div className="flex shrink-0 flex-col items-center justify-center gap-4 rounded-xl border border-white/[0.07] bg-black/30 px-8 py-6">
                  <Eq bars={9} className="scale-[2.1] origin-center" />
                  <p className="font-mono text-[11px] text-zinc-500">
                    48 kHz · opus · 20 ms
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Featured: screens */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <SpotlightCard
              rgb="34, 211, 238"
              className="h-full rounded-2xl border border-[#22d3ee]/20 bg-gradient-to-br from-[#22d3ee]/[0.08] via-white/[0.02] to-transparent p-6 transition-colors hover:border-[#22d3ee]/35"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#22d3ee]/25 bg-[#22d3ee]/[0.1]">
                <MonitorPlay className="h-5 w-5 text-[#7de8f7]" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                Tela em até 4K/60
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                WebRTC P2P com DTLS-SRTP e H.264 por hardware com fallback
                VP8. Áudio do PC capturado sem eco das vozes da chamada.
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {qualityPills.map((q, i) => (
                  <span
                    key={q}
                    className={`rounded-md border px-2.5 py-1 font-mono text-[11px] ${
                      i === qualityPills.length - 1
                        ? "border-[#22d3ee]/40 bg-[#22d3ee]/[0.12] text-[#7de8f7]"
                        : "border-white/[0.08] bg-black/25 text-zinc-500"
                    }`}
                  >
                    {q}
                  </span>
                ))}
                <span className="rounded-md border border-white/[0.08] bg-black/25 px-2.5 py-1 font-mono text-[11px] text-zinc-500">
                  30/60 fps
                </span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Regular grid */}
          {smallFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <SpotlightCard className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-colors hover:border-white/[0.15]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#b57bee]/20 bg-[#b57bee]/[0.08]">
                    <f.icon className="h-5 w-5 text-[#c99bf5]" aria-hidden="true" />
                  </div>
                  <span className="rounded-md border border-white/[0.08] bg-black/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    {f.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {f.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
