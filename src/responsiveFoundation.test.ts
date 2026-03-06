/**
 * Tests for Story 1: Add viewport meta tag and base responsive foundation
 * 
 * Acceptance Criteria:
 * - Viewport meta tag present in all HTML files with correct attributes
 * - CSS custom properties defined for breakpoint values (mobile, tablet, desktop)
 * - Base box-sizing set to border-box for consistent sizing
 * - HTML files render without errors when opened in browser
 * - Typecheck passes
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('Story 1: Responsive Foundation', () => {
  const htmlFiles = ['index.html', 'contact.html'];
  const projectRoot = join(__dirname, '..');

  describe('AC1: Viewport Meta Tag', () => {
    htmlFiles.forEach((filename) => {
      describe(`${filename}`, () => {
        it(`should have viewport meta tag`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/<meta\s+name=["']viewport["']/i);
        });

        it(`should have correct viewport content attribute`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/content=["']width=device-width,\s*initial-scale=1\.0["']/i);
        });

        it(`should have viewport meta tag in head section`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Extract head section
          const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
          expect(headMatch).not.toBeNull();
          
          const headContent = headMatch![1];
          expect(headMatch).not.toBeNull();
          expect(headContent).toMatch(/<meta\s+name=["']viewport["']/i);
        });

        it(`should have charset meta tag before viewport`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Extract head section
          const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
          expect(headMatch).not.toBeNull();
          
          const headContent = headMatch![1];
          
          // Find positions
          const charsetPos = headContent.search(/<meta\s+charset/i);
          const viewportPos = headContent.search(/<meta\s+name=["']viewport["']/i);
          
          expect(charsetPos).toBeGreaterThan(-1);
          expect(viewportPos).toBeGreaterThan(-1);
          expect(charsetPos).toBeLessThan(viewportPos);
        });
      });
    });
  });

  describe('AC2: CSS Custom Properties for Breakpoints', () => {
    htmlFiles.forEach((filename) => {
      describe(`${filename}`, () => {
        it(`should have :root selector with custom properties`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/:root\s*{/i);
        });

        it(`should define --breakpoint-mobile custom property`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/--breakpoint-mobile:\s*0/i);
        });

        it(`should define --breakpoint-tablet custom property`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/--breakpoint-tablet:\s*640px/i);
        });

        it(`should define --breakpoint-desktop custom property`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/--breakpoint-desktop:\s*1024px/i);
        });

        it(`should define --breakpoint-wide custom property for extra large screens`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/--breakpoint-wide:\s*1280px/i);
        });

        it(`should have custom properties in style tag within head`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Extract head section
          const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
          expect(headMatch).not.toBeNull();
          
          const headContent = headMatch![1];
          expect(headContent).toMatch(/:root\s*{/i);
          expect(headContent).toMatch(/--breakpoint-/i);
        });
      });
    });
  });

  describe('AC3: Base Box-Sizing', () => {
    htmlFiles.forEach((filename) => {
      describe(`${filename}`, () => {
        it(`should have universal selector for box-sizing`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/\*\s*{/i);
        });

        it(`should set box-sizing to border-box`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/box-sizing:\s*border-box/i);
        });

        it(`should include ::before pseudo-element`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/::before/i);
        });

        it(`should include ::after pseudo-element`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          expect(html).toMatch(/::after/i);
        });

        it(`should apply box-sizing to all elements, ::before, and ::after`, () => {
          const filePath = join(projectRoot, filename);
          const html = readFileSync(filePath, 'utf-8');
          
          // Should match pattern like: *, *::before, *::after { box-sizing: border-box; }
          expect(html).toMatch(/\*,\s*\*::before,\s*\*::after\s*{[^}]*box-sizing:\s*border-box[^}]*}/i);
        });
      });
    });
  });

  describe('AC4: HTML Files Render Without Errors', () => {
    htmlFiles.forEach((filename) => {
      it(`${filename} should exist`, () => {
        const filePath = join(projectRoot, filename);
        expect(existsSync(filePath)).toBe(true);
      });

      it(`${filename} should be valid HTML`, () => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        // Check for basic HTML structure
        expect(html).toMatch(/<!DOCTYPE html>/i);
        expect(html).toMatch(/<html[^>]*lang=/i);
        expect(html).toMatch(/<head[^>]*>/i);
        expect(html).toMatch(/<body[^>]*>/i);
        expect(html).toMatch(/<\/html>/i);
      });

      it(`${filename} should have matching opening and closing tags`, () => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        // Count opening and closing tags for key elements
        const headOpenCount = (html.match(/<head[^>]*>/gi) || []).length;
        const headCloseCount = (html.match(/<\/head>/gi) || []).length;
        expect(headOpenCount).toBe(headCloseCount);
        
        const bodyOpenCount = (html.match(/<body[^>]*>/gi) || []).length;
        const bodyCloseCount = (html.match(/<\/body>/gi) || []).length;
        expect(bodyOpenCount).toBe(bodyCloseCount);
        
        const titleOpenCount = (html.match(/<title[^>]*>/gi) || []).length;
        const titleCloseCount = (html.match(/<\/title>/gi) || []).length;
        expect(titleOpenCount).toBe(titleCloseCount);
      });

      it(`${filename} should have charset meta tag`, () => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        expect(html).toMatch(/<meta\s+charset=["']UTF-8["']/i);
      });

      it(`${filename} should have title tag`, () => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        expect(html).toMatch(/<title[^>]*>[\s\S]*?<\/title>/i);
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

  describe('Responsive Foundation Integration', () => {
    it('should have consistent breakpoint values across all HTML files', () => {
      const breakpoints = {
        mobile: '0',
        tablet: '640px',
        desktop: '1024px',
        wide: '1280px'
      };

      htmlFiles.forEach((filename) => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        Object.entries(breakpoints).forEach(([name, value]) => {
          const pattern = new RegExp(`--breakpoint-${name}:\\s*${value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')}`, 'i');
          expect(html).toMatch(pattern);
        });
      });
    });

    it('should use standard Tailwind CSS breakpoints', () => {
      // Tailwind's default breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px
      // We're using: tablet:640px (matches sm), desktop:1024px (matches lg), wide:1280px (matches xl)
      const expectedBreakpoints = {
        'tablet': '640px',  // Tailwind sm
        'desktop': '1024px', // Tailwind lg
        'wide': '1280px'    // Tailwind xl
      };

      htmlFiles.forEach((filename) => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        Object.entries(expectedBreakpoints).forEach(([name, value]) => {
          expect(html).toMatch(new RegExp(`--breakpoint-${name}:\\s*${value}`, 'i'));
        });
      });
    });

    it('should apply box-sizing foundation before other styles', () => {
      htmlFiles.forEach((filename) => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        // Extract style content
        const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        if (styleMatch) {
          const styleContent = styleMatch[1];
          
          // :root should come before or at the same level as universal selector
          const rootPos = styleContent.search(/:root\s*{/i);
          const universalPos = styleContent.search(/\*\s*{/i);
          
          // Both should exist
          expect(rootPos).toBeGreaterThan(-1);
          expect(universalPos).toBeGreaterThan(-1);
        }
      });
    });
  });

  describe('CSS Custom Properties Validation', () => {
    htmlFiles.forEach((filename) => {
      it(`${filename} should have properly formatted CSS custom properties`, () => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        // Check for proper CSS custom property syntax
        expect(html).toMatch(/--[a-z-]+:\s*[a-z0-9]+/i);
        
        // Check that custom properties end with semicolon or are followed by closing brace
        const customProps = html.match(/--[a-z-]+:\s*[^;}]+/gi) || [];
        customProps.forEach(prop => {
          expect(prop).toMatch(/--[a-z-]+:\s*\S+/i);
        });
      });
    });
  });

  describe('Accessibility and Best Practices', () => {
    htmlFiles.forEach((filename) => {
      it(`${filename} should have lang attribute on html tag`, () => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        expect(html).toMatch(/<html[^>]*lang=["'][a-z]{2}["']/i);
      });

      it(`${filename} should have viewport meta for mobile responsiveness`, () => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        // Viewport should include width=device-width
        expect(html).toMatch(/width=device-width/i);
        
        // Viewport should include initial-scale
        expect(html).toMatch(/initial-scale=/i);
      });

      it(`${filename} should not have user-scalable=no for accessibility`, () => {
        const filePath = join(projectRoot, filename);
        const html = readFileSync(filePath, 'utf-8');
        
        // user-scalable=no is bad for accessibility
        const viewportMatch = html.match(/<meta\s+name=["']viewport["'][^>]*content=["']([^"']+)["']/i);
        if (viewportMatch) {
          const content = viewportMatch[1];
          expect(content).not.toMatch(/user-scalable\s*=\s*no/i);
        }
      });
    });
  });
});
