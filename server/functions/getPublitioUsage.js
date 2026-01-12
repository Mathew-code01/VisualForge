// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
import fetch from "node-fetch";
import crypto from "crypto";

export default async function handler(req, res) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n--- 📊 [STORAGE SCAN] ${timestamp} ---`);

  try {
    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;
    const PLAN_LIMIT_MB = Number(process.env.PUBLITIO_LIMIT_MB) || 5000;

    if (!API_KEY || !API_SECRET) {
      console.error("❌ [STORAGE] AUTH ERROR: Missing API Keys in .env");
      return res.status(500).json({ error: "Publitio credentials missing" });
    }

    const api_timestamp = Math.floor(Date.now() / 1000).toString();
    const api_nonce = crypto.randomBytes(4).toString("hex");
    const signature_string = api_timestamp + api_nonce + API_SECRET;
    const api_signature = crypto.createHash("sha1").update(signature_string).digest("hex");

    /* ---------------- STEP 1: ACCOUNT STATS ---------------- */
    console.log("📡 [STORAGE] Attempting Account Stats (Source of Truth)...");
    const statsUrl = `https://api.publit.io/v1/account/stats?api_key=${API_KEY}&api_timestamp=${api_timestamp}&api_nonce=${api_nonce}&api_signature=${api_signature}`;
    
    const statsResponse = await fetch(statsUrl);
    const statsJson = await statsResponse.json();

    if (statsJson.success) {
      const usedMB = statsJson.storage_used / 1024 / 1024;
      console.log(`✅ [STORAGE] Stats match dashboard: ${usedMB.toFixed(2)} MB`);
      
      return res.json({
        success: true,
        usedMB: +usedMB.toFixed(2),
        limitMB: PLAN_LIMIT_MB,
        percent: +((usedMB / PLAN_LIMIT_MB) * 100).toFixed(2),
      });
    }

    /* ---------------- STEP 2: FALLBACK SCAN (TOTAL_SIZE) ---------------- */
    console.warn("⚠️ [STORAGE] Stats failed. Starting deep file-by-file scan...");
    let page = 1;
    let totalBytesOverall = 0;
    let totalFiles = 0;

    while (true) {
      console.log(`📡 [STORAGE] Fetching page ${page}...`);
      const url = `https://api.publit.io/v1/files/list?page=${page}&api_key=${API_KEY}&api_timestamp=${api_timestamp}&api_nonce=${api_nonce}&api_signature=${api_signature}`;

      const response = await fetch(url);
      const json = await response.json();

      if (!json.success) {
        console.error(`❌ [STORAGE] API Error on page ${page}:`, json.error?.message);
        break;
      }

      if (!json.files || json.files.length === 0) break;

      // FIX: Use total_size to capture thumbnails and variants
      json.files.forEach((f) => {
        const fileSize = Number(f.total_size || f.size || 0);
        totalBytesOverall += fileSize;
      });

      totalFiles += json.files.length;
      console.log(`📑 [STORAGE] Page ${page} processed. Subtotal: ${(totalBytesOverall / 1024 / 1024).toFixed(2)} MB`);

      if (!json.files_next_page) break;
      page++;
    }

    const usedMB = totalBytesOverall / 1024 / 1024;
    console.log(`🏁 [STORAGE] Final Sync: ${usedMB.toFixed(2)}MB used across ${totalFiles} items.`);

    return res.json({
      success: true,
      usedMB: +usedMB.toFixed(2),
      fileCount: totalFiles,
      limitMB: PLAN_LIMIT_MB,
      percent: +((usedMB / PLAN_LIMIT_MB) * 100).toFixed(2),
    });

  } catch (err) {
    console.error("🔥 [STORAGE] CRITICAL SYSTEM ERROR:", err.stack);
    res.status(500).json({ error: "Internal calculation crash." });
  }
}