"use client";

import React from "react";
import AdvantageCard from "@/components/AdvantageCard";
import { Shield, Zap, Search, LayoutDashboard, Globe } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { useRouter } from "next/navigation";

const AdvantageSection = () => {
  const { openSearch } = useUI();
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="mt-20 py-16 border-y border-white/5 bg-gradient-to-b from-yellow-500/[0.03] to-transparent rounded-[3rem] px-8 md:px-12">
      <div className="flex flex-col gap-3 mb-12 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-white flex items-center justify-center md:justify-start gap-4">
          <Shield className="text-yellow-500" size={32} />
          The Intelligence Advantage
        </h2>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Premium precision tools for the modern trader</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <AdvantageCard 
          icon={Zap} 
          title="Real-Time Data" 
          description="Lightning-fast price updates and global market indices at your fingertips."
          onClick={() => scrollToSection('market-data')}
        />
        <AdvantageCard 
          icon={Search} 
          title="Smart Search" 
          description="Search thousands of global symbols and instantly find detailed market intelligence."
          onClick={openSearch}
        />
        <AdvantageCard 
          icon={LayoutDashboard} 
          title="Watchlist Tracking" 
          description="Monitor your favorite assets in one place with our custom-built tracking system."
          onClick={() => router.push('/watchlist')}
        />
        <AdvantageCard 
          icon={Globe} 
          title="Global News" 
          description="Curated financial news from around the world to keep you ahead of the market."
          onClick={() => scrollToSection('news-feed-header')}
        />
      </div>
    </section>
  );
};

export default AdvantageSection;
