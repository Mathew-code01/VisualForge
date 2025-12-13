// server/functions/uploadPublitio.js

import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";

export default async function handler(req, res) {
  try {
    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;

    if (!API_KEY || !API_SECRET) {
      return res.status(500).json({ error: "Publitio API keys missing." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileStream = fs.createReadStream(req.file.path);

    const formData = new FormData();
    formData.append("file", fileStream);
    formData.append("privacy", "1");
    formData.append("option_download", "1");

    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

    const publitioRes = await fetch("https://api.publit.io/v1/files/create", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        ...formData.getHeaders(), // 🔥 THIS IS THE FIX
      },
      body: formData,
    });

    const json = await publitioRes.json();

    fs.unlinkSync(req.file.path);

    if (!json.success) {
      return res.status(400).json({
        error: json.error?.message || "Publitio upload failed",
      });
    }

    return res.json({
      success: true,
      platform: "publitio",
      url: json.url_preview,
      resourceId: json.id,
    });
  } catch (err) {
    console.error("Publitio backend upload error:", err);
    res.status(500).json({ error: err.message });
  }
}
