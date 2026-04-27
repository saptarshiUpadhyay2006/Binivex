"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Sparkles, Loader2, AlertCircle, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { explainEconomicImpact } from "@/lib/actions/ai.actions";

interface EconomicCalendarProps {
  events: EconomicEvent[];
}

const EconomicCalendar = ({ events }: EconomicCalendarProps) => {
  if (!events || events.length === 0) return null;

  return (
    <section className="flex flex-col gap-8 w-full mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-yellow-500/10">
              <Calendar className="text-yellow-500" size={18} />
            </div>
            Macro Economic Pulse
          </h2>
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">Upcoming market-moving global events</p>
        </div>
        <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Global Schedule</span>
        </div>
      </div>

      <div className="relative pl-8 border-l border-white/5 flex flex-col gap-8 ml-4">
        {events.map((event, index) => (
          <EventItem key={`${event.event}-${index}`} event={event} />
        ))}
      </div>
    </section>
  );
};

const EventItem = ({ event }: { event: EconomicEvent }) => {
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handleExplain = async () => {
    setIsExplaining(true);
    try {
      const result = await explainEconomicImpact({
        event: event.event,
        impact: event.impact
      });
      if (result.success) {
        setExplanation(result.content || "No detailed intelligence available.");
      }
    } catch (error) {
      console.error("Impact explanation error:", error);
    } finally {
      setIsExplaining(false);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "high": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "medium": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      default: return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <div className="relative group">
      {/* Timeline Dot */}
      <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-[#0c0c0e] border-2 border-white/10 group-hover:border-yellow-500/50 transition-colors flex items-center justify-center">
         <div className={cn(
             "w-1.5 h-1.5 rounded-full transition-all",
             event.impact === 'high' ? "bg-red-500" : "bg-gray-700 group-hover:bg-yellow-500"
         )} />
      </div>

      <div className="dashboard-card p-6 flex flex-col gap-4 group-hover:bg-white/[0.03] transition-all border-white/5 hover:border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        {new Date(event.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className={cn(
                        "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                        getImpactColor(event.impact)
                    )}>
                        {event.impact} Impact
                    </span>
                </div>
                <h4 className="text-base font-black text-white tracking-tight group-hover:text-yellow-500 transition-colors">
                    {event.event}
                </h4>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{event.country}</span>
                    {event.unit && <span className="text-[10px] font-bold text-gray-700">({event.unit})</span>}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 md:text-right">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Actual</span>
                    <span className="text-sm font-black text-white">{event.actual !== null ? event.actual : '—'}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Estimate</span>
                    <span className="text-sm font-black text-gray-400">{event.estimate !== null ? event.estimate : '—'}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Prev</span>
                    <span className="text-sm font-black text-gray-500">{event.prev !== null ? event.prev : '—'}</span>
                </div>
            </div>
        </div>

        {explanation && (
            <div className="p-4 rounded-xl bg-yellow-500/[0.03] border border-yellow-500/10 animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={12} className="text-yellow-500" />
                    <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">Intelligence Analysis</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed italic font-medium">
                    {explanation}
                </p>
            </div>
        )}

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <Button 
                onClick={handleExplain}
                disabled={isExplaining || !!explanation}
                variant="ghost" 
                className="h-8 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-yellow-500 hover:bg-yellow-500/5 transition-all gap-2"
            >
                {isExplaining ? <Loader2 size={12} className="animate-spin" /> : <Info size={12} />}
                {isExplaining ? "Analyzing Macro..." : explanation ? "Analysis Verified" : "Why it matters?"}
            </Button>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Macro Signal</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicCalendar;
