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
import { Badge } from "@/components/ui/badge";

const securityItems = [
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
      "Áudio Opus e transmissões cifrados com ChaCha20-Poly1305 (AEAD) usando chave de 32 bytes por canal. O servidor é um relay puro: ele encaminha os pacotes, mas nunca possui a chave para decifrá-los.",
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
      "O canal de controle roda sobre TLS 1.2+. Na primeira conexão, o fingerprint do certificado é fixado; se ele mudar depois, o cliente alerta sobre possível ataque man-in-the-middle — o mesmo modelo de confiança do SSH.",
  },
  {
    icon: Vault,
    title: "Chaves no cofre do SO",
    description:
      "A chave privada nunca fica em texto puro: o Desktop usa o Credential Manager, Keychain ou Secret Service via QtKeychain; o Mobile cifra com uma chave AES do Android Keystore, com backup portátil protegido por senha.",
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
    <section id="seguranca" className="relative scroll-mt-20 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[-200px] top-1/3 h-[400px] w-[400px] rounded-full bg-[#059669]/[0.07] blur-[130px]" />
        <div className="absolute right-[-200px] bottom-0 h-[400px] w-[400px] rounded-full bg-[#7c2ae8]/[0.09] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-emerald-400/25 bg-emerald-400/[0.07] px-3.5 py-1 text-xs font-medium text-emerald-300"
          >
            Segurança primeiro
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            O servidor nunca escuta
            <br className="hidden sm:block" /> o que você diz
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400">
            A arquitetura de segurança do Halla é obrigatória para todas as
            conexões, independente da versão do protocolo. Não é uma opção
            premium, não é um extra — é o padrão.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="rounded-2xl border border-emerald-400/[0.12] bg-gradient-to-b from-emerald-400/[0.045] to-transparent p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.09]">
                <item.icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/[0.08] bg-black/30 p-6 sm:p-7"
        >
          <div className="rounded-xl bg-black/50 p-4 font-mono text-[13px] leading-relaxed sm:p-5">
            <p className="text-zinc-500"># Como o áudio viaja no Halla</p>
            <p className="mt-2 text-zinc-300">
              microfone <span className="text-[#c99bf5]">→ Opus 20 ms</span>{" "}
              <span className="text-emerald-400">→ ChaCha20-Poly1305</span>{" "}
              <span className="text-zinc-500">(chave do canal)</span>
            </p>
            <p className="text-zinc-300">
              <span className="text-zinc-600">servidor:</span> encaminha pacotes
              cifrados <span className="text-red-400">sem poder decifrar</span>
            </p>
            <p className="text-zinc-300">
              ouvinte <span className="text-emerald-400">→ valida tag AEAD</span>{" "}
              <span className="text-[#c99bf5]">→ decodifica Opus</span> →
              alto-falante
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
