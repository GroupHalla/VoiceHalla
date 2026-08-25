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
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: AudioWaveform,
    title: "Voz de baixa latência",
    description:
      "Codec Opus com quadros de 20 ms, cancelamento de eco, remoção de ruído, atenuação de digitação e ducking automático quando alguém fala. Push-to-talk (tecla ou botão do mouse), detecção de voz ou transmissão contínua.",
    tag: "Opus · 48 kHz",
  },
  {
    icon: Ear,
    title: "Sussurro",
    description:
      "Fale apenas com um canal, um canal e seus subcanais, ou uma lista fixa de usuários — com indicador visual próprio, distinto do indicador normal de fala. Privacidade sem sair da conversa.",
    tag: "Whisper",
  },
  {
    icon: FolderTree,
    title: "Canais e permissões",
    description:
      "Árvore de canais com subcanais, salas temporárias criadas sob demanda, canais com senha, moderados e vinculados. Grupos de servidor e canal com permissões granulares, talk power e operadores.",
    tag: "Granular",
  },
  {
    icon: MonitorPlay,
    title: "Tela em até 4K/60",
    description:
      "Transmissão de tela via WebRTC P2P com DTLS-SRTP, seletor de qualidade estilo YouTube (480p a 4K), H.264 por hardware com fallback VP8 e áudio do PC capturado sem eco das vozes da chamada.",
    tag: "WebRTC P2P",
  },
  {
    icon: MessageSquareText,
    title: "Chat de texto",
    description:
      "Chat com abas por servidor e canal, BBCode com negrito, itálico, cores e links, emojis, mensagens offline, transferência de arquivos e histórico com rolagem — tudo com notificações sonoras.",
    tag: "BBCode",
  },
  {
    icon: Puzzle,
    title: "Complementos",
    description:
      "Pacotes .halla-addon com ABI C pública compartilhada entre Desktop e Mobile: hooks de áudio PCM, efeito de rádio por usuário, transporte de dados pelo protocolo e catálogo HTTPS oficial.",
    tag: ".halla-addon",
  },
  {
    icon: ShieldCheck,
    title: "Emblemas verificáveis",
    description:
      "Emblemas globais oficiais vinculados à sua UID, distribuídos por um registro assinado com Ed25519 e mantidos em cache — funcionam até offline e não podem ser forjados.",
    tag: "Ed25519",
  },
  {
    icon: FileAudio,
    title: "Gravação e TTS",
    description:
      "Grave chamadas localmente em WAV (sua voz e participantes), ouça avisos por narração de texto-para-voz e receba alertas sonoros de conexão, entrada e permissões.",
    tag: "WAV · TTS",
  },
  {
    icon: Users,
    title: "Comunidade moderada",
    description:
      "Cutucar (poke), reclamações, lista de banidos, movimentação de usuários, avatares, descrições em BBCode e múltiplas identidades locais com perfis de captura e reprodução.",
    tag: "Admin",
  },
  {
    icon: Bot,
    title: "Protocolo aberto",
    description:
      "Especificação v5 documentada publicamente para qualquer pessoa implementar clientes, bots e ferramentas. Controle em TCP/TLS com JSON e voz UDP cifrada — sem caixa-preta.",
    tag: "v5",
  },
];

export function Features() {
  return (
    <section id="recursos" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#7c2ae8]/[0.08] blur-[130px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-[#b26bf0]/25 bg-[#b26bf0]/[0.07] px-3.5 py-1 text-xs font-medium text-[#d8bcf7]"
          >
            Recursos
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Feito para comunidades
            <br className="hidden sm:block" /> que levam voz a sério
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400">
            Cada recurso do Halla existe para dar controle total: sobre o
            áudio, sobre as permissões e sobre a infraestrutura. Nada de
            recursos pagos, anúncios ou contas obrigatórias em serviços de
            terceiros.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 transition-all hover:border-[#b57bee]/25 hover:bg-white/[0.045]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#b57bee]/20 bg-[#b57bee]/[0.08] transition-colors group-hover:border-[#b57bee]/40 group-hover:bg-[#b57bee]/[0.14]">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
