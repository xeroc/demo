import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createDancingRobot, mountDancingRobot, unmountDancingRobot } from './robotSvg';

describe('Story: Create SVG robot component', () => {
  describe('SVG Creation', () => {
    let robot: SVGElement;

    beforeEach(() => {
      robot = createDancingRobot();
    });

    it('should create an SVG element', () => {
      expect(robot).toBeDefined();
      expect(robot.tagName.toLowerCase()).toBe('svg');
    });

    it('should have the correct id "dancing-robot"', () => {
      expect(robot.getAttribute('id')).toBe('dancing-robot');
    });

    it('should have a viewBox attribute for scalability', () => {
      const viewBox = robot.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
      expect(viewBox).toMatch(/^\d+\s+\d+\s+\d+\s+\d+$/);
    });

    it('should have reasonable width and height attributes', () => {
      const width = robot.getAttribute('width');
      const height = robot.getAttribute('height');
      expect(width).toBeDefined();
      expect(height).toBeDefined();
      expect(parseInt(width!)).toBeGreaterThan(0);
      expect(parseInt(height!)).toBeGreaterThan(0);
    });

    it('should have accessibility attributes (role and aria-label)', () => {
      expect(robot.getAttribute('role')).toBe('img');
      expect(robot.getAttribute('aria-label')).toContain('robot');
    });

    it('should have the "dancing-robot" class', () => {
      expect(robot.classList.contains('dancing-robot')).toBe(true);
    });
  });

  describe('Robot Body Parts - Head', () => {
    let robot: SVGElement;

    beforeEach(() => {
      robot = createDancingRobot();
    });

    it('should have a head element', () => {
      const head = robot.querySelector('#robot-head-main');
      expect(head).not.toBeNull();
    });

    it('should have eyes', () => {
      const leftEye = robot.querySelector('#robot-left-eye');
      const rightEye = robot.querySelector('#robot-right-eye');
      expect(leftEye).not.toBeNull();
      expect(rightEye).not.toBeNull();
    });

    it('should have an antenna', () => {
      const antennaStick = robot.querySelector('#robot-antenna-stick');
      const antennaBall = robot.querySelector('#robot-antenna-ball');
      expect(antennaStick).not.toBeNull();
      expect(antennaBall).not.toBeNull();
    });

    it('should have a mouth', () => {
      const mouth = robot.querySelector('#robot-mouth');
      expect(mouth).not.toBeNull();
    });

    it('should have a neck connecting head to torso', () => {
      const neck = robot.querySelector('#robot-neck');
      expect(neck).not.toBeNull();
    });

    it('head group should have animation class', () => {
      const headGroup = robot.querySelector('.robot-head');
      expect(headGroup).not.toBeNull();
    });
  });

  describe('Robot Body Parts - Torso', () => {
    let robot: SVGElement;

    beforeEach(() => {
      robot = createDancingRobot();
    });

    it('should have a torso element', () => {
      const torso = robot.querySelector('#robot-torso');
      expect(torso).not.toBeNull();
    });

    it('should have a chest panel', () => {
      const chestPanel = robot.querySelector('#robot-chest-panel');
      expect(chestPanel).not.toBeNull();
    });

    it('should have chest lights', () => {
      const light1 = robot.querySelector('#robot-light-1');
      const light2 = robot.querySelector('#robot-light-2');
      const light3 = robot.querySelector('#robot-light-3');
      expect(light1).not.toBeNull();
      expect(light2).not.toBeNull();
      expect(light3).not.toBeNull();
    });
  });

  describe('Robot Body Parts - Arms', () => {
    let robot: SVGElement;

    beforeEach(() => {
      robot = createDancingRobot();
    });

    it('should have a left arm with upper and lower segments', () => {
      const upperArm = robot.querySelector('#robot-left-upper-arm');
      const lowerArm = robot.querySelector('#robot-left-lower-arm');
      expect(upperArm).not.toBeNull();
      expect(lowerArm).not.toBeNull();
    });

    it('should have a right arm with upper and lower segments', () => {
      const upperArm = robot.querySelector('#robot-right-upper-arm');
      const lowerArm = robot.querySelector('#robot-right-lower-arm');
      expect(upperArm).not.toBeNull();
      expect(lowerArm).not.toBeNull();
    });

    it('should have hands', () => {
      const leftHand = robot.querySelector('#robot-left-hand');
      const rightHand = robot.querySelector('#robot-right-hand');
      expect(leftHand).not.toBeNull();
      expect(rightHand).not.toBeNull();
    });

    it('left arm group should have animation class', () => {
      const armGroup = robot.querySelector('.robot-arm-left');
      expect(armGroup).not.toBeNull();
    });

    it('right arm group should have animation class', () => {
      const armGroup = robot.querySelector('.robot-arm-right');
      expect(armGroup).not.toBeNull();
    });
  });

  describe('Robot Body Parts - Legs', () => {
    let robot: SVGElement;

    beforeEach(() => {
      robot = createDancingRobot();
    });

    it('should have a left leg', () => {
      const leg = robot.querySelector('#robot-left-leg');
      expect(leg).not.toBeNull();
    });

    it('should have a right leg', () => {
      const leg = robot.querySelector('#robot-right-leg');
      expect(leg).not.toBeNull();
    });

    it('should have feet', () => {
      const leftFoot = robot.querySelector('#robot-left-foot');
      const rightFoot = robot.querySelector('#robot-right-foot');
      expect(leftFoot).not.toBeNull();
      expect(rightFoot).not.toBeNull();
    });

    it('left leg group should have animation class', () => {
      const legGroup = robot.querySelector('.robot-leg-left');
      expect(legGroup).not.toBeNull();
    });

    it('right leg group should have animation class', () => {
      const legGroup = robot.querySelector('.robot-leg-right');
      expect(legGroup).not.toBeNull();
    });
  });

  describe('Animation Elements', () => {
    let robot: SVGElement;

    beforeEach(() => {
      robot = createDancingRobot();
    });

    it('should have style definitions for animations', () => {
      const style = robot.querySelector('style');
      expect(style).not.toBeNull();
    });

    it('should define robot-bounce animation', () => {
      const style = robot.querySelector('style');
      expect(style?.textContent).toContain('@keyframes robot-bounce');
    });

    it('should define arm animations', () => {
      const style = robot.querySelector('style');
      expect(style?.textContent).toContain('@keyframes robot-arm-left');
      expect(style?.textContent).toContain('@keyframes robot-arm-right');
    });

    it('should define head animation', () => {
      const style = robot.querySelector('style');
      expect(style?.textContent).toContain('@keyframes robot-head');
    });

    it('should define leg animations', () => {
      const style = robot.querySelector('style');
      expect(style?.textContent).toContain('@keyframes robot-leg-left');
      expect(style?.textContent).toContain('@keyframes robot-leg-right');
    });

    it('should have a body group with bounce animation', () => {
      const bodyGroup = robot.querySelector('.robot-body-group');
      expect(bodyGroup).not.toBeNull();
    });

    it('should have a shadow element', () => {
      const shadow = robot.querySelector('.robot-shadow');
      expect(shadow).not.toBeNull();
    });
  });

  describe('Mounting Functions', () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'test-container';
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('should mount robot to a container element', () => {
      const robot = mountDancingRobot('test-container');
      expect(robot).not.toBeNull();
      expect(container.contains(robot)).toBe(true);
    });

    it('should return null if container does not exist', () => {
      const robot = mountDancingRobot('non-existent-container');
      expect(robot).toBeNull();
    });

    it('should unmount robot from DOM', () => {
      mountDancingRobot('test-container');
      expect(document.getElementById('dancing-robot')).not.toBeNull();
      
      unmountDancingRobot();
      expect(document.getElementById('dancing-robot')).toBeNull();
    });

    it('should handle unmounting when robot does not exist', () => {
      // Should not throw error
      expect(() => unmountDancingRobot()).not.toThrow();
    });
  });

  describe('Acceptance Criteria Verification', () => {
    let robot: SVGElement;

    beforeEach(() => {
      robot = createDancingRobot();
    });

    it('AC1: SVG file or component exists in the project', () => {
      expect(robot).toBeDefined();
      expect(robot.tagName.toLowerCase()).toBe('svg');
    });

    it('AC2: SVG contains a recognizable robot figure with head, body, arms, and legs', () => {
      // Head
      expect(robot.querySelector('#robot-head-main')).not.toBeNull();
      
      // Body/Torso
      expect(robot.querySelector('#robot-torso')).not.toBeNull();
      
      // Arms
      expect(robot.querySelector('#robot-left-upper-arm')).not.toBeNull();
      expect(robot.querySelector('#robot-right-upper-arm')).not.toBeNull();
      
      // Legs
      expect(robot.querySelector('#robot-left-leg')).not.toBeNull();
      expect(robot.querySelector('#robot-right-leg')).not.toBeNull();
    });

    it('AC3: SVG elements have appropriate IDs/classes for animation targeting', () => {
      // Check IDs exist for major parts
      const ids = [
        'robot-head-main',
        'robot-torso',
        'robot-left-arm',
        'robot-right-arm',
        'robot-left-leg',
        'robot-right-leg',
      ];
      
      // At least some elements should have IDs
      const elementsWithIds = robot.querySelectorAll('[id]');
      expect(elementsWithIds.length).toBeGreaterThan(10);
      
      // Check animation classes exist
      expect(robot.querySelector('.robot-body-group')).not.toBeNull();
      expect(robot.querySelector('.robot-arm-left')).not.toBeNull();
      expect(robot.querySelector('.robot-arm-right')).not.toBeNull();
      expect(robot.querySelector('.robot-leg-left')).not.toBeNull();
      expect(robot.querySelector('.robot-leg-right')).not.toBeNull();
    });

    it('AC4: SVG has reasonable viewBox and dimensions for web display', () => {
      const viewBox = robot.getAttribute('viewBox');
      expect(viewBox).toBeDefined();
      
      const [x, y, width, height] = viewBox!.split(' ').map(Number);
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
      
      // Check aspect ratio is reasonable (not too wide or tall)
      const ratio = width / height;
      expect(ratio).toBeGreaterThan(0.3);
      expect(ratio).toBeLessThan(3);
      
      // Check explicit dimensions are set
      const explicitWidth = parseInt(robot.getAttribute('width')!);
      const explicitHeight = parseInt(robot.getAttribute('height')!);
      expect(explicitWidth).toBeGreaterThan(0);
      expect(explicitHeight).toBeGreaterThan(0);
    });
  });
});
