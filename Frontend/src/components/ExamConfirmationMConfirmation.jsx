import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ExamConfirmation({ exam, onConfirm, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 p-6 sm:p-8 max-w-lg w-full mx-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h2
          className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-4"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {exam.title} - Confirmation
        </h2>
        <p
          className="text-gray-300 text-sm sm:text-base mb-4"
          style={{ fontFamily: "'Gill Sans', sans-serif" }}
        >
          You are about to start the {exam.title} exam. Please read the following rules:
        </p>
        <ul
          className="list-disc list-inside text-gray-300 text-sm sm:text-base mb-6"
          style={{ fontFamily: "'Gill Sans', sans-serif" }}
        >
          <li>Answer all questions to the best of your ability.</li>
          <li>The exam will auto-submit when the timer ends.</li>
          <li>You can submit early using the "Submit Exam" button.</li>
          <li>Each correct answer awards 1 point.</li>
        </ul>
        <div className="flex justify-end space-x-3">
          <motion.button
            onClick={onCancel}
            className="px-4 sm:px-6 py-2 rounded-md font-medium transition duration-200 bg-error text-white bg-red-600 cursor-pointer hover:bg-red-700 border border-red-600/50"
            style={{ fontFamily: "'Gill Sans', sans-serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleConfirm}
            className="px-4 sm:px-6 py-2 rounded-md font-medium transition duration-200 bg-primary text-white bg-blue-950 cursor-pointer hover:bg-indigo-800 border border-blue-600/50 flex items-center"
            style={{ fontFamily: "'Gill Sans', sans-serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            disabled={isLoading}
          >
            {isLoading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Start Exam
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ExamConfirmation;