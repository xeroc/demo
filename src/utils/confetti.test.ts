import { describe, it, expect, beforeEach } from 'vitest';
import { generateParticle, generateConfetti, getRandomColor, ConfettiParticle } from './confetti';

describe('confetti utilities', () => {
  describe('getRandomColor', () => {
    it('should return a valid hex color string', () => {
      const color = getRandomColor();
      expect(color).toMatch(/^#[0-9A-F]{6}$/);
    });

    it('should return different colors on multiple calls', () => {
      const colors = new Set<string>();
      for (let i = 0; i < 100; i++) {
        colors.add(getRandomColor());
      }
      // With 100 random colors, we should have more than 1 unique color
      expect(colors.size).toBeGreaterThan(1);
    });
  });

  describe('generateParticle', () => {
    it('should generate a particle with all required properties', () => {
      const particle = generateParticle();
      
      expect(particle).toHaveProperty('id');
      expect(particle).toHaveProperty('x');
      expect(particle).toHaveProperty('y');
      expect(particle).toHaveProperty('vx');
      expect(particle).toHaveProperty('vy');
      expect(particle).toHaveProperty('color');
      expect(particle).toHaveProperty('size');
      expect(particle).toHaveProperty('rotation');
    });

    it('should generate a particle with correct types', () => {
      const particle: ConfettiParticle = generateParticle();
      
      expect(typeof particle.id).toBe('number');
      expect(typeof particle.x).toBe('number');
      expect(typeof particle.y).toBe('number');
      expect(typeof particle.vx).toBe('number');
      expect(typeof particle.vy).toBe('number');
      expect(typeof particle.color).toBe('string');
      expect(typeof particle.size).toBe('number');
      expect(typeof particle.rotation).toBe('number');
    });

    it('should use default position values (0, 0)', () => {
      const particle = generateParticle();
      expect(particle.x).toBe(0);
      expect(particle.y).toBe(0);
    });

    it('should accept custom position values', () => {
      const particle = generateParticle(100, 200);
      expect(particle.x).toBe(100);
      expect(particle.y).toBe(200);
    });

    it('should generate valid hex color', () => {
      const particle = generateParticle();
      expect(particle.color).toMatch(/^#[0-9A-F]{6}$/);
    });

    it('should generate size within expected range', () => {
      // Test multiple particles to check range
      for (let i = 0; i < 50; i++) {
        const particle = generateParticle();
        expect(particle.size).toBeGreaterThanOrEqual(4);
        expect(particle.size).toBeLessThanOrEqual(12);
      }
    });

    it('should generate rotation within expected range', () => {
      for (let i = 0; i < 50; i++) {
        const particle = generateParticle();
        expect(particle.rotation).toBeGreaterThanOrEqual(0);
        expect(particle.rotation).toBeLessThanOrEqual(360);
      }
    });

    it('should generate unique IDs for each particle', () => {
      const ids = new Set<number>();
      for (let i = 0; i < 100; i++) {
        const particle = generateParticle();
        ids.add(particle.id);
      }
      expect(ids.size).toBe(100);
    });
  });

  describe('generateConfetti', () => {
    it('should generate requested number of particles', () => {
      const particles = generateConfetti(10);
      expect(particles).toHaveLength(10);
    });

    it('should return empty array when count is 0', () => {
      const particles = generateConfetti(0);
      expect(particles).toHaveLength(0);
    });

    it('should throw error for negative count', () => {
      expect(() => generateConfetti(-1)).toThrow('Count must be a non-negative number');
    });

    it('should generate particles at specified position', () => {
      const particles = generateConfetti(5, 150, 250);
      particles.forEach(particle => {
        expect(particle.x).toBe(150);
        expect(particle.y).toBe(250);
      });
    });

    it('should generate particles at default position (0, 0)', () => {
      const particles = generateConfetti(5);
      particles.forEach(particle => {
        expect(particle.x).toBe(0);
        expect(particle.y).toBe(0);
      });
    });

    it('should return array of ConfettiParticle objects', () => {
      const particles = generateConfetti(3);
      particles.forEach(particle => {
        expect(particle).toHaveProperty('id');
        expect(particle).toHaveProperty('x');
        expect(particle).toHaveProperty('y');
        expect(particle).toHaveProperty('vx');
        expect(particle).toHaveProperty('vy');
        expect(particle).toHaveProperty('color');
        expect(particle).toHaveProperty('size');
        expect(particle).toHaveProperty('rotation');
      });
    });

    it('should generate particles with varying properties', () => {
      const particles = generateConfetti(50);
      
      // Check that not all particles have the same velocity
      const vxValues = particles.map(p => p.vx);
      const vyValues = particles.map(p => p.vy);
      const sizes = particles.map(p => p.size);
      const rotations = particles.map(p => p.rotation);
      
      expect(new Set(vxValues).size).toBeGreaterThan(1);
      expect(new Set(vyValues).size).toBeGreaterThan(1);
      expect(new Set(sizes).size).toBeGreaterThan(1);
      expect(new Set(rotations).size).toBeGreaterThan(1);
    });
  });
});
