import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Marquee } from "@/components/site/marquee";
import { Ecosystem } from "@/components/site/ecosystem";
import { Features } from "@/components/site/features";
import { Screenshots } from "@/components/site/screenshots";
import { Security } from "@/components/site/security";
import { Protocol } from "@/components/site/protocol";
import { Downloads } from "@/components/site/downloads";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#0a0712] text-zinc-100">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Stats />
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
