import { ArrowUp, FileText, Github, Scale } from "lucide-react";

const projects = [
  {
    name: "Halla Desktop",
    href: "https://github.com/GroupHalla/Halla",
    desc: "Cliente Windows/Linux",
  },
  {
    name: "Halla Mobile",
    href: "https://github.com/GroupHalla/Halla-Mobile",
    desc: "Cliente Android nativo",
  },
  {
    name: "Halla Server",
    href: "https://github.com/GroupHalla/HallaServer",
    desc: "Servidor auto-hospedável",
  },
  {
    name: "WebRTC Builds",
    href: "https://github.com/GroupHalla/Halla-WebRTC-Builds",
    desc: "SDK nativo de WebRTC",
  },
];

const resources = [
  {
    name: "Especificação do protocolo",
    href: "https://github.com/GroupHalla/HallaServer/blob/main/PROTOCOL.md",
  },
  {
    name: "Guia de plugins",
    href: "https://github.com/GroupHalla/Halla/blob/main/docs/PLUGINS.md",
  },
  {
    name: "Segurança do servidor",
    href: "https://github.com/GroupHalla/HallaServer/blob/main/SECURITY.md",
  },
  {
    name: "Programa de feedback",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScwy7k_HyeNnl8kuNfMSs8H-pHUGfhuKijAxkYkzd7m_aX4NA/viewform",
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/halla-logo.png"
                alt="Logotipo do Halla"
                className="h-9 w-9 rounded-lg"
                width={36}
                height={36}
              />
              <span className="text-lg font-semibold tracking-tight text-white">
                Halla
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              Ecossistema de comunicação por voz de código aberto: desktop,
              mobile e servidor auto-hospedável com protocolo próprio,
              documentado e cifrado por padrão.
            </p>
            <a
              href="https://github.com/GroupHalla"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.09] hover:text-white"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GroupHalla no GitHub
            </a>
          </div>

          <nav aria-label="Projetos do Halla">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Projetos
            </h3>
            <ul className="mt-4 space-y-3">
              {projects.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col"
                  >
                    <span className="text-sm font-medium text-zinc-200 transition-colors group-hover:text-[#c99bf5]">
                      {p.name}
                    </span>
                    <span className="text-xs text-zinc-500">{p.desc}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Recursos e documentação">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Recursos
            </h3>
            <ul className="mt-4 space-y-3">
              {resources.map((r) => (
                <li key={r.name}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
                  >
                    {r.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 sm:flex-row">
          <p className="flex items-center gap-2 text-xs text-zinc-500">
            <Scale className="h-3.5 w-3.5" aria-hidden="true" />
            Domínio público via Unlicense — usar, copiar, modificar e
            redistribuir livremente, com ou sem crédito.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            Voltar ao topo
          </a>
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-[11px] text-zinc-600">
          <FileText className="h-3 w-3" aria-hidden="true" />
          Componentes de terceiros (Qt, Opus, OpenSSL, libwebrtc, mbedTLS)
          seguem suas respectivas licenças.
        </p>
      </div>
    </footer>
  );
}
