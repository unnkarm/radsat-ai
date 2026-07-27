import React, { useState } from "react";
import { NotebookEntry } from "../types";
import { BookOpen, Plus, Tag, Calendar, User } from "lucide-react";

interface ResearchNotebookSectionProps {
  entries: NotebookEntry[];
  onAddNote: (entry: NotebookEntry) => void;
}

export const ResearchNotebookSection: React.FC<ResearchNotebookSectionProps> = ({
  entries,
  onAddNote,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsStr, setTagsStr] = useState("Research, Model Observation");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNote: NotebookEntry = {
      id: `note-${Date.now()}`,
      title,
      date: new Date().toISOString().split("T")[0],
      author: "RADSAT Lead Researcher",
      content,
      tags: tagsStr.split(",").map((t) => t.trim()),
    };

    onAddNote(newNote);
    setTitle("");
    setContent("");
    setIsModalOpen(false);
  };

  return (
    <section id="notebook" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="eyebrow signal">14 · Research Notebook</div>
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
              The reasoning behind the numbers.
            </h2>
            <p className="text-[#55524a] text-base mt-2 max-w-xl">
              Document qualitative observations, hypotheses, failure cases, and domain findings alongside quantitative metrics.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="font-mono text-xs tracking-wider border border-[rgba(20,18,14,0.34)] bg-[#fbfaf6] px-5 py-3 hover:border-[#1c6e78] hover:text-[#1c6e78] transition-all flex items-center gap-2 font-semibold cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4 text-[#1c6e78]" />
            <span>NEW RESEARCH NOTE</span>
          </button>
        </div>

        {/* Notebook Entries List */}
        <div className="divide-y divide-[rgba(20,18,14,0.14)] border border-[rgba(20,18,14,0.14)] bg-[#fbfaf6]">
          {entries.map((note) => (
            <div key={note.id} className="p-6 md:p-8 hover:bg-[#f3eee2] transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <h3 className="font-display font-bold text-lg text-[#16140f]">{note.title}</h3>
                <div className="flex items-center gap-4 font-mono text-xs text-[#918c7d]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {note.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {note.author}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#55524a] leading-relaxed mb-4">{note.content}</p>

              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] text-[#1c6e78] bg-[#1c6e78]/10 border border-[#1c6e78]/20 px-2.5 py-0.5 rounded-full uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Create Note */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#fbfaf6] border border-[rgba(20,18,14,0.34)] p-6 md:p-8 max-w-lg w-full relative shadow-xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-[#918c7d] hover:text-[#16140f] font-mono text-xs"
              >
                CLOSE [X]
              </button>

              <div className="eyebrow">RESEARCH JOURNAL</div>
              <h3 className="font-display font-bold text-xl text-[#16140f] mb-4">
                Add Research Observation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">
                    Note Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. SegFormer boundary sharpening observations"
                    className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsStr}
                    onChange={(e) => setTagsStr(e.target.value)}
                    placeholder="Augmentation, SegFormer, Failures"
                    className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#55524a] uppercase mb-1">
                    Research Note / Field Log
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe qualitative findings, anomalies, or field verification conclusions..."
                    className="w-full bg-white border border-[rgba(20,18,14,0.34)] p-2.5 text-sm font-sans"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="submit"
                    className="font-mono text-xs px-5 py-2 bg-[#1c6e78] text-white font-bold"
                  >
                    Save Note
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
