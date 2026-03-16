/**
 * Tests for App Component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
});

describe('App Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<App />);
      expect(screen.getByText('Welcome to ChaosCraft')).toBeInTheDocument();
    });

    it('should render navigation', () => {
      render(<App />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should render the banner', () => {
      render(<App />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should render the footer', () => {
      render(<App />);
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('Konami Code Integration', () => {
    it('should not show easter egg initially', () => {
      render(<App />);
      expect(screen.queryByText('Chaos Master')).not.toBeInTheDocument();
    });

    it('should show easter egg when Konami code is entered', async () => {
      render(<App />);

      // Simulate Konami code: ↑↑↓↓←→←→BA
      const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
      ];

      konamiCode.forEach(code => {
        fireEvent.keyDown(document, { code });
      });

      await waitFor(() => {
        expect(screen.getByText('Chaos Master')).toBeInTheDocument();
      });
    });

    it('should hide easter egg when ESC is pressed after activation', async () => {
      render(<App />);

      // Activate easter egg
      const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
      ];

      konamiCode.forEach(code => {
        fireEvent.keyDown(document, { code });
      });

      await waitFor(() => {
        expect(screen.getByText('Chaos Master')).toBeInTheDocument();
      });

      // Press ESC to close
      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByText('Chaos Master')).not.toBeInTheDocument();
      });
    });

    it('should hide easter egg when clicked after activation', async () => {
      render(<App />);

      // Activate easter egg
      const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
      ];

      konamiCode.forEach(code => {
        fireEvent.keyDown(document, { code });
      });

      await waitFor(() => {
        expect(screen.getByText('Chaos Master')).toBeInTheDocument();
      });

      // Click to close
      const overlay = screen.getByRole('dialog');
      fireEvent.click(overlay);

      await waitFor(() => {
        expect(screen.queryByText('Chaos Master')).not.toBeInTheDocument();
      });
    });

    it('should not activate on partial Konami code', () => {
      render(<App />);

      // Partial Konami code
      const partialCode = ['ArrowUp', 'ArrowUp', 'ArrowDown'];
      partialCode.forEach(code => {
        fireEvent.keyDown(document, { code });
      });

      expect(screen.queryByText('Chaos Master')).not.toBeInTheDocument();
    });

    it('should not activate on wrong sequence', () => {
      render(<App />);

      // Wrong sequence
      const wrongCode = ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowDown'];
      wrongCode.forEach(code => {
        fireEvent.keyDown(document, { code });
      });

      expect(screen.queryByText('Chaos Master')).not.toBeInTheDocument();
    });
  });

  describe('Routing', () => {
    it('should render Home page by default', () => {
      render(<App />);
      expect(screen.getByText('Welcome to ChaosCraft')).toBeInTheDocument();
    });
  });
});
