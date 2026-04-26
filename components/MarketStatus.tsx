"use client";

import React, { useEffect, useState } from 'react';
import { getMarketStatus } from '@/lib/utils/market-status';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MarketStatus = () => {
  const [status, setStatus] = useState(getMarketStatus());

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getMarketStatus());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all cursor-default group">
            <div className="relative flex h-2 w-2">
              {status.isOpen && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${status.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </div>
            <span className="hidden xs:block text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-200 transition-colors">
              {status.isOpen ? 'Live' : 'Closed'}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#09090b] border-white/10 text-gray-200">
          <div className="flex flex-col gap-1 p-1">
            <p className="text-[11px] font-bold text-white">{status.label}</p>
            <p className="text-[10px] text-gray-500">{status.nyTime}</p>
            <p className="text-[9px] text-gray-600 italic">NYSE / NASDAQ Hours: 09:30 - 16:00 EST</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MarketStatus;
