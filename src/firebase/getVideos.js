// src/firebase/getVideos.js
import {
  collection,
  query,
  orderBy,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/**
 * Waits for Firestore (window.db) to be initialized
 */
function getDb() {
  if (!window.db)
    throw new Error(
      "Firestore not initialized yet! Make sure Firebase script runs first."
    );
  return window.db;
}

/**
 * Fetch videos from Firestore
 */
export async function getVideos() {
  const db = getDb();
  const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
