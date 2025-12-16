// src/firebase/getVideos.js
import { db } from "./config.js";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

/**
 * Fetch videos from Firestore
 */
export async function getVideos() {
 
  const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
