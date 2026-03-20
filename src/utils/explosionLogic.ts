/**
 * Explosion Logic Utility
 * Handles letter explosion from DOM elements and confetti generation
 */

import { generateConfetti, ConfettiParticle } from './confetti';

/**
 * Represents a single letter with its position information
 */
export interface LetterInfo {
  text: string;
  position: {
    x: number;
    y: number;
  };
}

/**
 * Options for generating letter confetti
 */
export interface LetterConfettiOptions {
  particleCount?: number;
  color?: string;
}

/**
 * Result of splitting heading letters
 */
export interface SplitHeadingResult {
  letters: LetterInfo[];
  originalText: string;
}

/**
 * Extracts individual letters with their positions from a DOM element
 * @param element - The DOM element to extract letters from
 * @returns Array of LetterInfo objects with text and position
 */
export function splitHeadingLetters(element: HTMLElement): SplitHeadingResult {
  const letters: LetterInfo[] = [];
  const originalText = element.textContent || '';
  
  // Handle empty heading (including whitespace-only as effectively empty)
  if (!originalText || originalText.trim().length === 0) {
    return {
      letters: [],
      originalText: originalText.trim()
    };
  }

  // Get the bounding rectangle of the element for position calculations
  const elementRect = element.getBoundingClientRect();
  const elementStyle = window.getComputedStyle(element);
  
  // Get computed styles for accurate positioning
  const fontSize = parseFloat(elementStyle.fontSize) || 16;
  const lineHeight = parseFloat(elementStyle.lineHeight) || fontSize * 1.2;
  const paddingLeft = parseFloat(elementStyle.paddingLeft) || 0;
  const paddingTop = parseFloat(elementStyle.paddingTop) || 0;
  const borderLeft = parseFloat(elementStyle.borderLeftWidth) || 0;
  const borderTop = parseFloat(elementStyle.borderTopWidth) || 0;

  // Calculate starting position (relative to viewport)
  const startX = elementRect.left + paddingLeft + borderLeft;
  const startY = elementRect.top + paddingTop + borderTop + (lineHeight / 2);

  // Create a canvas context to measure text width accurately
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    // Fallback: estimate character width
    const avgCharWidth = fontSize * 0.6;
    let currentX = startX;
    
    for (let i = 0; i < originalText.length; i++) {
      const char = originalText[i];
      letters.push({
        text: char,
        position: {
          x: currentX + avgCharWidth / 2,
          y: startY
        }
      });
      currentX += avgCharWidth;
    }
    
    return { letters, originalText };
  }

  // Use canvas to measure text accurately
  ctx.font = `${elementStyle.fontStyle} ${elementStyle.fontWeight} ${elementStyle.fontSize} ${elementStyle.fontFamily}`;
  
  let currentX = startX;
  
  for (let i = 0; i < originalText.length; i++) {
    const char = originalText[i];
    
    // Measure the character width
    const charWidth = ctx.measureText(char).width;
    
    // Calculate center position of the character
    letters.push({
      text: char,
      position: {
        x: currentX + charWidth / 2,
        y: startY
      }
    });
    
    currentX += charWidth;
  }
  
  return { letters, originalText };
}

/**
 * Generates confetti particles at a specific letter position
 * @param letter - The letter text (for potential future use)
 * @param position - The x, y position to generate confetti at
 * @param color - Optional color for the confetti (defaults to random)
 * @param particleCount - Number of particles to generate (default: 5)
 * @returns Array of ConfettiParticle objects
 */
export function generateLetterConfetti(
  letter: string,
  position: { x: number; y: number },
  color?: string,
  particleCount: number = 5
): ConfettiParticle[] {
  // Handle edge case of empty letter
  if (!letter || letter.trim().length === 0) {
    return [];
  }
  
  // Generate confetti particles at the letter position
  const particles = generateConfetti(particleCount, position.x, position.y);
  
  // Override color if specified
  if (color) {
    return particles.map(p => ({ ...p, color }));
  }
  
  return particles;
}

/**
 * Creates explosion effect for all letters in a heading
 * @param element - The heading element to explode
 * @param options - Configuration options
 * @returns Array of all confetti particles
 */
export function explodeHeading(
  element: HTMLElement,
  options: LetterConfettiOptions = {}
): ConfettiParticle[] {
  const { letters } = splitHeadingLetters(element);
  const allParticles: ConfettiParticle[] = [];
  
  for (const letterInfo of letters) {
    const particles = generateLetterConfetti(
      letterInfo.text,
      letterInfo.position,
      options.color,
      options.particleCount ?? 3
    );
    allParticles.push(...particles);
  }
  
  return allParticles;
}

/**
 * Cleanup function to reset explosion state
 * Clears any explosion-related data or timers
 */
export function cleanupExplosion(): void {
  // Currently no global state to clean up
  // This function exists for future extensibility
  // (e.g., canceling animations, removing elements, clearing timers)
}

/**
 * Validates if an element is suitable for explosion
 * @param element - The element to validate
 * @returns True if element can be exploded, false otherwise
 */
export function canExplode(element: HTMLElement | null): element is HTMLElement {
  if (!element) return false;
  if (!(element instanceof HTMLElement)) return false;
  
  const text = element.textContent;
  if (!text || text.trim().length === 0) return false;
  
  return true;
}
