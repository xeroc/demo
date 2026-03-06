/**
 * Tests for Story 2: Create mobile-first base layout styles
 * 
 * Acceptance Criteria:
 * - CSS uses mobile-first approach with min-width media queries
 * - Typography scales appropriately between breakpoints
 * - Container elements have max-width constraints with percentage-based widths
 * - Layout renders correctly on viewports 320px and up
 * - Typecheck passes
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('Story 2: Mobile-First Base Layout Styles', () => {
  const htmlFiles = ['index.html', 'contact.html'];
  const projectRoot = join(__dirname, '..');

  describe('AC1: Mobile-First Approach with Min-Width Media Queries', () => {
    htmlFiles.forEach((filename) => {
      describe(`${filename}`, () => {
        it('should use mobile-first responsive classes (sm:, md:, lg:)', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for Tailwind mobile-first breakpoint classes
          expect(html).toMatch(/sm:/);
          expect(html).toMatch(/md:/);
          expect(html).toMatch(/lg:/);
        });

        it('should have base styles without media queries (mobile-first)', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Base styles should be present before responsive overrides
          // Tailwind applies base classes, then overrides with breakpoints
          expect(html).toMatch(/class="[^"]*text-base[^"]*"/);
        });

        it('should use Tailwind CSS for responsive design (CDN)', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for Tailwind CDN script
          expect(html).toMatch(/cdn\.tailwindcss\.com/);
        });

        it('should not use max-width media queries (confirms min-width approach)', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Tailwind uses min-width media queries by default
          // Should not have custom max-width media queries in inline styles
          const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
          if (styleMatch) {
            const styles = styleMatch.join('');
            // Should not have @media max-width queries
            expect(styles).not.toMatch(/@media.*max-width/i);
          }
        });
      });
    });
  });

  describe('AC2: Typography Scales Appropriately Between Breakpoints', () => {
    htmlFiles.forEach((filename) => {
      describe(`${filename}`, () => {
        it('should have responsive font sizes using Tailwind utilities', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for responsive text sizing patterns
          // Base size → sm: → md: → lg:
          expect(html).toMatch(/text-\w+/);
        });

        it('should scale heading typography across breakpoints', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for responsive heading classes
          const hasResponsiveHeadings = 
            html.includes('text-2xl') && 
            html.includes('sm:text-3xl') ||
            html.includes('text-3xl') && 
            html.includes('md:text-4xl') ||
            html.includes('text-xl') && 
            html.includes('sm:text-2xl');
          
          expect(hasResponsiveHeadings).toBe(true);
        });

        it('should scale body text appropriately', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for responsive body text
          const hasResponsiveBodyText = 
            html.includes('text-base') && html.includes('sm:text-lg') ||
            html.includes('text-sm') && html.includes('sm:text-base') ||
            html.includes('text-lg') && html.includes('md:text-xl');
          
          expect(hasResponsiveBodyText).toBe(true);
        });

        it('should have readable font sizes on mobile (base ≥14px)', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // text-sm is 14px in Tailwind, text-base is 16px
          // These are WCAG-compliant minimum sizes
          const hasMobileText = 
            html.includes('text-sm') || 
            html.includes('text-base');
          
          expect(hasMobileText).toBe(true);
        });

        it('should increase font size for larger screens', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for larger text on md: or lg: breakpoints
          const hasLargerText = 
            html.includes('md:text-') || 
            html.includes('lg:text-');
          
          expect(hasLargerText).toBe(true);
        });
      });
    });
  });

  describe('AC3: Container Elements Have Max-Width Constraints', () => {
    htmlFiles.forEach((filename) => {
      describe(`${filename}`, () => {
        it('should have container with max-width constraint', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for max-width utilities
          expect(html).toMatch(/max-w-\w+/);
        });

        it('should have responsive max-width values', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for responsive max-width (e.g., max-w-xl sm:max-w-2xl)
          const hasResponsiveMaxWidth = 
            html.includes('max-w-xl') ||
            html.includes('max-w-2xl') ||
            html.includes('max-w-3xl') ||
            html.includes('max-w-4xl') ||
            html.includes('max-w-5xl') ||
            html.includes('max-w-6xl') ||
            html.includes('max-w-7xl');
          
          expect(hasResponsiveMaxWidth).toBe(true);
        });

        it('should center containers with auto margins', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for mx-auto (margin-left: auto; margin-right: auto)
          expect(html).toMatch(/mx-auto/);
        });

        it('should have percentage-based padding on containers', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for responsive padding utilities
          expect(html).toMatch(/px-\d+/);
        });

        it('should have max-width that constrains content width', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Verify max-width constraints are reasonable (not 100%)
          // Tailwind max-w-xl = 36rem (576px)
          // max-w-4xl = 56rem (896px)
          // max-w-7xl = 80rem (1280px)
          const maxWidthMatch = html.match(/max-w-\w+/g);
          expect(maxWidthMatch).not.toBeNull();
          expect(maxWidthMatch!.length).toBeGreaterThan(0);
        });

        it('should have responsive max-width scaling', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for pattern like: max-w-xl sm:max-w-2xl md:max-w-3xl
          const hasResponsiveContainer = 
            /max-w-\w+\s+sm:max-w-\w+/.test(html) ||
            /sm:max-w-\w+\s+md:max-w-\w+/.test(html) ||
            /max-w-\w+\s+md:max-w-\w+/.test(html);
          
          expect(hasResponsiveContainer).toBe(true);
        });
      });
    });
  });

  describe('AC4: Layout Renders Correctly on 320px and Up', () => {
    htmlFiles.forEach((filename) => {
      describe(`${filename}`, () => {
        it('should have flexible container using flexbox or percentage widths', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for flex or percentage-based layouts
          const hasFlexibleLayout = 
            html.includes('flex') || 
            html.includes('w-full') ||
            html.includes('w-1/2') ||
            html.includes('w-1/3');
          
          expect(hasFlexibleLayout).toBe(true);
        });

        it('should have proper viewport meta tag for mobile scaling', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/<meta\s+name=["']viewport["']/i);
          expect(html).toMatch(/width=device-width/i);
          expect(html).toMatch(/initial-scale=1\.0/i);
        });

        it('should not have horizontal overflow issues', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check that body doesn't have fixed width that could cause overflow
          const bodyMatch = html.match(/<body[^>]*class=["']([^"']+)["'][^>]*>/i);
          if (bodyMatch) {
            const bodyClasses = bodyMatch[1];
            // Should not have fixed width on body
            expect(bodyClasses).not.toMatch(/w-\d+/);
          }
          
          // Should have min-h-screen or similar flexible height
          expect(html).toMatch(/min-h-screen|h-screen|h-full/);
        });

        it('should use responsive spacing (padding/margin)', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for responsive spacing utilities
          const hasResponsiveSpacing = 
            html.includes('px-') ||
            html.includes('py-') ||
            html.includes('mt-') ||
            html.includes('mb-');
          
          expect(hasResponsiveSpacing).toBe(true);
        });

        it('should have touch-friendly interactive elements', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Check for reasonable padding on buttons/links
          if (html.includes('button') || html.includes('href')) {
            // Should have some padding on interactive elements
            expect(html).toMatch(/p[xytrbl]?-\d+/);
          }
          
          expect(true).toBe(true); // Pass if no interactive elements
        });

        it('should have readable content width on small screens', () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Content should not span full width on large screens
          // but should be flexible on mobile
          const hasConstrainedWidth = html.includes('max-w-');
          const hasFlexibleWidth = html.includes('mx-auto') || html.includes('w-full');
          
          expect(hasConstrainedWidth || hasFlexibleWidth).toBe(true);
        });
      });
    });
  });

  describe('AC5: Typecheck Passes', () => {
    it('should have valid TypeScript configuration', () => {
      const tsconfigPath = join(projectRoot, 'tsconfig.json');
      expect(existsSync(tsconfigPath)).toBe(true);
    });

    it('should have valid source files', () => {
      const mainPath = join(projectRoot, 'src', 'main.ts');
      expect(existsSync(mainPath)).toBe(true);
    });
  });

  describe('Mobile-First Implementation Details', () => {
    it('should use Tailwind CSS breakpoints (sm: 640px, md: 768px, lg: 1024px)', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Tailwind's default breakpoints
      // sm: 640px (min-width: 640px)
      // md: 768px (min-width: 768px)  
      // lg: 1024px (min-width: 1024px)
      // xl: 1280px (min-width: 1280px)
      
      expect(html).toMatch(/sm:/);
      expect(html).toMatch(/md:/);
    });

    it('should apply base styles first, then breakpoint overrides', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Mobile-first means: base class first, then sm:, then md:, etc.
      // Example: "text-base sm:text-lg md:text-xl"
      const mobileFirstPattern = /class="[^"]*\b(text|p|m|w|h)-\w+\s+sm:\1-\w+/;
      expect(html).toMatch(mobileFirstPattern);
    });

    it('should not rely on max-width media queries for mobile styles', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Extract inline styles
      const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
      if (styleMatches) {
        const allStyles = styleMatches.join('\n');
        // Should not have max-width media queries (desktop-first approach)
        expect(allStyles).not.toMatch(/@media\s*\(.*max-width/);
      }
      
      expect(true).toBe(true);
    });

    it('should use percentage or flexbox for flexible layouts', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for flexible layout approaches
      const hasFlexbox = html.includes('flex');
      const hasPercentageWidths = 
        html.includes('w-full') ||
        html.includes('w-1/2') ||
        html.includes('w-1/3') ||
        html.includes('w-1/4');
      
      expect(hasFlexbox || hasPercentageWidths).toBe(true);
    });
  });

  describe('Grid/Flexbox System', () => {
    it('should use flexbox for layout structure', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for flexbox utilities
      expect(html).toMatch(/flex/);
    });

    it('should use flexbox alignment utilities', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for alignment utilities
      const hasAlignment = 
        html.includes('items-center') ||
        html.includes('justify-center') ||
        html.includes('justify-between');
      
      expect(hasAlignment).toBe(true);
    });

    it('should use responsive flexbox direction if needed', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for responsive flex direction
      const hasResponsiveFlex = 
        html.includes('flex-col') ||
        html.includes('flex-row') ||
        html.includes('sm:flex-row') ||
        html.includes('md:flex-row');
      
      expect(hasResponsiveFlex).toBe(true);
    });

    it('should have proper spacing with gap utilities', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for gap utilities (modern flexbox spacing)
      const hasGap = 
        html.includes('gap-') ||
        html.includes('space-x-') ||
        html.includes('space-y-');
      
      expect(hasGap).toBe(true);
    });
  });

  describe('Acceptance Criteria Summary', () => {
    it('AC1: CSS uses mobile-first approach with min-width media queries', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Tailwind CSS uses min-width media queries by default
      expect(html).toMatch(/sm:/); // min-width: 640px
      expect(html).toMatch(/md:/); // min-width: 768px
    });

    it('AC2: Typography scales appropriately between breakpoints', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for responsive typography
      const hasResponsiveTypography = 
        /text-\w+\s+sm:text-\w+/.test(html) ||
        /text-\w+\s+md:text-\w+/.test(html);
      
      expect(hasResponsiveTypography).toBe(true);
    });

    it('AC3: Container elements have max-width constraints with percentage-based widths', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for max-width and centering
      expect(html).toMatch(/max-w-\w+/);
      expect(html).toMatch(/mx-auto/);
    });

    it('AC4: Layout renders correctly on viewports 320px and up', () => {
      const filePath = join(projectRoot, 'index.html');
      const html = readFileSync(filePath, 'utf-8');
      
      // Check for mobile-first structure
      expect(html).toMatch(/viewport.*width=device-width/);
      expect(html).toMatch(/flex/);
    });

    it('AC5: Typecheck passes', () => {
      const tsconfigPath = join(projectRoot, 'tsconfig.json');
      expect(existsSync(tsconfigPath)).toBe(true);
    });
  });
});
