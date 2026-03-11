import { Metadata } from "next";
import { ArrowLeft, ExternalLink, GitBranch, Code2, LayoutDashboard, TerminalSquare, Activity, Puzzle, TestTube, FileText, Shield, Gauge, Clock, Zap, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Status Report | Kiloforge",
  description:
    "Kiloforge: built in 5 days with 1,552 commits, 348 tracks, and 81K SLOC. From conception to alpha deployment — a full project and product audit.",
  openGraph: {
    title: "Kiloforge Status Report — Conception to Alpha",
    description:
      "Built in 5 days. 1,552 commits. 348 tracks. 81K SLOC. ~$200 actual cost vs ~$680K median estimate. Full project report and product audit.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiloforge Status Report — Conception to Alpha",
    description:
      "Built in 5 days. 1,552 commits. 348 tracks. 81K SLOC. ~$200 actual cost vs ~$680K median estimate.",
  },
};

/* ── Hero stats (from kf-report) ── */

const heroStats = [
  { value: "5", label: "Days", sub: "calendar & active" },
  { value: "1,552", label: "Commits", sub: "total" },
  { value: "~348", label: "Tracks", sub: "lifetime" },
  { value: "81K", label: "SLOC", sub: "functional code" },
];

const dailyActivity = [
  { date: "Mar 7", day: "Sat", commits: 95, tracks: 14, label: "Bootstrap & Architecture", barPct: 17 },
  { date: "Mar 8", day: "Sun", commits: 292, tracks: 58, label: "Dashboard & Core Features", barPct: 52 },
  { date: "Mar 9", day: "Mon", commits: 317, tracks: 76, label: "Feature Blitz & E2E Testing", barPct: 57 },
  { date: "Mar 10", day: "Tue", commits: 560, tracks: 126, label: "Parallel Scaling & Polish", barPct: 100 },
  { date: "Mar 11", day: "Wed", commits: 288, tracks: 74, label: "Hardening & Release Prep", barPct: 51 },
];

const velocityStats = [
  { label: "Commits/day (avg)", value: "~310" },
  { label: "Peak commits/day", value: "560" },
  { label: "Week 10 track rate", value: "~36/day" },
  { label: "Week 11 track rate", value: "~92/day" },
  { label: "Week-over-week speedup", value: "2.6x" },
  { label: "Peak tracks/day", value: "126" },
];

const slocBreakdown = [
  { lang: "Go", sloc: "39,652", pct: 49, color: "bg-cyan-400" },
  { lang: "TypeScript", sloc: "21,170", pct: 26, color: "bg-indigo-400" },
  { lang: "CSS", sloc: "6,636", pct: 8, color: "bg-rose-400" },
  { lang: "Markdown", sloc: "8,968", pct: 11, color: "bg-amber-400" },
  { lang: "YAML/Shell/Make", sloc: "4,144", pct: 5, color: "bg-emerald-400" },
  { lang: "SQL/Other", sloc: "489", pct: 1, color: "bg-neutral-400" },
];

const costComparison = [
  { model: "COCOMO", mid: "$2.73M" },
  { model: "Function Point", mid: "$351K" },
  { model: "Parametric (SLOC)", mid: "$760K" },
  { model: "Effort by Analogy", mid: "$600K" },
];

/* ── Product audit data ── */

const productSnapshot = [
  { label: "Go SLOC (hand-written)", value: "~20,000" },
  { label: "Go Test SLOC", value: "~19,300" },
  { label: "Go Test Files", value: "93" },
  { label: "E2E Test Specs", value: "21" },
  { label: "API Operations", value: "49" },
  { label: "SSE Event Types", value: "11+" },
  { label: "Core Services", value: "12" },
  { label: "Port Interfaces", value: "20" },
  { label: "Dashboard Pages", value: "5" },
  { label: "Frontend Components", value: "~63" },
  { label: "Frontend Hooks", value: "28" },
  { label: "Embedded Skills", value: "15" },
];

