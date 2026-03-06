/**
 * Responsive Utility Classes for ChaosCraft
 * Provides responsive visibility and hiding utilities
 */

/**
 * CSS styles for responsive utility classes
 * These should be added to the document head
 */
export const RESPONSIVE_UTILITY_STYLES = `
  /* Responsive Visibility Utilities */
  
  /* Hide on mobile (0-639px), show on tablet and up (640px+) */
  .hide-mobile {
    display: none;
  }
  
  @media (min-width: 640px) {
    .hide-mobile {
      display: block;
    }
  }
  
  /* Hide on tablet (640px-1023px), show on mobile and desktop */
  .hide-tablet {
    display: block;
  }
  
  @media (min-width: 640px) and (max-width: 1023px) {
    .hide-tablet {
      display: none;
    }
  }
  
  /* Hide on desktop (1024px+), show on mobile and tablet */
  .hide-desktop {
    display: block;
  }
  
  @media (min-width: 1024px) {
    .hide-desktop {
      display: none;
    }
  }
  
  /* Show only on mobile (0-639px) */
  .show-mobile-only {
    display: block;
  }
  
  @media (min-width: 640px) {
    .show-mobile-only {
      display: none;
    }
  }
  
  /* Show only on tablet (640px-1023px) */
  .show-tablet-only {
    display: none;
  }
  
  @media (min-width: 640px) and (max-width: 1023px) {
    .show-tablet-only {
      display: block;
    }
  }
  
  /* Show only on desktop (1024px+) */
  .show-desktop-only {
    display: none;
  }
  
  @media (min-width: 1024px) {
    .show-desktop-only {
      display: block;
    }
  }
  
  /* Inline variants */
  .hide-mobile-inline {
    display: none;
  }
  
  @media (min-width: 640px) {
    .hide-mobile-inline {
      display: inline;
    }
  }
  
  .hide-tablet-inline {
    display: inline;
  }
  
  @media (min-width: 640px) and (max-width: 1023px) {
    .hide-tablet-inline {
      display: none;
    }
  }
  
  .hide-desktop-inline {
    display: inline;
  }
  
  @media (min-width: 1024px) {
    .hide-desktop-inline {
      display: none;
    }
  }
  
  /* Flex variants */
  .hide-mobile-flex {
    display: none;
  }
  
  @media (min-width: 640px) {
    .hide-mobile-flex {
      display: flex;
    }
  }
  
  .hide-tablet-flex {
    display: flex;
  }
  
  @media (min-width: 640px) and (max-width: 1023px) {
    .hide-tablet-flex {
      display: none;
    }
  }
  
  .hide-desktop-flex {
    display: flex;
  }
  
  @media (min-width: 1024px) {
    .hide-desktop-flex {
      display: none;
    }
  }
  
  /* Touch target minimum size (44px x 44px) */
  .touch-target {
    min-width: 44px;
    min-height: 44px;
  }
  
  /* Prevent horizontal scroll */
  .prevent-overflow-x {
    overflow-x: hidden;
    max-width: 100vw;
  }
  
  /* Ensure proper box sizing */
  .box-border {
    box-sizing: border-box;
  }
  
  /* Minimum readable font size on mobile */
  @media (max-width: 639px) {
    .text-readable {
      font-size: max(16px, 1rem);
    }
  }
`;

/**
 * Injects responsive utility styles into the document head
 */
export function injectResponsiveUtilities(): void {
  if (typeof document === 'undefined') return;
  
  // Check if styles already exist
  const existingStyle = document.getElementById('chaoscraft-responsive-utilities');
  if (existingStyle) return;
  
  const style = document.createElement('style');
  style.id = 'chaoscraft-responsive-utilities';
  style.textContent = RESPONSIVE_UTILITY_STYLES;
  document.head.appendChild(style);
}

/**
 * Checks if an element is visible at current viewport width
 */
export function isVisibleAtBreakpoint(element: HTMLElement, breakpoint: 'mobile' | 'tablet' | 'desktop'): boolean {
  const classes = element.className.split(' ');
  
  // Check hide classes
  if (breakpoint === 'mobile' && classes.includes('hide-mobile')) return false;
  if (breakpoint === 'tablet' && classes.includes('hide-tablet')) return false;
  if (breakpoint === 'desktop' && classes.includes('hide-desktop')) return false;
  
  // Check show classes
  if (breakpoint === 'mobile' && classes.includes('show-mobile-only')) return true;
  if (breakpoint === 'tablet' && classes.includes('show-tablet-only')) return true;
  if (breakpoint === 'desktop' && classes.includes('show-desktop-only')) return true;
  
  // Default visibility
  if (breakpoint === 'mobile' && (classes.includes('show-tablet-only') || classes.includes('show-desktop-only'))) return false;
  if (breakpoint === 'tablet' && (classes.includes('show-mobile-only') || classes.includes('show-desktop-only'))) return false;
  if (breakpoint === 'desktop' && (classes.includes('show-mobile-only') || classes.includes('show-tablet-only'))) return false;
  
  return true;
}

/**
 * Validates touch target size (minimum 44px)
 */
export function validateTouchTarget(element: HTMLElement): { isValid: boolean; width: number; height: number } {
  const rect = element.getBoundingClientRect();
  return {
    isValid: rect.width >= 44 && rect.height >= 44,
    width: rect.width,
    height: rect.height
  };
}

/**
 * Checks if page has horizontal scroll
 */
export function hasHorizontalScroll(): boolean {
  return document.documentElement.scrollWidth > document.documentElement.clientWidth;
}

/**
 * Gets current breakpoint name
 */
export function getCurrentBreakpoint(): 'mobile' | 'tablet' | 'desktop' | 'wide' {
  const width = window.innerWidth;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1280) return 'desktop';
  return 'wide';
}

/**
 * Responsive breakpoint values
 */
export const BREAKPOINTS = {
  mobile: 0,
  tablet: 640,
  desktop: 1024,
  wide: 1280
} as const;

/**
 * Media query strings for each breakpoint
 */
export const MEDIA_QUERIES = {
  mobile: `screen and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tablet: `screen and (min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop - 1}px)`,
  desktop: `screen and (min-width: ${BREAKPOINTS.desktop}px) and (max-width: ${BREAKPOINTS.wide - 1}px)`,
  wide: `screen and (min-width: ${BREAKPOINTS.wide}px)`,
  mobileAndUp: `screen and (min-width: ${BREAKPOINTS.mobile}px)`,
  tabletAndUp: `screen and (min-width: ${BREAKPOINTS.tablet}px)`,
  desktopAndUp: `screen and (min-width: ${BREAKPOINTS.desktop}px)`
} as const;
