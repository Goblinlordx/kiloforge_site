/**
 * Playwright screenshot capture for Kiloforge marketing site.
 * Intercepts API calls with realistic mock data.
 *
 * Usage: npx playwright test screenshots.mjs --project=chromium
 * Or:    node screenshots.mjs (uses playwright API directly)
 */
import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "public", "features");
const BASE = process.env.SCREENSHOT_BASE || "http://localhost:4001";

// ── Mock Data ──────────────────────────────────────────────────────────

const mockAgents = {
  items: [
    {
      id: "agent-a1b2c3", name: "worker-1", role: "developer", ref: "chore/ci-fast-lint_20260311180000Z",
      status: "running", session_id: "sess-001", pid: 12340, worktree_dir: "/project/worker-1",
      log_file: "/tmp/agent-a1b2c3.log", started_at: "2026-03-10T12:30:00Z", updated_at: "2026-03-10T14:15:00Z",
      uptime_seconds: 6300, estimated_cost_usd: 2.47, input_tokens: 245000, output_tokens: 38200,
      cache_read_tokens: 180000, cache_creation_tokens: 12000, model: "claude-sonnet-4-6",
    },
    {
      id: "agent-d4e5f6", name: "worker-2", role: "developer", ref: "feature/auth-oauth_20260310120000Z",
      status: "running", session_id: "sess-002", pid: 12341, worktree_dir: "/project/worker-2",
      log_file: "/tmp/agent-d4e5f6.log", started_at: "2026-03-10T13:00:00Z", updated_at: "2026-03-10T14:10:00Z",
      uptime_seconds: 4200, estimated_cost_usd: 1.83, input_tokens: 182000, output_tokens: 27400,
      cache_read_tokens: 140000, cache_creation_tokens: 8000, model: "claude-sonnet-4-6",
    },
    {
      id: "agent-g7h8i9", name: "worker-3", role: "developer", ref: "feature/websocket-upgrade_20260310090000Z",
      status: "running", session_id: "sess-003", pid: 12342, worktree_dir: "/project/worker-3",
      log_file: "/tmp/agent-g7h8i9.log", started_at: "2026-03-10T11:00:00Z", updated_at: "2026-03-10T14:12:00Z",
      uptime_seconds: 11520, estimated_cost_usd: 4.12, input_tokens: 410000, output_tokens: 62000,
      cache_read_tokens: 310000, cache_creation_tokens: 22000, model: "claude-sonnet-4-6",
    },
    {
      id: "agent-j0k1l2", name: "reviewer-1", role: "reviewer", ref: "feature/dashboard-charts_20260309150000Z",
      status: "completed", session_id: "sess-004", pid: 12343, worktree_dir: "/project/reviewer-1",
      log_file: "/tmp/agent-j0k1l2.log", started_at: "2026-03-10T09:00:00Z", updated_at: "2026-03-10T10:30:00Z",
      finished_at: "2026-03-10T10:30:00Z", uptime_seconds: 5400, estimated_cost_usd: 0.92,
      input_tokens: 95000, output_tokens: 14000, cache_read_tokens: 72000, cache_creation_tokens: 4000,
      model: "claude-sonnet-4-6",
    },
    {
      id: "agent-m3n4o5", name: "worker-4", role: "developer", ref: "bug/fix-sse-reconnect_20260310140000Z",
      status: "completed", session_id: "sess-005", pid: 12344, worktree_dir: "/project/worker-4",
      log_file: "/tmp/agent-m3n4o5.log", started_at: "2026-03-10T08:00:00Z", updated_at: "2026-03-10T11:00:00Z",
      finished_at: "2026-03-10T11:00:00Z", uptime_seconds: 10800, estimated_cost_usd: 3.55,
      input_tokens: 355000, output_tokens: 51000, cache_read_tokens: 260000, cache_creation_tokens: 18000,
      model: "claude-sonnet-4-6",
    },
  ],
  total_count: 5,
};

const mockProjects = [
  { slug: "kiloforge", repo_name: "kiloforge/kiloforge", origin_remote: "https://github.com/kiloforge/kiloforge.git", active: true },
  { slug: "dashboard-v2", repo_name: "kiloforge/dashboard", origin_remote: "https://github.com/kiloforge/dashboard.git", active: true },
];

