// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;
    const PLAN_LIMIT_MB = Number(process.env.PUBLITIO_LIMIT_MB) || 5000; // Default 5GB if not set

    if (!API_KEY || !API_SECRET) {
      return res.status(500).json({
        error: "Publitio API keys missing in server/.env",
      });
    }

    let page = 1;
    let totalBytes = 0;
    let totalFiles = 0;

    while (true) {
      const url = `https://api.publit.io/v1/files/list?page=${page}&api_key=${API_KEY}&api_secret=${API_SECRET}`;
      const response = await fetch(url);
      const json = await response.json();

      if (!json.files || json.files.length === 0) break;

      json.files.forEach((f) => (totalBytes += Number(f.size || 0)));
      totalFiles += json.files.length;

      if (!json.files_next_page) break;
      page++;
    }

    const usedMB = totalBytes / 1024 / 1024;
    const percentUsed = (usedMB / PLAN_LIMIT_MB) * 100;

    return res.json({
      success: true,
      usedMB: +usedMB.toFixed(2),
      fileCount: totalFiles,
      limitMB: PLAN_LIMIT_MB,
      percent: +percentUsed.toFixed(2),
      bandwidth: "Publitio does NOT provide bandwidth usage via API.",
    });
  } catch (err) {
    console.error("Publitio Fetch Error:", err);
    res.status(500).json({ error: err.message || "Unknown error" });
  }
}
