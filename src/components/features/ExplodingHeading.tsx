/**
 * ExplodingHeading Component
 * 
 * React component that wraps heading elements with explosion functionality.
 * Renders any heading level (h1-h6) based on 'as' prop, uses useExplodingHeading 
 * hook for logic, and renders both heading text and confetti particles.
 * 
 * @example
 * ```tsx
 * <ExplodingHeading as="h1" confettiCount={10}>
 *   Click me to explode!
 * </ExplodingHeading>
 * ```
 */

import React from 'react';
import { useExplodingHeading } from '../../hooks/useExplodingHeading';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface ExplodingHeadingProps {
  /** Heading level to render */
  as: HeadingLevel;
  /** Text content for the heading */
  children: string;
  /** Additional CSS classes */
  className?: string;
  /** Number of confetti particles per letter (default: 5) */
  confettiCount?: number;
}

/**
 * ExplodingHeading component that makes headings explode into confetti when clicked
 */
export const ExplodingHeading: React.FC<ExplodingHeadingProps> = ({
  as,
  children,
  className = '',
  confettiCount = 5
}) => {
  const {
    visibleText,
    handleClick,
    isExploded,
    isReassembling,
    confettiParticles
  } = useExplodingHeading({
    text: children,
    confettiCount,
    reassembleDelay: 100
  });

  // Determine if animation is active
  const isAnimating = isExploded || isReassembling;

  // Render confetti particles
  const confettiElements = confettiParticles.map((particle) => (
    <div
      key={particle.id}
      className="absolute w-2 h-2"
      style={{
        left: `${particle.x}px`,
        top: `${particle.y}px`,
        backgroundColor: particle.color,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        transform: `rotate(${particle.rotation}deg)`,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  ));

  // Create the heading element with appropriate tag
  const HeadingTag = as;

  return (
    <div className="relative inline-block">
      <HeadingTag
        onClick={handleClick}
        className={`cursor-pointer ${className}`}
        aria-label={children}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {visibleText || '\u00A0'}
      </HeadingTag>
      {isAnimating && confettiElements}
    </div>
  );
};

export default ExplodingHeading;
