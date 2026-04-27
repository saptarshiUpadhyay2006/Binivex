"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import Link from "next/link";

interface Mover {
  symbol: string;
  price: number;
  change: number;
}

interface MarketMoversProps {
  gainers: Mover[];
  losers: Mover[];
}

const MarketMovers = ({ gainers, losers }: MarketMoversProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Gainers */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2 border-b border-white/5 pb-4">
            <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-emerald-500/10">
                    <TrendingUp size={16} />
                </div>
                Top Gainers
            </h3>
            <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Live Momentum</span>
            </div>
        </div>
        <div className="flex flex-col gap-3">
          {gainers.map((stock) => (
            <MoverCard key={stock.symbol} stock={stock} type="gainer" />
          ))}
        </div>
      </div>

      {/* Losers */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2 border-b border-white/5 pb-4">
            <h3 className="text-sm font-black text-red-500 uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-red-500/10">
                    <TrendingDown size={16} />
                </div>
                Top Losers
            </h3>
            <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Live Momentum</span>
            </div>
        </div>
        <div className="flex flex-col gap-3">
          {losers.map((stock) => (
            <MoverCard key={stock.symbol} stock={stock} type="loser" />
          ))}
        </div>
      </div>
    </div>
  );
};

const MoverCard = ({ stock, type }: { stock: Mover; type: "gainer" | "loser" }) => (
  <Link href={`/stocks/${stock.symbol}`}>
    <div className="dashboard-card p-4 flex items-center justify-between group transition-all hover:scale-[1.01] hover:bg-white/[0.03] active:scale-[0.99] border-white/5 hover:border-white/10">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-lg",
          type === "gainer" ? "bg-emerald-500/10 text-emerald-500 shadow-emerald-500/5 group-hover:bg-emerald-500/20" : "bg-red-500/10 text-red-500 shadow-red-500/5 group-hover:bg-red-500/20"
        )}>
          {type === "gainer" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-black text-white tracking-tight">{stock.symbol}</span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Market Asset</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm font-black text-white font-mono">${stock.price.toFixed(2)}</span>
        <span className={cn(
          "text-[10px] font-black font-mono",
          type === "gainer" ? "text-emerald-500" : "text-red-500"
        )}>
          {type === "gainer" ? "+" : ""}{stock.change.toFixed(2)}%
        </span>
      </div>
    </div>
  </Link>
);

export default MarketMovers;
