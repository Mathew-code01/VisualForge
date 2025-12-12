// server/functions/uploadVimeo.js
// server/functions/uploadVimeo.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const VIMEO_TOKEN = process.env.VIMEO_ACCESS_TOKEN;

    if (!VIMEO_TOKEN) {
      return res.status(500).json({ error: "Vimeo token missing" });
    }

    const { title, size } = req.body;

    // 1) tell Vimeo we want to upload a video using TUS
    const createRes = await fetch("https://api.vimeo.com/me/videos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VIMEO_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        upload: {
          approach: "tus",
          size: size
        },
        name: title
      })
    });

    const json = await createRes.json();

    console.log("VIMEO CREATE RESPONSE:", json);

    if (!json.upload || !json.upload.upload_link) {
      return res.status(400).json({
        error: json.error || "Could not create Vimeo TUS upload session",
        vimeoResponse: json,
      });
    }


    const uploadUrl = json.upload.upload_link;      // TUS URL
    const vimeoId = json.uri.split("/").pop();      // Extract ID

    return res.json({
      success: true,
      uploadUrl,
      vimeoId
    });

  } catch (err) {
    console.error("Vimeo backend error:", err);
    res.status(500).json({ error: err.message });
  }
}

