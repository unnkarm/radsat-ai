import React, { useState } from "react";
import { SatelliteSampleScene, MapLayer } from "../types";
import { Layers, ZoomIn, ZoomOut, Compass, MapPin, Eye, EyeOff } from "lucide-react";

interface MapViewSectionProps {
  selectedScene: SatelliteSampleScene;
}

export const MapViewSection: React.FC<MapViewSectionProps> = ({ selectedScene }) => {
  const [zoomLevel, setZoomLevel] = useState(12);
  const [coords, setCoords] = useState("26.20°N 91.70°E");
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: "layer-original", name: "Original Imagery", active: true },
    { id: "layer-mask", name: "Prediction Mask", active: true, color: "#3EC6E0" },
    { id: "layer-[#heatmap]", name: "Confidence Heatmap", active: false, color: "#c1440e" },
    { id: "layer-villages", name: "Village Boundaries", active: true, color: "#4c7a3d" },
    { id: "layer-roads", name: "Road Network", active: false, color: "#ffffff" },
  ]);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  const isMaskActive = layers.find((l) => l.id === "layer-mask")?.active;
  const isHeatmapActive = layers.find((l) => l.id === "layer-[#heatmap]")?.active;
  const isVillagesActive = layers.find((l) => l.id === "layer-villages")?.active;
  const isRoadsActive = layers.find((l) => l.id === "layer-roads")?.active;

  return (
    <section id="map" className="py-20 border-t border-[rgba(20,18,14,0.14)] bg-[#f1ede3]">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow signal">05 · Interactive Map Viewer</div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase text-[#16140f]">
            Zoom into high-confidence predictions.
          </h2>
          <p className="text-[#55524a] text-base mt-2">
            Pan, zoom, and isolate specific geospatial vector overlays over raw satellite passes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[rgba(20,18,14,0.14)] bg-[#fbfaf6]">
          {/* Map Canvas */}
          <div 
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width * 0.1 + 26.15).toFixed(2);
              const y = ((e.clientY - rect.top) / rect.height * 0.1 + 91.65).toFixed(2);
              setCoords(`${x}°N ${y}°E`);
            }}
            className="lg:col-span-9 aspect-[16/9.5] relative overflow-hidden bg-[#0e1a1c] select-none"
          >
            {/* Satellite Map Base Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(139,209,124,0.16),transparent_30%),radial-gradient(circle_at_70%_60%,rgba(62,198,224,0.22),transparent_32%)]" />

            {/* Grid Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Mask Layer */}
            {isMaskActive && (
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500">
                <path
                  d="M200,180 C180,240 220,320 320,310 C420,300 480,380 580,340 C650,310 680,220 600,190 C520,160 480,220 380,180 C280,140 220,120 200,180 Z"
                  fill="rgba(62, 198, 224, 0.4)"
                  stroke="#3EC6E0"
                  strokeWidth="2"
                />
              </svg>
            )}

            {/* Heatmap Layer */}
            {isHeatmapActive && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_50%,rgba(193,68,14,0.6),transparent_40%)] mix-blend-color-dodge" />
            )}

            {/* Village Boundaries Overlay */}
            {isVillagesActive && (
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500">
                <circle cx="280" cy="220" r="14" fill="none" stroke="#4c7a3d" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="300" y="225" fill="#4c7a3d" fontSize="11" fontFamily="monospace">Kamrup Village A</text>

                <circle cx="520" cy="280" r="18" fill="none" stroke="#4c7a3d" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="545" y="285" fill="#4c7a3d" fontSize="11" fontFamily="monospace">Brahmaputra South Sector</text>
              </svg>
            )}

            {/* Roads Overlay */}
            {isRoadsActive && (
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500">
                <path d="M50,120 Q300,200 750,400" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="5 5" />
                <path d="M400,50 Q420,250 450,450" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 2" />
              </svg>
            )}

            {/* Controls & Coordinates Readout */}
            <div className="absolute top-4 left-4 font-mono text-[11px] text-[#918c7d] bg-[#0a0d10]/90 p-2.5 border border-[rgba(255,255,255,0.2)]">
              <span className="text-[#c1440e] font-bold">COORD:</span> {coords}
            </div>

            <div className="absolute bottom-4 right-4 font-mono text-[11px] text-[#918c7d] bg-[#0a0d10]/90 p-2.5 border border-[rgba(255,255,255,0.2)] flex items-center gap-3">
              <span>ZOOM {zoomLevel}x</span>
              <span>EPSG:4326</span>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 left-4 flex flex-col gap-1 bg-[#0a0d10]/90 p-1 border border-[rgba(255,255,255,0.2)]">
              <button
                onClick={() => setZoomLevel((z) => Math.min(20, z + 1))}
                className="p-2 text-white hover:text-[#c1440e]"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(1, z - 1))}
                className="p-2 text-white hover:text-[#c1440e]"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Layer Control Panel */}
          <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-[rgba(20,18,14,0.14)] flex flex-col divide-y divide-[rgba(20,18,14,0.14)]">
            <div className="p-4 font-mono text-xs text-[#918c7d] uppercase tracking-wider bg-[#f3eee2] flex items-center justify-between">
              <span>Map Layers</span>
              <Layers className="w-4 h-4 text-[#1c6e78]" />
            </div>

            {layers.map((layer) => (
              <div key={layer.id} className="p-4 flex items-center justify-between text-xs">
                <span className="font-medium text-[#16140f]">{layer.name}</span>
                <button
                  onClick={() => toggleLayer(layer.id)}
                  className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${
                    layer.active ? "bg-[#c1440e]" : "bg-[rgba(20,18,14,0.2)]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                      layer.active ? "left-4" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
