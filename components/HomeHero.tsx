"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Search, Play, Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const HomeHero = () => {
  const { openSearch, openTutorial } = useUI();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/stocks/${searchValue.trim().toUpperCase()}`);
    }
  };

  return (
    <section className="mb-12 p-8 md:p-12 rounded-[3rem] bg-[#0c0c0e] border border-white/5 relative overflow-hidden group shadow-2xl">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/[0.03] blur-[120px] -mr-64 -mt-64 rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/[0.02] blur-[100px] -ml-32 -mb-32 rounded-full" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px]">
            <Zap size={14} className="animate-bounce" />
            Next-Gen Fintech Intelligence
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] max-w-2xl">
            Smarter Moves. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">Better Intelligence.</span>
          </h1>
          
          <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed font-medium">
            Binivex synthesizes real-time market flows and generative AI to give you a definitive edge. 
            Track global assets with institutional precision and automated insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
             {/* Integrated Hero Search */}
             <form onSubmit={handleSearch} className="relative w-full max-w-md group/search">
                <Input 
                    placeholder="Search Symbol (e.g. NVDA, BTC)"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 pr-4 text-white font-bold focus:border-yellow-500/50 transition-all placeholder:text-gray-700 placeholder:font-bold"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/search:text-yellow-500 transition-colors" size={20} />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all">
                    <ArrowRight size={16} />
                </button>
             </form>
             
             <div className="flex items-center gap-4 w-full sm:w-auto">
                <Button 
                    variant="outline" 
                    onClick={openTutorial}
                    className="flex-1 sm:flex-none border-white/10 text-white hover:bg-white/5 font-black h-14 px-8 rounded-2xl transition-all flex items-center gap-2 uppercase tracking-widest text-[10px]"
                >
                    <Play size={14} fill="currentColor" />
                    Tutorial
                </Button>
             </div>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 mt-4 opacity-50 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Real-time Data</span>
             </div>
             <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-yellow-500" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">AI Analysis</span>
             </div>
          </div>
        </div>

        {/* Hero Visual Element (Abstract Card) - Clickable to scroll to analysis */}
        <div 
            onClick={() => {
                const el = document.getElementById("market-flow-section");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden lg:flex justify-center relative cursor-pointer group/card active:scale-95 transition-transform"
        >
            <div className="absolute inset-0 bg-yellow-500/10 blur-[80px] rounded-full scale-75 animate-pulse" />
            <div className="relative w-full max-w-[400px] aspect-[4/3] rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent p-[1px] group-hover/card:from-yellow-500/50 transition-all duration-500">
                <div className="w-full h-full bg-[#121214] rounded-[2.4rem] p-8 flex flex-col justify-between overflow-hidden relative shadow-2xl">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center group-hover/card:bg-yellow-500/20 transition-colors">
                            <Sparkles size={24} className="text-yellow-500" />
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                            Intelligence On
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-2/3 bg-white/5 rounded-full" />
                        <div className="h-4 w-full bg-white/5 rounded-full" />
                        <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                    </div>

                    <div className="flex items-end justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Portfolio Analytics</span>
                            <span className="text-2xl font-black text-white">$124,532.00</span>
                        </div>
                        <div className="h-12 w-12 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center group-hover/card:border-yellow-500/50 transition-colors">
                            <TrendingUp size={20} className="text-emerald-500" />
                        </div>
                    </div>
                    
                    {/* Decorative abstract lines */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-white/5 rounded-full" />
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 border border-white/5 rounded-full" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
