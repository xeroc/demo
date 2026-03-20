/**
 * How It Works Component
 * Explains the ChaosCraft process to visitors
 */

import React from 'react';
import { ExplodingHeading } from './ExplodingHeading';

const HowItWorks: React.FC = () => {
  return (
    <section className="mt-8 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-16 w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"></div>

      <div className="mb-4 sm:mb-6 md:mb-8">
        <ExplodingHeading 
          as="h2" 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
        >
          What is ChaosCraft?
        </ExplodingHeading>
      </div>

      <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed sm:leading-relaxed md:leading-loose lg:leading-loose tracking-wide">
          Imagine if 1,000 people each paid $1 to tell an AI to build whatever
          they wanted into a shared codebase. A masterpiece? A disaster? A
          chaotic symphony of features nobody asked for?{" "}
          <strong className="text-white font-semibold">
            Nobody knows. That's the point.
          </strong>
        </p>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed sm:leading-relaxed md:leading-loose lg:leading-loose tracking-wide">
          ChaosCraft is an experiment in collective creation. You pay $1, submit
          a 120-character request, and watch as AI agents turn your idea into
          code that becomes part of a living, evolving project.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 mt-6 sm:mt-8 md:mt-10 text-left border-2 border-cyan-400/30 shadow-xl hover:shadow-2xl hover:border-cyan-400/50 transition-all duration-300 ease-in-out">
        <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-center">
          <ExplodingHeading 
            as="h3" 
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-cyan-300 tracking-tight"
          >
            How It Works
          </ExplodingHeading>
        </div>

        <ol className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5 text-gray-100">
          <li className="flex items-start gap-2 sm:gap-3 md:gap-4 p-1.5 sm:p-2 md:p-3 rounded-lg hover:bg-white/5 transition-colors duration-200">
            <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-lg shadow-cyan-500/30">
              1
            </span>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed pt-0.5 sm:pt-1">
              You submit a feature request (e.g., "Add dancing robot") and pay
              $1
            </span>
          </li>
          <li className="flex items-start gap-2 sm:gap-3 md:gap-4 p-1.5 sm:p-2 md:p-3 rounded-lg hover:bg-white/5 transition-colors duration-200">
            <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-lg shadow-cyan-500/30">
              2
            </span>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed pt-0.5 sm:pt-1">
              A GitHub Issue is automatically created for your request
            </span>
          </li>
          <li className="flex items-start gap-2 sm:gap-3 md:gap-4 p-1.5 sm:p-2 md:p-3 rounded-lg hover:bg-white/5 transition-colors duration-200">
            <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-lg shadow-cyan-500/30">
              3
            </span>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed pt-0.5 sm:pt-1">
              AI agents write specifications, generate code, and create a Pull
              Request
            </span>
          </li>
          <li className="flex items-start gap-2 sm:gap-3 md:gap-4 p-1.5 sm:p-2 md:p-3 rounded-lg hover:bg-white/5 transition-colors duration-200">
            <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-lg shadow-cyan-500/30">
              4
            </span>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed pt-0.5 sm:pt-1">
              The PR is merged and the site is rebuilt with your feature live
            </span>
          </li>
        </ol>
      </div>

      <div className="flex justify-center gap-1.5 sm:gap-2 my-4 sm:my-6">
        <span className="text-cyan-300 animate-pulse text-sm sm:text-base">
          ✨
        </span>
        <span className="text-blue-300 animate-pulse text-sm sm:text-base">
          ✨
        </span>
        <span className="text-purple-300 animate-pulse text-sm sm:text-base">
          ✨
        </span>
      </div>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-cyan-200 mt-4 sm:mt-6 md:mt-8 lg:mt-10 italic leading-relaxed font-light border-t border-white/10 pt-4 sm:pt-6 md:pt-7 lg:pt-8">
        You're not just requesting code. You're planting a star in the
        ChaosCraft galaxy 🌌
      </p>
    </section>
  );
};

export default HowItWorks;
