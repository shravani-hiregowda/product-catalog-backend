import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

/* 🔥 CORS — THIS IS THE RIGHT PLACE */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://YOUR-NETLIFY-SITE.netlify.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;