const mockQuota = {
  input_tokens: 1287000, output_tokens: 192600, cache_read_tokens: 962000, cache_creation_tokens: 64000,
  estimated_cost_usd: 12.89, agent_count: 3, rate_limited: false,
  budget_usd: 50.00, budget_used_pct: 25.8,
  rate_tokens_per_min: 42300, rate_cost_per_hour: 3.20,
  time_to_budget_mins: 695,
};

const mockSwarm = {
  running: true, max_workers: 5, active_workers: 3,
  items: [
    { track_id: "ci-fast-lint_20260311180000Z", project_slug: "kiloforge", status: "assigned", agent_id: "agent-a1b2c3", enqueued_at: "2026-03-10T12:00:00Z", assigned_at: "2026-03-10T12:30:00Z" },
    { track_id: "auth-oauth_20260310120000Z", project_slug: "kiloforge", status: "assigned", agent_id: "agent-d4e5f6", enqueued_at: "2026-03-10T12:00:00Z", assigned_at: "2026-03-10T13:00:00Z" },
    { track_id: "websocket-upgrade_20260310090000Z", project_slug: "kiloforge", status: "assigned", agent_id: "agent-g7h8i9", enqueued_at: "2026-03-10T10:00:00Z", assigned_at: "2026-03-10T11:00:00Z" },
    { track_id: "api-rate-limiting_20260310160000Z", project_slug: "kiloforge", status: "queued", enqueued_at: "2026-03-10T14:00:00Z" },
    { track_id: "e2e-test-suite_20260310170000Z", project_slug: "kiloforge", status: "queued", enqueued_at: "2026-03-10T14:05:00Z" },
  ],
};

const mockSwarmCapacity = { max: 5, active: 3, available: 2 };

const mockBoard = {
  columns: ["backlog", "approved", "in_progress", "in_review", "done"],
  cards: {
    "api-rate-limiting_20260310160000Z": { track_id: "api-rate-limiting_20260310160000Z", title: "Add API rate limiting middleware", type: "feature", column: "backlog", position: 0, created_at: "2026-03-10T14:00:00Z", moved_at: "2026-03-10T14:00:00Z" },
    "e2e-test-suite_20260310170000Z": { track_id: "e2e-test-suite_20260310170000Z", title: "End-to-end test infrastructure", type: "chore", column: "backlog", position: 1, created_at: "2026-03-10T14:05:00Z", moved_at: "2026-03-10T14:05:00Z" },
    "db-migration-v2_20260310110000Z": { track_id: "db-migration-v2_20260310110000Z", title: "Database schema migration v2", type: "chore", column: "backlog", position: 2, created_at: "2026-03-10T11:00:00Z", moved_at: "2026-03-10T11:00:00Z" },
    "ci-fast-lint_20260311180000Z": { track_id: "ci-fast-lint_20260311180000Z", title: "Replace golangci-lint with fast direct linters in CI", type: "chore", column: "approved", position: 0, agent_id: "agent-a1b2c3", agent_status: "running", created_at: "2026-03-10T12:00:00Z", moved_at: "2026-03-10T12:30:00Z" },
    "auth-oauth_20260310120000Z": { track_id: "auth-oauth_20260310120000Z", title: "OAuth 2.0 provider integration", type: "feature", column: "in_progress", position: 0, agent_id: "agent-d4e5f6", agent_status: "running", created_at: "2026-03-10T10:00:00Z", moved_at: "2026-03-10T13:00:00Z" },
    "websocket-upgrade_20260310090000Z": { track_id: "websocket-upgrade_20260310090000Z", title: "Upgrade websocket library to coder/websocket", type: "refactor", column: "in_progress", position: 1, agent_id: "agent-g7h8i9", agent_status: "running", created_at: "2026-03-10T09:00:00Z", moved_at: "2026-03-10T11:00:00Z" },
    "fix-sse-reconnect_20260310140000Z": { track_id: "fix-sse-reconnect_20260310140000Z", title: "Fix SSE reconnection on network drop", type: "bug", column: "in_progress", position: 2, agent_id: "agent-m3n4o5", agent_status: "running", created_at: "2026-03-10T08:00:00Z", moved_at: "2026-03-10T11:30:00Z" },
    "dashboard-charts_20260309150000Z": { track_id: "dashboard-charts_20260309150000Z", title: "Add analytics charts to dashboard", type: "feature", column: "in_review", position: 0, pr_number: 47, created_at: "2026-03-09T15:00:00Z", moved_at: "2026-03-10T09:30:00Z" },
    "readme-badges_20260309100000Z": { track_id: "readme-badges_20260309100000Z", title: "Add CI badges to repository README", type: "chore", column: "done", position: 0, created_at: "2026-03-09T10:00:00Z", moved_at: "2026-03-10T08:00:00Z" },
    "error-boundary_20260308120000Z": { track_id: "error-boundary_20260308120000Z", title: "Add React error boundaries", type: "bug", column: "done", position: 1, created_at: "2026-03-08T12:00:00Z", moved_at: "2026-03-09T16:00:00Z" },
  },
};

