// src/firebase/uploadVideo.js
// src/firebase/uploadVideo.js
// src/firebase/uploadVideo.js
// -------------------------------------------------------
// MASTER UPLOADER: Auto-decides Publitio (<100MB) or Vimeo
// Stores metadata in Firebase
// Works with Firebase CDN (no npm imports)
// -------------------------------------------------------
// ✅ NEW: Import the initialized db instance
import { db } from "./config.js"; 

// ✅ NEW: Import Firestore functions from the installed npm package
import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

/* =======================================================
    METADATA ONLY SAVE FOR RETRY
    This function is used by the client when the file is already uploaded 
    to Publitio/Vimeo but the Firestore save failed.
======================================================= */
export async function saveMetadataOnly(videoMetadata) {
   
    
    // Log the start of the retry
    console.log(`[FIREBASE LOG] METADATA RETRY START for: ${videoMetadata.title}`);
    
    // 1. Save metadata to Firestore (Metadata Save Phase)
    const docRef = await addDoc(collection(db, "videos"), {
        title: videoMetadata.title,
        category: videoMetadata.category,
        uploaderId: videoMetadata.uploaderId || "ADMIN", // Use a default if not provided
        createdAt: serverTimestamp(),
        size: videoMetadata.size, 
        duration: videoMetadata.duration,
        resolution: videoMetadata.resolution,
        thumbnail: videoMetadata.thumbnail,
        platform: videoMetadata.platform,
        url: videoMetadata.uploadedUrl, // Crucial: Use the existing file URL
        resourceId: videoMetadata.resourceId, // Crucial: Use the existing resource ID
        tags: [],
    });

    console.log(`[FIREBASE LOG] METADATA RETRY SUCCESS. Document ID: ${docRef.id}`);

    return { 
        id: docRef.id, 
        metadataSaved: true,
        url: videoMetadata.uploadedUrl,
        resourceId: videoMetadata.resourceId,
    };
}

/* =======================================================
    MAIN UPLOAD HANDLER
    Publitio (<100MB) or Vimeo (>=100MB)
======================================================= */
// src/firebase/uploadVideo.js

// ✅ UPDATE: Added 'metadata' as the last argument
export async function uploadVideo(
  file,
  title,
  category,
  uploaderId,
  onProgress = () => {},
  metadata = {}
) {
  const sizeMB = file.size / (1024 * 1024);
  let uploadResult = null;

  try {
    // Stage 1: File Upload (Publitio/Vimeo)
    uploadResult =
      sizeMB < 100
        ? await uploadToPublitio(file, onProgress)
        : await uploadToVimeo(file, title, onProgress);

    const thumbnail = await generateThumbnail(file);

    onProgress(100);
    onProgress(101); // UI Switch to "Saving Metadata..."

    console.log(`[FIREBASE] Saving metadata for: ${title}`);

    // Stage 2: Firestore Save
    try {
      const docRef = await addDoc(collection(db, "videos"), {
        title,
        category,
        uploaderId,
        createdAt: serverTimestamp(),
        size: +sizeMB.toFixed(2),
        duration: metadata.duration || 0,
        resolution: metadata.resolution || "",
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
        metadataSaved: true,
      };
    } catch (firestoreErr) {
      // 🔥 This catches the connection drop error
      console.error("METADATA SAVE FAILED:", firestoreErr.message);
      return {
        ...uploadResult,
        error: "Database connection lost. Please click 'Retry Metadata'.",
        metadataSaved: false,
        fileUploaded: true,
      };
    }
  } catch (err) {
    // This catches the actual file upload failure
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

/**
 * RECOVERY TOOL: Automatically fetches metadata from Publitio API
 * and links it to Firebase.
 */
export async function linkExistingPublitioVideo(publitioId, title, category) {
  try {
    // 🔥 FIX: Add .trim() to remove spaces before sending to backend
    const cleanId = publitioId.trim();

    const response = await fetch(
      `${API_BASE}/api/getPublitioDetails/${cleanId}`
    );

    // Check if the response is actually JSON before parsing
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        "Server returned HTML instead of JSON. Check if the backend route is deployed."
      );
    }

    const data = await response.json();

    if (!data.success) {
      // 🔥 NEW: Better error message to catch ID confusion
      const errorHint = data.error?.message?.includes("doesn't exist")
        ? "Video not found. Try using the short ID (8 characters) instead of the long Public ID."
        : data.error?.message;
      throw new Error(errorHint);
    }

    // 2. Construct clean metadata from the API response
    const videoUrl = data.url_preview; // Original file URL
    const thumbUrl = data.url_thumbnail; // Auto-generated thumbnail
    const sizeInMB = (data.size / (1024 * 1024)).toFixed(2);
    const durationInSec = data.duration || 0;

    // 3. Save to Firestore with PERFECT metadata
    const docRef = await addDoc(collection(db, "videos"), {
      title: title || data.title,
      category: category || "Commercial",
      uploaderId: "ADMIN_RECOVERY",
      createdAt: serverTimestamp(),
      platform: "publitio",
      url: videoUrl,
      thumbnail: thumbUrl,
      resourceId: publitioId,
      size: parseFloat(sizeInMB),
      duration: durationInSec,
      resolution: `${data.width}x${data.height}`,
      tags: ["recovered"],
    });

    return { success: true, id: docRef.id };
  } catch (err) {
    console.error("Auto-Link Failed:", err);
    throw err;
  }
}


export default uploadVideo;
