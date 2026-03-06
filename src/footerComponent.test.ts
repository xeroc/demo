/**
 * Tests for Footer Component
 * Story 2: Updated footer with copyright only, no links
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  createFooter,
  mountFooter,
  unmountFooter,
  getFooter,
  DEFAULT_FOOTER_CONFIG
} from './footerComponent';

describe('Footer Component - Story 2 Updated', () => {
  beforeEach(() => {
    unmountFooter();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    unmountFooter();
  });

  describe('Copyright text', () => {
    it('should have copyright with year 2026', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      expect(copyright?.textContent).toContain('2026');
    });

    it('should have correct copyright text', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      expect(copyright?.textContent).toBe('© 2026 ChaosCraft. Built by chaos, one dollar at a time.');
    });

    it('should use default config', () => {
      expect(DEFAULT_FOOTER_CONFIG.copyrightText).toBe('© 2026 ChaosCraft. Built by chaos, one dollar at a time.');
    });

    it('should accept custom copyright text', () => {
      const footer = createFooter({ copyrightText: 'Custom copyright' });
      const copyright = footer.querySelector('p');
      expect(copyright?.textContent).toBe('Custom copyright');
    });
  });

  describe('No navigation links', () => {
    it('should not have any navigation links', () => {
      const footer = createFooter();
      const links = footer.querySelectorAll('a');
      expect(links.length).toBe(0);
    });

    it('should not have nav element', () => {
      const footer = createFooter();
      const nav = footer.querySelector('nav');
      expect(nav).toBeNull();
    });

    it('should not have any buttons', () => {
      const footer = createFooter();
      const buttons = footer.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should have only one paragraph element', () => {
      const footer = createFooter();
      const paragraphs = footer.querySelectorAll('p');
      expect(paragraphs.length).toBe(1);
    });

    it('should have only copyright as content', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('.flex.flex-col');
      expect(contentWrapper?.children.length).toBe(1);
      expect(contentWrapper?.children[0].tagName).toBe('P');
    });
  });

  describe('Responsive design', () => {
    it('should have responsive padding on mobile (px-4)', () => {
      const footer = createFooter();
      const container = footer.querySelector('.max-w-7xl');
      expect(container?.className).toContain('px-4');
    });

    it('should have responsive padding at sm breakpoint (sm:px-6)', () => {
      const footer = createFooter();
      const container = footer.querySelector('.max-w-7xl');
      expect(container?.className).toContain('sm:px-6');
    });

    it('should have responsive padding at lg breakpoint (lg:px-8)', () => {
      const footer = createFooter();
      const container = footer.querySelector('.max-w-7xl');
      expect(container?.className).toContain('lg:px-8');
    });

    it('should have responsive vertical padding (py-6 sm:py-8 md:py-10)', () => {
      const footer = createFooter();
      const container = footer.querySelector('.max-w-7xl');
      expect(container?.className).toContain('py-6');
      expect(container?.className).toContain('sm:py-8');
      expect(container?.className).toContain('md:py-10');
    });

    it('should have max-width constraint (max-w-7xl)', () => {
      const footer = createFooter();
      const container = footer.querySelector('.max-w-7xl');
      expect(container).not.toBeNull();
    });

    it('should be horizontally centered (mx-auto)', () => {
      const footer = createFooter();
      const container = footer.querySelector('.mx-auto');
      expect(container).not.toBeNull();
    });

    it('should have responsive copyright text size', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      expect(copyright?.className).toContain('text-xs');
      expect(copyright?.className).toContain('sm:text-sm');
      expect(copyright?.className).toContain('md:text-base');
    });

    it('should have centered copyright text', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      expect(copyright?.className).toContain('text-center');
    });

    it('should not overflow horizontally on mobile', () => {
      const footer = createFooter();
      document.body.appendChild(footer);
      
      const rect = footer.getBoundingClientRect();
      expect(rect.width).toBeLessThanOrEqual(window.innerWidth);
    });
  });

  describe('Visual styling', () => {
    it('should have semi-transparent background (bg-slate-900/95)', () => {
      const footer = createFooter();
      expect(footer.className).toContain('bg-slate-900/95');
    });

    it('should have backdrop blur (backdrop-blur-md)', () => {
      const footer = createFooter();
      expect(footer.className).toContain('backdrop-blur-md');
    });

    it('should have border separator (border-t border-white/10)', () => {
      const footer = createFooter();
      expect(footer.className).toContain('border-t');
      expect(footer.className).toContain('border-white/10');
    });

    it('should have mt-auto for spacing', () => {
      const footer = createFooter();
      expect(footer.className).toContain('mt-auto');
    });

    it('should have gray text color (text-gray-400)', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      expect(copyright?.className).toContain('text-gray-400');
    });

    it('should use flexbox for layout', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('.flex');
      expect(contentWrapper).not.toBeNull();
    });

    it('should center content vertically', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('.flex-col');
      expect(contentWrapper).not.toBeNull();
    });

    it('should center content horizontally', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('.items-center');
      expect(contentWrapper).not.toBeNull();
    });

    it('should have responsive gap (gap-4 sm:gap-6)', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('.flex');
      expect(contentWrapper?.className).toContain('gap-4');
      expect(contentWrapper?.className).toContain('sm:gap-6');
    });
  });

  describe('Accessibility', () => {
    it('should have proper role attribute (contentinfo)', () => {
      const footer = createFooter();
      expect(footer.getAttribute('role')).toBe('contentinfo');
    });

    it('should have semantic HTML structure', () => {
      const footer = createFooter();
      expect(footer.tagName).toBe('FOOTER');
    });

    it('should have readable text on all screen sizes', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      
      // Minimum 12px on mobile (text-xs)
      expect(copyright?.className).toContain('text-xs');
      // Scales up on larger screens
      expect(copyright?.className).toContain('sm:text-sm');
      expect(copyright?.className).toContain('md:text-base');
    });

    it('should have adequate color contrast', () => {
      const footer = createFooter();
      const copyright = footer.querySelector('p');
      // text-gray-400 provides adequate contrast on dark background
      expect(copyright?.className).toContain('text-gray-400');
    });
  });

  describe('Typecheck', () => {
    it('should accept FooterConfig with copyrightText', () => {
      const config = { copyrightText: 'Test' };
      const footer = createFooter(config);
      expect(footer).toBeDefined();
    });

    it('should accept empty config', () => {
      const footer = createFooter({});
      expect(footer).toBeDefined();
    });

    it('should accept no config', () => {
      const footer = createFooter();
      expect(footer).toBeDefined();
    });

    it('should use Partial<FooterConfig> type', () => {
      const partialConfig: Partial<{ copyrightText: string }> = {
        copyrightText: 'Partial'
      };
      const footer = createFooter(partialConfig);
      expect(footer).toBeDefined();
    });
  });

  describe('Mount functions', () => {
    it('should mount footer to body by default', () => {
      const footer = mountFooter();
      expect(document.body.contains(footer)).toBe(true);
      expect(document.body.lastChild).toBe(footer);
    });

    it('should mount footer to specific container', () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);
      
      const footer = mountFooter('test-container');
      expect(container.contains(footer)).toBe(true);
    });

    it('should return null if container not found', () => {
      const footer = mountFooter('non-existent');
      expect(footer).toBeNull();
    });

    it('should unmount footer', () => {
      mountFooter();
      expect(getFooter()).not.toBeNull();
      
      unmountFooter();
      expect(getFooter()).toBeNull();
    });

    it('should get footer element after mount', () => {
      mountFooter();
      const footer = getFooter();
      expect(footer).not.toBeNull();
      expect(footer?.id).toBe('chaoscraft-footer');
    });

    it('should return null from getFooter if not mounted', () => {
      const footer = getFooter();
      expect(footer).toBeNull();
    });

    it('should handle multiple unmount calls gracefully', () => {
      mountFooter();
      unmountFooter();
      unmountFooter(); // Should not throw
      expect(getFooter()).toBeNull();
    });
  });

  describe('DOM structure', () => {
    it('should have correct ID', () => {
      const footer = createFooter();
      expect(footer.id).toBe('chaoscraft-footer');
    });

    it('should have nested container structure', () => {
      const footer = createFooter();
      
      // footer > div.container > div.flex > p
      const container = footer.querySelector('.max-w-7xl');
      const contentWrapper = container?.querySelector('.flex');
      const paragraph = contentWrapper?.querySelector('p');
      
      expect(paragraph).not.toBeNull();
    });

    it('should have only copyright paragraph in content wrapper', () => {
      const footer = createFooter();
      const contentWrapper = footer.querySelector('.flex.flex-col');
      expect(contentWrapper?.children.length).toBe(1);
      expect(contentWrapper?.children[0].tagName).toBe('P');
    });
  });

  describe('Error handling', () => {
    it('should handle missing container gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const footer = mountFooter('non-existent-container');
      expect(footer).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Footer container with id "non-existent-container" not found'
      );
      
      consoleSpy.mockRestore();
    });

    it('should handle empty body gracefully', () => {
      document.body.innerHTML = '';
      const footer = mountFooter();
      expect(footer).not.toBeNull();
      expect(document.body.contains(footer)).toBe(true);
    });
  });
});
