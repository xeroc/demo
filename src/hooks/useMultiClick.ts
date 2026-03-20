/**
 * useMultiClick Custom Hook
 * 
 * React hook that detects multiple rapid clicks on a target element
 * and triggers a callback when the click count threshold is reached.
 * 
 * @example
 * ```tsx
 * const { ref, clickCount, reset } = useMultiClick({
 *   clickCount: 5,
 *   timeWindow: 2000,
 *   onActivate: () => console.log('Secret unlocked!')
 * });
 * ```
 */

import { useState, useEffect, useRef, useCallback, RefObject } from 'react';

export interface UseMultiClickOptions {
  /** Number of clicks required to activate (default: 5) */
  clickCount?: number;
  /** Time window in milliseconds to complete clicks (default: 2000ms) */
  timeWindow?: number;
  /** Callback when click count is reached */
  onActivate?: () => void;
  /** Whether the hook is enabled (default: true) */
  enabled?: boolean;
}

export interface UseMultiClickReturn {
  /** Ref to attach to the target element */
  ref: RefObject<HTMLElement>;
  /** Current click count */
  clickCount: number;
  /** Reset click counter */
  reset: () => void;
  /** Whether the secret has been activated */
  isActivated: boolean;
}

/**
 * Custom hook for detecting multiple rapid clicks
 */
export function useMultiClick(options: UseMultiClickOptions = {}): UseMultiClickReturn {
  const {
    clickCount: targetClickCount = 5,
    timeWindow = 2000,
    onActivate,
    enabled = true
  } = options;

  const [clickCount, setClickCount] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onActivateRef = useRef(onActivate);

  // Keep callback ref updated
  useEffect(() => {
    onActivateRef.current = onActivate;
  }, [onActivate]);

  const reset = useCallback(() => {
    setClickCount(0);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;

    const handleClick = () => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Increment click count
      setClickCount((prev) => {
        const newCount = prev + 1;

        // Check if we've reached the target
        if (newCount === targetClickCount) {
          setIsActivated(true);
          onActivateRef.current?.();
          
          // Reset after activation
          setTimeout(() => {
            setClickCount(0);
            setIsActivated(false);
          }, 100);
          
          return 0;
        }

        // Set timeout to reset if clicks stop
        timeoutRef.current = setTimeout(() => {
          setClickCount(0);
        }, timeWindow);

        return newCount;
      });
    };

    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('click', handleClick);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, targetClickCount, timeWindow]);

  return {
    ref: ref as RefObject<HTMLElement>,
    clickCount,
    reset,
    isActivated
  };
}
