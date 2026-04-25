import TradingViewWidget from "@/components/TradingViewWidget";
import { Button } from "@/components/ui/button"
import { MARKET_DATA_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from "@/lib/constants";
import StatCard from "@/components/StatCard";
import { TrendingUp, Activity, BarChart3, Globe } from "lucide-react";

const Home = () => {
  const scriptUrl=`https://s3.tradingview.com/external-embedding/embed-widget-`;
  
  return (
    <div className="home-wrapper">
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
    </div>
  )
}

export default Home;