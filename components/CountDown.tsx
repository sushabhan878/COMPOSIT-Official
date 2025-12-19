'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountDown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-03-13T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="flex items-center justify-center pointer-events-auto"
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: 0.8 }}
    >
      <div className="bg-black p-8 rounded-2xl shadow-[0_0_40px_rgba(139,0,0,0.7),0_0_80px_rgba(139,0,0,0.4)]">
        <h2 className="text-xl font-mono font-bold text-center text-white mb-5 tracking-wider">
          {timeLeft.days} Days to Go
        </h2>
        
        <div className="grid grid-cols-4 gap-4">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-lg p-4 min-w-[90px]">
              <span className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-300 to-red-800">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
            </div>
            <span className="text-sm font-mono text-gray-400 mt-2 uppercase tracking-wider">Days</span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-lg p-4 min-w-[90px]">
              <span className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-300 to-red-800">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
            </div>
            <span className="text-sm font-mono text-gray-400 mt-2 uppercase tracking-wider">Hours</span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-lg p-4 min-w-[90px]">
              <span className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-300 to-red-800">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
            </div>
            <span className="text-sm font-mono text-gray-400 mt-2 uppercase tracking-wider">Minutes</span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-lg p-4 min-w-[90px]">
              <span className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-300 to-red-800">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <span className="text-sm font-mono text-gray-400 mt-2 uppercase tracking-wider">Seconds</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountDown;
