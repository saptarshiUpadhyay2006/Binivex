import React from 'react';
import Link from 'next/link';
import { Mail, Phone, Heart, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-auto border-t border-white/5 bg-[#09090b]/50 backdrop-blur-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
          <p className="text-sm font-bold text-white tracking-tight">
            Binivex <span className="text-yellow-500 text-[10px] uppercase ml-1 tracking-widest">Intelligence</span>
          </p>
          <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
            Made by <b>Saptarshi Upadhyay</b>
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="mailto:upadhyay.saptarshi@gmail.com"
            className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white transition-colors group"
          >
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-500/10 transition-colors">
              <Mail size={12} className="group-hover:text-yellow-500" />
            </div>
            upadhyay.saptarshi@gmail.com
          </Link>
          <Link
            href="tel:8272918658"
            className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white transition-colors group"
          >
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-500/10 transition-colors">
              <Phone size={12} className="group-hover:text-yellow-500" />
            </div>
            +91 8272918658
          </Link>
          <Link
            href="https://github.com/saptarshiUpadhyay2006"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] text-gray-400 hover:text-white transition-colors group"
          >
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-yellow-500/10 transition-colors">
              <Github size={12} className="group-hover:text-yellow-500" />
            </div>
            GitHub
          </Link>
        </div>

        <div className="text-[10px] text-gray-300 font-medium tracking-widest uppercase">
          &copy; {currentYear} Binivex Platform
        </div>
      </div>
    </footer>
  );
};

export default Footer;
