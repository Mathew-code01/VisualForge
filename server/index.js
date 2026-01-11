// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import crypto from "crypto"; 

import getPublitioUsage from "./functions/getPublitioUsage.js";
import uploadPublitio from "./functions/uploadPublitio.js";
import deletePublitio from "./functions/deletePublitio.js";
import getVimeoUsage from "./functions/getVimeoUsage.js"
import uploadVimeo from "./functions/uploadVimeo.js";
import deleteVimeo from "./functions/deleteVimeo.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// TEMP folder for uploads
const upload = multer({ dest: "uploads/" });

// Publitio usage
app.get("/api/getPublitioUsage", getPublitioUsage);

// Add this import at the top of index.js if not there


// ... inside your routes section

app.get('/api/getPublitioDetails/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cleanId = id.trim(); // Removes that %20 space error

    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;

    // 1. Generate Dynamic Signature (Same as your upload logic)
    const api_timestamp = Math.floor(Date.now() / 1000).toString();
    const api_nonce = crypto.randomBytes(4).toString('hex');
    const signature_string = api_timestamp + api_nonce + API_SECRET;
    const api_signature = crypto.createHash("sha1").update(signature_string).digest("hex");

    // 2. Build the Secure URL
    const publitioUrl = `https://api.publit.io/v1/files/show/${cleanId}?api_key=${API_KEY}&api_timestamp=${api_timestamp}&api_nonce=${api_nonce}&api_signature=${api_signature}`;

    console.log(`📡 Fetching metadata for Publitio ID: ${cleanId}`);

    const publitioResponse = await fetch(publitioUrl);
    const data = await publitioResponse.json();

    if (!data.success) {
      console.error("❌ Publitio API Error:", data.error?.message);
      return res.status(404).json({ success: false, error: data.error?.message || "File not found" });
    }

    // 3. Return the data to your Recovery Tab
    res.json({ success: true, ...data });

  } catch (error) {
    console.error("🔥 Server Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Publitio upload (backend only)
app.post("/api/uploadPublitio", upload.single("file"), uploadPublitio);

app.delete("/api/deletePublitio/:id", deletePublitio);

app.get("/api/getVimeoUsage", getVimeoUsage)

app.post("/api/uploadVimeo", uploadVimeo);

app.post("/api/deleteVimeo", deleteVimeo);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
