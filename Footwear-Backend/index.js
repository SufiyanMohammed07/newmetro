import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

dotenv.config();
const app = express();
// app.use(cors({
//   origin: ["http://localhost:5173", "http://localhost:5175"],
//   credentials: true
// }));
app.use(
  cors({
    origin: "https://newmetro.online",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
const port = 3030;

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB!!");
    }catch(err){
        console.log("err occured while connneting db",err);
    }
}
// Routes
app.get("/", (req, res) => {
    res.send("home page");
});
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/products", productRoutes);

// Server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    connectDb();
});





