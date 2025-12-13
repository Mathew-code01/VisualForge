// src/firebase/deleteVideo.js

import {
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const db = window.db;

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// MAIN DELETE FUNCTION
export async function deleteVideo(video) {
  const { id, platform, resourceId } = video;

  // 1. Delete from Publitio if needed
  if (platform === "publitio") {
    await fetch(`${API_BASE}/api/deletePublitio/${resourceId}`, {
      method: "DELETE",
    });
  }

  // 2. Delete metadata from Firestore
  await deleteDoc(doc(db, "videos", id));

  return { success: true };
}
