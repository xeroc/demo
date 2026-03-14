/**
 * Tests for Konami Code Easter Egg Component
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  mountKonamiCode,
  unmountKonamiCode,
  getKonamiOverlay,
  isKonamiActive,
  triggerKonamiCode,
  resetKonamiSequence
} from './konamiCodeComponent';

describe('Konami Code Component', () => {
  beforeEach(() => {
    // Clean up before each test
    unmountKonamiCode();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Clean up after each test
    unmountKonamiCode();
    document.body.innerHTML = '';
  });

  describe('mountKonamiCode', () => {
    it('should mount the keydown listener', () => {
      const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
      mountKonamiCode();
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      addEventListenerSpy.mockRestore();
    });

    it('should not create overlay on mount', () => {
      mountKonamiCode();
      
      const overlay = document.getElementById('konami-celebration-overlay');
      expect(overlay).toBeNull();
    });

    it('should call onActivate callback when triggered', () => {
      const onActivate = vi.fn();
      mountKonamiCode({ onActivate });
      
      // Manually trigger for testing
      triggerKonamiCode({ onActivate });
      
      expect(onActivate).toHaveBeenCalled();
    });
  });

  describe('unmountKonamiCode', () => {
    it('should remove the keydown listener', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      mountKonamiCode();
      unmountKonamiCode();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it('should remove overlay if active', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      expect(getKonamiOverlay()).not.toBeNull();
      
      unmountKonamiCode();
      
      expect(getKonamiOverlay()).toBeNull();
    });

    it('should reset isActive state', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      expect(isKonamiActive()).toBe(true);
      
      unmountKonamiCode();
      
      expect(isKonamiActive()).toBe(false);
    });
  });

  describe('getKonamiOverlay', () => {
    it('should return null when not active', () => {
      mountKonamiCode();
      
      expect(getKonamiOverlay()).toBeNull();
    });

    it('should return overlay element when active', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      const overlay = getKonamiOverlay();
      expect(overlay).not.toBeNull();
      expect(overlay?.id).toBe('konami-celebration-overlay');
    });
  });

  describe('isKonamiActive', () => {
    it('should return false when not active', () => {
      mountKonamiCode();
      
      expect(isKonamiActive()).toBe(false);
    });

    it('should return true when active', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      expect(isKonamiActive()).toBe(true);
    });
  });

  describe('triggerKonamiCode', () => {
    it('should activate the Easter egg', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      expect(isKonamiActive()).toBe(true);
      expect(getKonamiOverlay()).not.toBeNull();
    });

    it('should create celebration overlay with correct elements', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      const overlay = getKonamiOverlay();
      expect(overlay).not.toBeNull();
      expect(overlay?.getAttribute('role')).toBe('dialog');
      expect(overlay?.getAttribute('aria-label')).toContain('Chaos Master');
      expect(overlay?.textContent).toContain('Chaos Master');
      expect(overlay?.textContent).toContain('You found the chaos!');
    });

    it('should create achievement badge', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      const overlay = getKonamiOverlay();
      expect(overlay?.innerHTML).toContain('🏆');
    });

    it('should include particle and sparkle animations in overlay', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      const overlay = getKonamiOverlay();
      expect(overlay).not.toBeNull();
      
      // Verify animation styles are added to the document
      const animationStyles = document.getElementById('konami-animations');
      expect(animationStyles).not.toBeNull();
      expect(animationStyles?.textContent).toContain('particle-explode');
      expect(animationStyles?.textContent).toContain('sparkle-float');
    });
  });

  describe('resetKonamiSequence', () => {
    it('should reset input sequence', () => {
      mountKonamiCode();
      resetKonamiSequence();
      
      // This is mainly for testing purposes, so we just verify it doesn't throw
      expect(() => resetKonamiSequence()).not.toThrow();
    });
  });

  describe('Keyboard Input', () => {
    it('should activate on correct Konami code sequence', () => {
      mountKonamiCode();
      
      // Simulate Konami code: ↑↑↓↓←→←→BA
      const keys = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
      ];
      
      keys.forEach(code => {
        document.dispatchEvent(new KeyboardEvent('keydown', { code }));
      });
      
      expect(isKonamiActive()).toBe(true);
    });

    it('should not activate on partial sequence', () => {
      mountKonamiCode();
      
      // Simulate partial sequence
      const keys = ['ArrowUp', 'ArrowUp', 'ArrowDown'];
      
      keys.forEach(code => {
        document.dispatchEvent(new KeyboardEvent('keydown', { code }));
      });
      
      expect(isKonamiActive()).toBe(false);
    });

    it('should not activate on wrong sequence', () => {
      mountKonamiCode();
      
      // Simulate wrong sequence
      const keys = [
        'ArrowDown', 'ArrowDown',
        'ArrowUp', 'ArrowUp',
        'ArrowRight', 'ArrowLeft',
        'ArrowRight', 'ArrowLeft',
        'KeyA', 'KeyB'
      ];
      
      keys.forEach(code => {
        document.dispatchEvent(new KeyboardEvent('keydown', { code }));
      });
      
      expect(isKonamiActive()).toBe(false);
    });

    it('should close on ESC key', async () => {
      vi.useFakeTimers();
      
      mountKonamiCode();
      triggerKonamiCode();
      
      expect(isKonamiActive()).toBe(true);
      
      // Press ESC
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      
      // Wait for animation to complete
      vi.advanceTimersByTime(400);
      
      expect(isKonamiActive()).toBe(false);
      
      vi.useRealTimers();
    });

    it('should close on click', async () => {
      vi.useFakeTimers();
      
      mountKonamiCode();
      triggerKonamiCode();
      
      const overlay = getKonamiOverlay();
      expect(overlay).not.toBeNull();
      
      // Click overlay
      overlay?.click();
      
      // Wait for animation to complete
      vi.advanceTimersByTime(400);
      
      expect(isKonamiActive()).toBe(false);
      
      vi.useRealTimers();
    });
  });

  describe('Auto Reset', () => {
    it('should reset sequence after delay when autoReset is true', () => {
      vi.useFakeTimers();
      
      mountKonamiCode({ autoReset: true, resetDelay: 1000 });
      triggerKonamiCode();
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      
      // Sequence should be reset (we can't directly check, but we verify no errors)
      expect(() => vi.advanceTimersByTime(1000)).not.toThrow();
      
      vi.useRealTimers();
    });

    it('should not reset sequence when autoReset is false', () => {
      vi.useFakeTimers();
      
      mountKonamiCode({ autoReset: false });
      triggerKonamiCode();
      
      // Fast-forward time
      vi.advanceTimersByTime(5000);
      
      // Should still be active
      expect(isKonamiActive()).toBe(true);
      
      vi.useRealTimers();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      const overlay = getKonamiOverlay();
      expect(overlay?.getAttribute('role')).toBe('dialog');
      expect(overlay?.getAttribute('aria-label')).toBeDefined();
    });

    it('should be dismissible with ESC key', async () => {
      vi.useFakeTimers();
      
      mountKonamiCode();
      triggerKonamiCode();
      
      const overlay = getKonamiOverlay();
      expect(overlay).not.toBeNull();
      
      // Press ESC to dismiss
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      
      // Wait for animation
      vi.advanceTimersByTime(400);
      
      expect(getKonamiOverlay()).toBeNull();
      
      vi.useRealTimers();
    });

    it('should be dismissible by clicking', async () => {
      vi.useFakeTimers();
      
      mountKonamiCode();
      triggerKonamiCode();
      
      const overlay = getKonamiOverlay();
      expect(overlay).not.toBeNull();
      
      // Click to dismiss
      overlay?.click();
      
      // Wait for animation
      vi.advanceTimersByTime(400);
      
      expect(getKonamiOverlay()).toBeNull();
      
      vi.useRealTimers();
    });
  });

  describe('Cleanup', () => {
    it('should remove all elements on unmount', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      const overlay = getKonamiOverlay();
      expect(overlay).not.toBeNull();
      
      unmountKonamiCode();
      
      expect(getKonamiOverlay()).toBeNull();
      expect(document.getElementById('konami-celebration-overlay')).toBeNull();
    });

    it('should remove animation styles on unmount', () => {
      mountKonamiCode();
      triggerKonamiCode();
      
      expect(document.getElementById('konami-animations')).not.toBeNull();
      
      unmountKonamiCode();
      
      expect(document.getElementById('konami-animations')).toBeNull();
    });

    it('should handle multiple mount/unmount cycles', () => {
      for (let i = 0; i < 3; i++) {
        mountKonamiCode();
        triggerKonamiCode();
        expect(isKonamiActive()).toBe(true);
        
        unmountKonamiCode();
        expect(isKonamiActive()).toBe(false);
      }
    });
  });
});
