/**
 * Gradient Position Animator
 * Controls animation of gradient position moving at 45° from horizontal
 */

export interface AnimatorState {
  positionX: number;
  positionY: number;
  isRunning: boolean;
  elapsedTime: number;
}

export interface AnimatorConfig {
  speed: number; // pixels per second
  maxX: number;
  maxY: number;
  onPositionUpdate?: (x: number, y: number) => void;
}

export const DEFAULT_ANIMATOR_CONFIG: AnimatorConfig = {
  speed: 100,
  maxX: 1000,
  maxY: 1000
};

/**
 * Calculate position at 45° angle after elapsed time
 * At 45°, X and Y displacement should be equal
 */
export function calculatePosition(
  startTime: number,
  currentTime: number,
  speed: number,
  maxX: number,
  maxY: number
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
  const normalizedX = ((displacement % maxX) + maxX) % maxX;
  const normalizedY = ((displacement % maxY) + maxY) % maxY;
  
  return {
    x: Math.round(normalizedX * 1000) / 1000,
    y: Math.round(normalizedY * 1000) / 1000
  };
}

/**
 * Verify that angle calculation is correct (45°)
 * Returns true if X and Y displacements are equal within tolerance
 */
export function verify45DegreeAngle(
  xDisplacement: number,
  yDisplacement: number,
  tolerance: number = 0.001
): boolean {
  return Math.abs(xDisplacement - yDisplacement) <= tolerance;
}

/**
 * Gradient Position Animator class
 * Manages animation lifecycle and position updates
 */
export class GradientPositionAnimator {
  private startTime: number | null = null;
  private animationFrameId: number | null = null;
  private isRunning: boolean = false;
  private config: AnimatorConfig;
  private currentPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor(config: AnimatorConfig = DEFAULT_ANIMATOR_CONFIG) {
    this.config = { ...config };
  }

  /**
   * Start the animation
   */
  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.startTime = performance.now();
    this.animate();
  }

  /**
   * Stop the animation
   */
  stop(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Reset the animation to initial state
   */
  reset(): void {
    this.stop();
    this.startTime = null;
    this.currentPosition = { x: 0, y: 0 };
  }

  /**
   * Get current animator state
   */
  getState(): AnimatorState {
    return {
      positionX: this.currentPosition.x,
      positionY: this.currentPosition.y,
      isRunning: this.isRunning,
      elapsedTime: this.startTime 
        ? performance.now() - this.startTime 
        : 0
    };
  }

  /**
   * Get current position
   */
  getPosition(): { x: number; y: number } {
    return { ...this.currentPosition };
  }

  /**
   * Check if animation is running
   */
  getIsRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Main animation loop using requestAnimationFrame
   */
  private animate = (): void => {
    if (!this.isRunning || this.startTime === null) return;
    
    const currentTime = performance.now();
    const position = calculatePosition(
      this.startTime,
      currentTime,
      this.config.speed,
      this.config.maxX,
      this.config.maxY
    );
    
    this.currentPosition = position;
    
    // Call update callback if provided
    if (this.config.onPositionUpdate) {
      this.config.onPositionUpdate(position.x, position.y);
    }
    
    // Schedule next frame
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
