/**
 * Konami Code Easter Egg Component
 * 
 * Triggers on Konami code input (↑↑↓↓←→←→BA)
 * Displays chaotic celebration overlay with particle effects,
 * reveals secret 'Chaos Master' achievement badge, and shows
 * witty congratulation message.
 */

export interface KonamiCodeConfig {
  onActivate?: () => void;
  autoReset?: boolean;
  resetDelay?: number;
}

export const DEFAULT_KONAMI_CONFIG: Required<KonamiCodeConfig> = {
  onActivate: () => {},
  autoReset: true,
  resetDelay: 5000
};

// Konami Code sequence: ↑↑↓↓←→←→BA
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

let inputSequence: string[] = [];
let isActive = false;
let overlayElement: HTMLElement | null = null;
let keydownHandler: ((event: KeyboardEvent) => void) | null = null;

/**
 * Creates particle effect element
 */
function createParticle(x: number, y: number, color: string): HTMLElement {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 10px;
    height: 10px;
    background: ${color};
    border-radius: 50%;
    pointer-events: none;
    z-index: 10001;
    animation: particle-explode 1s ease-out forwards;
  `;
  return particle;
}

/**
 * Creates sparkle effect element
 */
function createSparkle(x: number, y: number): HTMLElement {
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '✨';
  sparkle.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    font-size: 24px;
    pointer-events: none;
    z-index: 10001;
    animation: sparkle-float 1.5s ease-out forwards;
  `;
  return sparkle;
}

/**
 * Creates the celebration overlay
 */
