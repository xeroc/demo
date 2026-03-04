/**
 * Main entry point for ChaosCraft animated background
 */

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

/**
 * Initialize the animated background
 */
export function initAnimatedBackground(config: GradientConfig = DEFAULT_CONFIG): void {
  // Implementation will be added in subsequent stories
  console.log('Animated background initialized', config);
}

// Re-export types and utilities
export type { ConicGradientOptions } from './conicGradient';
export { createConicGradient } from './conicGradient';
export type { AnimatorConfig, AnimatorState } from './gradientAnimator';
export { DEFAULT_ANIMATOR_CONFIG } from './gradientAnimator';
export type { BackgroundComponentConfig } from './backgroundComponent';
export { 
  BackgroundComponent,
  DEFAULT_BACKGROUND_CONFIG,
  createAnimatedBackground 
} from './backgroundComponent';
