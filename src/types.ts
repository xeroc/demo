/**
 * Type definitions for animated background
 */

export interface AnimationState {
  isRunning: boolean;
  startTime: number | null;
  currentAngle: number;
}

export interface GradientColors {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
}

export type AnimationCallback = (state: AnimationState) => void;
