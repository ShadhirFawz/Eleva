import express from "express";
import { getAllExams, getExamWithQuestions } from "../controllers/examController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllExams);           // GET /api/exams
router.get("/:id", protect, getExamWithQuestions); // GET /api/exams/:id

export default router;
