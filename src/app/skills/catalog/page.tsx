"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Layers,
  GitBranch,
  Search,
  Wrench,
  BarChart3,
  Rocket,
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const skillCategories = [
  {
    title: "Getting Started",
    icon: <Rocket className="w-5 h-5 text-emerald-400" />,
    skills: [
      { name: "kf-getting-started", desc: "Interactive project bootstrapper" },
      { name: "kf-setup", desc: "Initialize project metadata and track registry" },
    ],
  },
  {
    title: "Architecture & Planning",
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    skills: [
      { name: "kf-architect", desc: "Research codebase, create track specs" },
      { name: "kf-conductor", desc: "Tmux-based multi-agent orchestration and auto-dispatch" },
    ],
  },
  {
    title: "Development",
    icon: <GitBranch className="w-5 h-5 text-indigo-400" />,
    skills: [
      { name: "kf-developer", desc: "Implement a track end-to-end" },
      { name: "kf-conflict-resolver", desc: "Resolve git merge conflicts" },
      { name: "kf-revert", desc: "Undo by track, phase, or task" },
    ],
  },
  {
    title: "Review & Quality",
    icon: <Search className="w-5 h-5 text-amber-400" />,
    skills: [
      { name: "kf-validate", desc: "Validate project artifact consistency" },
    ],
  },
  {
    title: "Management & Reporting",
    icon: <BarChart3 className="w-5 h-5 text-rose-400" />,
    skills: [
      { name: "kf-status", desc: "Project status with dependency ordering" },
      { name: "kf-manage", desc: "Archive, restore, delete, rename tracks" },
      { name: "kf-report", desc: "Timeline, velocity, and cost reports" },
    ],
  },
  {
    title: "Tooling & Repair",
    icon: <Wrench className="w-5 h-5 text-purple-400" />,
    skills: [
      { name: "kf-bin", desc: "CLI tools reference and shared documentation hub" },
      { name: "kf-update", desc: "Update skill definitions and CLI tools from latest release" },
      { name: "kf-advisor-product", desc: "Product strategy and competitive analysis" },
      { name: "kf-advisor-reliability", desc: "Codebase reliability audit" },
      { name: "kf-repair", desc: "System integrity audit and repair" },
    ],
  },
];

export default function SkillsCatalogPage() {
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
            <Link href="/skills/index.html" className="hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Skills
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto flex-1 w-full">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-16">
          <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Skills{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Catalog</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Full reference for all 16 skills — organized by workflow stage.
          </motion.p>
        </motion.div>

        {/* All Skills Reference */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
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
