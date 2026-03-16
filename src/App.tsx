/**
 * Main App Component for ChaosCraft
 * Root component that hosts all React components
 */

import React from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Banner />
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 md:py-16">
        <div className="text-center relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg animate-pulse mb-4 sm:mb-6 md:mb-8">
            Welcome to ChaosCraft
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80">
            The chaos has begun. Everything is possible.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
