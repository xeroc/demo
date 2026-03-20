/**
 * Tests for Home Page Easter Egg Integration
 * Tests the integration of SnarkyLoader with multi-click trigger
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';

// Mock all the imported components
vi.mock('../components/features/AnimatedBackground', () => ({
  default: () => <div data-testid="animated-background">Background</div>
}));

vi.mock('../components/layout/Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>
}));

vi.mock('../components/layout/Banner', () => ({
  default: () => <div data-testid="banner">Banner</div>
}));

vi.mock('../components/layout/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>
}));

vi.mock('../components/features/DancingRobot', () => ({
  default: () => <div data-testid="dancing-robot">Robot</div>
}));

vi.mock('../components/features/Joke', () => ({
  default: () => <div data-testid="joke">Joke</div>
}));

vi.mock('../components/features/Countries', () => ({
  default: () => <div data-testid="countries">Countries</div>
}));

vi.mock('../components/features/how-it-works', () => ({
  default: () => <div data-testid="how-it-works">How It Works</div>
}));

const renderHome = () => {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe('Home Page Easter Egg Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('SnarkyLoader Import and Render', () => {
    it('should not display SnarkyLoader by default', () => {
      renderHome();
      
      // SnarkyLoader should not be visible initially
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('should render all normal page elements', () => {
      renderHome();
      
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('banner')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      expect(screen.getByTestId('dancing-robot')).toBeInTheDocument();
      expect(screen.getByTestId('joke')).toBeInTheDocument();
    });

    it('should render title with cursor pointer (clickable)', () => {
      renderHome();
      
      const title = screen.getByText('Welcome to ChaosCraft');
      expect(title).toHaveClass('cursor-pointer');
    });
  });

  describe('Multi-Click Trigger', () => {
    it('should show SnarkyLoader after 5 rapid clicks on title', () => {
      renderHome();
      
      const title = screen.getByText('Welcome to ChaosCraft');
      
      // Initially hidden
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      
      // Click 5 times rapidly
      act(() => {
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
      });

      // SnarkyLoader should now be visible
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should not trigger SnarkyLoader with fewer than 5 clicks', () => {
      renderHome();
      
      const title = screen.getByText('Welcome to ChaosCraft');
      
      // Click only 4 times
      act(() => {
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
      });

      // Advance time to ensure any timers would have triggered
      act(() => {
        vi.advanceTimersByTime(100);
      });

      // SnarkyLoader should still be hidden
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('should not interfere with normal page functionality', () => {
      renderHome();
      
      const title = screen.getByText('Welcome to ChaosCraft');
      
      // Single click should not affect anything
      act(() => {
        fireEvent.click(title);
      });
      
      // All page elements should still be present
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('dancing-robot')).toBeInTheDocument();
      expect(screen.getByTestId('joke')).toBeInTheDocument();
    });
  });

  describe('Dismissal Mechanisms', () => {
    it('should dismiss SnarkyLoader when clicking outside', () => {
      renderHome();
      
      const title = screen.getByText('Welcome to ChaosCraft');
      
      // Trigger the easter egg
      act(() => {
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
      });

      // SnarkyLoader should appear
      expect(screen.getByRole('status')).toBeInTheDocument();

      // Advance time to allow the click-outside listener to be attached
      act(() => {
        vi.advanceTimersByTime(150);
      });

      // Click outside (on the overlay background)
      const overlay = document.querySelector('[data-snarky-loader]');
      if (overlay) {
        act(() => {
          fireEvent.click(overlay);
        });
      }

      // SnarkyLoader should be dismissed
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('should dismiss SnarkyLoader when pressing ESC key', () => {
      renderHome();
      
      const title = screen.getByText('Welcome to ChaosCraft');
      
      // Trigger the easter egg
      act(() => {
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
      });

      // SnarkyLoader should appear
      expect(screen.getByRole('status')).toBeInTheDocument();

      // Press ESC
      act(() => {
        fireEvent.keyDown(document, { key: 'Escape' });
      });

      // SnarkyLoader should be dismissed
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('should not re-trigger SnarkyLoader after dismissal', () => {
      renderHome();
      
      const title = screen.getByText('Welcome to ChaosCraft');
      
      // Trigger the easter egg
      act(() => {
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
      });

      // SnarkyLoader should appear
      expect(screen.getByRole('status')).toBeInTheDocument();

      // Dismiss with ESC
      act(() => {
        fireEvent.keyDown(document, { key: 'Escape' });
      });

      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      // Try to trigger again
      act(() => {
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
      });

      // Should not appear again
      act(() => {
        vi.advanceTimersByTime(100);
      });
      
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes on SnarkyLoader overlay', () => {
      renderHome();
      
      const title = screen.getByText('Welcome to ChaosCraft');
      
      // Trigger the easter egg
      act(() => {
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
        fireEvent.click(title);
      });

      // Check for proper ARIA attributes
      const loader = screen.getByRole('status');
      expect(loader).toHaveAttribute('aria-live', 'polite');
      expect(loader).toHaveAttribute('aria-label', 'Loading');
    });
  });
});
