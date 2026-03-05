import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Story 34: Create Banner Component', () => {
  const htmlPath = join(process.cwd(), 'index.html');
  const htmlContent = readFileSync(htmlPath, 'utf-8');

  describe('Banner Structure', () => {
    it('should have a banner element in the HTML', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="[^"]*fixed[^"]*"[^>]*>/);
    });

    it('should be positioned at the top of the page', () => {
      expect(htmlContent).toMatch(/fixed top-0/);
    });

    it('should span the full width', () => {
      expect(htmlContent).toMatch(/left-0 right-0/);
    });

    it('should have appropriate z-index for visibility', () => {
      expect(htmlContent).toMatch(/z-\d+/);
    });
  });

  describe('Banner Content', () => {
    it('should display the message about chaoscraft.dev', () => {
      expect(htmlContent).toContain('chaoscraft.dev');
    });

    it('should explain the site can be modified', () => {
      expect(htmlContent).toMatch(/can be modified/i);
    });

    it('should mention participants/participation', () => {
      expect(htmlContent).toMatch(/participat/i);
    });

    it('should have a link to chaoscraft.dev', () => {
      expect(htmlContent).toContain('href="https://chaoscraft.dev"');
    });

    it('should have the link open in a new tab', () => {
      expect(htmlContent).toMatch(/target="_blank"/);
    });

    it('should have proper link accessibility attributes', () => {
      expect(htmlContent).toMatch(/rel="noopener noreferrer"/);
    });
  });

  describe('Banner Styling', () => {
    it('should have background gradient classes', () => {
      expect(htmlContent).toMatch(/bg-gradient-to-r/);
    });

    it('should use appropriate colors (cyan/blue gradient)', () => {
      expect(htmlContent).toMatch(/from-cyan-\d+/);
      expect(htmlContent).toMatch(/to-blue-\d+/);
    });

    it('should have white text for contrast', () => {
      expect(htmlContent).toMatch(/text-white/);
    });

    it('should have appropriate padding', () => {
      expect(htmlContent).toMatch(/py-[2-4]/);
      expect(htmlContent).toMatch(/px-[2-6]/);
    });

    it('should have centered text', () => {
      expect(htmlContent).toMatch(/text-center/);
    });

    it('should have readable font size', () => {
      expect(htmlContent).toMatch(/text-(sm|base)/);
    });

    it('should have shadow for visual separation', () => {
      expect(htmlContent).toMatch(/shadow/);
    });
  });

  describe('Banner Accessibility', () => {
    it('should contain readable text content', () => {
      const bannerMatch = htmlContent.match(/<div[^>]*class="[^"]*fixed top-0[^"]*"[^>]*>(.*?)<\/div>/s);
      expect(bannerMatch).not.toBeNull();
      expect(bannerMatch![1].length).toBeGreaterThan(20);
    });

    it('should use semantic HTML elements', () => {
      const bannerMatch = htmlContent.match(/<div[^>]*class="[^"]*fixed top-0[^"]*"[^>]*>(.*?)<\/div>/s);
      expect(bannerMatch).not.toBeNull();
      expect(bannerMatch![1]).toMatch(/<(p|span|a)/);
    });
  });

  describe('Banner Placement', () => {
    it('should be the first element after opening body tag', () => {
      const bodyMatch = htmlContent.match(/<body[^>]*>(.*?)<\/body>/s);
      expect(bodyMatch).not.toBeNull();
      const bodyContent = bodyMatch![1];
      
      // Get the first non-whitespace content
      const firstContent = bodyContent.trim().split('\n')[0];
      expect(firstContent).toMatch(/<!-- Banner -->|<div[^>]*fixed/);
    });

    it('should not interfere with existing content structure', () => {
      // Verify the main content wrapper still exists
      expect(htmlContent).toMatch(/<div class="text-center relative z-10/);
      
      // Verify the headline still exists
      expect(htmlContent).toContain('Welcome to ChaosCraft');
    });
  });

  describe('Acceptance Criteria Verification', () => {
    it('AC1: Banner is created with appropriate markup/structure', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="[^"]*fixed[^"]*"[^>]*>/);
      expect(htmlContent).toMatch(/fixed top-0 left-0 right-0/);
    });

    it('AC2: Banner displays the message about chaoscraft.dev participation', () => {
      expect(htmlContent).toMatch(/can be modified/i);
      expect(htmlContent).toMatch(/participat/i);
      expect(htmlContent).toContain('chaoscraft.dev');
    });

    it('AC3: Banner is positioned at the top of the page', () => {
      expect(htmlContent).toMatch(/fixed top-0/);
      
      // Verify it's the first element after body
      const bodyMatch = htmlContent.match(/<body[^>]*>(.*?)<\/body>/s);
      expect(bodyMatch).not.toBeNull();
      const bodyContent = bodyMatch![1];
      const firstContent = bodyContent.trim().split('\n')[0];
      expect(firstContent).toMatch(/<!-- Banner -->|<div[^>]*fixed/);
    });

    it('AC4: Banner content is clear and readable', () => {
      expect(htmlContent).toMatch(/text-white/);
      expect(htmlContent).toMatch(/text-center/);
      expect(htmlContent).toMatch(/font-medium/);
    });
  });
});

describe('Banner on Contact Page', () => {
  const htmlPath = join(process.cwd(), 'contact.html');
  const htmlContent = readFileSync(htmlPath, 'utf-8');

  describe('Banner Presence', () => {
    it('should have a banner on the contact page', () => {
      expect(htmlContent).toMatch(/<div[^>]*class="[^"]*fixed top-0[^"]*"[^>]*>/);
    });

    it('should display the chaoscraft.dev message', () => {
      expect(htmlContent).toContain('chaoscraft.dev');
    });

    it('should have the same styling as the main page banner', () => {
      expect(htmlContent).toMatch(/fixed top-0 left-0 right-0/);
      expect(htmlContent).toMatch(/bg-gradient-to-r/);
      expect(htmlContent).toMatch(/text-white/);
    });
  });

  describe('Banner Positioning', () => {
    it('should not overlap contact form', () => {
      // Banner should have appropriate z-index
      expect(htmlContent).toMatch(/z-50/);
      
      // Contact form should have padding to account for banner
      expect(htmlContent).toMatch(/pt-\d+/);
    });
  });
});
