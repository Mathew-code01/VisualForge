// src/firebase/deleteVideo.js

import { db } from "./config.js";
import { doc, deleteDoc } from "firebase/firestore";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function deleteVideo(id, platform, resourceId) {
  // 1. Try to delete from Cloud Provider
  try {
    let response;
    if (platform === "publitio") {
      response = await fetch(`${API_BASE}/api/deletePublitio/${resourceId}`, {
        method: "DELETE",
      });
    } else if (platform === "vimeo") {
      response = await fetch(`${API_BASE}/api/deleteVimeo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId }),
      });
    }

    // CRITICAL: Fetch doesn't throw on 404/500, we must check response.ok
    if (response && !response.ok) {
      const errorData = await response.json();
      console.warn(`Cloud deletion warning: ${errorData.error}`);
      // We continue to Firebase deletion anyway so the UI stays clean
    }
  } catch (error) {
    console.error("Network error during cloud deletion:", error);
    // Even if the network fails, we usually want to allow metadata deletion
    // or notify the user specifically.
  }

  // 2. Always attempt to delete metadata from Firestore
  try {
    await deleteDoc(doc(db, "videos", id));
    return { success: true };
  } catch (dbError) {
    console.error("Firestore deletion failed:", dbError);
    throw new Error("Metadata wipe failed."); // This triggers the "Asset protection" alert
  }
}