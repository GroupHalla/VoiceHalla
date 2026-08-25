"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileText, Terminal } from "lucide-react";
import { SectionHeader } from "@/components/site/effects";

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

const loginSteps = [
  { dir: "C→S", msg: "hello", payload: "{ proto, uid, nick, idPub }", color: "purple" },
  { dir: "S→C", msg: "identity_challenge", payload: "{ nonce }", color: "emerald" },
  { dir: "C→S", msg: "identity_proof", payload: "{ sig }", color: "purple" },
  { dir: "S→C", msg: "welcome", payload: "UID = hash(idPub) ✓", color: "emerald" },
];

const stepStyles = {
  purple: {
    chip: "bg-[#b57bee]/15 text-[#c99bf5]",
    msg: "text-zinc-200",
  },
  emerald: {
    chip: "bg-emerald-400/15 text-emerald-300",
    msg: "text-zinc-200",
  },
};

export function Protocol() {
  return (
    <section
      id="protocolo"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Protocolo aberto v5"
          accent="cyan"
          title={
            <>
              Documentado para todos.
              <br className="hidden sm:block" /> Fechado para ninguém.
            </>
          }
          description="A especificação completa é pública: qualquer pessoa pode implementar clientes, bots e ferramentas compatíveis. A camada de segurança — TLS, Ed25519 e voz AEAD — é obrigatória para todas as versões."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Transports table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] lg:col-span-7"
          >
            <div className="hidden grid-cols-[1.1fr_1.4fr_0.8fr] gap-4 border-b border-white/[0.07] bg-white/[0.03] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 md:grid">
              <span>Canal</span>
              <span>Transporte</span>
              <span>Porta</span>
            </div>
            <div className="divide-y divide-white/[0.05]">
              {transports.map((t, i) => (
                <motion.div
                  key={t.channel}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
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
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Animated login flow */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 lg:col-span-5"
          >
            <div className="flex items-center gap-2.5">
              <Terminal className="h-4 w-4 text-[#c99bf5]" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-300">
                Login com prova de posse
              </h3>
            </div>

            <div className="relative mt-6 space-y-0">
              {loginSteps.map((step, i) => {
                const styles = stepStyles[step.color as keyof typeof stepStyles];
                return (
                  <div key={step.msg}>
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.2 + i * 0.35 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${styles.chip}`}
                      >
                        {step.dir}
                      </span>
                      <div className="min-w-0">
                        <p className={`font-mono text-[13px] font-semibold ${styles.msg}`}>
                          {step.msg}
                        </p>
                        <p className="mt-0.5 truncate font-mono text-[11.5px] text-zinc-500">
                          {step.payload}
                        </p>
                      </div>
                    </motion.div>
                    {i < loginSteps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45 + i * 0.35 }}
                        className="py-1 pl-[26px]"
                      >
                        <ArrowDown
                          className="h-3.5 w-3.5 animate-pulse text-zinc-600"
                          style={{ animationDelay: `${i * 0.3}s` }}
                          aria-hidden="true"
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.7 }}
              className="mt-5 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.05] p-3 text-[13px] leading-relaxed text-zinc-400"
            >
              O servidor ignora o UID enviado pelo cliente e recalcula a partir
              da chave pública. Spoofing de identidade torna-se impraticável.
            </motion.p>

            <a
              href="https://github.com/GroupHalla/HallaServer/blob/main/PROTOCOL.md"
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#7de8f7] transition-colors hover:text-[#a5f0fb]"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Ler a especificação completa
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
