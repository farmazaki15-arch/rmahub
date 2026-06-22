import React, { useState } from 'react';
import { Sparkles, BrainCircuit, ArrowRight, CheckCircle, RefreshCcw, Send, Clock, DollarSign, ExternalLink, Heart, Eye } from 'lucide-react';

interface AIWizardProps {
  onAddCustomPost: (post: any) => void;
  onIncrementClicks: (serviceId: string) => void;
  totalEarnings: number;
}

export default function AIWizard({ onAddCustomPost, onIncrementClicks, totalEarnings }: AIWizardProps) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('AI News');
  const [focusType, setFocusType] = useState('comprehensive analysis');
  const [promptIdea, setPromptIdea] = useState('');
  const [useHighThinking, setUseHighThinking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Quick prompt presets
  const presets = [
    { kw: 'ChatGPT SEO Guide', cat: 'Product Reviews', style: 'affiliate-focused review' },
    { kw: 'Gemini 3.5 Live Voice', cat: 'AI News', style: 'technical blueprint' },
    { kw: 'TPU Caching Clusters', cat: 'Tech News', style: 'comprehensive analysis' }
  ];

  const handleApplyPreset = (p: any) => {
    setKeyword(p.kw);
    setCategory(p.cat);
    setFocusType(p.style);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    
    setLoading(true);
    setResult(null);
    setAdded(false);
    setLiked(false);
    
    // Cycle beautiful, reassuring loading messages
    const loadingMessages = [
      "Contacting Google AI Studio Server Context...",
      useHighThinking 
        ? "🧠 Initializing gemini-3.1-pro-preview with HIGH reasoning level. This processes deep logical connections, please stand by..."
        : "⚡ Routing request to gemini-3.5-flash for maximum responsive turnaround...",
      "Structuring proper schema guidelines and formatting metadata payload...",
      "Auto-categorizing paragraph components and injecting high-converting affiliate locks...",
      "Final reviews complete! Rendering custom draft layout now..."
    ];

    setLoadingStep(0);
    const stepTimer = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, useHighThinking ? 3500 : 1500);

    try {
      const response = await fetch('/api/ai/suggestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword,
          category,
          focusType,
          promptIdea,
          useHighThinking
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(stepTimer);
      setLoading(false);
    }
  };

  const handleAddToBlog = () => {
    if (!result) return;
    const formattedPost = {
      id: `ai-gen-${Date.now()}`,
      title: result.title,
      subtitle: `AI Generated Blueprint: Optimized for ${keyword}`,
      excerpt: result.outline ? result.outline.slice(0, 160) + "..." : result.title,
      content: result.content || "",
      category: category === 'Product Reviews' ? 'reviews' : category === 'AI News' ? 'ai-news' : 'tech-news',
      image: '/src/assets/images/farmaonline_hero_1782107059262.jpg',
      publishDate: new Date().toISOString().split('T')[0],
      readingTime: result.readingTime || '5 min read',
      author: {
        name: 'Farma AI Editor',
        role: `Gemini ${useHighThinking ? '3.1 Pro' : '3.5 Flash'} Content Oracle`,
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80'
      },
      tags: result.tags || [keyword, 'AI Generated'],
      views: 742,
      likes: 42,
      // Default placeholder reviews properties if reviews category was chosen
      ...(category === 'Product Reviews' ? {
        rating: { score: 9.3, breakdown: { usefulness: 9.5, value: 9.1, easeOfUse: 9.4, performance: 9.2 } },
        pros: ['Fully auto-categorized by Gemini', 'Direct, structured schema indexing targets Included'],
        cons: ['Generated context, requires human proofreading'],
        specifications: [{ label: 'Algorithm Engine', value: useHighThinking ? 'Gemini 3.1 Pro' : 'Gemini 3.5' }],
        verdict: 'An incredible starting point generated via conversational AI automation.',
        affiliateDisclosure: 'Disclosure: Automated post containing custom educational commissions vectors.',
        affiliateLink: 'https://farmaonline.academy/chatgpt-seo-masterclass',
        affiliateLabel: 'Enroll in Recommended ChatGPT SEO Course',
      } : {})
    };

    onAddCustomPost(formattedPost);
    setAdded(true);
  };

  return (
    <section className="font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-gray-900 dark:text-gray-100">
      
      {/* Title */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-5 mb-8">
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
          LIVE LAB SANDBOX
        </span>
        <h1 className="text-3xl font-bold font-display tracking-tight text-gray-900 dark:text-white mt-1.5 flex items-center gap-2">
          <span>🧠 Farma AI Authority Ideas Wizard</span>
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Instruct our server-side model to generate SEO blueprints, draft content modules, suggest schema specifications, and auto-inject affiliate referral layers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input panel */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleGenerate} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-gray-850 dark:text-gray-200 font-display flex items-center gap-2 border-b border-gray-50 dark:border-gray-850 pb-2.5">
              <span>Wizard Controls</span>
            </h3>

            {/* Keyword */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase font-semibold">
                Define Focus Keyword or Concept (e.g. ChatGPT SEO Course)
              </label>
              <input
                type="text"
                required
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Secrets of ranking inside Perplexity search"
                className="w-full text-xs bg-gray-50 dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-3 py-2 rounded-lg focus:outline-hidden focus:border-pink-500 transition-colors"
              />
            </div>

            {/* Categories & Styles */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase font-semibold">
                  Destination Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs bg-gray-50 dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-2.5 py-1.5 rounded-lg focus:outline-hidden"
                >
                  <option value="AI News">AI News</option>
                  <option value="Tech News">Tech News</option>
                  <option value="Product Reviews">Product Reviews</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase font-semibold">
                  Writing Focus Style
                </label>
                <select
                  value={focusType}
                  onChange={(e) => setFocusType(e.target.value)}
                  className="w-full text-xs bg-gray-50 dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-2.5 py-1.5 rounded-lg focus:outline-hidden"
                >
                  <option value="comprehensive analysis">Comprehensive analysis</option>
                  <option value="highly converting review">Affiliate review hooks</option>
                  <option value="rapid code tutorial">Code & technical focus</option>
                  <option value="schema optimization">Schema XML specs blueprint</option>
                </select>
              </div>
            </div>

            {/* Custom context prompt */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase font-semibold">
                Optional Context Prompt / Idea Notes
              </label>
              <textarea
                value={promptIdea}
                onChange={(e) => setPromptIdea(e.target.value)}
                rows={3}
                placeholder="Mention that XML schemas and structured breadcrumbs are verified citation hooks in GPT scraper units."
                className="w-full text-xs bg-gray-50 dark:bg-gray-850 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 px-3 py-2 rounded-lg focus:outline-hidden"
              />
            </div>

            {/* HIGH THINKING MODE SELECTION (Prompt feature requirement) */}
            <div className="p-3.5 rounded-xl border border-purple-500/20 bg-linear-to-r from-purple-500/5 to-pink-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-purple-500 shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-gray-850 dark:text-white block leading-tight">
                      Enable High Thinking Mode
                    </span>
                    <span className="text-[10px] text-gray-400 block font-mono">
                      Runs gemini-3.1-pro-preview with Deep Reasoning.
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={useHighThinking}
                    onChange={(e) => setUseHighThinking(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 dark:bg-gray-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <p className="text-[9px] text-gray-400 leading-normal">
                💡 High Thinking Mode activates deep conceptual tracking, generating highly comprehensive layouts and advanced specifications. Takes slightly longer to compile.
              </p>
            </div>

            {/* Launch button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-linear-to-r from-pink-500 via-purple-500 to-blue-600 hover:scale-[1.01] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? "Constructing Framework..." : "Execute AI Strategy Engine"}</span>
            </button>
          </form>

          {/* Preset Buttons */}
          <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-950/20">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase block mb-2">
              Preset Concept Templates
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="px-2.5 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-750 dark:text-gray-350 transition-colors cursor-pointer"
                >
                  {preset.kw} ({preset.cat})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-7">
          
          {loading && (
            <div className="p-10 rounded-2xl border border-dashed border-purple-500/30 bg-purple-500/5 text-center flex flex-col items-center justify-center min-h-[380px] animate-pulse">
              <BrainCircuit className="w-14 h-14 text-purple-500 animate-spin-slow mb-4" />
              <h3 className="text-md font-bold font-display text-gray-850 dark:text-white">
                Farma AI Oracle In Action
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mt-3 leading-relaxed font-sans transition-all">
                {["Contacting Google AI Studio Server Context...",
                  "🧠 Initializing gemini-3.1-pro-preview with HIGH reasoning level. This processes deep logical connections, please stand by...",
                  "Structuring proper schema guidelines and formatting metadata payload...",
                  "Auto-categorizing paragraph components and injecting high-converting affiliate locks...",
                  "Final reviews complete! Rendering custom draft layout now..."][loadingStep]}
              </p>
              <div className="mt-8 flex items-center gap-1.5 justify-center">
                <span className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce"></span>
                <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="p-10 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/10 text-center flex flex-col items-center justify-center min-h-[380px]">
              <Sparkles className="w-12 h-12 text-gray-300 dark:text-gray-650 mb-3" />
              <h3 className="text-sm font-semibold font-display text-gray-500 dark:text-gray-400">
                Awaiting Content Directives
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mt-1.5 leading-relaxed font-sans">
                Set focus keywords on the left and engage the Gemini neural pipelines to forge beautiful draft blueprints.
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="p-6 rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg space-y-6 animate-fade-in">
              
              {/* Header result */}
              <div className="flex flex-col gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-sm bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-mono text-[10px] font-bold">
                    {result.category || category}
                  </span>
                  <span className="font-mono text-[10px] text-gray-400">
                    ⏱️ {result.readingTime || "6 min read"}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold font-display leading-tight text-gray-900 dark:text-white">
                  {result.title}
                </h2>

                <div className="flex items-center gap-2 mt-1">
                  {result.tags?.map((tag: string, idx: number) => (
                    <span key={idx} className="text-[10px] bg-gray-150 dark:bg-gray-800 text-gray-550 dark:text-gray-400 px-2 py-0.5 rounded-md font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Outline / Summary box */}
              {result.outline && (
                <div className="p-4 rounded-xl bg-purple-50/20 dark:bg-purple-950/10 border border-purple-500/15">
                  <h4 className="text-xs font-mono font-bold uppercase text-purple-600 dark:text-purple-400 mb-2">
                    Algorithmic Structuring Outline
                  </h4>
                  <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400 font-sans leading-relaxed whitespace-pre-wrap">
                    {result.outline}
                  </div>
                </div>
              )}

              {/* Main draft preview */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-gray-400">
                  Dynamic Draft Preview
                </h4>
                
                <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-950/15 text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-sans max-h-80 overflow-y-auto space-y-3 whitespace-pre-wrap">
                  {result.content}
                </div>
              </div>

              {/* Conversions Trigger sandbox inside AI generation result */}
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <span>Affiliate Anchor Test Point</span>
                  </span>
                  <span className="text-[10px] font-normal font-mono text-gray-400">DEMO LOCK PIN</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal font-sans">
                  We've auto-wired this generated outline with a special affiliate lock referencing our targeted master publication. Clicking below simulates a tracked referral.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://farmaonline.academy/chatgpt-seo-masterclass"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      e.preventDefault(); 
                      onIncrementClicks('rank-in-chatgpt');
                    }}
                    className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer text-[10px] text-center"
                  >
                    <span>Inspect ChatGPT SEO Masterclass (Track Link)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onIncrementClicks('review-rankforge-ai')}
                    className="px-3 py-2 border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold rounded-lg text-[10px] flex items-center justify-center gap-1 text-center cursor-pointer"
                  >
                    <span>Simulate Sponsor Conversion</span>
                  </button>
                </div>
              </div>

              {/* Utility publishing tools */}
              <div className="flex items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-800 pt-4 text-xs">
                <span className="font-mono text-[9px] text-gray-400">
                  Model: {result.modeUsed || (useHighThinking ? "gemini-3.1-pro-preview" : "gemini-3.5-flash")}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      liked 
                        ? 'bg-pink-500/10 text-pink-500 border-pink-500/20' 
                        : 'border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-850 text-gray-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    disabled={added}
                    onClick={handleAddToBlog}
                    className={`px-4 py-2 font-bold rounded-lg cursor-pointer transition-all ${
                      added
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : 'bg-gray-900 border border-transparent dark:bg-white text-white dark:text-gray-900 hover:scale-[1.01]'
                    }`}
                  >
                    {added ? '✓ Appended to Blog' : 'Append to Blog Feed'}
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}
