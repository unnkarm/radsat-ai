import React from "react";
import { Activity, Radio, Cpu, Layers, Sparkles, FileText, Database } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onLaunchConsole: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate, onLaunchConsole }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-[#f1ede3]/90 backdrop-blur-md border-b border-[rgba(20,18,14,0.14)]">
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => onNavigate("hero")}
      >
        <img 
          src="/radsat-logo.jpg" 
          alt="RADSAT AI Logo" 
          className="w-8 h-8 md:w-9 md:h-9 object-contain rounded-full border border-[rgba(20,18,14,0.2)] shadow-xs" 
          referrerPolicy="no-referrer"
        />
        <span className="font-display font-bold text-lg md:text-xl tracking-wider text-[#16140f] group-hover:text-[#c1440e] transition-colors">
          RADSAT AI
        </span>
        <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-[#1c6e78]/10 text-[#1c6e78] border border-[#1c6e78]/20 rounded-full font-semibold uppercase tracking-wider">
          v2.6 EO-INTEL
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-[#55524a]">
        <button 
          onClick={() => onNavigate("dashboard")}
          className={`hover:text-[#16140f] transition-colors ${activeSection === "dashboard" ? "text-[#c1440e] font-semibold" : ""}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => onNavigate("engine")}
          className={`hover:text-[#16140f] transition-colors ${activeSection === "engine" ? "text-[#c1440e] font-semibold" : ""}`}
        >
          Analysis Engine
        </button>
        <button 
          onClick={() => onNavigate("compare")}
          className={`hover:text-[#16140f] transition-colors ${activeSection === "compare" ? "text-[#c1440e] font-semibold" : ""}`}
        >
          Compare
        </button>
        <button 
          onClick={() => onNavigate("analytics")}
          className={`hover:text-[#16140f] transition-colors ${activeSection === "analytics" ? "text-[#c1440e] font-semibold" : ""}`}
        >
          Analytics
        </button>
        <button 
          onClick={() => onNavigate("research")}
          className={`hover:text-[#16140f] transition-colors ${activeSection === "research" ? "text-[#c1440e] font-semibold" : ""}`}
        >
          Experiments
        </button>
        <button 
          onClick={() => onNavigate("datasets")}
          className={`hover:text-[#16140f] transition-colors ${activeSection === "datasets" ? "text-[#c1440e] font-semibold" : ""}`}
        >
          Datasets
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onLaunchConsole}
          className="font-mono text-xs tracking-wider border border-[rgba(20,18,14,0.34)] px-4 py-2 text-[#16140f] bg-[#fbfaf6] hover:border-[#c1440e] hover:text-[#c1440e] hover:bg-white transition-all flex items-center gap-2 font-semibold shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c1440e]" />
          <span>LAUNCH CONSOLE →</span>
        </button>
      </div>
    </nav>
  );
};
