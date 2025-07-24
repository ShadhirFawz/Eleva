import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function ResultCard({ result }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 p-6 sm:p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={() => navigate('/results', { state: { selectedResultId: result.resultId } })}
    >
      <h2
        className="text-xl sm:text-2xl font-semibold text-gray-100 mb-3"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        {result.exam.title}
      </h2>
      <div className="space-y-2">
        <p
          className="text-sm sm:text-base text-gray-300"
          style={{ fontFamily: "'Gill Sans', sans-serif" }}
        >
          Score: {result.score}/{result.totalQuestions}
        </p>
        <p
          className="text-sm sm:text-base text-gray-300"
          style={{ fontFamily: "'Gill Sans', sans-serif" }}
        >
          Percentage: {result.percentage}%
        </p>
        <p
          className="text-sm sm:text-base text-gray-300"
          style={{ fontFamily: "'Gill Sans', sans-serif" }}
        >
          Date: {new Date(result.timestamp).toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}

export default ResultCard;