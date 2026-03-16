/**
 * Main App Component for ChaosCraft
 * Root component that sets up React Router for navigation
 * and integrates the Konami Code easter egg
 */

import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import { useKonamiCode } from './useKonamiCode';
import EasterEgg from './EasterEgg';

const App: React.FC = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleKonamiActivate = useCallback(() => {
    setShowEasterEgg(true);
  }, []);

  const handleCloseEasterEgg = useCallback(() => {
    setShowEasterEgg(false);
  }, []);

  // Initialize Konami code listener at app level
  useKonamiCode({
    onActivate: handleKonamiActivate,
    autoReset: true,
    resetDelay: 5000
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
      {/* Easter Egg Display - available on all pages */}
      <EasterEgg isActive={showEasterEgg} onClose={handleCloseEasterEgg} />
    </BrowserRouter>
  );
};

export default App;
