// src/firebase/deleteVideo.js

import { db } from "./config.js";
import { doc, deleteDoc } from "firebase/firestore";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function deleteVideo(id, platform, resourceId) {
  // 1. Delete the physical file from the storage platform
  try {
    if (platform === "publitio") {
      await fetch(`${API_BASE}/api/deletePublitio/${resourceId}`, {
        method: "DELETE",
      });
    } else if (platform === "vimeo") {
      await fetch(`${API_BASE}/api/deleteVimeo`, {
        method: "POST", // Your Vimeo handler expects body, so POST or DELETE work depending on server setup
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId }),
      });
    }
  } catch (error) {
    console.error(
      "Storage deletion failed, but continuing to metadata:",
      error
    );
    // We continue so the user doesn't see a broken entry if the file is already gone
  }

  // 2. Delete metadata from Firestore
  await deleteDoc(doc(db, "videos", id));

  return { success: true };
}