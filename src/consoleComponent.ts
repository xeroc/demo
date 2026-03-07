/**
 * Console Component for ChaosCraft
 * Responsive console/terminal component with mobile keyboard handling and collapse/expand toggle
 * 
 * Features:
 * - Responsive height: 1/3 of viewport on mobile, larger on desktop
 * - Dynamic viewport height (dvh) support for mobile keyboard handling
 * - visualViewport API integration for keyboard visibility detection
 * - Shrinks when mobile keyboard appears to maintain visible content area
 * - Collapse/expand toggle on mobile for user control over screen space
 */

export interface ConsoleConfig {
  placeholder?: string;
  maxHeight?: string;
  minHeight?: string;
  maxMobileHeight?: string;
  collapsedHeight?: string;
}

export const DEFAULT_CONSOLE_CONFIG: Required<ConsoleConfig> = {
  placeholder: 'Type a command...',
  maxHeight: '400px',
  minHeight: '120px',
  maxMobileHeight: '33dvh', // 1/3 of dynamic viewport height on mobile
  collapsedHeight: '48px'   // Minimal collapsed bar height
};

// Session state for console collapse
let isCollapsed: boolean = false;

/**
 * Creates a responsive console component with mobile keyboard handling and collapse toggle
 */
export function createConsole(config: Partial<ConsoleConfig> = {}): HTMLElement {
  const finalConfig = { ...DEFAULT_CONSOLE_CONFIG, ...config };
  
  // Create console container
  const consoleContainer = document.createElement('div');
  consoleContainer.id = 'chaoscraft-console';
  consoleContainer.className = 'fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-cyan-400/30 z-50';
  consoleContainer.setAttribute('role', 'log');
  consoleContainer.setAttribute('aria-label', 'Console terminal');
  
  // Apply responsive styles
  applyConsoleStyles(consoleContainer, finalConfig);
  
  // Create mobile header with toggle button
  const mobileHeader = createMobileHeader();
  consoleContainer.appendChild(mobileHeader);
  
  // Create output area
  const outputArea = document.createElement('div');
  outputArea.id = 'console-output';
  outputArea.className = 'console-output overflow-y-auto px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-mono text-green-400';
  outputArea.style.cssText = `
    max-height: 100px;
    min-height: 40px;
  `;
  outputArea.textContent = '> Welcome to ChaosCraft Console v1.0';
  
  // Create input area
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'console-input-wrapper flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-t border-white/10';
  
  const prompt = document.createElement('span');
  prompt.className = 'text-cyan-400 font-mono text-xs sm:text-sm';
  prompt.textContent = '>';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'console-input';
  input.className = 'flex-1 bg-transparent text-white font-mono text-xs sm:text-sm outline-none placeholder-gray-500';
  input.placeholder = finalConfig.placeholder;
  input.setAttribute('aria-label', 'Console command input');
  
  inputWrapper.appendChild(prompt);
  inputWrapper.appendChild(input);
  
  consoleContainer.appendChild(outputArea);
  consoleContainer.appendChild(inputWrapper);
  
  // Setup collapse toggle functionality
  setupCollapseToggle(consoleContainer, mobileHeader, finalConfig);
  
  // Setup keyboard handling for mobile
  setupKeyboardHandling(consoleContainer, input, finalConfig);
  
  // Restore collapsed state from session
  if (isCollapsed) {
    applyCollapsedState(consoleContainer, finalConfig);
  }
  
  return consoleContainer;
}

/**
 * Create mobile header with toggle button
 */
function createMobileHeader(): HTMLElement {
  const header = document.createElement('div');
  header.className = 'console-mobile-header flex items-center justify-between px-3 py-2 border-b border-white/10 md:hidden cursor-pointer select-none';
  header.style.cssText = `
    display: flex;
    min-height: 48px;
  `;
  
  // Left side: console label
  const label = document.createElement('div');
  label.className = 'flex items-center gap-2';
  
  const icon = document.createElement('span');
  icon.className = 'text-cyan-400';
  icon.textContent = '💻';
  icon.setAttribute('aria-hidden', 'true');
  
  const title = document.createElement('span');
  title.className = 'text-white font-mono text-xs font-semibold';
  title.textContent = 'Console';
  
  label.appendChild(icon);
  label.appendChild(title);
  
  // Right side: toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'console-toggle';
  toggleBtn.className = 'text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1';
  toggleBtn.setAttribute('aria-label', 'Toggle console');
  toggleBtn.setAttribute('aria-expanded', 'true');
  
  const toggleIcon = document.createElement('span');
  toggleIcon.className = 'toggle-icon text-lg transition-transform duration-300';
  toggleIcon.textContent = '▼';
  toggleIcon.setAttribute('aria-hidden', 'true');
  
  const toggleText = document.createElement('span');
  toggleText.className = 'text-xs';
  toggleText.textContent = 'Collapse';
  
  toggleBtn.appendChild(toggleIcon);
  toggleBtn.appendChild(toggleText);
  
  header.appendChild(label);
  header.appendChild(toggleBtn);
  
  return header;
}

