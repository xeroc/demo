/**
 * Tests for Responsive Navbar Component
 * Story 2: Create responsive navbar component
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  createNavbar,
  mountNavbar,
  unmountNavbar,
  getNavbar,
  DEFAULT_NAVBAR_CONFIG
} from './navbarComponent';

describe('Navbar Component - Story 2', () => {
  beforeEach(() => {
    unmountNavbar();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    unmountNavbar();
  });

  describe('AC1: Navbar contains header image and site name only', () => {
    it('should create navbar with logo icon', () => {
      const navbar = createNavbar();
      const logoIcon = navbar.querySelector('span[aria-hidden="true"]');
      expect(logoIcon).not.toBeNull();
      expect(logoIcon?.textContent).toBe('🌌');
    });

    it('should create navbar with site name', () => {
      const navbar = createNavbar();
      const logoText = navbar.querySelector('.text-lg');
      expect(logoText).not.toBeNull();
      expect(logoText?.textContent).toBe('ChaosCraft');
    });

    it('should have logo icon and text as the only visible content', () => {
      const navbar = createNavbar();
      const links = navbar.querySelectorAll('a');
      expect(links.length).toBe(1); // Only the logo link
      
      const buttons = navbar.querySelectorAll('button');
      expect(buttons.length).toBe(0); // No menu buttons
    });

    it('should have logo wrapped in anchor tag', () => {
      const navbar = createNavbar();
      const logoLink = navbar.querySelector('a');
      expect(logoLink).not.toBeNull();
      expect(logoLink?.getAttribute('href')).toBe('/');
    });

    it('should have exactly two children in logo (icon + text)', () => {
      const navbar = createNavbar();
      const logoLink = navbar.querySelector('a');
      const logoChildren = logoLink?.children;
      expect(logoChildren?.length).toBe(2);
    });

    it('should not have any navigation items', () => {
      const navbar = createNavbar();
      const navItems = navbar.querySelectorAll('nav');
      expect(navItems.length).toBe(0);
    });

    it('should have logo icon with animate-pulse', () => {
      const navbar = createNavbar();
      const logoIcon = navbar.querySelector('span[aria-hidden="true"]');
      expect(logoIcon?.className).toContain('animate-pulse');
    });

    it('should have logo text with font-bold', () => {
      const navbar = createNavbar();
      const logoText = navbar.querySelector('.text-lg');
      expect(logoText?.className).toContain('font-bold');
    });

    it('should accept custom logo text', () => {
      const navbar = createNavbar({ logoText: 'CustomBrand' });
      const logoText = navbar.querySelector('.text-lg');
      expect(logoText?.textContent).toBe('CustomBrand');
    });

    it('should accept custom logo icon', () => {
      const navbar = createNavbar({ logoIcon: '🚀' });
      const logoIcon = navbar.querySelector('span[aria-hidden="true"]');
      expect(logoIcon?.textContent).toBe('🚀');
    });

    it('should use default config when none provided', () => {
      const navbar = createNavbar();
      const logoText = navbar.querySelector('.text-lg');
      expect(logoText?.textContent).toBe(DEFAULT_NAVBAR_CONFIG.logoText);
    });
  });

  describe('AC2: Navbar is responsive and fits mobile screen width (max 100vw)', () => {
    it('should have responsive padding on mobile (px-4)', () => {
      const navbar = createNavbar();
      const container = navbar.querySelector('.max-w-7xl');
      expect(container?.className).toContain('px-4');
    });

    it('should have responsive padding at sm breakpoint (sm:px-6)', () => {
      const navbar = createNavbar();
      const container = navbar.querySelector('.max-w-7xl');
      expect(container?.className).toContain('sm:px-6');
    });

    it('should have responsive padding at lg breakpoint (lg:px-8)', () => {
      const navbar = createNavbar();
      const container = navbar.querySelector('.max-w-7xl');
      expect(container?.className).toContain('lg:px-8');
    });

    it('should have max-width constraint (max-w-7xl)', () => {
      const navbar = createNavbar();
      const container = navbar.querySelector('.max-w-7xl');
      expect(container).not.toBeNull();
    });

    it('should be horizontally centered (mx-auto)', () => {
      const navbar = createNavbar();
      const container = navbar.querySelector('.mx-auto');
      expect(container).not.toBeNull();
    });

    it('should use full width of container', () => {
      const navbar = createNavbar();
      expect(navbar.className).not.toContain('w-');
    });

    it('should have responsive logo icon size (text-2xl sm:text-3xl)', () => {
      const navbar = createNavbar();
      const logoIcon = navbar.querySelector('span[aria-hidden="true"]');
      expect(logoIcon?.className).toContain('text-2xl');
      expect(logoIcon?.className).toContain('sm:text-3xl');
    });

    it('should have responsive logo text size (text-lg sm:text-xl md:text-2xl)', () => {
      const navbar = createNavbar();
      const logoText = navbar.querySelector('.text-lg');
      expect(logoText?.className).toContain('text-lg');
      expect(logoText?.className).toContain('sm:text-xl');
      expect(logoText?.className).toContain('md:text-2xl');
    });

    it('should have fixed height (h-16)', () => {
      const navbar = createNavbar();
      const flexContainer = navbar.querySelector('.h-16');
      expect(flexContainer).not.toBeNull();
    });

    it('should use flexbox for layout', () => {
      const navbar = createNavbar();
      const flexContainer = navbar.querySelector('.flex');
      expect(flexContainer).not.toBeNull();
    });

    it('should center content horizontally', () => {
      const navbar = createNavbar();
      const flexContainer = navbar.querySelector('.justify-center');
      expect(flexContainer).not.toBeNull();
    });

    it('should center content vertically', () => {
      const navbar = createNavbar();
      const flexContainer = navbar.querySelector('.items-center');
      expect(flexContainer).not.toBeNull();
    });
  });

  describe('AC3: Navbar does not overflow horizontally on mobile devices', () => {
    it('should not have fixed width elements', () => {
      const navbar = createNavbar();
      const allElements = navbar.querySelectorAll('*');
      
      allElements.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.style && htmlEl.style.width) {
          expect(htmlEl.style.width).not.toMatch(/^\d+px$/);
        }
      });
    });

    it('should use flex-shrink-0 on logo to prevent squishing', () => {
      const navbar = createNavbar();
      const logo = navbar.querySelector('.flex-shrink-0');
      expect(logo).not.toBeNull();
    });

    it('should have box-sizing border-box by default', () => {
      const navbar = createNavbar();
      document.body.appendChild(navbar);
      
      const computedStyle = window.getComputedStyle(navbar);
      expect(computedStyle.boxSizing).toBe('border-box');
    });

    it('should not cause horizontal scroll', () => {
      const navbar = createNavbar();
      document.body.appendChild(navbar);
      
      // Check that navbar width doesn't exceed viewport
      const rect = navbar.getBoundingClientRect();
      expect(rect.width).toBeLessThanOrEqual(window.innerWidth);
    });

    it('should use max-w-7xl to prevent overflow on large screens', () => {
      const navbar = createNavbar();
      const container = navbar.querySelector('.max-w-7xl');
      expect(container).not.toBeNull();
    });

    it('should have gap-2 for spacing between icon and text', () => {
      const navbar = createNavbar();
      const logo = navbar.querySelector('.gap-2');
      expect(logo).not.toBeNull();
    });

    it('should have centered layout to prevent left/right overflow', () => {
      const navbar = createNavbar();
      const flexContainer = navbar.querySelector('.justify-center');
      expect(flexContainer).not.toBeNull();
    });
  });

  describe('AC4: Visual parity with existing header elements maintained', () => {
    it('should have same background style as header (bg-slate-900/95)', () => {
      const navbar = createNavbar();
      expect(navbar.className).toContain('bg-slate-900/95');
    });

    it('should have backdrop blur (backdrop-blur-md)', () => {
      const navbar = createNavbar();
      expect(navbar.className).toContain('backdrop-blur-md');
    });

    it('should have border separator (border-b border-white/10)', () => {
      const navbar = createNavbar();
      expect(navbar.className).toContain('border-b');
      expect(navbar.className).toContain('border-white/10');
    });

    it('should be sticky positioned (sticky top-0)', () => {
      const navbar = createNavbar();
      expect(navbar.className).toContain('sticky');
      expect(navbar.className).toContain('top-0');
    });

    it('should have z-index for stacking (z-50)', () => {
      const navbar = createNavbar();
      expect(navbar.className).toContain('z-50');
    });

    it('should have same logo icon as header', () => {
      const navbar = createNavbar();
      const logoIcon = navbar.querySelector('span[aria-hidden="true"]');
      expect(logoIcon?.textContent).toBe('🌌');
    });

    it('should have same logo text as header', () => {
      const navbar = createNavbar();
      const logoText = navbar.querySelector('.text-lg');
      expect(logoText?.textContent).toBe('ChaosCraft');
    });

    it('should have white text color for logo', () => {
      const navbar = createNavbar();
      const logoText = navbar.querySelector('.text-lg');
      expect(logoText?.className).toContain('text-white');
    });

    it('should have hover scale effect on logo', () => {
      const navbar = createNavbar();
      const logo = navbar.querySelector('a');
      expect(logo?.className).toContain('hover:scale-105');
    });

    it('should have transition on hover', () => {
      const navbar = createNavbar();
      const logo = navbar.querySelector('a');
      expect(logo?.className).toContain('transition-transform');
      expect(logo?.className).toContain('duration-200');
    });

    it('should have same role attribute as header (banner)', () => {
      const navbar = createNavbar();
      expect(navbar.getAttribute('role')).toBe('banner');
    });

    it('should have aria-label for accessibility', () => {
      const navbar = createNavbar();
      expect(navbar.getAttribute('aria-label')).toBe('Site header');
    });
  });

  describe('AC5: Typecheck passes', () => {
    it('should accept NavbarConfig with logoText', () => {
      const config = { logoText: 'Test' };
      const navbar = createNavbar(config);
      expect(navbar).toBeDefined();
    });

    it('should accept NavbarConfig with logoIcon', () => {
      const config = { logoIcon: '🎯' };
      const navbar = createNavbar(config);
      expect(navbar).toBeDefined();
    });

    it('should accept empty config', () => {
      const navbar = createNavbar({});
      expect(navbar).toBeDefined();
    });

    it('should accept no config', () => {
      const navbar = createNavbar();
      expect(navbar).toBeDefined();
    });

    it('should use Partial<NavbarConfig> type', () => {
      const partialConfig: Partial<{ logoText: string; logoIcon: string }> = {
        logoText: 'Partial'
      };
      const navbar = createNavbar(partialConfig);
      expect(navbar).toBeDefined();
    });

    it('should export DEFAULT_NAVBAR_CONFIG', () => {
      expect(DEFAULT_NAVBAR_CONFIG).toBeDefined();
      expect(DEFAULT_NAVBAR_CONFIG.logoText).toBe('ChaosCraft');
      expect(DEFAULT_NAVBAR_CONFIG.logoIcon).toBe('🌌');
    });
  });

  describe('Mount functions', () => {
    it('should mount navbar to body by default', () => {
      const navbar = mountNavbar();
      expect(document.body.contains(navbar)).toBe(true);
      expect(document.body.firstChild).toBe(navbar);
    });

    it('should mount navbar to specific container', () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);
      
      const navbar = mountNavbar('test-container');
      expect(container.contains(navbar)).toBe(true);
    });

    it('should return null if container not found', () => {
      const navbar = mountNavbar('non-existent');
      expect(navbar).toBeNull();
    });

    it('should mount after banner if banner exists', () => {
      const banner = document.createElement('div');
      banner.id = 'chaoscraft-banner';
      document.body.appendChild(banner);
      
      const navbar = mountNavbar();
      expect(document.body.children[0]).toBe(banner);
      expect(document.body.children[1]).toBe(navbar);
    });

    it('should unmount navbar', () => {
      mountNavbar();
      expect(getNavbar()).not.toBeNull();
      
      unmountNavbar();
      expect(getNavbar()).toBeNull();
    });

    it('should get navbar element after mount', () => {
      mountNavbar();
      const navbar = getNavbar();
      expect(navbar).not.toBeNull();
      expect(navbar?.id).toBe('chaoscraft-navbar');
    });

    it('should return null from getNavbar if not mounted', () => {
      const navbar = getNavbar();
      expect(navbar).toBeNull();
    });

    it('should handle multiple unmount calls gracefully', () => {
      mountNavbar();
      unmountNavbar();
      unmountNavbar(); // Should not throw
      expect(getNavbar()).toBeNull();
    });

    it('should replace existing navbar on remount', () => {
      const navbar1 = mountNavbar();
      navbar1?.classList.add('test-class');
      
      const navbar2 = mountNavbar();
      expect(navbar2?.classList.contains('test-class')).toBe(false);
    });
  });

  describe('Responsive behavior', () => {
    it('should have mobile-first responsive classes', () => {
      const navbar = createNavbar();
      
      // Base classes for mobile
      const container = navbar.querySelector('.px-4');
      expect(container).not.toBeNull();
      
      // Responsive classes for larger screens
      expect(container?.className).toContain('sm:px-6');
      expect(container?.className).toContain('lg:px-8');
    });

    it('should scale logo on different breakpoints', () => {
      const navbar = createNavbar();
      const logoText = navbar.querySelector('.text-lg');
      
      // Mobile: text-lg (18px)
      expect(logoText?.className).toContain('text-lg');
      // Tablet: sm:text-xl (20px)
      expect(logoText?.className).toContain('sm:text-xl');
      // Desktop: md:text-2xl (24px)
      expect(logoText?.className).toContain('md:text-2xl');
    });

    it('should scale icon on different breakpoints', () => {
      const navbar = createNavbar();
      const logoIcon = navbar.querySelector('span[aria-hidden="true"]');
      
      // Mobile: text-2xl (24px)
      expect(logoIcon?.className).toContain('text-2xl');
      // Tablet+: sm:text-3xl (30px)
      expect(logoIcon?.className).toContain('sm:text-3xl');
    });

    it('should maintain fixed height across breakpoints', () => {
      const navbar = createNavbar();
      const flexContainer = navbar.querySelector('.h-16');
      expect(flexContainer).not.toBeNull();
      // h-16 = 64px, consistent across all breakpoints
    });
  });

  describe('Accessibility', () => {
    it('should have proper role attribute', () => {
      const navbar = createNavbar();
      expect(navbar.getAttribute('role')).toBe('banner');
    });

    it('should have aria-label', () => {
      const navbar = createNavbar();
      expect(navbar.getAttribute('aria-label')).toBe('Site header');
    });

    it('should have aria-hidden on decorative icon', () => {
      const navbar = createNavbar();
      const logoIcon = navbar.querySelector('span[aria-hidden="true"]');
      expect(logoIcon).not.toBeNull();
    });

    it('should have semantic HTML structure', () => {
      const navbar = createNavbar();
      expect(navbar.tagName).toBe('NAV');
      
      const link = navbar.querySelector('a');
      expect(link).not.toBeNull();
    });

    it('should be keyboard accessible', () => {
      const navbar = createNavbar();
      document.body.appendChild(navbar);
      
      const logo = navbar.querySelector('a') as HTMLAnchorElement;
      logo.focus();
      expect(document.activeElement).toBe(logo);
    });

    it('should have proper link href', () => {
      const navbar = createNavbar();
      const link = navbar.querySelector('a');
      expect(link?.getAttribute('href')).toBe('/');
    });
  });

  describe('DOM structure', () => {
    it('should have correct ID', () => {
      const navbar = createNavbar();
      expect(navbar.id).toBe('chaoscraft-navbar');
    });

    it('should have nested container structure', () => {
      const navbar = createNavbar();
      
      // nav > div.container > div.flex > a > (span + span)
      const container = navbar.querySelector('.max-w-7xl');
      const flexContainer = container?.querySelector('.flex');
      const link = flexContainer?.querySelector('a');
      const spans = link?.querySelectorAll('span');
      
      expect(spans?.length).toBe(2);
    });

    it('should have logo icon as first child of link', () => {
      const navbar = createNavbar();
      const link = navbar.querySelector('a');
      const firstChild = link?.children[0];
      
      expect(firstChild?.tagName).toBe('SPAN');
      expect(firstChild?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have logo text as second child of link', () => {
      const navbar = createNavbar();
      const link = navbar.querySelector('a');
      const secondChild = link?.children[1];
      
      expect(secondChild?.tagName).toBe('SPAN');
      expect(secondChild?.className).toContain('font-bold');
    });
  });

  describe('Error handling', () => {
    it('should handle missing container gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const navbar = mountNavbar('non-existent-container');
      expect(navbar).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Navbar container with id "non-existent-container" not found'
      );
      
      consoleSpy.mockRestore();
    });

    it('should handle empty body gracefully', () => {
      document.body.innerHTML = '';
      const navbar = mountNavbar();
      expect(navbar).not.toBeNull();
      expect(document.body.contains(navbar)).toBe(true);
    });
  });
});
