/**
 * Tests for Entrance Animations Utility
 */

import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import {
  prefersReducedMotion,
  applyEntranceAnimation,
  registerEntranceAnimation,
  registerEntranceAnimationsBatch,
  animateMainContentSections,
  cleanupEntranceAnimations,
  DEFAULT_ENTRANCE_CONFIG
} from './entranceAnimations';

describe('Entrance Animations', () => {
  let testElement: HTMLElement;
  let originalMatchMedia: any;
  let originalIntersectionObserver: any;

  beforeAll(() => {
    // Save originals
    originalMatchMedia = window.matchMedia;
    originalIntersectionObserver = window.IntersectionObserver;
  });

  afterAll(() => {
    // Restore originals
    window.matchMedia = originalMatchMedia;
    window.IntersectionObserver = originalIntersectionObserver;
  });

  beforeEach(() => {
    // Mock IntersectionObserver
    const MockIntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      root: null,
      rootMargin: '',
      thresholds: []
    }));
    
    window.IntersectionObserver = MockIntersectionObserver as any;
    
    // Mock matchMedia
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    
    // Create test element
    testElement = document.createElement('div');
    testElement.id = 'test-element';
    document.body.appendChild(testElement);
    
    // Reset observer
    cleanupEntranceAnimations();
  });

  afterEach(() => {
    // Cleanup
    if (testElement && testElement.parentNode) {
      testElement.parentNode.removeChild(testElement);
    }
    cleanupEntranceAnimations();
  });

  describe('prefersReducedMotion', () => {
    it('should return true when user prefers reduced motion', () => {
      (window.matchMedia as any).mockReturnValue({ matches: true });
      
      expect(prefersReducedMotion()).toBe(true);
    });

    it('should return false when user does not prefer reduced motion', () => {
      (window.matchMedia as any).mockReturnValue({ matches: false });
      
      expect(prefersReducedMotion()).toBe(false);
    });
  });

  describe('applyEntranceAnimation', () => {
    it('should apply initial hidden state', () => {
      applyEntranceAnimation(testElement);
      
      expect(testElement.style.opacity).toBe('0');
      expect(testElement.style.transform).toContain('translateY');
    });

    it('should respect custom direction', () => {
      applyEntranceAnimation(testElement, { direction: 'left' });
      
      expect(testElement.style.transform).toContain('translateX');
    });

    it('should respect direction "none"', () => {
      applyEntranceAnimation(testElement, { direction: 'none' });
      
      expect(testElement.style.transform).toBe('none');
    });

    it('should apply custom distance', () => {
      const distance = 50;
      applyEntranceAnimation(testElement, { direction: 'up', distance });
      
      expect(testElement.style.transform).toBe(`translateY(${distance}px)`);
    });

    it('should set transition with custom duration', () => {
      const duration = 800;
      applyEntranceAnimation(testElement, { duration });
      
      expect(testElement.style.transition).toContain(`${duration}ms`);
    });

    it('should set transition with custom delay', () => {
      const delay = 200;
      applyEntranceAnimation(testElement, { delay });
      
      expect(testElement.style.transition).toContain(`${delay}ms`);
    });

    it('should set transition with custom easing', () => {
      const easing = 'ease-in-out';
      applyEntranceAnimation(testElement, { easing });
      
      expect(testElement.style.transition).toContain(easing);
    });

    it('should skip animation when user prefers reduced motion', () => {
      (window.matchMedia as any).mockReturnValue({ matches: true });
      
      applyEntranceAnimation(testElement);
      
      expect(testElement.style.opacity).toBe('1');
      expect(testElement.style.transform).toBe('none');
    });
  });

  describe('registerEntranceAnimation', () => {
    it('should register element with IntersectionObserver', () => {
      registerEntranceAnimation(testElement);
      
      expect(testElement.style.opacity).toBe('0');
    });

    it('should store config on element', () => {
      const config = { direction: 'left' as const, delay: 100 };
      registerEntranceAnimation(testElement, config);
      
      expect((testElement as any).__entranceConfig).toBeDefined();
      expect((testElement as any).__entranceConfig.direction).toBe('left');
    });

    it('should merge with default config', () => {
      registerEntranceAnimation(testElement, { delay: 100 });
      
      const storedConfig = (testElement as any).__entranceConfig;
      expect(storedConfig.delay).toBe(100);
      expect(storedConfig.duration).toBe(DEFAULT_ENTRANCE_CONFIG.duration);
    });

    it('should skip registration when user prefers reduced motion', () => {
      (window.matchMedia as any).mockReturnValue({ matches: true });
      
      registerEntranceAnimation(testElement);
      
      expect(testElement.style.opacity).toBe('1');
      expect((testElement as any).__entranceConfig).toBeUndefined();
    });
  });

  describe('registerEntranceAnimationsBatch', () => {
    it('should register multiple elements with staggered delays', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      const element3 = document.createElement('div');
      
      document.body.appendChild(element1);
      document.body.appendChild(element2);
      document.body.appendChild(element3);
      
      registerEntranceAnimationsBatch([
        { element: element1, config: { direction: 'up' } },
        { element: element2, config: { direction: 'up' } },
        { element: element3, config: { direction: 'up' } }
      ]);
      
      const config1 = (element1 as any).__entranceConfig;
      const config2 = (element2 as any).__entranceConfig;
      const config3 = (element3 as any).__entranceConfig;
      
      expect(config1.delay).toBe(0);
      expect(config2.delay).toBe(100);
      expect(config3.delay).toBe(200);
      
      // Cleanup
      element1.remove();
      element2.remove();
      element3.remove();
    });

    it('should respect custom delays in batch', () => {
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');
      
      document.body.appendChild(element1);
      document.body.appendChild(element2);
      
      registerEntranceAnimationsBatch([
        { element: element1, config: { delay: 50 } },
        { element: element2, config: { delay: 100 } }
      ]);
      
      const config1 = (element1 as any).__entranceConfig;
      const config2 = (element2 as any).__entranceConfig;
      
      expect(config1.delay).toBe(50);
      expect(config2.delay).toBe(200); // 100 + 100 stagger
      
      // Cleanup
      element1.remove();
      element2.remove();
    });
  });

  describe('animateMainContentSections', () => {
    it('should animate banner if present', () => {
      const banner = document.createElement('div');
      banner.id = 'chaoscraft-banner';
      document.body.appendChild(banner);
      
      animateMainContentSections();
      
      expect((banner as any).__entranceConfig).toBeDefined();
      expect((banner as any).__entranceConfig.direction).toBe('down');
      
      banner.remove();
    });

    it('should animate robot container if present', () => {
      const robot = document.createElement('div');
      robot.id = 'robot-container';
      document.body.appendChild(robot);
      
      animateMainContentSections();
      
      expect((robot as any).__entranceConfig).toBeDefined();
      expect((robot as any).__entranceConfig.direction).toBe('up');
      
      robot.remove();
    });

    it('should animate joke container if present', () => {
      const joke = document.createElement('div');
      joke.id = 'joke-container';
      document.body.appendChild(joke);
      
      animateMainContentSections();
      
      expect((joke as any).__entranceConfig).toBeDefined();
      expect((joke as any).__entranceConfig.direction).toBe('up');
      
      joke.remove();
    });

    it('should animate countries container if present', () => {
      const countries = document.createElement('div');
      countries.id = 'countries-container';
      document.body.appendChild(countries);
      
      animateMainContentSections();
      
      expect((countries as any).__entranceConfig).toBeDefined();
      expect((countries as any).__entranceConfig.direction).toBe('up');
      
      countries.remove();
    });

    it('should animate footer if present', () => {
      const footer = document.createElement('div');
      footer.id = 'chaoscraft-footer';
      document.body.appendChild(footer);
      
      animateMainContentSections();
      
      expect((footer as any).__entranceConfig).toBeDefined();
      expect((footer as any).__entranceConfig.direction).toBe('up');
      
      footer.remove();
    });

    it('should apply staggered delays to sections', () => {
      const banner = document.createElement('div');
      banner.id = 'chaoscraft-banner';
      const robot = document.createElement('div');
      robot.id = 'robot-container';
      const joke = document.createElement('div');
      joke.id = 'joke-container';
      const countries = document.createElement('div');
      countries.id = 'countries-container';
      const footer = document.createElement('div');
      footer.id = 'chaoscraft-footer';
      
      document.body.appendChild(banner);
      document.body.appendChild(robot);
      document.body.appendChild(joke);
      document.body.appendChild(countries);
      document.body.appendChild(footer);
      
      animateMainContentSections();
      
      const bannerConfig = (banner as any).__entranceConfig;
      const robotConfig = (robot as any).__entranceConfig;
      const jokeConfig = (joke as any).__entranceConfig;
      const countriesConfig = (countries as any).__entranceConfig;
      const footerConfig = (footer as any).__entranceConfig;
      
      // Each section should have increasing delay
      expect(bannerConfig.delay).toBe(0);
      expect(robotConfig.delay).toBe(100);
      expect(jokeConfig.delay).toBe(200);
      expect(countriesConfig.delay).toBe(300);
      expect(footerConfig.delay).toBe(400);
      
      // Cleanup
      banner.remove();
      robot.remove();
      joke.remove();
      countries.remove();
      footer.remove();
    });

    it('should not fail when elements are missing', () => {
      // Should not throw when no elements exist
      expect(() => animateMainContentSections()).not.toThrow();
    });
  });

  describe('cleanupEntranceAnimations', () => {
    it('should cleanup observer without errors', () => {
      expect(() => cleanupEntranceAnimations()).not.toThrow();
    });

    it('should allow re-registration after cleanup', () => {
      registerEntranceAnimation(testElement);
      cleanupEntranceAnimations();
      
      // Should not throw on second registration
      expect(() => registerEntranceAnimation(testElement)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should respect prefers-reduced-motion setting', () => {
      (window.matchMedia as any).mockReturnValue({ matches: true });
      
      registerEntranceAnimation(testElement);
      
      // Should immediately show element without animation
      expect(testElement.style.opacity).toBe('1');
      expect(testElement.style.transform).toBe('none');
    });

    it('should animate normally when prefers-reduced-motion is not set', () => {
      (window.matchMedia as any).mockReturnValue({ matches: false });
      
      registerEntranceAnimation(testElement);
      
      // Should start hidden
      expect(testElement.style.opacity).toBe('0');
    });
  });

  describe('Configuration', () => {
    it('should use default configuration values', () => {
      expect(DEFAULT_ENTRANCE_CONFIG.direction).toBe('up');
      expect(DEFAULT_ENTRANCE_CONFIG.delay).toBe(0);
      expect(DEFAULT_ENTRANCE_CONFIG.duration).toBe(600);
      expect(DEFAULT_ENTRANCE_CONFIG.distance).toBe(30);
      expect(DEFAULT_ENTRANCE_CONFIG.threshold).toBe(0.1);
    });

    it('should allow custom direction values', () => {
      const directions: Array<'up' | 'down' | 'left' | 'right' | 'none'> = 
        ['up', 'down', 'left', 'right', 'none'];
      
      directions.forEach(direction => {
        const elem = document.createElement('div');
        document.body.appendChild(elem);
        
        expect(() => applyEntranceAnimation(elem, { direction })).not.toThrow();
        
        elem.remove();
      });
    });
  });
});
