import React, { useState } from "react";
import { ExperimentRun } from "../types";
import { Database, Plus, Search, Trophy, ArrowUpDown } from "lucide-react";

interface ExperimentTrackerSectionProps {
  experiments: ExperimentRun[];
  onAddExperiment: (exp: ExperimentRun) => void;
}

export const ExperimentTrackerSection: React.FC<ExperimentTrackerSectionProps> = ({
  experiments,
  onAddExperiment,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"iou" | "dice" | "f1">("iou");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [runName, setRunName] = useState("");
  const [dataset, setDataset] = useState("Sen1Floods11");
  const [epochs, setEpochs] = useState(100);
  const [learningRate, setLearningRate] = useState("1e-4");
  const [iou, setIou] = useState(0.85);
  const [dice, setDice] = useState(0.91);
  const [f1, setF1] = useState(0.89);
  const [notes, setNotes] = useState("");

  const filtered = experiments
    .filter(
      (e) =>
        e.runName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.dataset.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b[sortBy] - a[sortBy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!runName.trim()) return;

    const newExp: ExperimentRun = {
      id: `exp_${Date.now()}`,
      runName,
      dataset,
      epochs: Number(epochs),
      learningRate,
      iou: Number(iou),
      dice: Number(dice),
      f1: Number(f1),
      date: new Date().toISOString().split("T")[0],
      notes,
    };

    onAddExperiment(newExp);
    setRunName("");
    setNotes("");
    setIsModalOpen(false);
  };

  return (
    <section id="research" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="eyebrow signal">10 · ML Experiment Tracker</div>
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
              Reproducible research by construction.
            </h2>
            <p className="text-[#55524a] text-base mt-2 max-w-xl">
              Log model hyperparameters, learning rate schedules, dataset splits, IoU, Dice scores, and loss curves in a W&B-style experiment portal.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-mono text-xs tracking-wider border border-[rgba(20,18,14,0.34)] bg-[#fbfaf6] px-5 py-3 hover:border-[#1c6e78] hover:text-[#1c6e78] transition-all flex items-center gap-2 font-semibold cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 text-[#1c6e78]" />
              <span>LOG TRAINING RUN</span>
            </button>
          </div>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-[#fbfaf6] p-4 border border-[rgba(20,18,14,0.14)]">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#918c7d]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by run name or dataset..."
              className="w-full bg-white border border-[rgba(20,18,14,0.34)] pl-9 pr-3 py-2 text-xs font-mono focus:outline-none focus:border-[#1c6e78]"
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#55524a]">
            <span>Sort by:</span>
            <button
              onClick={() => setSortBy("iou")}
              className={`px-3 py-1 border cursor-pointer ${
                sortBy === "iou" ? "border-[#1c6e78] bg-[#1c6e78]/10 text-[#16140f] font-bold" : "border-[rgba(20,18,14,0.2)]"
              }`}
            >
              IoU
            </button>
            <button
              onClick={() => setSortBy("dice")}
              className={`px-3 py-1 border cursor-pointer ${
                sortBy === "dice" ? "border-[#1c6e78] bg-[#1c6e78]/10 text-[#16140f] font-bold" : "border-[rgba(20,18,14,0.2)]"
              }`}
            >
              Dice
            </button>
            <button
              onClick={() => setSortBy("f1")}
              className={`px-3 py-1 border cursor-pointer ${
                sortBy === "f1" ? "border-[#1c6e78] bg-[#1c6e78]/10 text-[#16140f] font-bold" : "border-[rgba(20,18,14,0.2)]"
              }`}
            >
              F1
            </button>
          </div>
        </div>

        {/* Experiment Runs Table */}
        <div className="radsat-panel overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[rgba(20,18,14,0.34)] font-mono text-[11px] uppercase tracking-wider text-[#918c7d] bg-[#f3eee2]">
                <th className="p-4">Run ID</th>
                <th className="p-4">Dataset Split</th>
                <th className="p-4">Epochs</th>
                <th className="p-4">LR</th>
                <th className="p-4">IoU Score</th>
                <th className="p-4">Dice Score</th>
                <th className="p-4">F1 Score</th>
                <th className="p-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(20,18,14,0.14)] font-sans">
              {filtered.map((run) => (
                <tr key={run.id} className="hover:bg-[#f3eee2] transition-colors">
                  <td className="p-4 font-mono font-bold text-[#16140f] flex items-center gap-2">
                    {run.isBest && <Trophy className="w-3.5 h-3.5 text-[#c1440e]" title="SOTA Run" />}
                    <span>{run.runName}</span>
                  </td>
                  <td className="p-4 text-[#55524a]">{run.dataset}</td>
                  <td className="p-4 font-mono">{run.epochs}</td>
                  <td className="p-4 font-mono">{run.learningRate}</td>
                  <td className={`p-4 font-mono font-bold ${run.isBest ? "text-[#4c7a3d]" : "text-[#16140f]"}`}>
                    {run.iou.toFixed(2)}
                  </td>
                  <td className={`p-4 font-mono font-bold ${run.isBest ? "text-[#4c7a3d]" : "text-[#16140f]"}`}>
                    {run.dice.toFixed(2)}
                  </td>
                  <td className="p-4 font-mono">{run.f1.toFixed(2)}</td>
                  <td className="p-4 text-[#55524a] max-w-xs truncate">{run.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal: Log New Run */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#fbfaf6] border border-[rgba(20,18,14,0.34)] p-6 md:p-8 max-w-lg w-full relative shadow-xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-[#918c7d] hover:text-[#16140f] font-mono text-xs"
              >
                CLOSE [X]
              </button>

              <div className="eyebrow">EXPERIMENT LOGGER</div>
              <h3 className="font-display font-bold text-xl text-[#16140f] mb-4">
                Record New Training Run
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">Run Name</label>
                  <input
                    type="text"
                    required
                    value={runName}
                    onChange={(e) => setRunName(e.target.value)}
                    placeholder="e.g. exp_034_segformer_cosine"
                    className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-xs font-mono focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">Dataset</label>
                    <input
                      type="text"
                      value={dataset}
                      onChange={(e) => setDataset(e.target.value)}
                      className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">Learning Rate</label>
                    <input
                      type="text"
                      value={learningRate}
                      onChange={(e) => setLearningRate(e.target.value)}
                      className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">IoU Score</label>
                    <input
                      type="number"
                      step="0.01"
                      value={iou}
                      onChange={(e) => setIou(Number(e.target.value))}
                      className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">Dice Score</label>
                    <input
                      type="number"
                      step="0.01"
                      value={dice}
                      onChange={(e) => setDice(Number(e.target.value))}
                      className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">F1 Score</label>
                    <input
                      type="number"
                      step="0.01"
                      value={f1}
                      onChange={(e) => setF1(Number(e.target.value))}
                      className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">Run Observations</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-xs font-sans"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="submit"
                    className="font-mono text-xs px-5 py-2 bg-[#1c6e78] text-white font-bold"
                  >
                    Log Run
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
