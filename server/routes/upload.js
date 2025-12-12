// server/routes/upload.js
import express from "express";
import { checkAdmin } from "../middleware/auth.js";
import { uploadPublitio } from "../functions/uploadPublitio.js";

const router = express.Router();

// Only admin can upload
router.post("/uploadPublitio", checkAdmin, uploadPublitio);

export default router;