const strengths = [
  { title: "Exceptional Test Coverage", description: "1:1 test-to-source ratio (19K test SLOC vs 20K source SLOC), 21 E2E specs, 93 Go test files.", color: "emerald" },
  { title: "Clean Architecture", description: "Strict port/adapter pattern, 12 services with clean separation, zero TODOs in source.", color: "cyan" },
  { title: "Schema-First API", description: "OpenAPI 3.1 + AsyncAPI 3.0, code generation pipeline, verification in CI.", color: "indigo" },
  { title: "Comprehensive Real-Time System", description: "11+ SSE event types, WebSocket for agent interaction, live dashboard updates.", color: "amber" },
  { title: "Mature CI/CD", description: "Lint, test, deps verification, codegen verification across Go + frontend.", color: "rose" },
  { title: "Robust Orchestration", description: "Dependency-aware work queue, merge lock with dual-mode (HTTP/mkdir), OpenTelemetry tracing.", color: "blue" },
];

const colorMap: Record<string, { border: string; dot: string; text: string }> = {
  emerald: { border: "border-emerald-500/20", dot: "bg-emerald-400", text: "text-emerald-400" },
  cyan: { border: "border-cyan-500/20", dot: "bg-cyan-400", text: "text-cyan-400" },
  indigo: { border: "border-indigo-500/20", dot: "bg-indigo-400", text: "text-indigo-400" },
  amber: { border: "border-amber-500/20", dot: "bg-amber-400", text: "text-amber-400" },
  rose: { border: "border-rose-500/20", dot: "bg-rose-400", text: "text-rose-400" },
  blue: { border: "border-blue-500/20", dot: "bg-blue-400", text: "text-blue-400" },
};

const cliCommands = [
  { cmd: "init", cat: "Lifecycle", maturity: 5, note: "First-time setup with prereq checks, Docker compose, Gitea provisioning" },
  { cmd: "up", cat: "Lifecycle", maturity: 5, note: "Daily start with health checks" },
  { cmd: "down", cat: "Lifecycle", maturity: 5, note: "Clean shutdown" },
  { cmd: "destroy", cat: "Lifecycle", maturity: 4, note: "Nuclear reset" },
  { cmd: "status", cat: "Lifecycle", maturity: 5, note: "System health, Gitea status, running agents" },
  { cmd: "version", cat: "Lifecycle", maturity: 4, note: "VCS stamping with worktree support" },
  { cmd: "add", cat: "Projects", maturity: 4, note: "Register project, mirror to Gitea, set up webhooks" },
  { cmd: "projects", cat: "Projects", maturity: 4, note: "List registered projects" },
  { cmd: "push", cat: "Projects", maturity: 4, note: "Push to Gitea mirror" },
  { cmd: "sync", cat: "Projects", maturity: 4, note: "Git sync with origin" },
  { cmd: "agents", cat: "Agents", maturity: 4, note: "List active/recent agents" },
  { cmd: "logs", cat: "Agents", maturity: 4, note: "Stream agent logs" },
  { cmd: "stop", cat: "Agents", maturity: 4, note: "Stop running agent" },
  { cmd: "attach", cat: "Agents", maturity: 5, note: "WebSocket terminal attachment" },
  { cmd: "escalated", cat: "Agents", maturity: 3, note: "List escalated agents" },
  { cmd: "cost", cat: "Agents", maturity: 4, note: "Token usage and cost tracking" },
  { cmd: "implement", cat: "Orchestration", maturity: 4, note: "Spawn agent to implement a track" },
  { cmd: "pool", cat: "Orchestration", maturity: 4, note: "Worker pool management" },
  { cmd: "dashboard", cat: "Orchestration", maturity: 5, note: "Opens dashboard in browser" },
  { cmd: "serve", cat: "Orchestration", maturity: 5, note: "Start REST API server" },
  { cmd: "skills", cat: "Skills", maturity: 4, note: "Skill management" },
];

