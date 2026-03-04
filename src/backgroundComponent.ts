/**
 * Background Component
 * Renders animated conic gradient as full-screen background
 */

import { createConicGradient, type ConicGradientOptions } from './conicGradient';
import { GradientPositionAnimator, type AnimatorConfig } from './gradientAnimator';

export interface BackgroundComponentConfig {
  colors: string[];
  angle: number;
  speed: number;
  container?: HTMLElement | null;
}

export const DEFAULT_BACKGROUND_CONFIG: BackgroundComponentConfig = {
  colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
  angle: 0,
  speed: 100,
  container: null
};

/**
 * Background Component class
 * Manages the animated gradient background lifecycle
 */
export class BackgroundComponent {
  private config: BackgroundComponentConfig;
  private animator: GradientPositionAnimator | null = null;
  private container: HTMLElement;
  private isMounted: boolean = false;

  constructor(config: Partial<BackgroundComponentConfig> = {}) {
    this.config = { ...DEFAULT_BACKGROUND_CONFIG, ...config };
    this.container = this.config.container || document.body;
  }

  /**
   * Mount the background component
   * Starts the animation and applies gradient to container
   */
  mount(): void {
    if (this.isMounted) return;

    this.isMounted = true;
    this.initializeAnimator();
    if (this.animator) {
      this.animator.start();
    }
  }

  /**
   * Unmount the background component
   * Stops animation and cleans up resources
   */
  unmount(): void {
    if (!this.isMounted) return;

    if (this.animator) {
      this.animator.stop();
    }
    this.animator = null;
    this.isMounted = false;
    
    // Reset background style
    this.container.style.background = '';
  }

  /**
   * Check if component is currently mounted
   */
  getIsMounted(): boolean {
    return this.isMounted;
  }

  /**
   * Get current animator instance
   */
  getAnimator(): GradientPositionAnimator | null {
    return this.animator;
  }

  /**
   * Update gradient configuration
   */
  updateConfig(config: Partial<BackgroundComponentConfig>): void {
    this.config = { ...this.config, ...config };
    
    if (this.isMounted) {
      const wasRunning = this.animator?.getIsRunning() ?? false;
      if (this.animator) {
        this.animator.stop();
      }
      this.animator = null;
      this.initializeAnimator();
      if (this.animator && wasRunning) {
        this.animator.start();
      }
    }
  }

  /**
   * Initialize the animator with current configuration
   */
  private initializeAnimator(): void {
    const animatorConfig: AnimatorConfig = {
      speed: this.config.speed,
      maxX: 2000,
      maxY: 2000,
      onPositionUpdate: (x: number, _y: number) => this.updateGradient(x)
    };

    this.animator = new GradientPositionAnimator(animatorConfig);
  }

  /**
   * Update the gradient based on current position
   * Position affects the starting angle to create movement effect
   */
  private updateGradient(x: number): void {
    // Use position to offset the angle, creating linear movement at 45°
    // Since both x and y move equally, we can use either for offset
    const angleOffset = (x / 2000) * 360;
    const finalAngle = this.config.angle + angleOffset;

    const gradientOptions: ConicGradientOptions = {
      colors: this.config.colors,
      angle: finalAngle
    };

    try {
      const gradient = createConicGradient(gradientOptions);
      this.container.style.background = gradient;
    } catch (error) {
      console.error('Failed to create gradient:', error);
    }
  }
}

/**
 * Factory function to create and mount a background component
 */
export function createAnimatedBackground(
  config: Partial<BackgroundComponentConfig> = {}
): BackgroundComponent {
  const component = new BackgroundComponent(config);
  component.mount();
  return component;
}