/**
 * Setup collapse toggle functionality
 */
function setupCollapseToggle(
  container: HTMLElement, 
  header: HTMLElement, 
  config: Required<ConsoleConfig>
): void {
  const toggleBtn = header.querySelector('#console-toggle') as HTMLButtonElement;
  const outputArea = container.querySelector('#console-output') as HTMLElement;
  const inputWrapper = container.querySelector('.console-input-wrapper') as HTMLElement;
  
  const toggle = () => {
    isCollapsed = !isCollapsed;
    
    if (isCollapsed) {
      // Collapsed state
      applyCollapsedState(container, config);
      
      // Update toggle button
      const icon = toggleBtn.querySelector('.toggle-icon');
      const text = toggleBtn.querySelector('.toggle-icon + span');
      if (icon) icon.textContent = '▲';
      if (text) text.textContent = 'Expand';
      toggleBtn.setAttribute('aria-expanded', 'false');
      
      // Hide output and input
      if (outputArea) outputArea.style.display = 'none';
      if (inputWrapper) inputWrapper.style.display = 'none';
    } else {
      // Expanded state
      applyExpandedState(container, config);
      
      // Update toggle button
      const icon = toggleBtn.querySelector('.toggle-icon');
      const text = toggleBtn.querySelector('.toggle-icon + span');
      if (icon) icon.textContent = '▼';
      if (text) text.textContent = 'Collapse';
      toggleBtn.setAttribute('aria-expanded', 'true');
      
      // Show output and input
      if (outputArea) outputArea.style.display = 'block';
      if (inputWrapper) inputWrapper.style.display = 'flex';
    }
  };
  
  // Click handler on header
  header.addEventListener('click', toggle);
  
  // Keyboard accessibility
  header.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
  
  // Make header focusable
  header.setAttribute('tabindex', '0');
  header.setAttribute('role', 'button');
  header.setAttribute('aria-label', 'Toggle console visibility');
}

/**
 * Apply collapsed state styles
 */
function applyCollapsedState(container: HTMLElement, config: Required<ConsoleConfig>): void {
  container.style.maxHeight = config.collapsedHeight;
  container.style.overflow = 'hidden';
}

/**
 * Apply expanded state styles
 */
function applyExpandedState(container: HTMLElement, config: Required<ConsoleConfig>): void {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    container.style.maxHeight = config.maxMobileHeight;
  } else {
    container.style.maxHeight = config.maxHeight;
  }
  
  container.style.overflow = 'visible';
}

/**
 * Apply responsive styles based on viewport and device
 */
function applyConsoleStyles(container: HTMLElement, config: Required<ConsoleConfig>): void {
  const isMobile = window.innerWidth < 768;
  
  if (isMobile) {
    // Mobile: use dynamic viewport height (dvh) to handle keyboard
    container.style.cssText = `
      max-height: ${config.maxMobileHeight};
      transition: max-height 0.3s ease-out;
    `;
  } else {
    // Desktop/tablet: fixed height
    container.style.cssText = `
      max-height: ${config.maxHeight};
      min-height: ${config.minHeight};
    `;
  }
}

/**
 * Setup keyboard handling for mobile devices
 * Uses visualViewport API when available, falls back to resize events
 */
function setupKeyboardHandling(
  container: HTMLElement, 
  input: HTMLInputElement, 
  config: Required<ConsoleConfig>
): void {
  // Check if visualViewport API is available (modern mobile browsers)
  if ('visualViewport' in window && window.visualViewport) {
    const visualViewport = window.visualViewport as VisualViewport;
    
    const handleViewportChange = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) return;
      
      // Don't adjust if collapsed
      if (isCollapsed) return;
      
      const viewportHeight = visualViewport.height;
      const fullHeight = window.innerHeight;
      const keyboardHeight = fullHeight - viewportHeight;
      
      // If keyboard is visible (more than 100px difference)
      if (keyboardHeight > 100) {
        // Shrink console significantly when keyboard is open
        const availableHeight = viewportHeight * 0.25; // Use 25% of visible viewport
        container.style.maxHeight = `${Math.max(availableHeight, 100)}px`;
        container.style.setProperty('--keyboard-height', `${keyboardHeight}px`);
      } else {
        // Keyboard closed: restore to 1/3 of viewport
        container.style.maxHeight = config.maxMobileHeight;
        container.style.removeProperty('--keyboard-height');
      }
    };
    
    visualViewport.addEventListener('resize', handleViewportChange);
    visualViewport.addEventListener('scroll', handleViewportChange);
    
    // Initial setup
    handleViewportChange();
    
    // Store cleanup function
    (container as any)._cleanupKeyboard = () => {
      visualViewport.removeEventListener('resize', handleViewportChange);
      visualViewport.removeEventListener('scroll', handleViewportChange);
    };
  } else {
    // Fallback for browsers without visualViewport support
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        container.style.maxHeight = config.maxHeight;
        return;
      }
      
      // Don't adjust if collapsed
      if (isCollapsed) return;
      
      // Use media queries to detect keyboard
      const isKeyboardLikelyOpen = window.innerHeight < window.screen.height * 0.75;
      
      if (isKeyboardLikelyOpen) {
        container.style.maxHeight = '25vh';
      } else {
        container.style.maxHeight = config.maxMobileHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    (container as any)._cleanupKeyboard = () => {
      window.removeEventListener('resize', handleResize);
    };
  }
  
  // Handle input focus on mobile
  input.addEventListener('focus', () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && !isCollapsed) {
      // Scroll console into view when input is focused
      setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 300); // Wait for keyboard animation
    }
  });
}

