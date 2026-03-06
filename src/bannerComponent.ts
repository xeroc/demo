/**
 * Banner Component for ChaosCraft
 * Displays a participation message with a link to app.chaoscraft.dev
 * Responsive design with mobile-first approach - fits mobile screen width (max 100vw)
 */

export interface BannerConfig {
  message?: string;
  linkUrl?: string;
  linkText?: string;
}

export const DEFAULT_BANNER_CONFIG: Required<BannerConfig> = {
  message: 'This site can be modified by anyone participating in chaoscraft.dev.',
  linkUrl: 'https://app.chaoscraft.dev',
  linkText: 'Click here to participate!'
};

/**
 * Creates a banner element with customizable message and link
 * Responsive design that fits mobile screen width (max 100vw)
 */
export function createBanner(config: Partial<BannerConfig> = {}): HTMLElement {
  const finalConfig = { ...DEFAULT_BANNER_CONFIG, ...config };
  
  // Create banner container with responsive width constraints
  const banner = document.createElement('div');
  banner.id = 'chaoscraft-banner';
  banner.className = 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-3 px-4 text-center w-full max-w-full overflow-hidden';
  banner.setAttribute('role', 'banner');
  banner.setAttribute('aria-label', 'ChaosCraft participation announcement');
  
  // Create inner content container with responsive layout
  const contentDiv = document.createElement('div');
  contentDiv.className = 'flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto';
  
  // Create message span with responsive text sizing
  const messageSpan = document.createElement('span');
  messageSpan.className = 'text-sm sm:text-base font-medium';
  messageSpan.textContent = finalConfig.message;
  
  // Create link with responsive styling
  const link = document.createElement('a');
  link.href = finalConfig.linkUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'text-sm sm:text-base font-semibold underline hover:text-yellow-200 transition-colors duration-200 whitespace-nowrap';
  link.textContent = finalConfig.linkText;
  link.setAttribute('aria-label', `${finalConfig.linkText} (opens in a new tab)`);
  
  // Assemble the banner
  contentDiv.appendChild(messageSpan);
  contentDiv.appendChild(link);
  banner.appendChild(contentDiv);
  
  return banner;
}

/**
 * Mounts the banner at the top of the page (after opening body tag)
 */
export function mountBanner(containerId?: string, config: Partial<BannerConfig> = {}): HTMLElement | null {
  let container: HTMLElement | null;
  
  if (containerId) {
    container = document.getElementById(containerId);
    if (!container) {
      console.error(`Banner container with id "${containerId}" not found`);
      return null;
    }
  } else {
    // Default: insert at the very top of the body
    container = document.body;
  }
  
  const banner = createBanner(config);
  
  if (containerId) {
    container.appendChild(banner);
  } else {
    // Insert at the beginning of the body
    container.insertBefore(banner, container.firstChild);
  }
  
  return banner;
}

/**
 * Removes the banner from the DOM
 */
export function unmountBanner(): void {
  const banner = document.getElementById('chaoscraft-banner');
  if (banner && banner.parentNode) {
    banner.parentNode.removeChild(banner);
  }
}

/**
 * Gets the current banner element if mounted
 */
export function getBanner(): HTMLElement | null {
  return document.getElementById('chaoscraft-banner');
}
