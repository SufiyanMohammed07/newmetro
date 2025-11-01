import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

dotenv.config();

const app = express();
const port = 3030;

const allowedOrigins = [
  "https://newmetro.online",
  // "https://www.newmetro.online",
  "http://localhost:5175", 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Error connecting to DB:", err);
  }
};

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  connectDb();
});



