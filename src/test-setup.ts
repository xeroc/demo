/**
 * Test setup file for Vitest
 * Configures testing environment for React components
 */

import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Mock IntersectionObserver for components that use it
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver for components that use it
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;

// Mock scrollTo
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