/**
 * Mounts the console at the bottom of the page
 */
export function mountConsole(containerId?: string, config: Partial<ConsoleConfig> = {}): HTMLElement | null {
  let container: HTMLElement | null;
  
  if (containerId) {
    container = document.getElementById(containerId);
    if (!container) {
      console.error(`Console container with id "${containerId}" not found`);
      return null;
    }
  } else {
    container = document.body;
  }
  
  const consoleEl = createConsole(config);
  container.appendChild(consoleEl);
  
  return consoleEl;
}

/**
 * Removes the console from the DOM
 */
export function unmountConsole(): void {
  const consoleEl = document.getElementById('chaoscraft-console');
  if (consoleEl) {
    // Cleanup keyboard event listeners
    if ((consoleEl as any)._cleanupKeyboard) {
      (consoleEl as any)._cleanupKeyboard();
    }
    
    if (consoleEl.parentNode) {
      consoleEl.parentNode.removeChild(consoleEl);
    }
  }
}

/**
 * Gets the current console element if mounted
 */
export function getConsole(): HTMLElement | null {
  return document.getElementById('chaoscraft-console');
}

/**
 * Gets the console input element if mounted
 */
export function getConsoleInput(): HTMLInputElement | null {
  return document.getElementById('console-input') as HTMLInputElement | null;
}

/**
 * Gets the console output element if mounted
 */
export function getConsoleOutput(): HTMLElement | null {
  return document.getElementById('console-output');
}

/**
 * Appends output to the console
 */
export function appendConsoleOutput(text: string): void {
  const output = getConsoleOutput();
  if (output) {
    const line = document.createElement('div');
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }
}

/**
 * Clears the console output
 */
export function clearConsoleOutput(): void {
  const output = getConsoleOutput();
  if (output) {
    output.innerHTML = '';
  }
}

/**
 * Gets the current collapsed state
 */
export function isConsoleCollapsed(): boolean {
  return isCollapsed;
}

/**
 * Sets the collapsed state programmatically
 */
export function setConsoleCollapsed(collapsed: boolean): void {
  const consoleEl = getConsole();
  if (!consoleEl) return;
  
  const header = consoleEl.querySelector('.console-mobile-header') as HTMLElement;
  const toggleBtn = header?.querySelector('#console-toggle') as HTMLButtonElement;
  const outputArea = consoleEl.querySelector('#console-output') as HTMLElement;
  const inputWrapper = consoleEl.querySelector('.console-input-wrapper') as HTMLElement;
  
  const config = DEFAULT_CONSOLE_CONFIG;
  
  if (collapsed !== isCollapsed) {
    isCollapsed = collapsed;
    
    if (isCollapsed) {
      applyCollapsedState(consoleEl, config);
      
      const icon = toggleBtn?.querySelector('.toggle-icon');
      const text = toggleBtn?.querySelector('.toggle-icon + span');
      if (icon) icon.textContent = '▲';
      if (text) text.textContent = 'Expand';
      toggleBtn?.setAttribute('aria-expanded', 'false');
      
      if (outputArea) outputArea.style.display = 'none';
      if (inputWrapper) inputWrapper.style.display = 'none';
    } else {
      applyExpandedState(consoleEl, config);
      
      const icon = toggleBtn?.querySelector('.toggle-icon');
      const text = toggleBtn?.querySelector('.toggle-icon + span');
      if (icon) icon.textContent = '▼';
      if (text) text.textContent = 'Collapse';
      toggleBtn?.setAttribute('aria-expanded', 'true');
      
      if (outputArea) outputArea.style.display = 'block';
      if (inputWrapper) inputWrapper.style.display = 'flex';
    }
  }
}