const apiCategories = [
  { name: "System", endpoints: 5, maturity: 5, note: "Health, preflight, config, status, SSH keys" },
  { name: "Agents", endpoints: 8, maturity: 4, note: "List, spawn, get, delete, log, stop, resume, consent" },
  { name: "Projects", endpoints: 12, maturity: 4, note: "Full CRUD + sync, diff, branches, metadata" },
  { name: "Tracks", endpoints: 4, maturity: 4, note: "List, generate, get, delete" },
  { name: "Board", endpoints: 3, maturity: 4, note: "Kanban: get, move card, sync" },
  { name: "Queue", endpoints: 4, maturity: 4, note: "Dependency-aware scheduling" },
  { name: "Locks", endpoints: 4, maturity: 5, note: "TTL + heartbeat pattern" },
  { name: "Traces", endpoints: 2, maturity: 3, note: "List and get spans" },
  { name: "Skills", endpoints: 2, maturity: 3, note: "Status and update" },
  { name: "Consent", endpoints: 2, maturity: 3, note: "Agent permission consent" },
  { name: "Admin", endpoints: 1, maturity: 3, note: "Run operations" },
  { name: "Quota", endpoints: 1, maturity: 4, note: "Token/cost aggregation" },
];

const gapSummary = [
  { severity: "Critical", count: 2, color: "text-red-400" },
  { severity: "High", count: 12, color: "text-amber-400" },
  { severity: "Medium", count: 16, color: "text-yellow-400" },
  { severity: "Low", count: 9, color: "text-neutral-400" },
];

const roadmapTiers = [
  {
    tier: "Tier 1: Immediate",
    timeframe: "Next 1-2 weeks",
    effort: "7-12 tracks",
    items: ["API pagination + filtering", "E2E tests in CI", "API docs from OpenAPI", "Shell completions", "Agent timeout enforcement", "CLI --json output"],
  },
  {
    tier: "Tier 2: Near-Term",
    timeframe: "Weeks 3-6",
    effort: "15-25 tracks",
    items: ["Notification system", "Webhook extensibility", "Agent retry/recovery", "Keyboard shortcuts", "Enhanced TrackDetail", "User guide"],
  },
  {
    tier: "Tier 3: Strategic",
    timeframe: "Weeks 7+",
    effort: "30-60 tracks",
    items: ["Dynamic skill loading", "Agent analytics", "GitHub forge support", "Multi-user support", "TUI mode"],
  },
];

function MaturityDots({ level }: { level: number }) {
  return (
    <div className="flex gap-1" title={`${level}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${i <= level ? "bg-emerald-400" : "bg-white/10"}`} />
      ))}
    </div>
  );
}

