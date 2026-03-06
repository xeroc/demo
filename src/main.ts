/**
 * Main module for ChaosCraft site
 */

import { initAnimatedBackground, DEFAULT_CONFIG } from './index';
import { mountDancingRobot } from './robotSvg';
import { mountBanner } from './bannerComponent';
import { mountNavbar } from './navbarComponent';
import { mountFooter } from './footerComponent';
import { injectResponsiveUtilities } from './responsiveUtils';

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Inject responsive utility styles
    injectResponsiveUtilities();
    
    // Mount navbar first (header image and name only)
    mountNavbar();
    
    // Mount banner after navbar (explains what's going on with link to app)
    mountBanner();
    
    // Initialize animated background
    initAnimatedBackground(DEFAULT_CONFIG);
    
    // Mount dancing robot
    mountDancingRobot('robot-container');
    
    // Mount footer at the bottom (copyright only, no links)
    mountFooter();
  });
}

export { initAnimatedBackground, getActiveBackgroundComponent, cleanupAnimatedBackground } from './index';
export type { GradientConfig } from './index';
export { createDancingRobot, mountDancingRobot, unmountDancingRobot } from './robotSvg';
export { createBanner, mountBanner, unmountBanner, getBanner } from './bannerComponent';
export type { BannerConfig } from './bannerComponent';
export { createNavbar, mountNavbar, unmountNavbar, getNavbar } from './navbarComponent';
export type { NavbarConfig } from './navbarComponent';
export { createFooter, mountFooter, unmountFooter, getFooter } from './footerComponent';
export type { FooterConfig } from './footerComponent';
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
