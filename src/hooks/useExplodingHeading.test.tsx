/**
 * Tests for useExplodingHeading custom hook
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useExplodingHeading } from './useExplodingHeading';

describe('useExplodingHeading', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should accept config object with text and optional parameters', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({
        text: 'Hello World',
        confettiCount: 10,
        reassembleDelay: 200
      })
    );

    expect(result.current.visibleText).toBe('Hello World');
    expect(result.current.handleClick).toBeDefined();
    expect(result.current.isExploded).toBe(false);
    expect(result.current.isReassembling).toBe(false);
    expect(result.current.confettiParticles).toEqual([]);
  });

  it('should return correct initial state', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({ text: 'Test Heading' })
    );

    expect(result.current.visibleText).toBe('Test Heading');
    expect(result.current.isExploded).toBe(false);
    expect(result.current.isReassembling).toBe(false);
    expect(result.current.confettiParticles).toEqual([]);
  });

  it('should explode text on click', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({ text: 'Test' })
    );

    act(() => {
      result.current.handleClick();
    });

    expect(result.current.visibleText).toBe('');
    expect(result.current.isExploded).toBe(true);
    expect(result.current.confettiParticles.length).toBeGreaterThan(0);
  });

  it('should generate confetti for each non-whitespace letter', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({
        text: 'Hi',
        confettiCount: 5
      })
    );

    act(() => {
      result.current.handleClick();
    });

    // 2 letters × 5 particles each = 10 particles
    expect(result.current.confettiParticles.length).toBe(10);
  });

  it('should skip whitespace when generating confetti', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({
        text: 'A B',
        confettiCount: 3
      })
    );

    act(() => {
      result.current.handleClick();
    });

    // 2 non-whitespace letters × 3 particles = 6 particles
    expect(result.current.confettiParticles.length).toBe(6);
  });

  it('should reassemble letters one by one after explosion', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({
        text: 'ABC',
        reassembleDelay: 100
      })
    );

    // Trigger explosion
    act(() => {
      result.current.handleClick();
    });

    expect(result.current.visibleText).toBe('');
    expect(result.current.isExploded).toBe(true);

    // Fast-forward past explosion pause (300ms)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.isExploded).toBe(false);
    expect(result.current.isReassembling).toBe(true);

    // First letter reassembles
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.visibleText).toBe('A');

    // Second letter reassembles
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.visibleText).toBe('AB');

    // Third letter reassembles
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.visibleText).toBe('ABC');
  });

  it('should complete reassembly and clear confetti', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({
        text: 'XY',
        reassembleDelay: 50
      })
    );

    // Trigger explosion
    act(() => {
      result.current.handleClick();
    });

    // Verify explosion state
    expect(result.current.visibleText).toBe('');
    expect(result.current.isExploded).toBe(true);
    expect(result.current.confettiParticles.length).toBeGreaterThan(0);

    // Fast-forward through entire animation: 300ms pause + (2 letters + 1 completion) * 50ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Verify completion state
    expect(result.current.visibleText).toBe('XY');
    expect(result.current.isExploded).toBe(false);
    expect(result.current.isReassembling).toBe(false);
    expect(result.current.confettiParticles).toEqual([]);
  });

  it('should not trigger explosion if already exploded', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({ text: 'Test' })
    );

    // First click
    act(() => {
      result.current.handleClick();
    });

    expect(result.current.isExploded).toBe(true);

    // Try to click again while exploded
    act(() => {
      result.current.handleClick();
    });

    // Should still be in same state (no new explosion)
    expect(result.current.isExploded).toBe(true);
  });

  it('should not trigger explosion if reassembling', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({
        text: 'Test',
        reassembleDelay: 100
      })
    );

    // Trigger explosion and start reassembly
    act(() => {
      result.current.handleClick();
      vi.advanceTimersByTime(300);
    });

    expect(result.current.isReassembling).toBe(true);

    // Try to click again while reassembling
    act(() => {
      result.current.handleClick();
    });

    // Should continue reassembling without interruption
    expect(result.current.isReassembling).toBe(true);
  });

  it('should update visible text when text prop changes (if not animating)', () => {
    const { result, rerender } = renderHook(
      ({ text }) => useExplodingHeading({ text }),
      { initialProps: { text: 'Initial' } }
    );

    expect(result.current.visibleText).toBe('Initial');

    // Update text prop
    rerender({ text: 'Updated' });

    expect(result.current.visibleText).toBe('Updated');
  });

  it('should not update visible text during animation', () => {
    const { result, rerender } = renderHook(
      ({ text }) => useExplodingHeading({ text, reassembleDelay: 100 }),
      { initialProps: { text: 'Initial' } }
    );

    // Trigger explosion
    act(() => {
      result.current.handleClick();
    });

    // Try to update text during animation
    rerender({ text: 'Updated' });

    // Should still be empty (not updated)
    expect(result.current.visibleText).toBe('');
  });

  it('should use default values for optional config', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({ text: 'Test' })
    );

    act(() => {
      result.current.handleClick();
    });

    // Default confettiCount is 5, 'Test' has 4 non-whitespace letters
    expect(result.current.confettiParticles.length).toBe(20); // 4 * 5 = 20
  });

  it('should cleanup timers on unmount', () => {
    const { unmount } = renderHook(() =>
      useExplodingHeading({ text: 'Test' })
    );

    // Start animation
    const { result } = renderHook(() =>
      useExplodingHeading({ text: 'Test' })
    );

    act(() => {
      result.current.handleClick();
    });

    // Unmount should not throw
    expect(() => unmount()).not.toThrow();
  });

  it('should handle empty text', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({ text: '' })
    );

    expect(result.current.visibleText).toBe('');

    act(() => {
      result.current.handleClick();
    });

    expect(result.current.confettiParticles).toEqual([]);
  });

  it('should handle text with only whitespace', () => {
    const { result } = renderHook(() =>
      useExplodingHeading({ text: '   ' })
    );

    act(() => {
      result.current.handleClick();
    });

    // No confetti for whitespace-only text
    expect(result.current.confettiParticles).toEqual([]);
  });
});
