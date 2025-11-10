import express from "express";
import Product from "../models/Product.js";
import { uploadToS3 } from "../utils/awsS3.js";
import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, 
});
import { verifyToken } from "../utils/jwtMiddleware.js";
import { verifyAdmin } from "../utils/adminMiddleware.js";
const router = express.Router();
router.post(
  "/add",
  verifyToken,
  verifyAdmin,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { name, category, price, description } = req.body;

      if (!req.files || req.files.length === 0)
        return res
          .status(400)
          .json({ msg: "Please upload at least one image" });

      const imageUrls = await Promise.all(
        req.files.map((file) => uploadToS3(file))
      );

      const newProduct = await Product.create({
        name,
        category,
        price,
        description,
        images: imageUrls,
      });

      res
        .status(201)
        .json({ msg: "Product added successfully", product: newProduct });
    } catch (err) {
      console.error("Product upload error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);


// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.aggregate([
//       { $sample: { size: 20 } }
//     ]);
//     res.json(products);
//   } catch (err) {
//     console.error("Error fetching random products:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
router.get("/", async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          imageUrl: { $exists: true, $ne: "" },
          name: { $exists: true, $ne: "" },
          price: { $exists: true },
        },
      },
      { $sample: { size: 20 } },
    ]);
    res.json(products);
  } catch (err) {
    console.error("Error fetching random products:", err);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const { subCategory, minPrice, maxPrice } = req.query;
    const filter = { category };
    if (subCategory) filter.subCategory = subCategory;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, description },
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
export default router;
