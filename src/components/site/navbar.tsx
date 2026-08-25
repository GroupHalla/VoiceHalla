"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          ? "bg-[#0a0712]/85 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="#" className="flex items-center gap-2.5" aria-label="Halla — início">
          <img
            src="/halla-logo.png"
            alt="Logotipo do Halla"
            className="h-8 w-8 rounded-lg"
            width={32}
            height={32}
          />
          <span className="text-lg font-semibold tracking-tight text-white">
            Halla
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-2 border-white/10 bg-white/[0.04] text-zinc-200 hover:bg-white/[0.09] hover:text-white"
          >
            <a
              href="https://github.com/GroupHalla"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </Button>
        </div>

        <button
          className="rounded-md p-2 text-zinc-300 hover:text-white md:hidden"
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

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/[0.06] bg-[#0a0712]/95 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/GroupHalla"
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
