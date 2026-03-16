/**
 * Test utilities for React Testing Library
 * Provides custom render function with common providers and utilities
 */

import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

/**
 * Custom render function that includes common providers
 * Add providers here as needed (Router, Context, etc.)
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { ...options });
}

/**
 * Re-export everything from @testing-library/react
 */
export * from '@testing-library/react';

/**
 * Override render method with custom render
 */
export { customRender as render };
