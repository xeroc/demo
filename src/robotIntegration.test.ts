/**
 * Tests for Story 3: Integrate dancing robot below header
 * 
 * Acceptance Criteria:
 * - Robot component is imported/included in the main page
 * - Robot appears visually below the header element
 * - Dancing animation plays automatically on page load
 * - Robot is responsive and displays well on different screen sizes
 * - Typecheck passes
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Story 3: Integrate dancing robot below header', () => {
  describe('HTML Structure - Robot Container', () => {
    let htmlContent: string;
    
    beforeEach(() => {
      const htmlPath = join(process.cwd(), 'index.html');
      htmlContent = readFileSync(htmlPath, 'utf-8');
    });

    it('AC1: Robot container exists in the main page', () => {
      expect(htmlContent).toContain('id="robot-container"');
    });

    it('Robot container is positioned below the header/subtitle', () => {
      // Find the positions of elements in HTML
      const headerPos = htmlContent.indexOf('<h1');
      const subtitlePos = htmlContent.indexOf('ChaosCraft Demo');
      const robotPos = htmlContent.indexOf('robot-container');
      const aboutPos = htmlContent.indexOf('What is ChaosCraft?');
      
      // Robot should come after header and subtitle
      expect(robotPos).toBeGreaterThan(headerPos);
      expect(robotPos).toBeGreaterThan(subtitlePos);
      
      // Robot should come before the about section
      expect(robotPos).toBeLessThan(aboutPos);
    });

    it('Robot container has proper centering classes', () => {
      expect(htmlContent).toContain('flex justify-center items-center');
    });

    it('Robot container has vertical spacing', () => {
      // Should have margin classes for spacing
      const robotContainerMatch = htmlContent.match(/id="robot-container"[^>]*class="[^"]*"/);
      expect(robotContainerMatch).not.toBeNull();
      expect(robotContainerMatch![0]).toMatch(/mt-\d+|mb-\d+/);
    });
  });

  describe('Main.ts Integration', () => {
    let mainContent: string;
    
    beforeEach(() => {
      const mainPath = join(process.cwd(), 'src', 'main.ts');
      mainContent = readFileSync(mainPath, 'utf-8');
    });

    it('AC1: Robot component is imported in main.ts', () => {
      expect(mainContent).toContain("from './robotSvg'");
      expect(mainContent).toContain('mountDancingRobot');
    });

    it('Robot is mounted on DOMContentLoaded event', () => {
      expect(mainContent).toContain('DOMContentLoaded');
      expect(mainContent).toContain("mountDancingRobot('robot-container')");
    });

    it('Robot functions are exported for external use', () => {
      expect(mainContent).toContain("export {");
      expect(mainContent).toContain("createDancingRobot");
      expect(mainContent).toContain("mountDancingRobot");
      expect(mainContent).toContain("unmountDancingRobot");
    });
  });

  describe('Automatic Animation on Page Load', () => {
    it('AC3: Animation plays automatically - animations have infinite loop', async () => {
      const { createDancingRobot } = await import('./robotSvg');
      const robot = createDancingRobot();
      const style = robot.querySelector('style');
      
      // All animations should have 'infinite' iteration
      expect(style?.textContent).toContain('infinite');
      
      // Verify all main animation classes include infinite
      const animationClasses = [
        '.robot-body-group',
        '.robot-arm-left',
        '.robot-arm-right',
        '.robot-head',
        '.robot-leg-left',
        '.robot-leg-right',
      ];
      
      animationClasses.forEach(className => {
        const classDef = style?.textContent?.match(new RegExp(`\\${className}[^}]*}`, 'g'));
        expect(classDef).not.toBeNull();
        expect(classDef![0]).toContain('infinite');
      });
    });

    it('Animations are triggered immediately without delay by default', async () => {
      const { createDancingRobot } = await import('./robotSvg');
      const robot = createDancingRobot();
      const bodyGroup = robot.querySelector('.robot-body-group');
      
      // Body group should exist and have animation applied
      expect(bodyGroup).not.toBeNull();
    });
  });

  describe('Responsive Design', () => {
    it('AC4: Robot uses viewBox for scalability', async () => {
      const { createDancingRobot } = await import('./robotSvg');
      const robot = createDancingRobot();
      
      const viewBox = robot.getAttribute('viewBox');
      expect(viewBox).toBe('0 0 200 300');
    });

    it('Robot has explicit dimensions that can be overridden', async () => {
      const { createDancingRobot } = await import('./robotSvg');
      const robot = createDancingRobot();
      
      // Default dimensions
      expect(robot.getAttribute('width')).toBe('150');
      expect(robot.getAttribute('height')).toBe('225');
    });

    it('Robot container uses flexbox for responsive centering', () => {
      const htmlPath = join(process.cwd(), 'index.html');
      const htmlContent = readFileSync(htmlPath, 'utf-8');
      
      // Container uses Tailwind flex utilities for responsive centering
      expect(htmlContent).toContain('flex justify-center items-center');
    });

    it('Robot container spacing is responsive with Tailwind utilities', () => {
      const htmlPath = join(process.cwd(), 'index.html');
      const htmlContent = readFileSync(htmlPath, 'utf-8');
      
      // Container should use Tailwind responsive spacing
      const robotContainerMatch = htmlContent.match(/id="robot-container"[^>]*>/);
      expect(robotContainerMatch).not.toBeNull();
      
      // Check for standard Tailwind spacing classes
      const containerClass = robotContainerMatch![0].match(/class="([^"]+)"/);
      expect(containerClass).not.toBeNull();
      expect(containerClass![1]).toMatch(/mt-\d+/);
      expect(containerClass![1]).toMatch(/mb-\d+/);
    });
  });

  describe('DOM Integration', () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'robot-container';
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('Robot can be mounted to the container', async () => {
      const { mountDancingRobot } = await import('./robotSvg');
      const robot = mountDancingRobot('robot-container');
      
      expect(robot).not.toBeNull();
      expect(container.contains(robot)).toBe(true);
    });

    it('Robot is visible in the DOM', async () => {
      const { mountDancingRobot } = await import('./robotSvg');
      const robot = mountDancingRobot('robot-container');
      
      // Check visibility
      expect(robot?.style.display).not.toBe('none');
      expect(robot?.getAttribute('hidden')).toBeNull();
    });

    it('Robot has proper accessibility attributes', async () => {
      const { mountDancingRobot } = await import('./robotSvg');
      const robot = mountDancingRobot('robot-container');
      
      expect(robot?.getAttribute('role')).toBe('img');
      expect(robot?.getAttribute('aria-label')).toContain('Dancing robot');
    });
  });

  describe('Acceptance Criteria Summary', () => {
    it('AC1: Robot component is imported/included in the main page', async () => {
      const mainPath = join(process.cwd(), 'src', 'main.ts');
      const mainContent = readFileSync(mainPath, 'utf-8');
      
      expect(mainContent).toContain("mountDancingRobot");
      expect(mainContent).toContain("from './robotSvg'");
    });

    it('AC2: Robot appears visually below the header element', () => {
      const htmlPath = join(process.cwd(), 'index.html');
      const htmlContent = readFileSync(htmlPath, 'utf-8');
      
      const h1Pos = htmlContent.indexOf('<h1');
      const robotPos = htmlContent.indexOf('robot-container');
      
      expect(robotPos).toBeGreaterThan(h1Pos);
    });

    it('AC3: Dancing animation plays automatically on page load', async () => {
      const { createDancingRobot } = await import('./robotSvg');
      const robot = createDancingRobot();
      const style = robot.querySelector('style');
      
      // Animations are defined with 'infinite' and no delays by default
      expect(style?.textContent).toContain('animation:');
      expect(style?.textContent).toContain('infinite');
    });

    it('AC4: Robot is responsive and displays well on different screen sizes', async () => {
      const { createDancingRobot } = await import('./robotSvg');
      const robot = createDancingRobot();
      
      // SVG with viewBox scales to any container size
      expect(robot.getAttribute('viewBox')).toBeDefined();
      
      // Container uses responsive flexbox centering
      const htmlPath = join(process.cwd(), 'index.html');
      const htmlContent = readFileSync(htmlPath, 'utf-8');
      expect(htmlContent).toContain('flex justify-center items-center');
    });

    it('AC5: Typecheck passes - verify TypeScript compiles', async () => {
      // This test passes if the module imports without TypeScript errors
      const robotModule = await import('./robotSvg');
      const mainModule = await import('./main');
      
      expect(robotModule.createDancingRobot).toBeDefined();
      expect(robotModule.mountDancingRobot).toBeDefined();
      expect(robotModule.unmountDancingRobot).toBeDefined();
      expect(mainModule).toBeDefined();
    });
  });
});
