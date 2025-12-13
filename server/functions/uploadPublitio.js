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
      console.log("❌ Publitio API keys missing in .env");
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

    const form = new FormData();
    // Publitio requires api_key and api_secret as form fields
    form.append("api_key", API_KEY);
    form.append("api_secret", API_SECRET);
    form.append("file", fileStream);
    form.append("title", req.file.originalname);
    form.append("privacy", "1"); // 1 = private, 0 = public
    form.append("option_download", "1");

    console.log("Form data fields prepared:", form.getLengthSync(), "bytes");

    // Send POST request to Publitio
    console.log("=== Sending request to Publitio ===");
    const response = await axios.post(
      "https://api.publit.io/v1/files/upload",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
        maxBodyLength: Infinity, // allow large files
        timeout: 60000, // 60s timeout
      }
    );

    console.log("Publitio HTTP status:", response.status);
    console.log("Publitio response data:", response.data);

    // Clean up uploaded file from server
    fs.unlinkSync(req.file.path);
    console.log("✅ Local file deleted:", req.file.path);

    if (!response.data || !response.data.success) {
      console.log("❌ Publitio upload failed:", response.data);
      return res.status(400).json({
        error: response.data?.error?.message || "Publitio upload failed",
      });
    }

    console.log("✅ Publitio upload success:", response.data.id);

    return res.json({
      success: true,
      platform: "publitio",
      url: response.data.url_preview,
      resourceId: response.data.id,
    });
  } catch (err) {
    console.error(
      "🔥 Publitio backend crash:",
      err.response?.data || err.message
    );
    if (req.file?.path && fs.existsSync(req.file.path))
      fs.unlinkSync(req.file.path);
    res
      .status(500)
      .json({ error: err.response?.data?.error?.message || err.message });
  }
}
