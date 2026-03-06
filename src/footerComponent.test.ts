/**
 * Tests for Footer Component - Responsive Design
 * Story 6: Make footer responsive
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createFooter, mountFooter, unmountFooter, getFooter, DEFAULT_FOOTER_CONFIG } from './footerComponent';
import type { FooterConfig, FooterLink } from './footerComponent';

describe('Footer Component - Responsive Design', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    unmountFooter();
  });

  describe('AC1: Footer displays correctly on mobile (320px-767px)', () => {
    it('should have responsive padding on mobile', () => {
      const footer = createFooter();
      const container = footer.querySelector('div');
      
      expect(container?.className).toMatch(/py-6/); // Base vertical padding for mobile
      expect(container?.className).toMatch(/px-4/); // Base horizontal padding for mobile
    });

    it('should stack navigation links vertically on mobile', () => {
      const footer = createFooter();
      const nav = footer.querySelector('nav');
      
      expect(nav?.className).toMatch(/flex-col/); // Column layout for mobile
      expect(nav?.className).toMatch(/sm:flex-row/); // Row layout on larger screens
    });

    it('should have appropriate gap between stacked links on mobile', () => {
      const footer = createFooter();
      const nav = footer.querySelector('nav');
      
      expect(nav?.className).toMatch(/gap-3/); // Gap for mobile
    });

    it('should have readable text size on mobile', () => {
      const footer = createFooter();
      const links = footer.querySelectorAll('nav a');
      
      links.forEach(link => {
        expect(link.className).toMatch(/text-sm/); // 14px minimum for mobile
      });
    });

    it('should have compact copyright text on mobile', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      
      expect(copyright?.className).toMatch(/text-xs/); // Smaller text on mobile
    });

    it('should center all content on mobile', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('div > div');
      
      expect(contentWrapper?.className).toMatch(/flex-col/); // Vertical stack
      expect(contentWrapper?.className).toMatch(/items-center/); // Centered
    });

    it('should have appropriate spacing between sections on mobile', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('div > div');
      
      expect(contentWrapper?.className).toMatch(/gap-4/); // Gap for mobile
    });

    it('should have full-width divider on mobile', () => {
      const footer = createFooter();
      const divider = footer.querySelector('.h-px');
      
      expect(divider?.className).toMatch(/w-full/); // Full width on mobile
      expect(divider?.className).toMatch(/max-w-md/); // Constrained width
    });
  });

  describe('AC2: Footer displays correctly on tablet (768px-1023px)', () => {
    it('should show horizontal navigation on tablet', () => {
      const footer = createFooter();
      const nav = footer.querySelector('nav');
      
      expect(nav?.className).toMatch(/sm:flex-row/); // Row layout at sm breakpoint
    });

    it('should have increased padding on tablet', () => {
      const footer = createFooter();
      const container = footer.querySelector('div');
      
      expect(container?.className).toMatch(/sm:px-6/); // More padding on tablet
      expect(container?.className).toMatch(/sm:py-8/); // More vertical padding
    });

    it('should have larger text size on tablet', () => {
      const footer = createFooter();
      const links = footer.querySelectorAll('nav a');
      
      links.forEach(link => {
        expect(link.className).toMatch(/sm:text-base/); // 16px on tablet
      });
    });

    it('should have larger copyright text on tablet', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      
      expect(copyright?.className).toMatch(/sm:text-sm/); // 14px on tablet
    });

    it('should have increased gap on tablet', () => {
      const footer = createFooter();
      const nav = footer.querySelector('nav');
      const contentWrapper = footer.querySelector('div > div');
      
      expect(nav?.className).toMatch(/sm:gap-6/); // More gap between links
      expect(contentWrapper?.className).toMatch(/sm:gap-6/); // More gap between sections
    });

    it('should have appropriately sized emoji on tablet', () => {
      const footer = createFooter();
      const emoji = footer.querySelector('span[aria-hidden="true"]');
      
      expect(emoji?.className).toMatch(/sm:text-3xl/); // Larger on tablet
    });
  });

  describe('AC3: Footer displays correctly on desktop (1024px+)', () => {
    it('should have desktop padding', () => {
      const footer = createFooter();
      const container = footer.querySelector('div');
      
      expect(container?.className).toMatch(/lg:px-8/); // Desktop horizontal padding
    });

    it('should have desktop vertical padding', () => {
      const footer = createFooter();
      const container = footer.querySelector('div');
      
      expect(container?.className).toMatch(/md:py-10/); // More vertical padding on desktop
    });

    it('should have max-width constraint on desktop', () => {
      const footer = createFooter();
      const container = footer.querySelector('div');
      
      expect(container?.className).toMatch(/max-w-7xl/); // Constrained width
    });

    it('should have horizontal navigation links on desktop', () => {
      const footer = createFooter();
      const nav = footer.querySelector('nav');
      
      expect(nav?.className).toMatch(/flex-row/); // Horizontal layout
    });

    it('should have larger gap between links on desktop', () => {
      const footer = createFooter();
      const nav = footer.querySelector('nav');
      
      expect(nav?.className).toMatch(/md:gap-8/); // More spacing on desktop
    });

    it('should have larger gap between sections on desktop', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('div > div');
      
      expect(contentWrapper?.className).toMatch(/md:gap-8/); // More spacing on desktop
    });
  });

  describe('AC4: Footer content remains readable and accessible at all sizes', () => {
    it('should have proper contrast for text', () => {
      const footer = createFooter();
      const links = footer.querySelectorAll('nav a');
      
      links.forEach(link => {
        expect(link.className).toMatch(/text-gray-300/); // Light text for contrast
      });
    });

    it('should have hover states for links', () => {
      const footer = createFooter();
      const links = footer.querySelectorAll('nav a');
      
      links.forEach(link => {
        expect(link.className).toMatch(/hover:text-white/);
        expect(link.className).toMatch(/hover:text-cyan-300/);
      });
    });

    it('should have transition animations for smooth interactions', () => {
      const footer = createFooter();
      const links = footer.querySelectorAll('nav a');
      
      links.forEach(link => {
        expect(link.className).toMatch(/transition-colors/);
        expect(link.className).toMatch(/duration-200/);
      });
    });

    it('should have aria-label for external links', () => {
      const config: Partial<FooterConfig> = {
        links: [
          { label: 'External', href: 'https://example.com', external: true }
        ]
      };
      const footer = createFooter(config);
      const externalLink = footer.querySelector('a[target="_blank"]');
      
      expect(externalLink?.getAttribute('aria-label')).toContain('opens in a new tab');
    });

    it('should have proper role attribute', () => {
      const footer = createFooter();
      
      expect(footer.getAttribute('role')).toBe('contentinfo');
    });

    it('should have aria-label on navigation', () => {
      const footer = createFooter();
      const nav = footer.querySelector('nav');
      
      expect(nav?.getAttribute('aria-label')).toBe('Footer navigation');
    });

    it('should use semantic HTML structure', () => {
      const footer = createFooter();
      
      expect(footer.tagName).toBe('FOOTER');
      expect(footer.querySelector('nav')).toBeTruthy();
      expect(footer.querySelector('p')).toBeTruthy();
    });

    it('should have minimum font size of 14px on mobile', () => {
      const footer = createFooter();
      const links = footer.querySelectorAll('nav a');
      
      links.forEach(link => {
        // text-sm is 14px
        expect(link.className).toMatch(/text-sm/);
      });
    });

    it('should have adequate spacing for touch targets', () => {
      const footer = createFooter();
      const nav = footer.querySelector('nav');
      
      // Gap provides spacing between touch targets
      expect(nav?.className).toMatch(/gap-3/); // Minimum 12px gap
    });
  });

  describe('AC5: Typecheck passes', () => {
    it('should have correct types for FooterConfig', () => {
      const config: FooterConfig = {
        copyrightText: 'Test copyright',
        links: [
          { label: 'Home', href: '/', external: false }
        ]
      };
      
      expect(config.copyrightText).toBe('Test copyright');
      expect(config.links).toHaveLength(1);
    });

    it('should have correct types for FooterLink', () => {
      const link: FooterLink = {
        label: 'Test',
        href: 'https://example.com',
        external: true
      };
      
      expect(link.label).toBe('Test');
      expect(link.href).toBe('https://example.com');
      expect(link.external).toBe(true);
    });

    it('should accept partial configuration', () => {
      const config: Partial<FooterConfig> = {
        copyrightText: 'Custom copyright'
      };
      
      const footer = createFooter(config);
      const copyright = footer.querySelector('p');
      
      expect(copyright?.textContent).toBe('Custom copyright');
    });

    it('should use default config when no config provided', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      
      expect(copyright?.textContent).toBe(DEFAULT_FOOTER_CONFIG.copyrightText);
    });
  });

  describe('Footer Component - Core Functionality', () => {
    it('should create footer element', () => {
      const footer = createFooter();
      
      expect(footer).toBeInstanceOf(HTMLElement);
      expect(footer.id).toBe('chaoscraft-footer');
    });

    it('should mount footer to body by default', () => {
      const footer = mountFooter();
      
      expect(footer).toBeTruthy();
      expect(document.body.contains(footer)).toBe(true);
    });

    it('should mount footer to specific container', () => {
      const container = document.createElement('div');
      container.id = 'footer-container';
      document.body.appendChild(container);
      
      const footer = mountFooter('footer-container');
      
      expect(footer).toBeTruthy();
      expect(container.contains(footer)).toBe(true);
    });

    it('should return null if container not found', () => {
      const footer = mountFooter('non-existent-container');
      
      expect(footer).toBeNull();
    });

    it('should unmount footer', () => {
      mountFooter();
      unmountFooter();
      
      const footer = document.getElementById('chaoscraft-footer');
      expect(footer).toBeNull();
    });

    it('should get footer element', () => {
      mountFooter();
      const footer = getFooter();
      
      expect(footer).toBeTruthy();
      expect(footer?.id).toBe('chaoscraft-footer');
    });

    it('should create default navigation links', () => {
      const footer = createFooter();
      const links = footer.querySelectorAll('nav a');
      
      expect(links).toHaveLength(DEFAULT_FOOTER_CONFIG.links.length);
    });

    it('should handle external links correctly', () => {
      const config: Partial<FooterConfig> = {
        links: [
          { label: 'External', href: 'https://example.com', external: true }
        ]
      };
      const footer = createFooter(config);
      const externalLink = footer.querySelector('a[target="_blank"]');
      
      expect(externalLink).toBeTruthy();
      expect(externalLink?.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should not add target attribute to internal links', () => {
      const config: Partial<FooterConfig> = {
        links: [
          { label: 'Internal', href: '/', external: false }
        ]
      };
      const footer = createFooter(config);
      const internalLink = footer.querySelector('a');
      
      expect(internalLink?.getAttribute('target')).toBeNull();
    });
  });

  describe('Responsive Classes Validation', () => {
    it('should use mobile-first approach with responsive breakpoints', () => {
      const footer = createFooter();
      const container = footer.querySelector('div');
      
      // Base styles (mobile-first)
      expect(container?.className).toMatch(/px-4/);
      // Responsive overrides
      expect(container?.className).toMatch(/sm:px-6/);
      expect(container?.className).toMatch(/lg:px-8/);
    });

    it('should have responsive typography classes', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      
      expect(copyright?.className).toMatch(/text-xs/);
      expect(copyright?.className).toMatch(/sm:text-sm/);
    });

    it('should have responsive navigation layout classes', () => {
      const footer = createFooter();
      const nav = footer.querySelector('nav');
      
      expect(nav?.className).toMatch(/flex-col/);
      expect(nav?.className).toMatch(/sm:flex-row/);
    });

    it('should have proper z-index and backdrop styling', () => {
      const footer = createFooter();
      
      expect(footer.className).toMatch(/backdrop-blur-md/);
    });

    it('should have gradient divider', () => {
      const footer = createFooter();
      const divider = footer.querySelector('.h-px');
      
      expect(divider?.className).toMatch(/bg-gradient-to-r/);
      expect(divider?.className).toMatch(/from-transparent/);
      expect(divider?.className).toMatch(/to-transparent/);
    });

    it('should have animated emoji', () => {
      const footer = createFooter();
      const emoji = footer.querySelector('span[aria-hidden="true"]');
      
      expect(emoji?.className).toMatch(/animate-pulse/);
      expect(emoji?.textContent).toBe('🌌');
    });
  });

  describe('Layout and Styling', () => {
    it('should have border-top for visual separation', () => {
      const footer = createFooter();
      
      expect(footer.className).toMatch(/border-t/);
      expect(footer.className).toMatch(/border-white\/10/);
    });

    it('should have semi-transparent background', () => {
      const footer = createFooter();
      
      expect(footer.className).toMatch(/bg-slate-900\/95/);
    });

    it('should use flexbox for layout', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('div > div');
      
      expect(contentWrapper?.className).toMatch(/flex/);
    });

    it('should center all content horizontally', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('div > div');
      
      expect(contentWrapper?.className).toMatch(/items-center/);
    });

    it('should center copyright text', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      
      expect(copyright?.className).toMatch(/text-center/);
    });

    it('should have centered container', () => {
      const footer = createFooter();
      const container = footer.querySelector('div');
      
      expect(container?.className).toMatch(/mx-auto/);
    });
  });
});
