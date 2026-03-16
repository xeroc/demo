/**
 * Tests for Countries React Component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Countries, { DEFAULT_COUNTRIES_CONFIG } from './Countries';

describe('Countries Component', () => {
  describe('rendering', () => {
    it('should render the countries section', () => {
      const { container } = render(<Countries />);
      
      const section = container.querySelector('#countries-container');
      expect(section).not.toBeNull();
      expect(section?.tagName).toBe('SECTION');
    });

    it('should render default title', () => {
      render(<Countries />);
      
      const header = screen.getByText(DEFAULT_COUNTRIES_CONFIG.title);
      expect(header).not.toBeNull();
      expect(header.tagName).toBe('H3');
    });

    it('should render custom title', () => {
      const customTitle = 'Custom Countries Title';
      render(<Countries title={customTitle} />);
      
      const header = screen.getByText(customTitle);
      expect(header).not.toBeNull();
    });

    it('should render default countries list', () => {
      const { container } = render(<Countries />);
      
      const badges = container.querySelectorAll('span');
      expect(badges.length).toBe(DEFAULT_COUNTRIES_CONFIG.countries.length);
    });

    it('should render custom countries list', () => {
      const customCountries = ['Country A', 'Country B', 'Country C'];
      render(<Countries countries={customCountries} />);
      
      expect(screen.getByText('Country A')).not.toBeNull();
      expect(screen.getByText('Country B')).not.toBeNull();
      expect(screen.getByText('Country C')).not.toBeNull();
    });

    it('should render all default countries', () => {
      render(<Countries />);
      
      DEFAULT_COUNTRIES_CONFIG.countries.forEach(country => {
        expect(screen.getByText(country)).not.toBeNull();
      });
    });
  });

  describe('styling', () => {
    it('should have correct section styling classes', () => {
      const { container } = render(<Countries />);
      const section = container.querySelector('#countries-container');
      
      expect(section?.className).toContain('mt-6');
      expect(section?.className).toContain('max-w-4xl');
      expect(section?.className).toContain('mx-auto');
      expect(section?.className).toContain('bg-gradient-to-br');
      expect(section?.className).toContain('rounded-2xl');
    });

    it('should have correct header styling', () => {
      render(<Countries />);
      const header = screen.getByText(DEFAULT_COUNTRIES_CONFIG.title);
      
      expect(header.className).toContain('text-lg');
      expect(header.className).toContain('font-bold');
      expect(header.className).toContain('text-white');
      expect(header.className).toContain('text-center');
    });

    it('should have flex container for countries', () => {
      const { container } = render(<Countries />);
      const listContainer = container.querySelector('.flex.flex-wrap');
      
      expect(listContainer?.className).toContain('flex');
      expect(listContainer?.className).toContain('flex-wrap');
      expect(listContainer?.className).toContain('justify-center');
    });

    it('should apply badge styling to countries', () => {
      const { container } = render(<Countries />);
      const firstBadge = container.querySelector('span');
      
      expect(firstBadge?.className).toContain('px-3');
      expect(firstBadge?.className).toContain('rounded-full');
      expect(firstBadge?.className).toContain('bg-white/10');
      expect(firstBadge?.className).toContain('border');
      expect(firstBadge?.className).toContain('transition-all');
    });
  });

  describe('edge cases', () => {
    it('should handle empty countries array', () => {
      const { container } = render(<Countries countries={[]} />);
      
      const badges = container.querySelectorAll('span');
      expect(badges.length).toBe(0);
    });

    it('should handle undefined props', () => {
      const { container } = render(<Countries />);
      
      const section = container.querySelector('#countries-container');
      expect(section).not.toBeNull();
      
      // Should render default content
      expect(screen.getByText(DEFAULT_COUNTRIES_CONFIG.title)).not.toBeNull();
    });
  });
});
