"use client";

import React, { useState } from "react";
import { Sparkles, Search, TrendingUp, Zap, BarChart3, Loader2, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getQuote, getNews } from "@/lib/actions/finnhub.actions";
import { analyzeStock } from "@/lib/actions/ai.actions";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const AnalyzePage = () => {
  const searchParams = useSearchParams();
  const [symbol, setSymbol] = useState(searchParams.get("symbol") || "");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!symbol.trim()) return;

    setIsAnalyzing(true);
    setReport(null);
    setError(null);

    try {
      const upperSymbol = symbol.trim().toUpperCase();
      
      // 1. Fetch Price & News in parallel
      const [priceData, newsArticles] = await Promise.all([
        getQuote(upperSymbol),
        getNews([upperSymbol])
      ]);

      if (!priceData.c) {
        throw new Error("Could not find market data for this symbol.");
      }

      // 2. Trigger AI Analysis
      const result = await analyzeStock({
        symbol: upperSymbol,
        priceData,
        newsArticles
      });

      if (result.success && result.content) {
        setReport(result.content);
      } else {
        throw new Error(result.error || "AI failed to generate a report.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="home-wrapper min-h-screen">
      <header className="flex flex-col gap-1 mb-8 border-b border-white/5 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
          <BrainCircuit className="text-yellow-500" size={24} />
          Binivex AI Intelligence
        </h1>
        <p className="text-gray-500 text-xs md:text-sm max-w-2xl font-medium uppercase tracking-widest">
          Deep-dive market reports powered by generative intelligence
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Selection */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="dashboard-card p-6 flex flex-col gap-6 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Search size={16} className="text-yellow-500" />
                Select Asset
              </h3>
              <p className="text-[11px] text-gray-500">Enter a ticker symbol (e.g., TSLA, NVDA, BTC-USD)</p>
            </div>

            <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
              <Input 
                placeholder="Ex: AAPL" 
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:border-yellow-500/50 transition-all text-lg font-bold placeholder:text-gray-700"
              />
              <Button 
                type="submit"
                disabled={isAnalyzing || !symbol}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-12 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(234,179,8,0.15)] flex items-center gap-2"
              >
                {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                {isAnalyzing ? "Analyzing Market..." : "Generate Intelligence Report"}
              </Button>
            </form>

            <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
              <h4 className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Popular Suggestions</h4>
              <div className="flex flex-wrap gap-2">
                {['NVDA', 'TSLA', 'AAPL', 'MSFT', 'BTC-USD'].map(s => (
                  <button 
                    key={s}
                    onClick={() => setSymbol(s)}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white hover:border-yellow-500/50 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-3">
             <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
                <Zap size={14} />
                Live Analysis
             </div>
             <p className="text-[11px] text-gray-400 leading-relaxed">
                Our AI synthesizes real-time quotes, technical momentum, and the last 24 hours of financial news to provide a neutral, data-driven perspective.
             </p>
          </div>
        </div>

        {/* Right: Report Results */}
        <div className="lg:col-span-8">
          {isAnalyzing ? (
            <div className="dashboard-card h-[500px] flex flex-col items-center justify-center gap-6 p-10 text-center animate-pulse">
               <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full" />
                  <BrainCircuit size={64} className="text-yellow-500 relative animate-bounce" />
               </div>
               <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-white tracking-tight">Gathering Intelligence...</h2>
                  <p className="text-sm text-gray-500 max-w-xs">Scanning real-time charts and indexing news articles for {symbol}</p>
               </div>
            </div>
          ) : report ? (
            <div className="dashboard-card min-h-[500px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="p-6 border-b border-white/5 bg-gradient-to-r from-yellow-500/10 to-transparent flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                        <BarChart3 size={20} className="text-black" />
                     </div>
                     <div>
                        <h2 className="text-lg font-bold text-white tracking-tight uppercase">{symbol} Report</h2>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.2em]">Verified Intelligence</p>
                     </div>
                  </div>
                  <Button variant="ghost" onClick={() => window.print()} className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest">
                    Export
                  </Button>
               </div>
               
               <div className="p-8 prose prose-invert prose-yellow max-w-none prose-p:text-gray-400 prose-headings:text-white prose-strong:text-yellow-500/90 prose-li:text-gray-400">
                  <ReactMarkdown>{report}</ReactMarkdown>
               </div>

               <div className="mt-auto p-6 bg-white/[0.02] border-t border-white/5 text-center">
                  <p className="text-[10px] text-gray-600 italic">
                    Binivex AI is an experimental analysis tool. Financial data may be delayed. Always consult with a licensed advisor.
                  </p>
               </div>
            </div>
          ) : error ? (
            <div className="dashboard-card h-[400px] flex flex-col items-center justify-center p-10 text-center gap-4">
               <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                  <BarChart3 size={32} />
               </div>
               <h2 className="text-xl font-bold text-white">Analysis Failed</h2>
               <p className="text-sm text-gray-500 max-w-xs">{error}</p>
               <Button onClick={() => setError(null)} variant="outline" className="mt-2 border-white/10 text-white">
                  Try Another Symbol
               </Button>
            </div>
          ) : (
            <div className="dashboard-card h-[500px] flex flex-col items-center justify-center p-10 text-center border-dashed border-white/10 bg-transparent">
               <div className="w-20 h-20 rounded-full bg-white/[0.02] flex items-center justify-center text-gray-700 mb-6 border border-white/5">
                  <BarChart3 size={40} />
               </div>
               <h2 className="text-xl font-bold text-gray-300 tracking-tight">Ready for Market Deep-Dive</h2>
               <p className="text-sm text-gray-500 max-w-sm mt-2 leading-relaxed">
                  Enter a symbol to generate a premium intelligence report. We'll analyze technical patterns and sentiment in seconds.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
