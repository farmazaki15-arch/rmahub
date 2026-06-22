import { Sparkles, Send, Mail, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';

interface FooterProps {
  onSubscribe: (email: string) => Promise<{ success: boolean; message: string }>;
  setCurrentTab: (tab: string) => void;
  onReadArticle: (id: string) => void;
}

export default function Footer({ onSubscribe, setCurrentTab, onReadArticle }: FooterProps) {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      const res = await onSubscribe(email);
      if (res.success) {
        setSuccess(res.message);
        setEmail('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-300 font-sans mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Intro Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-pink-500 via-purple-500 to-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold font-display tracking-tight text-white">
                Farma<span className="text-pink-500">Online</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              The premier authority platform decoding Large Language Model Optimization (LLMO), conversational news citations, and advanced technical strategies that drive modern digital publishing.
            </p>
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-widest font-mono text-pink-500 font-semibold">
                Core Credence
              </span>
              <p className="text-[11px] text-gray-400 pt-1 leading-snug">
                "We don't create products. We test authority variables and cite elite pathways."
              </p>
            </div>
          </div>

          {/* Quick Nav Lists */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-semibold text-white tracking-wider font-display border-l-2 border-pink-500 pl-2">
              Media Broadcaster
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-pink-400 transition-colors cursor-pointer">
                  Main News Hub
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('blog')} className="hover:text-pink-400 transition-colors cursor-pointer">
                  AI News Grid
                </button>
              </li>
              <li>
                <button onClick={() => onReadArticle('rank-in-chatgpt')} className="hover:text-pink-400 transition-colors cursor-pointer">
                  Conversational SEO Review
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('ai-wizard')} className="hover:text-pink-500 transition-colors cursor-pointer flex items-center gap-1 font-semibold text-purple-400">
                  <span>🧠 AI Ideas Assistant</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('telemetry')} className="hover:text-pink-400 transition-colors cursor-pointer">
                  Affiliate Telemetry stats
                </button>
              </li>
            </ul>
          </div>

          {/* Popular / Recommended Articles Column */}
          <div className="space-y-3.5">
            <h3 className="text-sm font-semibold text-white tracking-wider font-display border-l-2 border-blue-500 pl-2">
              Editor's Top Picks
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <button 
                  onClick={() => onReadArticle('rank-in-chatgpt')}
                  className="hover:text-white transition-colors text-left font-medium block"
                >
                  <span className="text-pink-400 block text-[9px] font-mono leading-none mb-0.5">TRENDING • REVIEWS</span>
                  How to Rank #1 inside ChatGPT Conversational Indexers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onReadArticle('ai-news-gemini3')}
                  className="hover:text-white transition-colors text-left font-medium block"
                >
                  <span className="text-blue-400 block text-[9px] font-mono leading-none mb-0.5">NEW RELEASE</span>
                  Gemini 3.5 Live Voice API & Little Endian audio pipelines
                </button>
              </li>
            </ul>
          </div>

          {/* Leads Newsletter Form */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider font-display border-l-2 border-emerald-500 pl-2">
              Farma Digital Report
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Enter email below to claim our weekly confidential conversational ranking index checklist report.
            </p>

            {success ? (
              <div className="p-3.5 rounded-lg bg-emerald-900/45 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>{success}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-1.5 pt-1">
                <div className="flex rounded-md overflow-hidden bg-gray-800 border border-gray-700 focus-within:border-pink-500">
                  <div className="pl-3.5 flex items-center text-gray-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-xs text-white focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-4 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[9px] text-gray-500 block font-mono">
                  🔒 Zero spam. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Regulatory Affiliate Disclosure */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-[11px] text-gray-400 leading-relaxed space-y-4 font-sans">
          <p className="text-gray-500">
            <span className="font-bold text-gray-400">AFFILIATE DISCLOSURE:</span> In compliance with regional commission guidelines, please note that some of the citations, alternatives, and links featured in our reports, blog posts, and reviewing units are custom affiliate tracking referrals. Registering or purchasing packages through these pathways generates an educational commission reward for FarmaOnline, helping us support our continuous algorithmic tests without modifying our honest scoring metrics. We remain entirely independent.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs pt-4 border-t border-gray-850/50">
            <span className="font-mono text-[10px] text-gray-500">
              © 2026 FarmaOnline Media. Decoded on Gemini 3 Fullstack Run.
            </span>
            <div className="flex gap-4 text-[10px] font-mono text-gray-500">
              <a href="#home" className="hover:text-pink-500">Privacy Blueprint</a>
              <span>•</span>
              <a href="#home" className="hover:text-pink-500">Algorithmic Discs</a>
              <span>•</span>
              <a href="#home" className="hover:text-pink-500">Sitemap Indexing</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
