import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// Lazy Google GenAI Client
let genAIClient: GoogleGenAI | null = null;
function getGenAIClient(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// API Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API: Analyze Satellite Image / Geo-Spatial Prompt using Gemini AI
app.post("/api/gemini/analyze", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/png", task = "Flood Detection", areaName = "Brahmaputra Basin, Assam", sensor = "Sentinel-2 MSI", prompt } = req.body;

    const ai = getGenAIClient();

    const defaultPrompt = `You are RADSAT AI, an expert satellite image intelligence and geospatial deep learning specialist system used by Earth Observation researchers and defence-tech analysts.
Analyze the following satellite imagery context/request:
Task Head: ${task}
Area/Region: ${areaName}
Sensor Mode: ${sensor}

User Query/Notes: ${prompt || "Perform a comprehensive pixel-level feature breakdown, hazard/change assessment, confidence estimation, key object count, and actionable brief for this scene."}

Provide a structured, highly analytical response including:
1. Executive Summary & Scene Assessment
2. Detected Features & Quantitative Metrics (e.g. estimated area in km², feature counts, severity level)
3. Sensor & Spectrum Intelligence Insights (SAR backscatter vs optical spectral bands)
4. Model Confidence & Recommended Verification Steps
5. Strategic / Defense / Disaster Relief Recommendations

Keep your tone rigorous, technical, and precise as expected from a high-grade satellite intelligence platform.`;

    let contents: any;

    if (imageBase64 && typeof imageBase64 === "string" && imageBase64.length > 50) {
      // Clean base64 string if data URI header is present
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      contents = {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64,
            },
          },
          {
            text: defaultPrompt,
          },
        ],
      };
    } else {
      contents = defaultPrompt;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        temperature: 0.3,
      },
    });

    const analysisText = response.text || "No response text generated.";

    return res.json({
      success: true,
      analysis: analysisText,
      timestamp: new Date().toISOString(),
      task,
      sensor,
      areaName,
    });
  } catch (err: any) {
    console.error("Error calling Gemini API:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to process satellite analysis with Gemini AI.",
    });
  }
});

// API: Generate Disaster / Tactical Brief Report using Gemini AI
app.post("/api/gemini/report", async (req, res) => {
  try {
    const { projectTitle, runId, metrics, task, observations } = req.body;

    const ai = getGenAIClient();

    const reportPrompt = `Generate a formal Satellite Intelligence Executive Report (PDF/Print ready format) for:
Project Title: ${projectTitle || "RADSAT Observation Run"}
Run ID: ${runId || "run_20260726_01"}
Primary Task: ${task || "Flood Extent Segmentation"}
Key Quantitative Data: ${JSON.stringify(metrics || {})}
Researcher Observations: ${observations || "Standard pass analysis completed successfully."}

Format the output cleanly in clear Markdown with standard sections:
# RADSAT AI - SATELLITE INTELLIGENCE DISASTER BRIEF
## 1. MISSION PARAMETERS & METADATA
## 2. GEOSPATIAL ANALYSIS & QUANTITATIVE FINDINGS
## 3. THREAT / HAZARD ASSESSMENT LEVEL
## 4. DEEP LEARNING MODEL TELEMETRY & CONFIDENCE
## 5. ACTIONABLE DIRECTIVES & FIELD DISPATCH RECOMMENDATIONS`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: reportPrompt,
      config: {
        temperature: 0.2,
      },
    });

    return res.json({
      success: true,
      reportMarkdown: response.text,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Error generating report:", err);
    return res.status(500).json({
      success: false,
      error: err.message || "Failed to generate AI satellite report.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RADSAT AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
