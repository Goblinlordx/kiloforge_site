"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  GitMerge, 
  LayoutDashboard, 
  TerminalSquare, 
  Shield, 
  Activity, 
  HardDrive, 
  Sparkles, 
  ArrowRight, 
  Lock,
  GitPullRequest
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

export default function Home() {
  return (
    <div className="min-h-screen font-sans selection:bg-neutral-800 selection:text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/kf_logo.webp" alt="Kiloforge Logo" width={32} height={32} className="rounded-md shadow-lg" />
            <span className="font-semibold text-lg tracking-tight">Kiloforge</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/10">
              GitHub
            </a>
          </div>
        </div>
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
              An orchestration platform for coordinating AI coding agents at scale. Runs a private git forge, real-time dashboard, and AI swarms directly on your machine.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <pre className="glass-panel px-6 py-4 rounded-xl flex items-center gap-3 text-sm font-mono text-neutral-300 border border-white/10 shadow-2xl">
                <span className="text-emerald-400">$</span>
                <span>kf init</span>
              </pre>
              <button className="bg-white text-black px-8 py-4 rounded-xl font-medium flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            id="features"
          >
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-emerald-400" />}
              title="Private Infrastructure"
              description="Git forge, webhooks, and coordination run locally. Your code stays completely on your machine."
            />
            <FeatureCard 
              icon={<TerminalSquare className="w-6 h-6 text-cyan-400" />}
              title="Autonomous CLI Agents"
              description="Spawn Claude Code CLI agents that implement, review, and merge code independently."
            />
            <FeatureCard 
              icon={<LayoutDashboard className="w-6 h-6 text-indigo-400" />}
              title="Real-Time Dashboard"
              description="Monitor agents, track quotas, enforce budgets, and stream logs live in your browser."
            />
            <FeatureCard 
              icon={<GitPullRequest className="w-6 h-6 text-rose-400" />}
              title="Human + AI Collaboration"
              description="Use Gitea for code review and PRs. Seamless collaboration between human developers and AI swarms."
            />
            <FeatureCard 
              icon={<Activity className="w-6 h-6 text-amber-400" />}
              title="End-to-End Tracing"
              description="OpenTelemetry traces follow each track from claim through agent work, PR review, and final merge."
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
             className="mt-40 border-t border-white/10 pt-32 text-center"
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
                  <p className="text-neutral-400 text-sm">Initialize and start a global Gitea server and Relay server on your machine with <code className="text-neutral-300 bg-white/10 px-1 py-0.5 rounded">kf init</code>. Use <code className="text-neutral-300 bg-white/10 px-1 py-0.5 rounded">kf up</code> on subsequent runs.</p>
                </motion.div>
                
                <motion.div variants={fadeIn} className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-6 border border-white/20 shadow-lg">
                    <TerminalSquare className="w-8 h-8 text-neutral-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">2. Spawn Swarms</h3>
                  <p className="text-neutral-400 text-sm">Create conductor tracks and spawn Claude Code agents into pooled worktrees to implement tickets.</p>
                </motion.div>
                
                <motion.div variants={fadeIn} className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-6 border border-white/20 shadow-lg">
                    <GitMerge className="w-8 h-8 text-neutral-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">3. Review & Merge</h3>
                  <p className="text-neutral-400 text-sm">Agents create PRs, respond to feedback, and automatically merge when CI and reviews pass.</p>
                </motion.div>
             </div>
          </motion.div>

          {/* Architecture Visual Map */}
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={stagger}
             className="mt-40 pt-12 md:max-w-4xl mx-auto"
             id="architecture"
          >
             <motion.div variants={fadeIn} className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Architecture</h2>
               <p className="text-lg text-neutral-400">A robust multi-server relay system running directly on your machine.</p>
             </motion.div>

             <div className="flex flex-col gap-6 relative">
               {/* Vertical Connection Line */}
               <div className="absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent hidden md:block"></div>

               {/* Layer 1: Orchestrator Server */}
               <motion.div variants={fadeIn} className="glass-panel p-8 rounded-2xl border border-cyan-500/20 relative z-10 bg-black/60 shadow-[0_0_40px_rgba(6,182,212,0.05)]">
                 <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-cyan-500/10 rounded-lg text-cyan-400">
                       <TerminalSquare className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold font-mono text-cyan-100">Orchestrator Core</h3>
                       <p className="text-sm text-neutral-400 font-mono">localhost:3001</p>
                     </div>
                   </div>
                   <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/20">
                     <HardDrive className="w-3 h-3" /> Central Proxy
                   </div>
                 </div>
                 <div className="text-neutral-300 text-sm pl-[3.25rem] grid sm:grid-cols-2 gap-y-3 gap-x-6">
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Serves Dashboard & Proxies Gitea</p>
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Agent spawn, suspend, resume</p>
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Dev-Reviewer cycle routing</p>
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Quotas & budget enforcement</p>
                   <p className="flex items-center gap-2 col-span-full"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Scoped lock API (Merge Context Serialization)</p>
                 </div>
               </motion.div>

               {/* Connector Arrow for Mobile */}
               <div className="flex justify-center md:hidden text-white/20 py-2">
                 <ArrowRight className="w-5 h-5 rotate-90" />
               </div>

               {/* Layer 2: Claude Code Swarm */}
               <motion.div variants={fadeIn} className="glass-panel p-8 rounded-2xl border border-emerald-500/20 relative z-10 bg-black/60 shadow-[0_0_40px_rgba(52,211,153,0.05)] md:ml-12 mt-2">
                 <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                       <TerminalSquare className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold font-mono text-emerald-100">Claude Code Swarm</h3>
                       <p className="text-sm text-neutral-400 font-mono">Managed local CLI agents</p>
                     </div>
                   </div>
                   <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                     <Lock className="w-3 h-3" /> Auto-Scaling
                   </div>
                 </div>
                 <div className="text-neutral-300 text-sm pl-[3.25rem] space-y-2">
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Dynamically instantiated and managed by the Orchestrator</p>
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Execute autonomously inside isolated local pooled worktrees</p>
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Integrate directly with the forging process via specialized custom Skills</p>
                 </div>
               </motion.div>

               {/* Connector Arrow for Mobile */}
               <div className="flex justify-center md:hidden text-white/20 py-2">
                 <ArrowRight className="w-5 h-5 rotate-90" />
               </div>

               {/* Layer 3: Dashboard */}
               <motion.div variants={fadeIn} className="glass-panel p-8 rounded-2xl border border-indigo-500/20 relative z-10 bg-black/60 shadow-[0_0_40px_rgba(99,102,241,0.05)] md:ml-24 mt-2">
                 <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                       <LayoutDashboard className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold font-mono text-indigo-100">Dashboard UI</h3>
                       <p className="text-sm text-neutral-400 font-mono">Served from Orchestrator</p>
                     </div>
                   </div>
                 </div>
                 <div className="text-neutral-300 text-sm pl-[3.25rem] space-y-2">
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Agent status, limits, and live cost calculation</p>
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> Log streaming and real-time SSE updates</p>
                 </div>
               </motion.div>

               {/* Connector Arrow for Mobile */}
               <div className="flex justify-center md:hidden text-white/20 py-2">
                 <ArrowRight className="w-5 h-5 rotate-90" />
               </div>

               {/* Layer 4: Gitea */}
               <motion.div variants={fadeIn} className="glass-panel p-8 rounded-2xl border border-rose-500/20 relative z-10 bg-black/60 shadow-[0_0_40px_rgba(244,63,94,0.05)] md:ml-36 mt-2">
                 <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-3">
                     <div className="p-2.5 bg-rose-500/10 rounded-lg text-rose-400">
                       <GitMerge className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-xl font-bold font-mono text-rose-100">Gitea Backend</h3>
                       <p className="text-sm text-neutral-400 font-mono">Proxied via Orchestrator</p>
                     </div>
                   </div>
                   <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                     <Activity className="w-3 h-3" /> Webhooks Emit
                   </div>
                 </div>
                 <div className="text-neutral-300 text-sm pl-[3.25rem] space-y-2">
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Git repos, PRs, and code review across multiple projects</p>
                   <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Fires Events directly back to the Orchestrator daemon</p>
                 </div>
               </motion.div>
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
                 Join the future of software development. Run the command below to start coordinating AI coding agents on your local machine.
               </p>
               <pre className="inline-flex glass-panel px-6 py-4 rounded-xl text-left font-mono text-sm border border-white/20 mb-8 max-w-full overflow-x-auto shadow-2xl">
                 <code className="text-emerald-400">git clone</code> <span className="text-neutral-300">git@github.com:kiloforge/kiloforge.git</span><br/>
                 <code className="text-emerald-400">cd</code> <span className="text-neutral-300">kiloforge</span><br/>
                 <code className="text-emerald-400">make build && kf init</code>
               </pre>
             </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-sm text-neutral-500 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <Image src="/kf_logo.webp" alt="Kiloforge Logo" width={24} height={24} className="rounded" />
             <span>© 2026 Kiloforge. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">License</a>
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
