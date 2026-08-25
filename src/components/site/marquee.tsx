"use client";

import { Sparkles } from "lucide-react";

const rowTech = [
  "Voz Opus 20 ms",
  "ChaCha20-Poly1305",
  "Identidade Ed25519",
  "WebRTC 4K/60",
  "Protocolo aberto v5",
  "Sussurro",
  "PTT flutuante",
  "Canais temporários",
  "Emblemas Ed25519",
  "TLS + pinagem TOFU",
  "Áudio 3D e rádio",
  "Complementos .halla-addon",
];

const rowPlatforms = [
  "Windows",
  "Linux",
  "Android 8.0+",
  "Qt 6 · C++17",
  "Kotlin + JNI",
  "SQLite · MySQL",
  "Docker",
  "systemd",
  "Pterodactyl",
  "TURN opcional",
  "Uso não comercial",
  "pt-BR · en · es",
];

function MarqueeRow({
  items,
  reverse = false,
  dim = false,
}: {
  items: string[];
  reverse?: boolean;
  dim?: boolean;
}) {
  const track = [...items, ...items];
  return (
    <div className="marquee py-3">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`mx-5 flex shrink-0 items-center gap-2.5 text-[13px] font-medium tracking-wide ${
              dim ? "text-zinc-500" : "text-zinc-300"
            }`}
          >
            <Sparkles
              className={`h-3.5 w-3.5 ${dim ? "text-zinc-600" : "text-[#b57bee]"}`}
              aria-hidden="true"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="Tecnologias e plataformas do Halla"
      className="relative border-y border-white/[0.07] bg-black/30"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0712] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0712] to-transparent" />
      <MarqueeRow items={rowTech} />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <MarqueeRow items={rowPlatforms} reverse dim />
    </section>
  );
}
