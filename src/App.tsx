import React, { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { StatStrip } from "./components/StatStrip";
import { DashboardSection } from "./components/DashboardSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { UploadSection } from "./components/UploadSection";
import { EngineSection } from "./components/EngineSection";
import { MapViewSection } from "./components/MapViewSection";
import { CompareSection } from "./components/CompareSection";
import { AnalyticsSection } from "./components/AnalyticsSection";
import { ReportGeneratorSection } from "./components/ReportGeneratorSection";
import { ExperimentTrackerSection } from "./components/ExperimentTrackerSection";
import { ModelComparisonSection } from "./components/ModelComparisonSection";
import { DatasetExplorerSection } from "./components/DatasetExplorerSection";
import { PredictionHistorySection } from "./components/PredictionHistorySection";
import { ResearchNotebookSection } from "./components/ResearchNotebookSection";
import { Footer } from "./components/Footer";

import {
  INITIAL_PROJECTS,
  INITIAL_MODELS,
  INITIAL_EXPERIMENTS,
  INITIAL_DATASETS,
  INITIAL_PREDICTIONS,
  INITIAL_NOTEBOOK,
  SAMPLE_SCENES,
} from "./data/mockData";

import {
  Project,
  ExperimentRun,
  NotebookEntry,
  SatelliteSampleScene,
  PredictionRecord,
  GeminiAnalysisResult,
} from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [models] = useState(INITIAL_MODELS);
  const [experiments, setExperiments] = useState<ExperimentRun[]>(INITIAL_EXPERIMENTS);
  const [datasets] = useState(INITIAL_DATASETS);
  const [predictions] = useState<PredictionRecord[]>(INITIAL_PREDICTIONS);
  const [notes, setNotes] = useState<NotebookEntry[]>(INITIAL_NOTEBOOK);

  const [selectedScene, setSelectedScene] = useState<SatelliteSampleScene>(SAMPLE_SCENES[0]);
  const [customImageDataUrl, setCustomImageDataUrl] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleImageSelected = (dataUrl: string, sampleScene?: SatelliteSampleScene) => {
    if (sampleScene) {
      setSelectedScene(sampleScene);
      setCustomImageDataUrl(null);
    } else if (dataUrl) {
      setCustomImageDataUrl(dataUrl);
    }
    scrollToSection("engine");
  };

  const handleAddProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
  };

  const handleSelectProject = (project: Project) => {
    scrollToSection("engine");
  };

  const handleAddExperiment = (exp: ExperimentRun) => {
    setExperiments([exp, ...experiments]);
  };

  const handleAddNote = (note: NotebookEntry) => {
    setNotes([note, ...notes]);
  };

  // API Call: Gemini Satellite Analysis
  const handleRunGeminiAnalysis = async (promptText?: string): Promise<GeminiAnalysisResult> => {
    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: customImageDataUrl,
          task: selectedScene.task,
          areaName: selectedScene.title,
          sensor: selectedScene.sensor,
          prompt: promptText,
        }),
      });

      const data = await response.json();
      return data;
    } catch (err: any) {
      return {
        success: false,
        error: err.message || "Failed to reach Gemini API backend.",
      };
    }
  };

  // API Call: Gemini AI Report Generation
  const handleGenerateAiReport = async (projectTitle: string, runId: string, metrics: any) => {
    try {
      const response = await fetch("/api/gemini/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectTitle,
          runId,
          metrics,
          task: selectedScene.task,
          observations: `Target area: ${selectedScene.region}. Confidence level: ${selectedScene.confidence}%.`,
        }),
      });

      const data = await response.json();
      return data.reportMarkdown || "Report generation completed.";
    } catch (err: any) {
      return `# Report Generation Error\nCould not communicate with Gemini AI endpoint: ${err.message}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#f1ede3] text-[#16140f] font-sans antialiased selection:bg-[#16140f] selection:text-[#f1ede3]">
      {/* Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onLaunchConsole={() => scrollToSection("engine")}
      />

      {/* Hero */}
      <HeroSection
        onRunAnalysis={() => scrollToSection("engine")}
        onSeeCompare={() => scrollToSection("compare")}
      />

      {/* Stats Ticker */}
      <StatStrip />

      {/* Dashboard */}
      <DashboardSection
        models={models}
        projects={projects}
        onSelectProject={handleSelectProject}
        onNavigateToEngine={() => scrollToSection("engine")}
      />

      {/* Projects */}
      <ProjectsSection
        projects={projects}
        onAddProject={handleAddProject}
        onSelectProject={handleSelectProject}
      />

      {/* Upload */}
      <UploadSection onImageSelected={handleImageSelected} />

      {/* AI Analysis Engine */}
      <EngineSection
        selectedScene={selectedScene}
        customImageDataUrl={customImageDataUrl}
        onRunGeminiAnalysis={handleRunGeminiAnalysis}
      />

      {/* Interactive Map Viewer */}
      <MapViewSection selectedScene={selectedScene} />

      {/* Before / After Compare Slider */}
      <CompareSection selectedScene={selectedScene} />

      {/* Recharts Analytics */}
      <AnalyticsSection />

      {/* AI Report Generator */}
      <ReportGeneratorSection
        selectedScene={selectedScene}
        onGenerateAiReport={handleGenerateAiReport}
      />

      {/* Experiment Tracker */}
      <ExperimentTrackerSection
        experiments={experiments}
        onAddExperiment={handleAddExperiment}
      />

      {/* Model Benchmark Comparison */}
      <ModelComparisonSection models={models} />

      {/* Dataset Explorer */}
      <DatasetExplorerSection datasets={datasets} />

      {/* Prediction Log History */}
      <PredictionHistorySection
        predictions={predictions}
        onRerun={() => scrollToSection("engine")}
      />

      {/* Research Notebook */}
      <ResearchNotebookSection entries={notes} onAddNote={handleAddNote} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
