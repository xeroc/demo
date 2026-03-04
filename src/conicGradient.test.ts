/**
 * Tests for conic gradient utility module
 */

import { describe, it, expect } from 'vitest';
import {
  createConicGradient,
  createInterpolatedConicGradient,
  generateColorStops,
  interpolateColor,
  isValidHexColor,
  validateColors,
  type ConicGradientOptions
} from './conicGradient';

describe('conicGradient', () => {
  describe('isValidHexColor', () => {
    it('should validate 6-digit hex colors', () => {
      expect(isValidHexColor('#ff0000')).toBe(true);
      expect(isValidHexColor('#00ff00')).toBe(true);
      expect(isValidHexColor('#0000ff')).toBe(true);
      expect(isValidHexColor('#FFFFFF')).toBe(true);
      expect(isValidHexColor('#123abc')).toBe(true);
    });

    it('should validate 3-digit hex colors', () => {
      expect(isValidHexColor('#f00')).toBe(true);
      expect(isValidHexColor('#0f0')).toBe(true);
      expect(isValidHexColor('#00f')).toBe(true);
      expect(isValidHexColor('#FFF')).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      expect(isValidHexColor('ff0000')).toBe(false);
      expect(isValidHexColor('#ff')).toBe(false);
      expect(isValidHexColor('#ffff')).toBe(false);
      expect(isValidHexColor('#fffff')).toBe(false);
      expect(isValidHexColor('#fffffff')).toBe(false);
      expect(isValidHexColor('rgb(255, 0, 0)')).toBe(false);
      expect(isValidHexColor('red')).toBe(false);
      expect(isValidHexColor('')).toBe(false);
    });
  });

  describe('validateColors', () => {
    it('should validate non-empty arrays of valid hex colors', () => {
      expect(validateColors(['#ff0000', '#00ff00', '#0000ff'])).toBe(true);
      expect(validateColors(['#fff'])).toBe(true);
      expect(validateColors(['#123456', '#abcdef'])).toBe(true);
    });

    it('should reject empty arrays', () => {
      expect(validateColors([])).toBe(false);
    });

    it('should reject non-array inputs', () => {
      expect(validateColors(null as any)).toBe(false);
      expect(validateColors(undefined as any)).toBe(false);
      expect(validateColors('not an array' as any)).toBe(false);
    });

    it('should reject arrays with invalid colors', () => {
      expect(validateColors(['ff0000'])).toBe(false);
      expect(validateColors(['#fff', 'invalid'])).toBe(false);
    });
  });

  describe('interpolateColor', () => {
    it('should interpolate between two colors', () => {
      const result = interpolateColor('#ff0000', '#0000ff', 0.5);
      expect(result).toBe('#800080');
    });

    it('should return first color at factor 0', () => {
      const result = interpolateColor('#ff0000', '#0000ff', 0);
      expect(result).toBe('#ff0000');
    });

    it('should return second color at factor 1', () => {
      const result = interpolateColor('#ff0000', '#0000ff', 1);
      expect(result).toBe('#0000ff');
    });

    it('should handle 3-digit hex colors', () => {
      const result = interpolateColor('#f00', '#00f', 0.5);
      expect(result).toBe('#800080');
    });

    it('should clamp factor values below 0', () => {
      const result = interpolateColor('#ff0000', '#0000ff', -0.5);
      expect(result).toBe('#ff0000');
    });

    it('should clamp factor values above 1', () => {
      const result = interpolateColor('#ff0000', '#0000ff', 1.5);
      expect(result).toBe('#0000ff');
    });

    it('should produce valid hex format', () => {
      const result = interpolateColor('#123456', '#abcdef', 0.3);
      expect(isValidHexColor(result)).toBe(true);
    });
  });

  describe('generateColorStops', () => {
    it('should generate color stops for single color', () => {
      const stops = generateColorStops(['#ff0000']);
      expect(stops).toEqual(['#ff0000 0%', '#ff0000 100%']);
    });

    it('should generate color stops for multiple colors', () => {
      const stops = generateColorStops(['#ff0000', '#00ff00', '#0000ff']);
      expect(stops).toEqual([
        '#ff0000 0%',
        '#00ff00 33%',
        '#0000ff 67%',
        '#ff0000 100%'
      ]);
    });

    it('should return empty array for empty input', () => {
      const stops = generateColorStops([]);
      expect(stops).toEqual([]);
    });

    it('should loop back to first color at 100%', () => {
      const stops = generateColorStops(['#fff', '#000']);
      const lastStop = stops[stops.length - 1];
      expect(lastStop).toContain('100%');
      expect(lastStop).toContain('#fff');
    });
  });

  describe('createConicGradient', () => {
    it('should return valid CSS conic-gradient string', () => {
      const options: ConicGradientOptions = {
        colors: ['#ff0000', '#00ff00', '#0000ff']
      };
      const result = createConicGradient(options);
      
      expect(result).toMatch(/^conic-gradient\(from \d+deg,/);
      expect(result).toContain('#ff0000');
      expect(result).toContain('#00ff00');
      expect(result).toContain('#0000ff');
      expect(result).toMatch(/\d+%/);
      expect(result).toContain(')');
    });

    it('should accept angle parameter', () => {
      const options: ConicGradientOptions = {
        colors: ['#ff0000', '#00ff00'],
        angle: 45
      };
      const result = createConicGradient(options);
      expect(result).toContain('from 45deg');
    });

    it('should default angle to 0', () => {
      const options: ConicGradientOptions = {
        colors: ['#ff0000', '#00ff00']
      };
      const result = createConicGradient(options);
      expect(result).toContain('from 0deg');
    });

    it('should normalize angle to 0-360 range', () => {
      const options1: ConicGradientOptions = { colors: ['#fff'], angle: 370 };
      const result1 = createConicGradient(options1);
      expect(result1).toContain('from 10deg');

      const options2: ConicGradientOptions = { colors: ['#fff'], angle: -90 };
      const result2 = createConicGradient(options2);
      expect(result2).toContain('from 270deg');
    });

    it('should throw error for empty colors array', () => {
      const options: ConicGradientOptions = { colors: [] };
      expect(() => createConicGradient(options)).toThrow('Invalid colors');
    });

    it('should throw error for invalid color format', () => {
      const options: ConicGradientOptions = { colors: ['red', 'blue'] };
      expect(() => createConicGradient(options)).toThrow('Invalid colors');
    });

    it('should work with 3-digit hex colors', () => {
      const options: ConicGradientOptions = {
        colors: ['#f00', '#0f0', '#00f']
      };
      const result = createConicGradient(options);
      expect(result).toMatch(/^conic-gradient\(/);
      expect(result).toContain('#f00');
    });

    it('should generate valid CSS that can be applied to background', () => {
      const options: ConicGradientOptions = {
        colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
        angle: 45
      };
      const result = createConicGradient(options);
      
      expect(result).toMatch(/^conic-gradient\(from 45deg, /);
      expect(result).toContain('667eea');
      expect(result).toContain('764ba2');
      expect(result).toContain('f093fb');
      expect(result).toContain('f5576c');
    });
  });

  describe('createInterpolatedConicGradient', () => {
    it('should create gradient with interpolated colors', () => {
      const result = createInterpolatedConicGradient(['#ff0000', '#0000ff'], 0, 1);
      expect(result).toMatch(/^conic-gradient\(/);
      expect(result).toContain('#ff0000');
      expect(result).toContain('#0000ff');
    });

    it('should throw error for invalid colors', () => {
      expect(() => createInterpolatedConicGradient([], 0, 2)).toThrow('Invalid colors');
      expect(() => createInterpolatedConicGradient(['invalid'], 0, 2)).toThrow('Invalid colors');
    });

    it('should throw error for negative steps', () => {
      expect(() => createInterpolatedConicGradient(['#fff'], 0, -1)).toThrow('Steps must be a non-negative number');
    });

    it('should return regular gradient when steps is 0', () => {
      const result = createInterpolatedConicGradient(['#ff0000', '#0000ff'], 45, 0);
      expect(result).toContain('from 45deg');
      expect(result).toContain('#ff0000');
      expect(result).toContain('#0000ff');
    });

    it('should interpolate more colors with higher step count', () => {
      const result1 = createInterpolatedConicGradient(['#fff', '#000'], 0, 1);
      const result2 = createInterpolatedConicGradient(['#fff', '#000'], 0, 3);
      
      // More steps should result in longer gradient string
      expect(result2.length).toBeGreaterThan(result1.length);
    });
  });

  describe('Integration tests', () => {
    it('should generate smooth gradient with multiple colors and custom angle', () => {
      const options: ConicGradientOptions = {
        colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
        angle: 45
      };
      const gradient = createConicGradient(options);
      
      expect(gradient).toBe('conic-gradient(from 45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)');
    });

    it('should generate interpolated gradient for smooth transitions', () => {
      const gradient = createInterpolatedConicGradient(['#ff0000', '#0000ff'], 0, 1);
      
      expect(gradient).toMatch(/^conic-gradient\(from 0deg,/);
      // Should include original colors and interpolated ones
      expect(gradient).toContain('#ff0000');
      expect(gradient).toContain('#0000ff');
      expect(gradient).toContain('#800080'); // Midpoint color
    });
  });
});
