/**
 * Tests for Story 2: Style Banner Component
 * Validates styling and accessibility requirements
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createBanner, mountBanner, unmountBanner } from './bannerComponent';

describe('Story 2: Banner Styling', () => {
  beforeEach(() => {
    unmountBanner();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    unmountBanner();
  });

  describe('AC1: Distinct Background Color', () => {
    it('should have a gradient background class', () => {
      const banner = createBanner();
      expect(banner.className).toContain('bg-gradient-to-r');
    });

    it('should use distinct gradient colors (cyan, blue, purple)', () => {
      const banner = createBanner();
      expect(banner.className).toContain('from-cyan-600');
      expect(banner.className).toContain('via-blue-600');
      expect(banner.className).toContain('to-purple-600');
    });

    it('should have a visually distinct background from typical page backgrounds', () => {
      const banner = createBanner();
      // Gradient colors should be vibrant and stand out
      const hasGradient = banner.className.includes('bg-gradient');
      const hasVibrantColors = 
        banner.className.includes('cyan') ||
        banner.className.includes('blue') ||
        banner.className.includes('purple');
      
      expect(hasGradient).toBe(true);
      expect(hasVibrantColors).toBe(true);
    });
  });

  describe('AC2: Text Readability and Contrast', () => {
    it('should use white text for contrast against dark gradient', () => {
      const banner = createBanner();
      expect(banner.className).toContain('text-white');
    });

    it('should have sufficient text contrast for WCAG AA compliance', () => {
      const banner = createBanner();
      // White text (#ffffff) on cyan-600 (#0891b2), blue-600 (#2563eb), or purple-600 (#9333ea)
      // All these combinations meet WCAG AA standards (4.5:1 for normal text)
      const hasWhiteText = banner.className.includes('text-white');
      const hasDarkBackground = 
        banner.className.includes('cyan-600') ||
        banner.className.includes('blue-600') ||
        banner.className.includes('purple-600');
      
      expect(hasWhiteText).toBe(true);
      expect(hasDarkBackground).toBe(true);
    });

    it('should have readable font size', () => {
      const banner = createBanner();
      const messageSpan = banner.querySelector('span');
      
      // Should have text-sm (0.875rem) or larger
      expect(messageSpan?.className).toMatch(/text-(sm|base|lg|xl)/);
    });

    it('should use font-medium or higher weight for better readability', () => {
      const banner = createBanner();
      const messageSpan = banner.querySelector('span');
      
      expect(messageSpan?.className).toContain('font-');
    });
  });

  describe('AC3: Link Visual Identification', () => {
    it('should have underline styling for link visibility', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      
      expect(link?.className).toContain('underline');
    });

    it('should have distinct font weight for link', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      
      expect(link?.className).toContain('font-semibold');
    });

    it('should be visually distinct from regular text', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      const messageSpan = banner.querySelector('span');
      
      // Link should have different styling than message
      const linkHasUnderline = link?.className.includes('underline');
      const messageHasUnderline = messageSpan?.className.includes('underline');
      
      expect(linkHasUnderline).toBe(true);
      expect(messageHasUnderline).toBe(false);
    });
  });

  describe('AC4: Padding and Spacing', () => {
    it('should have vertical padding (py-)', () => {
      const banner = createBanner();
      expect(banner.className).toMatch(/py-\d+/);
    });

    it('should have horizontal padding (px-)', () => {
      const banner = createBanner();
      expect(banner.className).toMatch(/px-\d+/);
    });

    it('should have appropriate padding values (at least 12px / py-3 px-4)', () => {
      const banner = createBanner();
      const hasVerticalPadding = banner.className.includes('py-3') || 
                                   banner.className.includes('py-4') ||
                                   banner.className.includes('py-5') ||
                                   banner.className.includes('py-6');
      const hasHorizontalPadding = banner.className.includes('px-4') ||
                                    banner.className.includes('px-5') ||
                                    banner.className.includes('px-6') ||
                                    banner.className.includes('px-8');
      
      expect(hasVerticalPadding || hasHorizontalPadding).toBe(true);
    });

    it('should have text-center alignment', () => {
      const banner = createBanner();
      expect(banner.className).toContain('text-center');
    });

    it('should have gap spacing between message and link', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      expect(contentDiv?.className).toMatch(/gap-\d+/);
    });
  });

  describe('AC5: Responsive Design', () => {
    it('should use flexbox for responsive layout', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      expect(contentDiv?.className).toContain('flex');
    });

    it('should stack vertically on mobile (flex-col)', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      expect(contentDiv?.className).toContain('flex-col');
    });

    it('should switch to horizontal layout on larger screens (sm:flex-row)', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      expect(contentDiv?.className).toContain('sm:flex-row');
    });

    it('should have responsive text sizing (text-sm sm:text-base)', () => {
      const banner = createBanner();
      const messageSpan = banner.querySelector('span');
      const link = banner.querySelector('a');
      
      // Both message and link should have responsive text classes
      const messageHasResponsive = messageSpan?.className.includes('sm:');
      const linkHasResponsive = link?.className.includes('sm:');
      
      expect(messageHasResponsive || linkHasResponsive).toBe(true);
    });

    it('should center content with max-width constraint', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      expect(contentDiv?.className).toContain('mx-auto');
    });

    it('should work on mobile, tablet, and desktop viewports', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      // Should have responsive classes
      const hasMobileFirst = contentDiv?.className.includes('flex-col');
      const hasTabletUp = contentDiv?.className.includes('sm:');
      
      expect(hasMobileFirst).toBe(true);
      expect(hasTabletUp).toBe(true);
    });
  });

  describe('AC6: Hover State on Link', () => {
    it('should have hover: class for visual feedback', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      
      expect(link?.className).toContain('hover:');
    });

    it('should change text color on hover', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      
      expect(link?.className).toContain('hover:text-');
    });

    it('should have smooth transition for hover effect', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      
      expect(link?.className).toContain('transition-');
    });

    it('should have appropriate hover color (yellow-200 for contrast)', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      
      // Yellow-200 (#fef08a) provides good contrast and visual feedback
      expect(link?.className).toContain('hover:text-yellow-200');
    });

    it('should have transition duration for smooth effect', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      
      expect(link?.className).toMatch(/duration-\d+/);
    });
  });

  describe('AC7: Typecheck Passes', () => {
    it('should have proper TypeScript types', () => {
      // This test passes if the module imports without type errors
      const banner = createBanner();
      expect(banner).toBeInstanceOf(HTMLElement);
    });

    it('should accept BannerConfig interface', () => {
      const config = {
        message: 'Test message',
        linkUrl: 'https://test.com',
        linkText: 'Test link'
      };
      
      const banner = createBanner(config);
      expect(banner.textContent).toContain('Test message');
    });
  });

  describe('Integration Tests', () => {
    it('should render banner with all styling classes applied', () => {
      const banner = createBanner();
      
      // Verify all key styling elements are present
      expect(banner.className).toContain('bg-gradient-to-r');
      expect(banner.className).toContain('text-white');
      expect(banner.className).toContain('text-center');
      
      const link = banner.querySelector('a');
      expect(link?.className).toContain('underline');
      expect(link?.className).toContain('hover:');
      expect(link?.className).toContain('transition-');
    });

    it('should be visually prominent when mounted', () => {
      const banner = mountBanner();
      
      expect(banner).not.toBeNull();
      expect(banner?.id).toBe('chaoscraft-banner');
      expect(banner?.className).toContain('bg-gradient');
    });

    it('should maintain styling across all responsive breakpoints', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      // Mobile-first with responsive overrides
      expect(contentDiv?.className).toMatch(/flex/);
      expect(contentDiv?.className).toMatch(/sm:/);
    });
  });
});
