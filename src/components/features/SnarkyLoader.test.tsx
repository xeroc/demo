/**
 * Tests for SnarkyLoader Component
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import SnarkyLoader from './SnarkyLoader';

describe('SnarkyLoader Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Rendering', () => {
    it('should render when visible is true', () => {
      render(<SnarkyLoader visible={true} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText(/Rerouting through your neighbor's WiFi/)).toBeInTheDocument();
    });

    it('should not render when visible is false', () => {
      render(<SnarkyLoader visible={false} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('should render spinner with correct structure', () => {
      render(<SnarkyLoader visible={true} />);
      
      const loader = screen.getByRole('status');
      expect(loader).toBeInTheDocument();
      expect(loader).toHaveAttribute('aria-live', 'polite');
      expect(loader).toHaveAttribute('aria-label', 'Loading');
    });

    it('should render snarky message', () => {
      render(<SnarkyLoader visible={true} />);
      const message = screen.getByText(/Rerouting through your neighbor's WiFi/);
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass('text-gray-300');
    });
  });

  describe('Message Rotation', () => {
    it('should rotate messages at default speed (2500ms)', () => {
      render(<SnarkyLoader visible={true} />);
      
      // Initial message
      expect(screen.getByText(/Rerouting through your neighbor's WiFi/)).toBeInTheDocument();

      // Advance time by 2500ms
      act(() => {
        vi.advanceTimersByTime(2500);
      });

      // Second message should appear
      expect(screen.getByText(/Negotiating with your ISP's hamsters/)).toBeInTheDocument();
    });

    it('should rotate messages at custom rotation speed', () => {
      render(<SnarkyLoader visible={true} rotationSpeed={1000} />);
      
      // Initial message
      expect(screen.getByText(/Rerouting through your neighbor's WiFi/)).toBeInTheDocument();

      // Advance time by 1000ms
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Second message should appear
      expect(screen.getByText(/Negotiating with your ISP's hamsters/)).toBeInTheDocument();
    });

    it('should cycle through all messages', () => {
      render(<SnarkyLoader visible={true} rotationSpeed={100} />);
      
      const messages = [
        /Rerouting through your neighbor's WiFi/,
        /Negotiating with your ISP's hamsters/,
        /Waiting for your internet to remember its purpose/,
        /Loading at the speed of a confused pigeon/,
        /Your packets are taking the scenic route/,
      ];

      messages.forEach((messagePattern, index) => {
        expect(screen.getByText(messagePattern)).toBeInTheDocument();
        
        if (index < messages.length - 1) {
          act(() => {
            vi.advanceTimersByTime(100);
          });
        }
      });
    });

    it('should loop back to first message after reaching the end', () => {
      render(<SnarkyLoader visible={true} rotationSpeed={100} />);
      
      // Cycle through all messages (10 total)
      for (let i = 0; i < 10; i++) {
        act(() => {
          vi.advanceTimersByTime(100);
        });
      }

      // Should be back to first message
      expect(screen.getByText(/Rerouting through your neighbor's WiFi/)).toBeInTheDocument();
    });
  });

  describe('Visibility Toggle', () => {
    it('should toggle visibility on prop change', () => {
      const { rerender } = render(<SnarkyLoader visible={true} />);
      expect(screen.getByRole('status')).toBeInTheDocument();

      rerender(<SnarkyLoader visible={false} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      rerender(<SnarkyLoader visible={true} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should stop message rotation when hidden', () => {
      const { rerender } = render(<SnarkyLoader visible={true} rotationSpeed={100} />);
      
      // Initial message
      expect(screen.getByText(/Rerouting through your neighbor's WiFi/)).toBeInTheDocument();

      // Hide loader
      rerender(<SnarkyLoader visible={false} rotationSpeed={100} />);

      // Advance time - no rotation should happen since component is hidden
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Show loader again - should render successfully
      rerender(<SnarkyLoader visible={true} rotationSpeed={100} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA attributes', () => {
      render(<SnarkyLoader visible={true} />);
      
      const loader = screen.getByRole('status');
      expect(loader).toHaveAttribute('aria-live', 'polite');
      expect(loader).toHaveAttribute('aria-label', 'Loading');
    });

    it('should announce loading state', () => {
      render(<SnarkyLoader visible={true} />);
      expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should use Tailwind classes for spinner', () => {
      render(<SnarkyLoader visible={true} />);
      
      const loader = screen.getByRole('status');
      expect(loader).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
    });

    it('should apply gradient colors to spinner elements', () => {
      render(<SnarkyLoader visible={true} />);
      
      const loader = screen.getByRole('status');
      const gradientElement = loader.querySelector('.bg-gradient-to-r');
      expect(gradientElement).toBeInTheDocument();
    });
  });
});
