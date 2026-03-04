/**
 * Main entry point for ChaosCraft animated background
 */

import { 
  BackgroundComponent,
  type BackgroundComponentConfig 
} from './backgroundComponent';

export interface GradientConfig {
  colors: string[];
  duration: number;
  angle: number;
}

export const DEFAULT_CONFIG: GradientConfig = {
  colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
  duration: 3000,
  angle: 45
};

// Re-export types and utilities
export type { ConicGradientOptions } from './conicGradient';
export { createConicGradient } from './conicGradient';
export type { AnimatorConfig, AnimatorState } from './gradientAnimator';
export { DEFAULT_ANIMATOR_CONFIG } from './gradientAnimator';
export type { BackgroundComponentConfig } from './backgroundComponent';
export { BackgroundComponent, DEFAULT_BACKGROUND_CONFIG } from './backgroundComponent';

// Track the active background component instance
let activeBackgroundComponent: BackgroundComponent | null = null;

/**
 * Initialize the animated background
 * Sets up the background component with visibility handling
 */
export function initAnimatedBackground(config: GradientConfig = DEFAULT_CONFIG): void {
  // Clean up existing instance if any
  if (activeBackgroundComponent !== null) {
    activeBackgroundComponent.unmount();
    activeBackgroundComponent = null;
  }

  // Create and mount the background component
  const bgConfig: Partial<BackgroundComponentConfig> = {
    colors: config.colors,
    angle: config.angle,
    speed: 2000 / Math.max(config.duration, 1) * 100 // Convert duration to speed
  };

  activeBackgroundComponent = new BackgroundComponent(bgConfig);
  activeBackgroundComponent.mount();

  // Set up Page Visibility API handling
  setupVisibilityHandler();
}

/**
 * Handle page visibility changes
 * Pauses animation when page is hidden, resumes when visible
 */
function handleVisibilityChange(): void {
  if (activeBackgroundComponent === null) return;

  if (document.hidden) {
    // Page is hidden, pause animation
    const animator = activeBackgroundComponent.getAnimator();
    if (animator !== null && animator.getIsRunning()) {
      animator.stop();
    }
  } else {
    // Page is visible, resume animation
    const animator = activeBackgroundComponent.getAnimator();
    if (animator !== null && !animator.getIsRunning()) {
      animator.start();
    }
  }
}

/**
 * Set up visibility change listener
 */
function setupVisibilityHandler(): void {
  // Remove existing listener if any
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  // Add new listener
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

/**
 * Get the active background component instance
 */
export function getActiveBackgroundComponent(): BackgroundComponent | null {
  return activeBackgroundComponent;
}

/**
 * Cleanup and remove the animated background
 */
export function cleanupAnimatedBackground(): void {
  if (activeBackgroundComponent !== null) {
    activeBackgroundComponent.unmount();
    activeBackgroundComponent = null;
  }
  document.removeEventListener('visibilitychange', handleVisibilityChange);
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
