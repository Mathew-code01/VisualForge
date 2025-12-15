// src/firebase/uploadVideo.js
// src/firebase/uploadVideo.js
// src/firebase/uploadVideo.js
// -------------------------------------------------------
// MASTER UPLOADER: Auto-decides Publitio (<100MB) or Vimeo
// Stores metadata in Firebase
// Works with Firebase CDN (no npm imports)
// -------------------------------------------------------

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/**
 * Safely access Firestore initialized via CDN
 */
function getDb() {
  if (!window.db) throw new Error("Firestore not initialized yet! Make sure Firebase script runs first.");
  return window.db;
}

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


/* =======================================================
   MAIN UPLOAD HANDLER
   Publitio (<100MB) or Vimeo (>=100MB)
======================================================= */
export async function uploadVideo(file, title, category, uploaderId, onProgress = () => {}) {
  const db = getDb();
  const sizeMB = file.size / (1024 * 1024);

  try {
    // 1. Select storage provider
    const uploadResult = sizeMB < 100
      ? await uploadToPublitio(file, onProgress)
      : await uploadToVimeo(file, title, onProgress);

    // 2. Generate thumbnail
    const thumbnail = await generateThumbnail(file);

    // 3. Save metadata to Firestore
    const docRef = await addDoc(collection(db, "videos"), {
      title,
      category,
      uploaderId,
      createdAt: serverTimestamp(),
      size: +sizeMB.toFixed(2),
      duration: 0,
      resolution: "",
      thumbnail,
      platform: uploadResult.platform,
      url: uploadResult.url,
      resourceId: uploadResult.resourceId,
      tags: [],
    });

    return {
      id: docRef.id,
      ...uploadResult,
      thumbnail,
    };
  } catch (err) {
    console.error("❌ Upload failed:", err.message);
    throw new Error(err.message || "Video upload failed.");
  }
}

/* =======================================================
   PUBLITIO (<100MB)
======================================================= */
async function uploadToPublitio(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE}/api/uploadPublitio`);


    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(((e.loaded / e.total) * 100).toFixed(2));
    };

    
    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);
      if (xhr.status !== 200) {
        return reject(new Error(res?.error || "Upload failed"));
      }

      if (!res.success) return reject(new Error(res.error || "Publitio failed"));
      resolve({ ...res, resourceId: res.id });
      
    };

    xhr.onerror = () => reject(new Error("Backend upload error"));
    xhr.send(formData);
  });
}

/* =======================================================
   VIMEO (>=100MB)
======================================================= */
async function uploadToVimeo(file, title, onProgress) {
  // 1) Ask backend for TUS upload session
  const session = await fetch(`${API_BASE}/api/uploadVimeo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, size: file.size }),
  }).then((r) => r.json());


  if (!session.uploadUrl) {
    console.error("VIMEO BACKEND ERROR:", session);
    throw new Error(session.error || "Vimeo failed to create upload session");
  }

  const uploadUrl = session.uploadUrl;
  const vimeoId = session.vimeoId;


  // 2) Perform TUS upload to Vimeo
  await uploadTusChunk(uploadUrl, file, onProgress);

  return {
    platform: "vimeo",
    url: `https://vimeo.com/${vimeoId}`,
    resourceId: vimeoId,
  };
}


/* =======================================================
   TUS UPLOADER
======================================================= */
function uploadTusChunk(uploadUrl, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", uploadUrl, true);
    xhr.setRequestHeader("Content-Type", "application/offset+octet-stream");
    xhr.setRequestHeader("Tus-Resumable", "1.0.0");
    xhr.setRequestHeader("Upload-Offset", "0");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(((e.loaded / e.total) * 100).toFixed(2));
    };

    xhr.onload = () => {
      if (xhr.status === 204) resolve(true);
      else reject(new Error(`TUS upload failed: ${xhr.status}`));
    };

    xhr.onerror = () => reject(new Error("TUS network error"));
    xhr.send(file);
  });
}

/* =======================================================
   THUMBNAIL GENERATION
======================================================= */
function generateThumbnail(file) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    video.src = URL.createObjectURL(file);
    video.currentTime = 0.1;

    video.onloadeddata = () => {
      canvas.width = 160;
      canvas.height = 90;
      ctx.drawImage(video, 0, 0, 160, 90);
      resolve(canvas.toDataURL("image/png"));
      URL.revokeObjectURL(video.src);
    };

    video.onerror = () => resolve(null);
  });
}

/* =======================================================
   GET VIDEOS
======================================================= */
export async function getVideos() {
  const db = getDb();
  const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* =======================================================
   DELETE VIDEO
======================================================= */
export async function deleteVideo(docId, platform, resourceId) {
  const db = getDb();
  try {
    if (platform === "publitio") await deletePublitio(resourceId);
    if (platform === "vimeo") await deleteVimeo(resourceId);
    await deleteDoc(doc(db, "videos", docId));
    return true;
  } catch (err) {
    console.error("❌ Delete failed:", err.message);
    throw new Error("Failed to delete video");
  }
}

/* =======================================================
   DELETE FROM PUBLITIO
======================================================= */
async function deletePublitio(resourceId) {
  const res = await fetch(`${API_BASE}/api/deletePublitio/${resourceId}`, {
    method: "DELETE",
  });

  const json = await res.json();
  if (!json.success) throw new Error("Publitio delete failed");
}


/* =======================================================
   DELETE FROM VIMEO
======================================================= */
async function deleteVimeo(resourceId) {
  const res = await fetch(`${API_BASE}/api/deleteVimeo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resourceId }),
  });


  const json = await res.json();
  if (!json.success) throw new Error(json.error || "Vimeo delete failed");
}


export default uploadVideo;
