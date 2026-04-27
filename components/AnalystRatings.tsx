"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, Info, Target } from "lucide-react";

interface AnalystRatingsProps {
  trends: RecommendationTrend[];
}

const AnalystRatings = ({ trends }: AnalystRatingsProps) => {
  if (!trends || trends.length === 0) return null;

  const latest = trends[0]; // Latest month
  const total = latest.strongBuy + latest.buy + latest.hold + latest.sell + latest.strongSell;

  const getPercentage = (value: number) => (value / total) * 100;

  const categories = [
    { label: "Strong Buy", count: latest.strongBuy, color: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
    { label: "Buy", count: latest.buy, color: "bg-emerald-400", shadow: "shadow-emerald-400/20" },
    { label: "Hold", count: latest.hold, color: "bg-yellow-500", shadow: "shadow-yellow-500/20" },
    { label: "Sell", count: latest.sell, color: "bg-red-400", shadow: "shadow-red-400/20" },
    { label: "Strong Sell", count: latest.strongSell, color: "bg-red-600", shadow: "shadow-red-600/20" },
  ];

  // Determine consensus
  let consensus = "Hold";
  if (latest.strongBuy + latest.buy > latest.hold + latest.sell + latest.strongSell) {
    consensus = latest.strongBuy > latest.buy ? "Strong Buy" : "Buy";
  } else if (latest.sell + latest.strongSell > latest.hold + latest.strongBuy + latest.buy) {
    consensus = latest.strongSell > latest.sell ? "Strong Sell" : "Sell";
  }

  return (
    <div className="dashboard-card p-8 flex flex-col gap-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.03] blur-3xl rounded-full group-hover:bg-emerald-500/[0.05] transition-colors" />
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-widest">
            <Target size={18} className="text-emerald-500" />
            Analyst Intelligence
          </h3>
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">Consensus Distribution • Last 30 Days</p>
        </div>
        <div className={cn(
          "px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transition-all",
          consensus.includes("Buy") ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-emerald-500/5" :
          consensus.includes("Sell") ? "bg-red-500/10 text-red-500 border border-red-500/20 shadow-red-500/5" :
          "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 shadow-yellow-500/5"
        )}>
          {consensus}
        </div>
      </div>

      <div className="flex h-4 w-full rounded-full overflow-hidden bg-white/5 border border-white/5 p-0.5">
        {categories.map((cat, idx) => (
          <div 
            key={idx}
            className={cn(cat.color, "transition-all duration-1000 ease-out first:rounded-l-full last:rounded-r-full")}
            style={{ width: `${getPercentage(cat.count)}%` }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
                <div className={cn("w-1.5 h-1.5 rounded-full", cat.color)} />
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest truncate">{cat.label}</span>
            </div>
            <span className="text-xl font-black text-white tracking-tight">{cat.count}</span>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 flex gap-4 items-start">
        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
            <Info size={14} className="text-gray-500" />
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
          Our aggregate sentiment engine analyzes ratings from top-tier institutional research desks to provide a definitive market consensus for this asset.
        </p>
      </div>
    </div>
  );
};

export default AnalystRatings;
