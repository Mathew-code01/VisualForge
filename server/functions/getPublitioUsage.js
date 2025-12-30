// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
import fetch from "node-fetch";
import crypto from "crypto";

export default async function handler(req, res) {
  try {
    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;
    const PLAN_LIMIT_MB = Number(process.env.PUBLITIO_LIMIT_MB) || 5000;

    if (!API_KEY || !API_SECRET) {
      return res.status(500).json({
        error: "Publitio API keys missing in server/.env",
      });
    }

    /* ---------------- AUTHENTICATION SETUP ---------------- */
    const api_timestamp = Math.floor(Date.now() / 1000).toString();
    const api_nonce = crypto.randomBytes(4).toString("hex");
    const signature_string = api_timestamp + api_nonce + API_SECRET;

    const api_signature = crypto
      .createHash("sha1")
      .update(signature_string)
      .digest("hex");
    /* -------------------------------------------------------- */

    let page = 1;
    let totalBytesOverall = 0; // This will track everything
    let totalFiles = 0;

    while (true) {
      const url = `https://api.publit.io/v1/files/list?page=${page}&api_key=${API_KEY}&api_timestamp=${api_timestamp}&api_nonce=${api_nonce}&api_signature=${api_signature}`;

      const response = await fetch(url);
      const json = await response.json();

      if (!json.success) {
        return res.status(response.status).json({
          error: json.error?.message || "Publitio API failed to retrieve list",
        });
      }

      if (!json.files || json.files.length === 0) break;

      // 🔄 FIX: Summing f.total_size instead of f.size
      // total_size = Original + Versions + Thumbnails
      json.files.forEach((f) => {
        totalBytesOverall += Number(f.total_size || f.size || 0);
      });

      totalFiles += json.files.length;

      if (!json.files_next_page) break;
      page++;
    }

    const usedMB = totalBytesOverall / 1024 / 1024;
    const percentUsed = (usedMB / PLAN_LIMIT_MB) * 100;

    return res.json({
      success: true,
      usedMB: +usedMB.toFixed(2),
      fileCount: totalFiles,
      limitMB: PLAN_LIMIT_MB,
      percent: +percentUsed.toFixed(2),
      note: "Showing total storage including versions and thumbnails",
    });
  } catch (err) {
    console.error("Publitio Fetch Error:", err);
    res.status(500).json({ error: err.message || "Unknown error" });
  }
}