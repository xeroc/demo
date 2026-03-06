/**
 * Header Component for ChaosCraft
 * Responsive header with collapsible hamburger menu for mobile
 */

export interface HeaderConfig {
  logoText?: string;
  navItems?: NavItem[];
}

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export const DEFAULT_HEADER_CONFIG: Required<HeaderConfig> = {
  logoText: 'ChaosCraft',
  navItems: [
    { label: 'Home', href: '/', isActive: true },
    { label: 'Contact', href: '/contact.html', isActive: false }
  ]
};

/**
 * Creates a responsive header element with hamburger menu
 */
export function createHeader(config: Partial<HeaderConfig> = {}): HTMLElement {
  const finalConfig = { ...DEFAULT_HEADER_CONFIG, ...config };
  
  // Create header container
  const header = document.createElement('header');
  header.id = 'chaoscraft-header';
  header.className = 'bg-slate-900/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50';
  header.setAttribute('role', 'banner');
  
  // Create inner container
  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
  
  // Create flex container for logo and nav
  const flexContainer = document.createElement('div');
  flexContainer.className = 'flex items-center justify-between h-16';
  
  // Create logo
  const logo = document.createElement('a');
  logo.href = '/';
  logo.className = 'flex-shrink-0 flex items-center gap-2';
  
  const logoIcon = document.createElement('span');
  logoIcon.className = 'text-2xl';
  logoIcon.textContent = '🌌';
  logoIcon.setAttribute('aria-hidden', 'true');
  
  const logoText = document.createElement('span');
  logoText.className = 'text-lg sm:text-xl font-bold text-white';
  logoText.textContent = finalConfig.logoText;
  
  logo.appendChild(logoIcon);
  logo.appendChild(logoText);
  
  // Create desktop navigation
  const desktopNav = document.createElement('nav');
  desktopNav.className = 'hidden md:flex items-center gap-1';
  desktopNav.setAttribute('role', 'navigation');
  desktopNav.setAttribute('aria-label', 'Main navigation');
  
  finalConfig.navItems.forEach(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.className = `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      item.isActive
        ? 'bg-cyan-500/20 text-cyan-300'
        : 'text-gray-300 hover:bg-white/10 hover:text-white'
    }`;
    link.textContent = item.label;
    if (item.isActive) {
      link.setAttribute('aria-current', 'page');
    }
    desktopNav.appendChild(link);
  });
  
  // Create mobile menu button
  const menuButton = document.createElement('button');
  menuButton.type = 'button';
  menuButton.className = 'md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors duration-200';
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-controls', 'mobile-menu');
  menuButton.setAttribute('aria-label', 'Open main menu');
  
  // Hamburger icon
  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.className = 'hamburger-icon';
  hamburgerIcon.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path class="block" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  `;
  
  // Close icon (hidden by default)
  const closeIcon = document.createElement('span');
  closeIcon.className = 'close-icon hidden';
  closeIcon.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  `;
  
  menuButton.appendChild(hamburgerIcon);
  menuButton.appendChild(closeIcon);
  
  // Create mobile menu (hidden by default)
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.className = 'mobile-menu hidden md:hidden';
  mobileMenu.setAttribute('role', 'navigation');
  mobileMenu.setAttribute('aria-label', 'Mobile navigation');
  
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 rounded-b-lg';
  
  finalConfig.navItems.forEach(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.className = `block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
      item.isActive
        ? 'bg-cyan-500/20 text-cyan-300'
        : 'text-gray-300 hover:bg-white/10 hover:text-white'
    }`;
    link.textContent = item.label;
    if (item.isActive) {
      link.setAttribute('aria-current', 'page');
    }
    mobileNav.appendChild(link);
  });
  
  mobileMenu.appendChild(mobileNav);
  
  // Assemble header
  flexContainer.appendChild(logo);
  flexContainer.appendChild(desktopNav);
  flexContainer.appendChild(menuButton);
  container.appendChild(flexContainer);
  container.appendChild(mobileMenu);
  header.appendChild(container);
  
  // Add click handler for mobile menu toggle
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isExpanded));
    
    if (isExpanded) {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      menuButton.setAttribute('aria-label', 'Open main menu');
    } else {
      mobileMenu.classList.remove('hidden');
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      menuButton.setAttribute('aria-label', 'Close main menu');
    }
  });
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open main menu');
      menuButton.focus();
    }
  });
  
  return header;
}

/**
 * Mounts the header at the specified location
 */
export function mountHeader(containerId?: string, config: Partial<HeaderConfig> = {}): HTMLElement | null {
  let container: HTMLElement | null;
  
  if (containerId) {
    container = document.getElementById(containerId);
    if (!container) {
      console.error(`Header container with id "${containerId}" not found`);
      return null;
    }
  } else {
    // Default: insert at the beginning of the body (after banner if present)
    container = document.body;
  }
  
  const header = createHeader(config);
  
  // Find banner if it exists and insert header after it
  const banner = document.getElementById('chaoscraft-banner');
  if (banner && banner.nextSibling) {
    container.insertBefore(header, banner.nextSibling);
  } else if (banner) {
    container.appendChild(header);
  } else if (containerId) {
    container.appendChild(header);
  } else {
    container.insertBefore(header, container.firstChild);
  }
  
  return header;
}

/**
 * Removes the header from the DOM
 */
export function unmountHeader(): void {
  const header = document.getElementById('chaoscraft-header');
  if (header && header.parentNode) {
    header.parentNode.removeChild(header);
  }
}

/**
 * Gets the current header element if mounted
 */
export function getHeader(): HTMLElement | null {
  return document.getElementById('chaoscraft-header');
}

/**
 * Updates the active navigation item
 */
export function setActiveNavItem(href: string): void {
  const header = getHeader();
  if (!header) return;
  
  // Update desktop nav
  const desktopLinks = header.querySelectorAll('nav[aria-label="Main navigation"] a');
  desktopLinks.forEach(link => {
    const linkEl = link as HTMLAnchorElement;
    const isActive = linkEl.getAttribute('href') === href;
    linkEl.classList.toggle('bg-cyan-500/20', isActive);
    linkEl.classList.toggle('text-cyan-300', isActive);
    linkEl.classList.toggle('text-gray-300', !isActive);
    if (isActive) {
      linkEl.setAttribute('aria-current', 'page');
    } else {
      linkEl.removeAttribute('aria-current');
    }
  });
  
  // Update mobile nav
  const mobileLinks = header.querySelectorAll('nav[aria-label="Mobile navigation"] a');
  mobileLinks.forEach(link => {
    const linkEl = link as HTMLAnchorElement;
    const isActive = linkEl.getAttribute('href') === href;
    linkEl.classList.toggle('bg-cyan-500/20', isActive);
    linkEl.classList.toggle('text-cyan-300', isActive);
    linkEl.classList.toggle('text-gray-300', !isActive);
    if (isActive) {
      linkEl.setAttribute('aria-current', 'page');
    } else {
      linkEl.removeAttribute('aria-current');
    }
  });
}
