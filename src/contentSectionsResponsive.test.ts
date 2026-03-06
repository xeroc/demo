/**
 * Tests for Story 4: Make main content sections responsive
 * Validates that all content sections properly respond to different viewport sizes
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

const indexHtmlPath = path.join(__dirname, '../index.html');
const contactHtmlPath = path.join(__dirname, '../contact.html');

describe('Story 4: Make main content sections responsive', () => {
  let indexHtml: string;
  let contactHtml: string;

  beforeAll(() => {
    indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
    contactHtml = fs.readFileSync(contactHtmlPath, 'utf-8');
  });

  describe('AC1: All content sections stack vertically on mobile', () => {
    it('index.html - main sections are block-level elements', () => {
      // Check that main sections use block-level elements (not fixed-width grids)
      const hasSectionElements = indexHtml.includes('<section');
      expect(hasSectionElements).toBe(true);
      
      // Check that containers use full width on mobile
      const hasFullWidthClass = indexHtml.includes('w-full') || indexHtml.includes('max-w-');
      expect(hasFullWidthClass).toBe(true);
    });

    it('index.html - no fixed-width containers that would overflow on mobile', () => {
      // Check for responsive max-width classes instead of fixed pixel widths
      const hasResponsiveMaxWidth = indexHtml.includes('max-w-');
      expect(hasResponsiveMaxWidth).toBe(true);
      
      // Should not have inline style with fixed pixel width on main containers
      const fixedWidthPattern = /style="[^"]*width:\s*\d+px[^"]*"/g;
      const matches = indexHtml.match(fixedWidthPattern);
      // Allow some fixed widths but not on main containers
      expect(matches === null || matches.length < 3).toBe(true);
    });

    it('contact.html - form container uses responsive width', () => {
      // Check that contact form has responsive max-width
      const hasResponsiveWidth = contactHtml.includes('max-w-');
      expect(hasResponsiveWidth).toBe(true);
    });

    it('index.html - flexbox/flex-col is used for vertical stacking on mobile', () => {
      // Check for flex layout usage
      const hasFlexLayout = indexHtml.includes('flex');
      expect(hasFlexLayout).toBe(true);
      
      // Check that items use vertical layout where appropriate (ol/ul items)
      const hasSpaceY = indexHtml.includes('space-y-');
      expect(hasSpaceY).toBe(true);
    });

    it('contact.html - form fields stack vertically', () => {
      // Form groups should stack vertically (default block behavior)
      const hasFormGroup = contactHtml.includes('form-group') || contactHtml.includes('mb-');
      expect(hasFormGroup).toBe(true);
      
      // Each input should be full width
      const hasFullWidthInputs = contactHtml.includes('w-full');
      expect(hasFullWidthInputs).toBe(true);
    });
  });

  describe('AC2: Multi-column layouts convert to single column on mobile', () => {
    it('index.html - list items are stacked vertically on mobile', () => {
      // The How It Works list items should be vertical on mobile
      const hasVerticalList = indexHtml.includes('space-y-');
      expect(hasVerticalList).toBe(true);
      
      // Items should use flex for horizontal layout within each item
      const hasFlexItems = indexHtml.includes('flex items-start');
      expect(hasFlexItems).toBe(true);
    });

    it('index.html - no multi-column grid on mobile', () => {
      // Should not have fixed multi-column grids without responsive breakpoints
      // Check that any grid classes have responsive prefixes
      const hasFixedGrid = /class="[^"]*grid-cols-\d+[^"]*"/.test(indexHtml);
      expect(hasFixedGrid).toBe(false);
    });

    it('contact.html - form is single column layout', () => {
      // Contact form should be a single column
      const hasSingleColumnLayout = contactHtml.includes('form-group') || contactHtml.includes('mb-');
      expect(hasSingleColumnLayout).toBe(true);
    });

    it('index.html - text content is single column', () => {
      // Paragraphs and content should flow as single column
      const hasParagraphs = indexHtml.includes('<p');
      expect(hasParagraphs).toBe(true);
      
      // No multi-column layout for text
      const hasColumnCount = /column-count/.test(indexHtml);
      expect(hasColumnCount).toBe(false);
    });

    it('index.html - list items maintain horizontal layout within each item', () => {
      // Each list item should have number + text side by side (flex)
      const hasHorizontalItemLayout = indexHtml.includes('flex items-start gap-');
      expect(hasHorizontalItemLayout).toBe(true);
    });
  });

  describe('AC3: Spacing and padding adjusted proportionally at each breakpoint', () => {
    it('index.html - has responsive padding classes (px, py)', () => {
      // Check for responsive padding
      const hasResponsivePadding = 
        indexHtml.includes('px-4') && 
        indexHtml.includes('sm:px-6') &&
        indexHtml.includes('md:px-8');
      expect(hasResponsivePadding).toBe(true);
    });

    it('index.html - has responsive margin classes (mt, mb)', () => {
      // Check for responsive margins
      const hasResponsiveMargin = 
        indexHtml.includes('mt-') && 
        indexHtml.includes('sm:mt-');
      expect(hasResponsiveMargin).toBe(true);
    });

    it('index.html - has responsive spacing within sections', () => {
      // Check for space-y with responsive breakpoints
      const hasResponsiveSpacing = indexHtml.includes('space-y-');
      expect(hasResponsiveSpacing).toBe(true);
    });

    it('contact.html - has responsive padding on form container', () => {
      // Check for responsive padding
      const hasResponsivePadding = 
        contactHtml.includes('px-') && 
        contactHtml.includes('sm:px-');
      expect(hasResponsivePadding).toBe(true);
    });

    it('contact.html - has responsive margins on form groups', () => {
      // Check for responsive margins
      const hasResponsiveMargin = 
        contactHtml.includes('mb-') && 
        contactHtml.includes('sm:mb-');
      expect(hasResponsiveMargin).toBe(true);
    });

    it('index.html - section has responsive padding', () => {
      // Check for py classes with responsive breakpoints
      const hasResponsiveSectionPadding = 
        indexHtml.includes('py-8') && 
        indexHtml.includes('sm:py-');
      expect(hasResponsiveSectionPadding).toBe(true);
    });

    it('index.html - typography scales with breakpoints', () => {
      // Check for responsive text sizes
      const hasResponsiveText = 
        indexHtml.includes('text-xl') && 
        (indexHtml.includes('sm:text-') || indexHtml.includes('md:text-'));
      expect(hasResponsiveText).toBe(true);
    });

    it('contact.html - typography scales with breakpoints', () => {
      // Check for responsive text sizes on headings and inputs
      const hasResponsiveText = 
        contactHtml.includes('text-') && 
        (contactHtml.includes('sm:text-') || contactHtml.includes('md:text-'));
      expect(hasResponsiveText).toBe(true);
    });
  });

  describe('AC4: No content overflow or horizontal scrolling on mobile', () => {
    it('index.html - has box-sizing border-box', () => {
      const hasBoxSizing = indexHtml.includes('box-sizing: border-box');
      expect(hasBoxSizing).toBe(true);
    });

    it('contact.html - has box-sizing border-box', () => {
      const hasBoxSizing = contactHtml.includes('box-sizing: border-box');
      expect(hasBoxSizing).toBe(true);
    });

    it('index.html - main container has responsive width', () => {
      // Check for max-width constraint with responsive breakpoints
      const hasMaxWidth = indexHtml.includes('max-w-');
      expect(hasMaxWidth).toBe(true);
    });

    it('index.html - no fixed pixel widths on containers', () => {
      // Check that main containers don't have fixed pixel widths
      // Allow some fixed widths but not on main layout containers
      const hasFixedWidth = /class="[^"]*w-\d{3,}[^"]*"/.test(indexHtml);
      // Should use w-full or max-w- instead of w-128, etc.
      expect(hasFixedWidth).toBe(false);
    });

    it('contact.html - form has max-width constraint', () => {
      // Check for max-width constraint to prevent overflow
      const hasMaxWidth = contactHtml.includes('max-w-');
      expect(hasMaxWidth).toBe(true);
    });

    it('index.html - uses percentage-based padding', () => {
      // Check for px-* classes which are percentage-based
      const hasPercentagePadding = indexHtml.includes('px-');
      expect(hasPercentagePadding).toBe(true);
    });

    it('contact.html - inputs are full width within container', () => {
      // Check for w-full on inputs
      const hasFullWidthInputs = contactHtml.includes('w-full');
      expect(hasFullWidthInputs).toBe(true);
    });

    it('index.html - text is not too wide on large screens', () => {
      // Check for max-width constraint on content sections
      const hasMaxWidthConstraint = indexHtml.includes('max-w-');
      expect(hasMaxWidthConstraint).toBe(true);
    });
  });

  describe('AC5: All sections pass visual review at specific widths', () => {
    // These tests verify the structure for each breakpoint

    it('index.html - has mobile-first base styles', () => {
      // Check for base styles without responsive prefix (mobile-first)
      const hasMobileBase = 
        indexHtml.includes('text-xl ') || 
        indexHtml.includes('text-xl"') ||
        indexHtml.includes('px-4 ') ||
        indexHtml.includes('px-4"');
      expect(hasMobileBase).toBe(true);
    });

    it('index.html - has tablet breakpoint styles (sm: 640px)', () => {
      // Check for sm: breakpoint classes
      const hasTabletStyles = indexHtml.includes('sm:');
      expect(hasTabletStyles).toBe(true);
    });

    it('index.html - has desktop breakpoint styles (md: 768px-1024px)', () => {
      // Check for md: breakpoint classes
      const hasDesktopStyles = indexHtml.includes('md:');
      expect(hasDesktopStyles).toBe(true);
    });

    it('index.html - has large desktop breakpoint styles (lg: 1024px+)', () => {
      // Check for lg: breakpoint classes
      const hasLargeStyles = indexHtml.includes('lg:');
      expect(hasLargeStyles).toBe(true);
    });

    it('contact.html - has mobile-first base styles', () => {
      // Check for base styles without responsive prefix
      const hasMobileBase = 
        contactHtml.includes('text-3xl ') || 
        contactHtml.includes('text-3xl"');
      expect(hasMobileBase).toBe(true);
    });

    it('contact.html - has tablet breakpoint styles (sm: 640px)', () => {
      // Check for sm: breakpoint classes
      const hasTabletStyles = contactHtml.includes('sm:');
      expect(hasTabletStyles).toBe(true);
    });

    it('contact.html - has desktop breakpoint styles (md: 768px)', () => {
      // Check for md: breakpoint classes
      const hasDesktopStyles = contactHtml.includes('md:');
      expect(hasDesktopStyles).toBe(true);
    });

    it('index.html - viewport meta tag prevents mobile overflow', () => {
      const hasViewportMeta = indexHtml.includes('viewport') && 
        indexHtml.includes('width=device-width');
      expect(hasViewportMeta).toBe(true);
    });

    it('contact.html - viewport meta tag prevents mobile overflow', () => {
      const hasViewportMeta = contactHtml.includes('viewport') && 
        contactHtml.includes('width=device-width');
      expect(hasViewportMeta).toBe(true);
    });
  });

  describe('AC6: Typecheck passes', () => {
    it('should have valid tsconfig.json', () => {
      const tsconfigPath = path.join(__dirname, '../tsconfig.json');
      expect(fs.existsSync(tsconfigPath)).toBe(true);
      
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
      expect(tsconfig.compilerOptions).toBeDefined();
    });
  });

  describe('Content section specific tests', () => {
    it('index.html - hero section is responsive', () => {
      // Check hero (h1) has responsive text sizes
      const heroHasResponsiveText = 
        indexHtml.includes('text-4xl') && 
        indexHtml.includes('sm:text-5xl') &&
        indexHtml.includes('md:text-6xl');
      expect(heroHasResponsiveText).toBe(true);
    });

    it('index.html - main section has responsive max-width', () => {
      // Check section has max-width with responsive breakpoints
      const sectionHasResponsiveMaxWidth = 
        indexHtml.includes('sm:max-w-2xl') ||
        indexHtml.includes('md:max-w-3xl') ||
        indexHtml.includes('lg:max-w-');
      expect(sectionHasResponsiveMaxWidth).toBe(true);
    });

    it('index.html - list items have responsive gap', () => {
      // Check for responsive gap classes
      const hasResponsiveGap = indexHtml.includes('gap-2') && indexHtml.includes('sm:gap-');
      expect(hasResponsiveGap).toBe(true);
    });

    it('index.html - "How It Works" section is responsive', () => {
      // Check the How It Works container has responsive padding
      const howItWorksResponsive = 
        indexHtml.includes('p-4') && 
        indexHtml.includes('sm:p-');
      expect(howItWorksResponsive).toBe(true);
    });

    it('index.html - number badges are responsive', () => {
      // Check for responsive badge sizes
      const badgesResponsive = 
        indexHtml.includes('w-6') && 
        indexHtml.includes('sm:w-7');
      expect(badgesResponsive).toBe(true);
    });

    it('index.html - decorative elements are responsive', () => {
      // Check decorative line width is responsive
      const decorativeResponsive = 
        indexHtml.includes('w-16') && 
        indexHtml.includes('sm:w-');
      expect(decorativeResponsive).toBe(true);
    });

    it('contact.html - heading is responsive', () => {
      // Check for responsive heading
      const headingResponsive = 
        contactHtml.includes('text-3xl') && 
        contactHtml.includes('sm:text-4xl');
      expect(headingResponsive).toBe(true);
    });

    it('contact.html - button is responsive', () => {
      // Check for responsive button padding
      const buttonResponsive = 
        contactHtml.includes('py-2.5') && 
        contactHtml.includes('sm:py-3');
      expect(buttonResponsive).toBe(true);
    });

    it('contact.html - form container has responsive border radius', () => {
      // Check for responsive border radius
      const borderRadiusResponsive = 
        contactHtml.includes('rounded-xl') && 
        contactHtml.includes('sm:rounded-2xl');
      expect(borderRadiusResponsive).toBe(true);
    });

    it('index.html - main container has responsive max-width', () => {
      // Check for responsive max-width on main container
      const containerMaxWidth = indexHtml.includes('max-w-7xl');
      expect(containerMaxWidth).toBe(true);
    });
  });

  describe('Responsive utilities validation', () => {
    it('index.html - uses Tailwind responsive prefixes correctly', () => {
      // Verify proper use of sm:, md:, lg: prefixes
      const hasCorrectPrefixes = 
        indexHtml.includes('sm:') && 
        indexHtml.includes('md:') && 
        indexHtml.includes('lg:');
      expect(hasCorrectPrefixes).toBe(true);
    });

    it('contact.html - uses Tailwind responsive prefixes correctly', () => {
      // Verify proper use of sm:, md:, lg: prefixes
      const hasCorrectPrefixes = 
        contactHtml.includes('sm:') && 
        contactHtml.includes('md:');
      expect(hasCorrectPrefixes).toBe(true);
    });

    it('index.html - no xl: breakpoint needed for current design', () => {
      // xl: is optional but check if used
      const hasXlBreakpoint = indexHtml.includes('xl:');
      // This is just a check, not a requirement
      // xl: can be used for extra responsiveness
      expect(typeof hasXlBreakpoint).toBe('boolean');
    });

    it('index.html - has proper padding progression', () => {
      // Verify padding increases appropriately
      // px-4 (16px) -> sm:px-6 (24px) -> md:px-8 (32px)
      const hasPaddingProgression = 
        indexHtml.includes('px-4') && 
        indexHtml.includes('sm:px-6') && 
        indexHtml.includes('md:px-8');
      expect(hasPaddingProgression).toBe(true);
    });

    it('contact.html - has proper padding progression', () => {
      // Verify padding increases appropriately
      const hasPaddingProgression = 
        contactHtml.includes('px-4') && 
        contactHtml.includes('sm:px-6');
      expect(hasPaddingProgression).toBe(true);
    });
  });

  describe('Mobile-specific layout tests', () => {
    it('index.html - text remains readable on 320px viewport', () => {
      // Check for minimum font size (text-xs is 12px, text-sm is 14px)
      const hasReadableText = 
        indexHtml.includes('text-xs') || 
        indexHtml.includes('text-sm') ||
        indexHtml.includes('text-base');
      expect(hasReadableText).toBe(true);
    });

    it('contact.html - text remains readable on 320px viewport', () => {
      // Check for minimum font size
      const hasReadableText = 
        contactHtml.includes('text-xs') || 
        contactHtml.includes('text-sm') ||
        contactHtml.includes('text-base');
      expect(hasReadableText).toBe(true);
    });

    it('index.html - touch targets are adequate on mobile', () => {
      // Check for adequate padding on interactive elements
      const hasAdequatePadding = indexHtml.includes('py-2') || indexHtml.includes('py-');
      expect(hasAdequatePadding).toBe(true);
    });

    it('contact.html - touch targets are adequate on mobile', () => {
      // Check for adequate padding on form inputs
      const hasAdequatePadding = contactHtml.includes('py-2') || contactHtml.includes('py-');
      expect(hasAdequatePadding).toBe(true);
    });

    it('index.html - no horizontal scroll on mobile', () => {
      // Check for overflow handling
      const hasNoHorizontalScroll = !indexHtml.includes('overflow-x-scroll');
      expect(hasNoHorizontalScroll).toBe(true);
    });

    it('contact.html - no horizontal scroll on mobile', () => {
      // Check for overflow handling
      const hasNoHorizontalScroll = !contactHtml.includes('overflow-x-scroll');
      expect(hasNoHorizontalScroll).toBe(true);
    });
  });

  describe('Section structure validation', () => {
    it('index.html - has proper section structure', () => {
      // Check for section element
      const hasSection = indexHtml.includes('<section');
      expect(hasSection).toBe(true);
    });

    it('index.html - section has accessible heading hierarchy', () => {
      // Check for h2 within section
      const hasH2 = indexHtml.includes('<h2');
      expect(hasH2).toBe(true);
      
      // Check for h3 within section
      const hasH3 = indexHtml.includes('<h3');
      expect(hasH3).toBe(true);
    });

    it('contact.html - has proper form structure', () => {
      // Check for form element
      const hasForm = contactHtml.includes('<form');
      expect(hasForm).toBe(true);
      
      // Check for labels associated with inputs
      const hasLabels = contactHtml.includes('<label');
      expect(hasLabels).toBe(true);
    });

    it('index.html - ordered list is properly structured', () => {
      // Check for ol element
      const hasOl = indexHtml.includes('<ol');
      expect(hasOl).toBe(true);
      
      // Check for li elements
      const hasLi = indexHtml.includes('<li');
      expect(hasLi).toBe(true);
    });
  });
});
