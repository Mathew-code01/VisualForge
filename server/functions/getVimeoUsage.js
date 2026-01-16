

// server/functions/getVimeoUsage.js
// server/functions/getVimeoUsage.js
import fetch from "node-fetch";
import { db } from "../firebaseAdmin.js";

export default async function handler(req, res) {
  try {
    const TOKEN = process.env.VIMEO_ACCESS_TOKEN;
    const response = await fetch("https://api.vimeo.com/me/videos", {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = await response.json();

    console.log("📡 [VIMEO SYNC]: Checking video health...");
    
    // Clean up stuck uploads (videos without a duration or in 'error' state)
    for (const video of data.data) {
        const vimeoId = video.uri.split("/").pop();
        const snap = await db.collection("videos").where("resourceId", "==", vimeoId).get();
        
        if (snap.empty && video.status !== "available") {
            console.log(`⚠️ [VIMEO GHOST]: Deleting unfinished video ${vimeoId}`);
            await fetch(`https://api.vimeo.com${video.uri}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${TOKEN}` }
            });
        }
    }

    const userRes = await fetch("https://api.vimeo.com/me", { headers: { Authorization: `Bearer ${TOKEN}` } });
    const userData = await userRes.json();
    const { used, quota } = userData.upload_quota.space;

    return res.json({
      success: true,
      usedGB: +(used / 1073741824).toFixed(2),
      totalGB: +(quota / 1073741824).toFixed(2),
      percent: +((used / quota) * 100).toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}