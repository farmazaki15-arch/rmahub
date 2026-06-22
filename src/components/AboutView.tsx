import { useState } from 'react';
import { Target, HelpCircle, History, Sparkles, Send, Mail, ArrowUpRight } from 'lucide-react';

interface AboutViewProps {
  onNavigateTab: (tab: string) => void;
}

export default function AboutView({ onNavigateTab }: AboutViewProps) {
  const milestones = [
    { year: '2024', title: 'The Scraper Awakening', desc: 'Farma-Labs researchers log a 300% hike in conversational citation scrape queries from ChatGPT & Perplexity.' },
    { year: '2025', title: 'Launching FarmaOnline', desc: 'Released our first XML schema optimizer blueprints, enabling 450 publishers to bypass legacy search indexing delays.' },
    { year: '2026', title: 'Dynamic Telemetry Integration', desc: 'Re-architected our media portal with live Express telemetry simulator consoles to demonstrate full affiliate compliance.' }
  ];

  return (
    <section className="font-sans max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in text-gray-900 dark:text-gray-100 space-y-12">
      
      {/* Title */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-5 text-center sm:text-left">
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold">
          OUR DIGITAL MANIFESTO
        </span>
        <h1 className="text-3xl font-bold font-display tracking-tight text-gray-900 dark:text-white mt-1.5">
          FarmaOnline: Pioneering LLMO Publishers
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
          Traditional SEO directories are obsolete. We build syntactic structures that bridges human publishing and conversational index scrapers.
        </p>
      </div>

      {/* Intro Personal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-md font-bold font-display text-gray-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-5 h-5 text-pink-500" />
            <span>The Farma Story & Purpose</span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
            Hello, I am **Alex Farma**, and together with **Sarah Chen**, we founded FarmaOnline. Having spent ten years in the SEO trenches, we watched standard search marketing decay into cookie-cutter keyword farms.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
            When ChatGPT Search and Claude bots emerged, we realized the internet would no longer be indexed by blue links, but by *concepts and recommendations*. We dedicated ourselves to testing exactly how LLMs scrape, cite, and reference sources. FarmaOnline exists to give creators high-performance, real-world schemas, blueprints, and courses to keep them visible.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 space-y-4">
          <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block leading-none">
            What You Stand to Gain Here
          </h4>
          
          <div className="space-y-3.5 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex gap-2.5">
              <span className="text-pink-500">✓</span>
              <span><strong>Precise Schema Blueprints:</strong> Immediate formatting scripts optimized for AI scrapers citation index.</span>
            </div>
            <div className="flex gap-2.5">
              <span className="text-pink-500">✓</span>
              <span><strong>No-Bias SaaS Evaluation:</strong> Full specification tables and pros vs cons matrices before you purchase tools.</span>
            </div>
            <div className="flex gap-2.5">
              <span className="text-pink-500">✓</span>
              <span><strong>Interactive AI Sandbox:</strong> Live Gemini API model integration to brainstorm outlines and schemas on-demand.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Growth (Required Growth section) */}
      <div className="space-y-6">
        <h3 className="text-md font-bold font-display text-gray-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 dark:border-gray-800 pb-2">
          <History className="w-5 h-5 text-purple-500" />
          <span>Timeline of Growth & Decadal Milestones</span>
        </h3>

        <div className="relative border-l-2 border-purple-500/20 pl-6 ml-3 space-y-8">
          {milestones.map((ms, idx) => (
            <div key={idx} className="relative space-y-1">
              {/* marker */}
              <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border-2 border-white dark:border-gray-900 shadow-sm" />
              <span className="text-xs font-mono font-bold text-pink-500">{ms.year} REPORT:</span>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white font-display uppercase tracking-wider block">
                {ms.title}
              </h4>
              <p className="text-[11.5px] text-gray-400 leading-relaxed font-sans">{ms.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision statement */}
      <div className="p-6 rounded-2xl bg-linear-to-r from-pink-500/5 to-purple-500/5 border border-purple-500/15 text-center space-y-4">
        <Sparkles className="w-8 h-8 text-pink-500 mx-auto animate-pulse" />
        <h4 className="text-sm font-bold font-display uppercase tracking-widest text-gray-850 dark:text-white">
          Our Vision: A Semantic, Decentralized Referral Mesh
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto font-sans">
          "By late 2026, over 70% of digital intent will settle within conversational channels. We vision an internet where publishers write with modular clarity, citing genuine digital pathways that help readers progress instantly."
        </p>

        <button
          onClick={() => onNavigateTab('contact')}
          className="px-4 py-2 bg-gray-900 hover:bg-gray-850 dark:bg-white dark:text-gray-900 text-white font-semibold text-xs rounded-lg shadow-sm transition-transform cursor-pointer"
        >
          Partner With Us (Ask an Audit)
        </button>
      </div>

    </section>
  );
}
