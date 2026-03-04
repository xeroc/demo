/**
 * Main module for animated background feature
 */

import { initAnimatedBackground, DEFAULT_CONFIG } from './index';

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initAnimatedBackground(DEFAULT_CONFIG);
  });
}

export { initAnimatedBackground, getActiveBackgroundComponent, cleanupAnimatedBackground } from './index';
export type { GradientConfig } from './index';
