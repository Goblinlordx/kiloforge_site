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
  Settings,
  ListChecks,
  Play,
  Cpu,
  Network,
} from "lucide-react";

type Platform = "unix" | "windows";
type Mode = "single" | "multi" | "processor";
type AgentTool = "claude" | "opencode" | "amp" | "codex" | "antigravity";

const agentToolMeta: Record<AgentTool, { label: string; skillsDir: Record<Platform, string>; docUrl: string }> = {
  claude: {
    label: "Claude Code",
    skillsDir: { unix: "~/.claude/skills/", windows: "$HOME\\.claude\\skills\\" },
    docUrl: "https://docs.anthropic.com/en/docs/claude-code/overview",
  },
  opencode: {
    label: "OpenCode",
    skillsDir: { unix: "~/.config/opencode/skills/", windows: "$HOME\\.config\\opencode\\skills\\" },
    docUrl: "https://github.com/opencode-ai/opencode",
  },
  amp: {
    label: "Amp",
    skillsDir: { unix: "~/.config/amp/skills/", windows: "$HOME\\.config\\amp\\skills\\" },
    docUrl: "https://ampcode.com",
  },
  codex: {
    label: "Codex",
    skillsDir: { unix: "~/.agents/skills/", windows: "$HOME\\.agents\\skills\\" },
    docUrl: "https://github.com/openai/codex",
  },
  antigravity: {
    label: "Antigravity",
    skillsDir: { unix: "~/.gemini/antigravity/skills/", windows: "$HOME\\.gemini\\antigravity\\skills\\" },
    docUrl: "https://github.com/AidenYuanDev/antigravity",
  },
};

function getInstallCommand(_agent: AgentTool, platform: Platform): string {
  if (platform === "unix") {
    return `curl -fsSL https://raw.githubusercontent.com/Kiloforge/kiloforge-skills/main/install.sh | sh`;
  }
  return `irm https://raw.githubusercontent.com/Kiloforge/kiloforge-skills/main/install.ps1 | iex`;
}

const platformMeta: Record<Platform, { icon: React.ReactNode; label: string }> = {
  unix: { icon: <TerminalSquare className="w-4 h-4" />, label: "macOS / Linux" },
  windows: { icon: <Monitor className="w-4 h-4" />, label: "Windows" },
};

const modeMeta: Record<Mode, { label: string; icon: React.ReactNode }> = {
  single: { label: "Single-Threaded", icon: <Play className="w-4 h-4" /> },
  multi: { label: "Multi-Threaded", icon: <Network className="w-4 h-4" /> },
  processor: { label: "Multi-Processor", icon: <Cpu className="w-4 h-4" /> },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const colorMap: Record<string, { bg: string; text: string; border: string; ring: string; dot: string }> = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", ring: "ring-emerald-500/30", dot: "bg-emerald-400" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", ring: "ring-cyan-500/30", dot: "bg-cyan-400" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", ring: "ring-amber-500/30", dot: "bg-amber-400" },
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20", ring: "ring-indigo-500/30", dot: "bg-indigo-400" },
};

/* ── Flow diagram data ────────────────────────────────────────────────── */

const flowNodes = [
  { id: "setup", label: "Setup", command: "/kf-setup", color: "emerald", icon: <Settings className="w-5 h-5" />, optional: false },
  { id: "architect", label: "Architect", command: "/kf-architect", color: "cyan", icon: <Layers className="w-5 h-5" />, optional: false },
  { id: "status", label: "Status", command: "/kf-status", color: "amber", icon: <ListChecks className="w-5 h-5" />, optional: true },
  { id: "develop", label: "Develop", command: "/kf-developer", color: "indigo", icon: <Play className="w-5 h-5" />, optional: false },
];

/* ── Guidance content per mode ─────────────────────────────────────────── */

