/**
 * Entrance Animations Utility
 * 
 * Provides subtle reveal animations for content sections using IntersectionObserver.
 * Sections fade and slide in as they enter viewport.
 * Respects prefers-reduced-motion for accessibility.
 */

export interface EntranceAnimationConfig {
  /** Direction of slide animation: 'up', 'down', 'left', 'right', 'none' */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Delay before animation starts (in milliseconds) */
  delay?: number;
  /** Duration of animation (in milliseconds) */
  duration?: number;
  /** Distance to slide (in pixels) */
  distance?: number;
  /** Easing function */
  easing?: string;
  /** Threshold for triggering (0-1) */
  threshold?: number;
  /** Root margin for IntersectionObserver */
  rootMargin?: string;
}

export const DEFAULT_ENTRANCE_CONFIG: Required<EntranceAnimationConfig> = {
  direction: 'up',
  delay: 0,
  duration: 600,
  distance: 30,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get transform value based on direction
 */
function getInitialTransform(direction: string, distance: number): string {
  switch (direction) {
    case 'up':
      return `translateY(${distance}px)`;
    case 'down':
      return `translateY(-${distance}px)`;
    case 'left':
      return `translateX(${distance}px)`;
    case 'right':
      return `translateX(-${distance}px)`;
    case 'none':
      return 'none';
    default:
      return `translateY(${distance}px)`;
  }
}

/**
 * Apply entrance animation to an element
 */
export function applyEntranceAnimation(
  element: HTMLElement,
  config: Partial<EntranceAnimationConfig> = {}
): void {
  // Merge with defaults
  const finalConfig = { ...DEFAULT_ENTRANCE_CONFIG, ...config };
  
  // Respect prefers-reduced-motion
  if (prefersReducedMotion()) {
    // Just make element visible without animation
    element.style.opacity = '1';
    element.style.transform = 'none';
    return;
  }
  
  // Set initial state
  element.style.opacity = '0';
  element.style.transform = getInitialTransform(finalConfig.direction, finalConfig.distance);
  element.style.transition = `opacity ${finalConfig.duration}ms ${finalConfig.easing} ${finalConfig.delay}ms, transform ${finalConfig.duration}ms ${finalConfig.easing} ${finalConfig.delay}ms`;
  
  // Trigger animation after a small delay to ensure initial state is applied
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'none';
    });
  });
}

/**
 * IntersectionObserver instance for entrance animations
 */
let entranceObserver: IntersectionObserver | null = null;

/**
 * Create or get the IntersectionObserver for entrance animations
 */
function getEntranceObserver(): IntersectionObserver {
  if (entranceObserver) {
    return entranceObserver;
  }
  
  entranceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const config = (element as any).__entranceConfig as EntranceAnimationConfig;
          
          if (config) {
            applyEntranceAnimation(element, config);
          }
          
          // Unobserve after animation is triggered
          entranceObserver!.unobserve(element);
        }
      });
    },
    {
      threshold: DEFAULT_ENTRANCE_CONFIG.threshold,
      rootMargin: DEFAULT_ENTRANCE_CONFIG.rootMargin
    }
  );
  
  return entranceObserver;
}

/**
 * Register an element for entrance animation with IntersectionObserver
 * Animation triggers when element enters viewport
 */
export function registerEntranceAnimation(
  element: HTMLElement,
  config: Partial<EntranceAnimationConfig> = {}
): void {
  // Merge with defaults
  const finalConfig = { ...DEFAULT_ENTRANCE_CONFIG, ...config };
  
  // Respect prefers-reduced-motion
  if (prefersReducedMotion()) {
    element.style.opacity = '1';
    element.style.transform = 'none';
    return;
  }
  
  // Set initial hidden state
  element.style.opacity = '0';
  element.style.transform = getInitialTransform(finalConfig.direction, finalConfig.distance);
  
  // Store config on element for observer callback
  (element as any).__entranceConfig = finalConfig;
  
  // Add to observer
  const observer = getEntranceObserver();
  observer.observe(element);
}

/**
 * Cleanup entrance animation observer
 */
export function cleanupEntranceAnimations(): void {
  if (entranceObserver) {
    entranceObserver.disconnect();
    entranceObserver = null;
  }
}

/**
 * Batch register multiple elements with staggered delays
 * Creates a polished, coordinated sequence of animations
 */
export function registerEntranceAnimationsBatch(
  elements: Array<{ element: HTMLElement; config?: Partial<EntranceAnimationConfig> }>
): void {
  elements.forEach(({ element, config = {} }, index) => {
    const staggerDelay = index * 100; // 100ms stagger between elements
    const finalConfig = {
      ...config,
      delay: (config.delay || 0) + staggerDelay
    };
    registerEntranceAnimation(element, finalConfig);
  });
}

/**
 * Utility function to animate all main content sections
 * Applies coordinated entrance animations to banner, robot, joke, countries, and footer
 */
export function animateMainContentSections(): void {
  // Banner - fade down from above
  const banner = document.getElementById('chaoscraft-banner');
  if (banner) {
    registerEntranceAnimation(banner, {
      direction: 'down',
      delay: 0,
      duration: 500
    });
  }
  
  // Robot container - fade up
  const robot = document.getElementById('robot-container');
  if (robot) {
    registerEntranceAnimation(robot, {
      direction: 'up',
      delay: 100,
      duration: 600
    });
  }
  
  // Joke container - fade up
  const joke = document.getElementById('joke-container');
  if (joke) {
    registerEntranceAnimation(joke, {
      direction: 'up',
      delay: 200,
      duration: 600
    });
  }
  
  // Countries container - fade up
  const countries = document.getElementById('countries-container');
  if (countries) {
    registerEntranceAnimation(countries, {
      direction: 'up',
      delay: 300,
      duration: 600
    });
  }
  
  // Footer - fade up
  const footer = document.getElementById('chaoscraft-footer');
  if (footer) {
    registerEntranceAnimation(footer, {
      direction: 'up',
      delay: 400,
      duration: 500
    });
  }
}
