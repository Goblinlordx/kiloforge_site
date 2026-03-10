"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GitMerge,
  LayoutDashboard,
  TerminalSquare,
  Shield,
  Activity,
  HardDrive,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  User,
  Copy,
  Check,
  Apple,
  Monitor,
  Download
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

type Platform = "macos" | "linux" | "windows";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "macos";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("linux")) return "linux";
  return "macos";
}

const installCommands: Record<Platform, { primary: string; alt?: string; label: string; altLabel?: string }> = {
  macos: {
    label: "Shell script",
    primary: "curl -fsSL https://raw.githubusercontent.com/kiloforge/kiloforge/main/install.sh | sh",
  },
  linux: {
    label: "Shell script",
    primary: "curl -fsSL https://raw.githubusercontent.com/kiloforge/kiloforge/main/install.sh | sh",
  },
  windows: {
    label: "Download binary",
    primary: "",
  },
};

function InstallCommand({ command, onCopy }: { command: string; onCopy: () => void }) {
  return (
    <div className="relative group">
      <pre className="glass-panel px-6 py-4 pr-14 rounded-xl flex items-center gap-3 text-sm font-mono text-neutral-300 border border-white/10 shadow-2xl overflow-hidden">
        <span className="text-emerald-400 shrink-0">$</span>
        <span className="whitespace-nowrap overflow-x-auto">{command}</span>
      </pre>
      {/* Fade overlay before copy button */}
      <div className="absolute right-12 top-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/[0.04] pointer-events-none rounded-r-xl" />
      <button
        onClick={onCopy}
        className="absolute right-0 top-0 bottom-0 flex items-center px-3 rounded-r-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-all border-l border-white/10"
        aria-label="Copy to clipboard"
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
  );
}

