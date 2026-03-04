/**
 * Tests for animated background initialization
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  initAnimatedBackground, 
  DEFAULT_CONFIG,
  getActiveBackgroundComponent,
  cleanupAnimatedBackground
} from './index';
import type { GradientConfig } from './index';

describe('Animated Background', () => {
  beforeEach(() => {
    // Clean up before each test
    cleanupAnimatedBackground();
    // Reset visibility state
    Object.defineProperty(document, 'hidden', {
      writable: true,
      value: false
    });
  });

  afterEach(() => {
    cleanupAnimatedBackground();
  });

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

    it('should create and mount background component', () => {
      initAnimatedBackground();
      const component = getActiveBackgroundComponent();
      expect(component).not.toBeNull();
      expect(component?.getIsMounted()).toBe(true);
    });

    it('should clean up existing component when initializing new one', () => {
      initAnimatedBackground({ colors: ['#ff0000'], duration: 1000, angle: 0 });
      const first = getActiveBackgroundComponent();
      initAnimatedBackground({ colors: ['#00ff00'], duration: 2000, angle: 90 });
      const second = getActiveBackgroundComponent();
      expect(first).not.toBe(second);
    });

    it('should convert duration to speed correctly', () => {
      initAnimatedBackground({ duration: 2000, angle: 0, colors: ['#fff'] });
      const component = getActiveBackgroundComponent();
      expect(component).not.toBeNull();
      const config = component?.getConfig();
      expect(config?.speed).toBe(100);
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

  describe('getActiveBackgroundComponent', () => {
    it('should return null when no background is initialized', () => {
      expect(getActiveBackgroundComponent()).toBeNull();
    });

    it('should return active component after initialization', () => {
      initAnimatedBackground();
      expect(getActiveBackgroundComponent()).not.toBeNull();
    });

    it('should return null after cleanup', () => {
      initAnimatedBackground();
      cleanupAnimatedBackground();
      expect(getActiveBackgroundComponent()).toBeNull();
    });
  });

  describe('cleanupAnimatedBackground', () => {
    it('should not throw when called without initialization', () => {
      expect(() => cleanupAnimatedBackground()).not.toThrow();
    });

    it('should unmount active component', () => {
      initAnimatedBackground();
      const component = getActiveBackgroundComponent();
      cleanupAnimatedBackground();
      expect(component?.getIsMounted()).toBe(false);
    });
  });

  describe('Page Visibility API Integration', () => {
    it('should set up visibilitychange event listener on init', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      initAnimatedBackground();
      expect(addEventListenerSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
      addEventListenerSpy.mockRestore();
    });

    it('should remove visibilitychange event listener on cleanup', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      initAnimatedBackground();
      cleanupAnimatedBackground();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it('should stop animation when page becomes hidden', () => {
      initAnimatedBackground();
      const component = getActiveBackgroundComponent();
      const animator = component?.getAnimator();
      
      // Verify animation is running
      expect(animator?.getIsRunning()).toBe(true);
      
      // Simulate page becoming hidden
      Object.defineProperty(document, 'hidden', { writable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
      
      // Animation should be paused
      expect(animator?.getIsRunning()).toBe(false);
    });

    it('should resume animation when page becomes visible', () => {
      initAnimatedBackground();
      const component = getActiveBackgroundComponent();
      const animator = component?.getAnimator();
      
      // First hide the page
      Object.defineProperty(document, 'hidden', { writable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
      expect(animator?.getIsRunning()).toBe(false);
      
      // Then show the page
      Object.defineProperty(document, 'hidden', { writable: true, value: false });
      document.dispatchEvent(new Event('visibilitychange'));
      
      // Animation should be resumed
      expect(animator?.getIsRunning()).toBe(true);
    });

    it('should handle visibility change when no component exists', () => {
      // No component initialized
      expect(() => {
        Object.defineProperty(document, 'hidden', { writable: true, value: true });
        document.dispatchEvent(new Event('visibilitychange'));
      }).not.toThrow();
    });

    it('should not throw errors during visibility transitions', () => {
      initAnimatedBackground();
      
      expect(() => {
        // Multiple visibility changes
        Object.defineProperty(document, 'hidden', { writable: true, value: true });
        document.dispatchEvent(new Event('visibilitychange'));
        
        Object.defineProperty(document, 'hidden', { writable: true, value: false });
        document.dispatchEvent(new Event('visibilitychange'));
        
        Object.defineProperty(document, 'hidden', { writable: true, value: true });
        document.dispatchEvent(new Event('visibilitychange'));
      }).not.toThrow();
    });

    it('should properly re-initialize event listeners on multiple inits', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      
      initAnimatedBackground();
      initAnimatedBackground();
      initAnimatedBackground();
      
      // Should add listener 3 times (once per init)
      expect(addEventListenerSpy).toHaveBeenCalledTimes(3);
      // Should remove listener 3 times (once per re-init before adding new one)
      expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
      
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Integration with BackgroundComponent', () => {
    it('should pass config colors to background component', () => {
      const customColors = ['#aabbcc', '#112233', '#445566'];
      initAnimatedBackground({ colors: customColors, duration: 3000, angle: 45 });
      const component = getActiveBackgroundComponent();
      const config = component?.getConfig();
      expect(config?.colors).toEqual(customColors);
    });

    it('should pass config angle to background component', () => {
      const customAngle = 123;
      initAnimatedBackground({ angle: customAngle, duration: 3000, colors: ['#fff'] });
      const component = getActiveBackgroundComponent();
      const config = component?.getConfig();
      expect(config?.angle).toBe(customAngle);
    });

    it('should start animation on initialization', () => {
      initAnimatedBackground();
      const component = getActiveBackgroundComponent();
      const animator = component?.getAnimator();
      expect(animator?.getIsRunning()).toBe(true);
    });

    it('should apply gradient to document.body by default', () => {
      initAnimatedBackground();
      // Give animation a tick to apply gradient
      const bgStyle = document.body.style.background;
      expect(bgStyle).toContain('conic-gradient');
    });
  });
});
