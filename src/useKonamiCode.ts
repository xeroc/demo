/**
 * useKonamiCode Custom Hook
 * 
 * React hook that listens for the Konami code sequence (↑↑↓↓←→←→BA)
 * and triggers a callback when successfully entered.
 * 
 * @example
 * ```tsx
 * const { isActive, reset } = useKonamiCode({
 *   onActivate: () => console.log('Easter egg unlocked!')
 * });
 * ```
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseKonamiCodeOptions {
  onActivate?: () => void;
  autoReset?: boolean;
  resetDelay?: number;
  enabled?: boolean;
}

export interface UseKonamiCodeReturn {
  isActive: boolean;
  reset: () => void;
  sequence: string[];
  progress: number;
}

// Konami Code sequence: ↑↑↓↓←→←→BA
export const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
] as const;

/**
 * Custom hook for detecting the Konami code sequence
 */
export function useKonamiCode(options: UseKonamiCodeOptions = {}): UseKonamiCodeReturn {
  const {
    onActivate,
    autoReset = true,
    resetDelay = 5000,
    enabled = true
  } = options;

  const [isActive, setIsActive] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  
  // Use refs to avoid stale closures in event listener
  const sequenceRef = useRef<string[]>([]);
  const isActiveRef = useRef(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onActivateRef = useRef(onActivate);

  // Keep refs in sync
  useEffect(() => {
    onActivateRef.current = onActivate;
  }, [onActivate]);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);

  const reset = useCallback(() => {
    setIsActive(false);
    setSequence([]);
    sequenceRef.current = [];
    isActiveRef.current = false;
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleKeydown = (event: KeyboardEvent) => {
      // Close on ESC
      if (event.key === 'Escape' && isActiveRef.current) {
        reset();
        return;
      }

      // Add key to sequence
      const newSequence = [...sequenceRef.current, event.code].slice(-10);
      sequenceRef.current = newSequence;
      setSequence(newSequence);

      // Check if sequence matches Konami code
      if (newSequence.length === 10 && !isActiveRef.current) {
        const matches = newSequence.every((key, index) => key === KONAMI_CODE[index]);

        if (matches) {
          isActiveRef.current = true;
          setIsActive(true);
          onActivateRef.current?.();

          // Auto-reset sequence after delay
          if (autoReset) {
            resetTimeoutRef.current = setTimeout(() => {
              sequenceRef.current = [];
              setSequence([]);
            }, resetDelay);
          }

          console.log('🎮 Konami Code activated! You found the chaos!');
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [enabled, autoReset, resetDelay, reset]);

  // Calculate progress (0 to 1)
  const progress = sequence.length / KONAMI_CODE.length;

  return {
    isActive,
    reset,
    sequence,
    progress
  };
}
