import Product from "../models/Product.js";

/**
 * POST /api/products
 * Create product (Owner only)
 */
export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      inStock: req.body.inStock === "true" || req.body.inStock === true,
      image: req.file.path   // ✅ Cloudinary URL
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(400).json({ message: "Product creation failed" });
  }
};


/**
 * GET /api/products
 * Get all products (Public)
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/**
 * GET /api/products/:id
 * Get single product (Edit preload)
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(400).json({ message: "Invalid product ID" });
  }
};

/**
 * PUT /api/products/:id
 * Update product (Owner only)
 */
export const updateProduct = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.price !== undefined) updateData.price = req.body.price;
    if (req.body.category !== undefined) updateData.category = req.body.category;
    if (req.body.description !== undefined) updateData.description = req.body.description;

    if (req.body.inStock !== undefined) {
      updateData.inStock =
        req.body.inStock === "true" || req.body.inStock === true;
    }

    // ✅ Cloudinary image (only if new file uploaded)
    if (req.file) {
      updateData.image = req.file.path; // Cloudinary secure URL
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(400).json({ message: "Update failed" });
  }
};


/**
 * DELETE /api/products/:id
 * Delete product (Owner only)
 */
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};
