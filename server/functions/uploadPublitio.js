// server/functions/uploadPublitio.js
// server/functions/uploadPublitio.js

// server/functions/uploadPublitio.js

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import crypto from "crypto";

const PUBLITIO_ENDPOINT = "https://api.publit.io/v1/files/create/jaqgrAZT";

export default async function handler(req, res) {
  console.log("\n--- 🛰️ [UPLOAD] PUBLITIO PROCESS START ---");

  const API_KEY = process.env.PUBLITIO_API_KEY;
  const API_SECRET = process.env.PUBLITIO_API_SECRET;

  // 1. Check Credentials
  if (!API_KEY || !API_SECRET) {
    console.error("❌ [UPLOAD] ERROR: API Keys missing from .env");
    return res.status(500).json({ error: "Publitio credentials missing" });
  }

  // 2. Validate File Presence
  if (!req.file) {
    console.error("❌ [UPLOAD] ERROR: No file attached to request");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log(
    `📁 [UPLOAD] Processing: ${req.file.originalname} (${(
      req.file.size /
      1024 /
      1024
    ).toFixed(2)} MB)`
  );

  try {
    // 3. Generate Auth Signature
    const api_timestamp = Math.floor(Date.now() / 1000).toString();
    const api_nonce = crypto.randomBytes(4).toString("hex");
    const signature_string = api_timestamp + api_nonce + API_SECRET;
    const api_signature = crypto
      .createHash("sha1")
      .update(signature_string)
      .digest("hex");

    console.log(
      `🔐 [UPLOAD] Signature generated for timestamp: ${api_timestamp}`
    );

    // 4. Prepare Form Data
    const form = new FormData();
    form.append("api_key", API_KEY);
    form.append("api_timestamp", api_timestamp);
    form.append("api_nonce", api_nonce);
    form.append("api_signature", api_signature);
    form.append("file", fs.createReadStream(req.file.path));
    form.append("title", req.file.originalname);
    form.append("privacy", "1");
    form.append("option_hls", "0");
    form.append("option_ad", "0");
    form.append("option_transform", "0");
    console.log("📤 [UPLOAD] Sending stream to Publitio API...");

    // 5. Execute Request
    const response = await axios.post(PUBLITIO_ENDPOINT, form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      timeout: 300000,
    });

    console.log(`📥 [UPLOAD] Publitio Status: ${response.status}`);

    // Clean up local temp file IMMEDIATELY
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
      console.log("🧹 [UPLOAD] Local temp file cleared.");
    }

    if (!response.data?.success) {
      console.error(
        "❌ [UPLOAD] Publitio rejected the file:",
        response.data?.error?.message
      );
      throw new Error(
        response.data?.error?.message || "Publitio upload failed"
      );
    }

    // 6. Success Log
    console.log(`✅ [UPLOAD] SUCCESS! ID: ${response.data.id}`);
    console.log("--- 🏁 [UPLOAD] COMPLETE ---\n");

    return res.json({
      success: true,
      platform: "publitio",
      id: response.data.id,
      resourceId: response.data.id, // This links with recovery system
      url: response.data.url_preview,
      thumbnail: response.data.url_thumbnail,
      download: response.data.url_download,
    });
  } catch (err) {
    const errorMsg = err.response?.data?.error?.message || err.message;
    console.error("🔥 [UPLOAD] CRITICAL ERROR:", errorMsg);

    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

    return res.status(500).json({ error: errorMsg });
  }
}