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

const BASE_URL = "https://kiloforge.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Kiloforge | Transforming Pure Intent into Meaningful Action",
  description: "An orchestration platform for coordinating AI coding agents at scale. Runs the Cortex control plane, Command Deck dashboard, and Claude Code swarms directly on your machine.",
  keywords: ["AI agents", "Cortex", "Command Deck", "development orchestration", "Claude Code", "AI CLI", "Productivity"],
  openGraph: {
    type: "website",
    title: "Kiloforge | Transforming Pure Intent into Meaningful Action",
    description: "Orchestration platform coordinating Claude Code swarms with the Cortex control plane and Command Deck dashboard.",
    url: BASE_URL,
    siteName: "Kiloforge",
    images: [
      {
        url: `${BASE_URL}/og_image.png`,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Kiloforge AI Swarms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiloforge | Transforming Pure Intent into Meaningful Action",
    description: "Orchestration platform coordinating Claude Code swarms with the Cortex control plane and Command Deck dashboard.",
    images: [`${BASE_URL}/og_image.png`],
    creator: "@kiloforge",
  },
  icons: {
    icon: "/icon.png",
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
