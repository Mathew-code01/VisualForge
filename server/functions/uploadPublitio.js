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
      console.log("❌ No file received");
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Uploaded file info:", {
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
      path: req.file.path,
    });

    const stream = fs.createReadStream(req.file.path);

    const form = new FormData();

    // ✅ Publitio auth MUST be form fields
    form.append("api_key", API_KEY);
    form.append("api_secret", API_SECRET);

    // ✅ File
    form.append("file", stream, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      knownLength: req.file.size, // 👈 IMPORTANT FIX
    });

    // Optional metadata
    form.append("title", req.file.originalname);
    form.append("privacy", "1");
    form.append("option_download", "1");

    console.log("=== Sending upload to Publitio ===");

    const response = await axios.post(
      "https://api.publit.io/v1/files/upload",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 120000,
      }
    );

    console.log("Publitio HTTP status:", response.status);
    console.log("Publitio response:", response.data);

    fs.unlinkSync(req.file.path);
    console.log("✅ Temp file deleted");

    if (!response.data?.success) {
      return res.status(400).json({
        error: response.data?.error?.message || "Publitio upload failed",
      });
    }

    console.log("✅ Upload SUCCESS:", response.data.id);

    return res.json({
      success: true,
      platform: "publitio",
      id: response.data.id,
      url: response.data.url_preview,
    });
  } catch (err) {
    console.error("🔥 Upload crash:", err.response?.data || err.message);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      error: err.response?.data?.error?.message || err.message,
    });
  }
}
