/**
 * Footer Component for ChaosCraft
 * Responsive footer with links and copyright
 */

export interface FooterConfig {
  copyrightText?: string;
  links?: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export const DEFAULT_FOOTER_CONFIG: Required<FooterConfig> = {
  copyrightText: '© 2024 ChaosCraft. Built by chaos, one dollar at a time.',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact.html' },
    { label: 'Participate', href: 'https://app.chaoscraft.dev', external: true }
  ]
};

/**
 * Creates a responsive footer element
 */
export function createFooter(config: Partial<FooterConfig> = {}): HTMLElement {
  const finalConfig = { ...DEFAULT_FOOTER_CONFIG, ...config };
  
  // Create footer container
  const footer = document.createElement('footer');
  footer.id = 'chaoscraft-footer';
  footer.className = 'bg-slate-900/95 backdrop-blur-md border-t border-white/10 mt-auto';
  footer.setAttribute('role', 'contentinfo');
  
  // Create inner container
  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10';
  
  // Create content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'flex flex-col items-center gap-4 sm:gap-6 md:gap-8';
  
  // Create navigation links
  const nav = document.createElement('nav');
  nav.className = 'flex flex-col sm:flex-row items-center gap-3 sm:gap-6 md:gap-8';
  nav.setAttribute('aria-label', 'Footer navigation');
  
  finalConfig.links.forEach(link => {
    const linkEl = document.createElement('a');
    linkEl.href = link.href;
    
    if (link.external) {
      linkEl.target = '_blank';
      linkEl.rel = 'noopener noreferrer';
      linkEl.setAttribute('aria-label', `${link.label} (opens in a new tab)`);
    }
    
    linkEl.className = 'text-sm sm:text-base text-gray-300 hover:text-white hover:text-cyan-300 transition-colors duration-200 font-medium';
    linkEl.textContent = link.label;
    nav.appendChild(linkEl);
  });
  
  // Create divider
  const divider = document.createElement('div');
  divider.className = 'w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent';
  
  // Create copyright text
  const copyright = document.createElement('p');
  copyright.className = 'text-xs sm:text-sm text-gray-400 text-center';
  copyright.textContent = finalConfig.copyrightText;
  
  // Create social/emoji element
  const emoji = document.createElement('span');
  emoji.className = 'text-2xl sm:text-3xl animate-pulse';
  emoji.textContent = '🌌';
  emoji.setAttribute('aria-hidden', 'true');
  
  // Assemble footer
  contentWrapper.appendChild(nav);
  contentWrapper.appendChild(divider);
  contentWrapper.appendChild(copyright);
  contentWrapper.appendChild(emoji);
  container.appendChild(contentWrapper);
  footer.appendChild(container);
  
  return footer;
}

/**
 * Mounts the footer at the end of the body
 */
export function mountFooter(containerId?: string, config: Partial<FooterConfig> = {}): HTMLElement | null {
  let container: HTMLElement | null;
  
  if (containerId) {
    container = document.getElementById(containerId);
    if (!container) {
      console.error(`Footer container with id "${containerId}" not found`);
      return null;
    }
  } else {
    container = document.body;
  }
  
  const footer = createFooter(config);
  container.appendChild(footer);
  
  return footer;
}

/**
 * Removes the footer from the DOM
 */
export function unmountFooter(): void {
  const footer = document.getElementById('chaoscraft-footer');
  if (footer && footer.parentNode) {
    footer.parentNode.removeChild(footer);
  }
}

/**
 * Gets the current footer element if mounted
 */
export function getFooter(): HTMLElement | null {
  return document.getElementById('chaoscraft-footer');
}
