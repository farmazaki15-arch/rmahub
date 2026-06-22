import { useState } from 'react';
import { Star, ShieldCheck, Award, AlertTriangle, ArrowUpRight, HelpCircle, Flame, Target } from 'lucide-react';
import { Post } from '../types';

interface ReviewsViewProps {
  posts: Post[];
  onReadArticle: (id: string) => void;
  onIncrementClicks: (id: string) => void;
}

export default function ReviewsView({ posts, onReadArticle, onIncrementClicks }: ReviewsViewProps) {
  const reviews = posts.filter(p => p.category === 'reviews');
  const [filterRating, setFilterRating] = useState<number>(0);

  const filteredReviews = reviews.filter(r => {
    if (!r.rating) return false;
    return r.rating.score >= filterRating;
  });

  return (
    <section className="font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-gray-900 dark:text-gray-100 space-y-8">
      
      {/* Title */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
            MONETIZATION DECK
          </span>
          <h1 className="text-3xl font-bold font-display tracking-tight text-gray-900 dark:text-white mt-1.5">
            Reviews & Conversion Blueprints
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Impartial scoring, pros vs cons checklists, and affiliate resources audited by FarmaOnline examiners.
          </p>
        </div>

        {/* Rating score slider */}
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-850 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
          <span className="text-[10px] font-mono text-gray-400 uppercase font-bold text-nowrap">Filter Rating Score:</span>
          <div className="flex bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg text-xs leading-none">
            {[0, 8.0, 9.0, 9.5].map((score) => (
              <button
                key={score}
                onClick={() => setFilterRating(score)}
                className={`px-2.5 py-1 rounded-md font-mono ${
                  filterRating === score 
                    ? 'bg-emerald-500 text-white font-bold' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {score === 0 ? 'All' : `>${score}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredReviews.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-905 overflow-hidden shadow-sm flex flex-col justify-between hover:border-emerald-500/20 hover:scale-[1.005] group transition-all"
          >
            <div className="space-y-4">
              {/* Product reviewer image block */}
              <div className="aspect-video bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                />
                
                {post.rating && (
                  <div className="absolute top-4 right-4 bg-gray-900/95 backdrop-blur-md border border-white/10 p-3 rounded-xl font-mono text-center shadow-lg">
                    <span className="text-[8px] text-gray-400 block tracking-widest font-bold">RATING</span>
                    <span className="text-xl font-extrabold text-pink-500 block leading-tight">{post.rating.score}</span>
                    <span className="text-[9px] text-gray-500 uppercase font-semibold">★ CLASS A</span>
                  </div>
                )}
              </div>

              {/* Body summary details */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>VERIFIED AFFILIATE REVIEW</span>
                </div>

                <h3 
                  onClick={() => onReadArticle(post.id)}
                  className="text-lg font-bold font-display text-gray-900 dark:text-white leading-snug hover:text-emerald-500 cursor-pointer transition-colors"
                >
                  {post.title}
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* specifications short snippet */}
                {post.specifications && (
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400 bg-gray-50 dark:bg-gray-850 p-2.5 rounded-lg border border-gray-100 dark:border-gray-800 leading-none">
                    <div>
                      <span className="text-gray-500 block">PLATFORM:</span>
                      <span className="text-gray-800 dark:text-gray-200 uppercase truncate block font-bold">{post.specifications[0]?.value}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">KEY TARGET:</span>
                      <span className="text-gray-800 dark:text-gray-200 uppercase truncate block font-bold">{post.specifications[5]?.value || 'SEO Masters'}</span>
                    </div>
                  </div>
                )}

                {/* Quick Pros */}
                {post.pros && (
                  <div className="pt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1 font-sans">
                    <span className="text-[9px] font-bold font-mono uppercase text-gray-400">Proven Strengths:</span>
                    <li className="list-none flex gap-1.5 items-start">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span className="line-clamp-1">{post.pros[0]}</span>
                    </li>
                  </div>
                )}
              </div>
            </div>

            {/* CTA action bottom bar (triggers click telemetry simulation) */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-850/20 flex items-center justify-between gap-3 text-xs">
              <span 
                onClick={() => onReadArticle(post.id)}
                className="font-mono text-[9.5px] font-bold text-gray-400 hover:text-pink-500 cursor-pointer flex items-center gap-1 shrink-0"
              >
                <span>READ FULL VERDICT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>

              {post.affiliateLink && (
                <button
                  onClick={() => onIncrementClicks(post.id)}
                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 font-bold text-[10px] text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Access discount Partner Portal</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="p-6 rounded-xl border border-gray-150 dark:border-gray-800 bg-linear-to-r from-emerald-50/10 to-teal-50/10 dark:from-emerald-950/5 dark:to-teal-905 flex items-center gap-4">
        <div className="p-3.5 bg-emerald-500/10 rounded-xl shrink-0">
          <Award className="w-7 h-7 text-emerald-500" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold font-display uppercase tracking-widest text-emerald-500 leading-none">
            Farma-Labs Citation Trust Protocol In Effect
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed font-sans max-w-2xl">
            Our review algorithms remain 100% transparent. FarmaOnline does not take sponsored placements to modify review score breakdown values. Clicks generate tracked referral rewards which we log in-dash automatically.
          </p>
        </div>
      </div>

    </section>
  );
}
