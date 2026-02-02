import express from "express";
import upload from "../config/multer.js";
import protect from "../middleware/auth.middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */
router.get("/", getAllProducts);
router.get("/:id", getProductById);

/**
 * OWNER-ONLY ROUTES
 */
router.post("/", protect, upload.single("image"), createProduct);
router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
