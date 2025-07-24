import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ResultCard from '../components/ResultCard';
import ResultDetails from '../components/ResultDetails';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

function Results() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_API_URL}/results/user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => setResults(response.data))
        .catch(error => console.error('Failed to fetch results:', error));
    }
  }, [user]);

  useEffect(() => {
    if (location.state?.selectedResultId) {
      axios.get(`${import.meta.env.VITE_API_URL}/results/${location.state.selectedResultId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => setSelectedResult(response.data))
        .catch(error => console.error('Failed to fetch result details:', error));
    }
  }, [location.state]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-700 via-gray-200 to-gray-700">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-20">
        {selectedResult ? (
          <div>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedResult(null)}
              className="px-2 sm:px-3 py-2 rounded-md font-medium transition duration-200 bg-primary cursor-pointer text-white bg-blue-950 hover:bg-blue-900 border border-blue-600/50 mb-6"
              style={{ fontFamily: "'Gill Sans', sans-serif" }}
              whileHover={{ scale: 1.0 }}
            >
              <ChevronLeftIcon className="w-5 inline-block mr-2" />
              Back to Results
            </motion.button>
            <ResultDetails result={selectedResult} />
          </div>
        ) : (
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-light font-serif text-gray-50 mt-4 mb-8 flex items-center"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Your Results
              <PencilSquareIcon className="w-8 h-8 ml-2" />
            </motion.h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
              {results.map((result, index) => (
                <motion.div
                  key={result.resultId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="border-none"
                >
                  <ResultCard result={result} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;