// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
// server/functions/getPublitioUsage.js
import fetch from "node-fetch";
import crypto from "crypto";

export default async function handler(req, res) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n--- 📊 [DEEP STORAGE SYNC] ${timestamp} ---`);

  try {
    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;
    const PLAN_LIMIT_MB = Number(process.env.PUBLITIO_LIMIT_MB) || 5000;

    const api_timestamp = Math.floor(Date.now() / 1000).toString();
    const api_nonce = crypto.randomBytes(4).toString("hex");
    const signature_string = api_timestamp + api_nonce + API_SECRET;
    const api_signature = crypto
      .createHash("sha1")
      .update(signature_string)
      .digest("hex");

    const auth = `api_key=${API_KEY}&api_timestamp=${api_timestamp}&api_nonce=${api_nonce}&api_signature=${api_signature}`;

    // 1. GET MASTER FILES (The 5.08 MB)
    console.log("📡 [FETCH] Scanning Master Files...");
    const filesRes = await fetch(`https://api.publit.io/v1/files/list?${auth}`);
    const filesJson = await filesRes.json();
    let masterBytes = 0;
    if (filesJson.success) {
      filesJson.files.forEach((f) => (masterBytes += Number(f.size || 0)));
    }

    // 2. GET VERSIONS (The hidden 11.37 MB)
    console.log("📡 [FETCH] Scanning for hidden variants/versions...");
    const versionsRes = await fetch(
      `https://api.publit.io/v1/versions/list?${auth}`
    );
    const versionsJson = await versionsRes.json();
    let versionBytes = 0;
    if (versionsJson.success && versionsJson.versions) {
      versionsJson.versions.forEach(
        (v) => (versionBytes += Number(v.size || 0))
      );
    }

    // 3. COMBINE FOR TRUE TOTAL
    const totalBytes = masterBytes + versionBytes;
    const usedMB = totalBytes / 1024 / 1024;

    console.log(
      `✅ [RESULT] Master Files: ${(masterBytes / 1024 / 1024).toFixed(2)} MB`
    );
    console.log(
      `✅ [RESULT] Versions: ${(versionBytes / 1024 / 1024).toFixed(2)} MB`
    );
    console.log(`🏁 [FINAL] Real Total: ${usedMB.toFixed(2)} MB`);

    return res.json({
      success: true,
      usedMB: +usedMB.toFixed(2),
      fileCount: filesJson.files?.length || 0,
      limitMB: PLAN_LIMIT_MB,
      percent: +((usedMB / PLAN_LIMIT_MB) * 100).toFixed(2),
    });
  } catch (err) {
    console.error("🔥 [CRITICAL ERROR]:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
}