"use client";

import React, { useRef, useState } from "react";
import { LucideIcon } from "lucide-react";

interface AdvantageCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

const AdvantageCard = ({ icon: Icon, title, description, onClick }: AdvantageCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-yellow-500/20 transition-all duration-300 group cursor-pointer overflow-hidden"
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(234, 179, 8, 0.06), transparent 40%)`,
        }}
      />

      <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 group-hover:bg-yellow-500/20 transition-all duration-500 relative z-10">
        <Icon size={24} className="group-hover:rotate-6 transition-transform" />
      </div>
      
      <div className="relative z-10">
        <h3 className="font-bold text-white text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
          {description}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </div>
      </div>
    </div>
  );
};

export default AdvantageCard;
