/**
 * Tests for Story: Compact and condense subtitle text
 * 
 * This test verifies that the subtitle text in index.html has been
 * condensed while preserving the core message.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Subtitle Text Compaction', () => {
    it('should have subtitle text that is shorter than original', () => {
        const htmlPath = join(process.cwd(), 'index.html');
        const htmlContent = readFileSync(htmlPath, 'utf-8');
        
        // Extract the subtitle paragraph
        const subtitleMatch = htmlContent.match(/<p class="mt-4 text-xl text-white\/80">\s*(.*?)\s*<\/p>/s);
        expect(subtitleMatch).not.toBeNull();
        
        const subtitleText = subtitleMatch![1].trim();
        
        // Original text: "Welcome to ChaosCraft Demo" (27 characters)
        // New text should be shorter
        expect(subtitleText.length).toBeLessThan(27);
        
        // New text should be "ChaosCraft Demo" (15 characters)
        expect(subtitleText).toBe('ChaosCraft Demo');
    });

    it('should preserve core message in subtitle', () => {
        const htmlPath = join(process.cwd(), 'index.html');
        const htmlContent = readFileSync(htmlPath, 'utf-8');
        
        const subtitleMatch = htmlContent.match(/<p class="mt-4 text-xl text-white\/80">\s*(.*?)\s*<\/p>/s);
        expect(subtitleMatch).not.toBeNull();
        
        const subtitleText = subtitleMatch![1].trim();
        
        // Should contain "ChaosCraft" and "Demo" to preserve the brand and context
        expect(subtitleText).toContain('ChaosCraft');
        expect(subtitleText).toContain('Demo');
    });

    it('should have valid HTML structure after subtitle change', () => {
        const htmlPath = join(process.cwd(), 'index.html');
        const htmlContent = readFileSync(htmlPath, 'utf-8');
        
        // Check for basic HTML structure
        expect(htmlContent).toContain('<!DOCTYPE html>');
        expect(htmlContent).toContain('<html lang="en">');
        expect(htmlContent).toContain('<head>');
        expect(htmlContent).toContain('<body');
        expect(htmlContent).toContain('</body>');
        expect(htmlContent).toContain('</html>');
        
        // Verify subtitle paragraph exists with correct classes
        expect(htmlContent).toMatch(/<p class="mt-4 text-xl text-white\/80">.*?<\/p>/s);
    });

    it('should not have "Welcome to" in subtitle', () => {
        const htmlPath = join(process.cwd(), 'index.html');
        const htmlContent = readFileSync(htmlPath, 'utf-8');
        
        const subtitleMatch = htmlContent.match(/<p class="mt-4 text-xl text-white\/80">\s*(.*?)\s*<\/p>/s);
        expect(subtitleMatch).not.toBeNull();
        
        const subtitleText = subtitleMatch![1].trim();
        
        // Should not contain "Welcome to" anymore
        expect(subtitleText).not.toContain('Welcome to');
    });

    it('should accept all acceptance criteria', () => {
        const htmlPath = join(process.cwd(), 'index.html');
        const htmlContent = readFileSync(htmlPath, 'utf-8');
        
        const subtitleMatch = htmlContent.match(/<p class="mt-4 text-xl text-white\/80">\s*(.*?)\s*<\/p>/s);
        expect(subtitleMatch).not.toBeNull();
        
        const subtitleText = subtitleMatch![1].trim();
        
        // AC1: Subtitle text is visibly shorter than before
        expect(subtitleText.length).toBeLessThan(27);
        
        // AC2: Subtitle text preserves the core message and intent
        expect(subtitleText).toContain('ChaosCraft');
        expect(subtitleText).toContain('Demo');
        
        // AC3: HTML file loads without errors (implicit in test passing)
        // AC4: Typecheck passes (verified separately by build process)
    });
});
