

// server/functions/getVimeoUsage.js
// server/functions/getVimeoUsage.js
// server/functions/getVimeoUsage.js
import fetch from "node-fetch";
import { db } from "../firebaseAdmin.js";

export default async function handler(req, res) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n--- 📊 [DEEP STORAGE SYNC: VIMEO] ${timestamp} ---`);

  if (!db) {
    console.error("🔥 [SYSTEM ERROR]: Database Connection Offline.");
    return res.status(500).json({ success: false, error: "Database offline" });
  }

  try {
    const TOKEN = process.env.VIMEO_ACCESS_TOKEN;
    
    // 1. Fetch all videos from account
    const response = await fetch("https://api.vimeo.com/me/videos", {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = await response.json();

    console.log("📡 [VIMEO SYNC]: Analyzing health of current library...");
    
    let purgedCount = 0;

    // 2. Scan for Incomplete or Orphaned Vimeo Uploads
    for (const video of data.data) {
        const vimeoId = video.uri.split("/").pop();
        const snap = await db.collection("videos").where("resourceId", "==", vimeoId).get();
        
        // If it's not in Firebase AND it's either incomplete or an error status
        if (snap.empty && (video.status !== "available" || video.duration === 0)) {
            purgedCount++;
            console.log(`  ⚠️  [VIMEO GHOST]: Deleting failed/incomplete upload: ${vimeoId}`);
            await fetch(`https://api.vimeo.com${video.uri}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${TOKEN}` }
            });
        }
    }

    // 3. Get Fresh Usage Stats
    const userRes = await fetch("https://api.vimeo.com/me", { 
        headers: { Authorization: `Bearer ${TOKEN}` } 
    });
    const userData = await userRes.json();
    const { used, quota } = userData.upload_quota.space;

    console.log(`✨ [VIMEO AUDIT]: Purged ${purgedCount} incomplete sessions.`);
    console.log(`--- 🏁 [STORAGE SYNC END] ---\n`);

    return res.json({
      success: true,
      usedGB: +(used / 1073741824).toFixed(2),
      totalGB: +(quota / 1073741824).toFixed(2),
      percent: +((used / quota) * 100).toFixed(2),
    });
  } catch (err) {
    console.error("🔥 [VIMEO ERROR]:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
}