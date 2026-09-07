import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/i18n/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Halla — Free, open voice communication without middlemen",
  description:
    "Halla is an open-source voice communication ecosystem: a desktop client (Windows/Linux), a native Android app, and a self-hostable server. Encrypted Opus voice, 4K screen sharing over WebRTC, channels with granular permissions, and an open protocol.",
  keywords: [
    "Halla",
    "VoIP",
    "voice chat",
    "TeamSpeak",
    "Mumble",
    "open source",
    "self-hosted",
    "Opus",
    "WebRTC",
    "Ed25519",
  ],
  authors: [{ name: "GroupHalla" }],
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/halla-logo.png`,
  },
  openGraph: {
    title: "Halla — Free and open voice communication",
    description:
      "Desktop, Mobile and Server. Per-channel end-to-end encrypted voice, 4K screen sharing over WebRTC, and the open v6 protocol. Free for non-commercial use.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <I18nProvider>{children}</I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
