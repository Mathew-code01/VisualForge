// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
import fetch from "node-fetch";
import crypto from "crypto";

export default async function handler(req, res) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n--- 📊 [STORAGE SYNC START] ${timestamp} ---`);

  try {
    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;
    const PLAN_LIMIT_MB = Number(process.env.PUBLITIO_LIMIT_MB) || 5000;

    // 1. Authentication Check
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

    const auth = `api_key=${API_KEY}&api_timestamp=${api_timestamp}&api_nonce=${api_nonce}&api_signature=${api_signature}`;

    console.log(
      `🔐 [AUTH] Signature verified for session: ${api_signature.substring(
        0,
        8
      )}...`
    );
    console.log("📡 [FETCH] Requesting File List with Total Size metadata...");

    // 2. Fetch data from Publitio
    const response = await fetch(`https://api.publit.io/v1/files/list?${auth}`);

    // 3. Robust Error Handling for non-JSON responses (Fixes the ESLint error)
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorHtml = await response.text(); // Captured and used below
      console.error("❌ [CRITICAL] Publitio returned HTML instead of JSON.");
      console.error(
        `📄 [DEBUG INFO] First 200 chars of response: ${errorHtml.substring(
          0,
          200
        )}`
      );

      return res.status(response.status).json({
        success: false,
        error: "API returned HTML error. Check dashboard for account status.",
        status: response.status,
      });
    }

    const json = await response.json();

    if (!json.success) {
      console.error(
        "❌ [API ERROR] Publitio rejected the request:",
        json.error?.message
      );
      throw new Error(json.error?.message || "Publitio API Failure");
    }

    // 4. Calculate Total (Master + Versions)
    let totalBytes = 0;
    let fileCount = 0;

    // Using 'total_size' ensures we match the 16.45MB on your dashboard
    json.files.forEach((file) => {
      const itemSize = Number(file.total_size || file.size || 0);
      totalBytes += itemSize;
      fileCount++;
    });

    const usedMB = totalBytes / 1024 / 1024;

    console.log("✅ [SYNC] Calculation successful.");
    console.log(
      `📊 Final Results -> Files: ${fileCount} | Used: ${usedMB.toFixed(2)} MB`
    );
    console.log(`--- 🏁 [STORAGE SYNC END] ---\n`);

    return res.json({
      success: true,
      usedMB: +usedMB.toFixed(2),
      fileCount: fileCount,
      limitMB: PLAN_LIMIT_MB,
      percent: +((usedMB / PLAN_LIMIT_MB) * 100).toFixed(2),
    });
  } catch (err) {
    console.error("🔥 [SYSTEM ERROR]:", err.message);
    res.status(500).json({
      success: false,
      error: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
}