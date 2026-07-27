import React, { useState } from "react";
import { SatelliteSampleScene } from "../types";

interface CompareSectionProps {
  selectedScene: SatelliteSampleScene;
}

export const CompareSection: React.FC<CompareSectionProps> = ({ selectedScene }) => {
  const [splitPct, setSplitPct] = useState(50);

  return (
    <section id="compare" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">06 · Before vs After Comparison</div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
            Drag slider to isolate bitemporal change.
          </h2>
          <p className="text-[#55524a] text-base mt-2">
            Compare historical baseline satellite passes with the latest observation pass to pinpoint flooding, forest clearing, or new infrastructure.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="radsat-panel overflow-hidden">
          <div className="relative aspect-[16/8.5] w-full overflow-hidden select-none">
            {/* Before Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#14231f] to-[#0c1613]">
              <div className="absolute top-4 left-4 font-mono text-xs tracking-wider px-3 py-1.5 bg-[#0a0d10]/80 text-white border border-[rgba(255,255,255,0.2)]">
                BEFORE · {selectedScene.beforeDate}
              </div>
            </div>

            {/* After Layer (Clipped) */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#0d3b45] to-[#0a1518]"
              style={{ clipPath: `inset(0 0 0 ${splitPct}%)` }}
            >
              {/* After Layer Water Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_40%_55%,rgba(62,198,224,0.6),transparent_60%)] mix-blend-screen" />
              
              <div className="absolute top-4 right-4 font-mono text-xs tracking-wider px-3 py-1.5 bg-[#0a0d10]/80 text-white border border-[rgba(255,255,255,0.2)]">
                AFTER · {selectedScene.afterDate}
              </div>
            </div>

            {/* Split Handle Bar */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#c1440e] shadow-[0_0_12px_rgba(255,106,26,0.6)] z-10"
              style={{ left: `${splitPct}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-[#c1440e] text-[#0a0d10] rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                ⇔
              </div>
            </div>
          </div>

          {/* Range Input Slider Control */}
          <div className="p-6 bg-[#fbfaf6] border-t border-[rgba(20,18,14,0.14)]">
            <input
              type="range"
              min="0"
              max="100"
              value={splitPct}
              onChange={(e) => setSplitPct(Number(e.target.value))}
              className="w-full accent-[#c1440e] cursor-pointer"
            />

            {/* Change Metrics Callouts */}
            <div className="flex flex-wrap gap-6 mt-6 font-mono text-xs text-[#55524a]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#1c6e78]" />
                <span>Flooded Area: {selectedScene.floodedKm2} (+38%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#4c7a3d]" />
                <span>Vegetation Delta: {selectedScene.forestLossPercent}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#c1440e]" />
                <span>Structures Identified: {selectedScene.structuresDetected}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
