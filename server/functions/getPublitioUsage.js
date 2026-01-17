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
  console.log(`\n--- 📊 [DEEP STORAGE SYNC: PUBLITIO] ${timestamp} ---`);

  // 0. Safety Check for Admin SDK
  if (!db) {
    console.error("🔥 [SYSTEM ERROR]: Database Connection Offline. Check Service Account.");
    return res.status(500).json({ success: false, error: "Database offline" });
  }

  try {
    const { PUBLITIO_API_KEY: API_KEY, PUBLITIO_API_SECRET: API_SECRET } = process.env;
    const PLAN_LIMIT_MB = Number(process.env.PUBLITIO_LIMIT_MB) || 5000;

    // 1. Auth Signature
    const api_timestamp = Math.floor(Date.now() / 1000).toString();
    const api_nonce = crypto.randomBytes(4).toString("hex");
    const signature_string = api_timestamp + api_nonce + API_SECRET;
    const api_signature = crypto.createHash("sha1").update(signature_string).digest("hex");
    const auth = `api_key=${API_KEY}&api_timestamp=${api_timestamp}&api_nonce=${api_nonce}&api_signature=${api_signature}`;

    // 2. Fetch Master List
    console.log("📡 [FETCH]: Requesting Master File list...");
    const response = await fetch(`https://api.publit.io/v1/files/list?${auth}`);
    const json = await response.json();
    if (!json.success) throw new Error(json.error?.message || "Auth Failure");

    let masterBytes = 0;
    let actualCount = 0;
    let purgedCount = 0;

    console.log("📑 [SCANNING & REPAIRING]:");

    // 3. Health Check Loop
    for (const file of json.files) {
      // Cross-reference with Firebase
      const snap = await db.collection("videos").where("resourceId", "==", file.public_id).get();

      if (snap.empty) {
        purgedCount++;
        console.log(`  ❌ [PURGE]: Ghost Detected (${file.public_id}). Removing from cloud...`);
        await fetch(`https://api.publit.io/v1/files/delete/${file.id}?${auth}`, { method: "DELETE" });
        continue; 
      }

      // ✅ VALID FILE
      masterBytes += Number(file.size || 0);
      actualCount++;
      console.log(`  ✅ [HEALTHY]: ${file.title.slice(0, 20)}... | ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    }

    const masterMB = masterBytes / 1024 / 1024;
    const VERSION_MULTIPLIER = 3.238; 
    const finalUsedMB = Math.floor((masterMB * VERSION_MULTIPLIER) * 100) / 100;

    console.log(`\n✨ [AUDIT COMPLETE]: ${purgedCount} orphaned files removed.`);
    console.log(`📊 [CALCULATION]: Optimized Total: ${finalUsedMB.toFixed(2)} MB`);
    console.log(`--- 🏁 [STORAGE SYNC END] ---\n`);

    return res.json({
      success: true,
      usedMB: finalUsedMB,
      fileCount: actualCount,
      limitMB: PLAN_LIMIT_MB,
      percent: +((finalUsedMB / PLAN_LIMIT_MB) * 100).toFixed(2),
    });
  } catch (err) {
    console.error("🔥 [CRITICAL SYSTEM ERROR]:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
}