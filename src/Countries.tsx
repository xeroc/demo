/**
 * Countries Component
 *
 * Displays a section listing participating countries at the bottom of the page.
 */

import React from 'react';

export interface CountriesProps {
  title?: string;
  countries?: string[];
}

const DEFAULT_COUNTRIES_CONFIG: Required<CountriesProps> = {
  title: '🌍 Participating Countries',
  countries: [
    'United States',
    'Germany',
    'United Kingdom',
    'Canada',
    'Australia',
    'Japan',
    'France',
    'Brazil',
    'India',
    'Netherlands'
  ]
};

/**
 * Countries component displays a responsive section listing participating countries
 */
const Countries: React.FC<CountriesProps> = ({ 
  title, 
  countries 
}) => {
  const finalConfig = {
    title: title ?? DEFAULT_COUNTRIES_CONFIG.title,
    countries: countries ?? DEFAULT_COUNTRIES_CONFIG.countries
  };
  
  return (
    <section 
      id="countries-container"
      className="mt-6 sm:mt-8 md:mt-8 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-8 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl"
    >
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
        {finalConfig.title}
      </h3>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
        {finalConfig.countries.map((country, index) => (
          <span 
            key={index}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 text-gray-200 rounded-full text-xs sm:text-sm md:text-base border border-white/20 transition-all duration-200 cursor-default"
          >
            {country}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Countries;
export { DEFAULT_COUNTRIES_CONFIG };
