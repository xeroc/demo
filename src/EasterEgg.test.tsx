/**
 * Tests for Easter Egg Component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EasterEgg from './EasterEgg';

describe('EasterEgg Component', () => {
  describe('Rendering', () => {
    it('should not render when not active', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={false} onClose={onClose} />);

      expect(screen.queryByText('Chaos Master')).not.toBeInTheDocument();
    });

    it('should render when active', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      expect(screen.getByText('Chaos Master')).toBeInTheDocument();
      expect(screen.getByText('🎉 You found the chaos! 🎉')).toBeInTheDocument();
      expect(screen.getByText('🏆')).toBeInTheDocument();
    });

    it('should render with proper ARIA attributes', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-label', 'Chaos Master Achievement Unlocked');
    });

    it('should render close instructions', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      expect(screen.getByText('Press ESC or click anywhere to close')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onClose when clicked', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      const overlay = screen.getByRole('dialog');
      fireEvent.click(overlay);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when ESC is pressed', async () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    it('should not call onClose when other keys are pressed', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Enter' });
      fireEvent.keyDown(document, { key: 'Space' });

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Visual Elements', () => {
    it('should contain trophy emoji', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      expect(screen.getByText('🏆')).toBeInTheDocument();
    });

    it('should contain celebration emojis', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      expect(screen.getByText(/🎉/)).toBeInTheDocument();
    });

    it('should have title element', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      const title = screen.getByText('Chaos Master');
      expect(title.tagName).toBe('H1');
    });
  });

  describe('Lifecycle', () => {
    it('should generate particles when active', () => {
      const onClose = vi.fn();
      const { container } = render(<EasterEgg isActive={true} onClose={onClose} />);

      // Particles are created with animation
      const particles = container.querySelectorAll('.animate-particle-explode');
      expect(particles.length).toBe(50);
    });

    it('should generate sparkles when active', () => {
      const onClose = vi.fn();
      const { container } = render(<EasterEgg isActive={true} onClose={onClose} />);

      // Sparkles are created with animation
      const sparkles = container.querySelectorAll('.animate-sparkle-float');
      expect(sparkles.length).toBe(30);
    });

    it('should clear particles when deactivated', () => {
      const onClose = vi.fn();
      const { container, rerender } = render(<EasterEgg isActive={true} onClose={onClose} />);

      expect(container.querySelectorAll('.animate-particle-explode').length).toBe(50);

      rerender(<EasterEgg isActive={false} onClose={onClose} />);

      expect(container.querySelectorAll('.animate-particle-explode').length).toBe(0);
    });

    it('should clear sparkles when deactivated', () => {
      const onClose = vi.fn();
      const { container, rerender } = render(<EasterEgg isActive={true} onClose={onClose} />);

      expect(container.querySelectorAll('.animate-sparkle-float').length).toBe(30);

      rerender(<EasterEgg isActive={false} onClose={onClose} />);

      expect(container.querySelectorAll('.animate-sparkle-float').length).toBe(0);
    });
  });

  describe('Accessibility', () => {
    it('should be dismissible with ESC key', async () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('should be dismissible by clicking', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      const overlay = screen.getByRole('dialog');
      fireEvent.click(overlay);

      expect(onClose).toHaveBeenCalled();
    });

    it('should have proper role and aria-label', () => {
      const onClose = vi.fn();
      render(<EasterEgg isActive={true} onClose={onClose} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeDefined();
      expect(dialog.getAttribute('aria-label')).toContain('Chaos Master');
    });
  });
});
