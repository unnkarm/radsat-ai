import React, { useState } from "react";
import { FileText, Download, Printer, Sparkles, Copy, Check } from "lucide-react";
import { SatelliteSampleScene } from "../types";

interface ReportGeneratorSectionProps {
  selectedScene: SatelliteSampleScene;
  onGenerateAiReport: (projectTitle: string, runId: string, metrics: any) => Promise<string>;
}

export const ReportGeneratorSection: React.FC<ReportGeneratorSectionProps> = ({
  selectedScene,
  onGenerateAiReport,
}) => {
  const [reportMarkdown, setReportMarkdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      const markdown = await onGenerateAiReport(
        selectedScene.title,
        `run_id_${Date.now()}`,
        {
          floodedKm2: selectedScene.floodedKm2,
          confidence: selectedScene.confidence,
          vessels: selectedScene.vesselsFlagged,
          structures: selectedScene.structuresDetected,
          forestLoss: selectedScene.forestLossPercent,
        }
      );
      setReportMarkdown(markdown);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (reportMarkdown) {
      navigator.clipboard.writeText(reportMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="reports" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="eyebrow">09 · Automated Report Generator</div>
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f] leading-tight">
              One click from inference to PDF disaster brief.
            </h2>
            <p className="text-[#55524a] text-base mt-4 leading-relaxed">
              Synthesize satellite passes, model telemetry, quantitative metrics, and Gemini executive recommendations into exportable technical disaster briefs for field dispatch.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleGenerateReport}
                disabled={isLoading}
                className="font-mono text-xs font-bold uppercase bg-[#c1440e] text-white px-6 py-3.5 hover:bg-[#a0360a] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isLoading ? "Synthesizing Brief..." : "Generate AI Executive Report"}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="radsat-panel bg-[#fbfaf6]">
              <div className="flex items-center justify-between p-4 border-b border-[rgba(20,18,14,0.14)] font-mono text-xs text-[#918c7d] uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#c1440e]" />
                  report_{selectedScene.id}_2026-07-26.pdf
                </span>
                {reportMarkdown && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-1.5 hover:text-[#16140f] transition-colors"
                      title="Copy Markdown"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#4c7a3d]" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="p-1.5 hover:text-[#16140f] transition-colors"
                      title="Print Report"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8 max-h-[420px] overflow-y-auto font-sans text-sm text-[#16140f] leading-relaxed">
                {reportMarkdown ? (
                  <div className="prose prose-sm max-w-none font-sans whitespace-pre-wrap">
                    {reportMarkdown}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3 bg-[#f3eee2] border border-[rgba(20,18,14,0.14)] font-mono text-xs flex justify-between">
                      <span>LOCATION: {selectedScene.title}</span>
                      <span>SENSOR: {selectedScene.sensor}</span>
                    </div>

                    <div className="divide-y divide-[rgba(20,18,14,0.14)]">
                      <div className="py-2.5 flex justify-between text-xs">
                        <span className="text-[#55524a]">Primary Task</span>
                        <span className="font-mono font-semibold">{selectedScene.task}</span>
                      </div>
                      <div className="py-2.5 flex justify-between text-xs">
                        <span className="text-[#55524a]">Primary Extent / Count</span>
                        <span className="font-mono font-bold text-[#c1440e]">
                          {selectedScene.floodedKm2 !== "0.0 km²"
                            ? selectedScene.floodedKm2
                            : `${selectedScene.structuresDetected || selectedScene.vesselsFlagged} objects`}
                        </span>
                      </div>
                      <div className="py-2.5 flex justify-between text-xs">
                        <span className="text-[#55524a]">Model IoU Confidence</span>
                        <span className="font-mono font-bold text-[#1c6e78]">{selectedScene.confidence}%</span>
                      </div>
                      <div className="py-2.5 flex justify-between text-xs">
                        <span className="text-[#55524a]">Timestamp</span>
                        <span className="font-mono">2026-07-26 14:22:07 UTC</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#918c7d] italic mt-4">
                      Click "Generate AI Executive Report" to synthesize an exhaustive Markdown/PDF disaster brief using Gemini 3.6 Flash.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
