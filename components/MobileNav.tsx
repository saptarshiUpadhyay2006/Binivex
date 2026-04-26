"use client";

import React, { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchCommand from "@/components/SearchCommand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  initialStocks: StockWithWatchlistStatus[];
  watchlistCount?: number;
  watchlistSymbols?: string[];
}

const MobileNav = ({ initialStocks, watchlistCount, watchlistSymbols }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="sm:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)}
        className="text-gray-400 hover:text-white"
      >
        <Menu size={24} />
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 !z-[1000000] !bg-[#050505] !opacity-100 w-screen h-screen flex flex-col"
        >
          <div className="flex items-center justify-between p-8 border-b border-white/5 bg-[#050505]">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                    <Sparkles size={18} className="text-black" />
                </div>
                <span className="font-bold text-white tracking-tighter text-lg uppercase">Binivex</span>
             </div>
             <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </Button>
          </div>

          <nav className="flex-1 px-8 py-12">
            <ul className="flex flex-col gap-10">
              {NAV_ITEMS.map(({ href, label }) => {
                const active = isActive(href);

                if (href === '/search') return (
                  <li key="search-trigger" onClick={() => setIsOpen(false)} className="mb-4">
                    <SearchCommand
                      renderAs="button"
                      label="Search Markets"
                      initialStocks={initialStocks}
                      watchlistSymbols={watchlistSymbols}
                      className="w-full bg-white/[0.03] border-white/10 text-gray-400 justify-start h-14 px-6 rounded-2xl text-lg font-bold"
                    />
                  </li>
                );

                return (
                  <li key={href}>
                    <Link 
                      href={href} 
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-4xl font-bold transition-all flex items-center justify-between p-4 rounded-2xl tracking-tighter border border-transparent",
                        active ? "text-yellow-500 bg-yellow-500/5 border-yellow-500/10" : "text-gray-600 hover:text-white hover:bg-white/5 hover:border-white/10"
                      )}
                    >
                      {label}
                      {label === 'Watchlist' && typeof watchlistCount === 'number' && watchlistCount > 0 && (
                        <span className="px-3 py-1 text-sm bg-yellow-500 text-black rounded-full font-black">
                          {watchlistCount}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-8 border-t border-white/5 bg-white/[0.01]">
             <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] text-center">
                Binivex Premium Intelligence
             </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
