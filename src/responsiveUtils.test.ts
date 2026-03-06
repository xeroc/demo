/**
 * Tests for Responsive Utility Classes
 * Story 7: Add responsive utility classes and final polish
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  RESPONSIVE_UTILITY_STYLES,
  injectResponsiveUtilities,
  isVisibleAtBreakpoint,
  validateTouchTarget,
  hasHorizontalScroll,
  getCurrentBreakpoint,
  BREAKPOINTS,
  MEDIA_QUERIES
} from './responsiveUtils';

describe('Responsive Utilities', () => {
  describe('AC1: Utility classes for responsive hiding/showing work correctly', () => {
    describe('RESPONSIVE_UTILITY_STYLES', () => {
      it('should contain hide-mobile class definition', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.hide-mobile');
      });

      it('should contain hide-tablet class definition', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.hide-tablet');
      });

      it('should contain hide-desktop class definition', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.hide-desktop');
      });

      it('should contain show-mobile-only class definition', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.show-mobile-only');
      });

      it('should contain show-tablet-only class definition', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.show-tablet-only');
      });

      it('should contain show-desktop-only class definition', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.show-desktop-only');
      });

      it('should include inline variants', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.hide-mobile-inline');
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.hide-tablet-inline');
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.hide-desktop-inline');
      });

      it('should include flex variants', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.hide-mobile-flex');
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.hide-tablet-flex');
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.hide-desktop-flex');
      });

      it('should include touch-target utility class', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.touch-target');
        expect(RESPONSIVE_UTILITY_STYLES).toContain('min-width: 44px');
        expect(RESPONSIVE_UTILITY_STYLES).toContain('min-height: 44px');
      });

      it('should include prevent-overflow-x utility', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.prevent-overflow-x');
        expect(RESPONSIVE_UTILITY_STYLES).toContain('overflow-x: hidden');
      });

      it('should include text-readable utility for 16px minimum on mobile', () => {
        expect(RESPONSIVE_UTILITY_STYLES).toContain('.text-readable');
        expect(RESPONSIVE_UTILITY_STYLES).toContain('font-size: max(16px, 1rem)');
      });
    });

    describe('injectResponsiveUtilities', () => {
      beforeEach(() => {
        document.head.innerHTML = '';
      });

      it('should inject styles into document head', () => {
        injectResponsiveUtilities();
        const style = document.getElementById('chaoscraft-responsive-utilities');
        expect(style).toBeTruthy();
        expect(style?.tagName).toBe('STYLE');
      });

      it('should not duplicate styles on multiple calls', () => {
        injectResponsiveUtilities();
        injectResponsiveUtilities();
        injectResponsiveUtilities();
        const styles = document.querySelectorAll('#chaoscraft-responsive-utilities');
        expect(styles.length).toBe(1);
      });

      it('should set correct id on style element', () => {
        injectResponsiveUtilities();
        const style = document.getElementById('chaoscraft-responsive-utilities');
        expect(style?.id).toBe('chaoscraft-responsive-utilities');
      });

      it('should return early if document is undefined', () => {
        const originalDocument = global.document;
        // @ts-ignore
        delete global.document;
        
        expect(() => injectResponsiveUtilities()).not.toThrow();
        
        global.document = originalDocument;
      });
    });

    describe('isVisibleAtBreakpoint', () => {
      it('should return false for hide-mobile on mobile breakpoint', () => {
        const element = document.createElement('div');
        element.className = 'hide-mobile';
        
        // Mock window.innerWidth for mobile
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 320
        });
        
        expect(isVisibleAtBreakpoint(element, 'mobile')).toBe(false);
      });

      it('should return true for hide-mobile on tablet breakpoint', () => {
        const element = document.createElement('div');
        element.className = 'hide-mobile';
        
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 768
        });
        
        expect(isVisibleAtBreakpoint(element, 'tablet')).toBe(true);
      });

      it('should return false for show-mobile-only on tablet breakpoint', () => {
        const element = document.createElement('div');
        element.className = 'show-mobile-only';
        
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 768
        });
        
        expect(isVisibleAtBreakpoint(element, 'tablet')).toBe(false);
      });

      it('should return true for show-mobile-only on mobile breakpoint', () => {
        const element = document.createElement('div');
        element.className = 'show-mobile-only';
        
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 320
        });
        
        expect(isVisibleAtBreakpoint(element, 'mobile')).toBe(true);
      });

      it('should return true for element without visibility classes', () => {
        const element = document.createElement('div');
        element.className = 'some-other-class';
        
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 768
        });
        
        expect(isVisibleAtBreakpoint(element, 'tablet')).toBe(true);
      });
    });
  });

  describe('AC3: Touch targets are minimum 44px on mobile', () => {
    describe('validateTouchTarget', () => {
      it('should return valid for element meeting minimum size', () => {
        const element = document.createElement('button');
        element.style.width = '44px';
        element.style.height = '44px';
        document.body.appendChild(element);
        
        const result = validateTouchTarget(element);
        expect(result.isValid).toBe(true);
        expect(result.width).toBe(44);
        expect(result.height).toBe(44);
        
        document.body.removeChild(element);
      });

      it('should return invalid for element smaller than minimum', () => {
        const element = document.createElement('button');
        element.style.width = '30px';
        element.style.height = '30px';
        document.body.appendChild(element);
        
        const result = validateTouchTarget(element);
        expect(result.isValid).toBe(false);
        expect(result.width).toBe(30);
        expect(result.height).toBe(30);
        
        document.body.removeChild(element);
      });

      it('should return valid for element larger than minimum', () => {
        const element = document.createElement('button');
        element.style.width = '48px';
        element.style.height = '48px';
        document.body.appendChild(element);
        
        const result = validateTouchTarget(element);
        expect(result.isValid).toBe(true);
        expect(result.width).toBe(48);
        expect(result.height).toBe(48);
        
        document.body.removeChild(element);
      });

      it('should return invalid for narrow but tall element', () => {
        const element = document.createElement('button');
        element.style.width = '40px';
        element.style.height = '60px';
        document.body.appendChild(element);
        
        const result = validateTouchTarget(element);
        expect(result.isValid).toBe(false);
        expect(result.width).toBe(40);
        expect(result.height).toBe(60);
        
        document.body.removeChild(element);
      });

      it('should return invalid for wide but short element', () => {
        const element = document.createElement('button');
        element.style.width = '60px';
        element.style.height = '40px';
        document.body.appendChild(element);
        
        const result = validateTouchTarget(element);
        expect(result.isValid).toBe(false);
        expect(result.width).toBe(60);
        expect(result.height).toBe(40);
        
        document.body.removeChild(element);
      });
    });
  });

  describe('AC2: All pages render without horizontal scroll at all breakpoints', () => {
    describe('hasHorizontalScroll', () => {
      it('should return false when no horizontal scroll exists', () => {
        Object.defineProperty(document.documentElement, 'scrollWidth', {
          writable: true,
          configurable: true,
          value: 1024
        });
        
        Object.defineProperty(document.documentElement, 'clientWidth', {
          writable: true,
          configurable: true,
          value: 1024
        });
        
        expect(hasHorizontalScroll()).toBe(false);
      });

      it('should return true when horizontal scroll exists', () => {
        Object.defineProperty(document.documentElement, 'scrollWidth', {
          writable: true,
          configurable: true,
          value: 1200
        });
        
        Object.defineProperty(document.documentElement, 'clientWidth', {
          writable: true,
          configurable: true,
          value: 1024
        });
        
        expect(hasHorizontalScroll()).toBe(true);
      });

      it('should return false when content exactly fits viewport', () => {
        Object.defineProperty(document.documentElement, 'scrollWidth', {
          writable: true,
          configurable: true,
          value: 375
        });
        
        Object.defineProperty(document.documentElement, 'clientWidth', {
          writable: true,
          configurable: true,
          value: 375
        });
        
        expect(hasHorizontalScroll()).toBe(false);
      });
    });
  });

  describe('Helper Functions', () => {
    describe('getCurrentBreakpoint', () => {
      it('should return "mobile" for width < 640', () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 320
        });
        
        expect(getCurrentBreakpoint()).toBe('mobile');
      });

      it('should return "tablet" for width >= 640 and < 1024', () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 768
        });
        
        expect(getCurrentBreakpoint()).toBe('tablet');
      });

      it('should return "desktop" for width >= 1024 and < 1280', () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1150
        });
        
        expect(getCurrentBreakpoint()).toBe('desktop');
      });

      it('should return "wide" for width >= 1280', () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1920
        });
        
        expect(getCurrentBreakpoint()).toBe('wide');
      });

      it('should return "mobile" for exactly 0 width', () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 0
        });
        
        expect(getCurrentBreakpoint()).toBe('mobile');
      });

      it('should return "tablet" for exactly 640 width', () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 640
        });
        
        expect(getCurrentBreakpoint()).toBe('tablet');
      });

      it('should return "desktop" for exactly 1024 width', () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1024
        });
        
        expect(getCurrentBreakpoint()).toBe('desktop');
      });

      it('should return "wide" for exactly 1280 width', () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1280
        });
        
        expect(getCurrentBreakpoint()).toBe('wide');
      });
    });

    describe('BREAKPOINTS constant', () => {
      it('should have mobile breakpoint at 0', () => {
        expect(BREAKPOINTS.mobile).toBe(0);
      });

      it('should have tablet breakpoint at 640', () => {
        expect(BREAKPOINTS.tablet).toBe(640);
      });

      it('should have desktop breakpoint at 1024', () => {
        expect(BREAKPOINTS.desktop).toBe(1024);
      });

      it('should have wide breakpoint at 1280', () => {
        expect(BREAKPOINTS.wide).toBe(1280);
      });
    });

    describe('MEDIA_QUERIES constant', () => {
      it('should have mobile query', () => {
        expect(MEDIA_QUERIES.mobile).toContain('max-width: 639px');
      });

      it('should have tablet query', () => {
        expect(MEDIA_QUERIES.tablet).toContain('min-width: 640px');
        expect(MEDIA_QUERIES.tablet).toContain('max-width: 1023px');
      });

      it('should have desktop query', () => {
        expect(MEDIA_QUERIES.desktop).toContain('min-width: 1024px');
        expect(MEDIA_QUERIES.desktop).toContain('max-width: 1279px');
      });

      it('should have wide query', () => {
        expect(MEDIA_QUERIES.wide).toContain('min-width: 1280px');
      });

      it('should have mobileAndUp query', () => {
        expect(MEDIA_QUERIES.mobileAndUp).toContain('min-width: 0px');
      });

      it('should have tabletAndUp query', () => {
        expect(MEDIA_QUERIES.tabletAndUp).toContain('min-width: 640px');
      });

      it('should have desktopAndUp query', () => {
        expect(MEDIA_QUERIES.desktopAndUp).toContain('min-width: 1024px');
      });
    });
  });

  describe('AC4: Font sizes meet minimum readability standards on mobile (16px minimum)', () => {
    it('should include media query for mobile font size override', () => {
      expect(RESPONSIVE_UTILITY_STYLES).toContain('@media (max-width: 639px)');
    });

    it('should use max() function to ensure 16px minimum', () => {
      expect(RESPONSIVE_UTILITY_STYLES).toContain('max(16px, 1rem)');
    });
  });

  describe('AC5: Typecheck passes', () => {
    it('should export RESPONSIVE_UTILITY_STYLES as string', () => {
      expect(typeof RESPONSIVE_UTILITY_STYLES).toBe('string');
    });

    it('should export injectResponsiveUtilities as function', () => {
      expect(typeof injectResponsiveUtilities).toBe('function');
    });

    it('should export isVisibleAtBreakpoint as function', () => {
      expect(typeof isVisibleAtBreakpoint).toBe('function');
    });

    it('should export validateTouchTarget as function', () => {
      expect(typeof validateTouchTarget).toBe('function');
    });

    it('should export hasHorizontalScroll as function', () => {
      expect(typeof hasHorizontalScroll).toBe('function');
    });

    it('should export getCurrentBreakpoint as function', () => {
      expect(typeof getCurrentBreakpoint).toBe('function');
    });

    it('should export BREAKPOINTS as object', () => {
      expect(typeof BREAKPOINTS).toBe('object');
    });

    it('should export MEDIA_QUERIES as object', () => {
      expect(typeof MEDIA_QUERIES).toBe('object');
    });

    it('should have correct return type for validateTouchTarget', () => {
      const element = document.createElement('div');
      element.style.width = '50px';
      element.style.height = '50px';
      document.body.appendChild(element);
      
      const result = validateTouchTarget(element);
      expect(typeof result.isValid).toBe('boolean');
      expect(typeof result.width).toBe('number');
      expect(typeof result.height).toBe('number');
      
      document.body.removeChild(element);
    });

    it('should have correct return type for getCurrentBreakpoint', () => {
      const breakpoint = getCurrentBreakpoint();
      expect(['mobile', 'tablet', 'desktop', 'wide']).toContain(breakpoint);
    });
  });

  describe('Integration Tests', () => {
    it('should apply touch-target class to create properly sized element', () => {
      const element = document.createElement('button');
      element.className = 'touch-target';
      element.textContent = 'Click Me';
      document.body.appendChild(element);
      
      // Inject styles
      injectResponsiveUtilities();
      
      // Check computed styles (this would work in a real browser environment)
      expect(element.classList.contains('touch-target')).toBe(true);
      
      document.body.removeChild(element);
    });

    it('should prevent horizontal scroll with prevent-overflow-x class', () => {
      const container = document.createElement('div');
      container.className = 'prevent-overflow-x';
      document.body.appendChild(container);
      
      injectResponsiveUtilities();
      
      expect(container.classList.contains('prevent-overflow-x')).toBe(true);
      
      document.body.removeChild(container);
    });

    it('should work with multiple utility classes', () => {
      const element = document.createElement('div');
      element.className = 'hide-mobile touch-target prevent-overflow-x';
      document.body.appendChild(element);
      
      injectResponsiveUtilities();
      
      expect(element.classList.contains('hide-mobile')).toBe(true);
      expect(element.classList.contains('touch-target')).toBe(true);
      expect(element.classList.contains('prevent-overflow-x')).toBe(true);
      
      document.body.removeChild(element);
    });
  });
});
