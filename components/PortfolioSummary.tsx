"use client";

import React, { useEffect, useState } from "react";
import { getQuote } from "@/lib/actions/finnhub.actions";
import { TrendingUp, TrendingDown, LayoutDashboard, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PortfolioSummaryProps {
  symbols: string[];
}

const PortfolioSummary = ({ symbols }: PortfolioSummaryProps) => {
  const [metrics, setMetrics] = useState<{
    avgChange: number;
    topGainer: { symbol: string; change: number } | null;
    topLoser: { symbol: string; change: number } | null;
    isLoading: boolean;
  }>({
    avgChange: 0,
    topGainer: null,
    topLoser: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchPortfolioMetrics = async () => {
      if (symbols.length === 0) {
        setMetrics(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const quotes = await Promise.all(
          symbols.map(async (sym) => {
            const q = await getQuote(sym);
            return { symbol: sym, change: q.dp || 0 };
          })
        );

        const totalChange = quotes.reduce((acc, curr) => acc + curr.change, 0);
        const avgChange = totalChange / quotes.length;

        const sorted = [...quotes].sort((a, b) => b.change - a.change);

        setMetrics({
          avgChange,
          topGainer: sorted[0],
          topLoser: sorted[sorted.length - 1],
          isLoading: false,
        });
      } catch (error) {
        console.error("Error calculating portfolio metrics:", error);
        setMetrics(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchPortfolioMetrics();
    const interval = setInterval(fetchPortfolioMetrics, 120000); // Update every 2 mins

    return () => clearInterval(interval);
  }, [symbols]);

  if (symbols.length === 0) return null;

  const isPositive = metrics.avgChange >= 0;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-default group ml-2",
            metrics.isLoading ? "bg-white/[0.02] border-white/5" : 
            isPositive ? "bg-emerald-500/10 border-emerald-500/20" : "bg-red-500/10 border-red-500/20"
          )}>
            {metrics.isLoading ? (
              <Loader2 size={12} className="animate-spin text-gray-500" />
            ) : isPositive ? (
              <TrendingUp size={14} className="text-emerald-500" />
            ) : (
              <TrendingDown size={14} className="text-red-500" />
            )}
            
            <span className={cn(
              "text-[11px] font-bold tracking-tight",
              metrics.isLoading ? "text-gray-500" : isPositive ? "text-emerald-500" : "text-red-500"
            )}>
              {metrics.isLoading ? "Calculating..." : `${isPositive ? '+' : ''}${metrics.avgChange.toFixed(2)}%`}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#09090b] border-white/10 text-gray-200 w-48 p-3 shadow-2xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-1">
              <LayoutDashboard size={14} className="text-yellow-500" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Watchlist Avg</span>
            </div>
            
            {!metrics.isLoading && metrics.topGainer && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Top Gainer</span>
                  <span className="text-[10px] text-emerald-500 font-bold">{metrics.topGainer.symbol} (+{metrics.topGainer.change.toFixed(2)}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Top Loser</span>
                  <span className="text-[10px] text-red-500 font-bold">{metrics.topLoser?.symbol} ({metrics.topLoser?.change.toFixed(2)}%)</span>
                </div>
              </div>
            )}
            
            <p className="text-[9px] text-gray-600 italic mt-1 border-t border-white/5 pt-2">
              Based on {symbols.length} tracked assets
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PortfolioSummary;
