import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, ChevronDown, ChevronUp, Star, Award, Shield, AlertTriangle, ExternalLink, ThumbsUp, Heart, Share2, Clipboard } from 'lucide-react';
import { Post } from '../types';

interface ReaderViewProps {
  post: Post;
  onBack: () => void;
  onIncrementClicks: (serviceId: string) => void;
  onLikePost: (id: string) => void;
  likedPosts: string[];
}

export default function ReaderView({ post, onBack, onIncrementClicks, onLikePost, likedPosts }: ReaderViewProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [comparisonMetric, setComparisonMetric] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  const isLiked = likedPosts.includes(post.id);

  // Schema Markup Microdata Simulation (SEO compliance requested in the prompt)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "image": [post.image],
    "datePublished": `${post.publishDate}T09:00:00Z`,
    "author": [{
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    }]
  };

  const handleCopyShortlink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/article/${post.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scoreColor = (score: number) => {
    if (score >= 9.0) return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 7.5) return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
  };

  const isReview = post.category === 'reviews';

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 font-sans text-gray-900 dark:text-gray-100 animate-fade-in space-y-6">
      
      {/* Back button and Meta header bar */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs hover:text-pink-500 text-gray-500 font-mono font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO POSTS</span>
        </button>

        <span className="text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono px-2 py-0.5 rounded-sm font-semibold uppercase">
          {post.category === 'reviews' ? 'Product Reviews' : post.category === 'ai-news' ? 'AI News' : 'Tech News'}
        </span>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display leading-tight text-gray-900 dark:text-white tracking-tight">
          {post.title}
        </h1>
        <p className="text-sm text-gray-550 dark:text-gray-400 font-sans leading-relaxed">
          {post.subtitle}
        </p>

        {/* Metadata info */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          
          {/* Author avatar and role */}
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-750 object-cover"
            />
            <div className="text-xs">
              <span className="font-semibold block text-gray-900 dark:text-white">
                {post.author.name}
              </span>
              <span className="text-[10px] text-gray-400 block">
                {post.author.role}
              </span>
            </div>
          </div>

          {/* Published metrics */}
          <div className="flex items-center gap-4 text-[11px] text-gray-400 font-mono">
            <span>📅 {post.publishDate}</span>
            <span>⏱️ {post.readingTime}</span>
            <span className="hidden sm:inline">👁️ {post.views} Scrape Clicks</span>
          </div>

        </div>
      </div>

      {/* Featured Banner Image */}
      <div className="rounded-2xl overflow-hidden aspect-video border border-gray-150 dark:border-gray-850 relative group bg-gray-100 dark:bg-gray-950">
        <img
          src={post.image}
          alt={post.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
        />
        {isReview && post.rating && (
          <div className="absolute top-4 right-4 p-3 rounded-xl bg-gray-900/95 backdrop-blur-md border border-white/10 text-center shadow-lg font-mono text-white flex flex-col items-center justify-center">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest leading-none font-bold block mb-1">SCORE</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-bold text-pink-500">{post.rating.score}</span>
              <span className="text-[10px] text-gray-400">/10</span>
            </div>
            {/* simple star layout */}
            <div className="flex items-center mt-1 text-amber-400 gap-0.5 scale-90">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-current" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RETAILER MONETIZATION BAR: Affiliate anchor triggers payout simulation */}
      {post.affiliateLink && (
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-855 bg-linear-to-r from-pink-50/20 to-purple-50/20 dark:from-pink-950/15 dark:to-purple-950/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5 max-w-lg">
            <span className="text-[9px] font-mono font-bold text-pink-500 uppercase tracking-widest block">
              OFFICIAL PARTNER ACCESS LINK
            </span>
            <p className="text-xs font-semibold text-gray-850 dark:text-gray-200">
              Claim our authorized FarmaOnline credentialed bonus code below for extreme savings.
            </p>
          </div>
          
          <button
            onClick={() => onIncrementClicks(post.id)}
            className="px-5 py-2.5 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer transition-all shrink-0 flex items-center gap-1.5 self-end sm:self-auto"
          >
            <span>{post.affiliateLabel || "Access External Discount Link"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Core Body text content */}
      <div className="prose max-w-none text-sm leading-relaxed text-gray-700 dark:text-gray-300 font-sans space-y-4 pt-2">
        <p className="text-md font-semibold text-gray-800 dark:text-gray-200 border-l-4 border-purple-500 pl-4 py-1 italic">
          "The biggest shift in digital discoverability is conversational citations. Search engines aren’t parsing for links anymore; they are looking for logical structural matches."
        </p>

        {/* Dynamic formatting for rich lists and bodies */}
        <div className="whitespace-pre-wrap leading-relaxed space-y-4">
          {post.content}
        </div>
      </div>

      {/* =======================================================
          MONETIZATION ENGINE (EXCLUSIVELY FOR REVIEWS PRODUCTS)
          - Star Breakdowns, Pros & Cons, Specs Table, Alternative options
          ======================================================= */}
      {isReview && (
        <div className="space-y-8 pt-8 border-t border-gray-100 dark:border-gray-850">
          
          {/* Section: Ratings & Star breakdown */}
          {post.rating && (
            <div className="p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/40">
              <h3 className="text-sm font-semibold font-display mb-4 text-gray-900 dark:text-white flex items-center gap-1.5">
                <Star className="w-4.5 h-4.5 text-pink-500 fill-current" />
                <span>Conversational Scoring Criteria</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Score indicators */}
                <div className="space-y-3.5">
                  {[
                    { label: 'Algorithmic Usefulness', score: post.rating.breakdown.usefulness },
                    { label: 'Information Density & Value', score: post.rating.breakdown.value },
                    { label: 'Integration Simplicity', score: post.rating.breakdown.easeOfUse },
                    { label: 'Indexer Query Speeds', score: post.rating.breakdown.performance }
                  ].map((metric, index) => (
                    <div key={index} className="text-xs space-y-1">
                      <div className="flex items-center justify-between text-gray-700 dark:text-gray-400">
                        <span>{metric.label}</span>
                        <span className="font-mono font-bold">{metric.score * 10}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-linear-to-r from-pink-500 to-purple-500 rounded-full" 
                          style={{ width: `${metric.score * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verdict Summary block */}
                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-purple-500 font-bold tracking-wider block uppercase mb-1">
                      Farma Verdict Highlight
                    </span>
                    <p className="text-xs leading-relaxed text-gray-650 dark:text-gray-350 font-sans whitespace-pre-wrap">
                      {post.verdict}
                    </p>
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono mt-3 text-right">
                    Verified review standard • Early 2026 Indexed
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pros vs Cons Boxes */}
          {(post.pros || post.cons) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pros */}
              <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 space-y-2">
                <h4 className="text-xs font-mono font-bold text-emerald-500 uppercase flex items-center gap-1.5 border-b border-emerald-500/10 pb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Citations Amplifiers (PROS)</span>
                </h4>
                <ul className="text-xs text-gray-650 dark:text-gray-350 space-y-2 list-none p-0 m-0">
                  {post.pros?.map((pro, i) => (
                    <li key={i} className="flex gap-2 items-start leading-snug">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/5 space-y-2">
                <h4 className="text-xs font-mono font-bold text-rose-500 uppercase flex items-center gap-1.5 border-b border-rose-500/10 pb-2">
                  <XCircle className="w-4 h-4" />
                  <span>Core Frictions (CONS)</span>
                </h4>
                <ul className="text-xs text-gray-650 dark:text-gray-350 space-y-2 list-none p-0 m-0">
                  {post.cons?.map((con, i) => (
                    <li key={i} className="flex gap-2 items-start leading-snug">
                      <span className="text-rose-550 font-bold shrink-0">✗</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Specifications Structured Table */}
          {post.specifications && (
            <div className="p-5 rounded-xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-905">
              <h3 className="text-sm font-semibold font-display mb-3 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-850 pb-2.5">
                Technical Specifications & Structure Data
              </h3>
              <div className="overflow-x-auto text-[11px] font-mono text-gray-600 dark:text-gray-300">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400">
                      <th className="py-2.5 uppercase text-[9px] font-bold">Metadata Label</th>
                      <th className="py-2.5 uppercase text-[9px] font-bold">Verified Specification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {post.specifications.map((spec, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                        <td className="py-2.5 pr-4 text-purple-600 dark:text-purple-400 font-semibold">{spec.label}</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-100 font-medium">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Feature comparison toggle and section */}
          {post.featuresCompared && (
            <div className="p-5 rounded-xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-905 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-850 pb-3">
                <h3 className="text-sm font-semibold font-display text-gray-900 dark:text-white">
                  Head-to-Head Conversational Index Comparison Matrix
                </h3>
                
                {/* Simple toggle simulator */}
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 text-[10px] font-mono leading-none">
                  <button 
                    onClick={() => setComparisonMetric('all')}
                    className={`px-2.5 py-1 rounded-md ${comparisonMetric === 'all' ? 'bg-pink-500 text-white font-bold' : 'text-gray-500'}`}
                  >
                    View All
                  </button>
                  <button 
                    onClick={() => setComparisonMetric('citations')}
                    className={`px-2.5 py-1 rounded-md ${comparisonMetric === 'citations' ? 'bg-pink-500 text-white font-bold' : 'text-gray-500'}`}
                  >
                    Citations Only
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto text-[11.5px]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-150 dark:border-gray-800 text-gray-400 font-mono text-[9px] uppercase">
                      <th className="py-2">Operational Feature</th>
                      <th className="py-2 text-pink-500 font-bold">This Course/Service</th>
                      <th className="py-2">Standard course</th>
                      <th className="py-2">Legacy Textbook</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-sans">
                    {post.featuresCompared
                      .filter(f => comparisonMetric === 'all' || f.feature.toLowerCase().includes('schema') || f.feature.toLowerCase().includes('citation'))
                      .map((feat, index) => (
                        <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10">
                          <td className="py-3 font-semibold text-gray-850 dark:text-white max-w-xs">{feat.feature}</td>
                          <td className="py-3 text-pink-600 dark:text-pink-400 font-bold bg-pink-500/5 px-2 rounded-sm">{feat.thisProduct}</td>
                          <td className="py-3 text-gray-500">{feat.competitorA}</td>
                          <td className="py-3 text-gray-500">{feat.competitorB}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Alternatives & Alternates Section */}
          {post.alternatives && (
            <div className="space-y-3.5">
              <h3 className="text-sm font-semibold font-display text-gray-900 dark:text-white">
                Best Verified Alternatives to Consider
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.alternatives.map((alt, index) => (
                  <div key={index} className="p-4 rounded-xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900/50 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-gray-850 dark:text-white font-display">
                          {alt.name}
                        </h4>
                        <div className="flex items-center gap-0.5 text-amber-400 text-[10px] font-mono leading-none">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{alt.rating}/10</span>
                        </div>
                      </div>
                      <p className="text-[11.5px] text-gray-500 mt-1 leading-snug">
                        {alt.snippet}
                      </p>
                    </div>

                    <button
                      onClick={() => onIncrementClicks('alternative-credits')}
                      className="w-full py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white text-[10px] font-mono font-bold rounded-md block text-center cursor-pointer transition-colors"
                    >
                      {alt.ctaText}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          {post.faqs && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold font-display text-gray-900 dark:text-white">
                Frequently Asked Inquiries (FAQ)
              </h3>
              
              <div className="space-y-2">
                {post.faqs.map((faq, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div 
                      key={index}
                      className="border border-gray-150 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900/40"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="w-full p-3 text-left font-bold text-xs text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-850 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-pink-500" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>
                      
                      {isOpen && (
                        <p className="p-3 bg-gray-50/50 dark:bg-gray-950/20 text-[11px] text-gray-600 dark:text-gray-400 leading-normal border-t border-gray-100 dark:border-gray-850 font-sans whitespace-pre-wrap">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Trust Badges and Compliance Signoff footer */}
      <div className="pt-8 border-t border-gray-100 dark:border-gray-850 space-y-4">
        
        {/* Affiliate Disclosure Notice */}
        {post.affiliateDisclosure && (
          <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/10 text-[10px] text-gray-500 hover:text-gray-600 font-sans flex items-start gap-2 max-w-3xl leading-relaxed">
            <AlertTriangle className="w-4.5 h-4.5 text-amber-500 shrink-0" />
            <span>{post.affiliateDisclosure}</span>
          </div>
        )}

        {/* Action share metrics buttons */}
        <div className="flex items-center justify-between gap-4 py-2 border-y border-gray-100 dark:border-gray-850 text-xs">
          <div className="flex items-center gap-1.5 text-gray-400 font-mono text-[10px]">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>VERIFIED BY FARMA-LABS TRUST INDEX SPEC</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <button
              onClick={() => onLikePost(post.id)}
              className={`p-1.5 px-3 rounded-md flex items-center gap-1 border cursor-pointer transition-colors ${
                isLiked 
                  ? 'bg-pink-500/10 text-pink-600 border-pink-500/20' 
                  : 'border-gray-200 dark:border-gray-850 hover:bg-gray-100 text-gray-400'
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-pink-500' : ''}`} />
              <span>{post.likes + (isLiked ? 1 : 0)} Likes</span>
            </button>

            <button
              onClick={handleCopyShortlink}
              className="p-1.5 px-3 rounded-md border border-gray-200 dark:border-gray-850 hover:bg-gray-100 text-gray-400 dark:hover:bg-gray-800 inline-flex items-center gap-1 cursor-pointer"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Share link'}</span>
            </button>
          </div>
        </div>

        {/* JSON-LD Schema markup block visualizer to illustrate authority SEO */}
        <div className="p-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-[9px] text-gray-400 overflow-x-auto space-y-1">
          <span className="font-bold text-gray-500 uppercase flex items-center gap-1">
            <Clipboard className="w-3 h-3 text-pink-500" />
            <span>SEO Automated json-ld Schema (Verified citation spec)</span>
          </span>
          <pre className="text-[8.5px] text-pink-500 font-mono leading-tight whitespace-pre">
            {JSON.stringify(schemaMarkup, null, 2)}
          </pre>
        </div>

      </div>

    </article>
  );
}
