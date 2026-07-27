import React from "react";
import { ModelStatus, Project } from "../types";
import { AlertTriangle, CheckCircle2, Cpu, Eye, Layers } from "lucide-react";

interface DashboardSectionProps {
  models: ModelStatus[];
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigateToEngine: () => void;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  models,
  projects,
  onSelectProject,
  onNavigateToEngine,
}) => {
  return (
    <section id="dashboard" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">01 · Dashboard Overview</div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
            Everything you ran, at a glance.
          </h2>
          <p className="text-[#55524a] text-base mt-3">
            Real-time feed of recent satellite detections, model deployment health, and active Earth observation projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Dashboard Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* KPI Row */}
            <div className="grid grid-cols-3 gap-px bg-[rgba(20,18,14,0.14)] border border-[rgba(20,18,14,0.14)]">
              <div className="bg-[#fbfaf6] p-5">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#16140f]">142</div>
                <div className="text-xs text-[#55524a] mt-1">Analyses this month</div>
              </div>
              <div className="bg-[#fbfaf6] p-5">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#c1440e]">8</div>
                <div className="text-xs text-[#55524a] mt-1">New events flagged</div>
              </div>
              <div className="bg-[#fbfaf6] p-5">
                <div className="font-display text-2xl md:text-3xl font-bold text-[#1c6e78]">96.2%</div>
                <div className="text-xs text-[#55524a] mt-1">Avg. IoU Confidence</div>
              </div>
            </div>

            {/* Event Feed */}
            <div className="radsat-panel">
              <div className="flex items-center justify-between p-4 border-b border-[rgba(20,18,14,0.14)] font-mono text-xs text-[#918c7d] uppercase tracking-wider">
                <span>Latest Detected Events</span>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[rgba(20,18,14,0.34)]" />
                  <span className="w-2 h-2 rounded-full bg-[rgba(20,18,14,0.34)]" />
                  <span className="w-2 h-2 rounded-full bg-[rgba(20,18,14,0.34)]" />
                </div>
              </div>

              <div className="divide-y divide-[rgba(20,18,14,0.14)]">
                <div 
                  onClick={onNavigateToEngine}
                  className="flex items-center gap-4 p-4 hover:bg-[#f3eee2] cursor-pointer transition-colors"
                >
                  <div className="w-11 h-11 rounded-xs flex-shrink-0 bg-gradient-to-br from-[#c1440e]/30 to-[#1c6e78]/20 border border-[rgba(20,18,14,0.14)]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#16140f] truncate">
                      Flood extent surge — Assam, Kamrup district
                    </div>
                    <div className="text-xs font-mono text-[#918c7d] mt-0.5">
                      SENTINEL-1 SAR · 2 hours ago
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full bg-[#c1440e]/10 text-[#c1440e] border border-[#c1440e]/20">
                    +38% water
                  </span>
                </div>

                <div 
                  onClick={onNavigateToEngine}
                  className="flex items-center gap-4 p-4 hover:bg-[#f3eee2] cursor-pointer transition-colors"
                >
                  <div className="w-11 h-11 rounded-xs flex-shrink-0 bg-gradient-to-br from-[#1c6e78]/30 to-[#4c7a3d]/20 border border-[rgba(20,18,14,0.14)]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#16140f] truncate">
                      14 new structures identified — Urban Expansion
                    </div>
                    <div className="text-xs font-mono text-[#918c7d] mt-0.5">
                      PLANETSCOPE · 6 hours ago
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full bg-[#1c6e78]/10 text-[#1c6e78] border border-[#1c6e78]/20">
                    96% conf.
                  </span>
                </div>

                <div 
                  onClick={onNavigateToEngine}
                  className="flex items-center gap-4 p-4 hover:bg-[#f3eee2] cursor-pointer transition-colors"
                >
                  <div className="w-11 h-11 rounded-xs flex-shrink-0 bg-gradient-to-br from-[#4c7a3d]/30 to-[#c1440e]/15 border border-[rgba(20,18,14,0.14)]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#16140f] truncate">
                      3 vessels flagged — Coastal Maritime SAR
                    </div>
                    <div className="text-xs font-mono text-[#918c7d] mt-0.5">
                      SENTINEL-2 MSI · Yesterday
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full bg-[#4c7a3d]/10 text-[#4c7a3d] border border-[#4c7a3d]/20">
                    High conf.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Status Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Model Status */}
            <div className="radsat-panel">
              <div className="p-4 border-b border-[rgba(20,18,14,0.14)] font-mono text-xs text-[#918c7d] uppercase tracking-wider flex items-center justify-between">
                <span>Model Pipeline Status</span>
                <Cpu className="w-4 h-4 text-[#1c6e78]" />
              </div>

              <div className="divide-y divide-[rgba(20,18,14,0.14)]">
                {models.map((model) => (
                  <div key={model.id} className="p-3.5 px-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-2 h-2 rounded-full bg-[#4c7a3d] animate-pulse-ring" />
                      <span className="font-semibold text-[#16140f]">{model.name}</span>
                      <span className="text-[#918c7d]">({model.backbone})</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#918c7d] uppercase">
                      {model.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access Projects */}
            <div className="radsat-panel">
              <div className="p-4 border-b border-[rgba(20,18,14,0.14)] font-mono text-xs text-[#918c7d] uppercase tracking-wider flex items-center justify-between">
                <span>Quick Access Projects</span>
                <Layers className="w-4 h-4 text-[#c1440e]" />
              </div>

              <div className="divide-y divide-[rgba(20,18,14,0.14)]">
                {projects.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectProject(p)}
                    className="p-3.5 px-4 flex items-center justify-between hover:bg-[#f3eee2] cursor-pointer transition-colors text-xs"
                  >
                    <span className="font-medium text-[#16140f]">{p.title}</span>
                    <span className="font-mono text-[11px] text-[#918c7d]">{p.imageCount} images</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
