import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Story: Add CSS keyframe animations for dancing effect', () => {
  let cssContent: string;

  beforeEach(() => {
    // Read the CSS file
    const cssPath = resolve(__dirname, 'robotDance.css');
    cssContent = readFileSync(cssPath, 'utf-8');
  });

  describe('CSS File Structure', () => {
    it('should have a CSS file for robot animations', () => {
      expect(cssContent).toBeDefined();
      expect(cssContent.length).toBeGreaterThan(0);
    });

    it('should contain @keyframes definitions', () => {
      const keyframesCount = (cssContent.match(/@keyframes/g) || []).length;
      expect(keyframesCount).toBeGreaterThan(0);
    });
  });

  describe('Body Bounce Animation', () => {
    it('should define robot-bounce keyframe animation', () => {
      expect(cssContent).toContain('@keyframes robot-bounce');
    });

    it('should have translateY transform for bounce effect', () => {
      expect(cssContent).toContain('translateY');
    });

    it('should have appropriate bounce keyframe stages', () => {
      const bounceMatch = cssContent.match(/@keyframes robot-bounce\s*{([^}]*)}/);
      expect(bounceMatch).not.toBeNull();
      expect(bounceMatch![1]).toContain('0%');
      expect(bounceMatch![1]).toContain('50%');
      expect(bounceMatch![1]).toContain('100%');
    });

    it('should have robot-body-group class with bounce animation', () => {
      expect(cssContent).toContain('.robot-body-group');
      expect(cssContent).toContain('animation: robot-bounce');
    });

    it('should have infinite loop for bounce animation', () => {
      const bodyGroupMatch = cssContent.match(/\.robot-body-group\s*{([^}]*)}/);
      expect(bodyGroupMatch).not.toBeNull();
      expect(bodyGroupMatch![1]).toContain('infinite');
    });
  });

  describe('Arm Movement Animations', () => {
    it('should define robot-arm-left keyframe animation', () => {
      expect(cssContent).toContain('@keyframes robot-arm-left');
    });

    it('should define robot-arm-right keyframe animation', () => {
      expect(cssContent).toContain('@keyframes robot-arm-right');
    });

    it('should have rotate transforms for arm movement', () => {
      const leftArmMatch = cssContent.match(/@keyframes robot-arm-left\s*{([^}]*)}/);
      expect(leftArmMatch).not.toBeNull();
      expect(leftArmMatch![1]).toContain('rotate(');
    });

    it('should have opposite rotation values for arms', () => {
      const leftArmMatch = cssContent.match(/@keyframes robot-arm-left\s*{([^}]*)}/);
      const rightArmMatch = cssContent.match(/@keyframes robot-arm-right\s*{([^}]*)}/);
      
      expect(leftArmMatch).not.toBeNull();
      expect(rightArmMatch).not.toBeNull();
      
      // Left arm should have negative rotations, right arm positive
      expect(leftArmMatch![1]).toContain('rotate(-');
      expect(rightArmMatch![1]).toContain('rotate(45deg)');
    });

    it('should have transform-origin for arm rotation pivot', () => {
      expect(cssContent).toContain('.robot-arm-left');
      expect(cssContent).toContain('.robot-arm-right');
      expect(cssContent).toContain('transform-origin');
    });

    it('should have infinite loop for arm animations', () => {
      const leftArmClassMatch = cssContent.match(/\.robot-arm-left\s*{([^}]*)}/);
      expect(leftArmClassMatch).not.toBeNull();
      expect(leftArmClassMatch![1]).toContain('infinite');
    });
  });

  describe('Leg Movement Animations', () => {
    it('should define robot-leg-left keyframe animation', () => {
      expect(cssContent).toContain('@keyframes robot-leg-left');
    });

    it('should define robot-leg-right keyframe animation', () => {
      expect(cssContent).toContain('@keyframes robot-leg-right');
    });

    it('should have rotate transforms for leg movement', () => {
      const leftLegMatch = cssContent.match(/@keyframes robot-leg-left\s*{([^}]*)}/);
      expect(leftLegMatch).not.toBeNull();
      expect(leftLegMatch![1]).toContain('rotate(');
    });

    it('should have opposite rotation values for legs', () => {
      const leftLegMatch = cssContent.match(/@keyframes robot-leg-left\s*{([^}]*)}/);
      const rightLegMatch = cssContent.match(/@keyframes robot-leg-right\s*{([^}]*)}/);
      
      expect(leftLegMatch).not.toBeNull();
      expect(rightLegMatch).not.toBeNull();
      
      // Legs should have opposite rotations at same keyframe
      expect(leftLegMatch![1]).toContain('rotate(-5deg)');
      expect(rightLegMatch![1]).toContain('rotate(5deg)');
    });

    it('should have transform-origin for leg rotation pivot', () => {
      expect(cssContent).toContain('.robot-leg-left');
      expect(cssContent).toContain('.robot-leg-right');
    });

    it('should have infinite loop for leg animations', () => {
      const leftLegClassMatch = cssContent.match(/\.robot-leg-left\s*{([^}]*)}/);
      expect(leftLegClassMatch).not.toBeNull();
      expect(leftLegClassMatch![1]).toContain('infinite');
    });
  });

  describe('Head Movement Animation', () => {
    it('should define robot-head keyframe animation', () => {
      expect(cssContent).toContain('@keyframes robot-head');
    });

    it('should have rotate transform for head bobbing', () => {
      const headMatch = cssContent.match(/@keyframes robot-head\s*{([^}]*)}/);
      expect(headMatch).not.toBeNull();
      expect(headMatch![1]).toContain('rotate(');
    });

    it('should have appropriate head rotation angles', () => {
      const headMatch = cssContent.match(/@keyframes robot-head\s*{([^}]*)}/);
      expect(headMatch).not.toBeNull();
      
      // Should tilt both directions
      expect(headMatch![1]).toContain('rotate(-5deg)');
      expect(headMatch![1]).toContain('rotate(5deg)');
    });

    it('should have transform-origin for head rotation pivot', () => {
      expect(cssContent).toContain('.robot-head');
      const headClassMatch = cssContent.match(/\.robot-head\s*{([^}]*)}/);
      expect(headClassMatch).not.toBeNull();
      expect(headClassMatch![1]).toContain('transform-origin');
    });

    it('should have infinite loop for head animation', () => {
      const headClassMatch = cssContent.match(/\.robot-head\s*{([^}]*)}/);
      expect(headClassMatch).not.toBeNull();
      expect(headClassMatch![1]).toContain('infinite');
    });
  });

  describe('Eye Glow Animation', () => {
    it('should define robot-eye-glow keyframe animation', () => {
      expect(cssContent).toContain('@keyframes robot-eye-glow');
    });

    it('should have opacity changes for glow effect', () => {
      const eyeMatch = cssContent.match(/@keyframes robot-eye-glow\s*{([^}]*)}/);
      expect(eyeMatch).not.toBeNull();
      expect(eyeMatch![1]).toContain('opacity');
    });

    it('should have robot-eye class with glow animation', () => {
      expect(cssContent).toContain('.robot-eye');
      expect(cssContent).toContain('animation: robot-eye-glow');
    });
  });

  describe('Animation Timing', () => {
    it('should have appropriate timing for body bounce (0.6s)', () => {
      const bodyGroupMatch = cssContent.match(/\.robot-body-group\s*{([^}]*)}/);
      expect(bodyGroupMatch).not.toBeNull();
      expect(bodyGroupMatch![1]).toContain('0.6s');
    });

    it('should have appropriate timing for arm movements (0.6s)', () => {
      const leftArmMatch = cssContent.match(/\.robot-arm-left\s*{([^}]*)}/);
      expect(leftArmMatch).not.toBeNull();
      expect(leftArmMatch![1]).toContain('0.6s');
    });

    it('should have faster timing for leg movements (0.3s)', () => {
      const leftLegMatch = cssContent.match(/\.robot-leg-left\s*{([^}]*)}/);
      expect(leftLegMatch).not.toBeNull();
      expect(leftLegMatch![1]).toContain('0.3s');
    });

    it('should have slower timing for eye glow (1s)', () => {
      const eyeMatch = cssContent.match(/\.robot-eye\s*{([^}]*)}/);
      expect(eyeMatch).not.toBeNull();
      expect(eyeMatch![1]).toContain('1s');
    });

    it('should use ease-in-out timing function for smooth animations', () => {
      expect(cssContent).toContain('ease-in-out');
    });
  });

  describe('Animation Classes', () => {
    it('should have dancing-robot class', () => {
      expect(cssContent).toContain('.dancing-robot');
    });

    it('should have all required animation classes', () => {
      const requiredClasses = [
        '.robot-body-group',
        '.robot-arm-left',
        '.robot-arm-right',
        '.robot-head',
        '.robot-leg-left',
        '.robot-leg-right',
        '.robot-eye',
        '.dancing-robot'
      ];

      requiredClasses.forEach(className => {
        expect(cssContent).toContain(className);
      });
    });

    it('animation classes can be applied to SVG robot elements', () => {
      // Verify that the class names match what would be used in SVG
      expect(cssContent).toContain('.robot-body-group');
      expect(cssContent).toContain('.robot-arm-left');
      expect(cssContent).toContain('.robot-arm-right');
      expect(cssContent).toContain('.robot-head');
      expect(cssContent).toContain('.robot-leg-left');
      expect(cssContent).toContain('.robot-leg-right');
    });
  });

  describe('Acceptance Criteria Verification', () => {
    it('AC1: CSS file contains @keyframes definitions for dance animations', () => {
      const keyframes = [
        'robot-bounce',
        'robot-arm-left',
        'robot-arm-right',
        'robot-head',
        'robot-leg-left',
        'robot-leg-right',
        'robot-eye-glow'
      ];

      keyframes.forEach(keyframe => {
        expect(cssContent).toContain(`@keyframes ${keyframe}`);
      });
    });

    it('AC2: Animation targets the robot body parts (arms, legs, head, body)', () => {
      // Body
      expect(cssContent).toContain('.robot-body-group');
      expect(cssContent).toContain('robot-bounce');
      
      // Arms
      expect(cssContent).toContain('.robot-arm-left');
      expect(cssContent).toContain('.robot-arm-right');
      expect(cssContent).toContain('robot-arm-left');
      expect(cssContent).toContain('robot-arm-right');
      
      // Legs
      expect(cssContent).toContain('.robot-leg-left');
      expect(cssContent).toContain('.robot-leg-right');
      expect(cssContent).toContain('robot-leg-left');
      expect(cssContent).toContain('robot-leg-right');
      
      // Head
      expect(cssContent).toContain('.robot-head');
      expect(cssContent).toContain('robot-head');
    });

    it('AC3: Animations have appropriate timing and loop infinitely', () => {
      // Check for infinite loops
      const infiniteCount = (cssContent.match(/infinite/g) || []).length;
      expect(infiniteCount).toBeGreaterThanOrEqual(6); // At least 6 animation classes
      
      // Check for timing
      expect(cssContent).toContain('0.6s'); // Body and arms
      expect(cssContent).toContain('0.3s'); // Legs
      expect(cssContent).toContain('1s');   // Eyes
      
      // Check for smooth easing
      expect(cssContent).toContain('ease-in-out');
    });

    it('AC4: Animation class can be applied to the SVG robot', () => {
      // Verify .dancing-robot class exists
      expect(cssContent).toContain('.dancing-robot');
      
      // Verify it has appropriate styling
      const dancingRobotMatch = cssContent.match(/\.dancing-robot\s*{([^}]*)}/);
      expect(dancingRobotMatch).not.toBeNull();
    });
  });
});
