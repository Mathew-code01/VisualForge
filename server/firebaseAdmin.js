// server/firebaseAdmin.js
import admin from "firebase-admin";

/**
 * VisualForge Metadata Sync Engine
 * High-End Agency Infrastructure (Style: ideasdesignpro.com)
 */

const getCredentials = () => {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY) return null;

  // ENHANCED REPAIR LOGIC
  // 1. Remove wrapping double/single quotes
  // 2. Unescape double backslashes (\\n -> \n)
  // 3. Ensure actual newlines are present where \n exists
  const cleanKey = FIREBASE_PRIVATE_KEY.replace(/^['"]|['"]$/g, "").replace(
    /\\n/g,
    "\n"
  );

  return {
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: cleanKey,
  };
};

const initializeSync = () => {
  // Prevent double-initialization
  if (admin.apps.length > 0) return admin.app();

  const credentials = getCredentials();

  if (!credentials) {
    console.error("\n--- ❌ [DEPLOYMENT ERROR] ---");
    console.error("Status: Missing Critical Environment Variables");
    console.error("Action: Verify FIREBASE_PRIVATE_KEY in Render Dashboard");
    return null;
  }

  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });

    // Elegant Agency-Style Confirmation Logs
    console.log("\n--- 📊 [INFRASTRUCTURE READY] ---");
    console.log(`📡 [NETWORK]: Connected to ${credentials.projectId}`);
    console.log("📑 [SERVICE]: Firebase Admin SDK Active");
    console.log("✨ [SYNC]: Ready for System Audit\n");

    return app;
  } catch (error) {
    console.error("\n--- 🏁 [STORAGE SYNC FAILED] ---");
    console.error(`Reason: ${error.message}`);
    console.error(
      "Tip: Check if the Private Key contains the BEGIN/END header."
    );
    return null;
  }
};

const app = initializeSync();

// Export db safely; if initialization failed, db will be null,
// and our handlers will catch it before crashing.
export const db = app ? admin.firestore() : null;
export default admin;