"use client";

import React, { useState } from "react";
import { useUI } from "@/context/UIContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Search, TrendingUp, Globe, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Discover Stocks",
    description: "Use our lightning-fast search to find thousands of global symbols and market indices.",
    icon: <Search className="text-yellow-500" size={32} />,
    color: "from-yellow-500/20",
  },
  {
    title: "Track Your Favorites",
    description: "Add stocks to your personal watchlist to monitor real-time price movements and performance.",
    icon: <TrendingUp className="text-emerald-500" size={32} />,
    color: "from-emerald-500/20",
  },
  {
    title: "Global Intelligence",
    description: "Stay ahead with curated global news and real-time market stories integrated directly into your flow.",
    icon: <Globe className="text-blue-500" size={32} />,
    color: "from-blue-500/20",
  },
  {
    title: "AI-Powered Insights",
    description: "Leverage advanced analytics and upcoming AI summaries to make informed investment decisions.",
    icon: <Sparkles className="text-purple-500" size={32} />,
    color: "from-purple-500/20",
  },
];

const TutorialModal = () => {
  const { isTutorialOpen, setIsTutorialOpen, openSearch } = useUI();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsTutorialOpen(false);
      setCurrentStep(0);
      openSearch();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isTutorialOpen} onOpenChange={setIsTutorialOpen}>
      <DialogContent className="sm:max-w-[500px] bg-[#09090b] border-white/5 p-0 overflow-hidden">
        <div className={`h-2 bg-gradient-to-r from-yellow-500 to-transparent w-full`} style={{ width: `${((currentStep + 1) / steps.length) * 100}%`, transition: 'width 0.3s ease' }} />
        
        <div className="p-8">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${steps[currentStep].color} to-transparent flex items-center justify-center mb-6`}>
            {steps[currentStep].icon}
          </div>

          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              {steps[currentStep].title}
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-base leading-relaxed">
              {steps[currentStep].description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between mt-10">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-yellow-500' : 'w-1.5 bg-white/10'}`} 
                />
              ))}
            </div>

            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrev}
                  className="border-white/5 text-gray-400 hover:bg-white/5 rounded-xl h-10 w-10 p-0"
                >
                  <ChevronLeft size={20} />
                </Button>
              )}
              <Button 
                onClick={handleNext}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 rounded-xl h-10"
              >
                {currentStep === steps.length - 1 ? "Start Exploring" : "Next"}
                {currentStep < steps.length - 1 && <ChevronRight size={18} className="ml-1" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;
