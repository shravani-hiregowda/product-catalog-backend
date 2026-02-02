import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

/* 🔹 Required for ES modules (__dirname replacement) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* 🔥 CORS — CORRECT & PRODUCTION SAFE */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://startling-daffodil-3e1225.netlify.app"
    ],
    credentials: true
  })
);

/* 🔹 Body parsers */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 🔥 THIS IS THE KEY FIX — SERVE IMAGES */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

/* 🔹 API routes */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;
