"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  Monitor,
  TerminalSquare,
  Sparkles,
  Layers,
  GitBranch,
  Search,
  Wrench,
  BarChart3,
  Rocket,
  Settings,
  FileText,
  ListChecks,
  Play,
} from "lucide-react";

type Platform = "unix" | "windows";

const installCommands: Record<Platform, string> = {
  unix: "git clone --depth 1 https://github.com/Kiloforge/kiloforge-skills.git /tmp/kf-skills && cp -r /tmp/kf-skills/kf-* ~/.claude/skills/ && rm -rf /tmp/kf-skills",
  windows:
    'git clone --depth 1 https://github.com/Kiloforge/kiloforge-skills.git $env:TEMP\\kf-skills; Copy-Item -Recurse $env:TEMP\\kf-skills\\kf-* ~\\.claude\\skills\\; Remove-Item -Recurse -Force $env:TEMP\\kf-skills',
};

const platformMeta: Record<Platform, { icon: React.ReactNode; label: string }> = {
  unix: { icon: <TerminalSquare className="w-4 h-4" />, label: "macOS / Linux" },
  windows: { icon: <Monitor className="w-4 h-4" />, label: "Windows" },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const workflowSteps = [
  {
    number: "1",
    title: "Setup",
    command: "/kf-setup",
    icon: <Settings className="w-6 h-6" />,
    color: "emerald",
    description:
      "An agent asks about your project — its purpose, tech stack, conventions, and goals. It creates metadata files that all other agents reference, and sets up a track registry to record planned work.",
  },
  {
    number: "2",
    title: "Architect",
    command: "/kf-architect [prompt]",
    icon: <Layers className="w-6 h-6" />,
    color: "cyan",
    description:
      "Tell the architect what you want to build or change. You can provide a prompt describing your intent, or omit it and the agent will ask. It researches your codebase, then creates a track — a detailed specification with acceptance criteria and a phased implementation plan that developer agents can pick up and execute. You can approve, reject, or provide guidance before anything is created.",
  },
  {
    number: "3",
    title: "Status",
    command: "/kf-status",
    icon: <ListChecks className="w-6 h-6" />,
    color: "amber",
    description:
      "See which tracks are ready to implement, taking into account dependency ordering and merge conflict risk. Status shows you exactly what can be worked on next and what is blocked.",
  },
  {
    number: "4",
    title: "Develop",
    command: "/kf-developer <track-id>",
    icon: <Play className="w-6 h-6" />,
    color: "indigo",
    description:
      "Hand a track ID to the developer agent and it implements the full specification — writing code, tests, and verifying everything passes. Multiple developers can run in parallel on independent tracks.",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; ring: string; dot: string }> = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", ring: "ring-emerald-500/30", dot: "bg-emerald-400" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", ring: "ring-cyan-500/30", dot: "bg-cyan-400" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", ring: "ring-amber-500/30", dot: "bg-amber-400" },
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20", ring: "ring-indigo-500/30", dot: "bg-indigo-400" },
};

const skillCategories = [
  {
    title: "Getting Started",
    icon: <Rocket className="w-5 h-5 text-emerald-400" />,
    skills: [
      { name: "kf-getting-started", desc: "Interactive project bootstrapper" },
      { name: "kf-setup", desc: "Initialize project metadata and track registry" },
      { name: "kf-interactive", desc: "General-purpose kf-aware assistant" },
    ],
  },
  {
    title: "Architecture & Planning",
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    skills: [
      { name: "kf-architect", desc: "Research codebase, create track specs" },
      { name: "kf-new-track", desc: "Create a single track with spec and plan" },
      { name: "kf-dispatch", desc: "AI swarm dispatcher for worker assignment" },
    ],
  },
  {
    title: "Development",
    icon: <GitBranch className="w-5 h-5 text-indigo-400" />,
    skills: [
      { name: "kf-developer", desc: "Implement a track end-to-end" },
      { name: "kf-implement", desc: "Execute individual tasks from a plan" },
      { name: "kf-conflict-resolver", desc: "Resolve git merge conflicts" },
      { name: "kf-revert", desc: "Undo by track, phase, or task" },
    ],
  },
  {
    title: "Review & Quality",
    icon: <Search className="w-5 h-5 text-amber-400" />,
    skills: [
      { name: "kf-reviewer", desc: "Review PRs against track specs" },
      { name: "kf-validate", desc: "Validate project artifact consistency" },
      { name: "kf-data-guardian", desc: "Data integrity guard (embedded)" },
    ],
  },
  {
    title: "Management & Reporting",
    icon: <BarChart3 className="w-5 h-5 text-rose-400" />,
    skills: [
      { name: "kf-status", desc: "Project status with dependency ordering" },
      { name: "kf-manage", desc: "Archive, restore, delete, rename tracks" },
      { name: "kf-report", desc: "Timeline, velocity, and cost reports" },
      { name: "kf-bulk-archive", desc: "Archive all completed tracks" },
      { name: "kf-compact-archive", desc: "Clean up archived track directories" },
    ],
  },
  {
    title: "Advisors & Repair",
    icon: <Wrench className="w-5 h-5 text-purple-400" />,
    skills: [
      { name: "kf-advisor-product", desc: "Product strategy and competitive analysis" },
      { name: "kf-advisor-reliability", desc: "Codebase reliability audit" },
      { name: "kf-repair", desc: "System integrity audit and repair" },
    ],
  },
];

export default function SkillsPage() {
  const [platform, setPlatform] = useState<Platform>("unix");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-neutral-800 selection:text-white flex flex-col">
      {/* Background Grid */}
      <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/kf_logo.webp" alt="Kiloforge Logo" width={32} height={32} className="rounded-md shadow-lg" />
            <span className="font-semibold text-lg tracking-tight">Kiloforge</span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto flex-1 w-full">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-16">
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>No additional software required</span>
          </motion.div>
          <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Kiloforge{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Skills</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            22 Claude Code skills that turn your terminal into an AI-powered development platform.
            The same skills used to build Kiloforge itself — from a blank repo to 80,000+ lines of code in 5 days.
          </motion.p>
        </motion.div>

        {/* Install Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-24">
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Install</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Requires{" "}
              <a href="https://docs.anthropic.com/en/docs/claude-code/overview" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                Claude Code
              </a>{" "}
              and{" "}
              <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                git
              </a>
              .
            </p>

            {/* Platform Tabs */}
            <div className="flex items-center gap-1 mb-4 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
              {(["unix", "windows"] as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    platform === p
                      ? "bg-white/10 text-white border border-white/15 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                  }`}
                >
                  {platformMeta[p].icon}
                  <span>{platformMeta[p].label}</span>
                </button>
              ))}
            </div>

            {/* Command */}
            <div className="relative group">
              <pre className="glass-panel px-6 py-4 pr-14 rounded-xl flex items-center gap-3 text-sm font-mono text-neutral-300 border border-white/10 shadow-2xl overflow-hidden">
                <span className="text-emerald-400 shrink-0">{platform === "windows" ? ">" : "$"}</span>
                <span className="whitespace-nowrap overflow-x-auto">{installCommands[platform]}</span>
              </pre>
              <div className="absolute right-12 top-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/[0.04] pointer-events-none rounded-r-xl" />
              <button
                onClick={() => copyToClipboard(installCommands[platform])}
                className="absolute right-0 top-0 bottom-0 flex items-center px-3 rounded-r-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-all border-l border-white/10"
                aria-label="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied to clipboard</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* How it Works — Core Workflow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-24"
        >
          <motion.div variants={fadeIn} className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it Works</h2>
          </motion.div>
          <motion.p variants={fadeIn} className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">
            Four skills form the core workflow. Everything else is supporting infrastructure.
          </motion.p>

          <div className="space-y-4">
            {workflowSteps.map((step, i) => {
              const c = colorMap[step.color];
              return (
                <motion.div key={step.number} variants={fadeIn}>
                  <div className={`glass-panel p-6 md:p-8 rounded-2xl border ${c.border} hover:bg-white/[0.02] transition-colors relative overflow-hidden`}>
                    {/* Step connector line */}
                    {i < workflowSteps.length - 1 && (
                      <div className="absolute bottom-0 left-[2.75rem] md:left-[3.25rem] w-px h-4 bg-gradient-to-b from-white/10 to-transparent translate-y-full z-10 hidden md:block" />
                    )}

                    <div className="flex items-start gap-5">
                      {/* Icon */}
                      <div className={`${c.bg} p-3 rounded-xl ${c.text} shrink-0 ring-1 ${c.ring}`}>
                        {step.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>
                            Step {step.number}
                          </span>
                          <h3 className="text-lg font-bold">{step.title}</h3>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-3">
                          {step.description}
                        </p>
                        <code className={`inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm ${c.text} font-mono`}>
                          {step.command}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {i < workflowSteps.length - 1 && (
                    <div className="flex justify-center py-1 text-white/10">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Context callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-24"
        >
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3">Skills-only or full platform</h3>
              <p className="text-neutral-400 leading-relaxed max-w-3xl">
                These skills work standalone in any Claude Code session — this is exactly how Kiloforge itself was built.
                For teams scaling to many parallel agents, the full{" "}
                <Link href="/" className="text-emerald-400 hover:underline">Kiloforge platform</Link>{" "}
                adds a local control plane (Cortex), a real-time dashboard (Command Deck), and agent lifecycle management
                to handle the coordination problems that emerge at scale.
              </p>
            </div>
          </div>
        </motion.div>

        {/* All Skills Reference */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2 variants={fadeIn} className="text-2xl font-bold tracking-tight mb-8">
            All Skills
          </motion.h2>

          <div className="space-y-6">
            {skillCategories.map((cat) => (
              <motion.div
                key={cat.title}
                variants={fadeIn}
                className="glass-panel rounded-2xl border border-white/5 overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  {cat.icon}
                  <h3 className="font-semibold text-sm">{cat.title}</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="px-6 py-3.5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                      <code className="text-emerald-400 text-sm font-mono shrink-0 pt-0.5">/{skill.name}</code>
                      <p className="text-sm text-neutral-400">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Update & Uninstall */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mt-16"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <h3 className="font-semibold mb-2">Update</h3>
              <p className="text-sm text-neutral-400">
                Re-run the install command to pull the latest skills. Existing skills are overwritten with updated versions.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <h3 className="font-semibold mb-2">Uninstall</h3>
              <p className="text-sm text-neutral-400">
                Remove the skill directories:{" "}
                <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">rm -rf ~/.claude/skills/kf-*</code>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-sm text-neutral-500 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <Image src="/kf_logo.webp" alt="Kiloforge Logo" width={24} height={24} className="rounded" />
              <span>&copy; 2026 Ben Baldivia. All rights reserved.</span>
            </div>
            <span className="text-neutral-600 text-xs ml-8">
              Created by{" "}
              <a href="https://blog.dev-kat.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                Ben Baldivia
              </a>
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="https://github.com/Kiloforge/kiloforge-skills" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <Link href="/license/" className="hover:text-white transition-colors">License</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
