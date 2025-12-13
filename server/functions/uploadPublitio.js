// server/functions/uploadPublitio.js

import axios from "axios";
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
      return res.status(400).json({ error: "No file uploaded." });
    }

    console.log("Uploaded file:", {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
      path: req.file.path,
    });

    const form = new FormData();

    // ✅ AUTH — MUST be form fields
    form.append("api_key", API_KEY);
    form.append("api_secret", API_SECRET);

    // ✅ FILE
    form.append("file", fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      knownLength: req.file.size,
    });

    // Optional
    form.append("title", req.file.originalname);
    form.append("privacy", "1");
    form.append("option_download", "1");

    console.log("=== Sending request to Publitio API ===");

    const response = await axios.post(
      "https://api.publit.io/v1/files/create", // ✅ CORRECT
      form,
      {
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 120000,
      }
    );

    console.log("Publitio status:", response.status);
    console.log("Publitio response:", response.data);

    fs.unlinkSync(req.file.path);

    if (!response.data?.success) {
      return res.status(400).json({
        error: response.data?.error?.message || "Publitio upload failed",
      });
    }

    console.log("✅ UPLOAD SUCCESS");

    return res.json({
      success: true,
      id: response.data.id,
      url: response.data.url_preview,
      platform: "publitio",
    });
  } catch (err) {
    console.error("🔥 Upload error:", err.response?.data || err.message);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      error: err.response?.data?.error?.message || err.message,
    });
  }
}
