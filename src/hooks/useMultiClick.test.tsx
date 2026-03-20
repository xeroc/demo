/**
 * Tests for useMultiClick Custom Hook
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useMultiClick } from './useMultiClick';
import React from 'react';

describe('useMultiClick Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Functionality', () => {
    it('should return a ref, clickCount, reset function, and isActivated flag', () => {
      const { result } = renderHook(() => useMultiClick());

      expect(result.current.ref).toBeDefined();
      expect(result.current.ref.current).toBeNull();
      expect(result.current.clickCount).toBe(0);
      expect(typeof result.current.reset).toBe('function');
      expect(result.current.isActivated).toBe(false);
    });

    it('should use default values when no options provided', () => {
      const onActivate = vi.fn();
      const { result } = renderHook(() => useMultiClick({ onActivate }));

      expect(result.current.clickCount).toBe(0);
    });
  });

  describe('Click Counting', () => {
    it('should increment click count on each click', () => {
      const onActivate = vi.fn();
      
      const TestComponent = () => {
        const { ref, clickCount } = useMultiClick({ onActivate });
        return <div ref={ref as React.RefObject<HTMLDivElement>} data-testid="target">Clicks: {clickCount}</div>;
      };

      render(<TestComponent />);
      const target = screen.getByTestId('target');

      expect(screen.getByText('Clicks: 0')).toBeInTheDocument();

      fireEvent.click(target);
      expect(screen.getByText('Clicks: 1')).toBeInTheDocument();

      fireEvent.click(target);
      expect(screen.getByText('Clicks: 2')).toBeInTheDocument();
    });

    it('should reset click count when time window expires', () => {
      const onActivate = vi.fn();
      
      const TestComponent = () => {
        const { ref, clickCount } = useMultiClick({ 
          onActivate, 
          clickCount: 5, 
          timeWindow: 1000 
        });
        return <div ref={ref as React.RefObject<HTMLDivElement>} data-testid="target">Clicks: {clickCount}</div>;
      };

      render(<TestComponent />);
      const target = screen.getByTestId('target');

      fireEvent.click(target);
      fireEvent.click(target);
      expect(screen.getByText('Clicks: 2')).toBeInTheDocument();

      // Advance time past the time window
      act(() => {
        vi.advanceTimersByTime(1100);
      });

      expect(screen.getByText('Clicks: 0')).toBeInTheDocument();
    });
  });

  describe('Activation', () => {
    it('should trigger onActivate when click count is reached', () => {
      const onActivate = vi.fn();
      
      const TestComponent = () => {
        const { ref, clickCount } = useMultiClick({ 
          onActivate, 
          clickCount: 3, 
          timeWindow: 2000 
        });
        return <div ref={ref as React.RefObject<HTMLDivElement>} data-testid="target">Clicks: {clickCount}</div>;
      };

      render(<TestComponent />);
      const target = screen.getByTestId('target');

      fireEvent.click(target);
      fireEvent.click(target);
      fireEvent.click(target);

      expect(onActivate).toHaveBeenCalledTimes(1);
    });

    it('should reset click count after activation', () => {
      const onActivate = vi.fn();
      
      const TestComponent = () => {
        const { ref, clickCount } = useMultiClick({ 
          onActivate, 
          clickCount: 3, 
          timeWindow: 2000 
        });
        return <div ref={ref as React.RefObject<HTMLDivElement>} data-testid="target">Clicks: {clickCount}</div>;
      };

      render(<TestComponent />);
      const target = screen.getByTestId('target');

      fireEvent.click(target);
      fireEvent.click(target);
      fireEvent.click(target);

      // After activation, click count should reset
      act(() => {
        vi.advanceTimersByTime(150);
      });

      expect(screen.getByText('Clicks: 0')).toBeInTheDocument();
    });

    it('should set isActivated flag when triggered', () => {
      const onActivate = vi.fn();
      
      const TestComponent = () => {
        const { ref, isActivated } = useMultiClick({ 
          onActivate, 
          clickCount: 2, 
          timeWindow: 2000 
        });
        return <div ref={ref as React.RefObject<HTMLDivElement>} data-testid="target">{isActivated ? 'Activated' : 'Not Activated'}</div>;
      };

      render(<TestComponent />);
      const target = screen.getByTestId('target');

      expect(screen.getByText('Not Activated')).toBeInTheDocument();

      fireEvent.click(target);
      fireEvent.click(target);

      expect(screen.getByText('Activated')).toBeInTheDocument();
    });

    it('should not activate if clicks are too slow', () => {
      const onActivate = vi.fn();
      
      const TestComponent = () => {
        const { ref, clickCount } = useMultiClick({ 
          onActivate, 
          clickCount: 3, 
          timeWindow: 500 
        });
        return <div ref={ref as React.RefObject<HTMLDivElement>} data-testid="target">Clicks: {clickCount}</div>;
      };

      render(<TestComponent />);
      const target = screen.getByTestId('target');

      fireEvent.click(target);
      fireEvent.click(target);

      // Wait too long before third click
      act(() => {
        vi.advanceTimersByTime(600);
      });

      fireEvent.click(target);

      // Should not have activated (only 1 click after reset)
      expect(onActivate).not.toHaveBeenCalled();
    });
  });

  describe('Manual Reset', () => {
    it('should reset click count when reset() is called', () => {
      const onActivate = vi.fn();
      
      const TestComponent = () => {
        const { ref, clickCount, reset } = useMultiClick({ 
          onActivate, 
          clickCount: 5, 
          timeWindow: 2000 
        });
        return (
          <div>
            <div ref={ref as React.RefObject<HTMLDivElement>} data-testid="target">Clicks: {clickCount}</div>
            <button onClick={reset} data-testid="reset">Reset</button>
          </div>
        );
      };

      render(<TestComponent />);
      const target = screen.getByTestId('target');
      const resetButton = screen.getByTestId('reset');

      fireEvent.click(target);
      fireEvent.click(target);
      expect(screen.getByText('Clicks: 2')).toBeInTheDocument();

      fireEvent.click(resetButton);
      expect(screen.getByText('Clicks: 0')).toBeInTheDocument();
    });
  });

  describe('Enabled/Disabled', () => {
    it('should not count clicks when disabled', () => {
      const onActivate = vi.fn();
      
      const TestComponent = ({ enabled }: { enabled: boolean }) => {
        const { ref, clickCount } = useMultiClick({ 
          onActivate, 
          enabled,
          clickCount: 3,
          timeWindow: 2000 
        });
        return <div ref={ref as React.RefObject<HTMLDivElement>} data-testid="target">Clicks: {clickCount}</div>;
      };

      const { rerender } = render(<TestComponent enabled={false} />);
      const target = screen.getByTestId('target');

      fireEvent.click(target);
      fireEvent.click(target);
      fireEvent.click(target);

      // Click count should not increment
      expect(screen.getByText('Clicks: 0')).toBeInTheDocument();
      expect(onActivate).not.toHaveBeenCalled();

      // Enable and try again
      rerender(<TestComponent enabled={true} />);

      fireEvent.click(target);
      expect(screen.getByText('Clicks: 1')).toBeInTheDocument();
    });
  });
});
