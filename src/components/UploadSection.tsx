import React, { useRef, useState } from "react";
import { Upload, CheckCircle, FileCode, Layers, Image as ImageIcon } from "lucide-react";
import { SAMPLE_SCENES } from "../data/mockData";
import { SatelliteSampleScene } from "../types";

interface UploadSectionProps {
  onImageSelected: (imageDataUrl: string, sampleScene?: SatelliteSampleScene) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelected(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <section id="upload" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow">03 · Image Upload & Bands</div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
            Bring your own imagery or test sample passes.
          </h2>
          <p className="text-[#55524a] text-base mt-2">
            Upload single frame GeoTIFFs, before/after bitemporal pairs, or select a pre-calibrated Earth observation test scene.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Dropzone */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed p-10 md:p-14 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-4 bg-[#fbfaf6] ${
                dragActive ? "border-[#c1440e] bg-[#c1440e]/5" : "border-[rgba(20,18,14,0.34)] hover:border-[#c1440e]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.tif,.tiff"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-14 h-14 rounded-full border border-[rgba(20,18,14,0.34)] flex items-center justify-center text-[#c1440e] bg-white shadow-xs">
                <Upload className="w-6 h-6" />
              </div>

              <div>
                <div className="text-base font-semibold text-[#16140f]">
                  {selectedFileName ? `Loaded: ${selectedFileName}` : "Drop imagery here, or browse files"}
                </div>
                <div className="text-xs font-mono text-[#918c7d] mt-1">
                  Single frame GeoTIFF · bitemporal pair · 16-bit SAR VV/VH
                </div>
              </div>

              <span className="font-mono text-xs border border-[rgba(20,18,14,0.34)] px-5 py-2.5 bg-white text-[#16140f] hover:border-[#c1440e] hover:text-[#c1440e] transition-all font-semibold">
                Select Local File
              </span>
            </div>

            {/* Preset Satellite Sample Picker */}
            <div className="mt-6 bg-[#fbfaf6] border border-[rgba(20,18,14,0.14)] p-4">
              <div className="font-mono text-xs text-[#918c7d] uppercase tracking-wider mb-3">
                Or pick a preset satellite pass:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SAMPLE_SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      setSelectedFileName(scene.title);
                      onImageSelected("", scene);
                    }}
                    className="p-3 text-left border border-[rgba(20,18,14,0.14)] bg-white hover:border-[#c1440e] transition-colors rounded-xs group cursor-pointer"
                  >
                    <div className="font-mono text-[10px] text-[#c1440e] uppercase font-semibold">
                      {scene.sensor}
                    </div>
                    <div className="text-xs font-semibold text-[#16140f] group-hover:text-[#c1440e] truncate mt-0.5">
                      {scene.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Supported Specifications Table */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="bg-[#fbfaf6] border border-[rgba(20,18,14,0.14)] divide-y divide-[rgba(20,18,14,0.14)]">
              <div className="p-4 font-mono text-xs text-[#918c7d] uppercase tracking-wider bg-[#f3eee2]">
                Supported Formats & Metadata
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#16140f]">GeoTIFF / TIFF</span>
                <span className="font-mono text-[#918c7d]">CRS & Bounds Embedded</span>
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#16140f]">Sentinel-1 SAR</span>
                <span className="font-mono text-[#918c7d]">VV/VH Backscatter</span>
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#16140f]">Sentinel-2 MSI</span>
                <span className="font-mono text-[#918c7d]">10m RGB / NIR Bands</span>
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#16140f]">PNG / JPEG</span>
                <span className="font-mono text-[#918c7d]">8/16-bit Display Tiles</span>
              </div>
              <div className="p-4 flex items-center justify-between text-xs text-[#918c7d]">
                <span>Sentinel Direct API Stream</span>
                <span className="font-mono text-[#c1440e]">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
