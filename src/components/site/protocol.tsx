"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, FileText, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const transports = [
  {
    channel: "Controle",
    transport: "TCP + TLS 1.2+",
    port: "9987",
    use: "Autenticação, canais, chat, estados, moderação e sinalização WebRTC — mensagens JSON, uma por linha, até 2 MiB.",
  },
  {
    channel: "Voz",
    transport: "UDP · Opus AEAD",
    port: "9987",
    use: "Pacotes de 20 ms cifrados com ChaCha20-Poly1305 e chave por canal. O servidor apenas retransmite o relay.",
  },
  {
    channel: "Tela (moderna)",
    transport: "WebRTC P2P · DTLS-SRTP",
    port: "dinâmica",
    use: "Vídeo e áudio da transmissão de tela trafegam direto entre os clientes; offer/answer e ICE passam pelo controle TLS.",
  },
  {
    channel: "Tela (legado)",
    transport: "UDP · JPEG",
    port: "9987",
    use: "Frames JPEG fatiados e cifrados como alternativa que dispensa o SDK nativo de WebRTC.",
  },
  {
    channel: "ServerQuery",
    transport: "TCP + TLS",
    port: "configurável",
    use: "Administração remota do servidor, desligada por padrão e com bind local quando habilitada.",
  },
];

export function Protocol() {
  return (
    <section id="protocolo" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-[#22d3ee]/25 bg-[#22d3ee]/[0.07] px-3.5 py-1 text-xs font-medium text-[#7de8f7]"
          >
            Protocolo aberto v5
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Documentado para todos.
            <br className="hidden sm:block" /> Fechado para ninguém.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400">
            A especificação completa do protocolo Halla é pública: qualquer
            pessoa pode implementar clientes, bots e ferramentas compatíveis. A
            camada de segurança — TLS, identidade Ed25519 e voz AEAD — é
            obrigatória para todas as versões.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Transports table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] lg:col-span-3"
          >
            <div className="hidden grid-cols-[1.1fr_1.4fr_0.8fr] gap-4 border-b border-white/[0.07] bg-white/[0.03] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 md:grid">
              <span>Canal</span>
              <span>Transporte</span>
              <span>Porta</span>
            </div>
            <div className="divide-y divide-white/[0.05]">
              {transports.map((t) => (
                <div
                  key={t.channel}
                  className="grid gap-2 px-6 py-5 transition-colors hover:bg-white/[0.025] md:grid-cols-[1.1fr_1.4fr_0.8fr] md:items-start md:gap-4"
                >
                  <div className="text-sm font-semibold text-white">
                    {t.channel}
                    <p className="mt-1.5 text-[13px] font-normal leading-relaxed text-zinc-400 md:hidden">
                      {t.use}
                    </p>
                  </div>
                  <div className="font-mono text-[13px] text-[#7de8f7]">
                    {t.transport}
                  </div>
                  <div className="font-mono text-[13px] text-zinc-400">
                    {t.port}
                  </div>
                  <p className="hidden text-[13px] leading-relaxed text-zinc-400 md:col-span-3 md:block">
                    {t.use}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Identity flow */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 lg:col-span-2"
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="h-4.5 w-4.5 text-[#c99bf5]" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                Login com prova de posse
              </h3>
            </div>
            <div className="mt-5 space-y-3 rounded-xl bg-black/40 p-4 font-mono text-[12.5px] leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 rounded bg-[#b57bee]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#c99bf5]">
                  C→S
                </span>
                <span className="text-zinc-300">
                  hello{" "}
                  <span className="text-zinc-500">
                    {"{ proto, uid, nick, idPub }"}
                  </span>
                </span>
              </div>
              <ArrowDown className="h-3.5 w-3.5 text-zinc-600" aria-hidden="true" />
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 rounded bg-emerald-400/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                  S→C
                </span>
                <span className="text-zinc-300">
                  identity_challenge{" "}
                  <span className="text-zinc-500">{"{ nonce }"}</span>
                </span>
              </div>
              <ArrowDown className="h-3.5 w-3.5 text-zinc-600" aria-hidden="true" />
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 rounded bg-[#b57bee]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#c99bf5]">
                  C→S
                </span>
                <span className="text-zinc-300">
                  identity_proof{" "}
                  <span className="text-zinc-500">{"{ sig }"}</span>
                </span>
              </div>
              <ArrowDown className="h-3.5 w-3.5 text-zinc-600" aria-hidden="true" />
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 rounded bg-emerald-400/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                  S→C
                </span>
                <span className="text-zinc-300">
                  welcome <span className="text-emerald-400">✓</span>{" "}
                  <span className="text-zinc-500">UID = hash(idPub)</span>
                </span>
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-zinc-400">
              O servidor ignora o UID enviado pelo cliente e recalcula a partir
              da chave pública. Spoofing de identidade torna-se impraticável.
            </p>
            <a
              href="https://github.com/GroupHalla/HallaServer/blob/main/PROTOCOL.md"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#7de8f7] transition-colors hover:text-[#a5f0fb]"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Ler a especificação completa
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
