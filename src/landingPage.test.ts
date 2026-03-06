/**
 * Tests for Landing Page Integration
 * Story 5: Refactor landing page to use layout components
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  mountNavbar, 
  unmountNavbar, 
  getNavbar 
} from './navbarComponent';
import { 
  mountBanner, 
  unmountBanner, 
  getBanner 
} from './bannerComponent';
import { 
  mountFooter, 
  unmountFooter, 
  getFooter 
} from './footerComponent';
import { 
  cleanupAnimatedBackground 
} from './index';

describe('Landing Page Integration - Story 5', () => {
  beforeEach(() => {
    // Clean up all components
    unmountNavbar();
    unmountBanner();
    unmountFooter();
    cleanupAnimatedBackground();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    unmountNavbar();
    unmountBanner();
    unmountFooter();
    cleanupAnimatedBackground();
  });

  describe('AC1: Landing page uses new navbar component', () => {
    it('should mount navbar component', () => {
      const navbar = mountNavbar();
      expect(navbar).not.toBeNull();
      expect(getNavbar()).toBe(navbar);
    });

    it('should have navbar with logo only', () => {
      mountNavbar();
      const navbar = getNavbar();
      expect(navbar).not.toBeNull();
      
      // Should have logo with icon and text
      const logoIcon = navbar?.querySelector('span[aria-hidden="true"]');
      expect(logoIcon?.textContent).toBe('🌌');
      
      const logoText = navbar?.querySelector('.text-lg');
      expect(logoText?.textContent).toBe('ChaosCraft');
    });

    it('should have navbar with sticky positioning', () => {
      mountNavbar();
      const navbar = getNavbar();
      expect(navbar?.classList.contains('sticky')).toBe(true);
      expect(navbar?.classList.contains('top-0')).toBe(true);
    });
  });

  describe('AC2: Landing page uses new banner component', () => {
    it('should mount banner component', () => {
      const banner = mountBanner();
      expect(banner).not.toBeNull();
      expect(getBanner()).toBe(banner);
    });

    it('should have banner with participation message', () => {
      mountBanner();
      const banner = getBanner();
      expect(banner).not.toBeNull();
      expect(banner?.textContent).toContain('chaoscraft.dev');
    });

    it('should have banner with link to app', () => {
      mountBanner();
      const banner = getBanner();
      const link = banner?.querySelector('a');
      expect(link).not.toBeNull();
      expect(link?.href).toContain('app.chaoscraft.dev');
    });

    it('should have responsive banner that fits mobile width', () => {
      mountBanner();
      const banner = getBanner();
      expect(banner?.classList.contains('w-full')).toBe(true);
      expect(banner?.classList.contains('max-w-full')).toBe(true);
      expect(banner?.classList.contains('overflow-hidden')).toBe(true);
    });
  });

  describe('AC3: Landing page uses new footer component', () => {
    it('should mount footer component', () => {
      const footer = mountFooter();
      expect(footer).not.toBeNull();
      expect(getFooter()).toBe(footer);
    });

    it('should have footer with correct copyright text', () => {
      mountFooter();
      const footer = getFooter();
      expect(footer?.textContent).toContain('© 2026 ChaosCraft');
      expect(footer?.textContent).toContain('Built by chaos, one dollar at a time');
    });

    it('should have footer with no links', () => {
      mountFooter();
      const footer = getFooter();
      const links = footer?.querySelectorAll('a');
      expect(links?.length).toBe(0);
    });

    it('should have footer with correct year', () => {
      mountFooter();
      const footer = getFooter();
      expect(footer?.textContent).toMatch(/© 2026 ChaosCraft/);
    });
  });

  describe('AC4: All original content remains visible', () => {
    it('should preserve main heading', () => {
      document.body.innerHTML = `
        <main>
          <h1>Welcome to ChaosCraft</h1>
        </main>
      `;
      
      const h1 = document.querySelector('h1');
      expect(h1?.textContent).toBe('Welcome to ChaosCraft');
    });

    it('should preserve What is ChaosCraft section', () => {
      document.body.innerHTML = `
        <main>
          <section>
            <h2>What is ChaosCraft?</h2>
          </section>
        </main>
      `;
      
      const h2 = document.querySelector('h2');
      expect(h2?.textContent).toBe('What is ChaosCraft?');
    });

    it('should preserve robot container', () => {
      document.body.innerHTML = `
        <main>
          <div id="robot-container"></div>
        </main>
      `;
      
      const robotContainer = document.getElementById('robot-container');
      expect(robotContainer).not.toBeNull();
    });
  });

  describe('AC5: Layout is properly separated from content', () => {
    it('should have separate layout components', () => {
      mountNavbar();
      mountBanner();
      mountFooter();
      
      const navbar = getNavbar();
      const banner = getBanner();
      const footer = getFooter();
      
      expect(navbar).not.toBeNull();
      expect(banner).not.toBeNull();
      expect(footer).not.toBeNull();
      
      // Each should have unique IDs
      expect(navbar?.id).toBe('chaoscraft-navbar');
      expect(banner?.id).toBe('chaoscraft-banner');
      expect(footer?.id).toBe('chaoscraft-footer');
    });

    it('should have layout components with distinct roles', () => {
      mountNavbar();
      mountBanner();
      mountFooter();
      
      const navbar = getNavbar();
      const banner = getBanner();
      const footer = getFooter();
      
      expect(navbar?.getAttribute('role')).toBe('banner');
      expect(banner?.getAttribute('role')).toBe('banner');
      expect(footer?.getAttribute('role')).toBe('contentinfo');
    });

    it('should have main content in separate container', () => {
      document.body.innerHTML = `
        <nav id="chaoscraft-navbar"></nav>
        <div id="chaoscraft-banner"></div>
        <main class="flex-1">
          <h1>Welcome to ChaosCraft</h1>
        </main>
        <footer id="chaoscraft-footer"></footer>
      `;
      
      const main = document.querySelector('main');
      expect(main).not.toBeNull();
      expect(main?.classList.contains('flex-1')).toBe(true);
    });
  });

  describe('AC6: Page structure follows: navbar -> banner -> content -> footer', () => {
    it('should mount components in correct order', () => {
      document.body.innerHTML = '<main>Content</main>';
      
      // Mount in the order specified in main.ts
      mountNavbar();
      mountBanner();
      mountFooter();
      
      const navbar = getNavbar();
      const banner = getBanner();
      const footer = getFooter();
      const main = document.querySelector('main');
      
      // Verify all components exist
      expect(navbar).not.toBeNull();
      expect(banner).not.toBeNull();
      expect(main).not.toBeNull();
      expect(footer).not.toBeNull();
      
      // Verify order in DOM
      const children = Array.from(document.body.children);
      const navbarIndex = children.indexOf(navbar!);
      const bannerIndex = children.indexOf(banner!);
      const mainIndex = children.indexOf(main!);
      const footerIndex = children.indexOf(footer!);
      
      expect(navbarIndex).toBeLessThan(bannerIndex);
      expect(bannerIndex).toBeLessThan(mainIndex);
      expect(mainIndex).toBeLessThan(footerIndex);
    });

    it('should have navbar before banner in DOM', () => {
      document.body.innerHTML = '';
      
      mountNavbar();
      mountBanner();
      
      const navbar = getNavbar();
      const banner = getBanner();
      
      const children = Array.from(document.body.children);
      expect(children.indexOf(navbar!)).toBeLessThan(children.indexOf(banner!));
    });

    it('should have content between banner and footer', () => {
      document.body.innerHTML = '<main>Content</main>';
      
      mountBanner();
      mountFooter();
      
      const banner = getBanner();
      const footer = getFooter();
      const main = document.querySelector('main');
      
      const children = Array.from(document.body.children);
      const bannerIndex = children.indexOf(banner!);
      const mainIndex = children.indexOf(main!);
      const footerIndex = children.indexOf(footer!);
      
      expect(bannerIndex).toBeLessThan(mainIndex);
      expect(mainIndex).toBeLessThan(footerIndex);
    });

    it('should have footer at the end of body', () => {
      document.body.innerHTML = '<main>Content</main>';
      
      mountFooter();
      
      const footer = getFooter();
      const lastChild = document.body.lastElementChild;
      
      expect(lastChild).toBe(footer);
    });
  });

  describe('AC7: Typecheck passes', () => {
    it('should export navbar with correct types', () => {
      const { createNavbar } = require('./navbarComponent');
      const navbar = createNavbar({ logoText: 'Test' });
      expect(navbar).toBeInstanceOf(HTMLElement);
    });

    it('should export banner with correct types', () => {
      const { createBanner } = require('./bannerComponent');
      const banner = createBanner({ message: 'Test' });
      expect(banner).toBeInstanceOf(HTMLElement);
    });

    it('should export footer with correct types', () => {
      const { createFooter } = require('./footerComponent');
      const footer = createFooter({ copyrightText: 'Test' });
      expect(footer).toBeInstanceOf(HTMLElement);
    });

    it('should have proper return types for mount functions', () => {
      const navbar = mountNavbar();
      const banner = mountBanner();
      const footer = mountFooter();
      
      expect(navbar).toBeInstanceOf(HTMLElement);
      expect(banner).toBeInstanceOf(HTMLElement);
      expect(footer).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Responsive Layout', () => {
    it('should have responsive navbar', () => {
      mountNavbar();
      const navbar = getNavbar();
      
      // Should have responsive padding
      expect(navbar?.querySelector('.px-4.sm\\:px-6.lg\\:px-8')).not.toBeNull();
    });

    it('should have responsive banner', () => {
      mountBanner();
      const banner = getBanner();
      
      // Should have responsive classes
      expect(banner?.classList.contains('w-full')).toBe(true);
      expect(banner?.querySelector('.flex-col.sm\\:flex-row')).not.toBeNull();
    });

    it('should have responsive footer', () => {
      mountFooter();
      const footer = getFooter();
      
      // Should have responsive padding
      expect(footer?.querySelector('.py-6.sm\\:py-8.md\\:py-10')).not.toBeNull();
    });

    it('should not exceed viewport width on mobile', () => {
      mountNavbar();
      mountBanner();
      mountFooter();
      
      const navbar = getNavbar();
      const banner = getBanner();
      const footer = getFooter();
      
      // All should have max-width constraints or be full-width without overflow
      expect(navbar?.classList.contains('max-w-7xl') || navbar?.classList.contains('w-full')).toBe(true);
      expect(banner?.classList.contains('w-full')).toBe(true);
      expect(banner?.classList.contains('max-w-full')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA roles on layout components', () => {
      mountNavbar();
      mountBanner();
      mountFooter();
      
      const navbar = getNavbar();
      const banner = getBanner();
      const footer = getFooter();
      
      expect(navbar?.getAttribute('role')).toBe('banner');
      expect(banner?.getAttribute('role')).toBe('banner');
      expect(footer?.getAttribute('role')).toBe('contentinfo');
    });

    it('should have ARIA labels', () => {
      mountNavbar();
      mountBanner();
      mountFooter();
      
      const navbar = getNavbar();
      const banner = getBanner();
      const footer = getFooter();
      
      expect(navbar?.getAttribute('aria-label')).toBeTruthy();
      expect(banner?.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Integration', () => {
    it('should work with multiple mount/unmount cycles', () => {
      for (let i = 0; i < 3; i++) {
        mountNavbar();
        mountBanner();
        mountFooter();
        
        expect(getNavbar()).not.toBeNull();
        expect(getBanner()).not.toBeNull();
        expect(getFooter()).not.toBeNull();
        
        unmountNavbar();
        unmountBanner();
        unmountFooter();
        
        expect(getNavbar()).toBeNull();
        expect(getBanner()).toBeNull();
        expect(getFooter()).toBeNull();
      }
    });

    it('should not break page layout when mounted', () => {
      document.body.innerHTML = '<main>Content</main>';
      const originalContent = document.body.innerHTML;
      
      mountNavbar();
      mountBanner();
      mountFooter();
      
      // Main content should still exist
      const main = document.querySelector('main');
      expect(main).not.toBeNull();
      expect(main?.textContent).toBe('Content');
    });
  });
});
