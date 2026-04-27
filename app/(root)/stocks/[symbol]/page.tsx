import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchListButton";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
} from "@/lib/constants";
import { getAuth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft, Zap } from "lucide-react";
import { 
  getRecommendationTrends, 
  getEarningsCalendar, 
  getBasicFinancials 
} from "@/lib/actions/finnhub.actions";
import StockContent from "@/components/StockContent";


export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const upperSymbol = symbol.toUpperCase();
  
  let session = null;
  let watchlistSymbols: string[] = [];
  
  // Parallel fetch of all required data
  const [recommendations, earnings, financials, auth] = await Promise.all([
    getRecommendationTrends(upperSymbol),
    getEarningsCalendar(upperSymbol),
    getBasicFinancials(upperSymbol),
    getAuth()
  ]);

  try {
    session = await auth.api.getSession({
      headers: await headers()
    });
    if (session?.user?.email) {
      watchlistSymbols = await getWatchlistSymbolsByEmail(session.user.email);
    }
  } catch (error) {
    console.error("Error fetching session or watchlist in StockDetails:", error);
  }

  const isInWatchlist = watchlistSymbols.includes(upperSymbol);
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="home-wrapper min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Market Overview</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Live Market Data</span>
        </div>
      </div>

      {/* Premium Header Section */}
      <section className="flex flex-col gap-6 mb-10 relative">
        {/* Ambient glow background */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
           <div className="flex-1 w-full lg:max-w-3xl">
              <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent">
                <div className="bg-[#0c0c0e] rounded-[2.3rem] overflow-hidden">
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}symbol-info.js`}
                        config={SYMBOL_INFO_WIDGET_CONFIG(upperSymbol)}
                        height={170}
                    />
                </div>
              </div>
           </div>
           
           <div className="flex flex-col sm:flex-row items-center gap-4 lg:mb-4">
              <div className="p-1 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <WatchlistButton 
                    symbol={upperSymbol} 
                    company={upperSymbol} 
                    isInWatchlist={isInWatchlist} 
                />
              </div>
              
              <Link href={`/analyze?symbol=${upperSymbol}`} className="w-full sm:w-auto">
                 <Button className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-black h-14 px-10 rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(234,179,8,0.25)] transition-all hover:scale-[1.03] active:scale-[0.97] group">
                    <div className="relative">
                        <Sparkles size={20} className="relative z-10 group-hover:rotate-12 transition-transform" />
                        <div className="absolute inset-0 bg-white/40 blur-lg rounded-full animate-pulse" />
                    </div>
                    <span className="uppercase tracking-widest text-xs">Intelligence Analysis</span>
                    <Zap size={14} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                 </Button>
              </Link>
           </div>
        </div>
      </section>

      {/* Tabbed Content Section */}
      <div className="relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/[0.02] blur-[120px] rounded-full pointer-events-none" />
        <StockContent 
            symbol={upperSymbol}
            recommendations={recommendations}
            earnings={earnings}
            financials={financials}
        />
      </div>
    </div>
  );
}