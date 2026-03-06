/**
 * Main module for ChaosCraft site
 */

import { initAnimatedBackground, DEFAULT_CONFIG } from './index';
import { mountDancingRobot } from './robotSvg';
import { mountBanner } from './bannerComponent';
import { mountHeader } from './headerComponent';
import { mountFooter } from './footerComponent';
import { injectResponsiveUtilities } from './responsiveUtils';

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Inject responsive utility styles
    injectResponsiveUtilities();
    // Mount banner at the top of the page
    mountBanner();
    // Mount header after banner
    mountHeader();
    // Initialize animated background
    initAnimatedBackground(DEFAULT_CONFIG);
    // Mount dancing robot
    mountDancingRobot('robot-container');
    // Mount footer at the bottom of the page
    mountFooter();
  });
}

export { initAnimatedBackground, getActiveBackgroundComponent, cleanupAnimatedBackground } from './index';
export type { GradientConfig } from './index';
export { createDancingRobot, mountDancingRobot, unmountDancingRobot } from './robotSvg';
export { createBanner, mountBanner, unmountBanner, getBanner } from './bannerComponent';
export type { BannerConfig } from './bannerComponent';
export { createHeader, mountHeader, unmountHeader, getHeader, setActiveNavItem } from './headerComponent';
export type { HeaderConfig, NavItem } from './headerComponent';
export { createFooter, mountFooter, unmountFooter, getFooter } from './footerComponent';
export type { FooterConfig, FooterLink } from './footerComponent';
export { 
  injectResponsiveUtilities, 
  isVisibleAtBreakpoint, 
  validateTouchTarget, 
  hasHorizontalScroll, 
  getCurrentBreakpoint,
  BREAKPOINTS,
  MEDIA_QUERIES,
  RESPONSIVE_UTILITY_STYLES
} from './responsiveUtils';
