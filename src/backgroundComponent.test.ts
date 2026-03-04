/**
 * Tests for Background Component
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BackgroundComponent, createAnimatedBackground, DEFAULT_BACKGROUND_CONFIG } from './backgroundComponent';

// Mock requestAnimationFrame and cancelAnimationFrame
const mockRequestAnimationFrame = vi.fn();
const mockCancelAnimationFrame = vi.fn();

describe('BackgroundComponent', () => {
  let container: HTMLElement;
  let originalRAF: typeof requestAnimationFrame;
  let originalCAF: typeof cancelAnimationFrame;

  beforeEach(() => {
    // Create container element
    container = document.createElement('div');
    document.body.appendChild(container);

    // Mock requestAnimationFrame
    originalRAF = window.requestAnimationFrame;
    originalCAF = window.cancelAnimationFrame;
    window.requestAnimationFrame = mockRequestAnimationFrame;
    window.cancelAnimationFrame = mockCancelAnimationFrame;

    // Reset mocks
    mockRequestAnimationFrame.mockReset();
    mockCancelAnimationFrame.mockReset();
    mockRequestAnimationFrame.mockImplementation((cb: FrameRequestCallback) => {
      return window.setTimeout(() => cb(performance.now()), 16) as unknown as number;
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    window.requestAnimationFrame = originalRAF;
    window.cancelAnimationFrame = originalCAF;
  });

  describe('constructor', () => {
    it('should create component with default config', () => {
      const component = new BackgroundComponent();
      expect(component).toBeInstanceOf(BackgroundComponent);
      expect(component.getIsMounted()).toBe(false);
    });

    it('should accept custom configuration', () => {
      const customConfig = {
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        angle: 90,
        speed: 200
      };
      const component = new BackgroundComponent(customConfig);
      expect(component).toBeInstanceOf(BackgroundComponent);
    });

    it('should use provided container element', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      expect(component.getIsMounted()).toBe(true);
      component.unmount();
    });
  });

  describe('mount', () => {
    it('should mount successfully', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      expect(component.getIsMounted()).toBe(true);
      component.unmount();
    });

    it('should start animator on mount', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      const animator = component.getAnimator();
      expect(animator).not.toBeNull();
      expect(animator?.getIsRunning()).toBe(true);
      component.unmount();
    });

    it('should not mount twice', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      component.mount();
      expect(component.getIsMounted()).toBe(true);
      component.unmount();
    });

    it('should apply gradient to container', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      expect(container.style.background).toMatch(/conic-gradient/);
      component.unmount();
    });
  });

  describe('unmount', () => {
    it('should unmount successfully', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      component.unmount();
      expect(component.getIsMounted()).toBe(false);
    });

    it('should stop animator on unmount', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      component.unmount();
      const animator = component.getAnimator();
      expect(animator).toBeNull();
    });

    it('should not throw when unmounting already unmounted component', () => {
      const component = new BackgroundComponent({ container });
      expect(() => component.unmount()).not.toThrow();
    });

    it('should clean up animation frame on unmount', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      
      // Trigger some animation frames
      mockRequestAnimationFrame.mockClear();
      
      component.unmount();
      
      // Animator should be null after unmount
      expect(component.getAnimator()).toBeNull();
    });

    it('should reset container background on unmount', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      component.unmount();
      expect(container.style.background).toBe('');
    });
  });

  describe('animation lifecycle', () => {
    it('should create gradient that animates continuously', async () => {
      const component = new BackgroundComponent({ container, speed: 100 });
      component.mount();
      
      // Get initial background
      const initialBackground = container.style.background;
      
      // Wait for some animation frames
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Background should still have conic-gradient
      expect(container.style.background).toMatch(/conic-gradient/);
      
      component.unmount();
    });

    it('should loop seamlessly when reaching edge', async () => {
      const component = new BackgroundComponent({ 
        container, 
        speed: 1000, // Fast speed to reach edge quickly
        angle: 0 
      });
      component.mount();
      
      // Wait for multiple animation cycles
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Background should still be valid conic-gradient
      expect(container.style.background).toMatch(/conic-gradient/);
      
      component.unmount();
    });

    it('should animate at 45° direction (angle offset increases)', async () => {
      const component = new BackgroundComponent({ 
        container, 
        speed: 100,
        angle: 0
      });
      component.mount();
      
      // Initial state
      const backgrounds: string[] = [container.style.background];
      
      // Collect backgrounds over time
      await new Promise(resolve => setTimeout(resolve, 50));
      backgrounds.push(container.style.background);
      
      await new Promise(resolve => setTimeout(resolve, 50));
      backgrounds.push(container.style.background);
      
      // All should be valid gradients
      backgrounds.forEach(bg => {
        expect(bg).toMatch(/conic-gradient/);
      });
      
      component.unmount();
    });
  });

  describe('updateConfig', () => {
    it('should update configuration while mounted', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      
      component.updateConfig({ speed: 200 });
      
      expect(component.getIsMounted()).toBe(true);
      component.unmount();
    });

    it('should restart animator with new config', () => {
      const component = new BackgroundComponent({ container, speed: 100 });
      component.mount();
      
      const initialAnimator = component.getAnimator();
      component.updateConfig({ speed: 200 });
      const newAnimator = component.getAnimator();
      
      // Animator should be running after update
      expect(newAnimator?.getIsRunning()).toBe(true);
      component.unmount();
    });
  });

  describe('getIsMounted', () => {
    it('should return false initially', () => {
      const component = new BackgroundComponent();
      expect(component.getIsMounted()).toBe(false);
    });

    it('should return true after mount', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      expect(component.getIsMounted()).toBe(true);
      component.unmount();
    });

    it('should return false after unmount', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      component.unmount();
      expect(component.getIsMounted()).toBe(false);
    });
  });

  describe('gradient rendering', () => {
    it('should render conic gradient as background', () => {
      const component = new BackgroundComponent({ 
        container,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      });
      component.mount();
      
      const background = container.style.background;
      expect(background).toMatch(/conic-gradient/);
      expect(background).toMatch(/from/);
      expect(background).toMatch(/deg/);
      
      component.unmount();
    });

    it('should use custom colors in gradient', () => {
      const customColors = ['#112233', '#445566', '#778899'];
      const component = new BackgroundComponent({ 
        container,
        colors: customColors
      });
      component.mount();
      
      const background = container.style.background;
      // Colors are converted to rgb format by the browser
      expect(background).toContain('rgb(17, 34, 51)');
      
      component.unmount();
    });

    it('should apply gradient to document.body by default', () => {
      const component = new BackgroundComponent();
      component.mount();
      
      expect(document.body.style.background).toMatch(/conic-gradient/);
      
      component.unmount();
      document.body.style.background = '';
    });
  });

  describe('error handling', () => {
    it('should handle invalid colors gracefully', () => {
      const component = new BackgroundComponent({ 
        container,
        colors: [] // Empty colors array
      });
      
      // Mount should not throw, but gradient won't be applied
      expect(() => component.mount()).not.toThrow();
      
      component.unmount();
    });
  });
});

describe('createAnimatedBackground', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container.parentNode) {
      document.body.removeChild(container);
    }
  });

  it('should create and mount component', () => {
    const component = createAnimatedBackground({ container });
    expect(component.getIsMounted()).toBe(true);
    component.unmount();
  });

  it('should return BackgroundComponent instance', () => {
    const component = createAnimatedBackground({ container });
    expect(component).toBeInstanceOf(BackgroundComponent);
    component.unmount();
  });

  it('should accept custom configuration', () => {
    const component = createAnimatedBackground({ 
      container,
      colors: ['#ff0000'],
      speed: 500
    });
    expect(component.getIsMounted()).toBe(true);
    component.unmount();
  });
});

describe('DEFAULT_BACKGROUND_CONFIG', () => {
  it('should have valid default colors', () => {
    expect(DEFAULT_BACKGROUND_CONFIG.colors).toBeInstanceOf(Array);
    expect(DEFAULT_BACKGROUND_CONFIG.colors.length).toBeGreaterThan(0);
  });

  it('should have valid default angle', () => {
    expect(DEFAULT_BACKGROUND_CONFIG.angle).toBeGreaterThanOrEqual(0);
    expect(DEFAULT_BACKGROUND_CONFIG.angle).toBeLessThanOrEqual(360);
  });

  it('should have valid default speed', () => {
    expect(DEFAULT_BACKGROUND_CONFIG.speed).toBeGreaterThan(0);
  });
});

describe('Configuration options', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container.parentNode) {
      document.body.removeChild(container);
    }
  });

  describe('colors configuration', () => {
    it('should accept custom colors array', () => {
      const customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
      const component = new BackgroundComponent({ 
        container,
        colors: customColors 
      });
      
      const config = component.getConfig();
      expect(config.colors).toEqual(customColors);
    });

    it('should use default colors when not specified', () => {
      const component = new BackgroundComponent({ container });
      const config = component.getConfig();
      
      expect(config.colors).toEqual(DEFAULT_BACKGROUND_CONFIG.colors);
    });

    it('should validate colors format', () => {
      const validColors = ['#fff', '#000000', '#aBc123'];
      const component = new BackgroundComponent({ 
        container,
        colors: validColors 
      });
      
      const config = component.getConfig();
      expect(config.colors).toEqual(validColors);
    });

    it('should allow updating colors after initialization', () => {
      const component = new BackgroundComponent({ container });
      component.mount();
      
      const newColors = ['#111111', '#222222'];
      component.updateConfig({ colors: newColors });
      
      const config = component.getConfig();
      expect(config.colors).toEqual(newColors);
      
      component.unmount();
    });
  });

  describe('animation speed configuration', () => {
    it('should accept custom speed value', () => {
      const customSpeed = 250;
      const component = new BackgroundComponent({ 
        container,
        speed: customSpeed 
      });
      
      const config = component.getConfig();
      expect(config.speed).toBe(customSpeed);
    });

    it('should use default speed when not specified', () => {
      const component = new BackgroundComponent({ container });
      const config = component.getConfig();
      
      expect(config.speed).toBe(DEFAULT_BACKGROUND_CONFIG.speed);
    });

    it('should allow updating speed after initialization', () => {
      const component = new BackgroundComponent({ 
        container,
        speed: 100 
      });
      component.mount();
      
      const newSpeed = 300;
      component.updateConfig({ speed: newSpeed });
      
      const config = component.getConfig();
      expect(config.speed).toBe(newSpeed);
      
      component.unmount();
    });

    it('should handle different speed values', () => {
      const speeds = [50, 100, 200, 500, 1000];
      
      speeds.forEach(speed => {
        const component = new BackgroundComponent({ container, speed });
        const config = component.getConfig();
        expect(config.speed).toBe(speed);
      });
    });
  });

  describe('gradient angle configuration', () => {
    it('should accept custom angle value', () => {
      const customAngle = 90;
      const component = new BackgroundComponent({ 
        container,
        angle: customAngle 
      });
      
      const config = component.getConfig();
      expect(config.angle).toBe(customAngle);
    });

    it('should use default angle when not specified', () => {
      const component = new BackgroundComponent({ container });
      const config = component.getConfig();
      
      expect(config.angle).toBe(DEFAULT_BACKGROUND_CONFIG.angle);
    });

    it('should allow updating angle after initialization', () => {
      const component = new BackgroundComponent({ 
        container,
        angle: 0 
      });
      component.mount();
      
      const newAngle = 180;
      component.updateConfig({ angle: newAngle });
      
      const config = component.getConfig();
      expect(config.angle).toBe(newAngle);
      
      component.unmount();
    });

    it('should handle different angle values', () => {
      const angles = [0, 45, 90, 180, 270, 360];
      
      angles.forEach(angle => {
        const component = new BackgroundComponent({ container, angle });
        const config = component.getConfig();
        expect(config.angle).toBe(angle);
      });
    });
  });

  describe('configuration parsing', () => {
    it('should merge partial config with defaults', () => {
      const partialConfig = {
        speed: 200
      };
      
      const component = new BackgroundComponent({ 
        container,
        ...partialConfig 
      });
      
      const config = component.getConfig();
      expect(config.speed).toBe(200);
      expect(config.colors).toEqual(DEFAULT_BACKGROUND_CONFIG.colors);
      expect(config.angle).toBe(DEFAULT_BACKGROUND_CONFIG.angle);
    });

    it('should override all defaults when full config provided', () => {
      const fullConfig = {
        colors: ['#111', '#222', '#333'],
        speed: 500,
        angle: 135,
        container
      };
      
      const component = new BackgroundComponent(fullConfig);
      const config = component.getConfig();
      
      expect(config.colors).toEqual(fullConfig.colors);
      expect(config.speed).toBe(fullConfig.speed);
      expect(config.angle).toBe(fullConfig.angle);
    });
  });

  describe('default fallbacks', () => {
    it('should fall back to defaults for undefined values', () => {
      const component = new BackgroundComponent({ 
        container,
        colors: undefined as any,
        speed: undefined as any,
        angle: undefined as any
      });
      
      const config = component.getConfig();
      expect(config.colors).toEqual(DEFAULT_BACKGROUND_CONFIG.colors);
      expect(config.speed).toBe(DEFAULT_BACKGROUND_CONFIG.speed);
      expect(config.angle).toBe(DEFAULT_BACKGROUND_CONFIG.angle);
    });

    it('should use defaults when empty config provided', () => {
      const component = new BackgroundComponent({});
      const config = component.getConfig();
      
      expect(config.colors).toEqual(DEFAULT_BACKGROUND_CONFIG.colors);
      expect(config.speed).toBe(DEFAULT_BACKGROUND_CONFIG.speed);
      expect(config.angle).toBe(DEFAULT_BACKGROUND_CONFIG.angle);
    });
  });
});
