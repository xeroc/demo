/**
 * AnimatedBackground React Component
 * Renders animated conic gradient as full-screen background
 */

import React, { useEffect, useRef, memo } from 'react';
import { createConicGradient, type ConicGradientOptions } from './conicGradient';

export interface AnimatedBackgroundProps {
  colors?: string[];
  angle?: number;
  speed?: number;
  children?: React.ReactNode;
}

const DEFAULT_COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c'];
const DEFAULT_ANGLE = 0;
const DEFAULT_SPEED = 100;
const MAX_X = 2000;
const MAX_Y = 2000;

/**
 * Calculate position at 45° angle after elapsed time
 * At 45°, X and Y displacement should be equal
 */
function calculatePosition(
  startTime: number,
  currentTime: number,
  speed: number
): { x: number; y: number } {
  const elapsedTime = currentTime - startTime;
  
  // At 45° angle, we move equally in X and Y directions
  // cos(45°) = sin(45°) = √2/2 ≈ 0.7071
  const diagonalFactor = Math.sqrt(2) / 2;
  
  // Distance traveled in pixels
  const totalDistance = (elapsedTime / 1000) * speed;
  
  // X and Y displacement (equal for 45° angle)
  const displacement = totalDistance * diagonalFactor;
  
  // Normalize displacement to fit within bounds
  const normalizedX = ((displacement % MAX_X) + MAX_X) % MAX_X;
  const normalizedY = ((displacement % MAX_Y) + MAX_Y) % MAX_Y;
  
  return {
    x: Math.round(normalizedX * 1000) / 1000,
    y: Math.round(normalizedY * 1000) / 1000
  };
}

/**
 * AnimatedBackground Component
 * Full-screen animated gradient background using requestAnimationFrame
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  colors = DEFAULT_COLORS,
  angle = DEFAULT_ANGLE,
  speed = DEFAULT_SPEED,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const animate = (): void => {
      if (!isRunningRef.current || startTimeRef.current === null) return;
      
      const currentTime = performance.now();
      const position = calculatePosition(
        startTimeRef.current,
        currentTime,
        speed
      );
      
      // Use position to offset the angle, creating linear movement at 45°
      const angleOffset = (position.x / MAX_X) * 360;
      const finalAngle = angle + angleOffset;

      const gradientOptions: ConicGradientOptions = {
        colors,
        angle: finalAngle
      };

      try {
        const gradient = createConicGradient(gradientOptions);
        if (containerRef.current) {
          containerRef.current.style.background = gradient;
        }
      } catch (error) {
        console.error('Failed to create gradient:', error);
      }
      
      // Schedule next frame
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    isRunningRef.current = true;
    startTimeRef.current = performance.now();
    animate();

    // Cleanup function
    return () => {
      isRunningRef.current = false;
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, [colors, angle, speed]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    >
      {children}
    </div>
  );
};

export default memo(AnimatedBackground);
