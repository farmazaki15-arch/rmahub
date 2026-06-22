import React, { useEffect, useState } from 'react';
import { BarChart2, TrendingUp, MousePointerClick, Award, RefreshCw, DollarSign, ArrowUpRight, ShieldAlert, Monitor, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface TelemetryHubProps {
  stats: any;
  onIncrementStats: (serviceId: string) => void;
  onResetStats?: () => void;
}

export default function TelemetryHub({ stats, onIncrementStats, onResetStats }: TelemetryHubProps) {
  const [activeTab, setActiveTab] = useState<'monitor' | 'schema'>('monitor');
  const [randomClicks, setRandomClicks] = useState<any[]>([]);

  // Generate some hourly transaction stream logs to make it look hyper-authentic (Architecture Honesty: we call them Simulated Logs)
  useEffect(() => {
    const defaultLogs = [
      { id: 1, time: '14:20:15', event: 'Scraper Citation Verify', item: 'ChatGPT Schema v4', status: 'SUCCESS', count: 12 },
      { id: 2, time: '14:31:02', event: 'Affiliate Referral Click', item: 'ChatGPT SEO Course', status: 'REDIRECTING', count: 1 },
      { id: 3, time: '14:45:50', event: 'OAI-SearchBot Indexation', item: 'Gemini 3.5 Review', status: 'INDEXED', count: 4 },
      { id: 4, time: '15:02:11', event: 'Partner Course Enroll', item: 'Alex Farma Academy', status: 'SALE_SIMULATED (+$35.00)', count: 1 }
    ];
    setRandomClicks(defaultLogs);
  }, []);

  const triggerSimulatedCampaignEvent = () => {
    // Pick random campaign
    const services = ['rank-in-chatgpt', 'review-rankforge-ai', 'alternative-credits'];
    const selected = services[Math.floor(Math.random() * services.length)];
    onIncrementStats(selected);
    
    // Add to simulated logs
    const now = new Date().toLocaleTimeString();
    const isSale = Math.random() < 0.25;
    const logItem = {
      id: Date.now(),
      time: now,
      event: isSale ? 'Partner Course Enroll' : 'Affiliate Referral Click',
      item: selected === 'rank-in-chatgpt' ? 'ChatGPT SEO Course' : selected === 'review-rankforge-ai' ? 'RankForge AI Portal' : 'Partner alternatives',
      status: isSale ? `SALE_SIMULATED (+${selected === 'rank-in-chatgpt' ? '$35' : '$24.50'})` : 'REDIRECTING'
    };
    setRandomClicks(prev => [logItem, ...prev.slice(0, 8)]);
  };

  // Convert stats to a chartable format
  const chartData = stats.affiliateStats.map((item: any) => ({
    name: item.serviceId === 'rank-in-chatgpt' ? 'ChatGPT SEO Course' : item.serviceId === 'review-rankforge-ai' ? 'RankForge AI' : 'Alt Tech',
    Clicks: item.clicks,
    Commission: item.commissionEarned,
  }));

  const ctrValue = stats.totalClicks > 0 ? ((stats.totalSales / stats.totalClicks) * 100).toFixed(1) : '7.8';

  return (
    <section className="space-y-8 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-gray-900 dark:text-gray-100">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-5">
        <div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold">
            AUTHORITY DASHBOARD
          </span>
          <h1 className="text-3xl font-bold font-display tracking-tight text-gray-900 dark:text-white mt-1.5">
            Affiliate Telemetry & Conversion Console
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Real-time visual monitoring of affiliate click performance, commission generation, and LLMO crawlers activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerSimulatedCampaignEvent}
            className="px-4 py-2 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-xs rounded-lg shadow-md cursor-pointer flex items-center gap-1.5 transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Simulate Traffic Click</span>
          </button>
          
          {onResetStats && (
            <button
              onClick={onResetStats}
              title="Reset Simulated stats"
              className="p-2 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Core telemetry boxes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Box 1: Clicks */}
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-950/20 backdrop-blur-xs flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">
              Affiliate traffic
            </span>
            <span className="text-2xl font-bold font-display text-gray-900 dark:text-white block mt-1.5 font-mono">
              {stats.totalClicks}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block">Live unique clicks</span>
          </div>
          <div className="p-2 rounded-lg bg-pink-100/10 text-pink-500 border border-pink-500/10">
            <Monitor className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Box 2: Sales */}
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-950/20 backdrop-blur-xs flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">
              Simulated Conversions
            </span>
            <span className="text-2xl font-bold font-display text-gray-900 dark:text-white block mt-1.5 font-mono">
              {stats.totalSales}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block">Referral Academy Sales</span>
          </div>
          <div className="p-2 rounded-lg bg-purple-100/10 text-purple-500 border border-purple-500/10">
            <Award className="w-4 h-4" />
          </div>
        </div>

        {/* Box 3: Total Earnings */}
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-linear-to-br from-pink-50/20 to-purple-50/20 dark:from-purple-950/10 dark:to-pink-950/10 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono text-pink-500 uppercase tracking-widest block font-bold">
              Simulated payout
            </span>
            <span className="text-2xl font-bold font-display text-pink-600 dark:text-pink-400 block mt-1.5 font-mono">
              ${stats.totalCommission.toFixed(2)}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block">Accumulated earnings</span>
          </div>
          <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500 border border-pink-500/20">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        {/* Box 4: Active Readers */}
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-950/20 backdrop-blur-xs flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">
              Live Observers
            </span>
            <span className="text-2xl font-bold font-display text-emerald-500 block mt-1.5 font-mono">
              {stats.activeReadersToday}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block">Readers online right now</span>
          </div>
          <div className="p-2 rounded-lg bg-emerald-100/10 text-emerald-500 border border-emerald-500/10">
            <TrendingUp className="w-4 h-4 animate-bounce" />
          </div>
        </div>

      </div>

      {/* Main Graph Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph Card */}
        <div className="lg:col-span-2 p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white font-display">
              Earnings & Campaigns Distribution Chart
            </h3>
            <span className="text-[11px] font-mono text-gray-400">UNIT: USD ($) & CLICKS</span>
          </div>

          <div className="w-full h-64 font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} />
                <YAxis stroke="#888888" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: 'none', 
                    borderRadius: '8px', 
                    color: '#fff',
                    fontFamily: 'monospace' 
                  }} 
                />
                <Area type="monotone" dataKey="Commission" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorCommission)" />
                <Area type="monotone" dataKey="Clicks" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-4 border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto text-xs font-mono justify-center">
            <div className="flex items-center gap-1.5 text-pink-500">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
              <span>Commission Earned</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-500">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Click-Through Traffic</span>
            </div>
          </div>
        </div>

        {/* Live Simulator Logs Column */}
        <div className="p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white font-display flex items-center justify-between">
              <span>Simulated Scraper Scans</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </h3>
            <p className="text-[10px] text-gray-500 mt-0.5">
              Live simulated queries of conversational scraping indexing headers.
            </p>

            <div className="space-y-2 mt-4 overflow-y-auto max-h-56 pr-1 font-mono text-[10px]">
              {randomClicks.map((log) => (
                <div 
                  key={log.id} 
                  className="p-2 rounded-lg bg-gray-50 dark:bg-gray-850/60 border border-gray-100/50 dark:border-gray-800 flex flex-col gap-1 hover:border-purple-300 dark:hover:border-purple-900/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-gray-400">
                    <span>{log.time}</span>
                    <span className={`px-1.5 py-0.5 rounded-sm font-bold text-[9px] ${
                      log.status.includes('SUCCESS') || log.status.includes('INDEXED')
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : log.status.includes('SALE')
                        ? 'bg-purple-500/15 text-pink-500 animate-pulse'
                        : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">{log.event}</span>
                    <span className="text-gray-400 truncate max-w-28">{log.item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[9px] text-gray-400 leading-normal border-t border-gray-100 dark:border-gray-800 pt-3.5 mt-4">
            *This telemetry demonstrates the digital citation architecture. Traffic simulation represents average tracking models; metrics reset on sandbox clear.
          </div>
        </div>

      </div>

      {/* Campaigns list explicitly showing affiliate link structures */}
      <div className="p-5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/30">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white font-display mb-4">
          Configured Monetization Links & Commissions Schemas
        </h3>
        
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {stats.affiliateStats.map((item: any) => (
            <div key={item.serviceId} className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <div>
                <span className="text-gray-900 dark:text-white font-semibold font-display">
                  {item.serviceName}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono mt-0.5">
                  <span>URL Tracker:</span>
                  <span className="text-purple-400 font-bold truncate max-w-xs">{`https://farmaonline.academy/click?campaign=${item.serviceId}`}</span>
                </div>
              </div>

              <div className="flex items-center gap-5 font-mono text-[11px] self-end sm:self-auto">
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase">Clicks</span>
                  <span className="text-gray-850 dark:text-gray-200 font-bold">{item.clicks}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase">Sales</span>
                  <span className="text-gray-850 dark:text-gray-200 font-bold">{item.salesSimulated}</span>
                </div>
                <div className="bg-pink-500/10 text-pink-600 dark:text-pink-400 px-2 py-1 rounded-sm border border-pink-500/10">
                  <span className="text-pink-500/80 block text-[8px] uppercase font-semibold">Simulated Profit</span>
                  <span className="font-bold">${item.commissionEarned.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
