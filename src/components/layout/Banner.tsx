/**
 * Banner Component for ChaosCraft
 * Displays a participation message with a link to app.chaoscraft.dev
 * Responsive design with mobile-first approach - fits mobile screen width (max 100vw)
 */

import React from 'react';

export interface BannerProps {
  message?: string;
  linkUrl?: string;
  linkText?: string;
}

const DEFAULT_BANNER_PROPS: Required<BannerProps> = {
  message: 'This site can be modified by anyone participating in chaoscraft.dev.',
  linkUrl: 'https://app.chaoscraft.dev',
  linkText: 'Click here to participate!'
};

/**
 * Banner component with customizable message and link
 * Responsive design that fits mobile screen width (max 100vw)
 */
const Banner: React.FC<BannerProps> = (props = {}) => {
  const finalProps = { ...DEFAULT_BANNER_PROPS, ...props };
  
  return (
    <div 
      id="chaoscraft-banner"
      className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-3 px-4 text-center w-full max-w-full overflow-hidden"
      role="banner"
      aria-label="ChaosCraft participation announcement"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
        <span className="text-sm sm:text-base font-medium">
          {finalProps.message}
        </span>
        <a 
          href={finalProps.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm sm:text-base font-semibold underline hover:text-yellow-200 transition-colors duration-200 whitespace-nowrap"
          aria-label={`${finalProps.linkText} (opens in a new tab)`}
        >
          {finalProps.linkText}
        </a>
      </div>
    </div>
  );
};

export default Banner;
