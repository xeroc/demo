import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  splitHeadingLetters,
  generateLetterConfetti,
  explodeHeading,
  cleanupExplosion,
  canExplode,
  LetterInfo,
  SplitHeadingResult
} from './explosionLogic';
import { ConfettiParticle } from './confetti';

describe('explosionLogic utilities', () => {
  describe('splitHeadingLetters', () => {
    let mockElement: HTMLElement;

    beforeEach(() => {
      mockElement = document.createElement('h1');
      mockElement.textContent = 'Hello';
      mockElement.style.fontSize = '16px';
      mockElement.style.fontFamily = 'Arial';
      document.body.appendChild(mockElement);
      
      // Mock getBoundingClientRect
      mockElement.getBoundingClientRect = vi.fn(() => ({
        left: 100,
        top: 50,
        right: 200,
        bottom: 70,
        width: 100,
        height: 20,
        x: 100,
        y: 50,
        toJSON: () => ({})
      } as DOMRect));

      // Mock getComputedStyle
      vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
        fontSize: '16px',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '20px',
        paddingLeft: '0px',
        paddingTop: '0px',
        borderLeftWidth: '0px',
        borderTopWidth: '0px'
      } as CSSStyleDeclaration));
    });

    afterEach(() => {
      document.body.removeChild(mockElement);
      vi.restoreAllMocks();
    });

    it('should return array of letter objects with text and position', () => {
      const result = splitHeadingLetters(mockElement);
      
      expect(result).toHaveProperty('letters');
      expect(result).toHaveProperty('originalText');
      expect(Array.isArray(result.letters)).toBe(true);
    });

    it('should extract individual letters', () => {
      const { letters } = splitHeadingLetters(mockElement);
      
      expect(letters.length).toBe(5); // 'Hello' has 5 letters
      expect(letters.map(l => l.text).join('')).toBe('Hello');
    });

    it('should return letters with x, y positions', () => {
      const { letters } = splitHeadingLetters(mockElement);
      
      letters.forEach(letter => {
        expect(letter).toHaveProperty('text');
        expect(letter).toHaveProperty('position');
        expect(letter.position).toHaveProperty('x');
        expect(letter.position).toHaveProperty('y');
        expect(typeof letter.position.x).toBe('number');
        expect(typeof letter.position.y).toBe('number');
      });
    });

    it('should handle empty heading', () => {
      mockElement.textContent = '';
      const { letters, originalText } = splitHeadingLetters(mockElement);
      
      expect(letters).toHaveLength(0);
      expect(originalText).toBe('');
    });

    it('should handle whitespace-only heading', () => {
      mockElement.textContent = '   ';
      const { letters, originalText } = splitHeadingLetters(mockElement);
      
      // Whitespace-only is treated as empty (trim check)
      expect(letters).toHaveLength(0);
      expect(originalText).toBe('');
    });

    it('should handle special characters', () => {
      mockElement.textContent = '!@#$%';
      const { letters, originalText } = splitHeadingLetters(mockElement);
      
      expect(letters.length).toBe(5);
      expect(originalText).toBe('!@#$%');
    });

    it('should handle numbers', () => {
      mockElement.textContent = '12345';
      const { letters, originalText } = splitHeadingLetters(mockElement);
      
      expect(letters.length).toBe(5);
      expect(originalText).toBe('12345');
    });

    it('should handle mixed content (letters, numbers, special chars)', () => {
      mockElement.textContent = 'Hi123!';
      const { letters, originalText } = splitHeadingLetters(mockElement);
      
      expect(letters.length).toBe(6);
      expect(originalText).toBe('Hi123!');
    });

    it('should return original text', () => {
      const { originalText } = splitHeadingLetters(mockElement);
      expect(originalText).toBe('Hello');
    });

    it('should calculate positions based on element dimensions', () => {
      const { letters } = splitHeadingLetters(mockElement);
      
      // All letters should have valid numeric positions
      letters.forEach(letter => {
        expect(letter.position.x).not.toBeNaN();
        expect(letter.position.y).not.toBeNaN();
      });
    });

    it('should increment x position for each letter', () => {
      const { letters } = splitHeadingLetters(mockElement);
      
      // Each subsequent letter should have a greater x position
      for (let i = 1; i < letters.length; i++) {
        expect(letters[i].position.x).toBeGreaterThan(letters[i - 1].position.x);
      }
    });
  });

  describe('generateLetterConfetti', () => {
    it('should create confetti particles at letter position', () => {
      const letter = 'A';
      const position = { x: 100, y: 200 };
      const particles = generateLetterConfetti(letter, position);
      
      expect(Array.isArray(particles)).toBe(true);
      expect(particles.length).toBeGreaterThan(0);
    });

    it('should create particles with specified count', () => {
      const particles = generateLetterConfetti('A', { x: 0, y: 0 }, undefined, 10);
      expect(particles).toHaveLength(10);
    });

    it('should use default particle count of 5', () => {
      const particles = generateLetterConfetti('A', { x: 0, y: 0 });
      expect(particles).toHaveLength(5);
    });

    it('should position particles at specified location', () => {
      const position = { x: 150, y: 250 };
      const particles = generateLetterConfetti('A', position);
      
      particles.forEach(particle => {
        expect(particle.x).toBe(150);
        expect(particle.y).toBe(250);
      });
    });

    it('should create particles with specified color', () => {
      const color = '#FF0000';
      const particles = generateLetterConfetti('A', { x: 0, y: 0 }, color);
      
      particles.forEach(particle => {
        expect(particle.color).toBe('#FF0000');
      });
    });

    it('should create particles with random colors when no color specified', () => {
      const particles = generateLetterConfetti('A', { x: 0, y: 0 }, undefined, 10);
      
      particles.forEach(particle => {
        expect(particle.color).toMatch(/^#[0-9A-F]{6}$/);
      });
    });

    it('should return empty array for empty letter', () => {
      const particles = generateLetterConfetti('', { x: 0, y: 0 });
      expect(particles).toHaveLength(0);
    });

    it('should return empty array for whitespace-only letter', () => {
      const particles = generateLetterConfetti('   ', { x: 0, y: 0 });
      expect(particles).toHaveLength(0);
    });

    it('should return valid ConfettiParticle objects', () => {
      const particles = generateLetterConfetti('A', { x: 0, y: 0 });
      
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
  });

  describe('explodeHeading', () => {
    let mockElement: HTMLElement;

    beforeEach(() => {
      mockElement = document.createElement('h1');
      mockElement.textContent = 'Test';
      mockElement.style.fontSize = '16px';
      mockElement.style.fontFamily = 'Arial';
      document.body.appendChild(mockElement);
      
      mockElement.getBoundingClientRect = vi.fn(() => ({
        left: 100,
        top: 50,
        right: 200,
        bottom: 70,
        width: 100,
        height: 20,
        x: 100,
        y: 50,
        toJSON: () => ({})
      } as DOMRect));

      vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
        fontSize: '16px',
        fontFamily: 'Arial',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '20px',
        paddingLeft: '0px',
        paddingTop: '0px',
        borderLeftWidth: '0px',
        borderTopWidth: '0px'
      } as CSSStyleDeclaration));
    });

    afterEach(() => {
      document.body.removeChild(mockElement);
      vi.restoreAllMocks();
    });

    it('should create explosion effect for all letters', () => {
      const particles = explodeHeading(mockElement);
      
      expect(Array.isArray(particles)).toBe(true);
      expect(particles.length).toBeGreaterThan(0);
    });

    it('should create particles for each letter in heading', () => {
      const particles = explodeHeading(mockElement, { particleCount: 2 });
      
      // 'Test' has 4 letters, each should generate 2 particles
      expect(particles.length).toBe(8);
    });

    it('should use default particle count of 3 per letter', () => {
      const particles = explodeHeading(mockElement);
      
      // 'Test' has 4 letters, default 3 particles each = 12
      expect(particles.length).toBe(12);
    });

    it('should apply custom color to all particles', () => {
      const particles = explodeHeading(mockElement, { color: '#00FF00' });
      
      particles.forEach(particle => {
        expect(particle.color).toBe('#00FF00');
      });
    });

    it('should return empty array for empty element', () => {
      mockElement.textContent = '';
      const particles = explodeHeading(mockElement);
      
      expect(particles).toHaveLength(0);
    });
  });

  describe('cleanupExplosion', () => {
    it('should be a callable function', () => {
      expect(typeof cleanupExplosion).toBe('function');
    });

    it('should not throw when called', () => {
      expect(() => cleanupExplosion()).not.toThrow();
    });
  });

  describe('canExplode', () => {
    it('should return false for null element', () => {
      expect(canExplode(null)).toBe(false);
    });

    it('should return false for undefined element', () => {
      expect(canExplode(undefined as any)).toBe(false);
    });

    it('should return false for empty element', () => {
      const element = document.createElement('div');
      element.textContent = '';
      expect(canExplode(element)).toBe(false);
    });

    it('should return false for whitespace-only element', () => {
      const element = document.createElement('div');
      element.textContent = '   ';
      expect(canExplode(element)).toBe(false);
    });

    it('should return true for element with text', () => {
      const element = document.createElement('div');
      element.textContent = 'Hello';
      expect(canExplode(element)).toBe(true);
    });

    it('should return true for element with numbers', () => {
      const element = document.createElement('div');
      element.textContent = '123';
      expect(canExplode(element)).toBe(true);
    });

    it('should return true for element with special characters', () => {
      const element = document.createElement('div');
      element.textContent = '!@#';
      expect(canExplode(element)).toBe(true);
    });
  });

  describe('TypeScript interfaces', () => {
    it('LetterInfo should have correct structure', () => {
      const letterInfo: LetterInfo = {
        text: 'A',
        position: { x: 100, y: 200 }
      };
      
      expect(letterInfo.text).toBe('A');
      expect(letterInfo.position.x).toBe(100);
      expect(letterInfo.position.y).toBe(200);
    });

    it('SplitHeadingResult should have correct structure', () => {
      const result: SplitHeadingResult = {
        letters: [{ text: 'A', position: { x: 0, y: 0 } }],
        originalText: 'A'
      };
      
      expect(Array.isArray(result.letters)).toBe(true);
      expect(typeof result.originalText).toBe('string');
    });
  });
});
