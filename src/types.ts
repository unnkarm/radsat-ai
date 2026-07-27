export type TaskType = 
  | "Flood detection" 
  | "Change detection" 
  | "Ship detection" 
  | "Building detection" 
  | "Land cover classification";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageCount: number;
  reportCount: number;
  gradient: string;
  category: string;
  lastUpdated: string;
  sensor: string;
}

export interface ModelStatus {
  id: string;
  name: string;
  backbone: string;
  task: string;
  status: "active" | "idle" | "training";
  iou: number;
  dice: number;
  inferenceTimeMs: number;
  memoryMb: number;
}

export interface ExperimentRun {
  id: string;
  runName: string;
  dataset: string;
  epochs: number;
  learningRate: string;
  iou: number;
  dice: number;
  f1: number;
  isBest?: boolean;
  date: string;
  notes: string;
}

export interface Dataset {
  id: string;
  name: string;
  resolution: string;
  tileCount: string;
  regionCount: string;
  classCount: string;
  gradient: string;
  description: string;
  sensorType: string;
}

export interface PredictionRecord {
  id: string;
  date: string;
  projectTitle: string;
  modelVersion: string;
  result: string;
  processingTime: string;
  confidence: string;
  task: TaskType;
}

export interface NotebookEntry {
  id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
}

export interface MapLayer {
  id: string;
  name: string;
  active: boolean;
  color?: string;
  opacity?: number;
}

export interface SatelliteSampleScene {
  id: string;
  title: string;
  region: string;
  sensor: string;
  task: TaskType;
  beforeDate: string;
  afterDate: string;
  areaKm2: string;
  confidence: number;
  floodedKm2: string;
  vesselsFlagged: number;
  structuresDetected: number;
  forestLossPercent: string;
}

export interface GeminiAnalysisResult {
  success: boolean;
  analysis?: string;
  timestamp?: string;
  error?: string;
  task?: string;
  areaName?: string;
}
