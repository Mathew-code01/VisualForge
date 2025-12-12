// /server/functions/deleteVimeo.js

import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const TOKEN = process.env.VIMEO_ACCESS_TOKEN;

    if (!TOKEN) {
      return res.status(500).json({
        success: false,
        error: "Missing Vimeo token in backend",
      });
    }

    const { resourceId } = req.body;

    if (!resourceId) {
      return res.status(400).json({
        success: false,
        error: "Missing Vimeo video ID",
      });
    }

    const response = await fetch(`https://api.vimeo.com/videos/${resourceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json({
        success: false,
        error: error.error || "Vimeo delete failed",
      });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("VIMEO DELETE ERROR", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
