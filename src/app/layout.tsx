import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kiloforge.com"),
  title: "Kiloforge | 1,000x Productivity with AI Swarms",
  description: "An orchestration platform for coordinating AI coding agents at scale. Runs a private git forge, a real-time monitoring dashboard, and an orchestrator on your machine.",
  keywords: ["AI agents", "git forge", "development orchestration", "Claude Code", "AI CLI", "Productivity"],
  openGraph: {
    title: "Kiloforge | Forge code at the speed of thought",
    description: "Orchestration platform for coordinating AI coding agents at scale on your local machine.",
    url: "https://kiloforge.example.com",
    siteName: "Kiloforge",
    images: [
      {
        url: "/kf_logo.webp",
        width: 1200,
        height: 630,
        alt: "Kiloforge Agent Swarm",
      },
    ],
  },
  icons: {
    icon: "/kf_logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-neutral-200 selection:bg-neutral-800 selection:text-neutral-100 min-h-screen flex flex-col`}>
        {children}
        {process.env.NEXT_PUBLIC_GOATCOUNTER_URL && (
          <Script
            src={process.env.NEXT_PUBLIC_GOATCOUNTER_SCRIPT_URL || "//gc.zgo.at/count.js"}
            data-goatcounter={process.env.NEXT_PUBLIC_GOATCOUNTER_URL}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
