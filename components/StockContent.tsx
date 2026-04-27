"use client";

import React, { useState } from "react";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";
import StockTabs from "./StockTabs";
import AnalystRatings from "./AnalystRatings";
import EarningsCalendar from "./EarningsCalendar";
import { 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Calendar,
  Sparkles,
  Info
} from "lucide-react";

interface StockContentProps {
  symbol: string;
  recommendations: RecommendationTrend[];
  earnings: EarningsCalendarEvent[];
  financials: BasicFinancials | null;
}

const StockContent = ({ symbol, recommendations, earnings, financials }: StockContentProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 size={16} /> },
    { id: "financials", label: "Financials", icon: <FileText size={16} /> },
    { id: "analysis", label: "Analysis", icon: <TrendingUp size={16} /> },
    { id: "earnings", label: "Earnings", icon: <Calendar size={16} /> },
  ];

  return (
    <div className="flex flex-col gap-6">
      <StockTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {activeTab === "overview" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TradingViewWidget
                scriptUrl={`${scriptUrl}advanced-chart.js`}
                config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
                className="custom-chart"
                height={600}
              />
              <TradingViewWidget
                scriptUrl={`${scriptUrl}advanced-chart.js`}
                config={BASELINE_WIDGET_CONFIG(symbol)}
                className="custom-chart"
                height={600}
              />
            </div>
          )}

          {activeTab === "financials" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               {financials && (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                    <MetricCard label="Market Cap" value={`$${((financials.metric.marketCapitalization || 0) / 1000).toFixed(2)}B`} />
                    <MetricCard label="P/E Ratio" value={financials.metric.peExclExtraItemsTTM?.toFixed(2) || 'N/A'} />
                    <MetricCard label="Dividend Yield" value={`${financials.metric.dividendYieldIndicatedAnnual?.toFixed(2) || '0.00'}%`} />
                    <MetricCard label="ROE" value={`${financials.metric.roeTTM?.toFixed(2) || 'N/A'}%`} />
                 </div>
               )}
              <TradingViewWidget
                scriptUrl={`${scriptUrl}financials.js`}
                config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
                height={600}
              />
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AnalystRatings trends={recommendations} />
              <TradingViewWidget
                scriptUrl={`${scriptUrl}technical-analysis.js`}
                config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
                height={450}
              />
            </div>
          )}

          {activeTab === "earnings" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <EarningsCalendar symbol={symbol} events={earnings} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}company-profile.js`}
            config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
            height={500}
          />
          
          <div className="dashboard-card p-6 bg-emerald-500/[0.02] border-emerald-500/10">
             <div className="flex items-center gap-2 mb-3">
                <Info size={16} className="text-emerald-500" />
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Intelligence Note</h4>
             </div>
             <p className="text-xs text-gray-500 leading-relaxed">
                Switch between tabs to see comprehensive fundamental, technical, and analyst intelligence for {symbol}. 
                The financials and earnings data are updated daily.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</span>
    <span className="text-sm font-bold text-white">{value}</span>
  </div>
);

export default StockContent;
