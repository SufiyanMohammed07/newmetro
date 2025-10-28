import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verifyToken } from "../utils/jwtMiddleware.js";
import { verifyAdmin } from "../utils/adminMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
   const userExists = await User.findOne({
  $or: [{ email }, { phone }]
});
    if (userExists) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, phone });

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN (via email + password)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ msg: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN VERIFICATION
router.get("/verify-admin", verifyToken, verifyAdmin, (req, res) => {
  res.json({ msg: "Admin verified successfully", isAdmin: true });
});


// LOGIN WITH phone
router.post("/login-phone", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ msg: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true } // return updated user
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
export default router;
