// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import otpRoutes from "./routes/otpRoutes.js";

// dotenv.config();

// const app = express();
// const port = 3030;

// const allowedOrigins = [
//   "https://newmetro.online",
//   // "https://www.newmetro.online",
//   "http://localhost:5175", 
//   "http://localhost:5173",
//   "https://admin-newmetro.onrender.com"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"], 
//     credentials: true,
//   })
// );
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ extended: true, limit: "100mb" }));



// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ Connected to MongoDB");
//   } catch (err) {
//     console.error("❌ Error connecting to DB:", err);
//   }
// };

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/otp", otpRoutes);
// app.use("/api/products", productRoutes);

// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
//   connectDb();
// });



import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// 🔹 Route Imports
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

// 🔹 Environment Setup
dotenv.config();

// ──────────────────────────────────────────────
// 🔸 App Initialization
// ──────────────────────────────────────────────
const app = express();
const port = process.env.PORT || 3030;

// ──────────────────────────────────────────────
// 🔸 CORS Configuration
// ──────────────────────────────────────────────
const allowedOrigins = [
  "https://newmetro.online",
  "https://admin-newmetro.onrender.com",
  "http://localhost:5173",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle Preflight Requests
app.options("*", cors());

// ──────────────────────────────────────────────
// 🔸 Middleware
// ──────────────────────────────────────────────
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Static Files & Views (optional for admin templates)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ──────────────────────────────────────────────
// 🔸 Database Connection
// ──────────────────────────────────────────────
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
  }
};

// ──────────────────────────────────────────────
// 🔸 Routes
// ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("🟢 API is running successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/products", productRoutes);

// ──────────────────────────────────────────────
// 🔸 Global Error Handler (Optional)
// ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("⚠️ Server Error:", err.message);
  res.status(500).json({ error: err.message });
});

// ──────────────────────────────────────────────
// 🔸 Start Server
// ──────────────────────────────────────────────
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  connectDb();
});
