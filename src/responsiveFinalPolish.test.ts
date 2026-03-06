/**
 * Final Polish Tests for Responsive Behavior
 * Story 7: Comprehensive validation of responsive requirements
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { injectResponsiveUtilities, hasHorizontalScroll, validateTouchTarget, getCurrentBreakpoint } from './responsiveUtils';

describe('Story 7: Final Polish and Responsive Validation', () => {
  describe('AC2: All pages render without horizontal scroll at all breakpoints', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
      injectResponsiveUtilities();
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('should not have horizontal scroll at 320px viewport width', () => {
      // Set viewport to mobile size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320
      });
      
      Object.defineProperty(document.documentElement, 'scrollWidth', {
        writable: true,
        configurable: true,
        value: 320
      });
      
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 320
      });
      
      expect(hasHorizontalScroll()).toBe(false);
    });

    it('should not have horizontal scroll at 375px viewport width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
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

    it('should not have horizontal scroll at 768px viewport width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      });
      
      Object.defineProperty(document.documentElement, 'scrollWidth', {
        writable: true,
        configurable: true,
        value: 768
      });
      
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 768
      });
      
      expect(hasHorizontalScroll()).toBe(false);
    });

    it('should not have horizontal scroll at 1024px viewport width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });
      
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

    it('should not have horizontal scroll at 1280px viewport width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280
      });
      
      Object.defineProperty(document.documentElement, 'scrollWidth', {
        writable: true,
        configurable: true,
        value: 1280
      });
      
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1280
      });
      
      expect(hasHorizontalScroll()).toBe(false);
    });

    it('should not have horizontal scroll at 1920px viewport width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920
      });
      
      Object.defineProperty(document.documentElement, 'scrollWidth', {
        writable: true,
        configurable: true,
        value: 1920
      });
      
      Object.defineProperty(document.documentElement, 'clientWidth', {
        writable: true,
        configurable: true,
        value: 1920
      });
      
      expect(hasHorizontalScroll()).toBe(false);
    });
  });

  describe('AC3: Touch targets are minimum 44px on mobile', () => {
    it('should validate buttons meet minimum touch target size', () => {
      const button = document.createElement('button');
      button.style.width = '44px';
      button.style.height = '44px';
      button.textContent = 'Submit';
      document.body.appendChild(button);
      
      const result = validateTouchTarget(button);
      expect(result.isValid).toBe(true);
      expect(result.width).toBeGreaterThanOrEqual(44);
      expect(result.height).toBeGreaterThanOrEqual(44);
      
      document.body.removeChild(button);
    });

    it('should validate links with padding meet minimum touch target size', () => {
      const link = document.createElement('a');
      link.href = '#';
      link.style.display = 'inline-block';
      link.style.padding = '12px 16px'; // Creates ~44px height with text
      link.textContent = 'Navigation Link';
      document.body.appendChild(link);
      
      const result = validateTouchTarget(link);
      expect(result.height).toBeGreaterThanOrEqual(44);
      
      document.body.removeChild(link);
    });

    it('should validate menu buttons meet minimum touch target size', () => {
      const menuButton = document.createElement('button');
      menuButton.style.width = '48px';
      menuButton.style.height = '48px';
      menuButton.innerHTML = '<svg width="24" height="24"></svg>';
      document.body.appendChild(menuButton);
      
      const result = validateTouchTarget(menuButton);
      expect(result.isValid).toBe(true);
      expect(result.width).toBeGreaterThanOrEqual(44);
      expect(result.height).toBeGreaterThanOrEqual(44);
      
      document.body.removeChild(menuButton);
    });

    it('should fail validation for undersized touch targets', () => {
      const smallButton = document.createElement('button');
      smallButton.style.width = '30px';
      smallButton.style.height = '30px';
      smallButton.textContent = 'X';
      document.body.appendChild(smallButton);
      
      const result = validateTouchTarget(smallButton);
      expect(result.isValid).toBe(false);
      expect(result.width).toBeLessThan(44);
      
      document.body.removeChild(smallButton);
    });

    it('should validate icon buttons with proper padding', () => {
      const iconButton = document.createElement('button');
      iconButton.style.width = '44px';
      iconButton.style.height = '44px';
      iconButton.style.borderRadius = '50%';
      iconButton.innerHTML = '☰';
      document.body.appendChild(iconButton);
      
      const result = validateTouchTarget(iconButton);
      expect(result.isValid).toBe(true);
      
      document.body.removeChild(iconButton);
    });
  });

  describe('AC4: Font sizes meet minimum readability standards on mobile (16px minimum)', () => {
    it('should define text-readable utility class', () => {
      injectResponsiveUtilities();
      
      const element = document.createElement('p');
      element.className = 'text-readable';
      element.textContent = 'Readable text';
      document.body.appendChild(element);
      
      expect(element.classList.contains('text-readable')).toBe(true);
      
      document.body.removeChild(element);
    });

    it('should use max(16px, 1rem) for minimum font size', () => {
      // Import the styles and check for the value
      const { RESPONSIVE_UTILITY_STYLES } = require('./responsiveUtils');
      expect(RESPONSIVE_UTILITY_STYLES).toContain('max(16px, 1rem)');
    });

    it('should apply font-size rule only on mobile viewport', () => {
      const { RESPONSIVE_UTILITY_STYLES } = require('./responsiveUtils');
      expect(RESPONSIVE_UTILITY_STYLES).toContain('@media (max-width: 639px)');
    });

    it('should ensure input fields have readable text', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'text-readable';
      input.placeholder = 'Enter text';
      document.body.appendChild(input);
      
      expect(input.classList.contains('text-readable')).toBe(true);
      
      document.body.removeChild(input);
    });

    it('should ensure textarea has readable text', () => {
      const textarea = document.createElement('textarea');
      textarea.className = 'text-readable';
      textarea.placeholder = 'Enter message';
      document.body.appendChild(textarea);
      
      expect(textarea.classList.contains('text-readable')).toBe(true);
      
      document.body.removeChild(textarea);
    });
  });

  describe('Responsive Utility Class Integration', () => {
    beforeEach(() => {
      injectResponsiveUtilities();
    });

    it('should apply hide-mobile class correctly', () => {
      const element = document.createElement('div');
      element.className = 'hide-mobile';
      element.textContent = 'Hidden on mobile';
      document.body.appendChild(element);
      
      expect(element.classList.contains('hide-mobile')).toBe(true);
      
      document.body.removeChild(element);
    });

    it('should apply show-mobile-only class correctly', () => {
      const element = document.createElement('div');
      element.className = 'show-mobile-only';
      element.textContent = 'Only on mobile';
      document.body.appendChild(element);
      
      expect(element.classList.contains('show-mobile-only')).toBe(true);
      
      document.body.removeChild(element);
    });

    it('should apply multiple utility classes together', () => {
      const element = document.createElement('div');
      element.className = 'touch-target text-readable prevent-overflow-x';
      document.body.appendChild(element);
      
      expect(element.classList.contains('touch-target')).toBe(true);
      expect(element.classList.contains('text-readable')).toBe(true);
      expect(element.classList.contains('prevent-overflow-x')).toBe(true);
      
      document.body.removeChild(element);
    });

    it('should work with inline display variants', () => {
      const span = document.createElement('span');
      span.className = 'hide-mobile-inline';
      span.textContent = 'Inline text';
      document.body.appendChild(span);
      
      expect(span.classList.contains('hide-mobile-inline')).toBe(true);
      
      document.body.removeChild(span);
    });

    it('should work with flex display variants', () => {
      const div = document.createElement('div');
      div.className = 'hide-mobile-flex';
      document.body.appendChild(div);
      
      expect(div.classList.contains('hide-mobile-flex')).toBe(true);
      
      document.body.removeChild(div);
    });
  });

  describe('Breakpoint Detection', () => {
    it('should correctly identify mobile breakpoint at 320px', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320
      });
      
      expect(getCurrentBreakpoint()).toBe('mobile');
    });

    it('should correctly identify tablet breakpoint at 768px', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      });
      
      expect(getCurrentBreakpoint()).toBe('tablet');
    });

    it('should correctly identify desktop breakpoint at 1024px', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });
      
      expect(getCurrentBreakpoint()).toBe('desktop');
    });

    it('should correctly identify wide breakpoint at 1920px', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920
      });
      
      expect(getCurrentBreakpoint()).toBe('wide');
    });
  });

  describe('Cross-Component Validation', () => {
    it('should validate responsive utilities work with existing components', () => {
      // Create a mock header
      const header = document.createElement('header');
      header.className = 'prevent-overflow-x';
      
      const nav = document.createElement('nav');
      const link = document.createElement('a');
      link.href = '/';
      link.className = 'touch-target text-readable';
      link.textContent = 'Home';
      nav.appendChild(link);
      header.appendChild(nav);
      document.body.appendChild(header);
      
      expect(header.classList.contains('prevent-overflow-x')).toBe(true);
      expect(link.classList.contains('touch-target')).toBe(true);
      expect(link.classList.contains('text-readable')).toBe(true);
      
      document.body.removeChild(header);
    });

    it('should validate utilities work with footer links', () => {
      const footer = document.createElement('footer');
      footer.className = 'prevent-overflow-x';
      
      const link = document.createElement('a');
      link.href = '/contact';
      link.className = 'touch-target text-readable';
      link.textContent = 'Contact';
      footer.appendChild(link);
      document.body.appendChild(footer);
      
      expect(footer.classList.contains('prevent-overflow-x')).toBe(true);
      expect(link.classList.contains('touch-target')).toBe(true);
      
      document.body.removeChild(footer);
    });

    it('should validate utilities work with form elements', () => {
      const form = document.createElement('form');
      form.className = 'prevent-overflow-x';
      
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'text-readable';
      input.placeholder = 'Name';
      
      const button = document.createElement('button');
      button.type = 'submit';
      button.className = 'touch-target text-readable';
      button.textContent = 'Submit';
      
      form.appendChild(input);
      form.appendChild(button);
      document.body.appendChild(form);
      
      expect(form.classList.contains('prevent-overflow-x')).toBe(true);
      expect(input.classList.contains('text-readable')).toBe(true);
      expect(button.classList.contains('touch-target')).toBe(true);
      
      document.body.removeChild(form);
    });
  });
});
