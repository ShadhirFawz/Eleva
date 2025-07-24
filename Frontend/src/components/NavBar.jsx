import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import ELogo from '../assets/ELogo.png';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path is not /login
  const isNotLoginPage = location.pathname !== '/login';

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-30 bg-gray-800/70 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <img src={ELogo} alt="Logo" className="ml-10 h-12 mr-2 rounded-sm" />
      </div>
      {isNotLoginPage && (
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 rounded-md flex space-x-2 px-4 py-1.5">
            <div className="hover:bg-gray-600/50 rounded-md px-2 py-1 cursor-pointer">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors" style={{ fontFamily: "'Gill Sans', sans-serif" }}>
                Home
              </Link>
            </div>
            <div className="hover:bg-gray-600/50 rounded-md px-2 py-1 cursor-pointer">
              <Link to="/results" className="text-gray-300 hover:text-white transition-colors" style={{ fontFamily: "'Gill Sans', sans-serif" }}>
                Results
              </Link>
            </div>
          </div>
          {user ? (
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center px-4 py-2 rounded-md font-medium transition duration-200 cursor-pointer bg-error text-white hover:bg-indigo-800"
              style={{ fontFamily: "'Gill Sans', sans-serif" }}
            >
              Logout ({user.name})
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-md font-medium transition duration-200 bg-primary text-white hover:bg-indigo-800"
              style={{ fontFamily: "'Gill Sans', sans-serif" }}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default Navbar;