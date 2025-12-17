// server/functions/uploadPublitio.js
// server/functions/uploadPublitio.js

// server/functions/uploadPublitio.js

// server/functions/uploadPublitio.js
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import crypto from "crypto";

// 🔑 USING PRESET ID: jaqgrAZT
const PUBLITIO_ENDPOINT = "https://api.publit.io/v1/files/create/jaqgrAZT";

export default async function handler(req, res) {
  console.log("\n--- 🛰️ PUBLITIO UPLOAD PROCESS START ---");

  const API_KEY = process.env.PUBLITIO_API_KEY;
  const API_SECRET = process.env.PUBLITIO_API_SECRET;

  // 1. Check Credentials
  if (!API_KEY || !API_SECRET) {
    console.error("❌ ERROR: Publitio API Keys are missing from .env");
    return res.status(500).json({ error: "Publitio credentials missing" });
  }

  // 2. Validate File Presence
  if (!req.file) {
    console.error("❌ ERROR: No file found in the request object");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log(`📁 FILE INFO: ${req.file.originalname} (${(req.file.size / 1024 / 1024).toFixed(2)} MB)`);

  // 3. Generate Auth Signature
  const api_timestamp = Math.floor(Date.now() / 1000).toString(); 
  const api_nonce = crypto.randomBytes(4).toString('hex');
  const signature_string = api_timestamp + api_nonce + API_SECRET;
  const api_signature = crypto.createHash("sha1").update(signature_string).digest("hex");

  console.log(`🔐 AUTH: Timestamp generated, Signature created via SHA-1`);

  // 4. Prepare Form Data
  const form = new FormData();
  form.append("api_key", API_KEY);
  form.append("api_timestamp", api_timestamp);
  form.append("api_nonce", api_nonce);
  form.append("api_signature", api_signature);
  form.append("file", fs.createReadStream(req.file.path));
  form.append("title", req.file.originalname);
  form.append("privacy", "1");
  
  // SPACE SAVING SETTINGS
  form.append("option_hls", "0");        
  form.append("option_ad", "0");         
  form.append("option_transform", "0");  

  console.log("📤 SENDING: Requesting Publitio to store original file ONLY (No versions)");

  try {
    // 5. Execute Request
    const response = await axios.post(PUBLITIO_ENDPOINT, form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity, // Important for large video files
      timeout: 300000, // 5 minute timeout for slow uploads
    });

    console.log(`📥 RESPONSE: Status ${response.status} received from Publitio`);

    // Clean up local temp file
    if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
        console.log("🧹 CLEANUP: Local temp file deleted");
    }

    if (!response.data?.success) {
      console.error("❌ PUBLITIO API REJECTED UPLOAD:", response.data?.error?.message);
      throw new Error(response.data?.error?.message || "Publitio upload failed");
    }

    // 6. Success Log
    console.log(`✅ SUCCESS: File stored as ${response.data.id}`);
    console.log(`🔗 URL: ${response.data.url_preview}`);
    console.log("--- 🏁 UPLOAD PROCESS COMPLETE ---\n");

    return res.json({
      success: true,
      platform: "publitio",
      id: response.data.id,
      resourceId: response.data.id,
      url: response.data.url_preview,
      download: response.data.url_download,
    });

  } catch (err) {
    console.error("🔥 CRITICAL UPLOAD ERROR:", err.response?.data || err.message);
    
    // Clean up local temp file on error
    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    
    return res.status(500).json({ 
        error: err.response?.data?.error?.message || err.message || "Upload failed" 
    });
  }
}