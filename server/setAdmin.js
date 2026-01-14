// server/setAdmin.js
import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = "0ba7bcxN0fVlQZwH2blHmbikb103";

admin
  .auth()
  .setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`SUCCESS: Admin role added to UID: ${uid}`);
    process.exit();
  })
  .catch((error) => {
    console.error("ERROR setting admin claim:", error);
    process.exit(1);
  });