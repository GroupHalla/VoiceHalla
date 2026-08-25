"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Github, Menu, X } from "lucide-react";

const links = [
  { href: "#recursos", label: "Recursos" },
  { href: "#ecossistema", label: "Ecossistema" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#protocolo", label: "Protocolo" },
  { href: "#download", label: "Download" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#0a0712]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#22d3ee]"
        style={{ scaleX: progress }}
      />

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="#"
          className="group flex items-center gap-2.5"
          aria-label="Halla — início"
        >
          <span className="relative">
            <img
              src="/halla-logo.png"
              alt="Logotipo do Halla"
              className="h-8 w-8 rounded-lg transition-transform duration-300 group-hover:scale-110"
              width={32}
              height={32}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-lg bg-[#8b31e8]/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
            />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            Halla
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              {l.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-[#a855f7] to-[#22d3ee] transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="https://github.com/GroupHalla"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-200 transition-all hover:border-[#b57bee]/40 hover:bg-white/[0.09] hover:text-white"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
            <ArrowUpRight
              className="h-3.5 w-3.5 text-zinc-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c99bf5]"
              aria-hidden="true"
            />
          </a>
        </div>

        <button
          className="rounded-md p-2 text-zinc-300 transition-colors hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#0a0712]/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="rounded-lg px-3 py-3 text-base font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="https://github.com/GroupHalla"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * links.length }}
                className="mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
