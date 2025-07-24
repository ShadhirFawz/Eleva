import React from 'react';
import { motion } from 'framer-motion';

function ExamCard({ exam, onTakeExam, useBlurBackground }) {
  return (
    <div
      className={`h-64 p-6 rounded-xl shadow-xl border border-gray-700/50 flex flex-col justify-between ${
        useBlurBackground ? 'bg-gray-800/60 backdrop-blur-sm' : 'bg-gray-800'
      }`}
    >
      <div>
        <div className="flex items-center mb-4">
          {exam.imageUrl && (
            <img
              src={exam.imageUrl}
              alt={`${exam.title} logo`}
              className="w-12 h-12 mr-4 object-contain"
            />
          )}
          <h2 className="text-xl font-serif text-gray-100">{exam.title}</h2>
        </div>
        <p className="text-gray-300">{exam.description}</p>
      </div>
      <motion.button
        onClick={() => onTakeExam(exam._id)}
        className="w-auto py-2 px-4 bg-primary cursor-pointer hover:bg-indigo-800 text-white bg-indigo-900 font-medium rounded-md transition-colors duration-200 self-start"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Take Exam
      </motion.button>
    </div>
  );
}

export default ExamCard;