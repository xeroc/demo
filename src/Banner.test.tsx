/**
 * Tests for Banner React Component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Banner from './Banner';

describe('Banner Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Banner />);
      
      expect(screen.getByRole('banner')).toBeDefined();
      expect(screen.getByText(/This site can be modified/)).toBeDefined();
      expect(screen.getByText('Click here to participate!')).toBeDefined();
    });

    it('should render with custom message', () => {
      render(<Banner message="Custom banner message" />);
      
      expect(screen.getByText('Custom banner message')).toBeDefined();
    });

    it('should render with custom link text', () => {
      render(<Banner linkText="Join now!" />);
      
      expect(screen.getByText('Join now!')).toBeDefined();
    });

    it('should render with custom link URL', () => {
      render(<Banner linkUrl="https://example.com" />);
      
      const link = screen.getByRole('link');
      expect(link.getAttribute('href')).toBe('https://example.com');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Banner />);
      
      const banner = screen.getByRole('banner');
      expect(banner.getAttribute('aria-label')).toBe('ChaosCraft participation announcement');
    });

    it('should have aria-label on link indicating new tab', () => {
      render(<Banner linkText="Join the chaos" />);
      
      const link = screen.getByRole('link');
      expect(link.getAttribute('aria-label')).toContain('opens in a new tab');
    });

    it('should have correct ID', () => {
      render(<Banner />);
      
      const banner = screen.getByRole('banner');
      expect(banner.id).toBe('chaoscraft-banner');
    });
  });

  describe('Link Attributes', () => {
    it('should open link in new tab', () => {
      render(<Banner />);
      
      const link = screen.getByRole('link');
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('should have noopener noreferrer for security', () => {
      render(<Banner />);
      
      const link = screen.getByRole('link');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  describe('Styling', () => {
    it('should have gradient background', () => {
      render(<Banner />);
      
      const banner = screen.getByRole('banner');
      expect(banner.className).toContain('bg-gradient-to-r');
    });

    it('should constrain width to prevent overflow', () => {
      render(<Banner />);
      
      const banner = screen.getByRole('banner');
      expect(banner.className).toMatch(/max-w-full overflow-hidden/);
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text sizing for message', () => {
      render(<Banner />);
      
      const message = screen.getByText(/This site can be modified/);
      expect(message.className).toMatch(/text-sm sm:text-base/);
    });

    it('should have responsive flex layout', () => {
      render(<Banner />);
      
      const banner = screen.getByRole('banner');
      const container = banner.querySelector('.flex');
      expect(container?.className).toMatch(/flex-col sm:flex-row/);
    });
  });
});
