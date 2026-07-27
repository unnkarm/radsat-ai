import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const monthlyData = [
  { month: "Feb", area: 3.2, threshold: 4.0 },
  { month: "Mar", area: 2.8, threshold: 4.0 },
  { month: "Apr", area: 4.1, threshold: 4.0 },
  { month: "May", area: 6.5, threshold: 4.0 },
  { month: "Jun", area: 9.8, threshold: 4.0 },
  { month: "Jul", area: 12.8, threshold: 4.0 },
];

const modelBenchmarks = [
  { model: "U-Net", iou: 82, dice: 89, speedMs: 200 },
  { model: "DeepLabV3+", iou: 85, dice: 91, speedMs: 360 },
  { model: "SegFormer", iou: 87, dice: 92, speedMs: 180 },
  { model: "Siamese U-Net", iou: 84, dice: 90, speedMs: 290 },
  { model: "YOLOv8-Ship", iou: 88, dice: 93, speedMs: 90 },
];

export const AnalyticsSection: React.FC = () => {
  return (
    <section id="analytics" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow signal">08 · Analytics & Model Telemetry</div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
            Temporal trends and model performance.
          </h2>
          <p className="text-[#55524a] text-base mt-2">
            Track flood expansion over time, model inference speeds, and validation metrics across research experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Flood Trend Chart */}
          <div className="radsat-panel p-6">
            <div className="flex justify-between items-baseline mb-6">
              <div className="text-sm font-bold text-[#16140f] uppercase font-display">
                Flood Extent Progression (km²)
              </div>
              <span className="font-mono text-[11px] text-[#918c7d]">ASSAM BASIN 2026</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,18,14,0.1)" />
                  <XAxis dataKey="month" stroke="#918c7d" fontSize={11} fontFamily="monospace" />
                  <YAxis stroke="#918c7d" fontSize={11} fontFamily="monospace" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fbfaf6", borderColor: "rgba(20,18,14,0.34)" }}
                  />
                  <Bar dataKey="area" fill="#c1440e" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-6 mt-4 font-mono text-xs text-[#55524a]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#c1440e]" />
                <span>Monthly Flooded Area (km²)</span>
              </div>
            </div>
          </div>

          {/* Model IoU Benchmark Chart */}
          <div className="radsat-panel p-6">
            <div className="flex justify-between items-baseline mb-6">
              <div className="text-sm font-bold text-[#16140f] uppercase font-display">
                Model IoU vs Inference Speed (ms)
              </div>
              <span className="font-mono text-[11px] text-[#918c7d]">VALIDATION SPLIT</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelBenchmarks} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,18,14,0.1)" />
                  <XAxis dataKey="model" stroke="#918c7d" fontSize={10} fontFamily="monospace" />
                  <YAxis stroke="#918c7d" fontSize={11} fontFamily="monospace" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fbfaf6", borderColor: "rgba(20,18,14,0.34)" }}
                  />
                  <Bar dataKey="iou" fill="#1c6e78" name="IoU %" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="dice" fill="#4c7a3d" name="Dice %" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex gap-6 mt-4 font-mono text-xs text-[#55524a]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#1c6e78]" />
                <span>IoU Score</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#4c7a3d]" />
                <span>Dice Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
