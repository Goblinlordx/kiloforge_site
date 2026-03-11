"use client";

import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const GITHUB_REPORT_URL =
  "https://github.com/kiloforge/kiloforge/tree/main/.agent/kf/_reports/product-audit";

const reportMarkdown = `# Kiloforge Product Audit — Full Report

**Date:** March 10, 2026
**Scope:** Full product surface — CLI, REST API, Dashboard, Skills, Orchestration
**Phase:** Conception to Alpha Deployment

---

# Executive Summary

## Product Snapshot

| Dimension | Count |
|-----------|-------|
| Completed tracks | 172 |
| Go SLOC (hand-written) | ~20,000 |
| Go SLOC (generated) | ~12,000 |
| Frontend SLOC | ~10,600 |
| Go test SLOC | ~19,300 |
| Go test files | 93 |
| Frontend unit tests | 22 |
| E2E test specs | 21 |
| API operations | 49 |
| SSE event types | 11+ |
| Core services | 12 |
| Adapter packages | 18 |
| Port interfaces | 20 |
| Domain models | 11 |
| Frontend pages | 5 |
| Frontend components | ~63 files |
| Frontend hooks | 28 |
| Embedded skills | 15 (1 deprecated) |
| CI workflows | 3 |
| Documentation files | 5 (~860 lines) |

## Key Findings

### Strengths

1. **Exceptional test coverage** — 1:1 test-to-source ratio (19K test SLOC vs 20K source SLOC), 21 E2E specs, 93 Go test files
2. **Clean architecture** — Strict port/adapter pattern, 12 services with clean separation, zero TODOs in source
3. **Schema-first API** — OpenAPI 3.1 + AsyncAPI 3.0, code generation pipeline, verification in CI
4. **Comprehensive real-time system** — 11+ SSE event types, WebSocket for agent interaction
5. **Mature CI/CD** — Lint, test, deps verification, codegen verification across Go + frontend
6. **Robust orchestration** — Dependency-aware work queue, merge lock with dual-mode (HTTP/mkdir), OpenTelemetry tracing

### Critical Gaps

1. **No API pagination** — All list endpoints return unbounded results. Will degrade with scale.
2. **No notification system** — No alerts when agents complete, fail, or escalate. Users must poll the dashboard.
3. **No plugin/extension system** — Skills are embedded at compile time. Third-party skills require forking.
4. **E2E tests not in CI** — 21 E2E specs exist but aren't run in the CI pipeline
5. **Limited documentation** — 5 docs files (~860 lines) for a product with 49 API endpoints and 20+ CLI commands. No API reference docs.

### Top 5 Recommendations

1. **Add API pagination and filtering** (Effort: M, Impact: 5) — Every list endpoint needs cursor/offset pagination and basic filtering. Without it, the product cannot scale beyond toy usage.
2. **Build a notification/webhook system** (Effort: L, Impact: 5) — Agent completion, failure, and escalation events should trigger configurable notifications (desktop, webhook, email). This is the #1 UX gap for a tool that runs long-lived autonomous agents.
3. **Add E2E tests to CI** (Effort: S, Impact: 4) — The 21 E2E specs should run in CI. This requires a headless browser setup but prevents UI regressions from landing.
4. **Generate API reference documentation** (Effort: S, Impact: 4) — Auto-generate from OpenAPI spec. The schema already exists; this is low-hanging fruit.
5. **Dynamic skill loading** (Effort: L, Impact: 4) — Allow loading skills from external repos or local directories without recompilation. Transforms kiloforge from a tool into a platform.

---

# Feature Inventory

## Maturity Scale

| Rating | Label | Meaning |
|--------|-------|---------|
| 5 | Mature | Production-quality, well-tested, good UX, documented |
| 4 | Solid | Works well, minor polish needed |
| 3 | Functional | Works but has noticeable gaps |
| 2 | Basic | Minimum viable, needs significant work |
| 1 | Stub | Exists but incomplete or broken |

## 1. CLI Commands

| Command | Category | Maturity | Notes |
|---------|----------|----------|-------|
| \`init\` | Lifecycle | 5 | First-time setup with prereq checks, Docker compose, Gitea provisioning |
| \`up\` | Lifecycle | 5 | Daily start with health checks |
| \`down\` | Lifecycle | 5 | Clean shutdown |
| \`destroy\` | Lifecycle | 4 | Nuclear reset; could use --force confirmation UX |
| \`status\` | Lifecycle | 5 | Shows system health, Gitea status, running agents |
| \`version\` | Lifecycle | 4 | VCS stamping; worktree edge case handled via Makefile |
| \`add\` | Projects | 4 | Registers project, mirrors to Gitea, sets up webhooks |
| \`projects\` | Projects | 4 | Lists registered projects |
| \`push\` | Projects | 4 | Pushes to Gitea mirror |
| \`sync\` | Projects | 4 | Git sync with origin |
| \`agents\` | Agents | 4 | Lists active/recent agents |
| \`logs\` | Agents | 4 | Streams agent logs |
| \`stop\` | Agents | 4 | Stops running agent |
| \`attach\` | Agents | 5 | WebSocket terminal attachment to running agent |
| \`escalated\` | Agents | 3 | Lists escalated (permission-blocked) agents; niche UX |
| \`cost\` | Agents | 4 | Token usage and cost tracking |
| \`implement\` | Orchestration | 4 | Spawns agent to implement a track |
| \`pool\` | Orchestration | 4 | Worker pool management for parallel agents |
| \`dashboard\` | Orchestration | 5 | Opens dashboard in browser |
| \`serve\` | Orchestration | 5 | Starts REST API server |
| \`skills\` | Skills | 4 | Skill management (update, list) |

**CLI Summary:** 21 commands, average maturity 4.3/5. Strong foundation.

## 2. REST API

| Category | Endpoints | Maturity | Notes |
|----------|-----------|----------|-------|
| System | 5 | 5 | Comprehensive health + preflight checks |
| Agents | 8 | 4 | Missing: bulk operations, filtering on list |
| Projects | 12 | 4 | Most complete category; missing pagination |
| Tracks | 4 | 4 | Missing: update, bulk operations |
| Board | 3 | 4 | Kanban operations |
| Queue | 4 | 4 | Dependency-aware scheduling |
| Locks | 4 | 5 | TTL + heartbeat pattern; well-designed |
| Traces | 2 | 3 | No filtering, no pagination, no search |
| Skills | 2 | 3 | Minimal CRUD |
| Consent | 2 | 3 | Agent permission consent |
| Admin | 1 | 3 | Single generic endpoint |
| Quota | 1 | 4 | Token/cost aggregation |

**API Summary:** 49 operations across 43 paths. Schema-first (OpenAPI 3.1) with code generation. Consistent error format.

## 3. Dashboard (Frontend)

| Page | Components | Maturity | Notes |
|------|------------|----------|-------|
| Overview | Stats, AgentGrid, Projects, QueuePanel, Tracks, Traces | 5 | Real-time updates via SSE |
| AgentHistory | Filterable table, histogram | 4 | Good filtering; could use pagination |
| AgentDetail | Metadata, DiffView, LogViewer, AgentTerminal | 5 | Rich detail view with WebSocket terminal |
| ProjectPage | Kanban board, settings, info tabs | 4 | Board works well |
| TrackDetail | Spec/plan display | 3 | Read-only display |
| TracePage | Span timeline visualization | 3 | Basic span view |

**Dashboard Summary:** 5 pages, 63 component files, React 19. Strong real-time foundation. 28 custom hooks, SSE integration, WebSocket terminal, TanStack Query.

## 4. Embedded Skills

| Skill | Purpose | Maturity |
|-------|---------|----------|
| kf-architect | Research codebase, create tracks with specs/plans | 5 |
| kf-developer | Implement tracks in worktree workflow | 5 |
| kf-reviewer | PR review against track spec | 4 |
| kf-implement | Execute tasks from a track plan (single-branch) | 4 |
| kf-new-track | Create a single track with spec and plan | 4 |
| kf-manage | Archive, restore, delete, rename tracks | 4 |
| kf-setup | Initialize project with kiloforge artifacts | 4 |
| kf-status | Display project status and next actions | 3 |
| kf-report | Generate project timeline and velocity reports | 4 |
| kf-product-advisor | Product strategy and recommendations | 3 |
| kf-validate | Validate kiloforge artifacts | 4 |
| kf-revert | Git-aware undo by work unit | 3 |
| kf-bulk-archive | Archive all completed tracks | 4 |
| kf-compact-archive | Remove archived track dirs, preserve git history | 4 |
| kf-parallel | DEPRECATED — redirects to kf-architect/kf-developer | 1 |

**Skills Summary:** 15 skills (1 deprecated), average maturity 3.8/5.

## 5. Orchestration Pipeline

| Component | Maturity | Notes |
|-----------|----------|-------|
| Agent spawning | 5 | Interactive and non-interactive modes, mock agent for testing |
| Work queue | 5 | Dependency-aware scheduling, priority, start/stop controls |
| Merge lock | 5 | Dual-mode (HTTP with TTL/heartbeat, mkdir fallback), crash recovery |
| PR lifecycle | 4 | Create, review, merge via Gitea |
| OpenTelemetry tracing | 4 | Span creation across agent lifecycle |
| SSE event bus | 5 | 11+ event types, reconnect handling, project scoping |
| WebSocket terminal | 5 | Real-time agent interaction |
| Cleanup service | 4 | Automatic resource cleanup |
| Git sync | 4 | Bidirectional sync with origin |

---

# Gap Analysis

## Summary by Severity

| Severity | Count |
|----------|-------|
| Critical | 2 |
| High | 12 |
| Medium | 16 |
| Low | 9 |
| **Total** | **39** |

## Critical Gaps

| Gap | Description |
|-----|-------------|
| No API pagination | All list endpoints return unbounded results. With 172+ tracks and growing agent history, this will cause performance degradation and potential OOM. |
| No notification system | Users get no alerts when agents complete, fail, escalate, or require attention. Must actively monitor the dashboard. |

## High-Severity Gaps

| Gap | Category |
|-----|----------|
| No API filtering/sorting | Scale & Performance |
| No log search/aggregation | Observability |
| No agent timeout enforcement | Agent Management |
| No automatic retry/recovery | Agent Management |
| No responsive/mobile design | User Experience |
| No keyboard shortcuts | User Experience |
| No dynamic skill loading | Extensibility |
| No webhook extensibility | Extensibility |
| No API reference docs | Documentation |
| No user guide | Documentation |
| E2E tests not in CI | Testing |
| No API authentication | Security |

---

# Improvement Recommendations

## Effort Scale

| Size | Meaning |
|------|---------|
| S | < 1 day (1-2 tracks) |
| M | 1-3 days (2-4 tracks) |
| L | 3-7 days (4-8 tracks) |
| XL | 1-2 weeks (8+ tracks) |

## Top Recommendations

| # | Item | Effort | Impact | Description |
|---|------|--------|--------|-------------|
| R1 | API pagination + filtering | M | 5 | Cursor-based pagination with \`?cursor=X&limit=N\`. Default limit: 50, max: 200. |
| R2 | API filtering and sorting | M | 4 | Query parameters: \`?status=running\`, \`?project=myproject\`, \`?sort=created_at\` |
| R4 | CLI --json output | M | 4 | Global \`--json\` flag for all commands. Enables scripting. |
| R5 | Shell completions | S | 3 | \`kf completion bash|zsh|fish\`. Nearly free with Cobra. |
| R7 | Keyboard shortcuts + command palette | M | 4 | Global Cmd+K palette, hotkeys for common actions. |
| R11 | Agent timeout enforcement | S | 4 | Configurable \`max_duration\` per agent. Default: 2 hours. |
| R12 | Automatic retry for failed agents | M | 4 | Configurable retry policy with exponential backoff. |
| R16 | E2E tests in CI | S | 4 | Headless Playwright step with mock agent binary. |
| R18 | API docs from OpenAPI | S | 4 | Redoc/Swagger UI generation from existing spec. |
| R19 | Comprehensive user guide | M | 4 | Full guide: installation, first project, agent workflow, troubleshooting. |

---

# New Feature Proposals

## F1. Notification System
- **Scope:** L (4-6 tracks) | **Impact:** 5/5
- Channels: desktop (macOS Notification Center), webhook, Slack, terminal bell
- Events: agent_completed, agent_failed, agent_escalated, agent_timeout, queue_empty, merge_conflict
- Transforms kiloforge from "monitor it" to "fire and forget"

## F2. Dynamic Skill Loading
- **Scope:** L (6-8 tracks) | **Impact:** 4/5
- Scan \`~/.claude/skills/kf-*\` directories for SKILL.md files
- Install from git repo or local path, update, uninstall, enable/disable
- Turns kiloforge from a tool into a platform

## F3. Multi-User Support
- **Scope:** XL (10+ tracks) | **Impact:** 4/5
- Authentication (API key or OAuth), role-based authorization
- Per-user agent quotas and cost tracking, audit logging

## F4. Agent Analytics Dashboard
- **Scope:** M (3-4 tracks) | **Impact:** 4/5
- Aggregate metrics: success rates, token costs, duration trends
- Charts: cost over time, success/failure rate, duration distribution

## F5. Webhook Extensibility
- **Scope:** M (2-3 tracks) | **Impact:** 4/5
- Configurable webhook targets with event filtering
- Retry policy with exponential backoff

## F6. Agent Scheduling
- **Scope:** M (3-4 tracks) | **Impact:** 3/5
- Cron-like scheduling for recurring agent runs
- Nightly reviews, weekly dependency updates, daily coverage reports

## F7. GitHub Forge Support
- **Scope:** XL (8+ tracks) | **Impact:** 4/5
- GitHub adapter implementing same port interfaces as Gitea
- PR lifecycle, webhook handling, branch protection

## F8. CLI Interactive Mode (TUI)
- **Scope:** L (6-8 tracks) | **Impact:** 3/5
- charmbracelet/bubbletea for terminal UI
- Agent list, log viewer, project status, queue monitor

---

# Prioritized Roadmap

## Tier 1: Immediate (Next 1-2 Weeks)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 1 | API pagination + filtering | M | 5 |
| 2 | E2E tests in CI | S | 4 |
| 3 | Generate API docs from OpenAPI | S | 4 |
| 4 | Shell completions | S | 3 |
| 5 | Remove deprecated kf-parallel | S | 2 |
| 6 | Agent timeout enforcement | S | 4 |
| 7 | CLI --json output | M | 4 |

**Estimated effort:** ~1-2 weeks of agent work (7-12 tracks)

## Tier 2: Near-Term (Weeks 3-6)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 8 | Notification system | L | 5 |
| 9 | Webhook extensibility | M | 4 |
| 10 | Agent retry/recovery | M | 4 |
| 11 | Keyboard shortcuts + command palette | M | 4 |
| 12 | Enhanced TrackDetail page | M | 3 |
| 13 | Trace visualization improvements | M | 3 |
| 14 | User guide | M | 4 |
| 15 | Bulk operations | S | 3 |

**Estimated effort:** ~3-4 weeks of agent work (15-25 tracks)

## Tier 3: Strategic (Weeks 7+)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 16 | Dynamic skill loading | L | 4 |
| 17 | Agent analytics dashboard | M | 4 |
| 18 | Agent scheduling | M | 3 |
| 19 | Responsive/mobile dashboard | L | 3 |
| 20 | GitHub forge support | XL | 4 |
| 21 | Multi-user support | XL | 4 |
| 22 | TUI mode | L | 3 |

**Estimated effort:** 6-12 weeks of agent work (30-60 tracks)

## Dependency Graph

\`\`\`
Tier 1: API pagination (R1) ──┐
                               ├── R10 (search/filtering in dashboard)
Tier 1: API filtering (R2) ───┘

Tier 1: Agent timeout (R11) ──── Tier 2: Agent retry (R12)

Tier 2: Notifications (F1) ──── Tier 2: Webhooks (F5)
                               └── Tier 3: Scheduling (F6)

Tier 2: Bulk ops (R3) ──── Tier 2: Keyboard shortcuts (R7)

Tier 3: Dynamic skills (F2) ──── Tier 3: Multi-user (F3)
                                          └── API auth (prerequisite)
\`\`\`

## Total Estimated Impact

If all Tier 1 + Tier 2 items are completed:
- **Scale:** Product can handle 1000+ agents/tracks without performance issues
- **UX:** Users notified of all events, keyboard-driven workflow, rich search
- **Reliability:** Agent timeout + retry enables true unattended operation
- **Adoption:** API docs + user guide lower the onboarding barrier
- **Integration:** Webhook extensibility connects kiloforge to the broader toolchain

Tier 3 items transform kiloforge from a **power-user tool** into a **team platform** with community ecosystem potential.
`;

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-16 mb-6 pb-4 border-b border-white/10 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold tracking-tight mt-12 mb-4 text-neutral-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mt-8 mb-3 text-neutral-200">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-neutral-400 leading-relaxed mb-4">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="text-neutral-200 font-semibold">{children}</strong>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="block glass-panel rounded-xl p-4 text-sm text-neutral-300 font-mono overflow-x-auto border border-white/5 my-4 whitespace-pre">
          {children}
        </code>
      );
    }
    return (
      <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => <div className="my-4">{children}</div>,
  table: ({ children }) => (
    <div className="glass-panel rounded-xl border border-white/5 overflow-hidden my-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">{children}</table>
      </div>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-neutral-500 text-xs uppercase tracking-wider font-medium border-b border-white/10">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-neutral-300 text-sm">{children}</td>
  ),
  ul: ({ children }) => (
    <ul className="space-y-2 mb-4 ml-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-2 mb-4 ml-4 list-decimal list-outside">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-neutral-400 text-sm leading-relaxed flex items-start gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-2 shrink-0" />
      <span>{children}</span>
    </li>
  ),
  hr: () => <hr className="border-white/10 my-12" />,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 decoration-cyan-400/30 hover:decoration-cyan-400/60 transition-colors"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-cyan-500/30 pl-4 my-4 text-neutral-400 italic">
      {children}
    </blockquote>
  ),
};

export default function FullReportPage() {
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
          <div className="flex items-center gap-4 text-sm font-medium text-neutral-400">
            <Link href="/report" className="hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Summary</span>
            </Link>
            <a
              href={GITHUB_REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/kiloforge/kiloforge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              Repo
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-24 px-6 max-w-4xl mx-auto flex-1 w-full">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Early Development — Conception to Alpha
          </div>
          <p className="text-neutral-500 text-sm">
            Full markdown report. For a visual summary, see the{" "}
            <Link href="/report" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">
              status report overview
            </Link>
            . Source files are available on{" "}
            <a
              href={GITHUB_REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
              GitHub
            </a>
            .
          </p>
        </div>

        {/* Markdown Content */}
        <article className="prose-custom">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {reportMarkdown}
          </ReactMarkdown>
        </article>
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
            <Link href="/report" className="hover:text-white transition-colors">Summary</Link>
            <a href="https://github.com/kiloforge/kiloforge" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
