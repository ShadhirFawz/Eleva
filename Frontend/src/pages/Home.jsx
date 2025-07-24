import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ExamCard from '../components/ExamCard';
import ExamConfirmation from '../components/ExamConfirmationMConfirmation';
import ExamAttempt from '../components/ExamAttempt';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`${import.meta.env.VITE_API_URL}/exams`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => setExams(response.data))
        .catch(error => console.error('Failed to fetch exams:', error));
    }
  }, [user]);

  const handleTakeExam = async (examId) => {
    setSelectedExam(exams.find(exam => exam._id === examId));
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/exams/${selectedExam._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setQuestions(response.data.questions);
      setShowConfirmation(false);
      setShowExam(true);
    } catch (error) {
      console.error('Failed to fetch exam questions:', error);
      alert('Failed to start exam');
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setShowExam(false);
    setSelectedExam(null);
    setQuestions([]);
  };

  const handleSubmit = (result) => {
    setShowExam(false);
    navigate('/results', { state: { selectedResultId: result.resultId } });
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800">
      {showConfirmation && selectedExam && (
        <ExamConfirmation exam={selectedExam} onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
      {showExam && selectedExam && questions.length > 0 && (
        <ExamAttempt exam={selectedExam} questions={questions} onSubmit={handleSubmit} onCancel={handleCancel} />
      )}
      {!showConfirmation && !showExam && (
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-20">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-light font-serif text-gray-100 mb-8"
          >
            Available Exams
          </motion.h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam, index) => (
              <motion.div
                key={exam._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ExamCard exam={exam} onTakeExam={handleTakeExam} useBlurBackground />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;