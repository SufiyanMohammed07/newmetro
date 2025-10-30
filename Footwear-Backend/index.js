// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import otpRoutes from "./routes/otpRoutes.js";

// dotenv.config();
// const app = express();

// const allowedOrigins = [
//   "https://newmetro.online",
//   "https://www.newmetro.online",
//   "http://localhost:5173"
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
//     credentials: true,
//   })
// );


// // Handle preflight requests

// app.use(express.json());
// const port = 3030;

// // Define __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Set view engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Middleware
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));

// const connectDb=async()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Connected to DB!!");
//     }catch(err){
//         console.log("err occured while connneting db",err);
//     }
// }
// // Routes
// app.get("/", (req, res) => {
//     res.send("home page");
// });
// app.use("/api/auth", authRoutes);
// app.use("/api/otp", otpRoutes);
// app.use("/api/products", productRoutes);

// // Server
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
//     connectDb();
// });


import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

// Initialize environment variables
dotenv.config();

// Initialize app
const app = express();
const port = 3030;

// -------------------- CORS Configuration --------------------
// const allowedOrigins = [
//   "https://newmetro.online",
//   "https://www.newmetro.online",
//   "http://localhost:5173" // for local testing
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
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: ["https://newmetro.online", "https://www.newmetro.online"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Handle preflight requests
// app.options("*", cors());

// -------------------- Express Middleware --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files & EJS view setup
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------------------- Database Connection --------------------
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Error connecting to DB:", err);
  }
};

// -------------------- Routes --------------------
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/products", productRoutes);

// -------------------- Start Server --------------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  connectDb();
});



