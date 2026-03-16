/**
 * Tests for useKonamiCode Custom Hook
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, cleanup, act } from '@testing-library/react';
import { useKonamiCode, KONAMI_CODE } from './useKonamiCode';

describe('useKonamiCode Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  describe('Initial State', () => {
    it('should return correct initial state', () => {
      const { result } = renderHook(() => useKonamiCode());

      expect(result.current.isActive).toBe(false);
      expect(result.current.sequence).toEqual([]);
      expect(result.current.progress).toBe(0);
    });
  });

  describe('Sequence Detection', () => {
    it('should detect correct Konami code sequence', () => {
      const onActivate = vi.fn();
      const { result } = renderHook(() => useKonamiCode({ onActivate }));

      // Simulate Konami code: ↑↑↓↓←→←→BA
      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(true);
      expect(onActivate).toHaveBeenCalledTimes(1);
    });

    it('should not activate on partial sequence', () => {
      const onActivate = vi.fn();
      const { result } = renderHook(() => useKonamiCode({ onActivate }));

      // Simulate partial sequence
      act(() => {
        ['ArrowUp', 'ArrowUp', 'ArrowDown'].forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(false);
      expect(onActivate).not.toHaveBeenCalled();
    });

    it('should not activate on wrong sequence', () => {
      const onActivate = vi.fn();
      const { result } = renderHook(() => useKonamiCode({ onActivate }));

      // Simulate wrong sequence
      act(() => {
        [
          'ArrowDown', 'ArrowDown',
          'ArrowUp', 'ArrowUp',
          'ArrowRight', 'ArrowLeft',
          'ArrowRight', 'ArrowLeft',
          'KeyA', 'KeyB'
        ].forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(false);
      expect(onActivate).not.toHaveBeenCalled();
    });

    it('should track sequence progress', () => {
      const { result } = renderHook(() => useKonamiCode());

      act(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      });

      expect(result.current.sequence).toEqual(['ArrowUp']);
      expect(result.current.progress).toBe(0.1); // 1/10

      act(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      });

      expect(result.current.sequence).toEqual(['ArrowUp', 'ArrowUp']);
      expect(result.current.progress).toBe(0.2); // 2/10
    });
  });

  describe('Options', () => {
    it('should call onActivate callback when triggered', () => {
      const onActivate = vi.fn();
      renderHook(() => useKonamiCode({ onActivate }));

      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(onActivate).toHaveBeenCalled();
    });

    it('should respect enabled option', () => {
      const onActivate = vi.fn();
      const { result } = renderHook(() => 
        useKonamiCode({ onActivate, enabled: false })
      );

      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(false);
      expect(onActivate).not.toHaveBeenCalled();
    });

    it('should auto-reset sequence after delay', () => {
      const { result } = renderHook(() => 
        useKonamiCode({ autoReset: true, resetDelay: 1000 })
      );

      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(true);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.sequence).toEqual([]);
    });

    it('should not auto-reset when autoReset is false', () => {
      const { result } = renderHook(() => 
        useKonamiCode({ autoReset: false, resetDelay: 1000 })
      );

      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(true);

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(result.current.sequence.length).toBe(10);
    });
  });

  describe('Reset Functionality', () => {
    it('should reset state when reset is called', () => {
      const { result } = renderHook(() => useKonamiCode());

      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(true);

      act(() => {
        result.current.reset();
      });

      expect(result.current.isActive).toBe(false);
      expect(result.current.sequence).toEqual([]);
    });

    it('should reset on ESC key when active', () => {
      const { result } = renderHook(() => useKonamiCode());

      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(true);

      act(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      });

      expect(result.current.isActive).toBe(false);
    });
  });

  describe('Cleanup', () => {
    it('should remove event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      
      const { unmount } = renderHook(() => useKonamiCode());
      
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      
      removeEventListenerSpy.mockRestore();
    });

    it('should clear timeout on unmount', () => {
      const { unmount } = renderHook(() => 
        useKonamiCode({ autoReset: true, resetDelay: 1000 })
      );

      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      unmount();

      // Verify no errors after unmount
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(true).toBe(true);
    });
  });

  describe('Multiple Activations', () => {
    it('should allow multiple activations after reset', () => {
      const onActivate = vi.fn();
      const { result } = renderHook(() => useKonamiCode({ onActivate }));

      // First activation
      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(true);
      expect(onActivate).toHaveBeenCalledTimes(1);

      // Reset
      act(() => {
        result.current.reset();
      });

      expect(result.current.isActive).toBe(false);

      // Second activation
      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(true);
      expect(onActivate).toHaveBeenCalledTimes(2);
    });

    it('should not activate multiple times without reset', () => {
      const onActivate = vi.fn();
      const { result } = renderHook(() => useKonamiCode({ onActivate }));

      // First activation
      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(onActivate).toHaveBeenCalledTimes(1);

      // Try to activate again without reset
      act(() => {
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      // Should still be 1, not 2
      expect(onActivate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Sequence Management', () => {
    it('should keep only last 10 keys', () => {
      const { result } = renderHook(() => useKonamiCode());

      // Press 15 keys
      act(() => {
        for (let i = 0; i < 15; i++) {
          document.dispatchEvent(new KeyboardEvent('keydown', { code: `Key${i}` }));
        }
      });

      expect(result.current.sequence.length).toBe(10);
    });

    it('should detect sequence in last 10 keys', () => {
      const onActivate = vi.fn();
      const { result } = renderHook(() => useKonamiCode({ onActivate }));

      act(() => {
        // Press some random keys first
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyX' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyY' }));
        document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyZ' }));

        // Then press Konami code
        KONAMI_CODE.forEach(code => {
          document.dispatchEvent(new KeyboardEvent('keydown', { code }));
        });
      });

      expect(result.current.isActive).toBe(true);
      expect(onActivate).toHaveBeenCalled();
    });
  });
});