const singleThreadedSections = [
  {
    title: "Building Confidence",
    paragraphs: [
      "Start here. Run a single agent at a time — architect a track, then hand it to a developer. Watch what comes back.",
      "The goal is not to produce output at maximum speed. It is to understand the process and to build a calibrated sense of what agents produce given a well-scoped specification. When the architect writes a track with clear acceptance criteria and a phased plan, the developer follows it closely. You will find that the alignment between intent and implementation is higher than you expect. That confidence is the foundation everything else is built on.",
      "As you build this intuition, pay attention to which kinds of work align well and which carry higher risk. Logic-heavy backend tasks — APIs, data models, business rules — tend to be highly predictable. Visual elements and UI work can drift further from expectations, especially when the spec describes aesthetics or layout nuance. Knowing where the risk sits lets you allocate your attention accordingly.",
      "To mitigate it, write more specific acceptance criteria for visual work — reference existing components, specify spacing values, name the design tokens. Provide screenshots or describe the exact layout you want. The tighter the visual spec, the closer the output. For structural code, the spec can be looser because the constraints are more naturally enforced by types, tests, and APIs.",
    ],
  },
  {
    title: "Work at the Decision Layer",
    paragraphs: [
      "At the rate you can instantiate new implementations, shipping code to some remote to run a CI process there makes no sense — ship it when you have time to ramp down and address issues en masse. The throughput can be far higher than any remote review pipeline can handle.",
      "Your time is too valuable to spend at the wide end of the funnel, sifting through every change. Instead, work at the narrow end — where decisions have leverage. Determine which changes matter. Prune out the noise. Identify what actually delivers value to your users.",
      "Kiloforge is not trying to be the best interface for chatting with a single agent — the CLI already does that well. It is designed to let you set individual agent sessions aside and focus on the high-level decisions that, presumably, only you can make.",
    ],
  },
];

const multiThreadedSections = [
  {
    title: "Don't Become the Bottleneck",
    paragraphs: [
      "On every team — even small ones — implementation drift accumulates over time. Policies change. Architectural decisions get revised. Engineers make mistakes, and the result is what we politely call \"legacy\" code. This is normal.",
      "What matters is whether the rate of mistakes is low enough that the cost of fixing them later is less than the cost of you reviewing every line in real time. That is the bet you are making: that the agents produce sufficiently reliable output that your time is better spent deciding what to build next than inspecting what was just built.",
      "If you try to double-check every agent's work and demand perfection before moving on, you become the bottleneck — and the entire value proposition collapses.",
    ],
  },
  {
    title: "Automate Validation Ruthlessly",
    paragraphs: [
      "The cost of validating by hand is too high. Every opportunity you have to automate a check, take it.",
      "Reliable, performant automated tests are what make the entire model work — they are the mechanism that keeps agent output trustworthy without requiring your eyes on every change. If you find yourself manually verifying something an agent produced, that is a signal: build a test for it.",
      "Even having an agent run manual validation steps slows things down. Instead, direct your effort toward building out the test infrastructure so that verification happens automatically as part of the implementation cycle. The things you validate by hand today should become the automated checks of tomorrow.",
      "This compounds — every test you add raises the floor of reliability for all future work.",
    ],
  },
  {
    title: "When Things Drift",
    paragraphs: [
      "They will. And that is fine.",
      "When you notice structural misalignment in the project — increased interdependency, patterns diverging from conventions, accumulated inconsistencies — don't get dragged into fixing details by hand. Instead, treat it as a planning problem.",
      "Use the architect to scope tracks that address the drift at scale. Add guidelines to your project specifications so future tracks account for the new direction. Run large-scale audits with advisors and ask for the output as actionable items — then feed those items back into the architect to generate corrective tracks.",
      "You are managing a system, not editing files.",
    ],
  },
];

const multiProcessorSections = [
  {
    title: "You Will Find Some Limit",
    paragraphs: [
      "At some point, you will hit a limit. Maybe it is the mental overhead of managing multiple instances. Maybe it is lock contention during merge serialization. There will be a limit.",
      "For me, it was the mental overhead of trying to keep everything in my head and manage it all at once. The skills are already set up to surface that information — helping you avoid scheduling tracks with dependency ordering concerns, flagging which tracks are independent but carry a high risk of merge conflicts.",
      "At some point though, it is just too much. These were the types of problems Kiloforge was designed to address.",
    ],
  },
  {
    title: "Scaling Beyond What You Can Hold in Your Head",
    paragraphs: [
      "Kiloforge exists to let you manage more than you could without it. Surfacing meaningful information at a glance or with a hover. Giving you timelines on every track that gets implemented.",
      "Letting you access the agent that implemented a specific track and question it about the decisions it made, so you can better control the high-level information you assess. Letting you see which tracks have been significantly slower than others and leverage that information to make the process better.",
      "It is all about scaling further — being able to access even the smallest details in a way that feels difficult without the tooling.",
    ],
  },
  {
    title: "Why This Exists",
    paragraphs: [
      "There could always be another way to accomplish this goal. This just happened to be the one I chose.",
      "Don't get too turned away by the lighthearted mask I've put over things — it was intentional. I've had an incredibly enjoyable time seeing how far I can push the limits. I think they can go so much further. We can go so much further.",
      "I believe engineers can have a more enjoyable time doing what they do than could have ever been possible before. It might look like something many people will turn away from. But I believe it was designed to drive some serious value.",
    ],
  },
];


