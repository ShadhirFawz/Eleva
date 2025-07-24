import React from 'react';
import { motion } from 'framer-motion';

function ResultDetails({ result }) {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 pt-16 min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      <motion.div
        className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 p-6 sm:p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {result.exam.title}
        </h2>
        <p
          className="text-gray-300 text-sm sm:text-base mb-2"
          style={{ fontFamily: "'Gill Sans', sans-serif" }}
        >
          Score: {result.score}/{result.totalQuestions}
        </p>
        <p
          className="text-gray-300 text-sm sm:text-base mb-6"
          style={{ fontFamily: "'Gill Sans', sans-serif" }}
        >
          Date: {new Date(result.timestamp).toLocaleString()}
        </p>
        <div className="space-y-6">
          {result.answers.map((answer, index) => (
            <div
              key={answer.questionId}
              className={`p-4 rounded-md border border-gray-700/50 ${
                answer.is_correct ? 'bg-green-900/50' : 'bg-red-900/50'
              }`}
            >
              <h3
                className="text-lg sm:text-xl font-medium text-gray-100 mb-3"
                style={{ fontFamily: "'Gill Sans', sans-serif" }}
              >
                Question {index + 1}: {answer.question_text}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {answer.options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center p-2 rounded-md ${
                      idx === answer.correct_option
                        ? 'bg-green-950/80 text-white'
                        : idx === answer.selected_option
                        ? 'bg-error text-white'
                        : 'bg-gray-700/50 text-gray-300'
                    }`}
                    style={{ fontFamily: "'Gill Sans', sans-serif" }}
                  >
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default ResultDetails;