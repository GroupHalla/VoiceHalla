"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Container,
  Crown,
  Database,
  FileText,
  Gamepad2,
  Github,
  Headphones,
  Lock,
  MessageSquare,
  Mic,
  Monitor,
  Phone,
  Plus,
  Smartphone,
  VolumeX,
} from "lucide-react";
import { Eq, SectionHeader, Typewriter } from "@/components/site/effects";
import { useLatestRelease } from "@/hooks/use-latest-release";

/* ================= Animated channel tree (Desktop card) ================= */

function UserRow({
  name,
  color,
  speaking = false,
  crown = false,
}: {
  name: string;
  color: string;
  speaking?: boolean;
  crown?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      <span
        className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${color} ${
          speaking ? "speaking-ring" : ""
        }`}
      >
        {name[0].toUpperCase()}
      </span>
      <span
        className={`truncate text-[11.5px] ${
          speaking ? "font-medium text-emerald-300" : "text-zinc-400"
        }`}
      >
        {name}
      </span>
      {speaking && <Eq bars={3} className="ml-0.5" />}
      {crown && (
        <Crown className="ml-auto h-3 w-3 text-amber-400/80" aria-hidden="true" />
      )}
    </div>
  );
}

function ChannelTree() {
  const [guestJoined, setGuestJoined] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setGuestJoined((v) => !v), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0b0713]/90 p-3.5 font-mono text-[12px] shadow-inner">
      {/* Server header */}
      <div className="mb-2.5 flex items-center justify-between border-b border-white/[0.07] pb-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-zinc-300">meuservidor.exemplo.com</span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400/90">
          <span className="h-1 w-1 rounded-full bg-emerald-400" aria-hidden="true" />
          23 ms · 5/32
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <ChevronDown className="h-3 w-3" aria-hidden="true" />
          <MessageSquare className="h-3 w-3" aria-hidden="true" />
          <span>Lobby</span>
        </div>

        <div className="pl-4">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Gamepad2 className="h-3 w-3" aria-hidden="true" />
            <span>Sala de jogos</span>
          </div>
          <div className="space-y-0.5 pl-4 pt-0.5">
            <UserRow name="Admin" color="bg-gradient-to-br from-[#8b31e8] to-[#6d28d9]" speaking crown />
            <UserRow name="nina" color="bg-gradient-to-br from-[#0891b2] to-[#155e75]" />
            <UserRow name="player_one" color="bg-gradient-to-br from-[#059669] to-[#065f46]" />
            <AnimatePresence initial={false}>
              {guestJoined && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <UserRow
                    name="player_two"
                    color="bg-gradient-to-br from-[#b45309] to-[#92400e]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-500">
          <ChevronDown className="h-3 w-3" aria-hidden="true" />
          <Lock className="h-3 w-3 text-amber-400/70" aria-hidden="true" />
          <span>Reuniões</span>
          <span className="ml-auto text-[10px] text-zinc-600">senha</span>
        </div>

        <div className="flex items-center gap-1.5 text-[#c99bf5]/70">
          <Plus className="h-3 w-3" aria-hidden="true" />
          <span className="text-[11px]">Canal temporário…</span>
        </div>
      </div>
    </div>
  );
}

/* ================= PTT visual (Mobile card) ================= */

function PttVisual() {
  return (
    <div className="relative h-44 overflow-hidden rounded-xl border border-white/10 bg-[#0b0713]/90">
      {/* Mock home screen dots */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="grid-drift absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Floating PTT button */}
      <div className="animate-float absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#8b31e8]/50 blur-xl"
          />
          <button
            type="button"
            aria-label="Exemplo de botão de push-to-talk flutuante"
            className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#8b31e8] to-[#6d28d9] shadow-[0_0_44px_-6px_rgba(139,49,232,0.9)] transition-transform active:scale-95"
          >
            <Mic className="h-7 w-7 text-white" aria-hidden="true" />
          </button>
          <span className="speaking-ring absolute inset-0 rounded-full" aria-hidden="true" />
        </div>
      </div>

      {/* Notification card */}
      <div className="animate-float-delayed absolute inset-x-4 bottom-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#120d1c]/95 px-3.5 py-2.5 shadow-xl backdrop-blur">
        <Headphones className="h-4 w-4 shrink-0 text-[#7de8f7]" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11.5px] font-semibold text-white">
            Halla · Sala de jogos
          </p>
          <p className="text-[10.5px] text-zinc-500">3 no canal · conectado</p>
        </div>
        <span className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-2 py-1">
          <Mic className="h-3 w-3 text-zinc-400" aria-hidden="true" />
          <VolumeX className="h-3 w-3 text-zinc-400" aria-hidden="true" />
          <Phone className="h-3 w-3 text-red-400" aria-hidden="true" />
        </span>
      </div>

      <p className="absolute left-4 top-3 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-600">
        PTT flutuante · sobre outros apps
      </p>
    </div>
  );
}

/* ================= Card shell ================= */

function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 transition-colors duration-300 hover:border-white/[0.16] sm:p-7 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-52 w-[135%] -translate-x-1/2 rounded-full opacity-0 blur-[85px] transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "rgba(139,49,232,0.3)" }}
      />
      <div className="relative">{children}</div>
    </motion.article>
  );
}

function CardHeader({
  icon: Icon,
  name,
  version,
  accent,
  loading = false,
}: {
  icon: typeof Monitor;
  name: string;
  version: string;
  accent: string;
  loading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3.5">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} shadow-lg`}
        >
          <Icon className="h-5.5 w-5.5 text-white" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-white">{name}</h3>
      </div>
      <span className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-zinc-300">
        {loading ? (
          <span className="inline-block animate-pulse text-zinc-500" aria-label="Carregando versão">
            …
          </span>
        ) : (
          version || "—"
        )}
      </span>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/[0.08] bg-black/25 px-2.5 py-1 text-[11px] font-medium text-zinc-400">
      {children}
    </span>
  );
}

