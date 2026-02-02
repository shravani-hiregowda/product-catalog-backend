import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    description: String,
    category: String,
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
