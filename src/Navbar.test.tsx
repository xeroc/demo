/**
 * Tests for Navbar React Component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Navbar />);
      
      expect(screen.getByRole('banner')).toBeDefined();
      expect(screen.getByText('ChaosCraft')).toBeDefined();
      expect(screen.getByText('🌌')).toBeDefined();
    });

    it('should render with custom logo text', () => {
      render(<Navbar logoText="CustomLogo" />);
      
      expect(screen.getByText('CustomLogo')).toBeDefined();
    });

    it('should render with custom logo icon', () => {
      render(<Navbar logoIcon="🚀" />);
      
      expect(screen.getByText('🚀')).toBeDefined();
    });

    it('should render logo as a link to home', () => {
      render(<Navbar />);
      
      const logoLink = screen.getByRole('link');
      expect(logoLink.getAttribute('href')).toBe('/');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Navbar />);
      
      const navbar = screen.getByRole('banner');
      expect(navbar.getAttribute('aria-label')).toBe('Site header');
    });

    it('should mark logo icon as aria-hidden', () => {
      render(<Navbar />);
      
      const icon = screen.getByText('🌌');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Styling', () => {
    it('should have sticky positioning', () => {
      render(<Navbar />);
      
      const navbar = screen.getByRole('banner');
      expect(navbar.className).toContain('sticky');
    });

    it('should have backdrop blur effect', () => {
      render(<Navbar />);
      
      const navbar = screen.getByRole('banner');
      expect(navbar.className).toContain('backdrop-blur');
    });

    it('should have correct ID', () => {
      render(<Navbar />);
      
      const navbar = screen.getByRole('banner');
      expect(navbar.id).toBe('chaoscraft-navbar');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text sizing for logo', () => {
      render(<Navbar />);
      
      const logoText = screen.getByText('ChaosCraft');
      expect(logoText.className).toMatch(/text-lg sm:text-xl md:text-2xl/);
    });

    it('should have responsive padding in container', () => {
      render(<Navbar />);
      
      const navbar = screen.getByRole('banner');
      const container = navbar.querySelector('.max-w-7xl');
      expect(container?.className).toMatch(/px-4 sm:px-6 lg:px-8/);
    });
  });
});
