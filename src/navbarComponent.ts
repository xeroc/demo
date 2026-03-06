/**
 * Navbar Component for ChaosCraft
 * Responsive navbar with only header image and name
 */

export interface NavbarConfig {
  logoText?: string;
  logoIcon?: string;
}

export const DEFAULT_NAVBAR_CONFIG: Required<NavbarConfig> = {
  logoText: 'ChaosCraft',
  logoIcon: '🌌'
};

/**
 * Creates a responsive navbar element with logo only
 */
export function createNavbar(config: Partial<NavbarConfig> = {}): HTMLElement {
  const finalConfig = { ...DEFAULT_NAVBAR_CONFIG, ...config };
  
  // Create navbar container
  const navbar = document.createElement('nav');
  navbar.id = 'chaoscraft-navbar';
  navbar.className = 'bg-slate-900/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50';
  navbar.setAttribute('role', 'banner');
  navbar.setAttribute('aria-label', 'Site header');
  
  // Create inner container with responsive padding
  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
  
  // Create flex container for logo
  const flexContainer = document.createElement('div');
  flexContainer.className = 'flex items-center justify-center h-16';
  
  // Create logo link
  const logo = document.createElement('a');
  logo.href = '/';
  logo.className = 'flex-shrink-0 flex items-center gap-2 transition-transform duration-200 hover:scale-105';
  
  // Create logo icon
  const logoIcon = document.createElement('span');
  logoIcon.className = 'text-2xl sm:text-3xl animate-pulse';
  logoIcon.textContent = finalConfig.logoIcon;
  logoIcon.setAttribute('aria-hidden', 'true');
  
  // Create logo text
  const logoText = document.createElement('span');
  logoText.className = 'text-lg sm:text-xl md:text-2xl font-bold text-white';
  logoText.textContent = finalConfig.logoText;
  
  // Assemble logo
  logo.appendChild(logoIcon);
  logo.appendChild(logoText);
  
  // Assemble navbar
  flexContainer.appendChild(logo);
  container.appendChild(flexContainer);
  navbar.appendChild(container);
  
  return navbar;
}

/**
 * Mounts the navbar at the specified location
 */
export function mountNavbar(containerId?: string, config: Partial<NavbarConfig> = {}): HTMLElement | null {
  let container: HTMLElement | null;
  
  if (containerId) {
    container = document.getElementById(containerId);
    if (!container) {
      console.error(`Navbar container with id "${containerId}" not found`);
      return null;
    }
  } else {
    // Default: insert after banner if present, otherwise at beginning of body
    container = document.body;
  }
  
  const navbar = createNavbar(config);
  
  // Find banner if it exists and insert navbar after it
  const banner = document.getElementById('chaoscraft-banner');
  if (banner && banner.nextSibling) {
    container.insertBefore(navbar, banner.nextSibling);
  } else if (banner) {
    container.appendChild(navbar);
  } else if (containerId) {
    container.appendChild(navbar);
  } else {
    container.insertBefore(navbar, container.firstChild);
  }
  
  return navbar;
}

/**
 * Removes the navbar from the DOM
 */
export function unmountNavbar(): void {
  const navbar = document.getElementById('chaoscraft-navbar');
  if (navbar && navbar.parentNode) {
    navbar.parentNode.removeChild(navbar);
  }
}

/**
 * Gets the current navbar element if mounted
 */
export function getNavbar(): HTMLElement | null {
  return document.getElementById('chaoscraft-navbar');
}
