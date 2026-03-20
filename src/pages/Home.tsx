/**
 * Home Page Component for ChaosCraft
 * Landing page with all the main features
 */

import React, { useState, useCallback, useEffect } from "react";
import AnimatedBackground from "../components/features/AnimatedBackground";
import Navbar from "../components/layout/Navbar";
import Banner from "../components/layout/Banner";
import Footer from "../components/layout/Footer";
import DancingRobot from "../components/features/DancingRobot";
import Joke from "../components/features/Joke";
import Countries from "../components/features/Countries";
import HowItWorks from "../components/features/how-it-works";
import SnarkyLoader from "../components/features/SnarkyLoader";
import { useMultiClick } from "../hooks/useMultiClick";

const Home: React.FC = () => {
  const [showSnarkyLoader, setShowSnarkyLoader] = useState(false);
  const [snarkyLoaderDismissed, setSnarkyLoaderDismissed] = useState(false);

  // Multi-click trigger for SnarkyLoader (5 clicks on title)
  const { ref: titleRef } = useMultiClick({
    clickCount: 5,
    timeWindow: 2000,
    onActivate: useCallback(() => {
      if (!snarkyLoaderDismissed) {
        setShowSnarkyLoader(true);
      }
    }, [snarkyLoaderDismissed])
  });

  // Handle dismissing SnarkyLoader
  const handleDismissSnarkyLoader = useCallback(() => {
    setShowSnarkyLoader(false);
    setSnarkyLoaderDismissed(true);
  }, []);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showSnarkyLoader) {
        handleDismissSnarkyLoader();
      }
    };

    if (showSnarkyLoader) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSnarkyLoader, handleDismissSnarkyLoader]);

  // Handle click outside to dismiss
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Only dismiss if clicking outside the snarky loader container
      if (showSnarkyLoader && !target.closest('[data-snarky-loader]')) {
        handleDismissSnarkyLoader();
      }
    };

    if (showSnarkyLoader) {
      // Delay to avoid immediate dismissal from the trigger click
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [showSnarkyLoader, handleDismissSnarkyLoader]);

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex flex-col">
        <Banner />
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-8 sm:py-12 md:py-16">
          <div className="text-center relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <h1 
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg animate-pulse mb-4 sm:mb-6 md:mb-8 cursor-pointer select-none"
              title="Click 5 times for a surprise..."
            >
              Welcome to ChaosCraft
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8">
              The chaos has begun. Everything is possible.
            </p>
            <div className="flex flex-col items-center">
              <DancingRobot />
              <Joke />
            </div>
          </div>
        </main>
        <Countries />
        <HowItWorks />
        <Footer />
      </div>

      {/* SnarkyLoader Easter Egg */}
      {showSnarkyLoader && (
        <div 
          data-snarky-loader
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
          onClick={(e) => {
            // Dismiss when clicking the overlay background
            if (e.target === e.currentTarget) {
              handleDismissSnarkyLoader();
            }
          }}
        >
          <SnarkyLoader visible={showSnarkyLoader} rotationSpeed={2500} />
        </div>
      )}
    </>
  );
};

export default Home;
