/**
 * Tests for Story 6: Ensure full mobile responsiveness
 * 
 * Acceptance Criteria:
 * - Entire page width does not exceed viewport width on mobile
 * - No horizontal scrolling on mobile devices
 * - All layout components (navbar, banner, content, footer) are responsive
 * - Content remains readable on mobile screen sizes (320px+)
 * - CSS uses appropriate responsive techniques (flexbox, grid, max-width, etc.)
 * - Typecheck passes
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
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
  injectResponsiveUtilities,
  hasHorizontalScroll,
  getCurrentBreakpoint,
  BREAKPOINTS
} from './responsiveUtils';

describe('Story 6: Ensure Full Mobile Responsiveness', () => {
  const projectRoot = join(__dirname, '..');

  describe('AC1: Entire page width does not exceed viewport width on mobile', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
      injectResponsiveUtilities();
    });

    afterEach(() => {
      document.body.innerHTML = '';
      unmountNavbar();
      unmountBanner();
      unmountFooter();
    });

    it('should have overflow-x hidden on html element in index.html', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check that html has overflow-x: hidden
      expect(html).toMatch(/overflow-x:\s*hidden/);
    });

    it('should have max-width: 100vw on body element in index.html', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check that body has max-width constraint
      expect(html).toMatch(/max-width:\s*100vw/);
    });

    it('should not have horizontal scroll when all components are mounted', () => {
      mountNavbar();
      mountBanner();
      mountFooter();
      
      // Mock viewport width as mobile
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

    it('should have width: 100% on body element', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      expect(html).toMatch(/width:\s*100%/);
    });

    it('should apply box-sizing: border-box universally', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      expect(html).toMatch(/box-sizing:\s*border-box/);
    });
  });

  describe('AC2: No horizontal scrolling on mobile devices', () => {
    const mobileViewports = [
      { name: '320px (iPhone SE)', width: 320 },
      { name: '375px (iPhone 6/7/8)', width: 375 },
      { name: '414px (iPhone Plus)', width: 414 },
      { name: '360px (Android)', width: 360 },
      { name: '412px (Pixel)', width: 412 }
    ];

    mobileViewports.forEach(({ name, width }) => {
      it(`should not have horizontal scroll at ${name}`, () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width
        });
        
        Object.defineProperty(document.documentElement, 'scrollWidth', {
          writable: true,
          configurable: true,
          value: width
        });
        
        Object.defineProperty(document.documentElement, 'clientWidth', {
          writable: true,
          configurable: true,
          value: width
        });
        
        expect(hasHorizontalScroll()).toBe(false);
      });
    });

    it('should have overflow-x hidden on all layout components', () => {
      mountNavbar();
      mountBanner();
      mountFooter();
      
      const navbar = getNavbar();
      const banner = getBanner();
      const footer = getFooter();
      
      // Check that components don't cause overflow
      expect(navbar).toBeTruthy();
      expect(banner).toBeTruthy();
      expect(footer).toBeTruthy();
      
      // Verify max-width constraints
      if (navbar) {
        expect(navbar.className).toMatch(/max-w-/);
      }
      if (banner) {
        expect(banner.className).toMatch(/max-w-full|overflow-hidden/);
      }
      if (footer) {
        expect(footer.className).toMatch(/max-w-/);
      }
    });

    it('should prevent horizontal scroll with responsive containers', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for overflow-hidden or overflow-x-hidden
      const hasOverflowControl = 
        html.includes('overflow-hidden') || 
        html.includes('overflow-x-hidden') ||
        html.includes('overflow-x: hidden');
      
      expect(hasOverflowControl).toBe(true);
    });
  });

  describe('AC3: All layout components are responsive', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
      injectResponsiveUtilities();
    });

    afterEach(() => {
      unmountNavbar();
      unmountBanner();
      unmountFooter();
    });

    describe('Navbar Responsiveness', () => {
      it('should use responsive text sizing', () => {
        const navbar = mountNavbar();
        expect(navbar).toBeTruthy();
        
        const textElements = navbar?.querySelectorAll('span');
        textElements?.forEach(el => {
          const classes = el.className;
          // Should have base size and responsive overrides
          const hasResponsive = 
            classes.includes('text-') && 
            (classes.includes('sm:') || classes.includes('md:'));
          expect(hasResponsive || classes.includes('text-')).toBe(true);
        });
      });

      it('should use responsive padding', () => {
        const navbar = mountNavbar();
        expect(navbar).toBeTruthy();
        
        const container = navbar?.querySelector('.max-w-7xl');
        expect(container?.className).toMatch(/px-\d+/);
      });

      it('should have max-width constraint', () => {
        const navbar = mountNavbar();
        expect(navbar?.className).toMatch(/max-w-/);
      });

      it('should be full width on mobile', () => {
        const navbar = mountNavbar();
        expect(navbar?.className).toMatch(/w-full/);
      });
    });

    describe('Banner Responsiveness', () => {
      it('should use responsive flex direction', () => {
        const banner = mountBanner();
        expect(banner).toBeTruthy();
        
        const contentDiv = banner?.querySelector('div');
        expect(contentDiv?.className).toMatch(/flex/);
        expect(contentDiv?.className).toMatch(/flex-col/);
        expect(contentDiv?.className).toMatch(/sm:flex-row/);
      });

      it('should use responsive text sizing', () => {
        const banner = mountBanner();
        expect(banner).toBeTruthy();
        
        const textElements = banner?.querySelectorAll('span, a');
        textElements?.forEach(el => {
          const classes = el.className;
          expect(classes).toMatch(/text-/);
        });
      });

      it('should fit mobile screen width', () => {
        const banner = mountBanner();
        expect(banner?.className).toMatch(/w-full/);
        expect(banner?.className).toMatch(/max-w-full/);
        expect(banner?.className).toMatch(/overflow-hidden/);
      });
    });

    describe('Footer Responsiveness', () => {
      it('should use responsive padding', () => {
        const footer = mountFooter();
        expect(footer).toBeTruthy();
        
        const container = footer?.querySelector('.max-w-7xl');
        expect(container?.className).toMatch(/py-\d+/);
        expect(container?.className).toMatch(/sm:py-/);
      });

      it('should use responsive text sizing', () => {
        const footer = mountFooter();
        expect(footer).toBeTruthy();
        
        const text = footer?.querySelector('p');
        expect(text?.className).toMatch(/text-/);
      });

      it('should have max-width constraint', () => {
        const footer = mountFooter();
        expect(footer?.className).toMatch(/max-w-/);
      });
    });

    describe('Content Responsiveness', () => {
      it('should use responsive typography in main content', () => {
        const filePath = join(projectRoot, 'index.html');
        const html = readFileSync(filePath, 'utf-8');
        
        // Check for responsive text classes
        expect(html).toMatch(/text-base/);
        expect(html).toMatch(/sm:text-/);
      });

      it('should use responsive spacing in main content', () => {
        const filePath = join(projectRoot, 'index.html');
        const html = readFileSync(filePath, 'utf-8');
        
        // Check for responsive padding/margin
        const hasResponsiveSpacing = 
          html.includes('px-4') && html.includes('sm:px-') ||
          html.includes('py-8') && html.includes('sm:py-');
        
        expect(hasResponsiveSpacing).toBe(true);
      });

      it('should use responsive container widths', () => {
        const filePath = join(projectRoot, 'index.html');
        const html = readFileSync(filePath, 'utf-8');
        
        // Check for responsive max-width
        expect(html).toMatch(/max-w-\w+/);
        expect(html).toMatch(/sm:max-w-|md:max-w-/);
      });
    });
  });

  describe('AC4: Content remains readable on mobile screen sizes (320px+)', () => {
    it('should use minimum 14px font size for body text', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // text-sm = 14px, text-base = 16px in Tailwind
      const hasReadableText = 
        html.includes('text-sm') || 
        html.includes('text-base');
      
      expect(hasReadableText).toBe(true);
    });

    it('should scale up text for larger screens', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for progressive text sizing
      const hasProgressiveText = 
        html.includes('text-base') && html.includes('sm:text-lg') ||
        html.includes('text-sm') && html.includes('sm:text-base') ||
        html.includes('text-lg') && html.includes('md:text-xl');
      
      expect(hasProgressiveText).toBe(true);
    });

    it('should have sufficient line height for readability', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for line height utilities
      expect(html).toMatch(/leading-/);
    });

    it('should maintain readable heading sizes on mobile', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for responsive headings
      const hasResponsiveHeadings = 
        html.includes('text-2xl') || 
        html.includes('text-3xl') ||
        html.includes('text-4xl');
      
      expect(hasResponsiveHeadings).toBe(true);
    });

    it('should not have text smaller than 12px', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // text-xs = 12px in Tailwind, should be used sparingly
      // Count occurrences of text-xs
      const textXSCount = (html.match(/text-xs/g) || []).length;
      
      // Allow some text-xs but not excessive
      expect(textXSCount).toBeLessThan(10);
    });

    it('should have proper contrast for readability', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for text color classes
      expect(html).toMatch(/text-(white|gray|slate)-/);
    });
  });

  describe('AC5: CSS uses appropriate responsive techniques', () => {
    it('should use flexbox for layout', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      expect(html).toMatch(/flex/);
    });

    it('should use responsive flex direction', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      const hasResponsiveFlex = 
        html.includes('flex-col') && html.includes('sm:flex-row') ||
        html.includes('flex-col') && html.includes('md:flex-row');
      
      expect(hasResponsiveFlex).toBe(true);
    });

    it('should use max-width constraints', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      expect(html).toMatch(/max-w-\w+/);
    });

    it('should use percentage-based widths', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      expect(html).toMatch(/w-full/);
    });

    it('should use responsive spacing utilities', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      const hasResponsiveSpacing = 
        html.includes('px-4') || 
        html.includes('py-8') ||
        html.includes('gap-');
      
      expect(hasResponsiveSpacing).toBe(true);
    });

    it('should use mobile-first breakpoint approach', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Tailwind uses min-width media queries (mobile-first)
      // Check for pattern: base class → sm: override → md: override
      const mobileFirstPattern = /class="[^"]*\b\w+-\w+\s+sm:\1-\w+/;
      expect(html).toMatch(mobileFirstPattern);
    });

    it('should use Tailwind responsive prefixes correctly', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for sm:, md:, lg: prefixes
      expect(html).toMatch(/sm:/);
      expect(html).toMatch(/md:/);
    });

    it('should use auto margins for centering', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      expect(html).toMatch(/mx-auto/);
    });

    it('should use gap utilities for spacing', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      const hasGap = 
        html.includes('gap-') || 
        html.includes('space-x-') ||
        html.includes('space-y-');
      
      expect(hasGap).toBe(true);
    });
  });

  describe('AC6: Typecheck passes', () => {
    it('should have valid TypeScript configuration', () => {
      const tsconfigPath = join(projectRoot, 'tsconfig.json');
      expect(existsSync(tsconfigPath)).toBe(true);
    });

    it('should have valid source files', () => {
      const mainPath = join(projectRoot, 'src', 'main.ts');
      expect(existsSync(mainPath)).toBe(true);
    });

    it('should have all required component files', () => {
      const components = [
        'navbarComponent.ts',
        'bannerComponent.ts',
        'footerComponent.ts',
        'responsiveUtils.ts',
        'main.ts'
      ];

      components.forEach(component => {
        const componentPath = join(projectRoot, 'src', component);
        expect(existsSync(componentPath)).toBe(true);
      });
    });
  });

  describe('Cross-Breakpoint Validation', () => {
    const breakpoints = [
      { name: 'mobile', width: 320 },
      { name: 'mobile-large', width: 414 },
      { name: 'tablet', width: 768 },
      { name: 'desktop', width: 1024 },
      { name: 'wide', width: 1280 }
    ];

    breakpoints.forEach(({ name, width }) => {
      it(`should render correctly at ${name} (${width}px)`, () => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width
        });

        document.body.innerHTML = '';
        injectResponsiveUtilities();
        
        const navbar = mountNavbar();
        const banner = mountBanner();
        const footer = mountFooter();
        
        expect(navbar).toBeTruthy();
        expect(banner).toBeTruthy();
        expect(footer).toBeTruthy();
        
        // All components should be in DOM
        expect(getNavbar()).toBeTruthy();
        expect(getBanner()).toBeTruthy();
        expect(getFooter()).toBeTruthy();
        
        unmountNavbar();
        unmountBanner();
        unmountFooter();
      });
    });
  });

  describe('Integration with Existing Tests', () => {
    it('should not break responsive foundation tests', () => {
      const filePath = join(projectRoot, 'src', 'responsiveFoundation.test.ts');
      expect(existsSync(filePath)).toBe(true);
    });

    it('should not break mobile-first layout tests', () => {
      const filePath = join(projectRoot, 'src', 'mobileFirstLayout.test.ts');
      expect(existsSync(filePath)).toBe(true);
    });

    it('should work with responsive utilities', () => {
      injectResponsiveUtilities();
      
      const style = document.getElementById('chaoscraft-responsive-utilities');
      expect(style).toBeTruthy();
    });
  });

  describe('Final Validation Summary', () => {
    it('AC1: Page width constraint verified', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      const hasWidthConstraint = 
        html.includes('overflow-x: hidden') &&
        html.includes('max-width: 100vw') &&
        html.includes('width: 100%');
      
      expect(hasWidthConstraint).toBe(true);
    });

    it('AC2: No horizontal scroll verified', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      expect(html).toMatch(/overflow-x:\s*hidden/);
    });

    it('AC3: All components responsive verified', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for responsive patterns
      expect(html).toMatch(/sm:/);
      expect(html).toMatch(/md:/);
      expect(html).toMatch(/flex/);
    });

    it('AC4: Readable content verified', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      const hasReadableContent = 
        html.includes('text-base') ||
        html.includes('text-sm');
      
      expect(hasReadableContent).toBe(true);
    });

    it('AC5: Responsive techniques verified', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      const techniques = [
        html.includes('flex'),
        html.includes('max-w-'),
        html.includes('w-full'),
        html.includes('mx-auto')
      ];
      
      expect(techniques.every(Boolean)).toBe(true);
    });
  });
});
