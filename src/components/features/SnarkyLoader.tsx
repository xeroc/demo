/**
 * SnarkyLoader Component
 * 
 * A reusable loading spinner that displays rotating snarky messages about slow internet.
 * Features CSS-animated spinner with configurable visibility and rotation speed.
 */

import React, { useState, useEffect, useRef } from 'react';

interface SnarkyLoaderProps {
  /** Controls whether the loader is visible */
  visible: boolean;
  /** Speed of message rotation in milliseconds (default: 2500ms) */
  rotationSpeed?: number;
}

const SNARKY_MESSAGES = [
  "Rerouting through your neighbor's WiFi...",
  "Negotiating with your ISP's hamsters...",
  "Waiting for your internet to remember its purpose...",
  "Loading at the speed of a confused pigeon...",
  "Your packets are taking the scenic route...",
  "Buffering through interdimensional portal...",
  "Slow internet? Have you tried turning it off and on again?",
  "Loading... unlike your page right now",
  "Smoking carrier pigeons en route...",
  "Compensating for cosmic background radiation..."
];

const SnarkyLoader: React.FC<SnarkyLoaderProps> = ({ 
  visible, 
  rotationSpeed = 2500 
}) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clear interval helper
  const clearExistingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Reset message index and manage interval when visibility changes
  useEffect(() => {
    if (visible) {
      // Reset to first message when becoming visible
      setMessageIndex(0);
      
      // Clear any existing interval
      clearExistingInterval();
      
      // Start new interval
      intervalRef.current = setInterval(() => {
        setMessageIndex((prevIndex) => 
          prevIndex === SNARKY_MESSAGES.length - 1 ? 0 : prevIndex + 1
        );
      }, rotationSpeed);
    } else {
      // Clear interval when hidden
      clearExistingInterval();
    }

    return () => {
      clearExistingInterval();
    };
  }, [visible, rotationSpeed]);

  if (!visible) {
    return null;
  }

  return (
    <div 
      className="flex flex-col items-center justify-center p-8"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Animated spinner */}
      <div className="relative w-16 h-16 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-75 animate-pulse"></div>
        
        {/* Center dot */}
        <div className="absolute inset-5 bg-white rounded-full shadow-lg"></div>
      </div>

      {/* Snarky message */}
      <p className="text-sm sm:text-base text-gray-300 text-center max-w-md animate-fade-in">
        {SNARKY_MESSAGES[messageIndex]}
      </p>
    </div>
  );
};

export default SnarkyLoader;
