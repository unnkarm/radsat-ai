import React, { useState } from "react";
import { TaskType, SatelliteSampleScene, GeminiAnalysisResult } from "../types";
import { Sparkles, Activity, Layers, ShieldAlert, Cpu, RefreshCw, ChevronRight } from "lucide-react";

interface EngineSectionProps {
  selectedScene: SatelliteSampleScene;
  customImageDataUrl: string | null;
  onRunGeminiAnalysis: (promptText?: string) => Promise<GeminiAnalysisResult>;
}

export const EngineSection: React.FC<EngineSectionProps> = ({
  selectedScene,
  customImageDataUrl,
  onRunGeminiAnalysis,
}) => {
  const [activeTask, setActiveTask] = useState<TaskType>(selectedScene.task || "Flood detection");
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [geminiResult, setGeminiResult] = useState<GeminiAnalysisResult | null>(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);

  const tasks: { type: TaskType; model: string }[] = [
    { type: "Flood detection", model: "U-Net" },
    { type: "Change detection", model: "DeepLabV3+" },
    { type: "Ship detection", model: "YOLOv8" },
    { type: "Building detection", model: "SegFormer" },
    { type: "Land cover classification", model: "DeepLabV3+" },
  ];

  const handleGeminiQuery = async () => {
    setIsGeminiLoading(true);
    try {
      const res = await onRunGeminiAnalysis(userPrompt);
      setGeminiResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeminiLoading(false);
    }
  };

  return (
    <section id="engine" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-10">
          <div className="eyebrow">04 · AI Analysis Engine</div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
            Choose a task head. RADSAT runs inference.
          </h2>
          <p className="text-[#55524a] text-base mt-2">
            Switch between PyTorch segmentation heads or consult Gemini multimodal AI for comprehensive Earth observation briefs.
          </p>
        </div>

        {/* Task Switcher Chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tasks.map((t) => (
            <button
              key={t.type}
              onClick={() => setActiveTask(t.type)}
              className={`px-4 py-3 border text-xs font-sans transition-all flex items-center gap-2 cursor-pointer rounded-full ${
                activeTask === t.type
                  ? "border-[#c1440e] bg-[#c1440e]/10 text-[#16140f] font-semibold"
                  : "border-[rgba(20,18,14,0.34)] text-[#55524a] bg-[#fbfaf6] hover:border-[#16140f]"
              }`}
            >
              <span>{t.type}</span>
              <span className="font-mono text-[10px] text-[#918c7d]">({t.model})</span>
            </button>
          ))}
        </div>

        {/* Main Analysis Result Panel */}
        <div className="radsat-panel">
          <div className="flex items-center justify-between p-4 border-b border-[rgba(20,18,14,0.14)] font-mono text-xs text-[#918c7d] uppercase tracking-wider">
            <span>{activeTask} — Output Preview</span>
            <span className="text-[#16140f] font-semibold">run_id 20260726_0142</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Visual Preview Canvas */}
            <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#0d3b45] to-[#0a1518] border-r border-[rgba(20,18,14,0.14)] flex items-center justify-center">
              {customImageDataUrl ? (
                <img
                  src={customImageDataUrl}
                  alt="Uploaded Satellite Pass"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  {/* Synthetic Satellite Background & Vector Mask */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_40%_55%,rgba(62,198,224,0.55),transparent_60%),radial-gradient(ellipse_30%_22%_at_70%_70%,rgba(62,198,224,0.5),transparent_65%)] mix-blend-screen" />
                  
                  {/* Dynamic Task-based Vector Overlays */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                    {activeTask === "Flood detection" && (
                      <path
                        d="M120,150 C90,180 100,220 150,225 C200,232 230,200 260,210 C300,222 320,190 300,160 C280,130 230,140 200,130 C160,118 150,120 120,150 Z"
                        fill="rgba(62, 198, 224, 0.35)"
                        stroke="#3EC6E0"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                    )}

                    {activeTask === "Ship detection" && (
                      <>
                        <rect x="140" y="110" width="30" height="15" fill="none" stroke="#c1440e" strokeWidth="2" />
                        <text x="140" y="102" fill="#c1440e" fontSize="10" fontFamily="monospace">VESSEL 98%</text>

                        <rect x="220" y="180" width="24" height="12" fill="none" stroke="#c1440e" strokeWidth="2" />
                        <text x="220" y="172" fill="#c1440e" fontSize="10" fontFamily="monospace">VESSEL 95%</text>

                        <rect x="290" y="90" width="35" height="16" fill="none" stroke="#c1440e" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="290" y="82" fill="#c1440e" fontSize="10" fontFamily="monospace">UNLISTED AIS</text>
                      </>
                    )}

                    {activeTask === "Building detection" && (
                      <>
                        <polygon points="80,80 120,80 120,120 80,120" fill="rgba(28, 110, 120, 0.4)" stroke="#1c6e78" strokeWidth="2" />
                        <polygon points="140,90 190,90 190,140 140,140" fill="rgba(28, 110, 120, 0.4)" stroke="#1c6e78" strokeWidth="2" />
                        <polygon points="210,150 270,150 270,210 210,210" fill="rgba(193, 68, 14, 0.5)" stroke="#c1440e" strokeWidth="2" />
                      </>
                    )}

                    {activeTask === "Change detection" && (
                      <path
                        d="M80,50 L320,250 M50,180 L250,50"
                        stroke="#c1440e"
                        strokeWidth="3"
                        strokeDasharray="4 4"
                      />
                    )}
                  </svg>
                </>
              )}

              <div className="absolute top-4 left-4 bg-[#0a0d10]/80 border border-[rgba(255,255,255,0.2)] px-3 py-1 font-mono text-[11px] text-white backdrop-blur-xs">
                {selectedScene.region} · {selectedScene.sensor}
              </div>
            </div>

            {/* Quantitative Metrics Sidebar */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline pb-3 border-b border-[rgba(20,18,14,0.14)]">
                  <span className="text-sm text-[#55524a]">Target Location</span>
                  <span className="font-mono text-base text-[#16140f] font-semibold">{selectedScene.title}</span>
                </div>

                <div className="flex justify-between items-baseline pb-3 border-b border-[rgba(20,18,14,0.14)]">
                  <span className="text-sm text-[#55524a]">Primary Metric</span>
                  <span className="font-mono text-xl text-[#c1440e] font-bold">
                    {activeTask === "Flood detection" && selectedScene.floodedKm2}
                    {activeTask === "Ship detection" && `${selectedScene.vesselsFlagged} vessels`}
                    {activeTask === "Building detection" && `${selectedScene.structuresDetected} structures`}
                    {activeTask === "Change detection" && selectedScene.forestLossPercent}
                    {activeTask === "Land cover classification" && "4 Classes"}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pb-3 border-b border-[rgba(20,18,14,0.14)]">
                  <span className="text-sm text-[#55524a]">Model IoU / Confidence</span>
                  <span className="font-mono text-base text-[#1c6e78] font-bold">{selectedScene.confidence}%</span>
                </div>

                <div className="flex justify-between items-baseline pb-3 border-b border-[rgba(20,18,14,0.14)]">
                  <span className="text-sm text-[#55524a]">Backbone Architecture</span>
                  <span className="font-mono text-sm text-[#16140f]">
                    {activeTask === "Flood detection" && "U-Net (ResNet-34)"}
                    {activeTask === "Change detection" && "DeepLabV3+ (Xception)"}
                    {activeTask === "Ship detection" && "YOLOv8-Ship OBB"}
                    {activeTask === "Building detection" && "SegFormer MiT-B3"}
                    {activeTask === "Land cover classification" && "DeepLabV3+ Multiclass"}
                  </span>
                </div>
              </div>

              {/* Gemini AI Analyst Button */}
              <div className="mt-8 pt-4 border-t border-[rgba(20,18,14,0.14)]">
                <button
                  onClick={() => setShowAiModal(true)}
                  className="w-full bg-[#16140f] text-white hover:bg-[#c1440e] transition-colors p-3.5 font-mono text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#c1440e]" />
                  <span>Consult Gemini AI Analyst</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gemini Satellite AI Modal */}
        {showAiModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#fbfaf6] border border-[rgba(20,18,14,0.34)] p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl">
              <button
                onClick={() => setShowAiModal(false)}
                className="absolute top-4 right-4 text-[#918c7d] hover:text-[#16140f] font-mono text-xs uppercase"
              >
                CLOSE [X]
              </button>

              <div className="eyebrow">GEMINI 3.6 FLASH · EO INTELLIGENCE</div>
              <h3 className="font-display font-black text-2xl text-[#16140f] mb-2">
                Geospatial AI Analysis Brief
              </h3>
              <p className="text-xs text-[#55524a] mb-6 font-mono">
                Location: {selectedScene.title} ({selectedScene.region}) · Task: {activeTask}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">
                    Custom Prompt / Researcher Query (Optional)
                  </label>
                  <input
                    type="text"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="e.g. Estimate affected population density and supply chain risks..."
                    className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-3 text-sm focus:outline-none focus:border-[#c1440e]"
                  />
                </div>

                <button
                  onClick={handleGeminiQuery}
                  disabled={isGeminiLoading}
                  className="w-full bg-[#c1440e] text-white font-mono text-xs font-bold uppercase py-3 hover:bg-[#a0360a] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isGeminiLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Analyzing Satellite Spectral Data...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate AI Geospatial Intelligence</span>
                    </>
                  )}
                </button>
              </div>

              {/* Gemini Response Display */}
              {geminiResult && (
                <div className="mt-6 p-5 bg-[#f3eee2] border border-[rgba(20,18,14,0.2)] rounded-xs font-sans text-sm text-[#16140f] leading-relaxed whitespace-pre-wrap">
                  {geminiResult.analysis}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
