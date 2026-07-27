import React from "react";
import { Radio, ArrowRight, Shield, Layers, Activity } from "lucide-react";

interface HeroSectionProps {
  onRunAnalysis: () => void;
  onSeeCompare: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRunAnalysis, onSeeCompare }) => {
  return (
    <section id="hero" className="relative pt-32 pb-16 bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        {/* Sensor Info Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(20,18,14,0.14)] border border-[rgba(20,18,14,0.14)] shadow-xs">
          <div className="bg-[#fbfaf6] p-3 md:p-4">
            <div className="font-mono text-[10px] text-[#918c7d] uppercase tracking-wider">Sensor</div>
            <div className="font-mono text-xs md:text-sm text-[#16140f] font-semibold mt-1">Sentinel-2 MSI</div>
          </div>
          <div className="bg-[#fbfaf6] p-3 md:p-4">
            <div className="font-mono text-[10px] text-[#918c7d] uppercase tracking-wider">Pass Time</div>
            <div className="font-mono text-xs md:text-sm text-[#16140f] font-semibold mt-1">14:22:07 UTC</div>
          </div>
          <div className="bg-[#fbfaf6] p-3 md:p-4">
            <div className="font-mono text-[10px] text-[#918c7d] uppercase tracking-wider">Active Model</div>
            <div className="font-mono text-xs md:text-sm text-[#16140f] font-semibold mt-1">U-Net · ResNet34</div>
          </div>
          <div className="bg-[#fbfaf6] p-3 md:p-4">
            <div className="font-mono text-[10px] text-[#918c7d] uppercase tracking-wider">Avg. Confidence</div>
            <div className="font-mono text-xs md:text-sm text-[#c1440e] font-bold mt-1">96.2%</div>
          </div>
        </div>

        {/* Display Heading */}
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tight my-10 text-[#16140f] uppercase">
          Every pixel<br />
          of <em className="not-italic text-[#c1440e]">change.</em>
        </h1>

        {/* Hero Brand Badge with Official RADSAT AI Logo */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 p-5 md:p-6 bg-[#0a0d10] border border-[#1c6e78]/40 rounded-xs text-white shadow-md">
          <img 
            src="/radsat-logo.jpg" 
            alt="RADSAT AI - See More. Know First." 
            className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-xs border border-white/20 bg-black/50 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#3ec6e0] uppercase tracking-widest mb-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#3ec6e0] animate-pulse" />
              RADSAT AI PLATFORM · SEE MORE. KNOW FIRST.
            </div>
            <h2 className="font-display font-black text-xl md:text-2xl uppercase tracking-tight text-white">
              Satellite Earth Observation & AI Intelligence
            </h2>
            <p className="text-gray-300 text-xs md:text-sm mt-2 max-w-2xl leading-relaxed font-sans">
              Deep learning satellite imagery analysis for automated flood extent mapping, vessel detection, building footprints, and bitemporal change detection.
            </p>
          </div>
        </div>

        {/* Tagline & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-[rgba(20,18,14,0.14)] pt-8 pb-12">
          <div>
            <div className="eyebrow">
              RADSAT AI — SATELLITE IMAGE INTELLIGENCE
            </div>
            <p className="text-[#55524a] text-base md:text-lg max-w-xl leading-relaxed mt-2">
              Deep learning satellite imagery intelligence for flood extents, building footprints, vessel detection, and land-cover shifts — backed by PyTorch segmentation and Gemini multimodal reasoning.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onRunAnalysis}
              className="font-mono text-xs md:text-sm tracking-wider bg-[#c1440e] text-white font-bold px-6 py-3.5 rounded-xs hover:bg-[#a0360a] transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Run an Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onSeeCompare}
              className="font-mono text-xs md:text-sm tracking-wider border border-[rgba(20,18,14,0.34)] text-[#16140f] font-medium px-6 py-3.5 rounded-xs hover:border-[#16140f] hover:bg-white transition-all cursor-pointer"
            >
              See Before / After
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
