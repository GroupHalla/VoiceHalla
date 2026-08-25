import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Halla — Comunicação por voz livre, aberta e sem intermediários",
  description:
    "Halla é um ecossistema de comunicação por voz de código aberto: cliente desktop (Windows/Linux), app Android nativo e servidor auto-hospedável. Voz Opus cifrada, compartilhamento de tela em 4K via WebRTC, canais com permissões granulares e protocolo aberto.",
  keywords: [
    "Halla",
    "VoIP",
    "voice chat",
    "TeamSpeak",
    "Mumble",
    "open source",
    "código aberto",
    "self-hosted",
    "Opus",
    "WebRTC",
    "Ed25519",
  ],
  authors: [{ name: "GroupHalla" }],
  icons: {
    icon: "/halla-logo.png",
  },
  openGraph: {
    title: "Halla — Comunicação por voz livre e aberta",
    description:
      "Desktop, Mobile e Server. Voz cifrada de ponta a ponta por canal, tela em 4K via WebRTC e protocolo aberto v5. Tudo em domínio público (Unlicense).",
    siteName: "Halla",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
