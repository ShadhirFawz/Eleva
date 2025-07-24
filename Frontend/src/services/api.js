import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Auth
export const loginUser = (email, password) => API.post("/auth/login", { email, password });

// --- Exams
export const fetchExams = () => API.get("/exams");
export const fetchExamById = (id) => API.get(`/exams/${id}`);

// --- Results
export const submitExam = (data) => API.post("/results/submit", data);
export const fetchUserResults = () => API.get("/results/user");
export const fetchResultById = (resultId) => API.get(`/results/${resultId}`);
