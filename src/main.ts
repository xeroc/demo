/**
 * Main module for ChaosCraft site
 */

import { initAnimatedBackground, DEFAULT_CONFIG } from './index';
import { mountDancingRobot } from './robotSvg';
import { mountBanner } from './bannerComponent';
import { mountHeader } from './headerComponent';

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Mount banner at the top of the page
    mountBanner();
    // Mount header after banner
    mountHeader();
    // Initialize animated background
    initAnimatedBackground(DEFAULT_CONFIG);
    // Mount dancing robot
    mountDancingRobot('robot-container');
  });
}

export { initAnimatedBackground, getActiveBackgroundComponent, cleanupAnimatedBackground } from './index';
export type { GradientConfig } from './index';
export { createDancingRobot, mountDancingRobot, unmountDancingRobot } from './robotSvg';
export { createBanner, mountBanner, unmountBanner, getBanner } from './bannerComponent';
export type { BannerConfig } from './bannerComponent';
export { createHeader, mountHeader, unmountHeader, getHeader, setActiveNavItem } from './headerComponent';
export type { HeaderConfig, NavItem } from './headerComponent';
