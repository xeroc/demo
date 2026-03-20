/**
 * Confetti utility module
 * Generates confetti particles with randomized properties for explosion animations
 */

export interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
}

let particleIdCounter = 0;

/**
 * Generates a random hex color string
 * @returns Valid hex color string in format #RRGGBB
 */
export function getRandomColor(): string {
  const hexChars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Generates a random number within a range
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number between min and max
 */
function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generates a single confetti particle with randomized properties
 * @param x - Initial x position (default: 0)
 * @param y - Initial y position (default: 0)
 * @returns ConfettiParticle object with randomized velocity, color, size, and rotation
 */
export function generateParticle(x: number = 0, y: number = 0): ConfettiParticle {
  const id = ++particleIdCounter;
  
  // Random velocity for explosion effect (particles move outward)
  const angle = Math.random() * Math.PI * 2; // Random direction
  const speed = randomRange(2, 8); // Speed of explosion
  
  return {
    id,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    color: getRandomColor(),
    size: randomRange(4, 12),
    rotation: Math.random() * 360
  };
}

/**
 * Generates an array of confetti particles
 * @param count - Number of particles to generate
 * @param x - Initial x position for all particles (default: 0)
 * @param y - Initial y position for all particles (default: 0)
 * @returns Array of ConfettiParticle objects
 */
export function generateConfetti(count: number, x: number = 0, y: number = 0): ConfettiParticle[] {
  if (count < 0) {
    throw new Error('Count must be a non-negative number');
  }
  
  const particles: ConfettiParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push(generateParticle(x, y));
  }
  
  return particles;
}
