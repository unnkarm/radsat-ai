import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <img 
            src="/radsat-logo.jpg" 
            alt="RADSAT AI Logo" 
            className="w-8 h-8 object-contain rounded-full border border-[rgba(20,18,14,0.2)]" 
            referrerPolicy="no-referrer"
          />
          <span className="font-display font-bold text-base text-[#16140f] uppercase tracking-wider">
            RADSAT AI
          </span>
        </div>

        <div className="font-mono text-xs text-[#918c7d] tracking-wider uppercase text-center sm:text-right">
          SATELLITE IMAGE INTELLIGENCE PLATFORM · DEFENCE TECH & EO DEMO BUILD · 2026
        </div>
      </div>
    </footer>
  );
};
