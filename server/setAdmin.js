// server/setAdmin.js

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

admin
  .auth()
  .setCustomUserClaims("USER_UID_HERE", { admin: true })
  .then(() => {
    console.log("Admin role added!");
  });
