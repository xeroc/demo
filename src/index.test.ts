/**
 * Tests for animated background initialization
 */

import { describe, it, expect } from 'vitest';
import { initAnimatedBackground, DEFAULT_CONFIG } from './index';
import type { GradientConfig } from './index';

describe('Animated Background', () => {
  describe('initAnimatedBackground', () => {
    it('should initialize without errors', () => {
      expect(() => initAnimatedBackground()).not.toThrow();
    });

    it('should accept custom configuration', () => {
      const customConfig: GradientConfig = {
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        duration: 5000,
        angle: 90
      };
      expect(() => initAnimatedBackground(customConfig)).not.toThrow();
    });
  });

  describe('DEFAULT_CONFIG', () => {
    it('should have valid default colors', () => {
      expect(DEFAULT_CONFIG.colors).toBeInstanceOf(Array);
      expect(DEFAULT_CONFIG.colors.length).toBeGreaterThan(0);
      expect(DEFAULT_CONFIG.colors.every(c => c.startsWith('#'))).toBe(true);
    });

    it('should have valid duration', () => {
      expect(DEFAULT_CONFIG.duration).toBeGreaterThan(0);
      expect(typeof DEFAULT_CONFIG.duration).toBe('number');
    });

    it('should have valid angle', () => {
      expect(DEFAULT_CONFIG.angle).toBeGreaterThanOrEqual(0);
      expect(DEFAULT_CONFIG.angle).toBeLessThanOrEqual(360);
      expect(typeof DEFAULT_CONFIG.angle).toBe('number');
    });
  });
});
