/**
 * Navbar Component for ChaosCraft
 * Responsive navbar with navigation links
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavbarProps {
  logoText?: string;
  logoIcon?: string;
}

const DEFAULT_NAVBAR_PROPS: Required<NavbarProps> = {
  logoText: 'ChaosCraft',
  logoIcon: '🌌'
};

/**
 * Responsive navbar component with logo and navigation
 */
const Navbar: React.FC<NavbarProps> = (props = {}) => {
  const finalProps = { ...DEFAULT_NAVBAR_PROPS, ...props };
  const location = useLocation();
  
  return (
    <nav 
      id="chaoscraft-navbar"
      className="bg-slate-900/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
      role="navigation"
      aria-label="Site navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/"
            className="flex-shrink-0 flex items-center gap-2 transition-transform duration-200 hover:scale-105"
          >
            <span className="text-2xl sm:text-3xl animate-pulse" aria-hidden="true">
              {finalProps.logoIcon}
            </span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              {finalProps.logoText}
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                location.pathname === '/' 
                  ? 'text-cyan-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className={`text-sm sm:text-base font-medium transition-colors duration-200 ${
                location.pathname === '/contact' 
                  ? 'text-cyan-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
