// server/middleware/auth.js
import jwt from "jsonwebtoken";

export const checkAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Unauthorized — no token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ error: "Forbidden — admin only" });

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: "Invalid token" });
  }
};
