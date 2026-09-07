"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/site/effects";
import { useI18n } from "@/i18n/provider";

/* Numeric values stay language-independent; labels come from the dict. */
const STAT_VALUES = [
  { value: 3, prefix: "", suffix: "" },
  { value: 20, prefix: "", suffix: " ms" },
  { value: 2160, prefix: "", suffix: "p" },
  { value: 6, prefix: "v", suffix: "" },
  { value: 0, prefix: "", suffix: "" },
];

export function Stats() {
  const { t } = useI18n();
  return (
    <section
      aria-label={t.stats.ariaLabel}
      className="relative border-b border-white/[0.07] bg-gradient-to-b from-black/40 to-transparent py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/[0.07]">
          {t.stats.items.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-start px-0 lg:px-7 lg:first:pl-0"
            >
              <CountUp
                value={STAT_VALUES[i].value}
                prefix={STAT_VALUES[i].prefix}
                suffix={STAT_VALUES[i].suffix}
                className="bg-gradient-to-br from-white via-[#d8bcf7] to-[#a855f7] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-[2.75rem]"
              />
              <span className="mt-2 max-w-[190px] text-[13px] leading-snug text-zinc-500">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
