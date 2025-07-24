import Result from "../models/Result.js";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import Exam from "../models/Exam.js";

export const submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;
    const userId = req.user._id;

    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    let score = 0;
    const storedAnswers = [];

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      if (!question || question.exam.toString() !== examId) continue;

      const isCorrect = question.correct_option === ans.selected_option;
      if (isCorrect) score++;

      storedAnswers.push({
        question: question._id,
        selected_option: ans.selected_option,
        is_correct: isCorrect,
      });
    }

    // Create result
    const result = await Result.create({
      user: userId,
      exam: examId,
      score,
      timestamp: new Date(),
    });

    // Link answers to result
    const answersToSave = storedAnswers.map((a) => ({
      ...a,
      result: result._id,
    }));

    await Answer.insertMany(answersToSave);

    res.status(200).json({
      message: "Exam submitted successfully",
      score,
      totalQuestions: storedAnswers.length,
      resultId: result._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit exam", error });
  }
};

export const getResultById = async (req, res) => {
  try {
    const { resultId } = req.params;
    const userId = req.user._id;

    // 1. Validate result ownership
    const result = await Result.findById(resultId);
    if (!result) return res.status(404).json({ message: "Result not found" });

    if (result.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Access denied to this result" });
    }

    // 2. Get related data
    const [answers, exam] = await Promise.all([
      Answer.find({ result: resultId }),
      Exam.findById(result.exam)
    ]);

    if (answers.length === 0) {
      return res.status(404).json({ message: "No answers found" });
    }

    // 3. Efficient question fetching
    const questionIds = answers.map(a => a.question);
    const questions = await Question.find({ _id: { $in: questionIds } });

    // 4. Build response
    const questionMap = questions.reduce((map, q) => {
      map[q._id] = q;
      return map;
    }, {});

    const detailedAnswers = answers.map(a => ({
      questionId: a.question,
      question_text: questionMap[a.question]?.question_text || 'Deleted question',
      options: questionMap[a.question]?.options || [],
      correct_option: questionMap[a.question]?.correct_option ?? -1,
      selected_option: a.selected_option,
      is_correct: a.is_correct
    }));

    res.status(200).json({
      exam: {
        _id: exam?._id,
        title: exam?.title,
        description: exam?.description
      },
      score: result.score,
      timestamp: result.timestamp,
      totalQuestions: questions.length,
      answers: detailedAnswers
    });

  } catch (error) {
    console.error("Fetch result error:", error);
    res.status(500).json({ 
      message: "Failed to fetch result",
    });
  }
};

export const getUserResults = async (req, res) => {
  try {
    const userId = req.user._id;

    const results = await Result.find({ user: userId })
      .sort({ timestamp: -1 })
      .lean();

    if (results.length === 0) {
      return res.status(200).json([]);
    }

    const examIds = results.map(r => r.exam);
    const exams = await Exam.find({ _id: { $in: examIds } })
      .select('title description');

    // Create exam map with fallback
    const examMap = {};
    exams.forEach(exam => {
      examMap[exam._id] = {
        title: exam.title,
        description: exam.description
      };
    });

    // Get answer counts for each result
    const answerCounts = await Promise.all(
      results.map(result => 
        Answer.countDocuments({ result: result._id })
      )
    );

    const formattedResults = results.map((result, index) => {
      const totalQuestions = answerCounts[index] || 0;
      const exam = examMap[result.exam] || {};
      return {
        resultId: result._id,
        exam: {
          _id: result.exam,
          title: exam.title || "Deleted Exam",
          description: exam.description || ""
        },
        score: result.score,
        totalQuestions,
        timestamp: result.timestamp,
        percentage: totalQuestions > 0 ? Math.round((result.score / totalQuestions) * 100) : 0
      };
    });

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error fetching user results:", error);
    res.status(500).json({ 
      message: "Failed to fetch user results",
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};