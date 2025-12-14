// server/functions/uploadPublitio.js
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const UPLOAD_ENDPOINT = "https://api.publit.io/v1/files/upload";
const MAX_RETRIES = 3;

export default async function handler(req, res) {
  console.log("\n====================================");
  console.log("🚀 PUBLITIO UPLOAD START");
  console.log("====================================");

  const API_KEY = process.env.PUBLITIO_API_KEY;
  const API_SECRET = process.env.PUBLITIO_API_SECRET;

  console.log("🔑 API KEY present:", !!API_KEY);
  console.log("🔑 API SECRET present:", !!API_SECRET);

  if (!API_KEY || !API_SECRET) {
    console.error("❌ Missing Publitio credentials");
    return res.status(500).json({ error: "Publitio credentials missing" });
  }

  if (!req.file) {
    console.error("❌ No file received");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("📁 File:", {
    name: req.file.originalname,
    size: req.file.size,
    type: req.file.mimetype,
    path: req.file.path,
  });

  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`\n🔁 Attempt ${attempt}/${MAX_RETRIES}`);

    try {
      const form = new FormData();

      form.append("api_key", API_KEY);
      form.append("api_secret", API_SECRET);
      form.append(
        "file",
        fs.createReadStream(req.file.path),
        req.file.originalname
      );
      form.append("title", req.file.originalname);
      form.append("privacy", "1");

      console.log("📡 POST", UPLOAD_ENDPOINT);

      const response = await axios.post(UPLOAD_ENDPOINT, form, {
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
        timeout: 120000,
        validateStatus: () => true,
      });

      console.log("📥 HTTP:", response.status);
      console.log("📥 BODY:", response.data);

      // 🚫 AUTH ERRORS — DO NOT RETRY
      if (response.status === 401) {
        throw new Error(
          "Unauthorized: This endpoint only supports api_key/api_secret. " +
            "Do NOT use /files/create without HMAC."
        );
      }

      if (!response.data?.success) {
        throw new Error(response.data?.error?.message || "Upload failed");
      }

      console.log("✅ UPLOAD SUCCESS");
      fs.unlinkSync(req.file.path);

      return res.json({
        success: true,
        platform: "publitio",
        id: response.data.id,
        url: response.data.url_preview,
      });
    } catch (err) {
      lastError = err;
      console.error("❌ Error:", err.message);

      // Stop retrying on auth problems
      if (err.message.toLowerCase().includes("unauthorized")) break;

      if (attempt < MAX_RETRIES) {
        console.log("⏳ Retrying in 1.5s...");
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
  }

  if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

  console.error("🔥 UPLOAD FAILED COMPLETELY");
  return res.status(500).json({
    error: lastError?.message || "Publitio upload failed",
  });
}
