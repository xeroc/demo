/**
 * Console Component for ChaosCraft
 * Responsive console/terminal component with mobile keyboard handling
 * 
 * Features:
 * - Responsive height: 1/3 of viewport on mobile, larger on desktop
 * - Dynamic viewport height (dvh) support for mobile keyboard handling
 * - visualViewport API integration for keyboard visibility detection
 * - Shrinks when mobile keyboard appears to maintain visible content area
 */

export interface ConsoleConfig {
  placeholder?: string;
  maxHeight?: string;
  minHeight?: string;
  maxMobileHeight?: string;
}

export const DEFAULT_CONSOLE_CONFIG: Required<ConsoleConfig> = {
  placeholder: 'Type a command...',
  maxHeight: '400px',
  minHeight: '120px',
  maxMobileHeight: '33dvh' // 1/3 of dynamic viewport height on mobile
};

/**
 * Creates a responsive console component with mobile keyboard handling
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
  
  // Setup keyboard handling for mobile
  setupKeyboardHandling(consoleContainer, input, finalConfig);
  
  return consoleContainer;
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
    if (isMobile) {
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
