import React, { useState } from "react";
import { PredictionRecord } from "../types";
import { Clock, Search, RotateCcw } from "lucide-react";

interface PredictionHistorySectionProps {
  predictions: PredictionRecord[];
  onRerun: (record: PredictionRecord) => void;
}

export const PredictionHistorySection: React.FC<PredictionHistorySectionProps> = ({
  predictions,
  onRerun,
}) => {
  const [filter, setFilter] = useState("");

  const filtered = predictions.filter(
    (p) =>
      p.projectTitle.toLowerCase().includes(filter.toLowerCase()) ||
      p.modelVersion.toLowerCase().includes(filter.toLowerCase()) ||
      p.task.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section id="history" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="eyebrow">13 · Prediction History Log</div>
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
              Every inference session, logged.
            </h2>
            <p className="text-[#55524a] text-base mt-2 max-w-xl">
              Complete audit trial of past inference requests, task heads, confidence scores, and processing latencies.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#918c7d]" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search history..."
              className="w-full bg-[#fbfaf6] border border-[rgba(20,18,14,0.34)] pl-9 pr-3 py-2 text-xs font-mono focus:outline-none focus:border-[#c1440e]"
            />
          </div>
        </div>

        <div className="radsat-panel overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(20,18,14,0.34)] font-mono text-[11px] uppercase tracking-wider text-[#918c7d] bg-[#f3eee2]">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Project Title</th>
                <th className="p-4">Task Head</th>
                <th className="p-4">Model Version</th>
                <th className="p-4">Result Summary</th>
                <th className="p-4">Processing Time</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(20,18,14,0.14)] font-sans">
              {filtered.map((pred) => (
                <tr key={pred.id} className="hover:bg-[#f3eee2] transition-colors">
                  <td className="p-4 font-mono text-[#918c7d]">{pred.date}</td>
                  <td className="p-4 font-bold text-[#16140f]">{pred.projectTitle}</td>
                  <td className="p-4 font-mono text-[#1c6e78]">{pred.task}</td>
                  <td className="p-4 font-mono text-[#55524a]">{pred.modelVersion}</td>
                  <td className="p-4 font-mono font-semibold text-[#c1440e]">{pred.result}</td>
                  <td className="p-4 font-mono">{pred.processingTime}</td>
                  <td className="p-4">
                    <button
                      onClick={() => onRerun(pred)}
                      className="font-mono text-[11px] uppercase text-[#1c6e78] hover:text-[#c1440e] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Rerun</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
