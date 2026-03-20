/**
 * useExplodingHeading Custom Hook
 * 
 * React hook that manages exploding heading state and animations.
 * When triggered, text explodes into confetti particles, then reassembles
 * letter by letter.
 * 
 * @example
 * ```tsx
 * const { visibleText, handleClick, isExploded, isReassembling, confettiParticles } = useExplodingHeading({
 *   text: "Hello World",
 *   confettiCount: 5,
 *   reassembleDelay: 100
 * });
 * ```
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ConfettiParticle, generateConfetti } from '../utils/confetti';

export interface UseExplodingHeadingConfig {
  /** The original text to display and explode */
  text: string;
  /** Number of confetti particles per letter (default: 5) */
  confettiCount?: number;
  /** Delay in ms between each letter reassembly (default: 100ms) */
  reassembleDelay?: number;
}

export interface UseExplodingHeadingReturn {
  /** Current visible text (changes during reassembly) */
  visibleText: string;
  /** Click handler to trigger explosion */
  handleClick: () => void;
  /** Whether text is currently exploded */
  isExploded: boolean;
  /** Whether text is currently reassembling */
  isReassembling: boolean;
  /** Array of confetti particles for rendering */
  confettiParticles: ConfettiParticle[];
}

/**
 * Custom hook for managing exploding heading state and animations
 */
export function useExplodingHeading(config: UseExplodingHeadingConfig): UseExplodingHeadingReturn {
  const {
    text,
    confettiCount = 5,
    reassembleDelay = 100
  } = config;

  const [visibleText, setVisibleText] = useState(text);
  const [isExploded, setIsExploded] = useState(false);
  const [isReassembling, setIsReassembling] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<ConfettiParticle[]>([]);
  
  const reassemblyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reassemblyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Update visible text when original text changes (if not in animation)
  useEffect(() => {
    if (!isExploded && !isReassembling) {
      setVisibleText(text);
    }
  }, [text, isExploded, isReassembling]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (reassemblyTimerRef.current) {
        clearTimeout(reassemblyTimerRef.current);
      }
      if (reassemblyIntervalRef.current) {
        clearInterval(reassemblyIntervalRef.current);
      }
    };
  }, []);

  const handleClick = useCallback(() => {
    // Don't trigger if already exploded or reassembling
    if (isExploded || isReassembling) {
      return;
    }

    // Clear any existing timers
    if (reassemblyTimerRef.current) {
      clearTimeout(reassemblyTimerRef.current);
      reassemblyTimerRef.current = null;
    }
    if (reassemblyIntervalRef.current) {
      clearInterval(reassemblyIntervalRef.current);
      reassemblyIntervalRef.current = null;
    }

    // Generate confetti particles for each letter
    const letters = text.split('');
    const allParticles: ConfettiParticle[] = [];
    
    letters.forEach((letter) => {
      if (letter.trim()) { // Skip whitespace for confetti
        const particles = generateConfetti(confettiCount);
        allParticles.push(...particles);
      }
    });

    // Trigger explosion
    setConfettiParticles(allParticles);
    setVisibleText('');
    setIsExploded(true);

    // Start reassembly after a brief explosion pause
    reassemblyTimerRef.current = setTimeout(() => {
      setIsReassembling(true);
      setIsExploded(false);
      
      let currentIndex = -1;
      const letters = text.split('');
      
      // Reassemble letter by letter
      reassemblyIntervalRef.current = setInterval(() => {
        currentIndex++;
        
        if (currentIndex < letters.length) {
          setVisibleText(text.slice(0, currentIndex + 1));
        } else {
          // Reassembly complete
          if (reassemblyIntervalRef.current) {
            clearInterval(reassemblyIntervalRef.current);
            reassemblyIntervalRef.current = null;
          }
          setIsReassembling(false);
          setConfettiParticles([]);
          setVisibleText(text);
        }
      }, reassembleDelay);
    }, 300); // 300ms pause for explosion effect
  }, [text, confettiCount, reassembleDelay, isExploded, isReassembling]);

  return {
    visibleText,
    handleClick,
    isExploded,
    isReassembling,
    confettiParticles
  };
}
