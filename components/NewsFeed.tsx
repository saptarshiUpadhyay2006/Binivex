"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Globe, Sparkles, ExternalLink, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { summarizeNewsArticle } from "@/lib/actions/ai.actions";

interface NewsFeedProps {
  articles: MarketNewsArticle[];
}

const NewsFeed = ({ articles }: NewsFeedProps) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between px-1 border-b border-white/5 pb-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-blue-500/10">
                <Globe size={16} className="text-blue-500" />
            </div>
            Global Financial News
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Live Intel</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

const NewsCard = ({ article }: { article: MarketNewsArticle }) => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleSummarize = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSummarizing(true);
    try {
      const result = await summarizeNewsArticle({ 
        headline: article.headline, 
        summary: article.summary 
      });
      if (result.success) {
        setSummary(result.content || "No intelligence summary available.");
      }
    } catch (error) {
      console.error("News summary error:", error);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="dashboard-card p-6 flex flex-col gap-5 group hover:bg-white/[0.03] transition-all border-white/5 hover:border-white/10">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {article.image && (
          <div className="w-full sm:w-32 h-32 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-white/5 shadow-2xl relative">
            <img 
              src={article.image} 
              alt={article.headline} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-widest border border-blue-500/10">
                {article.source}
            </span>
            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                {new Date(article.datetime * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h4 className="text-base font-black text-white leading-tight group-hover:text-yellow-500 transition-colors tracking-tight">
            {article.headline}
          </h4>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium">
            {article.summary}
          </p>
        </div>
      </div>

      {summary && (
        <div className="p-4 rounded-xl bg-yellow-500/[0.03] border border-yellow-500/10 animate-in fade-in slide-in-from-top-2 duration-500">
           <div className="flex items-center gap-2 mb-2">
              <Sparkles size={12} className="text-yellow-500" />
              <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">Intelligence TL;DR</span>
           </div>
           <p className="text-[11px] text-gray-400 leading-relaxed italic font-medium">
              "{summary.replace(/"/g, '')}"
           </p>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-1">
        <Button 
          onClick={handleSummarize}
          disabled={isSummarizing || !!summary}
          variant="ghost" 
          className="h-8 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-yellow-500 hover:bg-yellow-500/5 transition-all gap-2"
        >
          {isSummarizing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
          {isSummarizing ? "Synthesizing..." : summary ? "Intelligence Verified" : "Analyze Context"}
        </Button>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white flex items-center gap-2 transition-colors"
        >
          Full Intel <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};

export default NewsFeed;
