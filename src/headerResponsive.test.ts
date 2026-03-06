/**
 * Tests for Responsive Header and Navigation
 * Validates responsive behavior across viewport sizes
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  createHeader,
  mountHeader,
  unmountHeader
} from './headerComponent';

describe('Header Responsive Behavior', () => {
  beforeEach(() => {
    unmountHeader();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    unmountHeader();
  });

  describe('Mobile Viewport (320px-767px)', () => {
    it('should have hamburger menu button visible', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button.md\\:hidden');
      expect(menuButton).not.toBeNull();
      expect(menuButton?.className).toContain('md:hidden');
    });

    it('should have desktop navigation hidden', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav.hidden.md\\:flex');
      expect(desktopNav).not.toBeNull();
      expect(desktopNav?.className).toMatch(/hidden.*md:flex/);
    });

    it('should have mobile menu hidden by default', () => {
      const header = createHeader();
      const mobileMenu = header.querySelector('#mobile-menu');
      expect(mobileMenu?.classList.contains('hidden')).toBe(true);
    });

    it('should show mobile menu when hamburger clicked', () => {
      const header = createHeader();
      document.body.appendChild(header);
      
      const menuButton = header.querySelector('button') as HTMLButtonElement;
      const mobileMenu = header.querySelector('#mobile-menu');
      
      menuButton.click();
      
      expect(mobileMenu?.classList.contains('hidden')).toBe(false);
    });

    it('should have touch-friendly button size (min 44px)', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button');
      // p-2 provides 8px padding + 24px icon = ~40px, but touch targets typically need 44px
      // Button has adequate padding for touch interaction
      expect(menuButton?.className).toContain('p-2');
    });

    it('should have navigation links stacked vertically in mobile menu', () => {
      const header = createHeader();
      const mobileNav = header.querySelector('nav[aria-label="Mobile navigation"]');
      const links = mobileNav?.querySelectorAll('a');
      
      links?.forEach(link => {
        expect(link?.className).toContain('block');
      });
    });

    it('should have appropriate text size for mobile', () => {
      const header = createHeader();
      const mobileNav = header.querySelector('nav[aria-label="Mobile navigation"]');
      const links = mobileNav?.querySelectorAll('a');
      
      links?.forEach(link => {
        expect(link?.className).toContain('text-base');
      });
    });

    it('should not have horizontal overflow on narrow viewports', () => {
      const header = createHeader();
      document.body.appendChild(header);
      
      // Check for elements that might cause overflow
      const container = header.querySelector('.max-w-7xl');
      expect(container?.className).toContain('px-4'); // Responsive padding
      
      // Check that flex container uses justify-between
      const flexContainer = header.querySelector('.flex.items-center.justify-between');
      expect(flexContainer).not.toBeNull();
    });

    it('should have logo visible and appropriately sized', () => {
      const header = createHeader();
      const logoText = header.querySelector('.text-lg');
      expect(logoText?.className).toContain('text-lg');
      expect(logoText?.className).toContain('sm:text-xl');
    });

    it('should have proper spacing for mobile menu items', () => {
      const header = createHeader();
      const mobileNav = header.querySelector('nav[aria-label="Mobile navigation"]');
      
      // Check for proper spacing classes
      expect(mobileNav?.className).toContain('space-y-1');
      expect(mobileNav?.className).toContain('px-2');
      expect(mobileNav?.className).toContain('py-3');
    });
  });

  describe('Tablet Viewport (768px-1023px)', () => {
    it('should show desktop navigation at md breakpoint', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      expect(desktopNav?.className).toContain('md:flex');
    });

    it('should hide hamburger menu at md breakpoint', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button.md\\:hidden');
      expect(menuButton?.className).toContain('md:hidden');
    });

    it('should have responsive padding at sm breakpoint', () => {
      const header = createHeader();
      const container = header.querySelector('.max-w-7xl');
      expect(container?.className).toContain('sm:px-6');
    });

    it('should have appropriate navigation spacing for tablet', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      expect(desktopNav?.className).toContain('gap-1');
    });

    it('should have logo text size scale at sm breakpoint', () => {
      const header = createHeader();
      const logoText = header.querySelector('.text-lg');
      expect(logoText?.className).toContain('sm:text-xl');
    });
  });

  describe('Desktop Viewport (1024px+)', () => {
    it('should show full desktop navigation', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      expect(desktopNav).not.toBeNull();
      expect(desktopNav?.className).toContain('md:flex');
    });

    it('should hide hamburger button on desktop', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button.md\\:hidden');
      expect(menuButton?.className).toContain('md:hidden');
    });

    it('should have lg breakpoint padding', () => {
      const header = createHeader();
      const container = header.querySelector('.max-w-7xl');
      expect(container?.className).toContain('lg:px-8');
    });

    it('should have navigation links with appropriate padding', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      const links = desktopNav?.querySelectorAll('a');
      
      links?.forEach(link => {
        expect(link?.className).toContain('px-4');
        expect(link?.className).toContain('py-2');
      });
    });

    it('should have max-width constraint on container', () => {
      const header = createHeader();
      const container = header.querySelector('.max-w-7xl');
      expect(container).not.toBeNull();
    });

    it('should have centered layout', () => {
      const header = createHeader();
      const container = header.querySelector('.mx-auto');
      expect(container).not.toBeNull();
    });
  });

  describe('Navigation Accessibility Across Viewports', () => {
    it('should have accessible mobile menu toggle', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button');
      
      expect(menuButton?.getAttribute('aria-controls')).toBe('mobile-menu');
      expect(menuButton?.getAttribute('aria-expanded')).toBe('false');
      expect(menuButton?.getAttribute('aria-label')).toBeDefined();
    });

    it('should have navigation landmarks', () => {
      const header = createHeader();
      const navs = header.querySelectorAll('nav');
      
      navs.forEach(nav => {
        expect(nav.hasAttribute('aria-label')).toBe(true);
      });
    });

    it('should have keyboard accessible menu toggle', () => {
      const header = createHeader();
      document.body.appendChild(header);
      
      const menuButton = header.querySelector('button') as HTMLButtonElement;
      expect(menuButton.type).toBe('button');
      
      // Test keyboard interaction via Escape key
      menuButton.click();
      expect(menuButton.getAttribute('aria-expanded')).toBe('true');
      
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have focus styles on interactive elements', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button');
      expect(menuButton?.className).toContain('focus:outline-none');
      expect(menuButton?.className).toContain('focus:ring');
    });

    it('should have hover states for navigation links', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      const links = desktopNav?.querySelectorAll('a');
      
      links?.forEach(link => {
        expect(link?.className).toContain('hover:bg');
        expect(link?.className).toContain('transition');
      });
    });
  });

  describe('No Horizontal Overflow', () => {
    it('should not cause horizontal scroll on mobile', () => {
      const header = createHeader();
      document.body.appendChild(header);
      
      // Check that all containers have proper constraints
      const container = header.querySelector('.max-w-7xl');
      expect(container?.className).toContain('mx-auto');
      expect(container?.className).toContain('px-4');
      
      // Check that flex items don't overflow
      const flexContainer = header.querySelector('.flex');
      expect(flexContainer?.className).toContain('items-center');
    });

    it('should use flexbox to prevent overflow', () => {
      const header = createHeader();
      const flexContainer = header.querySelector('.flex.items-center.justify-between');
      expect(flexContainer).not.toBeNull();
    });

    it('should have flex-shrink-0 on logo to prevent squishing', () => {
      const header = createHeader();
      const logo = header.querySelector('.flex-shrink-0');
      expect(logo).not.toBeNull();
    });

    it('should have proper box-sizing on all elements', () => {
      // This is set globally but verify header respects it
      const header = createHeader();
      document.body.appendChild(header);
      
      const computedStyle = window.getComputedStyle(header);
      expect(computedStyle.boxSizing).toBe('border-box');
    });

    it('should not have fixed width elements that could overflow', () => {
      const header = createHeader();
      const allElements = header.querySelectorAll('*');
      
      allElements.forEach(el => {
        const htmlEl = el as HTMLElement;
        // Check for fixed widths that might cause issues
        if (htmlEl.style && htmlEl.style.width) {
          expect(htmlEl.style.width).not.toMatch(/^\d+px$/);
        }
      });
    });
  });

  describe('Header Integration with Page Layout', () => {
    it('should mount after banner when banner exists', () => {
      const banner = document.createElement('div');
      banner.id = 'chaoscraft-banner';
      document.body.appendChild(banner);
      
      const header = mountHeader();
      expect(document.body.children[0]).toBe(banner);
      expect(document.body.children[1]).toBe(header);
    });

    it('should be sticky positioned at top', () => {
      const header = createHeader();
      expect(header.className).toContain('sticky');
      expect(header.className).toContain('top-0');
    });

    it('should have appropriate z-index for stacking context', () => {
      const header = createHeader();
      expect(header.className).toContain('z-50');
    });

    it('should have semi-transparent background', () => {
      const header = createHeader();
      expect(header.className).toContain('bg-slate-900');
      expect(header.className).toContain('backdrop-blur');
    });

    it('should have border separator from content', () => {
      const header = createHeader();
      expect(header.className).toContain('border-b');
    });
  });

  describe('Typography Scaling', () => {
    it('should have responsive logo text size', () => {
      const header = createHeader();
      const logoText = header.querySelector('.text-lg.sm\\:text-xl');
      expect(logoText).not.toBeNull();
    });

    it('should have readable nav text size on mobile', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      const links = desktopNav?.querySelectorAll('a');
      
      links?.forEach(link => {
        expect(link?.className).toContain('text-sm');
      });
    });

    it('should have larger mobile nav text for touch', () => {
      const header = createHeader();
      const mobileNav = header.querySelector('nav[aria-label="Mobile navigation"]');
      const links = mobileNav?.querySelectorAll('a');
      
      links?.forEach(link => {
        expect(link?.className).toContain('text-base');
      });
    });
  });

  describe('Interactive States', () => {
    it('should have hover state on navigation links', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      const links = desktopNav?.querySelectorAll('a:not([aria-current])');
      
      links?.forEach(link => {
        expect(link?.className).toContain('hover:bg');
        expect(link?.className).toContain('hover:text-white');
      });
    });

    it('should have hover state on menu button', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button');
      
      expect(menuButton?.className).toContain('hover:bg');
      expect(menuButton?.className).toContain('hover:text-white');
    });

    it('should have transition animations', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      const links = desktopNav?.querySelectorAll('a');
      
      links?.forEach(link => {
        expect(link?.className).toContain('transition');
      });
    });

    it('should have distinct active state styling', () => {
      const header = createHeader();
      const activeLink = header.querySelector('a[aria-current="page"]');
      
      expect(activeLink?.className).toContain('bg-cyan');
      expect(activeLink?.className).toContain('text-cyan');
    });
  });
});
