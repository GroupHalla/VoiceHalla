"use client";

import { motion } from "framer-motion";
import {
  Fingerprint,
  KeyRound,
  Lock,
  RefreshCcw,
  ShieldCheck,
  Vault,
} from "lucide-react";
import { SectionHeader, Aurora } from "@/components/site/effects";

const items = [
  {
    icon: Fingerprint,
    title: "Identidade Ed25519",
    description:
      "Cada cliente gera um par de chaves Ed25519. O login exige a assinatura de um desafio com nonce — e o UID é derivado da chave pública, nunca do que o cliente alega ser. Bans, grupos e emblemas ficam vinculados a essa identidade.",
  },
  {
    icon: Lock,
    title: "Voz cifrada por canal",
    description:
      "Áudio Opus e transmissões cifrados com ChaCha20-Poly1305 (AEAD) usando chave de 32 bytes por canal. O servidor é um relay puro: encaminha os pacotes, mas nunca possui a chave para decifrá-los.",
  },
  {
    icon: RefreshCcw,
    title: "Rotação de chaves",
    description:
      "Sempre que a composição de um canal muda — alguém entra, sai ou é movido — a chave do componente é rotacionada e redistribuída. Forward secrecy básica embutida no protocolo, sem esforço do usuário.",
  },
  {
    icon: KeyRound,
    title: "TLS com pinagem TOFU",
    description:
      "O canal de controle roda sobre TLS 1.2+. Na primeira conexão, o fingerprint do certificado é fixado; se ele mudar depois, o cliente alerta sobre possível ataque man-in-the-middle — o modelo de confiança do SSH.",
  },
  {
    icon: Vault,
    title: "Chaves no cofre do SO",
    description:
      "A chave privada nunca fica em texto puro: o Desktop usa Credential Manager, Keychain ou Secret Service via QtKeychain; o Mobile cifra com chave AES do Android Keystore, com backup portátil protegido por senha.",
  },
  {
    icon: ShieldCheck,
    title: "Atualizações verificadas",
    description:
      "Antes de instalar qualquer atualização, o cliente confere o checksum SHA-256 e só baixa de um domínio fixo. No Mobile, o APK assinado passa por apksigner verify antes de ser publicado.",
  },
];

export function Security() {
  return (
    <section
      id="seguranca"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      <Aurora variant="mixed" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Sticky intro + audio flow diagram */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                kicker="Segurança primeiro"
                accent="emerald"
                title={
                  <>
                    O servidor nunca escuta
                    <br className="hidden sm:block" /> o que você diz
                  </>
                }
                description="A arquitetura de segurança do Halla é obrigatória para todas as conexões, independente da versão do protocolo. Não é uma opção premium — é o padrão."
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="mt-8 rounded-2xl border border-white/[0.08] bg-black/40 p-5 sm:p-6"
              >
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                  como o áudio viaja
                </p>
                <div className="space-y-3 font-mono text-[13px] leading-relaxed">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-zinc-300">
                    <span className="rounded bg-[#b57bee]/15 px-1.5 py-0.5 text-[11px] text-[#c99bf5]">
                      mic
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">→</span>
                    <span className="text-[#c99bf5]">Opus 20 ms</span>
                    <span aria-hidden="true" className="text-zinc-600">→</span>
                    <span className="text-emerald-400">ChaCha20-Poly1305</span>
                  </p>
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[11px] text-zinc-400">
                      servidor
                    </span>
                    <span className="text-zinc-400">
                      encaminha cifrado <span className="text-red-400">sem poder decifrar</span>
                    </span>
                  </p>
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-zinc-300">
                    <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 text-[11px] text-emerald-300">
                      você
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">→</span>
                    <span className="text-emerald-400">valida tag AEAD</span>
                    <span aria-hidden="true" className="text-zinc-600">→</span>
                    <span className="text-[#c99bf5]">decodifica</span>
                    <span aria-hidden="true" className="text-zinc-600">→</span>
                    <span className="text-zinc-300">alto-falante</span>
                  </p>
                </div>
                <div className="flow-line mt-5 h-px w-full" aria-hidden="true" />
              </motion.div>
            </div>
          </div>

          {/* Timeline items */}
          <div className="relative lg:col-span-7">
            <div
              aria-hidden="true"
              className="flow-line absolute bottom-6 left-[27px] top-6 hidden w-px sm:block"
            />
            <div className="space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="group relative rounded-2xl border border-emerald-400/[0.12] bg-gradient-to-r from-emerald-400/[0.045] to-transparent p-5 pl-5 transition-all duration-300 hover:border-emerald-400/30 hover:from-emerald-400/[0.08] sm:p-6 sm:pl-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-[#0a0712] shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
