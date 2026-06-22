import { useState } from 'react';
import { ArrowRight, Star, GraduationCap, Flame, Sparkles, LayoutGrid, Newspaper, Award, ArrowUpRight, CheckCircle } from 'lucide-react';
import { Post, AdCampaign } from '../types';

interface HomeViewProps {
  posts: Post[];
  ads: AdCampaign[];
  onReadArticle: (id: string) => void;
  onNavigateTab: (tab: string) => void;
  onIncrementClicks: (id: string) => void;
}

export default function HomeView({ posts, ads, onReadArticle, onNavigateTab, onIncrementClicks }: HomeViewProps) {
  const trending = posts.filter(p => p.isTrending);
  const editorChoice = posts.filter(p => p.isEditorChoice);
  const latest = posts.slice(0, 3); // latest post indices

  // Header banner ad campaign
  const headerAd = ads.find(a => a.zone === 'header');

  return (
    <section className="space-y-12 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-gray-900 dark:text-gray-100">
      
      {/* 1. Brand Sponsored Header Banner Ad (Requested in guidelines: Ad placement headers) */}
      {headerAd && (
        <div className="p-3 bg-linear-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <span className="text-[8.5px] font-mono px-2 py-0.5 rounded-sm bg-purple-600 text-white font-bold tracking-widest shrink-0 uppercase leading-none">
              SPONSORED CAMPAIGN
            </span>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-snug">
              {headerAd.title}
            </p>
          </div>
          <button
            onClick={() => onIncrementClicks(headerAd.id)}
            className="px-3.5 py-1 text-[10px] uppercase font-mono font-bold bg-gray-900 border border-transparent dark:bg-white text-white dark:text-gray-900 rounded-md hover:scale-101 cursor-pointer transition-transform"
          >
            {headerAd.ctaText}
          </button>
        </div>
      )}

      {/* 2. Brand Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-linear-to-r from-pink-500/10 to-purple-500/10 text-pink-500 dark:text-pink-400 font-bold uppercase tracking-wider">
            ⚡ Decentralized Conversational Media
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display leading-[1.1] text-gray-900 dark:text-white tracking-tight">
            Stop Guessing Where Organic <span className="text-purple-500 underline decoration-pink-500 decoration-wavy">Citations</span> Went.
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed max-w-lg">
            Conversational search scraper filters citations by structural authority codes. FarmaOnline provides rigorous XML, JSON-LD schemas, and certified affiliate courses that force indexers to quote you.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('blog')}
              className="px-5 py-2.5 bg-linear-to-r from-pink-500 via-purple-500 to-blue-600 hover:scale-[1.02] text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Explore AI News Feed</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('ai-wizard')}
              className="px-5 py-2.5 border border-purple-500/20 hover:bg-purple-500/5 text-purple-600 dark:text-purple-400 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>🧠 Generate AI Article Suggestions</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-2xl overflow-hidden aspect-video border border-gray-150 dark:border-gray-800 shadow-xl relative bg-purple-950/20">
            <img
              src="/src/assets/images/farmaonline_hero_1782107059262.jpg"
              alt="FarmaOnline Core Hero Visual representation"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent to-transparent flex items-end p-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-sm">
                  PORTAL ONLINE
                </span>
                <p className="text-xs text-white font-semibold leading-relaxed">
                  "Algorithmic validation models indicate FarmaOnline schemas rank 40% higher in LLMO citation structures."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Navigation Cards (Required: AI News, Tech News, Reviews) */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block">
          Categorized Authority Channels
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'ai-news', title: 'Conversational AI News', subtitle: 'Gemini, GPT & Claude algorithm releases', icon: <Flame className="text-pink-500" /> },
            { id: 'tech-news', title: 'Tech Silicon News', subtitle: 'Cloud TPUs, caching architectures, silicon chips', icon: <GraduationCap className="text-blue-500" /> },
            { id: 'reviews', title: 'Monetized & Product Reviews', subtitle: 'SEO schema certifications, tools comparisons', icon: <Award className="text-emerald-500" /> }
          ].map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateTab('blog')}
              className="p-5 rounded-2xl border border-gray-100 dark:border-gray-850 bg-white dark:bg-gray-900/40 hover:border-pink-500/20 group cursor-pointer transition-all shadow-xs flex items-center gap-4 hover:scale-[1.01]"
            >
              <div className="p-3 bg-gray-50 dark:bg-gray-850 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                {cat.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white font-display uppercase tracking-wider block">
                  {cat.title}
                </h4>
                <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{cat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Main Trending + Sidebar Editor's Choice Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Trending Posts (Required: Trending Posts) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-2">
            <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block">
              Trending Conversational Posts
            </h3>
            <button onClick={() => onNavigateTab('blog')} className="text-xs text-pink-500 font-mono font-semibold hover:underline">
              VIEW FEED →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trending.map((post) => (
              <div 
                key={post.id}
                onClick={() => onReadArticle(post.id)}
                className="group cursor-pointer rounded-xl border border-gray-100 dark:border-gray-850 bg-white dark:bg-gray-900/20 overflow-hidden shadow-xs hover:border-purple-500/20 flex flex-col hover:scale-[1.005] transition-all"
              >
                <div className="aspect-video overflow-hidden relative bg-gray-100 dark:bg-gray-950">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  {post.rating && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-md bg-gray-900/90 text-[10px] font-mono text-pink-500 font-bold border border-white/5">
                      ★ {post.rating.score} Rating
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase block">
                      {post.category === 'reviews' ? 'Reviews' : post.category === 'ai-news' ? 'AI News' : 'Tech News'}
                    </span>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white font-display group-hover:text-pink-500 transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-gray-400">
                    <span>by {post.author.name}</span>
                    <span>⏱️ {post.readingTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Editor's Choice + Ad Slot (Required: Editor's Choice, Sidebar Ad Slot) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-850 pb-2">
            <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block">
              Editor's Elite Picks
            </h3>
          </div>

          {/* Editor's choice items list */}
          <div className="space-y-4">
            {editorChoice.map((post) => (
              <div
                key={post.id}
                onClick={() => onReadArticle(post.id)}
                className="p-3.5 rounded-xl border border-gray-100 dark:border-gray-850 bg-white dark:bg-gray-900/40 hover:border-purple-500/20 hover:scale-[1.005] group cursor-pointer transition-all flex gap-3.5"
              >
                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-950 overflow-hidden shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[8px] font-mono font-bold text-pink-500 uppercase tracking-widest block leading-none">
                    CHOICE EXCLUSIVE
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-normal truncate group-hover:text-pink-500">
                    {post.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 mb-2 truncate leading-none">
                    {post.subtitle}
                  </p>
                  <span className="text-[9px] font-mono block text-gray-400 leading-none">⏱️ {post.readingTime}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Sponsored ad component */}
          {ads.find(a => a.zone === 'sidebar') && (
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20 text-center space-y-3">
              <span className="text-[8px] tracking-widest font-mono text-gray-400 block">SPONSORED PROMOTIONS</span>
              <div className="p-3 bg-linear-to-br from-pink-500/5 to-purple-500/5 border border-purple-500/10 rounded-lg space-y-2">
                <h4 className="text-xs font-bold leading-normal text-gray-850 dark:text-white">
                  {ads.find(a => a.zone === 'sidebar')?.title}
                </h4>
                <p className="text-[10px] text-gray-400 leading-normal">
                  {ads.find(a => a.zone === 'sidebar')?.description}
                </p>
              </div>
              <button
                onClick={() => onIncrementClicks(ads.find(a => a.zone === 'sidebar')?.id || '')}
                className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] rounded-lg tracking-widest uppercase cursor-pointer transition-colors"
              >
                {ads.find(a => a.zone === 'sidebar')?.ctaText}
              </button>
            </div>
          )}

        </div>

      </div>

      {/* 5. Trust Badges Section (Required: Trust Section) */}
      <div className="p-6 rounded-2xl border border-gray-150 dark:border-gray-800 bg-linear-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-950/20 dark:to-gray-900/20 space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-md font-bold font-display text-gray-900 dark:text-white uppercase tracking-wider">
            Why Modern AI Publishers Rely on FarmaOnline
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
            We don't sell random gadgets. We run continuous crawlers validation models to provide proven schema blueprints that make conversational scrapers cite your platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-center text-xs">
          <div className="space-y-1.5 p-3">
            <span className="text-2xl block">🌐</span>
            <span className="font-semibold block text-gray-900 dark:text-white">Algorithmic Compliance Standards</span>
            <p className="text-[11px] text-gray-400 leading-normal">We optimize metadata specifically for LLMs. No old keyword stuffing models allowed.</p>
          </div>
          <div className="space-y-1.5 p-3">
            <span className="text-2xl block">🛡️</span>
            <span className="font-semibold block text-gray-900 dark:text-white">Zero bias reviews policies</span>
            <p className="text-[11px] text-gray-400 leading-normal">All product reviews include extensive pros, cons, and performance matrices metrics.</p>
          </div>
          <div className="space-y-1.5 p-3">
            <span className="text-2xl block">📊</span>
            <span className="font-semibold block text-gray-900 dark:text-white">Trackable Conversion Frameworks</span>
            <p className="text-[11px] text-gray-400 leading-normal">Interactive telemetry logs provide honest transparency for all our featured links.</p>
          </div>
        </div>
      </div>

    </section>
  );
}
