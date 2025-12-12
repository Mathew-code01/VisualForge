// server/functions/deletePublitio.js

import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing Publitio file ID" });
    }

    const API_KEY = process.env.PUBLITIO_API_KEY;
    const API_SECRET = process.env.PUBLITIO_API_SECRET;

    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

    const url = `https://api.publit.io/v1/files/delete/${id}`;

    const r = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const json = await r.json();

    if (!json.success) {
      return res.status(400).json({
        error: json.error?.message || "Failed to delete file in Publitio",
      });
    }

    return res.json({
      success: true,
      deletedId: id,
    });
  } catch (err) {
    console.error("Publitio delete error:", err);
    res.status(500).json({ error: err.message });
  }
}
