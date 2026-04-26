"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { chatWithAI } from "@/lib/actions/ai.actions";
import { cn } from "@/lib/utils";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: 'Hello! I am Binivex AI. How can I help you navigate the markets today?' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const response = await chatWithAI([...messages, userMessage]);
    
    if (response.success && response.content) {
      setMessages(prev => [...prev, { role: 'model', content: response.content || "" }]);
    } else {
      setMessages(prev => [...prev, { role: 'model', content: `Error: ${response.error || "Failed to connect to AI."}` }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-gradient-to-r from-yellow-500/10 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
                <Sparkles size={18} className="text-black" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-none">Binivex AI</h3>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1">Online</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-white hover:bg-white/5"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((m, i) => (
              <div key={i} className={cn(
                "flex flex-col max-w-[85%]",
                m.role === 'user' ? "self-end items-end" : "self-start items-start"
              )}>
                <div className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed",
                  m.role === 'user' 
                    ? "bg-yellow-500 text-black font-medium rounded-tr-none shadow-[0_0_15px_rgba(234,179,8,0.2)]" 
                    : "bg-white/5 text-gray-200 border border-white/5 rounded-tl-none"
                )}>
                  {m.content}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-600 font-bold uppercase tracking-tighter">
                  {m.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                  {m.role === 'user' ? 'You' : 'Binivex AI'}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="self-start flex flex-col items-start max-w-[85%]">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-yellow-500" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 bg-black/20">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center gap-2"
            >
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about markets, stocks..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-12 text-sm text-white focus:outline-none focus:border-yellow-500/50 transition-all placeholder:text-gray-600"
              />
              <Button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1 w-9 h-9 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black p-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl hover:scale-110 active:scale-95 group relative",
          isOpen 
            ? "bg-white/10 text-white border border-white/10" 
            : "bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.3)]"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />}
        {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#09090b] rounded-full animate-bounce" />
        )}
      </Button>
    </div>
  );
};

export default AIChat;
