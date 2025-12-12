// /server/functions/getVimeoUsage.js

import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const TOKEN = process.env.VIMEO_ACCESS_TOKEN;

    if (!TOKEN || TOKEN === "your_vimeo_access_token") {
      return res.status(500).json({
        success: false,
        error: "Vimeo token missing in backend .env",
      });
    }

    const response = await fetch("https://api.vimeo.com/me", {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    const data = await response.json();

    // 🛑 Vimeo basic plans DO NOT return quota
    if (!data.upload_quota || !data.upload_quota.space) {
      return res.json({
        success: true,
        connected: true,
        usedGB: 0,
        totalGB: 0,
        percent: 0,
        note: "Your Vimeo plan does not provide storage quota.",
      });
    }

    const used = data.upload_quota.space.used;
    const total = data.upload_quota.space.quota;

    return res.json({
      success: true,
      connected: true,
      usedGB: +(used / 1024 / 1024 / 1024).toFixed(2),
      totalGB: +(total / 1024 / 1024 / 1024).toFixed(2),
      percent: +((used / total) * 100).toFixed(2),
    });
  } catch (err) {
    console.error("VIMEO USAGE ERROR:", err);
    return res.status(500).json({
      success: false,
      connected: false,
      usedGB: 0,
      totalGB: 0,
      percent: 0,
      error: "Server failed to contact Vimeo",
    });
  }
}
