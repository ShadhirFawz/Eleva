import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import examRoutes from "./routes/examRoutes.js";
// import questionRoutes from "./routes/questionRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";


const app = express();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
connectDB();

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
// app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);

export default app;