function CopiedToast({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 justify-center"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Copied to clipboard</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const platformMeta: Record<Platform, { icon: React.ReactNode; label: string }> = {
  macos: { icon: <Apple className="w-4 h-4" />, label: "macOS" },
  linux: { icon: <TerminalSquare className="w-4 h-4" />, label: "Linux" },
  windows: { icon: <Monitor className="w-4 h-4" />, label: "Windows" },
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("macos");
  const [copied, setCopied] = useState(false);

  // Only macOS is available during early alpha — always default to it
  useEffect(() => {
    setPlatform("macos");
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentInstall = installCommands[platform];

  return (
    <div className="min-h-screen font-sans selection:bg-neutral-800 selection:text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">
          <div className="flex items-center gap-3 relative z-50">
            <Image src="/kf_logo.webp" alt="Kiloforge Logo" width={32} height={32} className="rounded-md shadow-lg" />
            <span className="font-semibold text-lg tracking-tight">Kiloforge</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <Link href="/features" className="hover:text-white transition-colors">Screenshots</Link>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="https://github.com/kiloforge/kiloforge" target="_blank" rel="noopener noreferrer" className="text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/10">
              GitHub
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 -mr-2 text-neutral-400 hover:text-white transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col px-6 py-6 gap-6 text-base font-medium text-neutral-300">
                <a
                  href="#features"
                  className="hover:text-white transition-colors"
                  onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 100)}
                >
                  Features
                </a>
                <Link
                  href="/features"
                  className="hover:text-white transition-colors"
                  onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 100)}
                >
                  Screenshots
                </Link>
                <a
                  href="#how-it-works"
                  className="hover:text-white transition-colors"
                  onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 100)}
                >
                  How it Works
                </a>
                <a
                  href="#architecture"
                  className="hover:text-white transition-colors"
                  onClick={() => setTimeout(() => setIsMobileMenuOpen(false), 100)}
                >
                  Architecture
                </a>
                <a
                  href="https://github.com/kiloforge/kiloforge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white flex items-center justify-center gap-2 bg-white/10 px-4 py-3 rounded-xl hover:bg-white/20 transition-all border border-white/10 mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <main className="pt-20 pb-20 px-6">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center w-full mx-auto mt-8 flex flex-col items-center relative"
          >
            <motion.div variants={fadeIn} className="mb-4 flex justify-center w-full z-10">
              <div className="drop-shadow-[0_0_40px_rgba(52,211,153,0.25)]">
                <Image
                  src="/kf_logo.webp"
                  alt="Kiloforge Logo Hero"
                  width={985}
                  height={493}
                  priority
                  style={{ width: "985px", height: "auto", maxWidth: "100%" }}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300 mb-8 z-10">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Forge code at the speed of thought</span>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight max-w-4xl mx-auto z-10">
              1,000x <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Productivity.</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed z-10">
              An orchestration platform that transforms pure intent into meaningful action. Runs the Cortex control plane, Command Deck, and Claude Code swarms directly on your machine.
            </motion.p>

            {/* Platform Install Section */}
            <motion.div variants={fadeIn} className="w-full max-w-2xl z-10" id="install">
              <div className="flex items-center justify-center mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Early Alpha Build
                </span>
              </div>
              {/* Platform Tabs */}
              <div className="flex items-center justify-center gap-1 mb-4 p-1 rounded-xl bg-white/5 border border-white/10 w-fit mx-auto">
                {(["macos", "linux", "windows"] as Platform[]).map((p) => {
                  const disabled = p !== "macos";
                  return (
                    <button
                      key={p}
                      onClick={() => !disabled && setPlatform(p)}
                      title={disabled ? "Coming soon" : undefined}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        disabled
                          ? "text-neutral-600 cursor-not-allowed opacity-50"
                          : platform === p
                            ? "bg-white/10 text-white border border-white/15 shadow-sm"
                            : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                      }`}
                    >
                      {platformMeta[p].icon}
                      <span className="hidden sm:inline">{platformMeta[p].label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Install Command */}
              <div className="space-y-3">
                {platform === "windows" ? (
                  <a
                    href="https://github.com/kiloforge/kiloforge/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel px-6 py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-medium text-neutral-300 border border-white/10 shadow-2xl hover:border-emerald-500/30 hover:text-white transition-all group"
                  >
                    <Download className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>Download from GitHub Releases</span>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ) : (
                  <>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1.5 text-left ml-1">{currentInstall.label}</p>
                      <InstallCommand command={currentInstall.primary} onCopy={() => copyToClipboard(currentInstall.primary)} />
                    </div>
                    {currentInstall.alt && (
                      <div>
                        <p className="text-xs text-neutral-500 mb-1.5 text-left ml-1">{currentInstall.altLabel}</p>
                        <InstallCommand command={currentInstall.alt} onCopy={() => copyToClipboard(currentInstall.alt!)} />
                      </div>
                    )}
                  </>
                )}
                <CopiedToast show={copied} />
              </div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-32"
            id="features"
          >
            <FeatureCard
              icon={<Shield className="w-6 h-6 text-emerald-400" />}
              title="Private Infrastructure"
              description="The Cortex control plane and all coordination run locally. Your code stays completely on your machine."
            />
            <FeatureCard
              icon={<TerminalSquare className="w-6 h-6 text-cyan-400" />}
              title="Autonomous Cloud Agents"
              description="Spawn Claude Code agents that implement, verify, and merge code independently in parallel worktrees."
            />
            <FeatureCard
              icon={<LayoutDashboard className="w-6 h-6 text-indigo-400" />}
              title="Command Deck"
              description="Monitor agents, track quotas, enforce budgets, and stream logs live in the Command Deck."
            />
            <FeatureCard
              icon={<User className="w-6 h-6 text-rose-400" />}
              title="Kiloforger + Swarm"
              description="Direct collaboration between Kiloforgers and Claude Code swarms via tracks, worktrees, and the Command Deck."
            />
            <FeatureCard
              icon={<Activity className="w-6 h-6 text-amber-400" />}
              title="Cradle-to-Grave Tracing"
              description="OpenTelemetry traces follow each track from conception through agent work, verification, and final merge."
            />
            <FeatureCard
              icon={<HardDrive className="w-6 h-6 text-blue-400" />}
              title="Session Persistence"
              description="Gracefully shut down agents and auto-recover them on restart with full contextual continuity."
            />
          </motion.div>

           {/* How It works */}
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={stagger}
             className="mt-40 border-t border-white/10 pt-32 text-center scroll-mt-32"
             id="how-it-works"
          >
             <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">How it Works</motion.h2>

             <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block -translate-y-12"></div>

                <motion.div variants={fadeIn} className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-6 border border-white/20 shadow-lg">
                    <HardDrive className="w-8 h-8 text-neutral-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">1. Local Setup</h3>
                  <p className="text-neutral-400 text-sm">Start the Cortex control plane with <code className="text-neutral-300 bg-white/10 px-1 py-0.5 rounded">kf up</code>. Tear it down with <code className="text-neutral-300 bg-white/10 px-1 py-0.5 rounded">kf down</code>.</p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-6 border border-white/20 shadow-lg">
                    <TerminalSquare className="w-8 h-8 text-neutral-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Spawn Swarms</h3>
                  <p className="text-neutral-400 text-sm">Create Kiloforge tracks and spawn Claude Code agents into pooled worktrees to implement tickets.</p>
                </motion.div>

                <motion.div variants={fadeIn} className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-6 border border-white/20 shadow-lg">
                    <GitMerge className="w-8 h-8 text-neutral-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Ship</h3>
                  <p className="text-neutral-400 text-sm">Agents implement, verify, and merge directly — no review cycles needed. Ship at the speed of thought.</p>
                </motion.div>
             </div>
          </motion.div>

          {/* Architecture Visual Map */}
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={stagger}
             className="mt-40 pt-12 md:max-w-4xl mx-auto scroll-mt-32"
             id="architecture"
          >
             <motion.div variants={fadeIn} className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Architecture</h2>
               <p className="text-lg text-neutral-400">A local control plane coordinating Claude Code swarms directly on your machine.</p>
             </motion.div>

             <div className="grid md:grid-cols-3 gap-6 relative mt-12">
               {/* Left Column: Inputs & Interfaces */}
               <div className="flex flex-col gap-6 justify-center">
                 {/* The Kiloforger (Human) */}
                 <motion.div variants={fadeIn} className="glass-panel p-6 rounded-2xl border border-amber-500/20 relative z-10 bg-black/60 shadow-[0_0_30px_rgba(245,158,11,0.05)] hover:border-amber-500/40 transition-colors">
                   <div className="flex items-start gap-4 mb-3">
                     <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-500 shrink-0">
                       <User className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-lg font-bold font-mono text-amber-100">The Kiloforger</h3>
                       <p className="text-xs text-neutral-400 font-mono">Human Director</p>
                     </div>
                   </div>
                    <div className="text-neutral-300 text-xs pl-[3.5rem] space-y-1.5">
                      <p className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span> Defines project architecture and tracks</p>
                      <p className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span> Provides guidance if agents hit blockers</p>
                      <p className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span> Historically audits agent decision-making</p>
                    </div>
                 </motion.div>

                 {/* Connector Arrow for Mobile */}
                 <div className="flex justify-center md:hidden text-white/10 py-1">
                   <ArrowRight className="w-5 h-5 rotate-90" />
                 </div>

                 {/* Command Deck */}
                 <motion.div variants={fadeIn} className="glass-panel p-6 rounded-2xl border border-indigo-500/20 relative z-10 bg-black/60 shadow-[0_0_30px_rgba(99,102,241,0.05)] hover:border-indigo-500/40 transition-colors">
                   <div className="flex items-start gap-4 mb-3">
                     <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400 shrink-0">
                       <LayoutDashboard className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-lg font-bold font-mono text-indigo-100">Command Deck</h3>
                       <p className="text-xs text-neutral-400 font-mono">Real-Time Observability</p>
                     </div>
                   </div>
                   <div className="text-neutral-300 text-xs pl-[3.5rem] space-y-1.5">
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Live agent log streaming</p>
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Track quota and cost metrics</p>
                   </div>
                 </motion.div>
               </div>

               {/* Connector Arrow for Mobile */}
               <div className="flex justify-center md:hidden text-white/10 py-1">
                 <ArrowRight className="w-5 h-5 rotate-90" />
               </div>

               {/* Center Column: Cortex */}
               <div className="flex flex-col gap-6 justify-center relative md:mx-4">
                 {/* Desktop horizontal connectors */}
                 <div className="hidden md:block absolute top-[25%] -left-8 right-1/2 h-px bg-gradient-to-r from-amber-500/20 to-cyan-500/50 -z-10"></div>
                 <div className="hidden md:block absolute top-[75%] -left-8 right-1/2 h-px bg-gradient-to-r from-indigo-500/20 to-cyan-500/50 -z-10"></div>
                 <div className="hidden md:block absolute top-1/2 left-1/2 -right-8 h-px bg-gradient-to-l from-emerald-500/20 to-cyan-500/50 -z-10"></div>

                 <motion.div variants={fadeIn} className="glass-panel p-6 rounded-2xl border-2 border-cyan-500/30 relative z-10 bg-black/80 shadow-[0_0_50px_rgba(6,182,212,0.15)] transform md:scale-105">
                   <div className="flex flex-col items-center mb-6 text-center">
                     <div className="p-4 bg-cyan-500/10 rounded-xl text-cyan-400 mb-4 ring-1 ring-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                       <Activity className="w-8 h-8" />
                     </div>
                     <h3 className="text-2xl font-bold font-mono text-cyan-100">Cortex</h3>
                     <p className="text-sm text-cyan-400/80 font-mono mt-1">Local Control Plane</p>
                   </div>
                   <div className="text-neutral-300 text-xs space-y-2 bg-white/5 p-4 rounded-xl border border-white/5">
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span> Central system router proxy</p>
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span> Agent lifecycle management</p>
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span> Track and worktree coordination</p>
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span> Merge context serialization</p>
                   </div>
                 </motion.div>
               </div>

               {/* Connector Arrow for Mobile */}
               <div className="flex justify-center md:hidden text-white/10 py-1">
                 <ArrowRight className="w-5 h-5 rotate-90" />
               </div>

               {/* Right Column: Claude Code Swarm */}
               <div className="flex flex-col gap-6 justify-center">
                 {/* Claude Code Swarm */}
                 <motion.div variants={fadeIn} className="glass-panel p-6 rounded-2xl border border-emerald-500/20 relative z-10 bg-black/60 shadow-[0_0_30px_rgba(52,211,153,0.05)] hover:border-emerald-500/40 transition-colors">
                   <div className="flex items-start gap-4 mb-3">
                     <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                       <TerminalSquare className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-lg font-bold font-mono text-emerald-100">Claude Code Swarm</h3>
                       <p className="text-xs text-neutral-400 font-mono">Autonomous Agents</p>
                     </div>
                   </div>
                   <div className="text-neutral-300 text-xs pl-[3.5rem] space-y-1.5">
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Execute autonomously in worktrees</p>
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Utilize specialized project skills</p>
                   </div>
                 </motion.div>

               </div>
             </div>
          </motion.div>

          {/* CTA */}
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeIn}
             className="mt-40 mb-20 p-12 glass-panel rounded-3xl text-center border-white/10 relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent" />
             <div className="relative z-10">
               <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to scale your output?</h2>
               <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
                 Ship at 1,000x with the Cortex, Command Deck, and Claude Code swarms.
               </p>
               <a
                 href="#install"
                 className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black px-8 py-4 rounded-xl font-semibold hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:shadow-[0_0_40px_rgba(52,211,153,0.5)]"
               >
                 Get Started
                 <ArrowRight className="w-5 h-5" />
               </a>
             </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-sm text-neutral-500 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
               <Image src="/kf_logo.webp" alt="Kiloforge Logo" width={24} height={24} className="rounded" />
               <span>&copy; 2026 Ben Baldivia. All rights reserved.</span>
            </div>
            <span className="text-neutral-600 text-xs ml-8">Created by <a href="https://blog.dev-kat.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Ben Baldivia</a></span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="https://github.com/kiloforge/kiloforge" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <Link href="/license" className="hover:text-white transition-colors">License</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/[0.05] transition-all group group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
    >
      <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 tracking-tight">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
