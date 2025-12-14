// server/functions/uploadPublitio.js
// server/functions/uploadPublitio.js

// server/functions/uploadPublitio.js

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import crypto from "crypto"; // <-- 1. NEW IMPORT: Needed for SHA-1 signature

const PUBLITIO_ENDPOINT = "https://api.publit.io/v1/files/create";

export default async function handler(req, res) {
  console.log("\n====================================");
  console.log("🚀 PUBLITIO UPLOAD START");
  console.log("====================================");

  const API_KEY = process.env.PUBLITIO_API_KEY;
  const API_SECRET = process.env.PUBLITIO_API_SECRET;

  console.log("🔑 API KEY present:", !!API_KEY);
  console.log("🔑 API SECRET present:", !!API_SECRET);

  if (!API_KEY || !API_SECRET) {
    return res.status(500).json({ error: "Publitio credentials missing" });
  }

  if (!req.file) {
    console.log("❌ No file in request");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("📁 File received:", {
    name: req.file.originalname,
    size: req.file.size,
    type: req.file.mimetype,
    path: req.file.path,
  });

  /* ---------------- 2. GENERATE SIGNATURE ---------------- */
  // a. Get the current UNIX timestamp (seconds since Jan 1, 1970)
  const api_timestamp = Math.floor(Date.now() / 1000).toString(); 

  // b. Generate an 8-character random nonce (4 bytes = 8 hex characters)
  const api_nonce = crypto.randomBytes(4).toString('hex');

  // c. Concatenate the string: <timestamp><nonce><secret>
  const signature_string = api_timestamp + api_nonce + API_SECRET;

  // d. Generate the SHA-1 signature (HEX digest)
  const api_signature = crypto
    .createHash("sha1")
    .update(signature_string)
    .digest("hex");
  /* -------------------------------------------------------- */


  /* ---------------- FORM DATA ---------------- */
  const form = new FormData();

  // 🔑 3. Use the FOUR required authentication parameters
  form.append("api_key", API_KEY);
  form.append("api_timestamp", api_timestamp);
  form.append("api_nonce", api_nonce);
  form.append("api_signature", api_signature);

  // File and other options
  form.append("file", fs.createReadStream(req.file.path));
  form.append("title", req.file.originalname);
  form.append("privacy", "1");
  form.append("option_download", "1");

  try {
    console.log("📡 POST →", PUBLITIO_ENDPOINT);

    const response = await axios.post(PUBLITIO_ENDPOINT, form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      timeout: 120000,
    });

    console.log("📥 HTTP STATUS:", response.status);
    console.log("📥 RESPONSE DATA:", response.data);

    fs.unlinkSync(req.file.path);

    if (!response.data?.success) {
      throw new Error(response.data?.error?.message || "Publitio upload failed");
    }

    console.log("✅ PUBLITIO UPLOAD SUCCESS");

    return res.json({
      success: true,
      platform: "publitio",
      id: response.data.id,
      url: response.data.url_preview,
      download: response.data.url_download,
    });
  } catch (err) {
    console.error(
      "🔥 UPLOAD ERROR:",
      err.response?.data || err.message
    );

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      error:
        err.response?.data?.error?.message ||
        err.message ||
        "Publitio upload failed",
    });
  }
}