function SectionHeading({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="p-3 glass-panel rounded-xl border border-white/10 shrink-0">{icon}</div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-neutral-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-neutral-800 selection:text-white flex flex-col">
      <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/kf_logo.webp" alt="Kiloforge Logo" width={32} height={32} className="rounded-md shadow-lg" />
            <span className="font-semibold text-lg tracking-tight">Kiloforge</span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <a href="https://github.com/kiloforge/kiloforge" target="_blank" rel="noopener noreferrer" className="text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/10">
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-24 px-6 max-w-5xl mx-auto flex-1 w-full">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Early Development &mdash; Conception to Alpha
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Status Report
          </h1>
          <p className="text-lg text-neutral-400 max-w-3xl leading-relaxed">
            A comprehensive report covering Kiloforge&apos;s journey from conception to alpha deployment in <span className="text-neutral-200 font-medium">5 days</span>. Includes project timeline, velocity metrics, SLOC analysis, cost estimates, and a full product audit of the CLI, REST API, Command Deck, and orchestration pipeline.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="https://github.com/kiloforge/kiloforge" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-neutral-300 bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
              <GitBranch className="w-4 h-4" />
              View on GitHub
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </a>
            <Link href="/report/full" className="inline-flex items-center gap-2 text-sm text-neutral-300 bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
              <FileText className="w-4 h-4" />
              Full Markdown Report
            </Link>
            <a href="https://github.com/kiloforge/kiloforge/blob/main/.agent/kf/_reports/2026-03-11-full-report.md" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-neutral-300 bg-white/5 border border-white/10 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
              <FileText className="w-4 h-4" />
              Source on GitHub
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </a>
          </div>
        </div>

        {/* ═══════════ PROJECT TIMELINE ═══════════ */}

        {/* Hero Stats */}
        <section className="mb-20">
          <SectionHeading
            icon={<Zap className="w-6 h-6 text-amber-400" />}
            title="At a Glance"
            subtitle="March 7-11, 2026 — solo developer + Claude Code agent swarm"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {heroStats.map((s) => (
              <div key={s.label} className="glass-panel rounded-xl p-6 border border-white/5 text-center hover:border-white/15 transition-colors">
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-1">{s.value}</div>
                <div className="text-sm text-neutral-300 font-medium">{s.label}</div>
                <div className="text-xs text-neutral-600 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Cost headline */}
          <div className="glass-panel rounded-xl p-6 border border-emerald-500/20 bg-emerald-500/[0.03]">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-neutral-400">Actual cost (AI-assisted)</div>
                  <div className="text-2xl font-bold text-emerald-400">~$200 &ndash; $500</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/10" />
              <div>
                <div className="text-sm text-neutral-400">Median industry estimate</div>
                <div className="text-2xl font-bold text-neutral-300">~$680,000</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/10" />
              <div>
                <div className="text-sm text-neutral-400">Efficiency factor</div>
                <div className="text-2xl font-bold text-cyan-400">~1,360x &ndash; 3,400x</div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Activity */}
        <section className="mb-20">
          <SectionHeading
            icon={<Clock className="w-6 h-6 text-cyan-400" />}
            title="Daily Activity"
            subtitle="5 days of accelerating velocity"
          />
          <div className="space-y-3">
            {dailyActivity.map((d) => (
              <div key={d.date} className="glass-panel rounded-xl p-5 border border-white/5 hover:border-white/15 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-mono text-neutral-300 w-14">{d.date}</span>
                    <span className="text-xs text-neutral-600 w-8">{d.day}</span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all" style={{ width: `${d.barPct}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 text-xs">
                    <span className="text-neutral-400"><span className="text-neutral-200 font-semibold">{d.commits}</span> commits</span>
                    <span className="text-neutral-400"><span className="text-emerald-400 font-semibold">{d.tracks}</span> tracks</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 sm:ml-[5.5rem]">{d.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Velocity */}
        <section className="mb-20">
          <SectionHeading
            icon={<TrendingUp className="w-6 h-6 text-emerald-400" />}
            title="Velocity Progression"
            subtitle="2.6x week-over-week speedup from parallel worktree swarm"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {velocityStats.map((v) => (
              <div key={v.label} className="glass-panel rounded-xl p-4 border border-white/5 hover:border-white/15 transition-colors">
                <div className="text-xl font-bold tracking-tight text-white mb-1">{v.value}</div>
                <div className="text-xs text-neutral-500">{v.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SLOC Breakdown */}
        <section className="mb-20">
          <SectionHeading
            icon={<Code2 className="w-6 h-6 text-indigo-400" />}
            title="Codebase Composition"
            subtitle="81,059 SLOC across 620 files"
          />
          <div className="glass-panel rounded-xl p-6 border border-white/5 mb-4">
            {/* Stacked bar */}
            <div className="flex rounded-lg overflow-hidden h-6 mb-6">
              {slocBreakdown.map((s) => (
                <div key={s.lang} className={`${s.color} transition-all`} style={{ width: `${s.pct}%` }} title={`${s.lang}: ${s.sloc} (${s.pct}%)`} />
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {slocBreakdown.map((s) => (
                <div key={s.lang} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-sm ${s.color} shrink-0`} />
                  <span className="text-sm text-neutral-300">{s.lang}</span>
                  <span className="text-xs text-neutral-600 ml-auto font-mono">{s.sloc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Estimates */}
        <section className="mb-20">
          <SectionHeading
            icon={<DollarSign className="w-6 h-6 text-emerald-400" />}
            title="Cost Estimates"
            subtitle="Cross-model range: $175K - $2.73M"
          />
          <div className="glass-panel rounded-xl border border-white/5 overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-neutral-500 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3">Model</th>
                    <th className="px-4 py-3">Mid Estimate</th>
                  </tr>
                </thead>
                <tbody>
                  {costComparison.map((c) => (
                    <tr key={c.model} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-2.5 text-neutral-300">{c.model}</td>
                      <td className="px-4 py-2.5 text-neutral-200 font-mono">{c.mid}</td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-500/[0.05]">
                    <td className="px-4 py-2.5 text-emerald-400 font-semibold">Actual (AI-assisted)</td>
                    <td className="px-4 py-2.5 text-emerald-400 font-mono font-bold">~$200 - $500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Estimates via COCOMO organic model, function point analysis (351 adjusted FPs), parametric SLOC-based ($75-150/hr), and effort by analogy. Median: ~$680K. Geometric mean: ~$764K.
          </p>
        </section>

        {/* ═══════════ PRODUCT AUDIT ═══════════ */}

        <div className="border-t border-white/10 pt-16 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Product Audit</h2>
          <p className="text-neutral-400">Feature inventory, maturity ratings, gap analysis, and roadmap</p>
        </div>

        {/* Product Snapshot */}
        <section className="mb-20">
          <SectionHeading
            icon={<Gauge className="w-6 h-6 text-cyan-400" />}
            title="Architecture Snapshot"
            subtitle="Key metrics at the alpha milestone"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {productSnapshot.map((item) => (
              <div key={item.label} className="glass-panel rounded-xl p-4 border border-white/5 hover:border-white/15 transition-colors">
                <div className="text-2xl font-bold tracking-tight text-white mb-1">{item.value}</div>
                <div className="text-xs text-neutral-500">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Strengths */}
        <section className="mb-20">
          <SectionHeading
            icon={<Shield className="w-6 h-6 text-emerald-400" />}
            title="Key Strengths"
            subtitle="What's working well"
          />
          <div className="grid md:grid-cols-2 gap-4">
            {strengths.map((s) => {
              const c = colorMap[s.color];
              return (
                <div key={s.title} className={`glass-panel rounded-xl p-6 border ${c.border} hover:bg-white/[0.02] transition-colors`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <h3 className={`font-semibold ${c.text}`}>{s.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CLI Commands */}
        <section className="mb-20">
          <SectionHeading
            icon={<TerminalSquare className="w-6 h-6 text-amber-400" />}
            title="CLI Commands"
            subtitle="21 commands, average maturity 4.3/5"
          />
          <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-neutral-500 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3">Command</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Maturity</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {cliCommands.map((c) => (
                    <tr key={c.cmd} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-2.5"><code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs">kf {c.cmd}</code></td>
                      <td className="px-4 py-2.5 text-neutral-400 text-xs">{c.cat}</td>
                      <td className="px-4 py-2.5"><MaturityDots level={c.maturity} /></td>
                      <td className="px-4 py-2.5 text-neutral-500 text-xs hidden sm:table-cell">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* REST API */}
        <section className="mb-20">
          <SectionHeading
            icon={<Code2 className="w-6 h-6 text-indigo-400" />}
            title="REST API"
            subtitle="49 operations across 43 paths — schema-first with OpenAPI 3.1"
          />
          <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-neutral-500 text-xs uppercase tracking-wider">
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Endpoints</th>
                    <th className="px-4 py-3">Maturity</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {apiCategories.map((a) => (
                    <tr key={a.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-2.5 font-medium text-neutral-200">{a.name}</td>
                      <td className="px-4 py-2.5 text-neutral-300 font-mono text-xs">{a.endpoints}</td>
                      <td className="px-4 py-2.5"><MaturityDots level={a.maturity} /></td>
                      <td className="px-4 py-2.5 text-neutral-500 text-xs hidden sm:table-cell">{a.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Dashboard */}
        <section className="mb-20">
          <SectionHeading
            icon={<LayoutDashboard className="w-6 h-6 text-rose-400" />}
            title="Command Deck Dashboard"
            subtitle="5 pages, 63 component files, 28 custom hooks — React 19 + TanStack Query"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "Overview", maturity: 5, desc: "Stats, AgentGrid, Projects, QueuePanel, Tracks, Traces — all with real-time SSE" },
              { name: "Agent History", maturity: 4, desc: "Filterable table with histogram visualization" },
              { name: "Agent Detail", maturity: 5, desc: "Metadata, DiffView, LogViewer, WebSocket terminal" },
              { name: "Project Page", maturity: 4, desc: "Kanban board, settings, and info tabs" },
              { name: "Track Detail", maturity: 3, desc: "Read-only spec/plan display" },
              { name: "Trace Page", maturity: 3, desc: "Span timeline visualization" },
            ].map((page) => (
              <div key={page.name} className="glass-panel rounded-xl p-5 border border-white/5 hover:border-white/15 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-neutral-200">{page.name}</h3>
                  <MaturityDots level={page.maturity} />
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">{page.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gap Analysis */}
        <section className="mb-20">
          <SectionHeading
            icon={<Activity className="w-6 h-6 text-red-400" />}
            title="Gap Analysis"
            subtitle="39 identified gaps across 9 categories"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {gapSummary.map((g) => (
              <div key={g.severity} className="glass-panel rounded-xl p-5 border border-white/5 text-center">
                <div className={`text-3xl font-bold ${g.color}`}>{g.count}</div>
                <div className="text-xs text-neutral-500 mt-1">{g.severity}</div>
              </div>
            ))}
          </div>
          <div className="glass-panel rounded-xl border border-white/5 p-6">
            <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">Critical Gaps</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-neutral-200 font-medium text-sm">No API pagination</p>
                  <p className="text-neutral-500 text-xs mt-0.5">All list endpoints return unbounded results. Will degrade with scale.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-neutral-200 font-medium text-sm">No notification system</p>
                  <p className="text-neutral-500 text-xs mt-0.5">No alerts when agents complete, fail, or escalate. Users must poll the dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-20">
          <SectionHeading
            icon={<Puzzle className="w-6 h-6 text-cyan-400" />}
            title="Prioritized Roadmap"
            subtitle="Three tiers from immediate to strategic"
          />
          <div className="space-y-6">
            {roadmapTiers.map((tier, tierIdx) => (
              <div key={tier.tier} className={`glass-panel rounded-xl p-6 border ${
                tierIdx === 0 ? "border-emerald-500/20" : tierIdx === 1 ? "border-cyan-500/20" : "border-white/5"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <h3 className={`font-bold text-lg ${
                    tierIdx === 0 ? "text-emerald-400" : tierIdx === 1 ? "text-cyan-400" : "text-neutral-300"
                  }`}>{tier.tier}</h3>
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span>{tier.timeframe}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600" />
                    <span>{tier.effort}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tier.items.map((item) => (
                    <span key={item} className="text-xs bg-white/5 border border-white/10 text-neutral-300 px-3 py-1.5 rounded-lg">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center glass-panel rounded-2xl p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Explore the Source</h2>
            <p className="text-neutral-400 max-w-xl mx-auto mb-8">
              Kiloforge is open source. Dive into the codebase, read the full report, or install and try it yourself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://github.com/kiloforge/kiloforge" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/25">
                <GitBranch className="w-5 h-5" />
                View on GitHub
              </a>
              <Link href="/report/full" className="inline-flex items-center gap-2 text-neutral-300 bg-white/5 border border-white/10 px-8 py-3 rounded-xl hover:bg-white/10 transition-colors font-medium">
                <FileText className="w-5 h-5" />
                Full Markdown Report
              </Link>
            </div>
          </div>
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
            <span className="text-neutral-600 text-xs ml-8">
              Created by{" "}
              <a href="https://blog.dev-kat.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Ben Baldivia</a>
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <a href="https://github.com/kiloforge/kiloforge" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
