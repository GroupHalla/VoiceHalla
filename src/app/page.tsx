import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Ecosystem } from "@/components/site/ecosystem";
import { Features } from "@/components/site/features";
import { Screenshots } from "@/components/site/screenshots";
import { Security } from "@/components/site/security";
import { Protocol } from "@/components/site/protocol";
import { Downloads } from "@/components/site/downloads";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

const stats = [
  { value: "3", label: "plataformas unidas pelo mesmo protocolo" },
  { value: "4K/60", label: "resolução máxima de transmissão de tela" },
  { value: "20 ms", label: "quadros de voz Opus, UDP de baixa latência" },
  { value: "v5", label: "protocolo aberto e documentado" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#0a0712] text-zinc-100">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Stats strip */}
        <section aria-label="Números do Halla" className="relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] lg:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-1.5 bg-[#0d0916] px-4 py-8 text-center"
                >
                  <span className="bg-gradient-to-r from-[#a855f7] to-[#22d3ee] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="max-w-[220px] text-[13px] leading-snug text-zinc-500">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Ecosystem />
        <Features />
        <Screenshots />
        <Security />
        <Protocol />
        <Downloads />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
