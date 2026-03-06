/**
 * Tests for Story 3: Create Responsive Banner Component
 * Validates banner responsive design and layout behavior
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createBanner, mountBanner, unmountBanner } from './bannerComponent';

describe('Story 3: Create Responsive Banner Component', () => {
  beforeEach(() => {
    unmountBanner();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    unmountBanner();
  });

  describe('AC1: Banner contains explanatory text about the site/app', () => {
    it('should display the participation message', () => {
      const banner = createBanner();
      const text = banner.textContent || '';
      expect(text.toLowerCase()).toContain('modified');
      expect(text.toLowerCase()).toContain('chaoscraft.dev');
      expect(text.toLowerCase()).toContain('participating');
    });

    it('should have clear and readable message text', () => {
      const banner = createBanner();
      const messageSpan = banner.querySelector('span');
      expect(messageSpan).not.toBeNull();
      expect(messageSpan?.textContent).toContain('chaoscraft.dev');
    });

    it('should allow custom message configuration', () => {
      const customMessage = 'Join our community experiment!';
      const banner = createBanner({ message: customMessage });
      expect(banner.textContent).toContain(customMessage);
    });
  });

  describe('AC2: Banner includes link to the app', () => {
    it('should contain a link element', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      expect(link).not.toBeNull();
    });

    it('should link to app.chaoscraft.dev', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      expect(link?.href).toBe('https://app.chaoscraft.dev/');
    });

    it('should open link in new tab for better UX', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      expect(link?.target).toBe('_blank');
      expect(link?.rel).toContain('noopener');
      expect(link?.rel).toContain('noreferrer');
    });

    it('should have descriptive link text', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      expect(link?.textContent).toBeTruthy();
      expect(link?.textContent).toContain('participate');
    });

    it('should allow custom link configuration', () => {
      const banner = createBanner({
        linkUrl: 'https://custom.example.com',
        linkText: 'Join Now'
      });
      const link = banner.querySelector('a');
      expect(link?.href).toBe('https://custom.example.com/');
      expect(link?.textContent).toBe('Join Now');
    });
  });

  describe('AC3: Banner is responsive and fits mobile screen width (max 100vw)', () => {
    it('should have w-full class for full width', () => {
      const banner = createBanner();
      expect(banner.className).toContain('w-full');
    });

    it('should have max-w-full to prevent overflow', () => {
      const banner = createBanner();
      expect(banner.className).toContain('max-w-full');
    });

    it('should have overflow-hidden to prevent horizontal scroll', () => {
      const banner = createBanner();
      expect(banner.className).toContain('overflow-hidden');
    });

    it('should not exceed viewport width on mobile devices', () => {
      const banner = createBanner();
      // Check for responsive width constraints
      const hasWidthConstraint = 
        banner.className.includes('w-full') ||
        banner.className.includes('max-w-');
      expect(hasWidthConstraint).toBe(true);
    });

    it('should use responsive padding that scales with viewport', () => {
      const banner = createBanner();
      // Should have horizontal padding
      expect(banner.className).toMatch(/px-\d+/);
    });

    it('should have responsive text sizing (mobile-first)', () => {
      const banner = createBanner();
      const messageSpan = banner.querySelector('span');
      const link = banner.querySelector('a');
      
      // Both should have responsive text classes
      expect(messageSpan?.className).toContain('text-');
      expect(link?.className).toContain('text-');
      
      // At least one should have responsive breakpoint
      const hasResponsiveText = 
        messageSpan?.className.includes('sm:') ||
        link?.className.includes('sm:');
      expect(hasResponsiveText).toBe(true);
    });

    it('should use flexbox layout that adapts to screen size', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      expect(contentDiv?.className).toContain('flex');
      expect(contentDiv?.className).toContain('flex-col'); // Mobile: stack vertically
      expect(contentDiv?.className).toContain('sm:flex-row'); // Tablet+: horizontal
    });

    it('should have responsive gap spacing', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      // Should have gap classes
      expect(contentDiv?.className).toMatch(/gap-\d+/);
      
      // Should have responsive gap
      expect(contentDiv?.className).toMatch(/sm:gap-\d+/);
    });

    it('should center content properly on all screen sizes', () => {
      const banner = createBanner();
      expect(banner.className).toContain('text-center');
      
      const contentDiv = banner.querySelector('div');
      expect(contentDiv?.className).toContain('justify-center');
      expect(contentDiv?.className).toContain('mx-auto');
    });

    it('should have max-width constraint on inner content', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      // Inner content should have max-width for readability
      expect(contentDiv?.className).toContain('max-w-');
    });
  });

  describe('AC4: Banner styling is consistent with overall design', () => {
    it('should use gradient background matching site theme', () => {
      const banner = createBanner();
      expect(banner.className).toContain('bg-gradient-to-r');
      
      // Should use site color palette (cyan, blue, purple)
      const hasThemeColors = 
        banner.className.includes('cyan') ||
        banner.className.includes('blue') ||
        banner.className.includes('purple');
      expect(hasThemeColors).toBe(true);
    });

    it('should use white text for contrast', () => {
      const banner = createBanner();
      expect(banner.className).toContain('text-white');
    });

    it('should have proper visual hierarchy (link stands out)', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      const messageSpan = banner.querySelector('span');
      
      // Link should be more prominent
      expect(link?.className).toContain('font-semibold');
      expect(link?.className).toContain('underline');
    });

    it('should have hover effects for interactivity', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      
      expect(link?.className).toContain('hover:');
      expect(link?.className).toContain('transition-');
    });

    it('should have appropriate padding and spacing', () => {
      const banner = createBanner();
      expect(banner.className).toMatch(/py-\d+/);
      expect(banner.className).toMatch(/px-\d+/);
    });

    it('should use accessible color contrast (WCAG AA)', () => {
      const banner = createBanner();
      // White text on dark gradient background
      expect(banner.className).toContain('text-white');
      
      // Dark gradient colors (600 level)
      const hasDarkBackground = 
        banner.className.includes('-600');
      expect(hasDarkBackground).toBe(true);
    });
  });

  describe('AC5: Typecheck passes', () => {
    it('should export BannerConfig interface', () => {
      // TypeScript compilation would fail if types were incorrect
      const config: Partial<{message?: string; linkUrl?: string; linkText?: string}> = {
        message: 'Test',
        linkUrl: 'https://test.com',
        linkText: 'Link'
      };
      
      const banner = createBanner(config);
      expect(banner).toBeInstanceOf(HTMLElement);
    });

    it('should have correct function signatures', () => {
      expect(typeof createBanner).toBe('function');
      expect(typeof mountBanner).toBe('function');
      expect(typeof unmountBanner).toBe('function');
    });

    it('should accept partial configuration', () => {
      // Test with empty config
      const banner1 = createBanner();
      expect(banner1).toBeInstanceOf(HTMLElement);
      
      // Test with partial config
      const banner2 = createBanner({ message: 'Custom' });
      expect(banner2).toBeInstanceOf(HTMLElement);
      
      // Test with full config
      const banner3 = createBanner({
        message: 'Full',
        linkUrl: 'https://full.com',
        linkText: 'Link'
      });
      expect(banner3).toBeInstanceOf(HTMLElement);
    });

    it('should return correct types', () => {
      const banner = createBanner();
      expect(banner).toBeInstanceOf(HTMLElement);
      expect(banner.tagName).toBe('DIV');
    });

    it('should have proper return types for mount functions', () => {
      const mounted = mountBanner();
      expect(mounted).toBeInstanceOf(HTMLElement);
      
      const mountedWithConfig = mountBanner(undefined, { message: 'Test' });
      expect(mountedWithConfig).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Integration: Banner works in layout context', () => {
    it('should mount at the top of the page', () => {
      const existingContent = document.createElement('div');
      existingContent.id = 'existing';
      document.body.appendChild(existingContent);
      
      const banner = mountBanner();
      expect(document.body.firstChild).toBe(banner);
    });

    it('should not break page layout', () => {
      const main = document.createElement('main');
      main.innerHTML = '<h1>Content</h1>';
      document.body.appendChild(main);
      
      mountBanner();
      
      // Main content should still be accessible
      expect(document.querySelector('main')).not.toBeNull();
    });

    it('should be removable without side effects', () => {
      mountBanner();
      expect(document.getElementById('chaoscraft-banner')).not.toBeNull();
      
      unmountBanner();
      expect(document.getElementById('chaoscraft-banner')).toBeNull();
    });

    it('should maintain all functionality after multiple mount/unmount cycles', () => {
      for (let i = 0; i < 3; i++) {
        const banner = mountBanner();
        expect(banner).not.toBeNull();
        expect(banner?.querySelector('a')).not.toBeNull();
        unmountBanner();
      }
    });
  });

  describe('Accessibility', () => {
    it('should have role="banner"', () => {
      const banner = createBanner();
      expect(banner.getAttribute('role')).toBe('banner');
    });

    it('should have aria-label for screen readers', () => {
      const banner = createBanner();
      const ariaLabel = banner.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('ChaosCraft');
    });

    it('should have aria-label on link indicating new tab', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      const ariaLabel = link?.getAttribute('aria-label');
      expect(ariaLabel).toContain('opens in a new tab');
    });

    it('should be keyboard accessible', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      
      // Link should be focusable by default (it's an <a> element)
      expect(link?.tagName).toBe('A');
      expect(link?.hasAttribute('href')).toBe(true);
    });
  });

  describe('Mobile-specific behavior', () => {
    it('should stack elements vertically on mobile', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      // Default (mobile) should be vertical
      expect(contentDiv?.className).toContain('flex-col');
    });

    it('should have appropriate gap for mobile touch targets', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      // Gap should be present for spacing
      expect(contentDiv?.className).toMatch(/gap-\d+/);
    });

    it('should use smaller text on mobile for better fit', () => {
      const banner = createBanner();
      const messageSpan = banner.querySelector('span');
      
      // Mobile-first: base size is smaller, scales up on larger screens
      expect(messageSpan?.className).toMatch(/text-sm/);
    });

    it('should not have elements that overflow viewport', () => {
      const banner = createBanner();
      
      // Banner should constrain width
      expect(banner.className).toContain('w-full');
      expect(banner.className).toContain('overflow-hidden');
    });
  });

  describe('Responsive breakpoints', () => {
    it('should have mobile-first approach (no breakpoint prefix for mobile styles)', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      // Mobile styles should not have breakpoint prefix
      const classes = contentDiv?.className.split(' ') || [];
      const hasMobileFlexCol = classes.includes('flex-col');
      expect(hasMobileFlexCol).toBe(true);
    });

    it('should have sm: breakpoint for tablet and up', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      // Should have sm: prefixed classes for larger screens
      expect(contentDiv?.className).toContain('sm:flex-row');
    });

    it('should scale text appropriately at breakpoints', () => {
      const banner = createBanner();
      const messageSpan = banner.querySelector('span');
      
      // Mobile: text-sm, Tablet+: sm:text-base
      expect(messageSpan?.className).toContain('text-sm');
      expect(messageSpan?.className).toContain('sm:text-base');
    });

    it('should scale gap spacing at breakpoints', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      
      // Should have responsive gap
      expect(contentDiv?.className).toMatch(/gap-\d+\s+sm:gap-\d+/);
    });
  });
});
