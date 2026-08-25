"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Apple,
  ArrowUpRight,
  Copy,
  Check,
  Container,
  Download,
  Github,
  Monitor,
  Smartphone,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const platforms = [
  {
    id: "desktop",
    label: "Desktop",
    icon: Monitor,
    title: "Halla Desktop",
    subtitle: "Windows · Linux · C++17 + Qt 6",
    description:
      "Baixe o instalador NSIS para Windows na página de releases ou compile do código-fonte com CMake. O modo WebRTC nativo de compartilhamento de tela é opcional e usa o SDK pré-compilado do Halla WebRTC Builds.",
    repo: "https://github.com/GroupHalla/Halla",
    releaseNote: "Instaladores e binários ficam na aba Releases do repositório.",
    code: `# Linux (instala dependências se faltarem)
./build-linux.sh
./build/Halla

# Windows / manual — qualquer plataforma
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build`,
    deps: [
      "CMake ≥ 3.21",
      "Qt 6.2+ (Widgets, Network, Multimedia, TextToSpeech)",
      "OpenSSL",
      "libopus",
      "QtKeychain",
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Smartphone,
    title: "Halla Mobile",
    subtitle: "Android 8.0+ (API 26) · Kotlin + C++/JNI",
    description:
      "App Android nativo com serviço em primeiro plano, PTT flutuante e transmissão de tela via MediaProjection. O APK assinado é publicado nas releases; atualizações também podem ser instaladas de dentro do próprio app.",
    repo: "https://github.com/GroupHalla/Halla-Mobile",
    releaseNote: "APK assinado com verificação apksigner e SHA-256 publicado junto.",
    code: `# Compilar do código-fonte
./gradlew assembleDebug      # desenvolvimento

# Release oficial (CI em tags v*)
./gradlew assembleRelease`,
    deps: [
      "Android Studio ou Gradle + JDK 17",
      "Android SDK 34",
      "NDK 25.2.9519653",
      "Acesso à internet no primeiro build (Opus via FetchContent)",
    ],
  },
  {
    id: "server",
    label: "Server",
    icon: Container,
    title: "Halla Server",
    subtitle: "Self-hosted · C++/Qt · SQLite/MySQL",
    description:
      "Rode seu próprio servidor: binário único com configuração em INI, certificado autoassinado gerado na primeira execução (ou Let's Encrypt), Docker, systemd e egg pronto para Pterodactyl.",
    repo: "https://github.com/GroupHalla/HallaServer",
    releaseNote: "Dockerfile, serviço systemd e egg Pterodactyl inclusos no repo.",
    code: `# Executar
./halla-server --config halla-server.ini

# Portas padrão
# TCP+UDP 9987 (controle TLS + voz Opus AEAD)`,
    deps: [
      "CMake + compilador C++17",
      "Qt 6 (Network, Sql)",
      "OpenSSL",
      "SQLite ou MySQL",
      "Opcional: TURN para NATs restritivos",
    ],
  },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-black/50">
      <button
        onClick={copy}
        className="absolute right-3 top-3 rounded-md border border-white/10 bg-white/[0.06] p-2 text-zinc-400 transition-colors hover:text-white"
        aria-label="Copiar comandos"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function Downloads() {
  const [active, setActive] = useState("desktop");
  const current = platforms.find((p) => p.id === active) ?? platforms[0];

  return (
    <section id="download" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#7c2ae8]/[0.09] blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-[#b26bf0]/25 bg-[#b26bf0]/[0.07] px-3.5 py-1 text-xs font-medium text-[#d8bcf7]"
          >
            Download
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Comece a falar em minutos
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400">
            Tudo é gratuito e de domínio público. Use, copie, modifique,
            venda — a licença Unlicense não pede nem crédito.
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Plataformas do Halla"
        >
          {platforms.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={active === p.id}
              onClick={() => setActive(p.id)}
              className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                active === p.id
                  ? "border-[#b57bee]/50 bg-[#b57bee]/[0.14] text-white"
                  : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200"
              }`}
            >
              <p.icon className="h-4 w-4" aria-hidden="true" />
              {p.label}
            </button>
          ))}
        </div>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto mt-8 max-w-4xl"
        >
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 sm:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold text-white">
                  {current.title}
                </h3>
                <p className="mt-1 font-mono text-[13px] text-[#c99bf5]">
                  {current.subtitle}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {current.description}
                </p>
              </div>
              <a
                href={`${current.repo}/releases`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8b31e8] to-[#6d28d9] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(139,49,232,0.6)] transition-all hover:from-[#9b46f0] hover:to-[#7c3aed]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Baixar release
              </a>
            </div>

            <div className="mt-7">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                Compilar do código-fonte
              </p>
              <CodeBlock code={current.code} />
              <p className="mt-3 flex items-center gap-1.5 text-[13px] text-zinc-500">
                <Apple className="h-3.5 w-3.5" aria-hidden="true" />
                {current.releaseNote}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {current.deps.map((d) => (
                <span
                  key={d}
                  className="rounded-md border border-white/[0.08] bg-black/25 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
                >
                  {d}
                </span>
              ))}
            </div>

            <a
              href={current.repo}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#c99bf5] transition-colors hover:text-[#e3cdfa]"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              Código-fonte no GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
