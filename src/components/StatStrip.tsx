import React from "react";

export const StatStrip: React.FC = () => {
  return (
    <div className="border-y border-[rgba(20,18,14,0.14)] bg-[#fbfaf6]">
      <div className="max-w-[1180px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-[rgba(20,18,14,0.14)]">
        <div className="p-6 md:p-8">
          <div className="font-display text-3xl md:text-4xl font-bold text-[#16140f]">
            <span className="text-[#c1440e]">1,248</span>
          </div>
          <div className="font-mono text-xs text-[#918c7d] uppercase tracking-wider mt-2">
            Analyses Performed
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="font-display text-3xl md:text-4xl font-bold text-[#16140f]">
            37
          </div>
          <div className="font-mono text-xs text-[#918c7d] uppercase tracking-wider mt-2">
            Active Projects
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="font-display text-3xl md:text-4xl font-bold text-[#16140f]">
            5
          </div>
          <div className="font-mono text-xs text-[#918c7d] uppercase tracking-wider mt-2">
            Models In Production
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="font-display text-3xl md:text-4xl font-bold text-[#16140f] text-[#1c6e78]">
            12.8 km²
          </div>
          <div className="font-mono text-xs text-[#918c7d] uppercase tracking-wider mt-2">
            Flood Extent, Latest Run
          </div>
        </div>
      </div>
    </div>
  );
};
