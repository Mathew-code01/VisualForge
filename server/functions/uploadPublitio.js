// server/functions/uploadPublitio.js
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const ENDPOINT = "https://api.publit.io/v1/files/create";

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
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("📁 File:", {
    name: req.file.originalname,
    size: req.file.size,
    type: req.file.mimetype,
    path: req.file.path,
  });

  const form = new FormData();
  form.append("file", fs.createReadStream(req.file.path));
  form.append("title", req.file.originalname);
  form.append("privacy", "1");
  form.append("option_download", "1");

  const authHeader =
    "Basic " + Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

  try {
    console.log("📡 POST", ENDPOINT);

    const response = await axios.post(ENDPOINT, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: authHeader,
      },
      maxBodyLength: Infinity,
      timeout: 120000,
    });

    console.log("📥 HTTP:", response.status);
    console.log("📥 BODY:", response.data);

    fs.unlinkSync(req.file.path);

    if (!response.data?.success) {
      throw new Error(response.data?.error?.message || "Upload failed");
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

    if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

    return res.status(500).json({
      error: err.response?.data?.error?.message || err.message,
    });
  }
}
