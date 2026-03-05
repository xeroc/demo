import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Story: Update first headline styling and text content', () => {
  const htmlPath = join(process.cwd(), 'index.html');
  const htmlContent = readFileSync(htmlPath, 'utf-8');

  describe('Text Content Changes', () => {
    it('should display "Welcome to ChaosCraft" as the headline text', () => {
      expect(htmlContent).toContain('Welcome to ChaosCraft');
    });

    it('should have the text in the first H1 element', () => {
      const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/s);
      expect(h1Match).not.toBeNull();
      expect(h1Match![1]).toContain('Welcome to ChaosCraft');
    });

    it('should replace the original "Hello World" text', () => {
      const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/s);
      expect(h1Match).not.toBeNull();
      const h1Content = h1Match![1].trim();
      expect(h1Content).toBe('Welcome to ChaosCraft');
    });
  });

  describe('CSS Styling Changes', () => {
    it('should have margin classes on the first headline', () => {
      const h1Match = htmlContent.match(/<h1[^>]*class="([^"]*)"/);
      expect(h1Match).not.toBeNull();
      const classes = h1Match![1];
      expect(classes).toMatch(/mb-\d+/);
    });

    it('should have extra margin applied (mb-6 or higher)', () => {
      const h1Match = htmlContent.match(/<h1[^>]*class="([^"]*)"/);
      expect(h1Match).not.toBeNull();
      const classes = h1Match![1];
      
      // Check for margin-bottom class
      const marginMatch = classes.match(/mb-(\d+)/);
      expect(marginMatch).not.toBeNull();
      
      const marginValue = parseInt(marginMatch![1]);
      expect(marginValue).toBeGreaterThanOrEqual(6);
    });

    it('should preserve existing styling classes', () => {
      const h1Match = htmlContent.match(/<h1[^>]*class="([^"]*)"/);
      expect(h1Match).not.toBeNull();
      const classes = h1Match![1];
      
      // Verify essential styling is maintained
      expect(classes).toContain('text-6xl');
      expect(classes).toContain('font-bold');
      expect(classes).toContain('text-white');
    });
  });

  describe('HTML Structure Validation', () => {
    it('should have valid HTML structure', () => {
      expect(htmlContent).toContain('<!DOCTYPE html>');
      expect(htmlContent).toContain('<html');
      expect(htmlContent).toContain('</html>');
    });

    it('should load without syntax errors', () => {
      // Basic validation that the HTML is well-formed
      expect(htmlContent).toMatch(/<h1[^>]*>.*?<\/h1>/s);
      expect(htmlContent).toMatch(/<body[^>]*>.*?<\/body>/s);
    });

    it('should have exactly one H1 element as the main headline', () => {
      const h1Matches = htmlContent.match(/<h1/g);
      expect(h1Matches).toHaveLength(1);
    });
  });

  describe('Acceptance Criteria Verification', () => {
    it('AC1: The first headline element has additional margin applied (visibly more spacing)', () => {
      const h1Match = htmlContent.match(/<h1[^>]*class="([^"]*)"/);
      expect(h1Match).not.toBeNull();
      const classes = h1Match![1];
      
      // Verify margin class exists
      expect(classes).toMatch(/mb-\d+/);
      
      // Verify margin is significant (6 or higher)
      const marginMatch = classes.match(/mb-(\d+)/);
      expect(marginMatch).not.toBeNull();
      const marginValue = parseInt(marginMatch![1]);
      expect(marginValue).toBeGreaterThanOrEqual(6);
    });

    it('AC2: The first headline displays the text "Welcome to ChaosCraft"', () => {
      const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/s);
      expect(h1Match).not.toBeNull();
      const h1Content = h1Match![1].trim();
      expect(h1Content).toBe('Welcome to ChaosCraft');
    });

    it('AC3: CSS changes are in the appropriate stylesheet file or inline styles', () => {
      // Verify that margin classes are in the H1 element's class attribute
      const h1Match = htmlContent.match(/<h1[^>]*class="([^"]*)"/);
      expect(h1Match).not.toBeNull();
      const classes = h1Match![1];
      expect(classes).toMatch(/mb-\d+/);
    });

    it('AC4: Text change is in the appropriate HTML/template file', () => {
      // Verify the text is in index.html
      expect(htmlContent).toContain('Welcome to ChaosCraft');
      
      // Verify it's in the H1 element specifically
      const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/s);
      expect(h1Match).not.toBeNull();
      expect(h1Match![1]).toContain('Welcome to ChaosCraft');
    });
  });
});
