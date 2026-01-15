// server/middleware/auth.js
import admin from "firebase-admin";

export const checkAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Correct Firebase Verification
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Check for the admin claim we set in setAdmin.js
    if (decodedToken.admin === true) {
      req.user = decodedToken;
      next();
    } else {
      console.error("User verified but is not an admin.");
      res
        .status(403)
        .json({ error: "Access Denied: Admin privileges required" });
    }
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ error: "Session expired or invalid token" });
  }
};