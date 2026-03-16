/**
 * Footer Component for ChaosCraft
 * Responsive footer with copyright only (no links)
 */

import React from 'react';

export interface FooterProps {
  copyrightText?: string;
}

const DEFAULT_FOOTER_PROPS: Required<FooterProps> = {
  copyrightText: '© 2026 ChaosCraft. Built by chaos, one dollar at a time.'
};

/**
 * Responsive footer component with copyright only
 */
const Footer: React.FC<FooterProps> = (props = {}) => {
  const finalProps = { ...DEFAULT_FOOTER_PROPS, ...props };
  
  return (
    <footer 
      id="chaoscraft-footer"
      className="bg-slate-900/95 backdrop-blur-md border-t border-white/10 mt-auto"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm md:text-base text-gray-400 text-center">
            {finalProps.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
