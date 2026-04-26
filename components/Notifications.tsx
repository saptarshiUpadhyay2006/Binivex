"use client";

import React, { useState } from "react";
import { Bell, TrendingUp, TrendingDown, Info, Zap } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock notifications - in the future these will come from a DB or Inngest
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Price Alert: NVDA",
    description: "NVIDIA Corp has surged past your target of $120.00.",
    time: "5m ago",
    type: "success",
    icon: <TrendingUp className="text-emerald-500" size={16} />,
  },
  {
    id: 2,
    title: "Market Insight",
    description: "Binivex AI has generated a new summary for the Fed's latest meeting.",
    time: "1h ago",
    type: "info",
    icon: <Zap className="text-yellow-500" size={16} />,
  },
  {
    id: 3,
    title: "Watchlist Update",
    description: "Tesla (TSLA) is down 3.2% in pre-market trading.",
    time: "2h ago",
    type: "warning",
    icon: <TrendingDown className="text-red-500" size={16} />,
  },
];

const Notifications = () => {
  const [unreadCount, setUnreadCount] = useState(MOCK_NOTIFICATIONS.length);

  return (
    <Popover onOpenChange={(open) => open && setUnreadCount(0)}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-10 w-10 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all group"
        >
          <Bell 
            size={20} 
            className="text-gray-400 group-hover:text-white group-hover:rotate-12 transition-all" 
          />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 bg-[#09090b] border-white/10 shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-tight">Notifications</h3>
          <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
            {MOCK_NOTIFICATIONS.length} Total
          </span>
        </div>
        
        <div className="max-h-[350px] overflow-y-auto">
          {MOCK_NOTIFICATIONS.length > 0 ? (
            MOCK_NOTIFICATIONS.map((n) => (
              <div 
                key={n.id} 
                className="p-4 border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors cursor-pointer group"
              >
                <div className="flex gap-3">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-all">
                    {n.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-[13px] font-bold text-gray-200 group-hover:text-white transition-colors leading-tight">
                        {n.title}
                      </p>
                      <span className="text-[10px] text-gray-600 font-medium whitespace-nowrap">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
                      {n.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center text-gray-600">
                <Bell size={24} />
              </div>
              <p className="text-sm text-gray-500">All caught up!</p>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-white/[0.02] border-t border-white/5">
          <Button 
            variant="ghost" 
            className="w-full text-[11px] text-gray-500 hover:text-white font-bold uppercase tracking-widest h-8"
          >
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
