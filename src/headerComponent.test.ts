/**
 * Tests for Header Component
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  createHeader,
  mountHeader,
  unmountHeader,
  getHeader,
  setActiveNavItem,
  DEFAULT_HEADER_CONFIG,
  type HeaderConfig,
  type NavItem
} from './headerComponent';

describe('Header Component', () => {
  beforeEach(() => {
    // Clean up any existing header
    unmountHeader();
    // Clear the document body
    document.body.innerHTML = '';
  });

  afterEach(() => {
    unmountHeader();
  });

  describe('createHeader', () => {
    it('should create a header element', () => {
      const header = createHeader();
      expect(header).toBeInstanceOf(HTMLElement);
      expect(header.tagName).toBe('HEADER');
    });

    it('should have correct id', () => {
      const header = createHeader();
      expect(header.id).toBe('chaoscraft-header');
    });

    it('should have role="banner"', () => {
      const header = createHeader();
      expect(header.getAttribute('role')).toBe('banner');
    });

    it('should use default config when no config provided', () => {
      const header = createHeader();
      expect(header.textContent).toContain(DEFAULT_HEADER_CONFIG.logoText);
    });

    it('should use custom config when provided', () => {
      const config: Partial<HeaderConfig> = {
        logoText: 'CustomLogo',
        navItems: [
          { label: 'Page1', href: '/page1' },
          { label: 'Page2', href: '/page2' }
        ]
      };
      const header = createHeader(config);
      expect(header.textContent).toContain('CustomLogo');
      expect(header.textContent).toContain('Page1');
      expect(header.textContent).toContain('Page2');
    });

    it('should display logo text', () => {
      const header = createHeader({ logoText: 'TestSite' });
      expect(header.textContent).toContain('TestSite');
    });

    it('should include emoji icon in logo', () => {
      const header = createHeader();
      const logoIcon = header.querySelector('.text-2xl');
      expect(logoIcon).not.toBeNull();
      expect(logoIcon?.textContent).toBe('🌌');
    });
  });

  describe('Navigation Items', () => {
    it('should create navigation links', () => {
      const navItems: NavItem[] = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' }
      ];
      const header = createHeader({ navItems });
      const links = header.querySelectorAll('a[href="/"], a[href="/about"]');
      expect(links.length).toBeGreaterThanOrEqual(2);
    });

    it('should mark active navigation item', () => {
      const navItems: NavItem[] = [
        { label: 'Home', href: '/', isActive: true },
        { label: 'About', href: '/about' }
      ];
      const header = createHeader({ navItems });
      const activeLink = header.querySelector('a[aria-current="page"]');
      expect(activeLink).not.toBeNull();
      expect(activeLink?.textContent).toContain('Home');
    });

    it('should create desktop navigation', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      expect(desktopNav).not.toBeNull();
      expect(desktopNav?.className).toContain('hidden');
      expect(desktopNav?.className).toContain('md:flex');
    });

    it('should create mobile navigation', () => {
      const header = createHeader();
      const mobileNav = header.querySelector('nav[aria-label="Mobile navigation"]');
      expect(mobileNav).not.toBeNull();
    });
  });

  describe('Mobile Menu Button', () => {
    it('should create hamburger menu button for mobile', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button[aria-controls="mobile-menu"]');
      expect(menuButton).not.toBeNull();
    });

    it('should have correct aria attributes on menu button', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button[aria-controls="mobile-menu"]');
      expect(menuButton?.getAttribute('aria-expanded')).toBe('false');
      expect(menuButton?.getAttribute('aria-label')).toContain('Open');
    });

    it('should show hamburger icon by default', () => {
      const header = createHeader();
      const hamburgerIcon = header.querySelector('.hamburger-icon');
      expect(hamburgerIcon?.classList.contains('hidden')).toBe(false);
    });

    it('should hide close icon by default', () => {
      const header = createHeader();
      const closeIcon = header.querySelector('.close-icon');
      expect(closeIcon?.classList.contains('hidden')).toBe(true);
    });

    it('should toggle menu on button click', () => {
      const header = createHeader();
      document.body.appendChild(header);
      
      const menuButton = header.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
      const mobileMenu = header.querySelector('#mobile-menu');
      
      expect(mobileMenu?.classList.contains('hidden')).toBe(true);
      
      menuButton?.click();
      
      expect(mobileMenu?.classList.contains('hidden')).toBe(false);
      expect(menuButton?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should toggle icons on menu toggle', () => {
      const header = createHeader();
      document.body.appendChild(header);
      
      const menuButton = header.querySelector('button[aria-controls="mobile-menu"]') as HTMLButtonElement;
      const hamburgerIcon = header.querySelector('.hamburger-icon');
      const closeIcon = header.querySelector('.close-icon');
      
      menuButton?.click();
      
      expect(hamburgerIcon?.classList.contains('hidden')).toBe(true);
      expect(closeIcon?.classList.contains('hidden')).toBe(false);
    });
  });

  describe('mountHeader', () => {
    it('should mount header to document body', () => {
      const header = mountHeader();
      expect(header).not.toBeNull();
      expect(document.getElementById('chaoscraft-header')).not.toBeNull();
    });

    it('should mount header to specific container', () => {
      const container = document.createElement('div');
      container.id = 'header-container';
      document.body.appendChild(container);
      
      const header = mountHeader('header-container');
      expect(header).not.toBeNull();
      expect(container.contains(header)).toBe(true);
    });

    it('should return null if container not found', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const header = mountHeader('non-existent');
      expect(header).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should insert header after banner if banner exists', () => {
      const banner = document.createElement('div');
      banner.id = 'chaoscraft-banner';
      document.body.appendChild(banner);
      
      const header = mountHeader();
      expect(header).not.toBeNull();
      expect(document.body.children[0]).toBe(banner);
      expect(document.body.children[1]).toBe(header);
    });

    it('should mount at beginning of body if no banner', () => {
      const header = mountHeader();
      expect(document.body.firstChild).toBe(header);
    });
  });

  describe('unmountHeader', () => {
    it('should remove header from DOM', () => {
      mountHeader();
      expect(document.getElementById('chaoscraft-header')).not.toBeNull();
      
      unmountHeader();
      expect(document.getElementById('chaoscraft-header')).toBeNull();
    });

    it('should do nothing if header not mounted', () => {
      expect(() => unmountHeader()).not.toThrow();
    });
  });

  describe('getHeader', () => {
    it('should return null if header not mounted', () => {
      expect(getHeader()).toBeNull();
    });

    it('should return header element if mounted', () => {
      mountHeader();
      const header = getHeader();
      expect(header).not.toBeNull();
      expect(header?.id).toBe('chaoscraft-header');
    });
  });

  describe('setActiveNavItem', () => {
    it('should update active navigation item', () => {
      const navItems: NavItem[] = [
        { label: 'Home', href: '/', isActive: true },
        { label: 'Contact', href: '/contact', isActive: false }
      ];
      mountHeader({ navItems });
      
      setActiveNavItem('/contact');
      
      const header = getHeader();
      const activeLinks = header?.querySelectorAll('a[aria-current="page"]');
      activeLinks?.forEach(link => {
        expect(link.getAttribute('href')).toBe('/contact');
      });
    });

    it('should do nothing if header not mounted', () => {
      expect(() => setActiveNavItem('/test')).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on navigation', () => {
      const header = createHeader();
      const navElements = header.querySelectorAll('nav');
      
      navElements.forEach(nav => {
        expect(nav.hasAttribute('aria-label')).toBe(true);
      });
    });

    it('should have aria-current="page" on active items', () => {
      const navItems: NavItem[] = [
        { label: 'Home', href: '/', isActive: true }
      ];
      const header = createHeader({ navItems });
      const activeLink = header.querySelector('a[aria-current="page"]');
      expect(activeLink).not.toBeNull();
    });

    it('should have aria-controls on menu button', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button');
      expect(menuButton?.hasAttribute('aria-controls')).toBe(true);
    });

    it('should have aria-expanded attribute on menu button', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button');
      expect(menuButton?.hasAttribute('aria-expanded')).toBe(true);
    });

    it('should update aria-label on menu button when toggled', () => {
      const header = createHeader();
      document.body.appendChild(header);
      
      const menuButton = header.querySelector('button') as HTMLButtonElement;
      
      menuButton.click();
      expect(menuButton.getAttribute('aria-label')).toContain('Close');
      
      menuButton.click();
      expect(menuButton.getAttribute('aria-label')).toContain('Open');
    });
  });

  describe('Responsive Classes', () => {
    it('should hide desktop nav on mobile', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      expect(desktopNav?.className).toContain('hidden');
    });

    it('should show desktop nav on md breakpoint and up', () => {
      const header = createHeader();
      const desktopNav = header.querySelector('nav[aria-label="Main navigation"]');
      expect(desktopNav?.className).toContain('md:flex');
    });

    it('should show hamburger button only on mobile', () => {
      const header = createHeader();
      const menuButton = header.querySelector('button');
      expect(menuButton?.className).toContain('md:hidden');
    });

    it('should hide mobile menu by default', () => {
      const header = createHeader();
      const mobileMenu = header.querySelector('#mobile-menu');
      expect(mobileMenu?.classList.contains('hidden')).toBe(true);
    });

    it('should hide mobile nav on md breakpoint and up', () => {
      const header = createHeader();
      const mobileMenu = header.querySelector('#mobile-menu');
      expect(mobileMenu?.className).toContain('md:hidden');
    });

    it('should have sticky positioning', () => {
      const header = createHeader();
      expect(header.className).toContain('sticky');
      expect(header.className).toContain('top-0');
    });

    it('should have high z-index for stacking', () => {
      const header = createHeader();
      expect(header.className).toContain('z-50');
    });

    it('should use backdrop blur', () => {
      const header = createHeader();
      expect(header.className).toContain('backdrop-blur');
    });

    it('should have responsive padding on container', () => {
      const header = createHeader();
      const container = header.querySelector('.max-w-7xl');
      expect(container?.className).toContain('px-4');
      expect(container?.className).toContain('sm:px-6');
      expect(container?.className).toContain('lg:px-8');
    });

    it('should have responsive logo text size', () => {
      const header = createHeader();
      const logoText = header.querySelector('.text-lg');
      expect(logoText?.className).toContain('sm:text-xl');
    });
  });

  describe('Escape Key Handler', () => {
    it('should close mobile menu on Escape key', () => {
      const header = createHeader();
      document.body.appendChild(header);
      
      const menuButton = header.querySelector('button') as HTMLButtonElement;
      const mobileMenu = header.querySelector('#mobile-menu');
      
      // Open menu
      menuButton.click();
      expect(mobileMenu?.classList.contains('hidden')).toBe(false);
      
      // Press Escape
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      
      expect(mobileMenu?.classList.contains('hidden')).toBe(true);
      expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('should not affect menu if already closed', () => {
      const header = createHeader();
      document.body.appendChild(header);
      
      const mobileMenu = header.querySelector('#mobile-menu');
      
      // Menu is closed by default
      expect(mobileMenu?.classList.contains('hidden')).toBe(true);
      
      // Press Escape
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      
      // Still closed
      expect(mobileMenu?.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Default Config', () => {
    it('should have default logo text', () => {
      expect(DEFAULT_HEADER_CONFIG.logoText).toBe('ChaosCraft');
    });

    it('should have default nav items', () => {
      expect(DEFAULT_HEADER_CONFIG.navItems).toBeDefined();
      expect(DEFAULT_HEADER_CONFIG.navItems.length).toBeGreaterThan(0);
    });

    it('should have Home as first nav item', () => {
      expect(DEFAULT_HEADER_CONFIG.navItems[0].label).toBe('Home');
    });

    it('should have Contact as second nav item', () => {
      expect(DEFAULT_HEADER_CONFIG.navItems[1].label).toBe('Contact');
    });
  });
});
