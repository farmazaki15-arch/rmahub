import { useState } from 'react';
import { Search, Flame, Award, Cpu, BookOpen, Clock, ChevronRight, Monitor, ArrowUpRight } from 'lucide-react';
import { Post } from '../types';

interface BlogViewProps {
  posts: Post[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onReadArticle: (id: string) => void;
}

export default function BlogView({ posts, searchQuery, setSearchQuery, onReadArticle }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai-news' | 'tech-news' | 'reviews'>('all');

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const trendingSidebar = posts.filter(p => p.isTrending || p.isPopular).slice(0, 4);

  return (
    <section className="font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-gray-900 dark:text-gray-100">
      
      {/* Search and Category Toggle header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-6 mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-display tracking-tight text-gray-900 dark:text-white">
            Broadcast Authority Content Fed
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Use the category filters below to explore schemas auditing, silicon trends, and reviews.
          </p>
        </div>

        {/* Categories toggles */}
        <div className="flex flex-wrap items-center gap-1.5 self-start">
          {[
            { id: 'all', label: 'All Broadcasts' },
            { id: 'ai-news', label: 'AI News' },
            { id: 'tech-news', label: 'Tech News' },
            { id: 'reviews', label: 'Review Blueprints' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-650 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-750'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Grid Content Column (Visual Variation Card System) */}
        <div className="lg:col-span-8 space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
              <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                No Broadcast Articles Match Filter
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Try modifying your query or select 'All Broadcasts' category above.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => {
                
                // 1. Sleek neon card for AI News
                if (post.category === 'ai-news') {
                  return (
                    <div 
                      key={post.id}
                      onClick={() => onReadArticle(post.id)}
                      className="group cursor-pointer p-5 rounded-2xl border-l-[5px] border-l-pink-500 border border-gray-150/80 dark:border-gray-850 bg-white dark:bg-gray-905 flex flex-col md:flex-row gap-5 shadow-xs hover:border-pink-500/20 hover:scale-[1.005] transition-all"
                    >
                      <div className="w-full md:w-44 h-32 rounded-xl bg-gray-100 dark:bg-gray-950 overflow-hidden shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-mono font-bold text-pink-500 bg-pink-500/5 px-2 py-0.5 rounded-sm">AI NEWS ENDPOINT</span>
                            <span className="text-[10px] text-gray-400 font-mono">⏱️ {post.readingTime}</span>
                          </div>
                          <h4 className="text-md font-bold font-display text-gray-900 dark:text-white leading-snug group-hover:text-pink-500 transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-sans">{post.excerpt}</p>
                        </div>
                        <div className="text-[10.5px] text-gray-400 font-sans flex items-center justify-between">
                          <span>by {post.author.name}</span>
                          <span className="font-mono text-[9.5px]">#{post.tags?.[0] || 'AI'}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                // 2. Brutalist monospaced tech card for Tech News
                if (post.category === 'tech-news') {
                  return (
                    <div 
                      key={post.id}
                      onClick={() => onReadArticle(post.id)}
                      className="group cursor-pointer p-5 rounded-2xl border border-gray-300 dark:border-gray-750 bg-gray-50/50 dark:bg-gray-950/20 flex flex-col md:flex-row gap-5 shadow-xs hover:bg-white dark:hover:bg-gray-900 transition-all font-mono hover:scale-[1.005]"
                    >
                      <div className="w-full md:w-44 h-32 rounded-xl bg-gray-100 dark:bg-gray-950 overflow-hidden shrink-0 border border-gray-200 dark:border-gray-800">
                        <img
                          src={post.image}
                          alt={post.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[9px] font-bold text-blue-500 bg-blue-500/10 px-2 rounded-sm uppercase">CPU CORE INDEX</span>
                            <span className="text-[10px] text-gray-500">⏱️ {post.readingTime}</span>
                          </div>
                          <h4 className="text-sm font-semibold font-display tracking-tight text-gray-900 dark:text-white leading-tight group-hover:text-blue-500 py-1">
                            {post.title}
                          </h4>
                          <p className="text-[11.5px] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                        </div>
                        <div className="text-[10px] text-gray-500 flex items-center justify-between border-t border-gray-150 dark:border-gray-800 pt-1.5 mt-2">
                          <span>WRITER: {post.author.name.toUpperCase()}</span>
                          <span>DATE: {post.publishDate}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                // 3. Elegant editorial reviews review format
                return (
                  <div 
                    key={post.id}
                    onClick={() => onReadArticle(post.id)}
                    className="group cursor-pointer p-5 rounded-2xl border border-gray-150 bg-white dark:bg-gray-900 shadow-sm hover:border-purple-500/20 hover:shadow-md hover:scale-[1.005] transition-all flex flex-col md:flex-row gap-5"
                  >
                    <div className="w-full md:w-44 h-32 rounded-xl bg-gray-100 dark:bg-gray-950 overflow-hidden shrink-0 relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {post.rating && (
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-sm bg-gray-900/90 border border-white/10 text-[9px] font-mono text-emerald-400">
                          ★ {post.rating.score} RATED
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono font-bold text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded-sm">REVIEW BLUETRACK</span>
                          <span className="text-[10px] text-gray-400 font-mono">⏱️ {post.readingTime}</span>
                        </div>
                        <h4 className="text-md font-bold font-display text-gray-900 dark:text-white leading-snug group-hover:text-purple-500 transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-400 line-clamp-2 font-sans">{post.excerpt}</p>
                      </div>

                      {post.pros && (
                        <div className="text-[10.5px] text-emerald-600 dark:text-emerald-400 line-clamp-1 italic font-sans">
                          ✓ Pro Pick: {post.pros[0]}
                        </div>
                      )}

                      <div className="text-[10.5px] text-gray-400 font-sans flex items-center justify-between border-t border-gray-100 dark:border-gray-850 pt-2">
                        <span>by {post.author.name}</span>
                        <span className="font-mono text-[9.5px]">#{post.tags?.[0] || 'Reviews'}</span>
                      </div>
                    </div>
                  </div>
                );

              })}
            </div>
          )}
        </div>

        {/* Sidebar: Popular Posts Widget and Quick newsletters */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl border border-gray-150 dark:border-gray-850 bg-white dark:bg-gray-900/40 space-y-4 shadow-xs">
            <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-50 dark:border-gray-850 pb-2">
              Trending Citations Sidebar
            </h3>

            <div className="space-y-4">
              {trendingSidebar.map((post) => (
                <div 
                  key={post.id}
                  onClick={() => onReadArticle(post.id)}
                  className="group cursor-pointer flex gap-3 hover:scale-[1.01] transition-transform"
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-950 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-normal truncate group-hover:text-pink-500 transition-colors">
                      {post.title}
                    </h5>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-gray-400 mt-1">
                      <span>⏱️ {post.readingTime}</span>
                      <span>👁️ {post.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social sharing promo */}
          <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-linear-to-b from-gray-50/50 to-gray-100/50 dark:from-gray-950/20 dark:to-gray-900/20 text-center space-y-3.5">
            <span className="text-[10px] font-mono text-purple-500 uppercase font-bold tracking-widest block">
              SYNDICATE THE WORD
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-405 leading-relaxed font-sans">
              Help your peers escape traditional SEO traps. Re-share our dynamic citation blueprints on social hubs.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono font-bold leading-normal">
              <span className="p-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg hover:text-pink-500 transition-colors cursor-pointer select-none">
                #TWITTER
              </span>
              <span className="p-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-lg hover:text-purple-500 transition-colors cursor-pointer select-none">
                #TELEGRAM
              </span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
