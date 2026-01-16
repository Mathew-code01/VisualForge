// server/firebaseAdmin.js
import admin from "firebase-admin";

/**
 * High-End Agency Metadata Sync Engine
 * Handles the connection between Render and Firebase Firestore
 */

const getCredentials = () => {
  // Ensure we are pulling the specific Service Account fields from Render
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY) {
    return null;
  }

  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    // Critical: Handles Render's string escaping for the RSA Private Key
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
};

const initializeSync = () => {
  if (admin.apps.length > 0) return admin.app();

  const credentials = getCredentials();

  if (!credentials) {
    console.error("--- ❌ [DEPLOYMENT ERROR] ---");
    console.error("Condition: Missing FIREBASE_PRIVATE_KEY or PROJECT_ID");
    console.error(
      "Action: Ensure Render Environment Variables match serviceAccount.json"
    );
    return null;
  }

  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });

    // Aesthetic Log for Sync Confirmation
    console.log("--- 📊 [DEEP STORAGE SYNC] ---");
    console.log(`📡 [FETCH]: Connected to ${credentials.projectId}`);
    console.log("📑 [STATUS]: Firebase Admin SDK Active");

    return app;
  } catch (error) {
    console.error("--- 🏁 [STORAGE SYNC FAILED] ---");
    console.error(`Reason: ${error.message}`);
    return null;
  }
};

const app = initializeSync();

export const db = app ? admin.firestore() : null;
export default admin;