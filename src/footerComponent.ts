/**
 * Footer Component for ChaosCraft
 * Responsive footer with copyright only (no links)
 */

export interface FooterConfig {
  copyrightText?: string;
}

export const DEFAULT_FOOTER_CONFIG: Required<FooterConfig> = {
  copyrightText: '© 2026 ChaosCraft. Built by chaos, one dollar at a time.'
};

/**
 * Creates a responsive footer element with copyright only
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
  contentWrapper.className = 'flex flex-col items-center gap-4 sm:gap-6';
  
  // Create copyright text
  const copyright = document.createElement('p');
  copyright.className = 'text-xs sm:text-sm md:text-base text-gray-400 text-center';
  copyright.textContent = finalConfig.copyrightText;
  
  // Assemble footer
  contentWrapper.appendChild(copyright);
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
