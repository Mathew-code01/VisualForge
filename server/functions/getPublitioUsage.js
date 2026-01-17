// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
import fetch from "node-fetch";
import crypto from "crypto";
import { db } from "../firebaseAdmin.js"; 

export default async function handler(req, res) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n--- 📊 [STORAGE SYNC: PUBLITIO] ${timestamp} ---`);

  if (!db) {
    console.error("🔥 [SYSTEM ERROR]: Database Connection Offline.");
    return res.status(500).json({ success: false, error: "Database offline" });
  }

  try {
    const { PUBLITIO_API_KEY: API_KEY, PUBLITIO_API_SECRET: API_SECRET } = process.env;
    const PLAN_LIMIT_MB = Number(process.env.PUBLITIO_LIMIT_MB) || 5000;

    const api_timestamp = Math.floor(Date.now() / 1000).toString();
    const api_nonce = crypto.randomBytes(4).toString("hex");
    const signature_string = api_timestamp + api_nonce + API_SECRET;
    const api_signature = crypto.createHash("sha1").update(signature_string).digest("hex");
    const auth = `api_key=${API_KEY}&api_timestamp=${api_timestamp}&api_nonce=${api_nonce}&api_signature=${api_signature}`;

    const response = await fetch(`https://api.publit.io/v1/files/list?${auth}`);
    const json = await response.json();
    if (!json.success) throw new Error(json.error?.message || "Auth Failure");

    let totalBytes = 0;
    let validCount = 0;

    // Process every file from the cloud
    for (const file of json.files) {
      // 1. Calculate size regardless of DB status so the UI isn't 0
      totalBytes += Number(file.size || 0);
      validCount++;

      // 2. ONLY PURGE if the 'clean' parameter is in the URL
      if (req.query.clean === "true") {
        const snap = await db.collection("videos").where("resourceId", "==", file.public_id).get();
        if (snap.empty) {
          console.log(`  ❌ [AUDIT]: Purging ghost ${file.public_id}`);
          await fetch(`https://api.publit.io/v1/files/delete/${file.id}?${auth}`, { method: "DELETE" });
          totalBytes -= Number(file.size || 0); // Remove from current total
          validCount--;
        }
      }
    }

    const masterMB = totalBytes / 1024 / 1024;
    const VERSION_MULTIPLIER = 3.238; 
    const finalUsedMB = Math.floor((masterMB * VERSION_MULTIPLIER) * 100) / 100;

    console.log(`✅ [SYNC]: ${validCount} files tracked. Total: ${finalUsedMB} MB`);

    return res.json({
      success: true,
      usedMB: finalUsedMB,
      fileCount: validCount,
      limitMB: PLAN_LIMIT_MB,
      percent: +((finalUsedMB / PLAN_LIMIT_MB) * 100).toFixed(2),
    });
  } catch (err) {
    console.error("🔥 [ERROR]:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
}