const mockTracks = {
  items: [
    { id: "ci-fast-lint_20260311180000Z", title: "Replace golangci-lint with fast direct linters in CI", status: "in-progress", project: "kiloforge", deps_count: 0, deps_met: 0, conflict_count: 1 },
    { id: "auth-oauth_20260310120000Z", title: "OAuth 2.0 provider integration", status: "in-progress", project: "kiloforge", deps_count: 1, deps_met: 1, conflict_count: 0 },
    { id: "websocket-upgrade_20260310090000Z", title: "Upgrade websocket library", status: "in-progress", project: "kiloforge", deps_count: 0, deps_met: 0, conflict_count: 1 },
    { id: "fix-sse-reconnect_20260310140000Z", title: "Fix SSE reconnection on network drop", status: "in-progress", project: "kiloforge", deps_count: 1, deps_met: 1, conflict_count: 0 },
    { id: "api-rate-limiting_20260310160000Z", title: "Add API rate limiting middleware", status: "pending", project: "kiloforge", deps_count: 2, deps_met: 0, conflict_count: 0 },
    { id: "e2e-test-suite_20260310170000Z", title: "End-to-end test infrastructure", status: "pending", project: "kiloforge", deps_count: 0, deps_met: 0, conflict_count: 0 },
    { id: "dashboard-charts_20260309150000Z", title: "Add analytics charts to dashboard", status: "in-progress", project: "kiloforge", deps_count: 0, deps_met: 0, conflict_count: 0 },
    { id: "readme-badges_20260309100000Z", title: "Add CI badges to repository README", status: "complete", project: "kiloforge", deps_count: 0, deps_met: 0, conflict_count: 0 },
    { id: "error-boundary_20260308120000Z", title: "Add React error boundaries", status: "complete", project: "kiloforge", deps_count: 0, deps_met: 0, conflict_count: 0 },
  ],
  total_count: 9,
};

const mockTrackDetails = {
  "ci-fast-lint_20260311180000Z": {
    id: "ci-fast-lint_20260311180000Z", title: "Replace golangci-lint with fast direct linters in CI",
    status: "in-progress", type: "chore", phases_total: 3, phases_completed: 1, tasks_total: 8, tasks_completed: 3,
    dependencies: [], conflicts: [{ track_id: "websocket-upgrade_20260310090000Z", track_title: "Upgrade websocket library", risk: "medium", note: "Both modify backend Makefile lint targets" }],
  },
  "auth-oauth_20260310120000Z": {
    id: "auth-oauth_20260310120000Z", title: "OAuth 2.0 provider integration",
    status: "in-progress", type: "feature", phases_total: 4, phases_completed: 2, tasks_total: 14, tasks_completed: 8,
    dependencies: [{ id: "error-boundary_20260308120000Z", title: "Add React error boundaries", status: "complete" }],
    conflicts: [],
  },
  "websocket-upgrade_20260310090000Z": {
    id: "websocket-upgrade_20260310090000Z", title: "Upgrade websocket library to coder/websocket",
    status: "in-progress", type: "refactor", phases_total: 3, phases_completed: 2, tasks_total: 10, tasks_completed: 7,
    dependencies: [], conflicts: [{ track_id: "ci-fast-lint_20260311180000Z", track_title: "Replace golangci-lint with fast direct linters", risk: "medium", note: "Both modify backend Makefile lint targets" }],
  },
  "fix-sse-reconnect_20260310140000Z": {
    id: "fix-sse-reconnect_20260310140000Z", title: "Fix SSE reconnection on network drop",
    status: "in-progress", type: "bug", phases_total: 2, phases_completed: 1, tasks_total: 6, tasks_completed: 4,
    dependencies: [{ id: "websocket-upgrade_20260310090000Z", title: "Upgrade websocket library", status: "in-progress" }],
    conflicts: [],
  },
  "api-rate-limiting_20260310160000Z": {
    id: "api-rate-limiting_20260310160000Z", title: "Add API rate limiting middleware",
    status: "pending", type: "feature", phases_total: 3, phases_completed: 0, tasks_total: 12, tasks_completed: 0,
    dependencies: [
      { id: "auth-oauth_20260310120000Z", title: "OAuth 2.0 provider integration", status: "in-progress" },
      { id: "fix-sse-reconnect_20260310140000Z", title: "Fix SSE reconnection", status: "in-progress" },
    ],
    conflicts: [],
  },
  "dashboard-charts_20260309150000Z": {
    id: "dashboard-charts_20260309150000Z", title: "Add analytics charts to dashboard",
    status: "in-progress", type: "feature", phases_total: 3, phases_completed: 3, tasks_total: 9, tasks_completed: 9,
    dependencies: [], conflicts: [],
  },
};