function createCelebrationOverlay(): HTMLElement {
  const overlay = document.createElement('div');
  overlay.id = 'konami-celebration-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Chaos Master Achievement Unlocked');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: overlay-fade-in 0.5s ease-out;
  `;

  // Achievement badge
  const badge = document.createElement('div');
  badge.innerHTML = `
    <div style="
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 60px rgba(102, 126, 234, 0.8);
      animation: badge-pulse 1s ease-in-out infinite;
      margin-bottom: 40px;
    ">
      <div style="
        font-size: 80px;
        filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
      ">🏆</div>
    </div>
    <h1 style="
      font-size: 48px;
      font-weight: bold;
      background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 20px;
      text-align: center;
      animation: title-bounce 0.5s ease-out;
    ">Chaos Master</h1>
    <p style="
      font-size: 32px;
      color: #fff;
      text-align: center;
      margin-bottom: 30px;
      animation: message-fade-in 0.5s ease-out 0.3s both;
    ">🎉 You found the chaos! 🎉</p>
    <p style="
      font-size: 18px;
      color: #a0aec0;
      text-align: center;
      animation: message-fade-in 0.5s ease-out 0.5s both;
    ">Press ESC or click anywhere to close</p>
  `;
  badge.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
  `;

  overlay.appendChild(badge);

  // Add particle effects
  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#ffd700', '#00ff87'];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const particle = createParticle(x, y, color);
      overlay.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => particle.remove(), 1000);
    }, i * 50);
  }

  // Add sparkle effects
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const sparkle = createSparkle(x, y);
      overlay.appendChild(sparkle);
      
      // Remove sparkle after animation
      setTimeout(() => sparkle.remove(), 1500);
    }, i * 100);
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.id = 'konami-animations';
  style.textContent = `
    @keyframes overlay-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes badge-pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 60px rgba(102, 126, 234, 0.8);
      }
      50% {
        transform: scale(1.1);
        box-shadow: 0 0 80px rgba(102, 126, 234, 1);
      }
    }
    
    @keyframes title-bounce {
      0% {
        transform: scale(0.3);
        opacity: 0;
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    @keyframes message-fade-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes particle-explode {
      0% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: scale(3) rotate(360deg);
        opacity: 0;
      }
    }
    
    @keyframes sparkle-float {
      0% {
        transform: scale(0) rotate(0deg);
        opacity: 1;
      }
      50% {
        transform: scale(1.5) rotate(180deg);
        opacity: 1;
      }
      100% {
        transform: scale(0) rotate(360deg) translateY(-100px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  return overlay;
}

/**
 * Handles keyboard input for Konami code detection
 */
function handleKeydown(event: KeyboardEvent, config: Required<KonamiCodeConfig>): void {
  // Add key to sequence
  inputSequence.push(event.code);
  
  // Keep only the last 10 keys
  if (inputSequence.length > 10) {
    inputSequence.shift();
  }
  
  // Check if sequence matches Konami code
  if (inputSequence.length === 10 && !isActive) {
    const matches = inputSequence.every((key, index) => key === KONAMI_CODE[index]);
    
    if (matches) {
      activateEasterEgg(config);
    }
  }
  
  // Close overlay on ESC
  if (event.key === 'Escape' && isActive) {
    deactivateEasterEgg();
  }
}

/**
 * Activates the Easter egg celebration
 */
function activateEasterEgg(config: Required<KonamiCodeConfig>): void {
  if (isActive) return;
  
  isActive = true;
  overlayElement = createCelebrationOverlay();
  document.body.appendChild(overlayElement);
  
  // Click handler to close
  const clickHandler = () => {
    deactivateEasterEgg();
    overlayElement?.removeEventListener('click', clickHandler);
  };
  overlayElement.addEventListener('click', clickHandler);
  
  // Call custom callback
  config.onActivate();
  
  // Auto-reset if configured
  if (config.autoReset) {
    setTimeout(() => {
      inputSequence = [];
    }, config.resetDelay);
  }
  
  console.log('🎮 Konami Code activated! You found the chaos!');
}

/**
 * Deactivates the Easter egg celebration
 */
function deactivateEasterEgg(): void {
  if (!isActive) return;
  
  isActive = false;
  
  // Remove overlay with fade out
  if (overlayElement) {
    overlayElement.style.animation = 'overlay-fade-in 0.3s ease-out reverse';
    setTimeout(() => {
      overlayElement?.remove();
      overlayElement = null;
    }, 300);
  }
  
  // Remove animation styles
  const animationStyles = document.getElementById('konami-animations');
  if (animationStyles) {
    animationStyles.remove();
  }
}

/**
 * Mounts the Konami code listener to the document
 */
export function mountKonamiCode(config: Partial<KonamiCodeConfig> = {}): void {
  const finalConfig = { ...DEFAULT_KONAMI_CONFIG, ...config };
  
  // Clean up existing listener if any
  unmountKonamiCode();
  
  // Create and attach keydown handler
  keydownHandler = (event: KeyboardEvent) => handleKeydown(event, finalConfig);
  document.addEventListener('keydown', keydownHandler);
  
  console.log('🎮 Konami Code listener mounted. Try: ↑↑↓↓←→←→BA');
}

/**
 * Unmounts the Konami code listener and cleans up
 */
export function unmountKonamiCode(): void {
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
    keydownHandler = null;
  }
  
  // Reset state
  inputSequence = [];
  isActive = false;
  
  // Remove overlay if exists
  if (overlayElement) {
    overlayElement.remove();
    overlayElement = null;
  }
  
  // Remove animation styles
  const animationStyles = document.getElementById('konami-animations');
  if (animationStyles) {
    animationStyles.remove();
  }
}

/**
 * Gets the current overlay element if active
 */
export function getKonamiOverlay(): HTMLElement | null {
  return overlayElement;
}

/**
 * Checks if the Easter egg is currently active
 */
export function isKonamiActive(): boolean {
  return isActive;
}

/**
 * Manually triggers the Easter egg (for testing)
 */
export function triggerKonamiCode(config: Partial<KonamiCodeConfig> = {}): void {
  const finalConfig = { ...DEFAULT_KONAMI_CONFIG, ...config };
  activateEasterEgg(finalConfig);
}

/**
 * Resets the input sequence (for testing)
 */
export function resetKonamiSequence(): void {
  inputSequence = [];
}
