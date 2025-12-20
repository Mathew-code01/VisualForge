// server/functions/deletePublitio.js

import fetch from "node-fetch";
import crypto from "crypto";

export default async function handler(req, res) {
  try {
    const { id } = req.params;
    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;

    if (!id) return res.status(400).json({ error: "Missing Publitio ID" });

    // 1. Generate Signature (Required by Publitio for structural changes)
    const api_timestamp = Math.floor(Date.now() / 1000).toString();
    const api_nonce = crypto.randomBytes(4).toString("hex");
    const signature_string = api_timestamp + api_nonce + API_SECRET;
    const api_signature = crypto
      .createHash("sha1")
      .update(signature_string)
      .digest("hex");

    const url = `https://api.publit.io/v1/files/delete/${id}?api_key=${API_KEY}&api_timestamp=${api_timestamp}&api_nonce=${api_nonce}&api_signature=${api_signature}`;

    console.log(`📡 Sending delete request to Publitio for asset: ${id}`);

    const r = await fetch(url, { method: "DELETE" });
    const json = await r.json();

    // If the file is already gone (404), treat it as a success so we can clean up Firebase
    if (json.code === 404) {
      return res.json({
        success: true,
        message: "Asset already removed from cloud.",
      });
    }

    if (!json.success) {
      throw new Error(json.error?.message || "Publitio API rejected deletion");
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Publitio delete error:", err);
    res.status(500).json({ error: err.message });
  }
}