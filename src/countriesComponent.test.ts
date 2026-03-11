/**
 * Tests for Countries Component
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createCountries, mountCountries, unmountCountries, getCountries, DEFAULT_COUNTRIES_CONFIG } from './countriesComponent';

describe('CountriesComponent', () => {
  beforeEach(() => {
    // Clean up any existing elements
    document.body.innerHTML = '';
  });

  describe('createCountries', () => {
    it('should create a countries section element', () => {
      const section = createCountries();
      
      expect(section).toBeInstanceOf(HTMLElement);
      expect(section.id).toBe('countries-container');
      expect(section.tagName).toBe('SECTION');
    });

    it('should have correct styling classes', () => {
      const section = createCountries();
      
      expect(section.className).toContain('mt-6');
      expect(section.className).toContain('max-w-4xl');
      expect(section.className).toContain('mx-auto');
      expect(section.className).toContain('bg-gradient-to-br');
    });

    it('should render default title', () => {
      const section = createCountries();
      const header = section.querySelector('h3');
      
      expect(header).not.toBeNull();
      expect(header?.textContent).toBe(DEFAULT_COUNTRIES_CONFIG.title);
    });

    it('should render custom title', () => {
      const customTitle = 'Custom Countries Title';
      const section = createCountries({ title: customTitle });
      const header = section.querySelector('h3');
      
      expect(header?.textContent).toBe(customTitle);
    });

    it('should render default countries list', () => {
      const section = createCountries();
      const badges = section.querySelectorAll('span');
      
      expect(badges.length).toBe(DEFAULT_COUNTRIES_CONFIG.countries.length);
    });

    it('should render custom countries list', () => {
      const customCountries = ['Country A', 'Country B', 'Country C'];
      const section = createCountries({ countries: customCountries });
      const badges = section.querySelectorAll('span');
      
      expect(badges.length).toBe(3);
      expect(badges[0].textContent).toBe('Country A');
      expect(badges[1].textContent).toBe('Country B');
      expect(badges[2].textContent).toBe('Country C');
    });

    it('should apply badge styling to countries', () => {
      const section = createCountries();
      const firstBadge = section.querySelector('span');
      
      expect(firstBadge?.className).toContain('px-3');
      expect(firstBadge?.className).toContain('rounded-full');
      expect(firstBadge?.className).toContain('bg-white/10');
    });

    it('should create flex container for countries', () => {
      const section = createCountries();
      const listContainer = section.querySelector('div');
      
      expect(listContainer?.className).toContain('flex');
      expect(listContainer?.className).toContain('flex-wrap');
      expect(listContainer?.className).toContain('justify-center');
    });
  });

  describe('mountCountries', () => {
    it('should mount to specified container', () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);
      
      mountCountries('test-container');
      
      const mounted = document.getElementById('countries-container');
      expect(mounted).not.toBeNull();
      expect(container.contains(mounted)).toBe(true);
    });

    it('should use default container id when not specified', () => {
      const container = document.createElement('div');
      container.id = 'countries-wrapper';
      document.body.appendChild(container);
      
      mountCountries();
      
      const mounted = document.getElementById('countries-container');
      expect(mounted).not.toBeNull();
      expect(container.contains(mounted)).toBe(true);
    });

    it('should log error if container not found', () => {
      const consoleSpy = vi.spyOn(console, 'error');
      
      mountCountries('non-existent-container');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Container with ID "non-existent-container" not found')
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('unmountCountries', () => {
    it('should remove countries section from DOM', () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);
      
      mountCountries('test-container');
      expect(document.getElementById('countries-container')).not.toBeNull();
      
      unmountCountries();
      expect(document.getElementById('countries-container')).toBeNull();
    });

    it('should handle case when section does not exist', () => {
      // Should not throw
      expect(() => unmountCountries()).not.toThrow();
    });
  });

  describe('getCountries', () => {
    it('should return null when not mounted', () => {
      expect(getCountries()).toBeNull();
    });

    it('should return element when mounted', () => {
      const container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);
      
      mountCountries('test-container');
      const element = getCountries();
      
      expect(element).not.toBeNull();
      expect(element?.id).toBe('countries-container');
    });
  });
});
