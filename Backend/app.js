import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Routes
import authRoutes from "./routes/authRoutes.js";
import examRoutes from "./routes/examRoutes.js";
// import questionRoutes from "./routes/questionRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";


const app = express();


app.use(cors({
  origin: 'https://eleva-client.vercel.app',
  credentials: true
}));
app.use(express.json());

// Mount routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'ExamApp Backend is running' });
});
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
// app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);

export default app;
