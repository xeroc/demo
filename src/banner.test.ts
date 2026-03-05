import { describe, it, expect, beforeEach, vi } from 'vitest';
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

describe('Story 4: Banner Dismiss Functionality', () => {
  const htmlPath = join(process.cwd(), 'index.html');
  const htmlContent = readFileSync(htmlPath, 'utf-8');

  describe('Close/Dismiss Button', () => {
    it('should have a close button on the banner', () => {
      expect(htmlContent).toMatch(/<button[^>]*id="banner-close-btn"/);
    });

    it('should have an accessible label for the close button', () => {
      expect(htmlContent).toMatch(/aria-label="Dismiss banner"/);
    });

    it('should be positioned on the right side of the banner', () => {
      expect(htmlContent).toMatch(/absolute top-1\/2 right-3/);
    });

    it('should be vertically centered', () => {
      expect(htmlContent).toMatch(/-translate-y-1\/2/);
    });

    it('should have hover styling for visual feedback', () => {
      expect(htmlContent).toMatch(/hover:text-cyan-200/);
    });

    it('should have an SVG icon for the close button', () => {
      expect(htmlContent).toMatch(/<svg[^>]*class="[^"]*w-5 h-5[^"]*"/);
    });
  });

  describe('Dismiss Button Visibility', () => {
    it('should be visible on the banner', () => {
      const bannerMatch = htmlContent.match(/<div[^>]*id="chaoscraft-banner"[^>]*>(.*?)<\/div>\s*<\/div>/s);
      expect(bannerMatch).not.toBeNull();
      expect(bannerMatch![1]).toContain('banner-close-btn');
    });

    it('should have appropriate padding for click target', () => {
      expect(htmlContent).toMatch(/p-1 rounded/);
    });

    it('should use SVG icon with proper stroke', () => {
      expect(htmlContent).toMatch(/stroke="currentColor"/);
      expect(htmlContent).toMatch(/stroke-linecap="round"/);
    });
  });

  describe('JavaScript Dismiss Functionality', () => {
    it('should have JavaScript code for banner dismiss', () => {
      expect(htmlContent).toMatch(/localStorage\.setItem/);
    });

    it('should check localStorage on page load', () => {
      expect(htmlContent).toMatch(/localStorage\.getItem/);
    });

    it('should use a specific key for banner dismissed state', () => {
      expect(htmlContent).toContain('chaoscraft-banner-dismissed');
    });

    it('should hide banner when dismissed', () => {
      expect(htmlContent).toMatch(/banner\.style\.display = 'none'/);
    });

    it('should add click event listener to close button', () => {
      expect(htmlContent).toMatch(/closeBtn\.addEventListener\('click'/);
    });
  });

  describe('Persistence', () => {
    it('should store dismissal state in localStorage', () => {
      expect(htmlContent).toMatch(/localStorage\.setItem\(['"]chaoscraft-banner-dismissed['"], ['"]true['"]\)/);
    });

    it('should check dismissal state on page load', () => {
      expect(htmlContent).toMatch(/localStorage\.getItem\(['"]chaoscraft-banner-dismissed['"]\)/);
    });

    it('should hide banner if previously dismissed', () => {
      expect(htmlContent).toMatch(/if \(localStorage\.getItem\(BANNER_DISMISSED_KEY\) === 'true'\)/);
    });
  });

  describe('Banner ID for JavaScript Targeting', () => {
    it('should have id attribute on banner div', () => {
      expect(htmlContent).toContain('id="chaoscraft-banner"');
    });

    it('should have id attribute on close button', () => {
      expect(htmlContent).toContain('id="banner-close-btn"');
    });
  });

  describe('Acceptance Criteria Verification - Dismiss', () => {
    it('AC1: Close/dismiss button is visible on the banner', () => {
      expect(htmlContent).toMatch(/<button[^>]*id="banner-close-btn"/);
      expect(htmlContent).toMatch(/absolute top-1\/2 right-3/);
    });

    it('AC2: Clicking dismiss hides the banner', () => {
      expect(htmlContent).toMatch(/banner\.style\.display = 'none'/);
    });

    it('AC3: Dismissal state is persisted (localStorage)', () => {
      expect(htmlContent).toMatch(/localStorage\.setItem/);
      expect(htmlContent).toContain('chaoscraft-banner-dismissed');
    });

    it('AC4: Returning users with dismissed state do not see the banner', () => {
      expect(htmlContent).toMatch(/if \(localStorage\.getItem\(BANNER_DISMISSED_KEY\) === 'true'\)/);
      expect(htmlContent).toMatch(/banner\.style\.display = 'none'/);
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

  describe('Dismiss Functionality on Contact Page', () => {
    it('should have dismiss button on contact page banner', () => {
      expect(htmlContent).toMatch(/<button[^>]*id="banner-close-btn"/);
    });

    it('should have localStorage functionality on contact page', () => {
      expect(htmlContent).toContain('chaoscraft-banner-dismissed');
    });

    it('should hide banner on dismiss on contact page', () => {
      expect(htmlContent).toMatch(/banner\.style\.display = 'none'/);
    });
  });
});
