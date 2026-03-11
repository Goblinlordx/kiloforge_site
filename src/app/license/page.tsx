import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "License | Kiloforge",
  description: "Licensing and acknowledgements for Kiloforge.",
};

export default function LicensePage() {
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

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto flex-1 w-full">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Licensing & Acknowledgements</h1>
        
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 mb-8 text-neutral-300 leading-relaxed shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Open Source Acknowledgements</h2>
          
          <p className="mb-8 text-lg text-neutral-400">
            Kiloforge incorporates and builds upon various incredible open-source projects. We are deeply grateful to the authors and contributors of these foundational technologies.
          </p>

          <div className="bg-black/50 border border-white/5 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-medium text-emerald-400 mb-2">Gemini Conductor (Google LLC)</h3>
            <p className="text-sm text-neutral-400 mb-6">
              Certain orchestration capabilities and skills within Kiloforge are derivative works of the open-source Gemini Conductor project.
            </p>
            
            <pre className="font-mono text-xs whitespace-pre-wrap text-neutral-500 overflow-x-auto bg-black/40 p-4 rounded-xl border border-white/5">
{`Copyright 2024 Google LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
            </pre>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-sm text-neutral-500 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-2">
               <Image src="/kf_logo.webp" alt="Kiloforge Logo" width={24} height={24} className="rounded" />
               <span>© 2026 Ben Baldivia. All rights reserved.</span>
            </div>
            <span className="text-neutral-600 text-xs ml-8">Created by <a href="https://blog.dev-kat.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Ben Baldivia</a></span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/kiloforge" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
