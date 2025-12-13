// server/functions/uploadPublitio.js

import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";

export default async function handler(req, res) {
  try {
    console.log("=== PUBLITIO UPLOAD START ===");

    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;

    console.log("API KEY exists:", !!API_KEY);
    console.log("API SECRET exists:", !!API_SECRET);

    if (!API_KEY || !API_SECRET) {
      return res.status(500).json({ error: "Publitio API keys missing." });
    }

    if (!req.file) {
      console.log("❌ req.file is missing");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Uploaded file info:", {
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    });

    const fileStream = fs.createReadStream(req.file.path);

    const formData = new FormData();
    formData.append("file", fileStream);
    formData.append("privacy", "1");
    formData.append("option_download", "1");

    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

    const headers = {
      Authorization: `Basic ${auth}`,
      ...formData.getHeaders(),
    };

    console.log("Request headers being sent:", headers);

    const publitioRes = await fetch("https://api.publit.io/v1/files/create", {
      method: "POST",
      headers,
      body: formData,
    });

    console.log("Publitio HTTP status:", publitioRes.status);
    console.log("Publitio HTTP statusText:", publitioRes.statusText);

    const rawText = await publitioRes.text();
    console.log("Publitio RAW response:", rawText);

    let json;
    try {
      json = JSON.parse(rawText);
    } catch {
      json = null;
    }

    fs.unlinkSync(req.file.path);

    if (!json || !json.success) {
      console.log("❌ Publitio error payload:", json);
      return res.status(400).json({
        error: json?.error?.message || rawText || "Publitio upload failed",
      });
    }

    console.log("✅ Publitio upload success");

    return res.json({
      success: true,
      platform: "publitio",
      url: json.url_preview,
      resourceId: json.id,
    });
  } catch (err) {
    console.error("🔥 Publitio backend crash:", err);
    res.status(500).json({ error: err.message });
  }
}
