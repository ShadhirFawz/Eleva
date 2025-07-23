// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { token } = useAuth();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const res = await fetch("/api/exams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setExams(data);
    };

    fetchExams();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Available Exams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((exam) => (
          <div key={exam._id} className="border p-4 rounded shadow-sm bg-white">
            <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
            <p className="text-gray-600 mb-2">{exam.description}</p>
            <Link
              to={`/exam/${exam._id}`}
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Take Exam
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
