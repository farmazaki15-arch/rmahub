import { useState, useEffect } from 'react';
import { Sparkles, Search, Sun, Moon, BarChart2, Radio, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  darkTheme: boolean;
  setDarkTheme: (dark: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  subscriberCount: number;
  totalEarnings: number;
}

export default function Header({
  currentTab,
  setCurrentTab,
  darkTheme,
  setDarkTheme,
  searchQuery,
  setSearchQuery,
  subscriberCount,
  totalEarnings
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  
  const tickers = [
    "⚡ ALGORITHM ALERT: ChatGPT Search scraper 'OAI-SearchBot' updated to parse schema markup v4.2",
    "⭐ EXCLUSIVE DISCOUNTS: Input code 'FARMAONLINE' for 25% off the flagship ChatGPT Optimization course",
    "📈 TELEMETRY TODAY: Verified conversational citations high among FarmaOnline publishers",
    "🤖 GEMINI 3.5: Multimodal low-latency voice endpoints streaming PCM in full-stack configurations"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home Hub' },
    { id: 'blog', label: 'Blog Feed' },
    { id: 'reviews', label: 'Product Reviews' },
    { id: 'about', label: 'Our Story' },
    { id: 'ai-wizard', label: '🧠 AI Ideas Engine' },
    { id: 'telemetry', label: '📊 Earnings Console' },
    { id: 'contact', label: 'Contact Authority' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-gray-900/85 backdrop-blur-md">
      {/* Dynamic Scroller Ticker */}
      <div className="w-full bg-linear-to-r from-pink-600 via-purple-600 to-blue-600 py-1.5 px-4 text-xs text-center text-white font-mono flex items-center justify-center gap-2 overflow-hidden select-none">
        <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-300" />
        <span className="animate-fade-in font-medium max-w-7xl truncate">
          {tickers[tickerIndex]}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo */}
          <div 
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500 via-purple-500 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/10 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-xl font-bold font-display tracking-tight text-gray-900 dark:text-white flex items-center gap-1">
                Farma<span className="text-pink-500 font-extrabold group-hover:text-blue-500 transition-colors duration-200">Online</span>
              </span>
              <span className="text-[9px] block font-mono text-gray-400 dark:text-gray-500 tracking-widest leading-none">
                CONVERSATIONAL AUTHORITY
              </span>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news, reviews, schema secrets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-100/80 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-full border border-transparent focus:border-purple-500 focus:bg-white focus:outline-hidden transition-all duration-200 font-sans"
            />
          </div>

          {/* Nav Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 font-sans">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  currentTab === item.id || (item.id === 'blog' && currentTab.startsWith('article-'))
                    ? 'bg-purple-500/10 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400 animate-pulse'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Metrics / Utility Switches */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Telemetry Miniature Info */}
            <div 
              onClick={() => setCurrentTab('telemetry')}
              className="hidden sm:flex flex-col items-end cursor-pointer px-2.5 py-1 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 font-mono text-[10px] text-gray-500 dark:text-gray-400 hover:border-pink-500/30 transition-colors"
            >
              <div className="flex items-center gap-1 text-emerald-500 font-bold">
                <BarChart2 className="w-3 h-3 animate-pulse" />
                <span>${totalEarnings.toFixed(2)}</span>
              </div>
              <div className="text-[8px] text-gray-400 scale-95 origin-right">Simulated Payout</div>
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkTheme(!darkTheme)}
              title="Toggle theme"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-950/40 transition-colors cursor-pointer"
            >
              {darkTheme ? <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" /> : <Moon className="w-4 h-4 text-purple-600" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-105 active:bg-gray-110 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-3 pb-5 space-y-2 animate-fade-in">
          {/* Mobile search bar */}
          <div className="relative mb-3.5">
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tech secrets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-100 dark:bg-gray-850 text-gray-900 dark:text-white rounded-lg focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5 font-sans">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2.5 rounded-lg text-xs font-semibold text-center transition-all ${
                  currentTab === item.id
                    ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-pink-100/10 dark:bg-pink-950/10 border border-pink-500/20 mt-4">
            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">NEWSLETTER READERS:</span>
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 font-mono">{subscriberCount} Enrolled</span>
          </div>
        </div>
      )}
    </header>
  );
}
