import React, { useState } from "react";
import { Project } from "../types";
import { FolderPlus, Layers, FileText, ArrowUpRight, Plus, X } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
  onAddProject: (project: Project) => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onAddProject,
  onSelectProject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Disaster Relief");
  const [sensor, setSensor] = useState("Sentinel-2 MSI");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title,
      description,
      imageCount: 1,
      reportCount: 0,
      gradient: "linear-gradient(135deg, #173832, #0c1613)",
      category,
      lastUpdated: new Date().toISOString().split("T")[0],
      sensor,
    };

    onAddProject(newProj);
    setTitle("");
    setDescription("");
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="eyebrow">02 · Project Management</div>
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
              Organize every study by area of interest.
            </h2>
            <p className="text-[#55524a] text-base mt-2 max-w-xl">
              Each project holds its bitemporal satellite imagery, segmentation masks, reports, model versions, and researchers' field notes.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="font-mono text-xs tracking-wider border border-[rgba(20,18,14,0.34)] bg-[#fbfaf6] px-5 py-3 hover:border-[#c1440e] hover:text-[#c1440e] transition-all flex items-center gap-2 font-semibold cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-[#c1440e]" />
            <span>NEW RESEARCH PROJECT</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(20,18,14,0.14)] border border-[rgba(20,18,14,0.14)]">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="bg-[#fbfaf6] p-6 flex flex-col justify-between min-h-[260px] hover:bg-[#f3eee2] transition-all cursor-pointer group relative"
            >
              <div>
                <div
                  className="w-full h-16 rounded-xs mb-4 transition-transform group-hover:scale-[1.02]"
                  style={{ background: proj.gradient }}
                />
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-[#1c6e78] uppercase tracking-wider font-semibold">
                    {proj.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#918c7d] group-hover:text-[#c1440e] transition-colors" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#16140f] group-hover:text-[#c1440e] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#55524a] mt-2 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(20,18,14,0.14)] flex items-center justify-between font-mono text-[11px] text-[#918c7d]">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {proj.imageCount} images
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {proj.reportCount} reports
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fbfaf6] border border-[rgba(20,18,14,0.34)] p-6 md:p-8 max-w-lg w-full relative shadow-xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#918c7d] hover:text-[#16140f]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="eyebrow">CREATE PROJECT</div>
            <h3 className="font-display font-bold text-xl text-[#16140f] mb-4">
              Initialize New RADSAT Study
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Brahmaputra Basin Surge 2026"
                  className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-sm font-sans focus:outline-none focus:border-[#c1440e]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-sm font-sans focus:outline-none focus:border-[#c1440e]"
                >
                  <option value="Flood Disaster">Flood Disaster</option>
                  <option value="Defence & Border">Defence & Border</option>
                  <option value="Maritime SAR">Maritime SAR</option>
                  <option value="Urban Growth">Urban Growth</option>
                  <option value="Environment">Environment</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">
                  Primary Sensor / Platform
                </label>
                <input
                  type="text"
                  value={sensor}
                  onChange={(e) => setSensor(e.target.value)}
                  placeholder="e.g. Sentinel-1 SAR / WorldView-3"
                  className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-sm font-sans focus:outline-none focus:border-[#c1440e]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">
                  Description & Scope
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe area of interest, sensor resolution, and mission objectives..."
                  className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-sm font-sans focus:outline-none focus:border-[#c1440e]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="font-mono text-xs px-4 py-2 border border-[rgba(20,18,14,0.34)] text-[#55524a]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="font-mono text-xs px-5 py-2 bg-[#c1440e] text-white font-bold"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
