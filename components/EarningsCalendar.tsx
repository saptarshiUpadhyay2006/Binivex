"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Sparkles, Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { summarizeEarnings } from "@/lib/actions/ai.actions";
import ReactMarkdown from "react-markdown";

interface EarningsCalendarProps {
  symbol: string;
  events: EarningsCalendarEvent[];
}

const EarningsCalendar = ({ symbol, events }: EarningsCalendarProps) => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  if (!events || events.length === 0) {
    return (
      <div className="dashboard-card p-10 flex flex-col items-center justify-center text-center gap-3">
        <Calendar size={40} className="text-gray-700 mb-2" />
        <h3 className="text-white font-bold">No Earnings Data</h3>
        <p className="text-xs text-gray-500 max-w-xs">We couldn't find any scheduled earnings events for this symbol in our database.</p>
      </div>
    );
  }

  // Sort events: Upcoming first, then past
  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const result = await summarizeEarnings({ symbol, earningsData: events });
      if (result.success) {
        setSummary(result.content || "No summary available.");
      }
    } catch (error) {
      console.error("Summary error:", error);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* AI Summary Section */}
      <div className="dashboard-card p-6 bg-gradient-to-br from-yellow-500/[0.05] to-transparent border-yellow-500/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-500" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Earnings Intelligence</h3>
          </div>
          {!summary && (
             <Button 
                onClick={handleSummarize}
                disabled={isSummarizing}
                size="sm" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-8 text-[10px] uppercase tracking-widest px-4 rounded-full"
             >
                {isSummarizing ? <Loader2 size={12} className="animate-spin mr-2" /> : <Sparkles size={12} className="mr-2" />}
                {isSummarizing ? "Analyzing..." : "Summarize Trends"}
             </Button>
          )}
        </div>

        {summary ? (
          <div className="prose prose-invert prose-sm max-w-none prose-p:text-gray-400 prose-strong:text-yellow-500 animate-in fade-in duration-700">
            <ReactMarkdown>{summary}</ReactMarkdown>
            <Button 
                variant="ghost" 
                onClick={() => setSummary(null)}
                className="mt-4 text-[10px] text-gray-600 hover:text-white uppercase tracking-widest font-bold h-6 p-0"
            >
                Clear Summary
            </Button>
          </div>
        ) : (
          <p className="text-xs text-gray-500 italic">
            Generate an AI-powered summary of historical beats/misses and future expectations for {symbol}.
          </p>
        )}
      </div>

      {/* Events Table */}
      <div className="dashboard-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Period</th>
              <th className="px-6 py-4 text-right">EPS (Est / Act)</th>
              <th className="px-6 py-4 text-right">Revenue (Est / Act)</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedEvents.map((event, idx) => {
              const isPast = new Date(event.date) < new Date();
              const epsSurprise = event.epsActual && event.epsEstimate ? event.epsActual > event.epsEstimate : null;

              return (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">{new Date(event.date).toLocaleDateString()}</span>
                      <span className="text-[10px] text-gray-500">{event.hour === "am" ? "Before Market" : "After Market"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-400">
                    Q{event.quarter} {event.year}
                  </td>
                  <td className="px-6 py-4 text-right font-mono">
                    <div className="flex flex-col">
                       <span className="text-xs text-white">${event.epsActual?.toFixed(2) || '---'}</span>
                       <span className="text-[10px] text-gray-600">Est: ${event.epsEstimate?.toFixed(2) || '---'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono">
                    <div className="flex flex-col">
                       <span className="text-xs text-white">{event.revenueActual ? `${(event.revenueActual / 1e9).toFixed(2)}B` : '---'}</span>
                       <span className="text-[10px] text-gray-600">Est: {event.revenueEstimate ? `${(event.revenueEstimate / 1e9).toFixed(2)}B` : '---'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                       {!isPast ? (
                         <div className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest">Upcoming</div>
                       ) : epsSurprise === true ? (
                         <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] uppercase">
                            <TrendingUp size={12} /> Beat
                         </div>
                       ) : epsSurprise === false ? (
                         <div className="flex items-center gap-1 text-red-500 font-bold text-[10px] uppercase">
                            <TrendingDown size={12} /> Miss
                         </div>
                       ) : (
                         <Minus size={12} className="text-gray-700" />
                       )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningsCalendar;
