// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
import fetch from "node-fetch";
import crypto from "crypto";

export default async function handler(req, res) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n--- 📊 [STORAGE SCAN START] ${timestamp} ---`);

  try {
    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;
    const PLAN_LIMIT_MB = Number(process.env.PUBLITIO_LIMIT_MB) || 5000;

    if (!API_KEY || !API_SECRET) {
      console.error("❌ [AUTH] Missing API Keys in Environment Variables.");
      return res.status(500).json({ error: "Publitio credentials missing" });
    }

    const api_timestamp = Math.floor(Date.now() / 1000).toString();
    const api_nonce = crypto.randomBytes(4).toString("hex");
    const signature_string = api_timestamp + api_nonce + API_SECRET;
    const api_signature = crypto
      .createHash("sha1")
      .update(signature_string)
      .digest("hex");

    console.log(
      `🔐 [AUTH] Signature generated: ${api_signature.substring(0, 8)}...`
    );

    /* ---------------- STEP 1: DEEP FILE SCAN ---------------- */
    // We use the file list because it is the most reliable endpoint for Free Tier
    console.log("📡 [FETCH] Requesting file list from Publitio...");

    let page = 1;
    let totalBytesOverall = 0;
    let totalFiles = 0;

    while (true) {
      const url = `https://api.publit.io/v1/files/list?page=${page}&api_key=${API_KEY}&api_timestamp=${api_timestamp}&api_nonce=${api_nonce}&api_signature=${api_signature}`;

      const response = await fetch(url);

      // CHECK IF RESPONSE IS HTML INSTEAD OF JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorBody = await response.text();
        console.error(
          `❌ [CRITICAL] API returned non-JSON response on page ${page}. Status: ${response.status}`
        );
        console.error(
          `📄 [DEBUG] Response snippet: ${errorBody.substring(0, 100)}...`
        );
        throw new Error(
          `Publitio API returned HTML instead of JSON. Check your API endpoint or Plan.`
        );
      }

      const json = await response.json();

      if (!json.success) {
        console.error(
          `❌ [API ERROR] Page ${page}:`,
          json.error?.message || "Unknown API Error"
        );
        break;
      }

      if (!json.files || json.files.length === 0) {
        console.log(`✅ [SCAN] No more files found at page ${page}.`);
        break;
      }

      // 🔄 SUMMING TOTAL_SIZE (Includes all versions/variants)
      json.files.forEach((f) => {
        const itemSize = Number(f.total_size || f.size || 0);
        totalBytesOverall += itemSize;
      });

      totalFiles += json.files.length;
      console.log(
        `📑 [PROGRESS] Page ${page}: ${json.files.length} items. Subtotal: ${(
          totalBytesOverall /
          1024 /
          1024
        ).toFixed(2)} MB`
      );

      if (!json.files_next_page) break;
      page++;
    }

    const usedMB = totalBytesOverall / 1024 / 1024;
    console.log(`🏁 [FINISH] Calculation Complete.`);
    console.log(
      `📊 Result: ${usedMB.toFixed(2)}MB used across ${totalFiles} items.`
    );
    console.log(`--- 🏁 [STORAGE SCAN END] ---\n`);

    return res.json({
      success: true,
      usedMB: +usedMB.toFixed(2),
      fileCount: totalFiles,
      limitMB: PLAN_LIMIT_MB,
      percent: +((usedMB / PLAN_LIMIT_MB) * 100).toFixed(2),
    });
  } catch (err) {
    console.error("🔥 [CRITICAL ERROR]:", err.message);
    res.status(500).json({
      success: false,
      error: err.message,
      tip: "If this is a SyntaxError, the API likely returned an HTML error page.",
    });
  }
}