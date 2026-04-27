import TradingViewWidget from "@/components/TradingViewWidget";
import { MARKET_DATA_WIDGET_CONFIG } from "@/lib/constants";
import StatCard from "@/components/StatCard";
import { TrendingUp, Activity, BarChart3, Globe, Shield, Zap, Box, Code } from "lucide-react";
import { getMarketMovers, getNews, getEconomicCalendar } from "@/lib/actions/finnhub.actions";
import MarketMovers from "@/components/MarketMovers";
import NewsFeed from "@/components/NewsFeed";
import HomeHero from "@/components/HomeHero";
import AdvantageSection from "@/components/AdvantageSection";
import EconomicCalendar from "@/components/EconomicCalendar";


export default async function Home() {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  // Parallel fetch of movers, news, and economic calendar
  const [movers, newsArticles, economicEvents] = await Promise.all([
    getMarketMovers(),
    getNews(),
    getEconomicCalendar()
  ]);

  // Limit to 3 news articles as requested
  const limitedNews = newsArticles.slice(0, 3);
  
  // Limit to 3 gainers/losers as requested
  const limitedMovers = {
    gainers: movers.gainers.slice(0, 3),
    losers: movers.losers.slice(0, 3)
  };

  return (
    <div className="home-wrapper">
      {/* Welcome Hero Section (Client Component for search/tutorial interactions) */}
      <HomeHero />

      {/* Professional Header Section */}
      <header id="market-data" className="flex flex-col gap-2 mb-10 border-b border-white/5 pb-8 relative">
        <div className="absolute -left-10 top-0 w-20 h-20 bg-yellow-500/5 blur-3xl rounded-full" />
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tighter flex items-center gap-4">
            <TrendingUp className="text-yellow-500" size={32} />
            Market Intelligence
        </h1>
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                Live Institutional Data • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
        </div>
      </header>

      {/* Market Flow - Large, Complete Section (Now above Market Movers) */}
      <section id="market-flow-section" className="flex flex-col gap-8 w-full mb-20 scroll-mt-20">
        <div className="flex items-center justify-between border-b border-white/5 pb-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-yellow-500/10">
                        <BarChart3 className="text-yellow-500" size={18} />
                    </div>
                    Market Flow Analysis
                </h2>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">Global performance & asset flow monitoring</p>
            </div>
        </div>
        
        <div className="dashboard-card h-[700px] w-full">
            <TradingViewWidget
                scriptUrl={`${scriptUrl}market-overview.js`}
                config={MARKET_DATA_WIDGET_CONFIG}
                height={700}
            />
        </div>
      </section>

      {/* Market Movers Section (Gainers/Losers) - Restricted to 3 each, below Market Flow */}
      <MarketMovers gainers={limitedMovers.gainers} losers={limitedMovers.losers} />

      {/* Quick Stats Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 my-12">
        <StatCard 
            title="S&P 500" 
            value="5,137.08" 
            change="+0.85%" 
            isUp={true} 
            icon={<BarChart3 size={18} />} 
            href="/stocks/SPX"
        />
        <StatCard 
            title="Nasdaq 100" 
            value="18,302.91" 
            change="+1.14%" 
            isUp={true} 
            icon={<TrendingUp size={18} />} 
            href="/stocks/NDX"
        />
        <StatCard 
            title="Bitcoin" 
            value="$67,432.12" 
            change="-2.41%" 
            isUp={false} 
            icon={<Activity size={18} />} 
            href="/stocks/BTCUSD"
        />
        <StatCard 
            title="DXY Index" 
            value="103.85" 
            change="+0.12%" 
            isUp={true} 
            icon={<Globe size={18} />} 
            href="/stocks/DXY"
        />
      </section>

      {/* Economic Calendar - Macro Pulse (Between Stats and Secondary Widgets) */}
      <EconomicCalendar events={economicEvents} />

      {/* Secondary Widgets Section - Moved before News Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
           <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-yellow-500/10">
                        <Activity size={14} className="text-yellow-500" />
                      </div>
                      Sector Heatmap
                  </h4>
                  <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Visual Distribution</span>
              </div>
              <div className="dashboard-card h-[400px]">
                  <TradingViewWidget
                      scriptUrl={`${scriptUrl}stock-heatmap.js`}
                      config={MARKET_DATA_WIDGET_CONFIG}
                      height={400}
                  />
              </div>
           </div>
           <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-yellow-500/10">
                        <TrendingUp size={14} className="text-yellow-500" />
                      </div>
                      Live Market Quotes
                  </h4>
                  <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Real-Time Execution</span>
              </div>
              <div className="dashboard-card h-[400px]">
                  <TradingViewWidget
                      scriptUrl={`${scriptUrl}market-quotes.js`}
                      config={MARKET_DATA_WIDGET_CONFIG}
                      height={400}
                  />
              </div>
           </div>
      </section>

      {/* News Feed - Below Secondary Widgets, Restricted to 3 */}
      <section className="w-full max-w-5xl mx-auto mb-16">
           <div id="news-feed-header" className="mb-4 invisible" />
           <NewsFeed articles={limitedNews} />
      </section>

      {/* Advantage Section (Client Component) */}
      <AdvantageSection />

      {/* Footer Branding */}
      <section className="mt-24 py-16 text-center flex flex-col gap-10 border-t border-white/5">
        <div className="flex flex-col gap-3">
            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] flex items-center justify-center gap-2">
                <Box size={14} />
                Core Stack
            </h3>
            <h2 className="text-3xl font-black text-white tracking-tight">Built for Performance</h2>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <Code className="text-blue-400" size={24} />
                </div>
                <span className="text-gray-400 font-black group-hover:text-white transition-colors uppercase tracking-widest text-xs">Next.js</span>
            </div>
            <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                    <Shield className="text-purple-400" size={24} />
                </div>
                <span className="text-gray-400 font-black group-hover:text-white transition-colors uppercase tracking-widest text-xs">Better Auth</span>
            </div>
            <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                    <Zap className="text-emerald-400" size={24} />
                </div>
                <span className="text-gray-400 font-black group-hover:text-white transition-colors uppercase tracking-widest text-xs">Inngest</span>
            </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8">
            <p className="text-xs text-gray-600 leading-loose font-medium px-6">
                Binivex leverages Inngest-based background workflows for automated data updates, alerting, and event-driven processing, 
                ensuring your market intelligence is always fresh and your decisions are powered by the latest available information.
            </p>
        </div>
      </section>
    </div>
  )
}