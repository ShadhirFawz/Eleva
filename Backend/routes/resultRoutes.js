import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { submitExam, getResultById, getUserResults } from "../controllers/resultController.js";

const router = express.Router();

router.get("/user", protect, getUserResults);

router.get("/:resultId", protect, getResultById);
router.post("/submit", protect, submitExam);

export default router;
