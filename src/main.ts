/**
 * Main module for animated background feature
 */

import { initAnimatedBackground, DEFAULT_CONFIG } from './index';
import { mountDancingRobot } from './robotSvg';

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initAnimatedBackground(DEFAULT_CONFIG);
    mountDancingRobot('robot-container');
  });
}

export { initAnimatedBackground, getActiveBackgroundComponent, cleanupAnimatedBackground } from './index';
export type { GradientConfig } from './index';
export { createDancingRobot, mountDancingRobot, unmountDancingRobot } from './robotSvg';
