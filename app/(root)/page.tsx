import TradingViewWidget from "@/components/TradingViewWidget";
import { Button } from "@/components/ui/button"
import { MARKET_DATA_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants";
import StatCard from "@/components/StatCard";
import { TrendingUp, Activity, BarChart3, Globe, Shield, Zap, LayoutDashboard, Search, Box, Code } from "lucide-react";

const Home = () => {
  const scriptUrl=`https://s3.tradingview.com/external-embedding/embed-widget-`;
  
  return (
    <div className="home-wrapper">
      {/* Welcome Hero Section */}
      <section className="mb-10 p-8 rounded-3xl bg-gradient-to-br from-yellow-500/10 via-yellow-500/[0.02] to-transparent border border-yellow-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-[0.2em] text-[10px]">
            <Zap size={14} />
            Next-Gen Fintech
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-3xl">
            Welcome to <span className="text-yellow-500">Binivex</span>. Your Premium Intelligence Partner.
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Experience a full-stack real-time stock tracking platform designed for elite decision-making. Monitor global markets with live data, interactive charts, and AI-powered insights.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                Get Started
            </Button>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 font-bold px-6 py-2 rounded-xl transition-all">
                View Tutorial
            </Button>
          </div>
        </div>
      </section>

      {/* Professional Header Section */}
      <header className="flex flex-col gap-1 mb-8 border-b border-white/5 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <TrendingUp className="text-yellow-500" size={24} />
            Market Intelligence
        </h1>
        <p className="text-gray-500 text-xs md:text-sm max-w-2xl font-medium uppercase tracking-widest">
            Real-time global market performance • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </header>

      {/* Quick Stats Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

      {/* Main Analysis Section */}
      <section className="flex flex-col gap-6 mt-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex flex-col gap-1">
                <h2 className="section-title mb-0">
                    <BarChart3 className="text-yellow-500" size={20} />
                    Market Overview
                </h2>
                <p className="text-xs text-gray-500 ml-9">Real-time performance of global indices and major assets</p>
            </div>
            <Button variant="ghost" className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/5 text-xs font-bold uppercase tracking-widest">
                Analytics Details
            </Button>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
            <div className="xl:col-span-2 dashboard-card h-[600px]">
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}market-overview.js`}
                    config={MARKET_DATA_WIDGET_CONFIG}
                    height={600}
                />
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Globe size={14} />
                    Top Stories
                </h3>
                <div className="dashboard-card flex-1">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}timeline.js`}
                        config={TOP_STORIES_WIDGET_CONFIG}
                        height={550}
                    />
                </div>
            </div>
        </div>
      </section>

      {/* What Binivex Does Section */}
      <section className="mt-12 py-12 border-y border-white/5 bg-gradient-to-r from-yellow-500/[0.02] to-transparent rounded-3xl px-6 md:px-10">
        <div className="flex flex-col gap-2 mb-10 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
            <Shield className="text-yellow-500" size={24} />
            The Binivex Advantage
          </h2>
          <p className="text-sm text-gray-500 font-medium">Precision tools for the modern market intelligence</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-white text-lg">Real-Time Data</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Lightning-fast price updates and global market indices at your fingertips.</p>
          </div>

          <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
              <Search size={24} />
            </div>
            <h3 className="font-bold text-white text-lg">Smart Search</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Search thousands of global symbols and instantly find detailed market intelligence.</p>
          </div>

          <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
              <LayoutDashboard size={24} />
            </div>
            <h3 className="font-bold text-white text-lg">Watchlist Tracking</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Monitor your favorite assets in one place with our custom-built tracking system.</p>
          </div>

          <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
              <Globe size={24} />
            </div>
            <h3 className="font-bold text-white text-lg">Global News</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Curated financial news from around the world to keep you ahead of the market.</p>
          </div>
        </div>
      </section>

      {/* Secondary Data Section */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-4">
        <div className="xl:col-span-1 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <h2 className="section-title mb-0">
                    <Activity className="text-yellow-500" size={20} />
                    Stock Heatmap
                </h2>
                <p className="text-xs text-gray-500 ml-9">Visual breakdown of market sector performance</p>
            </div>
            <div className="dashboard-card h-[500px]">
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}stock-heatmap.js`}
                    config={MARKET_DATA_WIDGET_CONFIG}
                    height={500}
                />
            </div>
        </div>
        <div className="xl:col-span-2 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <h2 className="section-title mb-0">
                    <TrendingUp className="text-yellow-500" size={20} />
                    Quote Summary
                </h2>
                <p className="text-xs text-gray-500 ml-9">Instant price checks and volume analysis for active symbols</p>
            </div>
            <div className="dashboard-card h-[500px]">
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}market-quotes.js`}
                    config={MARKET_DATA_WIDGET_CONFIG}
                    height={500}
                />
            </div>
        </div>
      </section>

      {/* Powered By Section */}
      <section className="mt-16 py-12 text-center flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                <Box size={14} />
                Architecture
            </h3>
            <h2 className="text-2xl font-bold text-white">Powered by the Modern Web</h2>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-3 group transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <Code className="text-blue-400" size={20} />
                </div>
                <span className="text-gray-400 font-bold group-hover:text-white transition-colors tracking-tight">Next.js</span>
            </div>
            <div className="flex items-center gap-3 group transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                    <Shield className="text-purple-400" size={20} />
                </div>
                <span className="text-gray-400 font-bold group-hover:text-white transition-colors tracking-tight">Better Auth</span>
            </div>
            <div className="flex items-center gap-3 group transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                    <Zap className="text-emerald-400" size={20} />
                </div>
                <span className="text-gray-400 font-bold group-hover:text-white transition-colors tracking-tight">Inngest</span>
            </div>
            <div className="flex items-center gap-3 group transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                    <TrendingUp className="text-blue-600" size={20} />
                </div>
                <span className="text-gray-400 font-bold group-hover:text-white transition-colors tracking-tight">TypeScript</span>
            </div>
        </div>

        <div className="max-w-3xl mx-auto mt-6">
            <p className="text-sm text-gray-500 leading-loose">
                Binivex leverages Inngest-based background workflows for automated data updates, alerting, and event-driven processing, 
                ensuring your market intelligence is always fresh and your decisions are powered by the latest available information.
            </p>
        </div>
      </section>

    </div>
  )
}

export default Home;