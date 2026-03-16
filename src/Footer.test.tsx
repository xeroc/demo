/**
 * Tests for Footer React Component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Footer />);
      
      expect(screen.getByRole('contentinfo')).toBeDefined();
      expect(screen.getByText(/© 2026 ChaosCraft/)).toBeDefined();
    });

    it('should render with custom copyright text', () => {
      render(<Footer copyrightText="Custom copyright notice" />);
      
      expect(screen.getByText('Custom copyright notice')).toBeDefined();
    });

    it('should have correct ID', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer.id).toBe('chaoscraft-footer');
    });
  });

  describe('Accessibility', () => {
    it('should have contentinfo role', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeDefined();
    });
  });

  describe('Styling', () => {
    it('should have backdrop blur effect', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer.className).toContain('backdrop-blur');
    });

    it('should have top border', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer.className).toContain('border-t');
    });

    it('should have mt-auto for flexbox layout', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer.className).toContain('mt-auto');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text sizing for copyright', () => {
      render(<Footer />);
      
      const copyright = screen.getByText(/© 2026 ChaosCraft/);
      expect(copyright.className).toMatch(/text-xs sm:text-sm md:text-base/);
    });

    it('should have responsive padding', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      const container = footer.querySelector('.py-6');
      expect(container?.className).toMatch(/py-6 sm:py-8 md:py-10/);
    });

    it('should have responsive container padding', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      const container = footer.querySelector('.max-w-7xl');
      expect(container?.className).toMatch(/px-4 sm:px-6 lg:px-8/);
    });
  });

  describe('Layout', () => {
    it('should center content', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      const container = footer.querySelector('.flex');
      expect(container?.className).toContain('items-center');
      expect(container?.className).toContain('justify-center');
    });

    it('should use max-w-7xl container', () => {
      render(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      const container = footer.querySelector('.max-w-7xl');
      expect(container).toBeDefined();
    });
  });
});
