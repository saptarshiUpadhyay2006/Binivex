"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface StockTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

const StockTabs = ({ tabs, activeTab, onChange }: StockTabsProps) => {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-[#09090b]/50 border border-white/5 rounded-2xl backdrop-blur-2xl mb-8 overflow-x-auto no-scrollbar shadow-2xl relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-black transition-all duration-500 whitespace-nowrap uppercase tracking-widest",
              isActive 
                ? "text-black scale-[1.02]" 
                : "text-gray-500 hover:text-white hover:bg-white/[0.03]"
            )}
          >
            {/* Active Indicator Background */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-xl shadow-[0_5px_15px_rgba(234,179,8,0.3)] z-0" />
            )}
            
            <span className="relative z-10 flex items-center gap-2.5">
                {React.cloneElement(tab.icon as React.ReactElement, { 
                    size: 14,
                    className: isActive ? "text-black" : "text-gray-600"
                })}
                {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StockTabs;
