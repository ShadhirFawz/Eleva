import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Timer from './Timer';

function ExamAttempt({ exam, questions, onSubmit }) {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, selected_option]) => ({
      questionId,
      selected_option,
    }));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/results/submit`,
        { examId: exam._id, answers: formattedAnswers },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      onSubmit(response.data);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit exam');
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  useEffect(() => {
    // Prevent back navigation
    window.history.pushState(null, null, window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.href);
      alert('You cannot go back during the exam.');
    };
    window.addEventListener('popstate', handlePopState);

    // Prevent page leave
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your exam progress will be lost.';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 mt-20 min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      <motion.div
        className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 p-6 sm:p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-gray-100"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {exam.title}
          </h2>
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        </div>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question._id} className="border-b border-gray-700/50 pb-4 last:border-b-0">
              <h3
                className="text-lg sm:text-xl font-medium text-gray-100 mb-3"
                style={{ fontFamily: "'Gill Sans', sans-serif" }}
              >
                Question {index + 1}: {question.question_text}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {question.options.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center text-gray-300 text-sm sm:text-base cursor-pointer"
                    style={{ fontFamily: "'Gill Sans', sans-serif" }}
                  >
                    <input
                      type="radio"
                      name={question._id}
                      value={idx}
                      checked={answers[question._id] === idx}
                      onChange={() => handleAnswerChange(question._id, idx)}
                      className="mr-3 h-5 w-5 text-primary focus:ring-primary border-gray-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <motion.button
            onClick={handleSubmit}
            className="px-4 sm:px-6 py-2 rounded-md font-medium transition duration-200 bg-primary text-white cursor-pointer bg-blue-950 hover:bg-indigo-800 border border-blue-600/50"
            style={{ fontFamily: "'Gill Sans', sans-serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Exam
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default ExamAttempt;