/* ── Flow Diagram Component ───────────────────────────────────────────── */

function WorkflowFlow() {
  return (
    <div className="mb-12">
      {/* Desktop: horizontal flow */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Main flow row */}
          <div className="flex items-center justify-center gap-0">
            {flowNodes.map((node, i) => {
              const c = colorMap[node.color];
              return (
                <div key={node.id} className="flex items-center">
                  {/* Node */}
                  <div
                    className={`relative flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border ${
                      node.optional
                        ? "border-dashed border-white/10 opacity-60"
                        : `${c.border} border-solid`
                    } ${c.bg} transition-all min-w-[120px]`}
                  >
                    <div className={`${c.text}`}>{node.icon}</div>
                    <span className="text-sm font-semibold text-white">{node.label}</span>
                    <code className={`text-xs font-mono ${c.text}`}>{node.command}</code>
                    {node.optional && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-neutral-500 bg-[#0a0a0a] px-2 rounded-full border border-white/5">
                        optional
                      </span>
                    )}
                  </div>

                  {/* Arrow between nodes */}
                  {i < flowNodes.length - 1 && (
                    <div className="flex items-center px-2 text-white/50">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bypass arrow: Architect → Develop (skipping Status) */}
          <div className="flex justify-center mt-3">
            <div className="relative flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/5 border border-dashed border-cyan-500/20">
              <span className="text-xs text-cyan-400 font-medium">Architect</span>
              <ArrowRight className="w-3 h-3 text-cyan-400/60" />
              <span className="text-xs text-indigo-400 font-medium">Develop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: vertical flow */}
      <div className="md:hidden space-y-2">
        {flowNodes.map((node, i) => {
          const c = colorMap[node.color];
          return (
            <div key={node.id}>
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-xl border ${
                  node.optional
                    ? "border-dashed border-white/10 opacity-60"
                    : `${c.border} border-solid`
                } ${c.bg} relative`}
              >
                <div className={`${c.text} shrink-0`}>{node.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{node.label}</span>
                    {node.optional && (
                      <span className="text-[10px] font-medium text-neutral-500 bg-white/5 px-1.5 py-0.5 rounded-full">
                        optional
                      </span>
                    )}
                  </div>
                  <code className={`text-xs font-mono ${c.text}`}>{node.command}</code>
                </div>
              </div>

              {/* Arrow or bypass indicator */}
              {i < flowNodes.length - 1 && (
                <div className="flex items-center justify-center py-1">
                  {i === 1 ? (
                    /* After Architect: show both paths */
                    <div className="flex flex-col items-center gap-0.5">
                      <ArrowRight className="w-3 h-3 rotate-90 text-white/40" />
                      <span className="text-[10px] text-cyan-400/60">or skip to Develop</span>
                    </div>
                  ) : (
                    <ArrowRight className="w-3 h-3 rotate-90 text-white/40" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────────────── */

export default function SkillsPage() {
  const [platform, setPlatform] = useState<Platform>("unix");
  const [agentTool, setAgentTool] = useState<AgentTool>("claude");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<Mode>("single");

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
          <Link href="/index.html" className="flex items-center gap-3">
            <Image src="/kf_logo.webp" alt="Kiloforge Logo" width={32} height={32} className="rounded-md shadow-lg" />
            <span className="font-semibold text-lg tracking-tight">Kiloforge</span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
            <Link href="/index.html" className="hover:text-white transition-colors flex items-center gap-2">
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
            16 skills that turn your terminal into an AI-powered development platform.
            Works with Claude Code, OpenCode, Amp, Codex, and Antigravity.
            The same skills used to build Kiloforge itself — from a blank repo to 80,000+ lines of code in 5 days.
          </motion.p>
        </motion.div>

        {/* Install Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-24">
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Install</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Requires{" "}
              <a href={agentToolMeta[agentTool].docUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                {agentToolMeta[agentTool].label}
              </a>{" "}
              and{" "}
              <a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                git
              </a>
              .
            </p>

            {/* Agent Tool Selector */}
            <div className="mb-4">
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 block">Agent Tool</label>
              <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
                {(["claude", "opencode", "amp", "codex", "antigravity"] as AgentTool[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAgentTool(a)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      agentTool === a
                        ? "bg-white/10 text-white border border-white/15 shadow-sm"
                        : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                    }`}
                  >
                    <span>{agentToolMeta[a].label}</span>
                  </button>
                ))}
              </div>
              {(agentTool === "opencode" || agentTool === "amp") && (
                <p className="text-xs text-neutral-500 mt-2">
                  {agentToolMeta[agentTool].label} also reads from <code className="text-emerald-400/70 font-mono">~/.claude/skills/</code>
                </p>
              )}
            </div>

            {/* Platform Tabs */}
            <div className="mb-4">
              <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 block">Platform</label>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
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
            </div>

            {/* Command */}
            <div className="relative group">
              <pre className="glass-panel px-6 py-4 pr-14 rounded-xl flex items-center gap-3 text-sm font-mono text-neutral-300 border border-white/10 shadow-2xl overflow-hidden">
                <span className="text-emerald-400 shrink-0">{platform === "windows" ? ">" : "$"}</span>
                <span className="whitespace-nowrap overflow-x-auto">{getInstallCommand(agentTool, platform)}</span>
              </pre>
              <div className="absolute right-12 top-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/[0.04] pointer-events-none rounded-r-xl" />
              <button
                onClick={() => copyToClipboard(getInstallCommand(agentTool, platform))}
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

        {/* ── Become a Kiloforger ─────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-24"
        >
          <motion.div variants={fadeIn} className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Become a{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Kiloforger
              </span>
            </h2>
          </motion.div>
          <motion.p variants={fadeIn} className="text-neutral-400 text-center max-w-2xl mx-auto mb-10">
            The skills are the same — how you use them changes as you scale.
            Start single-threaded to learn the process, then level up.
          </motion.p>

          {/* Mode Selector */}
          <motion.div variants={fadeIn} className="flex justify-center mb-10">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
              {(["single", "multi", "processor"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    mode === m
                      ? "bg-white/10 text-white border border-white/15 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-200 border border-transparent"
                  }`}
                >
                  {modeMeta[m].icon}
                  <span className="hidden sm:inline">{modeMeta[m].label}</span>
                  <span className="sm:hidden">{modeMeta[m].label.split("-")[0]}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Mode Content */}
          <AnimatePresence mode="wait">
            {mode === "single" && (
              <motion.div
                key="single"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {/* Flow Diagram */}
                <WorkflowFlow />

                {/* Getting Started */}
                <div className="glass-panel p-6 md:p-8 rounded-2xl border border-emerald-500/20 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-3 text-white">Getting Started</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                      One terminal. One agent at a time. This is your training ground.
                    </p>
                    <ol className="space-y-3 text-sm text-neutral-300">
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 font-bold shrink-0">1.</span>
                        <span>Install the skills (see above) and clone the repo you want to work on.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 font-bold shrink-0">2.</span>
                        <div>
                          Start Claude Code with permissions bypassed so the agent can work uninterrupted:
                          <code className="block mt-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-emerald-400 font-mono text-xs">
                            claude --dangerously-skip-permissions
                          </code>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 font-bold shrink-0">3.</span>
                        <span>
                          Run <code className="text-cyan-400 font-mono text-xs">/kf-setup</code> to initialize your project, then{" "}
                          <code className="text-cyan-400 font-mono text-xs">/kf-architect</code> to create your first track.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 font-bold shrink-0">4.</span>
                        <span>
                          Hand the track to{" "}
                          <code className="text-cyan-400 font-mono text-xs">/kf-developer &lt;track-id&gt;</code> and watch the implementation unfold.
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Guidance Sections */}
                <div className="space-y-6">
                  {singleThreadedSections.map((section) => (
                    <div
                      key={section.title}
                      className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
                    >
                      <h3 className="text-lg font-bold mb-3 text-white">{section.title}</h3>
                      <div className="space-y-3">
                        {section.paragraphs.map((p, i) => (
                          <p key={i} className="text-sm text-neutral-400 leading-relaxed">{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {mode === "multi" && (
              <motion.div
                key="multi"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {/* Getting Started with Worktrees */}
                <div className="glass-panel p-6 md:p-8 rounded-2xl border border-cyan-500/20 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-3 text-white">Working with Worktrees</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                      Multiple agents need isolated working directories. Git worktrees let each agent
                      have its own checkout of the same repo without interfering with others.
                    </p>
                    <ol className="space-y-3 text-sm text-neutral-300">
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 font-bold shrink-0">1.</span>
                        <div>
                          Clone the repo as a bare repository inside a dedicated folder:
                          <div className="mt-1.5 space-y-1">
                            <code className="block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs">
                              mkdir my-project-wt && cd my-project-wt
                            </code>
                            <code className="block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs">
                              git clone --bare &lt;repo-url&gt; .git
                            </code>
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 font-bold shrink-0">2.</span>
                        <div>
                          Create worktrees for each agent — one architect, multiple developers:
                          <div className="mt-1.5 space-y-1">
                            <code className="block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs">
                              git worktree add ./architect-1 -b architect-1
                            </code>
                            <code className="block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs">
                              git worktree add ./worker-1 -b worker-1
                            </code>
                            <code className="block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs">
                              git worktree add ./worker-2 -b worker-2
                            </code>
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 font-bold shrink-0">3.</span>
                        <div>
                          Start a Claude Code session in each worktree with permissions bypassed:
                          <code className="block mt-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs">
                            cd worker-1 && claude --dangerously-skip-permissions
                          </code>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-400 font-bold shrink-0">4.</span>
                        <span>
                          Use <code className="text-emerald-400 font-mono text-xs">/kf-architect</code> in the architect worktree to plan tracks.
                          Use <code className="text-emerald-400 font-mono text-xs">/kf-developer &lt;track-id&gt;</code> in each worker to implement them in parallel.
                          Agents coordinate through the shared git history — the merge protocol handles contention.
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Multi-threaded Guidance Sections */}
                <div className="space-y-6">
                  {multiThreadedSections.map((section) => (
                    <div
                      key={section.title}
                      className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
                    >
                      <h3 className="text-lg font-bold mb-3 text-white">{section.title}</h3>
                      <div className="space-y-3">
                        {section.paragraphs.map((p, i) => (
                          <p key={i} className="text-sm text-neutral-400 leading-relaxed">{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {mode === "processor" && (
              <motion.div
                key="processor"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  {multiProcessorSections.map((section) => (
                    <div
                      key={section.title}
                      className="glass-panel p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
                    >
                      <h3 className="text-lg font-bold mb-3 text-white">{section.title}</h3>
                      <div className="space-y-3">
                        {section.paragraphs.map((p, i) => (
                          <p key={i} className="text-sm text-neutral-400 leading-relaxed">{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
                These skills work standalone in any supported agent session — this is exactly how Kiloforge itself was built.
                For teams scaling to many parallel agents, the full{" "}
                <Link href="/index.html" className="text-emerald-400 hover:underline">Kiloforge platform</Link>{" "}
                adds a local control plane (Cortex), a real-time dashboard (Command Deck), and agent lifecycle management
                to handle the coordination problems that emerge at scale.
              </p>
            </div>
          </div>
        </motion.div>

        {/* All Skills Link */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Link
            href="/skills/catalog/index.html"
            className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all flex items-center justify-between group"
          >
            <div>
              <h3 className="font-semibold text-white mb-1">Browse all 16 skills</h3>
              <p className="text-sm text-neutral-400">
                Full reference for every skill — getting started, architecture, development, quality, management, and tooling.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 ml-4" />
          </Link>
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
            <Link href="/index.html" className="hover:text-white transition-colors">Home</Link>
            <a href="https://github.com/Kiloforge/kiloforge-skills" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <Link href="/license/index.html" className="hover:text-white transition-colors">License</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
