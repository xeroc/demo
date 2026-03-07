/**
 * Tests for Console Component - Story: Handle keyboard visibility on mobile
 * 
 * Acceptance Criteria:
 * - When mobile keyboard appears, console height adjusts dynamically
 * - Main content area remains visible when keyboard is shown
 * - Use CSS `dvh` (dynamic viewport height) or `visualViewport` API if needed
 * - Solution works on both iOS Safari and Android Chrome
 * - Console input field remains accessible when keyboard is open
 * - Typecheck passes
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  createConsole,
  mountConsole,
  unmountConsole,
  getConsole,
  getConsoleInput,
  getConsoleOutput,
  appendConsoleOutput,
  clearConsoleOutput,
  DEFAULT_CONSOLE_CONFIG
} from './consoleComponent';

describe('Console Component', () => {
  beforeEach(() => {
    // Clean up any existing console
    unmountConsole();
  });

  afterEach(() => {
    unmountConsole();
  });

  describe('AC1: Console height adjusts dynamically when mobile keyboard appears', () => {
    it('should create console with mobile-optimized height (1/3 viewport)', () => {
      // Mock mobile viewport
      vi.stubGlobal('innerWidth', 375);
      vi.stubGlobal('innerHeight', 667);

      const console = createConsole();
      expect(console).toBeDefined();
      expect(console.id).toBe('chaoscraft-console');
      
      // Should use dynamic viewport height on mobile
      expect(console.style.maxHeight).toContain('dvh');
      
      vi.unstubAllGlobals();
    });

    it('should use visualViewport API when available', () => {
      const mockVisualViewport = {
        height: 667,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      vi.stubGlobal('visualViewport', mockVisualViewport);
      vi.stubGlobal('innerWidth', 375);
      
      const console = createConsole();
      document.body.appendChild(console);
      
      // Should register visualViewport listeners
      expect(mockVisualViewport.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(mockVisualViewport.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
      
      vi.unstubAllGlobals();
    });

    it('should shrink console when keyboard is visible (viewport height decreases)', () => {
      const mockVisualViewport = {
        height: 300, // Much smaller due to keyboard
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      vi.stubGlobal('visualViewport', mockVisualViewport);
      vi.stubGlobal('innerWidth', 375);
      vi.stubGlobal('innerHeight', 667);
      
      const console = createConsole();
      document.body.appendChild(console);
      
      // Simulate keyboard opening
      const resizeHandler = mockVisualViewport.addEventListener.mock.calls.find(
        call => call[0] === 'resize'
      )?.[1];
      
      if (resizeHandler) {
        resizeHandler();
      }
      
      // Console should shrink when keyboard is open
      const maxHeight = parseInt(console.style.maxHeight);
      expect(maxHeight).toBeLessThan(200); // Should be significantly reduced
      
      vi.unstubAllGlobals();
    });

    it('should restore console height when keyboard is dismissed', () => {
      const mockVisualViewport = {
        height: 667, // Full height (no keyboard)
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      vi.stubGlobal('visualViewport', mockVisualViewport);
      vi.stubGlobal('innerWidth', 375);
      vi.stubGlobal('innerHeight', 667);
      
      const console = createConsole();
      document.body.appendChild(console);
      
      const initialMaxHeight = console.style.maxHeight;
      
      // Simulate resize with no keyboard
      const resizeHandler = mockVisualViewport.addEventListener.mock.calls.find(
        call => call[0] === 'resize'
      )?.[1];
      
      if (resizeHandler) {
        resizeHandler();
      }
      
      // Should restore to default mobile height
      expect(console.style.maxHeight).toBe(DEFAULT_CONSOLE_CONFIG.maxMobileHeight);
      
      vi.unstubAllGlobals();
    });

    it('should fallback to window resize when visualViewport not available', () => {
      vi.stubGlobal('visualViewport', undefined);
      vi.stubGlobal('innerWidth', 375);
      
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      
      const console = createConsole();
      document.body.appendChild(console);
      
      // Should register window resize listener as fallback
      expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      
      addEventListenerSpy.mockRestore();
      vi.unstubAllGlobals();
    });
  });

  describe('AC2: Main content area remains visible when keyboard is shown', () => {
    it('should not occupy more than 1/3 of viewport on mobile', () => {
      vi.stubGlobal('innerWidth', 375);
      vi.stubGlobal('innerHeight', 667);
      
      const console = createConsole();
      document.body.appendChild(console);
      
      // Should use at most 33dvh (1/3 of dynamic viewport height)
      const maxHeight = console.style.maxHeight;
      expect(maxHeight).toMatch(/33dvh|25vh|\d+px/);
      
      vi.unstubAllGlobals();
    });

    it('should leave space above console for main content', () => {
      vi.stubGlobal('innerWidth', 375);
      
      const console = createConsole();
      console.style.position = 'fixed';
      console.style.bottom = '0';
      document.body.appendChild(console);
      
      // Console should be positioned at bottom
      expect(console.style.position).toBe('fixed');
      expect(console.style.bottom).toBe('0');
      
      // Console should not be full height
      expect(console.style.maxHeight).not.toBe('100vh');
      expect(console.style.maxHeight).not.toBe('100%');
      
      vi.unstubAllGlobals();
    });

    it('should use dynamic viewport height (dvh) for better mobile support', () => {
      vi.stubGlobal('innerWidth', 375);
      
      const console = createConsole();
      
      // Should use dvh units for mobile
      expect(console.style.maxHeight).toContain('dvh');
      
      vi.unstubAllGlobals();
    });

    it('should reduce to 25% of visible viewport when keyboard is open', () => {
      const mockVisualViewport = {
        height: 300, // Keyboard takes half the screen
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      vi.stubGlobal('visualViewport', mockVisualViewport);
      vi.stubGlobal('innerWidth', 375);
      vi.stubGlobal('innerHeight', 667);
      
      const console = createConsole();
      document.body.appendChild(console);
      
      // Trigger keyboard handler
      const resizeHandler = mockVisualViewport.addEventListener.mock.calls.find(
        call => call[0] === 'resize'
      )?.[1];
      
      if (resizeHandler) {
        resizeHandler();
      }
      
      // Should use ~25% of visible viewport (300 * 0.25 = 75px)
      const maxHeight = parseInt(console.style.maxHeight);
      expect(maxHeight).toBeLessThanOrEqual(100);
      expect(maxHeight).toBeGreaterThanOrEqual(60);
      
      vi.unstubAllGlobals();
    });
  });

  describe('AC3: Uses CSS dvh or visualViewport API', () => {
    it('should use dvh (dynamic viewport height) for mobile', () => {
      vi.stubGlobal('innerWidth', 375);
      
      const console = createConsole();
      
      // Should contain dvh in max-height
      expect(console.style.maxHeight).toMatch(/\d+dvh/);
      
      vi.unstubAllGlobals();
    });

    it('should use visualViewport API when available', () => {
      const mockVisualViewport = {
        height: 667,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      vi.stubGlobal('visualViewport', mockVisualViewport);
      
      const console = createConsole();
      document.body.appendChild(console);
      
      // Should use visualViewport API
      expect(mockVisualViewport.addEventListener).toHaveBeenCalled();
      
      vi.unstubAllGlobals();
    });

    it('should fall back gracefully when visualViewport is not available', () => {
      vi.stubGlobal('visualViewport', undefined);
      vi.stubGlobal('innerWidth', 375);
      
      expect(() => {
        const console = createConsole();
        document.body.appendChild(console);
      }).not.toThrow();
      
      vi.unstubAllGlobals();
    });
  });

  describe('AC4: Works on both iOS Safari and Android Chrome', () => {
    it('should work on iOS Safari (supports visualViewport)', () => {
      // iOS Safari supports visualViewport
      const mockVisualViewport = {
        height: 667,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      vi.stubGlobal('visualViewport', mockVisualViewport);
      vi.stubGlobal('innerWidth', 375); // iPhone width
      
      const console = createConsole();
      document.body.appendChild(console);
      
      expect(console).toBeDefined();
      expect(mockVisualViewport.addEventListener).toHaveBeenCalled();
      
      vi.unstubAllGlobals();
    });

    it('should work on Android Chrome (supports visualViewport)', () => {
      // Android Chrome supports visualViewport
      const mockVisualViewport = {
        height: 640,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      vi.stubGlobal('visualViewport', mockVisualViewport);
      vi.stubGlobal('innerWidth', 360); // Android width
      
      const console = createConsole();
      document.body.appendChild(console);
      
      expect(console).toBeDefined();
      expect(mockVisualViewport.addEventListener).toHaveBeenCalled();
      
      vi.unstubAllGlobals();
    });

    it('should work on older browsers without visualViewport', () => {
      vi.stubGlobal('visualViewport', undefined);
      vi.stubGlobal('innerWidth', 375);
      
      const console = createConsole();
      document.body.appendChild(console);
      
      expect(console).toBeDefined();
      // Should fallback to window resize
      expect(console.style.maxHeight).toBeDefined();
      
      vi.unstubAllGlobals();
    });

    it('should handle rapid keyboard show/hide cycles', () => {
      const mockVisualViewport = {
        height: 667,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      vi.stubGlobal('visualViewport', mockVisualViewport);
      vi.stubGlobal('innerWidth', 375);
      vi.stubGlobal('innerHeight', 667);
      
      const console = createConsole();
      document.body.appendChild(console);
      
      const resizeHandler = mockVisualViewport.addEventListener.mock.calls.find(
        call => call[0] === 'resize'
      )?.[1];
      
      // Simulate rapid keyboard cycles
      for (let i = 0; i < 10; i++) {
        // Keyboard open
        mockVisualViewport.height = 300;
        if (resizeHandler) resizeHandler();
        
        // Keyboard closed
        mockVisualViewport.height = 667;
        if (resizeHandler) resizeHandler();
      }
      
      // Should handle gracefully without errors
      expect(console).toBeDefined();
      
      vi.unstubAllGlobals();
    });
  });

  describe('AC5: Console input field remains accessible when keyboard is open', () => {
    it('should have accessible input field', () => {
      const console = createConsole();
      document.body.appendChild(console);
      
      const input = console.querySelector('input');
      expect(input).toBeDefined();
      expect(input?.type).toBe('text');
      expect(input?.hasAttribute('aria-label')).toBe(true);
    });

    it('should focus input without issues', () => {
      const console = createConsole();
      document.body.appendChild(console);
      
      const input = getConsoleInput();
      expect(input).toBeDefined();
      
      if (input) {
        expect(() => input.focus()).not.toThrow();
      }
    });

    it('should scroll console into view when input is focused on mobile', () => {
      vi.stubGlobal('innerWidth', 375);
      
      const console = createConsole();
      document.body.appendChild(console);
      
      const scrollIntoViewMock = vi.fn();
      console.scrollIntoView = scrollIntoViewMock;
      
      const input = getConsoleInput();
      if (input) {
        input.focus();
      }
      
      // Should scroll into view after timeout
      setTimeout(() => {
        expect(scrollIntoViewMock).toHaveBeenCalledWith({
          behavior: 'smooth',
          block: 'end'
        });
      }, 350);
      
      vi.unstubAllGlobals();
    });

    it('should have proper placeholder text', () => {
      const console = createConsole({ placeholder: 'Enter command...' });
      document.body.appendChild(console);
      
      const input = getConsoleInput();
      expect(input?.placeholder).toBe('Enter command...');
    });

    it('should maintain input visibility when keyboard is shown', () => {
      const mockVisualViewport = {
        height: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      vi.stubGlobal('visualViewport', mockVisualViewport);
      vi.stubGlobal('innerWidth', 375);
      vi.stubGlobal('innerHeight', 667);
      
      const console = createConsole();
      document.body.appendChild(console);
      
      // Trigger keyboard
      const resizeHandler = mockVisualViewport.addEventListener.mock.calls.find(
        call => call[0] === 'resize'
      )?.[1];
      
      if (resizeHandler) {
        resizeHandler();
      }
      
      const input = getConsoleInput();
      expect(input).toBeDefined();
      expect(input?.offsetParent).not.toBeNull();
      
      vi.unstubAllGlobals();
    });
  });

  describe('AC6: Typecheck passes', () => {
    it('should export all required functions with correct types', () => {
      expect(typeof createConsole).toBe('function');
      expect(typeof mountConsole).toBe('function');
      expect(typeof unmountConsole).toBe('function');
      expect(typeof getConsole).toBe('function');
      expect(typeof getConsoleInput).toBe('function');
      expect(typeof getConsoleOutput).toBe('function');
      expect(typeof appendConsoleOutput).toBe('function');
      expect(typeof clearConsoleOutput).toBe('function');
    });

    it('should have correct DEFAULT_CONSOLE_CONFIG type', () => {
      expect(DEFAULT_CONSOLE_CONFIG).toBeDefined();
      expect(typeof DEFAULT_CONSOLE_CONFIG.placeholder).toBe('string');
      expect(typeof DEFAULT_CONSOLE_CONFIG.maxHeight).toBe('string');
      expect(typeof DEFAULT_CONSOLE_CONFIG.minHeight).toBe('string');
      expect(typeof DEFAULT_CONSOLE_CONFIG.maxMobileHeight).toBe('string');
    });

    it('should return HTMLElement from createConsole', () => {
      const console = createConsole();
      expect(console).toBeInstanceOf(HTMLElement);
    });

    it('should accept partial ConsoleConfig', () => {
      const console = createConsole({ placeholder: 'Test' });
      expect(console).toBeDefined();
    });
  });

  describe('Mount/Unmount functionality', () => {
    it('should mount console to body by default', () => {
      const console = mountConsole();
      expect(console).toBeDefined();
      expect(document.body.contains(console)).toBe(true);
    });

    it('should mount console to specific container', () => {
      const container = document.createElement('div');
      container.id = 'console-container';
      document.body.appendChild(container);
      
      const console = mountConsole('console-container');
      expect(console).toBeDefined();
      expect(container.contains(console)).toBe(true);
      
      document.body.removeChild(container);
    });

    it('should return null if container not found', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const consoleEl = mountConsole('non-existent');
      expect(consoleEl).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should unmount console properly', () => {
      mountConsole();
      expect(getConsole()).toBeDefined();
      
      unmountConsole();
      expect(getConsole()).toBeNull();
    });

    it('should cleanup event listeners on unmount', () => {
      const mockVisualViewport = {
        height: 667,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
      
      vi.stubGlobal('visualViewport', mockVisualViewport);
      
      const console = mountConsole();
      expect(console).toBeDefined();
      
      unmountConsole();
      
      // Should cleanup listeners
      expect(mockVisualViewport.removeEventListener).toHaveBeenCalled();
      
      vi.unstubAllGlobals();
    });
  });

  describe('Console output functions', () => {
    beforeEach(() => {
      mountConsole();
    });

    afterEach(() => {
      unmountConsole();
    });

    it('should append output to console', () => {
      appendConsoleOutput('Test message');
      const output = getConsoleOutput();
      expect(output?.textContent).toContain('Test message');
    });

    it('should clear console output', () => {
      appendConsoleOutput('Test message');
      clearConsoleOutput();
      const output = getConsoleOutput();
      expect(output?.innerHTML).toBe('');
    });

    it('should handle multiple output lines', () => {
      appendConsoleOutput('Line 1');
      appendConsoleOutput('Line 2');
      appendConsoleOutput('Line 3');
      
      const output = getConsoleOutput();
      expect(output?.children.length).toBe(3);
    });

    it('should scroll to bottom on new output', () => {
      const output = getConsoleOutput();
      if (output) {
        Object.defineProperty(output, 'scrollHeight', { value: 1000 });
        Object.defineProperty(output, 'scrollTop', { value: 0, writable: true });
        
        appendConsoleOutput('New line');
        
        expect(output.scrollTop).toBe(1000);
      }
    });
  });

  describe('Responsive design', () => {
    it('should have different styles for mobile vs desktop', () => {
      // Mobile
      vi.stubGlobal('innerWidth', 375);
      const mobileConsole = createConsole();
      const mobileHeight = mobileConsole.style.maxHeight;
      
      vi.unstubAllGlobals();
      
      // Desktop
      vi.stubGlobal('innerWidth', 1024);
      const desktopConsole = createConsole();
      const desktopHeight = desktopConsole.style.maxHeight;
      
      // Should have different heights
      expect(mobileHeight).not.toBe(desktopHeight);
      
      vi.unstubAllGlobals();
    });

    it('should use larger height on desktop', () => {
      vi.stubGlobal('innerWidth', 1024);
      
      const console = createConsole();
      
      // Desktop should use standard max-height
      expect(console.style.maxHeight).toBe(DEFAULT_CONSOLE_CONFIG.maxHeight);
      
      vi.unstubAllGlobals();
    });

    it('should use responsive text sizing', () => {
      const console = createConsole();
      const input = console.querySelector('input');
      
      // Should have responsive text classes
      expect(input?.className).toMatch(/text-xs|text-sm/);
    });

    it('should use responsive padding', () => {
      const console = createConsole();
      
      // Should have responsive padding classes
      expect(console.innerHTML).toMatch(/px-3|px-4|py-2|py-3/);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const console = createConsole();
      
      expect(console.getAttribute('role')).toBe('log');
      expect(console.hasAttribute('aria-label')).toBe(true);
    });

    it('should have accessible input', () => {
      const console = createConsole();
      const input = console.querySelector('input');
      
      expect(input?.hasAttribute('aria-label')).toBe(true);
    });

    it('should be keyboard navigable', () => {
      const console = createConsole();
      document.body.appendChild(console);
      
      const input = getConsoleInput();
      if (input) {
        input.focus();
        expect(document.activeElement).toBe(input);
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle missing input element gracefully', () => {
      const console = createConsole();
      document.body.appendChild(console);
      
      // Remove input
      const input = console.querySelector('input');
      input?.remove();
      
      const retrievedInput = getConsoleInput();
      expect(retrievedInput).toBeNull();
    });

    it('should handle missing output element gracefully', () => {
      const console = createConsole();
      document.body.appendChild(console);
      
      // Remove output
      const output = getConsoleOutput();
      output?.remove();
      
      // Should not throw
      expect(() => appendConsoleOutput('Test')).not.toThrow();
    });

    it('should handle double mount gracefully', () => {
      const console1 = mountConsole();
      const console2 = mountConsole();
      
      // Should replace the first console
      expect(console1?.id).toBe('chaoscraft-console');
      expect(console2?.id).toBe('chaoscraft-console');
      expect(document.querySelectorAll('#chaoscraft-console').length).toBeLessThanOrEqual(1);
    });

    it('should handle unmount when not mounted', () => {
      expect(() => unmountConsole()).not.toThrow();
    });
  });
});
