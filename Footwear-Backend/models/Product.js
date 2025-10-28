import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: [{ type: String }], // multiple image URLs from S3
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
