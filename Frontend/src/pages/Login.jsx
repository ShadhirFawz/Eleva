import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import appLogo from '../assets/appLogo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Typing animation for "Elevate Knowledge"
  const text = "Elevate Knowledge";
  const middleIndex = Math.floor(text.length / 2);
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: Math.abs(i - middleIndex) * 0.1 + 0.5,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-700 via-gray-200 to-gray-700 p-4 sm:p-0 overflow-hidden">
      {/* Mouse hover effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.2), transparent 99%)`,
        }}
        transition={{ type: 'spring', damping: 30 }}
      />

      {/* Main Container */}
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center md:divide-x md:divide-gray-600/50">
        {/* Left Section: Logo and Text */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center justify-center mb-8 md:mb-0"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 40, stiffness: 100, duration: 2 }}
        >
          <img
            src={appLogo}
            alt="App Logo"
            className="w-40 md:w-64 h-auto object-cover rounded-2xl"
          />
          <div className="mt-4 text-center">
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right Section: Form */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center justify-center pt-8 md:pl-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1.5 }}
        >
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 sm:mt-3 text-gray-600 flex items-center justify-center">
              Get ready to{' '}
              <span className="font-light pl-1 text-primary transition-colors cursor-default flex items-center">
                Take Your Exams{' '}
                <motion.span
                  className="inline-flex items-center justify-center h-5 w-5 ml-1"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 2 }}
                  style={{ transformOrigin: 'center center' }}
                >
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.span>
              </span>
            </p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-xl pb-4 sm:pb-12 pt-2 px-5 sm:px-7 border border-gray-700/50 mt-4 sm:mt-4 w-full max-w-md">
            {error && (
              <div className="mb-0 p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
                <div className="flex items-center text-red-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}
            <div className="mt-5 sm:mt-7 mb-4 sm:mb-5">
              <h2 className="text-xl sm:text-2xl font-medium text-gray-300 font-sans text-center">
                LOGIN
              </h2>
            </div>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2" style={{ fontFamily: "sans-serif" }}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 hover:placeholder-gray-300 focus:placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2" style={{ fontFamily: "sans-serif" }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 hover:placeholder-gray-300 focus:placeholder-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                    placeholder="••••••••••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-primary" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 sm:py-3 px-4 bg-primary hover:bg-blue-700 text-white bg-indigo-800 cursor-pointer font-serif rounded-lg transition-colors duration-300 flex justify-center items-center ${isLoading ? 'opacity-80' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50">
              <p className="text-center text-sm text-gray-400">
                Need help?{' '}
                <Link to="/support" className="text-primary hover:text-blue-300 transition-colors">
                  Contact support
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;