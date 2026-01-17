// test-firebase.js
import "dotenv/config"; // Loads your .env file
import admin from "firebase-admin";

const testConnection = () => {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;

  console.log("--- 🛠️ [DEBUG START] ---");
  console.log("Project ID:", FIREBASE_PROJECT_ID);

  // LOGIC TO TEST
  const cleanKey = FIREBASE_PRIVATE_KEY.replace(/^['"]|['"]$/g, "").replace(
    /\\n/g,
    "\n"
  );

  console.log("Key Length Check:", cleanKey.length);
  console.log("Key Start:", cleanKey.substring(0, 30)); // Should see -----BEGIN PRIVATE KEY-----

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: cleanKey,
      }),
    });
    console.log("✅ [SUCCESS]: Firebase initialized locally!");
    process.exit(0);
  } catch (error) {
    console.error("❌ [FAILED]:", error.message);
    process.exit(1);
  }
};

testConnection();
