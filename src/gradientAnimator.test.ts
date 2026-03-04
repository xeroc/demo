/**
 * Unit tests for Gradient Position Animator
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  calculatePosition,
  verify45DegreeAngle,
  GradientPositionAnimator,
  DEFAULT_ANIMATOR_CONFIG,
  AnimatorConfig
} from './gradientAnimator';

describe('Gradient Position Animator', () => {
  describe('calculatePosition', () => {
    it('should return equal X and Y displacement for 45° angle', () => {
      const startTime = 0;
      const currentTime = 1000; // 1 second
      const speed = 100; // 100 pixels per second
      const maxX = 1000;
      const maxY = 1000;

      const position = calculatePosition(startTime, currentTime, speed, maxX, maxY);
      
      expect(verify45DegreeAngle(position.x, position.y)).toBe(true);
    });

    it('should calculate correct position after 0 seconds', () => {
      const position = calculatePosition(0, 0, 100, 1000, 1000);
      expect(position.x).toBe(0);
      expect(position.y).toBe(0);
    });

    it('should calculate correct position after 1 second at 100px/s', () => {
      const speed = 100;
      const position = calculatePosition(0, 1000, speed, 1000, 1000);
      
      // At 45°, diagonalFactor = √2/2 ≈ 0.7071
      // Total distance = 100px
      // X = Y = 100 * 0.7071 ≈ 70.71
      const expectedDisplacement = speed * (Math.sqrt(2) / 2);
      
      expect(position.x).toBeCloseTo(expectedDisplacement, 2);
      expect(position.y).toBeCloseTo(expectedDisplacement, 2);
    });

    it('should calculate correct position after 2 seconds at 50px/s', () => {
      const speed = 50;
      const position = calculatePosition(0, 2000, speed, 1000, 1000);
      
      const expectedDisplacement = (speed * 2) * (Math.sqrt(2) / 2);
      
      expect(position.x).toBeCloseTo(expectedDisplacement, 2);
      expect(position.y).toBeCloseTo(expectedDisplacement, 2);
    });

    it('should calculate correct position with non-zero start time', () => {
      const startTime = 500;
      const currentTime = 1500; // 1 second elapsed
      const speed = 100;
      
      const position = calculatePosition(startTime, currentTime, speed, 1000, 1000);
      const expectedDisplacement = speed * (Math.sqrt(2) / 2);
      
      expect(position.x).toBeCloseTo(expectedDisplacement, 2);
      expect(position.y).toBeCloseTo(expectedDisplacement, 2);
    });

    it('should wrap position within maxX bounds', () => {
      const speed = 1000;
      const position = calculatePosition(0, 2000, speed, 100, 100);
      
      // Position should be normalized within bounds
      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.x).toBeLessThan(100);
      expect(position.y).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeLessThan(100);
    });

    it('should handle different maxX and maxY values', () => {
      const position = calculatePosition(0, 1000, 100, 500, 1500);
      
      // X and Y should still be equal at 45°, just wrapped differently
      expect(verify45DegreeAngle(position.x, position.y)).toBe(true);
    });

    it('should calculate position at various time points correctly', () => {
      const testCases = [
        { time: 500, expectedDisplacement: 50 * (Math.sqrt(2) / 2) },
        { time: 1000, expectedDisplacement: 100 * (Math.sqrt(2) / 2) },
        { time: 1500, expectedDisplacement: 150 * (Math.sqrt(2) / 2) },
        { time: 2500, expectedDisplacement: 250 * (Math.sqrt(2) / 2) },
        { time: 5000, expectedDisplacement: 500 * (Math.sqrt(2) / 2) }
      ];

      testCases.forEach(({ time, expectedDisplacement }) => {
        const position = calculatePosition(0, time, 100, 1000, 1000);
        expect(position.x).toBeCloseTo(expectedDisplacement, 1);
        expect(position.y).toBeCloseTo(expectedDisplacement, 1);
      });
    });
  });

  describe('verify45DegreeAngle', () => {
    it('should return true for equal displacements', () => {
      expect(verify45DegreeAngle(100, 100)).toBe(true);
      expect(verify45DegreeAngle(0, 0)).toBe(true);
      expect(verify45DegreeAngle(70.71, 70.71)).toBe(true);
    });

    it('should return true for nearly equal displacements within tolerance', () => {
      expect(verify45DegreeAngle(100, 100.0001)).toBe(true);
      expect(verify45DegreeAngle(70.7106, 70.7107)).toBe(true);
    });

    it('should return false for unequal displacements', () => {
      expect(verify45DegreeAngle(100, 50)).toBe(false);
      expect(verify45DegreeAngle(0, 100)).toBe(false);
      expect(verify45DegreeAngle(200, 100)).toBe(false);
    });

    it('should respect custom tolerance', () => {
      expect(verify45DegreeAngle(100, 100.01, 0.1)).toBe(true);
      expect(verify45DegreeAngle(100, 100.01, 0.001)).toBe(false);
    });
  });

  describe('GradientPositionAnimator', () => {
    let animator: GradientPositionAnimator;
    let updateCallback: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      updateCallback = vi.fn();
      const config: AnimatorConfig = {
        ...DEFAULT_ANIMATOR_CONFIG,
        onPositionUpdate: updateCallback
      };
      animator = new GradientPositionAnimator(config);
    });

    describe('constructor', () => {
      it('should create animator with default config', () => {
        const defaultAnimator = new GradientPositionAnimator();
        expect(defaultAnimator.getIsRunning()).toBe(false);
        expect(defaultAnimator.getPosition()).toEqual({ x: 0, y: 0 });
      });

      it('should create animator with custom config', () => {
        const config: AnimatorConfig = {
          speed: 200,
          maxX: 500,
          maxY: 500
        };
        const customAnimator = new GradientPositionAnimator(config);
        expect(customAnimator).toBeDefined();
      });
    });

    describe('start', () => {
      it('should start the animation', () => {
        animator.start();
        expect(animator.getIsRunning()).toBe(true);
      });

      it('should not start if already running', () => {
        animator.start();
        animator.start(); // Second call should be ignored
        expect(animator.getIsRunning()).toBe(true);
      });
    });

    describe('stop', () => {
      it('should stop the animation', () => {
        animator.start();
        animator.stop();
        expect(animator.getIsRunning()).toBe(false);
      });

      it('should not error if stopped when not running', () => {
        expect(() => animator.stop()).not.toThrow();
        expect(animator.getIsRunning()).toBe(false);
      });
    });

    describe('reset', () => {
      it('should reset position to origin', () => {
        animator.start();
        animator.reset();
        expect(animator.getPosition()).toEqual({ x: 0, y: 0 });
        expect(animator.getIsRunning()).toBe(false);
      });

      it('should stop animation when reset', () => {
        animator.start();
        animator.reset();
        expect(animator.getIsRunning()).toBe(false);
      });
    });

    describe('getState', () => {
      it('should return initial state before animation starts', () => {
        const state = animator.getState();
        expect(state.positionX).toBe(0);
        expect(state.positionY).toBe(0);
        expect(state.isRunning).toBe(false);
        expect(state.elapsedTime).toBe(0);
      });

      it('should return running state after animation starts', () => {
        animator.start();
        const state = animator.getState();
        expect(state.isRunning).toBe(true);
      });
    });

    describe('getPosition', () => {
      it('should return initial position', () => {
        const position = animator.getPosition();
        expect(position).toEqual({ x: 0, y: 0 });
      });

      it('should return a copy of the position', () => {
        const position1 = animator.getPosition();
        const position2 = animator.getPosition();
        expect(position1).not.toBe(position2);
        expect(position1).toEqual(position2);
      });
    });

    describe('getIsRunning', () => {
      it('should return false initially', () => {
        expect(animator.getIsRunning()).toBe(false);
      });

      it('should return true after start', () => {
        animator.start();
        expect(animator.getIsRunning()).toBe(true);
      });

      it('should return false after stop', () => {
        animator.start();
        animator.stop();
        expect(animator.getIsRunning()).toBe(false);
      });
    });

    describe('animation lifecycle', () => {
      it('should use requestAnimationFrame for updates', async () => {
        const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame');
        
        animator.start();
        
        // Wait for a frame to be requested
        await new Promise(resolve => setTimeout(resolve, 10));
        
        expect(requestAnimationFrameSpy).toHaveBeenCalled();
        
        animator.stop();
        requestAnimationFrameSpy.mockRestore();
      });

      it('should use cancelAnimationFrame when stopped', () => {
        const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
        
        animator.start();
        animator.stop();
        
        expect(cancelAnimationFrameSpy).toHaveBeenCalled();
        
        cancelAnimationFrameSpy.mockRestore();
      });
    });
  });

  describe('45° angle verification', () => {
    it('should maintain 45° trajectory throughout animation', () => {
      const speed = 100;
      const testTimes = [100, 500, 1000, 2000, 5000, 10000];
      
      testTimes.forEach(time => {
        const position = calculatePosition(0, time, speed, 1000, 1000);
        expect(verify45DegreeAngle(position.x, position.y, 0.01)).toBe(true);
      });
    });

    it('should have equal X and Y displacement ratios', () => {
      const speed = 200;
      const time = 1000;
      
      const position = calculatePosition(0, time, speed, 1000, 1000);
      const ratio = position.x / position.y;
      
      expect(ratio).toBeCloseTo(1, 3);
    });
  });

  describe('DEFAULT_ANIMATOR_CONFIG', () => {
    it('should have valid default configuration', () => {
      expect(DEFAULT_ANIMATOR_CONFIG.speed).toBeGreaterThan(0);
      expect(DEFAULT_ANIMATOR_CONFIG.maxX).toBeGreaterThan(0);
      expect(DEFAULT_ANIMATOR_CONFIG.maxY).toBeGreaterThan(0);
    });

    it('should have reasonable speed value', () => {
      expect(DEFAULT_ANIMATOR_CONFIG.speed).toBe(100);
    });
  });
});
