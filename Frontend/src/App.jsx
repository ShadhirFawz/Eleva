import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

// Pages
import Login from "./pages/Login";
import ExamList from "./pages/ExamList";
import TakeExam from "./pages/TakeExam";
import ResultSummary from "./pages/ResultSummary";
import PastAttempts from "./pages/PastAttempts";
import AttemptDetails from "./pages/AttemptDetails";

// Layout
import MainLayout from "./layouts/MainLayout";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ExamList />} />
            <Route path="exam/:id" element={<TakeExam />} />
            <Route path="result/:id" element={<ResultSummary />} />
            <Route path="attempts" element={<PastAttempts />} />
            <Route path="attempt/:resultId" element={<AttemptDetails />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
