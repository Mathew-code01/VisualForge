// src/firebase/config.js
// src/firebase/config.js

// ❌ OLD: import { initializeApp } from "firebase/app";
// ❌ OLD: import { getStorage } from "firebase/storage";
// ❌ OLD: import { getFirestore } from "firebase/firestore";

// ✅ NEW: Use CDN imports for all required modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// ❌ OLD: export const storage = getStorage(app);
// ❌ OLD: export const db = getFirestore(app);

// ✅ NEW: Set the initialized objects on the global window object.
// This is what the getDb() function in your other files is expecting.
window.db = getFirestore(app);
window.storage = getStorage(app);

// You can keep the exports if your framework requires them, 
// but the primary fix is setting the window properties.
// For maximum compatibility with all your files:
export const storage = window.storage;
export const db = window.db;