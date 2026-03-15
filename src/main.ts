/**
 * Main module for ChaosCraft site
 */

import { initAnimatedBackground, DEFAULT_CONFIG } from './index';
import { mountDancingRobot } from './robotSvg';
import { mountBanner } from './bannerComponent';
import { mountNavbar } from './navbarComponent';
import { mountFooter } from './footerComponent';
import { mountJoke } from './jokeComponent';
import { mountCountries } from './countriesComponent';
import { injectResponsiveUtilities } from './responsiveUtils';
import { mountKonamiCode } from './konamiCodeComponent';
import { animateMainContentSections } from './entranceAnimations';

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
    
    // Mount random joke below robot
    mountJoke('joke-container-wrapper');
    
    // Mount countries section (after joke, before footer)
    mountCountries('countries-wrapper');
    
    // Mount footer at the bottom (copyright only, no links)
    mountFooter();
    
    // Mount Konami code Easter egg (hidden, discoverable)
    mountKonamiCode();
    
    // Apply entrance animations to all main content sections
    // Small delay ensures all components are fully mounted
    requestAnimationFrame(() => {
      animateMainContentSections();
    });
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
export { mountJoke, unmountJoke, getJoke } from './jokeComponent';
export { mountCountries, unmountCountries, getCountries } from './countriesComponent';
export type { CountriesConfig } from './countriesComponent';
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
export { 
  mountKonamiCode, 
  unmountKonamiCode, 
  getKonamiOverlay, 
  isKonamiActive, 
  triggerKonamiCode,
  resetKonamiSequence
} from './konamiCodeComponent';
export type { KonamiCodeConfig } from './konamiCodeComponent';
export {
  prefersReducedMotion,
  applyEntranceAnimation,
  registerEntranceAnimation,
  registerEntranceAnimationsBatch,
  animateMainContentSections,
  cleanupEntranceAnimations
} from './entranceAnimations';
export type { EntranceAnimationConfig } from './entranceAnimations';
