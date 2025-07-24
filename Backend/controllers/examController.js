import Exam from "../models/Exam.js";
import Question from "../models/Question.js";

// GET /api/exams
export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exams", error });
  }
};

// GET /api/exams/:id
export const getExamWithQuestions = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    const questions = await Question.find({ exam: exam._id }).select("-correct_option"); // Don't expose correct answers!

    res.json({
      exam,
      questions,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exam questions", error });
  }
};
