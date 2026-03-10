import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Features | Kiloforge",
  description:
    "See the Command Deck in action — kanban boards, AI agent swarms, dependency tracking, capacity monitoring, and more.",
};

const features = [
  {
    title: "Command Deck Overview",
    description:
      "Your unified control center. Monitor budget utilization, token rates, cost-per-hour, and active agent counts at a glance with real-time gauge cards. Below, the agent grid shows every running and completed worker with role badges, token usage, model info, and estimated cost.",
    image: "/features/overview.png",
  },
  {
    title: "Kanban Board with Dependencies",
    description:
      "A five-column workflow board — Backlog, Approved, In Progress, In Review, and Done — that auto-syncs with your track registry. Cards show type badges, assigned agents, PR numbers, and running status. Dependency and conflict-risk lines overlay the board so you can see which tracks block each other before they collide.",
    image: "/features/kanban-board.png",
  },
  {
    title: "AI Agent Swarm",
    description:
      "Orchestrate parallel Claude Code agents from a single panel. See which agents are actively working, which tracks are queued, and adjust the max swarm size on the fly. The swarm auto-assigns approved tracks to available workers and reports capacity in real time.",
    image: "/features/swarm-capacity.png",
  },
];

export default function FeaturesPage() {
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
            <Image
              src="/kf_logo.webp"
              alt="Kiloforge Logo"
              width={32}
              height={32}
              className="rounded-md shadow-lg"
            />
            <span className="font-semibold text-lg tracking-tight">
              Kiloforge
            </span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
            <Link
              href="/"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <a
              href="https://github.com/kiloforge/kiloforge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-24 px-6 max-w-6xl mx-auto flex-1 w-full">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Features in Action
        </h1>
        <p className="text-lg text-neutral-400 mb-16 max-w-2xl">
          Real screenshots from the Command Deck — the browser-based dashboard
          that ships inside every Kiloforge binary.
        </p>

        <div className="space-y-24">
          {features.map((feature, i) => (
            <section key={i} className="space-y-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold text-white mb-3">
                  {feature.title}
                </h2>
                <p className="text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={1440}
                  height={900}
                  className="w-full h-auto"
                  quality={90}
                />
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <p className="text-neutral-500 mb-6">
            Ready to see it for yourself?
          </p>
          <Link
            href="/#install"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-emerald-500/25"
          >
            Install Kiloforge
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-sm text-neutral-500 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
              <Image
                src="/kf_logo.webp"
                alt="Kiloforge Logo"
                width={24}
                height={24}
                className="rounded"
              />
              <span>&copy; 2026 Ben Baldivia. All rights reserved.</span>
            </div>
            <span className="text-neutral-600 text-xs ml-8">
              Created by{" "}
              <a
                href="https://blog.dev-kat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                Ben Baldivia
              </a>
            </span>
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/kiloforge"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
