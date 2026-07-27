import React, { useState } from "react";
import { Dataset } from "../types";
import { Database, Layers, Eye, Globe } from "lucide-react";

interface DatasetExplorerSectionProps {
  datasets: Dataset[];
}

export const DatasetExplorerSection: React.FC<DatasetExplorerSectionProps> = ({ datasets }) => {
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  return (
    <section id="datasets" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow signal">12 · Dataset Explorer</div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
            Know what you are training on.
          </h2>
          <p className="text-[#55524a] text-base mt-2">
            Inspect resolution, multispectral band specs, regional coverage, tile counts, and ground-truth annotations before launching a training sweep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(20,18,14,0.14)] border border-[rgba(20,18,14,0.14)]">
          {datasets.map((ds) => (
            <div key={ds.id} className="bg-[#fbfaf6] p-6 flex flex-col justify-between">
              <div>
                <div
                  className="w-full h-32 rounded-xs mb-4"
                  style={{ background: ds.gradient }}
                />
                <h3 className="font-display font-bold text-lg text-[#16140f]">{ds.name}</h3>
                <p className="text-xs text-[#55524a] mt-2 leading-relaxed">{ds.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(20,18,14,0.14)] space-y-2 font-mono text-[11px] text-[#918c7d]">
                <div className="flex justify-between">
                  <span>Spatial Res:</span>
                  <span className="text-[#16140f] font-semibold">{ds.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tile Count:</span>
                  <span className="text-[#16140f] font-semibold">{ds.tileCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sensor Spec:</span>
                  <span className="text-[#1c6e78] font-semibold">{ds.sensorType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
