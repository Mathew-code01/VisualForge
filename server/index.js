// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import getPublitioUsage from "./functions/getPublitioUsage.js";
import uploadPublitio from "./functions/uploadPublitio.js";
import deletePublitio from "./functions/deletePublitio.js";
import getVimeoUsage from "./functions/getVimeoUsage.js"
import uploadVimeo from "./functions/uploadVimeo.js";
import deleteVimeo from "./functions/deleteVimeo.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// TEMP folder for uploads
const upload = multer({ dest: "uploads/" });

// Publitio usage
app.get("/api/getPublitioUsage", getPublitioUsage);

// Publitio upload (backend only)
app.post("/api/uploadPublitio", upload.single("file"), uploadPublitio);

app.delete("/api/deletePublitio/:id", deletePublitio);

app.get("/api/getVimeoUsage", getVimeoUsage)

app.post("/api/uploadVimeo", uploadVimeo);

app.post("/api/deleteVimeo", deleteVimeo);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
