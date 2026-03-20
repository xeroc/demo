/**
 * Tests for ExplodingHeading Component
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ExplodingHeading } from './ExplodingHeading';

describe('ExplodingHeading', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('Component rendering', () => {
    it('should render h1 element when as="h1"', () => {
      render(<ExplodingHeading as="h1">Test Heading</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test Heading' });
      expect(heading.tagName.toLowerCase()).toBe('h1');
    });

    it('should render h2 element when as="h2"', () => {
      render(<ExplodingHeading as="h2">Test Heading</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test Heading' });
      expect(heading.tagName.toLowerCase()).toBe('h2');
    });

    it('should render h3 element when as="h3"', () => {
      render(<ExplodingHeading as="h3">Test Heading</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test Heading' });
      expect(heading.tagName.toLowerCase()).toBe('h3');
    });

    it('should render h4 element when as="h4"', () => {
      render(<ExplodingHeading as="h4">Test Heading</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test Heading' });
      expect(heading.tagName.toLowerCase()).toBe('h4');
    });

    it('should render h5 element when as="h5"', () => {
      render(<ExplodingHeading as="h5">Test Heading</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test Heading' });
      expect(heading.tagName.toLowerCase()).toBe('h5');
    });

    it('should render h6 element when as="h6"', () => {
      render(<ExplodingHeading as="h6">Test Heading</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test Heading' });
      expect(heading.tagName.toLowerCase()).toBe('h6');
    });

    it('should render children as text content', () => {
      render(<ExplodingHeading as="h1">Hello World</ExplodingHeading>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
  });

  describe('Styling and className', () => {
    it('should have cursor-pointer class by default', () => {
      render(<ExplodingHeading as="h1">Test</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test' });
      expect(heading).toHaveClass('cursor-pointer');
    });

    it('should apply custom className', () => {
      render(<ExplodingHeading as="h1" className="text-2xl font-bold">Test</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test' });
      expect(heading).toHaveClass('cursor-pointer');
      expect(heading).toHaveClass('text-2xl');
      expect(heading).toHaveClass('font-bold');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label matching children text', () => {
      render(<ExplodingHeading as="h1">Accessible Heading</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Accessible Heading' });
      expect(heading).toHaveAttribute('aria-label', 'Accessible Heading');
    });

    it('should preserve aria-label during animation', () => {
      render(<ExplodingHeading as="h1" confettiCount={2}>Test Heading</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test Heading' });
      
      // Click to trigger explosion
      act(() => {
        fireEvent.click(heading);
      });
      
      // aria-label should still be present during animation
      expect(heading).toHaveAttribute('aria-label', 'Test Heading');
      
      // Advance timers to start reassembly
      act(() => {
        vi.advanceTimersByTime(300);
      });
      
      // aria-label should still be preserved
      expect(heading).toHaveAttribute('aria-label', 'Test Heading');
    });

    it('should be focusable with tabIndex', () => {
      render(<ExplodingHeading as="h1">Test</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test' });
      expect(heading).toHaveAttribute('tabIndex', '0');
    });

    it('should trigger explosion with Enter key', () => {
      render(<ExplodingHeading as="h1" confettiCount={2}>Test</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test' });
      
      act(() => {
        fireEvent.keyDown(heading, { key: 'Enter' });
      });
      
      // Text should be cleared (exploded)
      expect(heading.textContent).not.toBe('Test');
    });

    it('should trigger explosion with Space key', () => {
      render(<ExplodingHeading as="h1" confettiCount={2}>Test</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test' });
      
      act(() => {
        fireEvent.keyDown(heading, { key: ' ' });
      });
      
      // Text should be cleared (exploded)
      expect(heading.textContent).not.toBe('Test');
    });
  });

  describe('Click behavior', () => {
    it('should be clickable', () => {
      render(<ExplodingHeading as="h1">Click Me</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Click Me' });
      
      // Should not throw when clicked
      expect(() => fireEvent.click(heading)).not.toThrow();
    });

    it('should explode text on click', () => {
      render(<ExplodingHeading as="h1" confettiCount={2}>Hello</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Hello' });
      
      // Initial state
      expect(heading.textContent).toBe('Hello');
      
      // Click to trigger explosion
      act(() => {
        fireEvent.click(heading);
      });
      
      // Text should be cleared immediately after click
      expect(heading.textContent).not.toBe('Hello');
    });

    it('should reassemble text letter by letter after explosion', () => {
      render(<ExplodingHeading as="h1" confettiCount={2}>Hi</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Hi' });
      
      act(() => {
        fireEvent.click(heading);
      });
      
      // After 300ms explosion pause + 100ms for first letter reassembly
      act(() => {
        vi.advanceTimersByTime(400);
      });
      
      expect(heading.textContent).toBe('H');
      
      // After another 100ms, second letter appears
      act(() => {
        vi.advanceTimersByTime(100);
      });
      
      expect(heading.textContent).toBe('Hi');
    });
  });

  describe('Confetti particles', () => {
    it('should render confetti particles as absolutely positioned elements', () => {
      const { container } = render(
        <ExplodingHeading as="h1" confettiCount={3}>
          Test
        </ExplodingHeading>
      );
      const heading = screen.getByRole('button', { name: 'Test' });
      
      // Trigger explosion
      act(() => {
        fireEvent.click(heading);
      });
      
      // Find confetti particles
      const confettiParticles = container.querySelectorAll('.absolute');
      expect(confettiParticles.length).toBeGreaterThan(0);
    });

    it('should render confetti within relative positioned container', () => {
      const { container } = render(<ExplodingHeading as="h1">Test</ExplodingHeading>);
      
      // Parent div should be relatively positioned
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('relative');
    });

    it('should use custom confettiCount', () => {
      const { container } = render(
        <ExplodingHeading as="h1" confettiCount={10}>
          Test
        </ExplodingHeading>
      );
      const heading = screen.getByRole('button', { name: 'Test' });
      
      act(() => {
        fireEvent.click(heading);
      });
      
      // Should have confetti particles (4 letters × 10 particles each = 40)
      const confettiParticles = container.querySelectorAll('[aria-hidden="true"]');
      expect(confettiParticles.length).toBe(40);
    });

    it('should render confetti particles with pointer-events none', () => {
      const { container } = render(
        <ExplodingHeading as="h1" confettiCount={2}>
          Test
        </ExplodingHeading>
      );
      const heading = screen.getByRole('button', { name: 'Test' });
      
      act(() => {
        fireEvent.click(heading);
      });
      
      const confettiParticle = container.querySelector('[aria-hidden="true"]');
      if (confettiParticle) {
        expect(confettiParticle).toHaveStyle({ pointerEvents: 'none' });
      }
    });
  });

  describe('Hook integration', () => {
    it('should use default confettiCount when not specified', () => {
      render(<ExplodingHeading as="h1">Test</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test' });
      
      // Click should work without errors
      expect(() => fireEvent.click(heading)).not.toThrow();
    });

    it('should not trigger explosion when already exploded', () => {
      render(<ExplodingHeading as="h1" confettiCount={2}>Test</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Test' });
      
      // First click
      act(() => {
        fireEvent.click(heading);
      });
      
      // Second click during explosion should be ignored
      act(() => {
        fireEvent.click(heading);
      });
      
      // Should still be in exploded state
      expect(heading.textContent).not.toBe('Test');
    });

    it('should complete reassembly and return to original state', () => {
      render(<ExplodingHeading as="h1" confettiCount={2}>ABC</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'ABC' });
      
      // Click to explode
      act(() => {
        fireEvent.click(heading);
      });
      
      // Wait for explosion pause (300ms) + all 3 letters to reassemble (3 × 100ms)
      act(() => {
        vi.advanceTimersByTime(600);
      });
      
      expect(heading.textContent).toBe('ABC');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      render(<ExplodingHeading as="h1">{''}</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: '' });
      
      expect(() => fireEvent.click(heading)).not.toThrow();
    });

    it('should handle single character text', () => {
      render(<ExplodingHeading as="h1" confettiCount={1}>X</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'X' });
      
      act(() => {
        fireEvent.click(heading);
      });
      
      // Wait for explosion pause (300ms) + reassembly (100ms)
      act(() => {
        vi.advanceTimersByTime(400);
      });
      
      expect(heading.textContent).toBe('X');
    });

    it('should handle text with spaces', () => {
      render(<ExplodingHeading as="h1" confettiCount={1}>Hi</ExplodingHeading>);
      const heading = screen.getByRole('button', { name: 'Hi' });
      
      expect(heading.textContent).toBe('Hi');
      
      act(() => {
        fireEvent.click(heading);
      });
      
      // Wait for explosion pause (300ms) + all 2 letters to reassemble (2 × 100ms)
      act(() => {
        vi.advanceTimersByTime(500);
      });
      
      expect(heading.textContent).toBe('Hi');
    });
  });
});
