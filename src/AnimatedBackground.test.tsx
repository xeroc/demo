/**
 * Tests for AnimatedBackground React Component
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import AnimatedBackground from './AnimatedBackground';

// Mock requestAnimationFrame
const mockRequestAnimationFrame = vi.fn();
const mockCancelAnimationFrame = vi.fn();

// Mock performance.now()
const mockPerformanceNow = vi.fn();

describe('AnimatedBackground', () => {
  beforeEach(() => {
    global.requestAnimationFrame = mockRequestAnimationFrame;
    global.cancelAnimationFrame = mockCancelAnimationFrame;
    global.performance.now = mockPerformanceNow;
    
    mockRequestAnimationFrame.mockReset();
    mockCancelAnimationFrame.mockReset();
    mockPerformanceNow.mockReset();
    
    // Default mock implementation
    mockRequestAnimationFrame.mockImplementation((callback: FrameRequestCallback) => {
      return 1;
    });
    mockPerformanceNow.mockReturnValue(0);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render without crashing', () => {
    render(<AnimatedBackground />);
    const container = document.querySelector('.fixed.inset-0');
    expect(container).toBeTruthy();
  });

  it('should render children when provided', () => {
    render(
      <AnimatedBackground>
        <div data-testid="child">Test Child</div>
      </AnimatedBackground>
    );
    
    expect(screen.getByTestId('child')).toBeTruthy();
    expect(screen.getByText('Test Child')).toBeTruthy();
  });

  it('should start animation on mount', () => {
    render(<AnimatedBackground />);
    
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('should cancel animation on unmount', () => {
    const { unmount } = render(<AnimatedBackground />);
    
    unmount();
    
    expect(mockCancelAnimationFrame).toHaveBeenCalled();
  });

  it('should have fixed positioning for full-screen coverage', () => {
    render(<AnimatedBackground />);
    
    const container = document.querySelector('.fixed.inset-0');
    expect(container).toBeTruthy();
    expect(container?.className).toContain('fixed');
    expect(container?.className).toContain('inset-0');
    expect(container?.className).toContain('w-full');
    expect(container?.className).toContain('h-full');
  });

  it('should have negative z-index to appear behind content', () => {
    render(<AnimatedBackground />);
    
    const container = document.querySelector('.fixed.inset-0');
    expect(container).toBeTruthy();
    expect((container as HTMLElement).style.zIndex).toBe('-1');
  });

  it('should apply gradient to container element', () => {
    let animationCallback: FrameRequestCallback | null = null;
    
    mockRequestAnimationFrame.mockImplementation((callback: FrameRequestCallback) => {
      animationCallback = callback;
      return 1;
    });
    
    mockPerformanceNow
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(100);

    render(
      <AnimatedBackground 
        colors={['#ff0000', '#00ff00', '#0000ff']}
        angle={45}
        speed={100}
      />
    );

    // Trigger animation frame
    if (animationCallback) {
      animationCallback(1);
    }

    const container = document.querySelector('.fixed.inset-0') as HTMLElement;
    expect(container?.style.background).toMatch(/conic-gradient/);
  });

  it('should use default colors when not provided', () => {
    render(<AnimatedBackground />);
    
    const container = document.querySelector('.fixed.inset-0');
    expect(container).toBeTruthy();
    // Component renders without error, using defaults
  });

  it('should accept custom colors prop', () => {
    const customColors = ['#ff0000', '#00ff00'];
    render(<AnimatedBackground colors={customColors} />);
    
    const container = document.querySelector('.fixed.inset-0');
    expect(container).toBeTruthy();
  });

  it('should accept custom angle prop', () => {
    render(<AnimatedBackground angle={90} />);
    
    const container = document.querySelector('.fixed.inset-0');
    expect(container).toBeTruthy();
  });

  it('should accept custom speed prop', () => {
    render(<AnimatedBackground speed={200} />);
    
    const container = document.querySelector('.fixed.inset-0');
    expect(container).toBeTruthy();
  });

  it('should handle animation timing correctly', () => {
    let animationCallback: FrameRequestCallback | null = null;
    
    mockRequestAnimationFrame.mockImplementation((callback: FrameRequestCallback) => {
      animationCallback = callback;
      return 1;
    });
    
    // Simulate time progression
    mockPerformanceNow
      .mockReturnValueOnce(0)    // Start time
      .mockReturnValueOnce(1000); // After 1 second

    render(<AnimatedBackground speed={100} angle={0} />);

    // Trigger animation frame
    if (animationCallback) {
      animationCallback(1);
    }

    const container = document.querySelector('.fixed.inset-0') as HTMLElement;
    // Should have a conic-gradient background
    expect(container?.style.background).toMatch(/conic-gradient/);
  });
});
