import React, { useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

function Timer({ timeLeft, setTimeLeft }) {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-md border border-gray-700/50 p-3 bg-gradient-to-br from-gray-900/80 to-gray-800/80 flex items-center">
      <ClockIcon className="h-5 w-5 text-gray-100 mr-2" />
      <span
        className="text-sm sm:text-base font-medium text-gray-100"
        style={{ fontFamily: "'Gill Sans', sans-serif" }}
      >
        Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );
}

export default Timer;