/**
 * Home Page Component for ChaosCraft
 * Landing page with all the main features
 */

import React from "react";
import AnimatedBackground from "./AnimatedBackground";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Footer from "./Footer";
import DancingRobot from "./DancingRobot";
import Joke from "./Joke";
import Countries from "./Countries";
import HowItWorks from "./how-it-works";

const Home: React.FC = () => {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex flex-col">
        <Banner />
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-8 sm:py-12 md:py-16">
          <div className="text-center relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg animate-pulse mb-4 sm:mb-6 md:mb-8">
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
    </>
  );
};

export default Home;
