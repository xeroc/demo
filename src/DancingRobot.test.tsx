/**
 * Tests for DancingRobot component
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import DancingRobot from './DancingRobot';

describe('DancingRobot', () => {
  it('renders without crashing', () => {
    const { container } = render(<DancingRobot />);
    expect(container).toBeTruthy();
  });

  it('renders an SVG element', () => {
    const { container } = render(<DancingRobot />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('has correct SVG attributes', () => {
    const { container } = render(<DancingRobot />);
    const svg = container.querySelector('svg');
    
    expect(svg?.getAttribute('id')).toBe('dancing-robot');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 200 300');
    expect(svg?.getAttribute('role')).toBe('img');
    expect(svg?.getAttribute('aria-label')).toBe('Dancing robot animation');
  });

  it('has dancing-robot class', () => {
    const { container } = render(<DancingRobot />);
    const svg = container.querySelector('svg');
    expect(svg?.classList.contains('dancing-robot')).toBe(true);
  });

  it('contains robot body parts', () => {
    const { container } = render(<DancingRobot />);
    
    // Check for key robot parts
    expect(container.querySelector('#robot-torso')).toBeTruthy();
    expect(container.querySelector('#robot-left-leg')).toBeTruthy();
    expect(container.querySelector('#robot-right-leg')).toBeTruthy();
    expect(container.querySelector('#robot-left-eye')).toBeTruthy();
    expect(container.querySelector('#robot-right-eye')).toBeTruthy();
    expect(container.querySelector('#robot-antenna-ball')).toBeTruthy();
  });

  it('contains animation groups', () => {
    const { container } = render(<DancingRobot />);
    
    expect(container.querySelector('.robot-body-group')).toBeTruthy();
    expect(container.querySelector('.robot-arm-left')).toBeTruthy();
    expect(container.querySelector('.robot-arm-right')).toBeTruthy();
    expect(container.querySelector('.robot-head')).toBeTruthy();
    expect(container.querySelector('.robot-leg-left')).toBeTruthy();
    expect(container.querySelector('.robot-leg-right')).toBeTruthy();
  });

  it('has animated elements with robot-eye class', () => {
    const { container } = render(<DancingRobot />);
    const animatedElements = container.querySelectorAll('.robot-eye');
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it('includes style definitions with keyframes', () => {
    const { container } = render(<DancingRobot />);
    const style = container.querySelector('style');
    expect(style).toBeTruthy();
    
    const styleContent = style?.textContent || '';
    expect(styleContent).toContain('@keyframes robot-bounce');
    expect(styleContent).toContain('@keyframes robot-arm-left');
    expect(styleContent).toContain('@keyframes robot-arm-right');
    expect(styleContent).toContain('@keyframes robot-head');
    expect(styleContent).toContain('@keyframes robot-leg-left');
    expect(styleContent).toContain('@keyframes robot-leg-right');
    expect(styleContent).toContain('@keyframes robot-eye-glow');
  });

  it('has responsive styles', () => {
    const { container } = render(<DancingRobot />);
    const style = container.querySelector('style');
    const styleContent = style?.textContent || '';
    
    expect(styleContent).toContain('.dancing-robot');
    expect(styleContent).toContain('@media (min-width: 1024px)');
  });
});