const mockSyncStatus = { ahead: 0, behind: 0, status: "synced", local_branch: "main", remote_url: "https://github.com/kiloforge/kiloforge.git" };
const mockSetupStatus = { gitea_running: true, project_exists: true, webhook_configured: true, ssh_key_added: true };
const mockPreflight = { skills_dir_exists: true, claude_md_exists: true, auth_configured: true, gitea_reachable: true };
const mockMetadata = { slug: "kiloforge", repo_name: "kiloforge/kiloforge", track_count: 9, completed_count: 2, active_count: 5, pending_count: 2 };

// ── Screenshot Runner ──────────────────────────────────────────────────

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "dark",
  });

  const page = await context.newPage();

  const json = (data) => ({ status: 200, contentType: "application/json", body: JSON.stringify(data) });

  const mockStatus = {
    gitea_url: "http://localhost:3000", agent_counts: { running: 3, completed: 2 },
    total_agents: 5, sse_clients: 1, estimated_cost_usd: 12.89,
  };

  // SSE — must be intercepted FIRST to prevent EventSource hanging
  await page.route("**/events**", (route) =>
    route.fulfill({ status: 200, contentType: "text/event-stream", body: "retry: 30000\n\n" })
  );

  // Intercept all API and other backend calls
  await page.route("**/*", async (route) => {
    const url = route.request().url();

    // Let static assets through (JS, CSS, images, fonts)
    if (url.match(/\.(js|css|png|jpg|webp|svg|ico|woff2?|ttf|eot)(\?|$)/)) return route.continue();
    // Let HTML page loads through
    if (route.request().resourceType() === "document") return route.continue();

    // Agent log
    if (url.includes("/api/agents/") && url.includes("/log")) return route.fulfill({ status: 200, contentType: "text/plain", body: "" });
    // Status
    if (url.includes("/api/status")) return route.fulfill(json(mockStatus));
    // Quota
    if (url.includes("/api/quota")) return route.fulfill(json(mockQuota));
    // Swarm capacity (before swarm)
    if (url.includes("/api/swarm/capacity")) return route.fulfill(json(mockSwarmCapacity));
    // Swarm
    if (url.includes("/api/swarm")) return route.fulfill(json(mockSwarm));
    // Preflight
    if (url.includes("/api/preflight")) return route.fulfill(json(mockPreflight));
    // Board
    if (url.includes("/api/board/")) return route.fulfill(json(mockBoard));

    // Track detail (before tracks list — more specific URL)
    for (const [trackId, detail] of Object.entries(mockTrackDetails)) {
      if (url.includes(`/api/tracks/${encodeURIComponent(trackId)}`)) return route.fulfill(json(detail));
    }

    // Tracks list
    if (url.includes("/api/tracks")) return route.fulfill(json(mockTracks));
    // Agents list
    if (url.includes("/api/agents")) return route.fulfill(json(mockAgents));
    // Projects (plain array, not paginated)
    if (url.includes("/api/projects") && !url.includes("/sync-status") && !url.includes("/setup-status") && !url.includes("/metadata") && !url.includes("/resolve-conflict")) return route.fulfill(json(mockProjects));
    // Sync status
    if (url.includes("/sync-status")) return route.fulfill(json(mockSyncStatus));
    // Setup status
    if (url.includes("/setup-status")) return route.fulfill(json(mockSetupStatus));
    // Metadata
    if (url.includes("/metadata")) return route.fulfill(json(mockMetadata));
    // Traces
    if (url.includes("/api/traces")) return route.fulfill(json({ items: [], total_count: 0 }));
    // SSH keys
    if (url.includes("/api/ssh-keys")) return route.fulfill(json({ keys: [] }));

    // Default — let through
    return route.continue();
  });

  // Log browser console errors
  page.on("console", (msg) => {
    if (msg.type() === "error") console.log(`  [BROWSER ERROR] ${msg.text()}`);
  });
  page.on("pageerror", (err) => console.log(`  [PAGE ERROR] ${err.message}`));

  // Helper: dismiss tour dialog and model warning banner
  async function dismissOverlays() {
    // Dismiss tour dialog
    const skipBtn = page.locator('button:has-text("Skip")');
    if (await skipBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await skipBtn.click();
      await page.waitForTimeout(300);
    }
    // Dismiss model warning banner (try both exact and partial text)
    for (const txt of ["Understood", "Understand", "Dismiss"]) {
      const btn = page.locator(`button:has-text("${txt}")`);
      if (await btn.first().isVisible({ timeout: 300 }).catch(() => false)) {
        await btn.first().click();
        await page.waitForTimeout(200);
        break;
      }
    }
  }

  console.log("Taking screenshots...\n");

  // 1. Overview / Command Deck
  console.log("1/5  Overview page...");
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  await dismissOverlays();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/overview.png`, fullPage: false });

  // 2. Project page with Kanban board
  console.log("2/5  Kanban board...");
  await page.goto(`${BASE}/projects/kiloforge`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  await dismissOverlays();
  // Scroll to the board section
  const boardSection = page.locator('[data-tour="board-section"]');
  if (await boardSection.isVisible({ timeout: 3000 }).catch(() => false)) {
    await boardSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
  }
  await page.screenshot({ path: `${OUT}/kanban-board.png`, fullPage: false });

  // 3. Board with relationships overlay
  console.log("3/5  Board with relationships...");
  const relToggle = page.locator('button:has-text("Show"), button:has-text("relationships"), button:has-text("deps"), [data-tour*="relation"]');
  if (await relToggle.first().isVisible({ timeout: 2000 }).catch(() => false)) {
    await relToggle.first().click();
    await page.waitForTimeout(1000);
  }
  await page.screenshot({ path: `${OUT}/board-relationships.png`, fullPage: false });

  // 4. Swarm panel — scroll back up to the swarm section on project page
  console.log("4/5  Swarm panel...");
  await page.goto(`${BASE}/projects/kiloforge`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  await dismissOverlays();
  // The swarm panel has data-tour="swarm-panel" or contains "AI AGENT SWARM"
  const swarmHeading = page.locator('text=AI AGENT SWARM').first();
  if (await swarmHeading.isVisible({ timeout: 3000 }).catch(() => false)) {
    await swarmHeading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: `${OUT}/swarm-capacity.png`, fullPage: false });

  // 5. Metrics/capacity gauges close-up from overview
  console.log("5/5  Metrics gauges...");
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);
  await dismissOverlays();
  // Capture just the metrics area at the top
  const metricsArea = page.locator('[data-tour="metrics-panel"], [class*="metrics"], [class*="gauge"]').first();
  if (await metricsArea.isVisible({ timeout: 2000 }).catch(() => false)) {
    await metricsArea.screenshot({ path: `${OUT}/metrics-gauges.png` });
  } else {
    // Fallback — just screenshot the top of the page
    await page.screenshot({ path: `${OUT}/metrics-gauges.png`, fullPage: false });
  }

  console.log(`\nDone! Screenshots saved to ${OUT}/`);
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
