"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "framer-motion";

/* ---------- Equalizer bars (voice activity indicator) ---------- */
export function Eq({
  className = "",
  bars = 4,
  color = "text-emerald-400",
}: {
  className?: string;
  bars?: number;
  color?: string;
}) {
  return (
    <span
      className={`flex items-end gap-[2.5px] ${color} ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="eq-bar"
          style={{ animationDelay: `${i * 0.13}s` }}
        />
      ))}
    </span>
  );
}

/* ---------- Count-up number on scroll into view ---------- */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

/* ---------- Terminal typewriter ---------- */
export function Typewriter({
  lines,
  className = "",
  speed = 16,
  startDelay = 400,
}: {
  lines: string[];
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [done, setDone] = useState<string[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (!inView) return;
    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;
    let startTimer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const text = lines[line];
      if (char <= text.length) {
        setCurrent(text.slice(0, char));
        char++;
        timer = setTimeout(tick, speed);
      } else {
        setDone((d) => [...d, text]);
        setCurrent("");
        line++;
        char = 0;
        if (line < lines.length) {
          timer = setTimeout(tick, 300);
        }
      }
    };
    startTimer = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(timer);
      clearTimeout(startTimer);
    };
  }, [inView, lines, speed, startDelay]);

  const finished = done.length === lines.length;

  return (
    <div ref={ref} className={className}>
      {done.map((l, i) => (
        <p key={i} className="whitespace-pre-wrap">
          {l}
        </p>
      ))}
      {!finished && (
        <p className="whitespace-pre-wrap">
          {current}
          <span className="terminal-cursor" aria-hidden="true" />
        </p>
      )}
      {finished && <span className="terminal-cursor" aria-hidden="true" />}
    </div>
  );
}

/* ---------- Spotlight card (glow follows the mouse) ---------- */
export function SpotlightCard({
  children,
  className = "",
  rgb = "139, 49, 232",
}: {
  children: ReactNode;
  className?: string;
  rgb?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -600, y: -600 });
  const [active, setActive] = useState(false);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`group/spot relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(560px circle at ${pos.x}px ${pos.y}px, rgba(${rgb},0.13), transparent 46%)`,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

/* ---------- Section header (left-aligned, editorial) ---------- */
export function SectionHeader({
  kicker,
  title,
  description,
  accent = "purple",
  id,
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  accent?: "purple" | "cyan" | "emerald";
  id?: string;
}) {
  const colors = {
    purple: {
      text: "text-[#c99bf5]",
      border: "border-[#b57bee]/30",
      bg: "bg-[#b57bee]/[0.09]",
      line: "from-[#b57bee] to-transparent",
    },
    cyan: {
      text: "text-[#7de8f7]",
      border: "border-[#22d3ee]/30",
      bg: "bg-[#22d3ee]/[0.09]",
      line: "from-[#22d3ee] to-transparent",
    },
    emerald: {
      text: "text-emerald-300",
      border: "border-emerald-400/30",
      bg: "bg-emerald-400/[0.09]",
      line: "from-emerald-400 to-transparent",
    },
  }[accent];

  return (
    <div id={id} className="max-w-2xl scroll-mt-24">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`h-px w-10 bg-gradient-to-r ${colors.line}`}
        />
        <span
          className={`rounded-full border ${colors.border} ${colors.bg} px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${colors.text}`}
        >
          {kicker}
        </span>
      </div>
      <h2 className="mt-5 text-balance text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}

/* ---------- Aurora background blobs ---------- */
export function Aurora({ variant = "purple" }: { variant?: "purple" | "mixed" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {variant === "purple" ? (
        <>
          <div className="aurora absolute left-[8%] top-[-180px] h-[380px] w-[380px] rounded-full bg-[#7c2ae8]/[0.16] blur-[110px]" />
          <div className="aurora-2 absolute right-[4%] top-[120px] h-[320px] w-[320px] rounded-full bg-[#22d3ee]/[0.1] blur-[100px]" />
        </>
      ) : (
        <>
          <div className="aurora-3 absolute left-[-120px] top-[20%] h-[340px] w-[340px] rounded-full bg-[#7c2ae8]/[0.13] blur-[110px]" />
          <div className="aurora absolute right-[-100px] bottom-[-60px] h-[360px] w-[360px] rounded-full bg-emerald-500/[0.09] blur-[110px]" />
        </>
      )}
    </div>
  );
}
