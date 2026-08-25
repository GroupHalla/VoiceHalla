"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/site/effects";

const stats = [
  {
    value: 3,
    prefix: "",
    suffix: "",
    label: "plataformas unidas pelo mesmo protocolo",
  },
  {
    value: 20,
    prefix: "",
    suffix: " ms",
    label: "por quadro de voz Opus, via UDP",
  },
  {
    value: 2160,
    prefix: "",
    suffix: "p",
    label: "de resolução no compartilhamento de tela",
  },
  {
    value: 5,
    prefix: "v",
    suffix: "",
    label: "protocolo aberto e documentado",
  },
  {
    value: 0,
    prefix: "",
    suffix: "",
    label: "telemetria, anúncios ou contas obrigatórias",
  },
];

export function Stats() {
  return (
    <section
      aria-label="Halla em números"
      className="relative border-b border-white/[0.07] bg-gradient-to-b from-black/40 to-transparent py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/[0.07]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-start px-0 lg:px-7 lg:first:pl-0"
            >
              <CountUp
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="bg-gradient-to-br from-white via-[#d8bcf7] to-[#a855f7] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-[2.75rem]"
              />
              <span className="mt-2 max-w-[190px] text-[13px] leading-snug text-zinc-500">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
