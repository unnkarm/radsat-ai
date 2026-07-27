import React from "react";
import { ModelStatus } from "../types";

interface ModelComparisonSectionProps {
  models: ModelStatus[];
}

export const ModelComparisonSection: React.FC<ModelComparisonSectionProps> = ({ models }) => {
  return (
    <section id="models" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">11 · Architecture Comparison</div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
            Justify the model backbone for production.
          </h2>
          <p className="text-[#55524a] text-base mt-2">
            Evaluate deep learning segmentation and object detection backbones based on accuracy, latency budget, and memory limits.
          </p>
        </div>

        <div className="radsat-panel overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(20,18,14,0.34)] font-mono text-[11px] uppercase tracking-wider text-[#918c7d] bg-[#f3eee2]">
                <th className="p-4">Architecture</th>
                <th className="p-4">Backbone</th>
                <th className="p-4">Target Task</th>
                <th className="p-4">IoU</th>
                <th className="p-4">Dice Score</th>
                <th className="p-4">Inference Time</th>
                <th className="p-4">VRAM Footprint</th>
                <th className="p-4">Deployment Fit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(20,18,14,0.14)] font-sans">
              {models.map((m) => (
                <tr key={m.id} className="hover:bg-[#f3eee2] transition-colors">
                  <td className="p-4 font-mono font-bold text-[#16140f]">{m.name}</td>
                  <td className="p-4 font-mono text-[#55524a]">{m.backbone}</td>
                  <td className="p-4 text-[#55524a]">{m.task}</td>
                  <td className="p-4 font-mono font-bold text-[#1c6e78]">{m.iou.toFixed(2)}</td>
                  <td className="p-4 font-mono font-bold text-[#4c7a3d]">{m.dice.toFixed(2)}</td>
                  <td className="p-4 font-mono">{m.inferenceTimeMs} ms</td>
                  <td className="p-4 font-mono">{m.memoryMb} MB</td>
                  <td className="p-4 text-[#55524a]">
                    {m.name === "U-Net" && "Disaster Rapid Response"}
                    {m.name === "DeepLabV3+" && "Multi-Spectral Land Cover"}
                    {m.name === "SegFormer" && "Real-Time Urban Footprints"}
                    {m.name === "Siamese U-Net" && "Bitemporal Change Mapping"}
                    {m.name === "YOLOv8-Ship" && "Edge Harbor Vessel Monitoring"}
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
