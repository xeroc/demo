/**
 * Story 1: Analyze Current Landing Page Structure
 * Tests to verify analysis findings
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Story 1: Landing Page Structure Analysis', () => {
  describe('AC1: Current landing page file(s) identified', () => {
    it('should have index.html as main landing page', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('should have src/main.ts as entry point', () => {
      const mainPath = path.join(__dirname, 'main.ts');
      expect(fs.existsSync(mainPath)).toBe(true);
    });

    it('should have headerComponent.ts', () => {
      const headerPath = path.join(__dirname, 'headerComponent.ts');
      expect(fs.existsSync(headerPath)).toBe(true);
    });

    it('should have bannerComponent.ts', () => {
      const bannerPath = path.join(__dirname, 'bannerComponent.ts');
      expect(fs.existsSync(bannerPath)).toBe(true);
    });

    it('should have footerComponent.ts', () => {
      const footerPath = path.join(__dirname, 'footerComponent.ts');
      expect(fs.existsSync(footerPath)).toBe(true);
    });
  });

  describe('AC2: Existing CSS/styling files identified', () => {
    it('should have Tailwind CSS via CDN in index.html', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toContain('cdn.tailwindcss.com');
    });

    it('should have responsive foundation CSS in index.html', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toContain('--breakpoint-mobile');
      expect(content).toContain('--breakpoint-tablet');
      expect(content).toContain('--breakpoint-desktop');
    });

    it('should have robotDance.css for animations', () => {
      const robotCssPath = path.join(__dirname, 'robotDance.css');
      expect(fs.existsSync(robotCssPath)).toBe(true);
    });
  });

  describe('AC3: Current content sections documented', () => {
    it('should have main heading in index.html', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toContain('Welcome to ChaosCraft');
    });

    it('should have subtitle in index.html', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toContain('ChaosCraft Demo');
    });

    it('should have robot container in index.html', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toContain('id="robot-container"');
    });

    it('should have "What is ChaosCraft?" section in index.html', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toContain('What is ChaosCraft?');
      expect(content).toContain('How It Works');
    });
  });

  describe('AC4: List of elements to remain as content identified', () => {
    it('should identify header currently has navigation links', async () => {
      const { DEFAULT_HEADER_CONFIG } = await import('./headerComponent');
      expect(DEFAULT_HEADER_CONFIG.navItems).toBeDefined();
      expect(DEFAULT_HEADER_CONFIG.navItems.length).toBeGreaterThan(0);
    });

    it('should identify footer currently has navigation links', async () => {
      const { DEFAULT_FOOTER_CONFIG } = await import('./footerComponent');
      expect(DEFAULT_FOOTER_CONFIG.links).toBeDefined();
      expect(DEFAULT_FOOTER_CONFIG.links.length).toBeGreaterThan(0);
    });

    it('should identify footer copyright has 2024 year', async () => {
      const { DEFAULT_FOOTER_CONFIG } = await import('./footerComponent');
      expect(DEFAULT_FOOTER_CONFIG.copyrightText).toContain('2024');
    });

    it('should identify banner has correct structure', async () => {
      const { DEFAULT_BANNER_CONFIG } = await import('./bannerComponent');
      expect(DEFAULT_BANNER_CONFIG.message).toBeDefined();
      expect(DEFAULT_BANNER_CONFIG.linkUrl).toBe('https://app.chaoscraft.dev');
    });
  });

  describe('Component Integration Analysis', () => {
    it('should verify main.ts imports all components', async () => {
      const mainPath = path.join(__dirname, 'main.ts');
      const content = fs.readFileSync(mainPath, 'utf-8');
      
      expect(content).toContain('mountBanner');
      expect(content).toContain('mountHeader');
      expect(content).toContain('mountFooter');
      expect(content).toContain('initAnimatedBackground');
      expect(content).toContain('mountDancingRobot');
    });

    it('should verify main.ts mounts components in correct order', async () => {
      const mainPath = path.join(__dirname, 'main.ts');
      const content = fs.readFileSync(mainPath, 'utf-8');
      
      // Banner should be mounted first
      const bannerIndex = content.indexOf('mountBanner()');
      // Header should be mounted after banner
      const headerIndex = content.indexOf('mountHeader()');
      // Footer should be mounted last
      const footerIndex = content.indexOf('mountFooter()');
      
      expect(bannerIndex).toBeLessThan(headerIndex);
      expect(headerIndex).toBeLessThan(footerIndex);
    });
  });

  describe('Responsive Design Analysis', () => {
    it('should verify index.html has viewport meta tag', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toContain('name="viewport"');
      expect(content).toContain('width=device-width');
    });

    it('should verify responsive breakpoints are defined', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      
      expect(content).toContain('sm:');
      expect(content).toContain('md:');
      expect(content).toContain('lg:');
    });

    it('should verify max-w-7xl constraint for content width', () => {
      const indexPath = path.join(__dirname, '..', 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      expect(content).toContain('max-w-7xl');
    });
  });

  describe('Documentation Verification', () => {
    it('should have STORY1_ANALYSIS.md created', () => {
      const analysisPath = path.join(__dirname, '..', 'STORY1_ANALYSIS.md');
      expect(fs.existsSync(analysisPath)).toBe(true);
    });

    it('should document all identified files in analysis', () => {
      const analysisPath = path.join(__dirname, '..', 'STORY1_ANALYSIS.md');
      const content = fs.readFileSync(analysisPath, 'utf-8');
      
      expect(content).toContain('index.html');
      expect(content).toContain('src/main.ts');
      expect(content).toContain('src/headerComponent.ts');
      expect(content).toContain('src/bannerComponent.ts');
      expect(content).toContain('src/footerComponent.ts');
    });

    it('should document required changes in analysis', () => {
      const analysisPath = path.join(__dirname, '..', 'STORY1_ANALYSIS.md');
      const content = fs.readFileSync(analysisPath, 'utf-8');
      
      // Header changes
      expect(content).toContain('REMOVE: Navigation links');
      // Footer changes
      expect(content).toContain('UPDATE: Copyright year to 2026');
      expect(content).toContain('REMOVE: Navigation links');
    });
  });
});
