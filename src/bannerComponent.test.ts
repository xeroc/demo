/**
 * Tests for Banner Component
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  createBanner, 
  mountBanner, 
  unmountBanner, 
  getBanner,
  DEFAULT_BANNER_CONFIG,
  type BannerConfig 
} from './bannerComponent';

describe('Banner Component', () => {
  beforeEach(() => {
    // Clean up any existing banner before each test
    unmountBanner();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    unmountBanner();
  });

  describe('createBanner', () => {
    it('should create a banner element', () => {
      const banner = createBanner();
      expect(banner).toBeInstanceOf(HTMLElement);
      expect(banner.tagName).toBe('DIV');
    });

    it('should have correct id attribute', () => {
      const banner = createBanner();
      expect(banner.id).toBe('chaoscraft-banner');
    });

    it('should have role="banner"', () => {
      const banner = createBanner();
      expect(banner.getAttribute('role')).toBe('banner');
    });

    it('should have aria-label for accessibility', () => {
      const banner = createBanner();
      const ariaLabel = banner.getAttribute('aria-label');
      expect(ariaLabel).toContain('ChaosCraft');
      expect(ariaLabel).toContain('participation');
    });

    it('should display default message', () => {
      const banner = createBanner();
      expect(banner.textContent).toContain(DEFAULT_BANNER_CONFIG.message);
    });

    it('should contain a link to app.chaoscraft.dev', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      expect(link).not.toBeNull();
      expect(link?.href).toBe('https://app.chaoscraft.dev/');
    });

    it('should open link in new tab', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      expect(link?.target).toBe('_blank');
    });

    it('should have rel="noopener noreferrer" for security', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      expect(link?.rel).toContain('noopener');
      expect(link?.rel).toContain('noreferrer');
    });

    it('should have aria-label on link for accessibility', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      const ariaLabel = link?.getAttribute('aria-label');
      expect(ariaLabel).toContain('opens in a new tab');
    });

    it('should accept custom message', () => {
      const customMessage = 'Custom banner message';
      const banner = createBanner({ message: customMessage });
      expect(banner.textContent).toContain(customMessage);
    });

    it('should accept custom link URL', () => {
      const customUrl = 'https://custom.example.com';
      const banner = createBanner({ linkUrl: customUrl });
      const link = banner.querySelector('a');
      expect(link?.href).toBe(customUrl + '/');
    });

    it('should accept custom link text', () => {
      const customLinkText = 'Join now!';
      const banner = createBanner({ linkText: customLinkText });
      const link = banner.querySelector('a');
      expect(link?.textContent).toBe(customLinkText);
    });

    it('should use Tailwind CSS classes for styling', () => {
      const banner = createBanner();
      expect(banner.className).toContain('bg-gradient-to-r');
      expect(banner.className).toContain('text-white');
      expect(banner.className).toContain('py-3');
      expect(banner.className).toContain('px-4');
      expect(banner.className).toContain('text-center');
    });

    it('should have responsive layout classes', () => {
      const banner = createBanner();
      const contentDiv = banner.querySelector('div');
      expect(contentDiv?.className).toContain('flex');
      expect(contentDiv?.className).toContain('sm:flex-row');
    });
  });

  describe('mountBanner', () => {
    it('should mount banner to body by default', () => {
      const banner = mountBanner();
      expect(banner).not.toBeNull();
      expect(document.body.firstChild).toBe(banner);
    });

    it('should mount banner at the top of the page', () => {
      // Add some content to body first
      const existingContent = document.createElement('div');
      existingContent.id = 'existing-content';
      document.body.appendChild(existingContent);
      
      const banner = mountBanner();
      expect(document.body.firstChild).toBe(banner);
    });

    it('should mount banner to specific container by ID', () => {
      const container = document.createElement('div');
      container.id = 'banner-container';
      document.body.appendChild(container);
      
      const banner = mountBanner('banner-container');
      expect(banner).not.toBeNull();
      expect(container.contains(banner)).toBe(true);
    });

    it('should return null if container not found', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const banner = mountBanner('non-existent-container');
      expect(banner).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should pass config to createBanner', () => {
      const customMessage = 'Custom mounted message';
      const banner = mountBanner(undefined, { message: customMessage });
      expect(banner?.textContent).toContain(customMessage);
    });
  });

  describe('unmountBanner', () => {
    it('should remove banner from DOM', () => {
      mountBanner();
      expect(getBanner()).not.toBeNull();
      
      unmountBanner();
      expect(getBanner()).toBeNull();
    });

    it('should handle case when no banner exists', () => {
      // Should not throw error
      expect(() => unmountBanner()).not.toThrow();
    });
  });

  describe('getBanner', () => {
    it('should return null when no banner mounted', () => {
      expect(getBanner()).toBeNull();
    });

    it('should return banner element when mounted', () => {
      mountBanner();
      const banner = getBanner();
      expect(banner).not.toBeNull();
      expect(banner?.id).toBe('chaoscraft-banner');
    });
  });

  describe('DEFAULT_BANNER_CONFIG', () => {
    it('should have default message', () => {
      expect(DEFAULT_BANNER_CONFIG.message).toContain('chaoscraft.dev');
      expect(DEFAULT_BANNER_CONFIG.message).toContain('modified');
    });

    it('should have default link URL', () => {
      expect(DEFAULT_BANNER_CONFIG.linkUrl).toBe('https://app.chaoscraft.dev');
    });

    it('should have default link text', () => {
      expect(DEFAULT_BANNER_CONFIG.linkText).toBeTruthy();
    });
  });

  describe('Acceptance Criteria', () => {
    it('AC1: Banner component file exists in the appropriate components directory', () => {
      // This test passes if the module imports successfully
      expect(createBanner).toBeDefined();
      expect(mountBanner).toBeDefined();
      expect(unmountBanner).toBeDefined();
    });

    it('AC2: Banner displays message explaining site can be modified by chaoscraft.dev participants', () => {
      const banner = createBanner();
      const text = banner.textContent || '';
      expect(text.toLowerCase()).toContain('modified');
      expect(text.toLowerCase()).toContain('chaoscraft.dev');
      expect(text.toLowerCase()).toContain('participating');
    });

    it('AC3: Banner contains a clickable link to app.chaoscraft.dev that opens in a new tab', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      
      expect(link).not.toBeNull();
      expect(link?.href).toContain('app.chaoscraft.dev');
      expect(link?.target).toBe('_blank');
    });

    it('AC4: Link has appropriate aria-label for accessibility', () => {
      const banner = createBanner();
      const link = banner.querySelector('a');
      const ariaLabel = link?.getAttribute('aria-label');
      
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel).toContain('opens in a new tab');
    });

    it('AC5: Banner component accepts props for customization (optional message, link URL)', () => {
      const customConfig: Partial<BannerConfig> = {
        message: 'Test message',
        linkUrl: 'https://test.com',
        linkText: 'Test link'
      };
      
      const banner = createBanner(customConfig);
      const link = banner.querySelector('a');
      
      expect(banner.textContent).toContain('Test message');
      expect(link?.href).toBe('https://test.com/');
      expect(link?.textContent).toBe('Test link');
    });

    it('AC6: Component renders without errors', () => {
      expect(() => createBanner()).not.toThrow();
      expect(() => mountBanner()).not.toThrow();
      expect(() => unmountBanner()).not.toThrow();
    });
  });
});
