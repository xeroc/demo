/**
 * Navbar Component for ChaosCraft
 * Responsive navbar with only header image and name
 */

import React from 'react';

export interface NavbarProps {
  logoText?: string;
  logoIcon?: string;
}

const DEFAULT_NAVBAR_PROPS: Required<NavbarProps> = {
  logoText: 'ChaosCraft',
  logoIcon: '🌌'
};

/**
 * Responsive navbar component with logo only
 */
const Navbar: React.FC<NavbarProps> = (props = {}) => {
  const finalProps = { ...DEFAULT_NAVBAR_PROPS, ...props };
  
  return (
    <nav 
      id="chaoscraft-navbar"
      className="bg-slate-900/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50"
      role="banner"
      aria-label="Site header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <a 
            href="/"
            className="flex-shrink-0 flex items-center gap-2 transition-transform duration-200 hover:scale-105"
          >
            <span className="text-2xl sm:text-3xl animate-pulse" aria-hidden="true">
              {finalProps.logoIcon}
            </span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              {finalProps.logoText}
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