function RepoLink({ href, name }: { href: string; name: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#c99bf5] transition-colors hover:text-[#e3cdfa]"
    >
      <Github className="h-3.5 w-3.5" aria-hidden="true" />
      {name}
      <ArrowUpRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </a>
  );
}

/* ================= Section ================= */

const transports = [
  { label: "TCP + TLS 1.2+", sub: "controle · JSON" },
  { label: "UDP · Opus AEAD", sub: "voz · 20 ms" },
  { label: "DTLS-SRTP P2P", sub: "tela · WebRTC" },
  { label: "TLS", sub: "ServerQuery" },
];

export function Ecosystem() {
  // Versões dinâmicas direto da API do GitHub (mesmo cache de 1h do download)
  const desktop = useLatestRelease("Halla");
  const mobile = useLatestRelease("Halla-Mobile");
  const server = useLatestRelease("HallaServer");

  const serverVersion = server.tag ? server.tag.replace(/^v/i, "") : "";
  const terminalLines = useMemo(
    () => [
      "$ ./halla-server --config halla-server.ini",
      "[ok] TLS ativo — cert.pem autoassinado",
      "[ok] controle TCP/9987 · voz UDP/9987",
      "[ok] SQLite conectado · 32 clientes máx.",
      "[ok] relay AEAD — o servidor nunca decifra",
      serverVersion
        ? `Halla Server ${serverVersion} pronto.`
        : "Halla Server pronto.",
    ],
    [serverVersion]
  );

  return (
    <section id="ecossistema" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Ecossistema"
          accent="purple"
          title={
            <>
              Um protocolo, três projetos —
              <br className="hidden sm:block" /> do bolso ao datacenter
            </>
          }
          description="Desktop, Mobile e Server falam a mesma língua: o protocolo aberto v5. Entre no mesmo servidor pelo PC ou pelo celular, transmita sua tela de qualquer um dos dois e hospede tudo na sua própria infraestrutura."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* ---- Desktop (wide) ---- */}
          <BentoCard className="lg:col-span-7" delay={0}>
            <CardHeader
              icon={Monitor}
              name="Halla Desktop"
              version={desktop.tag ?? ""}
              loading={desktop.loading}
              accent="from-[#a855f7] to-[#7c3aed]"
            />
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              O cliente completo para Windows e Linux, em C++17 com Qt 6.
              Ícones desenhados em tempo de execução, tema claro/escuro
              instantâneo e todas as ferramentas de administração que uma
              comunidade precisa.
            </p>
            <div className="mt-5">
              <ChannelTree />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Chip>Push-to-talk</Chip>
              <Chip>Sussurro</Chip>
              <Chip>Hotkeys globais</Chip>
              <Chip>Overlay da call</Chip>
              <Chip>Gravação WAV</Chip>
            </div>
            <RepoLink href="https://github.com/GroupHalla/Halla" name="GroupHalla/Halla" />
          </BentoCard>

          {/* ---- Mobile ---- */}
          <BentoCard className="lg:col-span-5" delay={0.1}>
            <CardHeader
              icon={Smartphone}
              name="Halla Mobile"
              version={mobile.tag ?? ""}
              loading={mobile.loading}
              accent="from-[#22d3ee] to-[#0891b2]"
            />
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              App Android nativo (Kotlin + núcleo C++/JNI) — sem Qt, sem
              wrapper. Voz com AEC e supressão de ruído, reconexão silenciosa
              ao trocar de rede e serviço em primeiro plano que sobrevive à
              tela apagada.
            </p>
            <div className="mt-5">
              <PttVisual />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Chip>PTT flutuante</Chip>
              <Chip>Wi-Fi ↔ móvel</Chip>
              <Chip>MediaProjection</Chip>
              <Chip>pt · en · es</Chip>
            </div>
            <RepoLink
              href="https://github.com/GroupHalla/Halla-Mobile"
              name="GroupHalla/Halla-Mobile"
            />
          </BentoCard>

          {/* ---- Server ---- */}
          <BentoCard className="lg:col-span-5" delay={0.05}>
            <CardHeader
              icon={Container}
              name="Halla Server"
              version={server.tag ?? ""}
              loading={server.loading}
              accent="from-[#34d399] to-[#059669]"
            />
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Servidor auto-hospedável em C++/Qt: TLS no controle, voz em relay
              puro — ele nunca decifra o áudio. SQLite ou MySQL.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black/60 p-4">
              <div className="mb-2.5 flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-emerald-400/70" aria-hidden="true" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  terminal
                </span>
              </div>
              <Typewriter
                key={serverVersion || "boot"}
                lines={terminalLines}
                className="space-y-1 font-mono text-[11.5px] leading-relaxed text-zinc-300"
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Chip>Docker</Chip>
              <Chip>systemd</Chip>
              <Chip>Pterodactyl</Chip>
              <Chip>TURN opcional</Chip>
            </div>
            <RepoLink
              href="https://github.com/GroupHalla/HallaServer"
              name="GroupHalla/HallaServer"
            />
          </BentoCard>

          {/* ---- Protocol mini ---- */}
          <BentoCard className="lg:col-span-7" delay={0.12}>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#22d3ee]/25 bg-[#22d3ee]/[0.1]">
                <FileText className="h-5 w-5 text-[#7de8f7]" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Protocolo aberto v5
              </h3>
              <span className="ml-auto rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-zinc-300">
                público
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              A especificação é aberta para qualquer pessoa implementar
              clientes, bots e ferramentas compatíveis. A camada de segurança —
              TLS, Ed25519 e voz AEAD — é obrigatória em todas as versões.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {transports.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="rounded-xl border border-white/[0.08] bg-black/30 p-3"
                >
                  <p className="font-mono text-[11.5px] font-semibold text-[#7de8f7]">
                    {t.label}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500">{t.sub}</p>
                </motion.div>
              ))}
            </div>
            <a
              href="https://github.com/GroupHalla/HallaServer/blob/main/PROTOCOL.md"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#7de8f7] transition-colors hover:text-[#a5f0fb]"
            >
              <ArrowDown className="hidden" aria-hidden="true" />
              Ler a especificação completa
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
