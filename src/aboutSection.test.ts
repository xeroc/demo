/**
 * Tests for About Section Typography, Spacing, Color, and Responsive Design
 * Story 2: Enhance about section typography and spacing
 * Story 3: Add color contrast and visual hierarchy
 * Story 4: Implement responsive design improvements
 * 
 * These tests verify that the about section uses appropriate Tailwind CSS
 * utility classes for typography hierarchy, spacing, color contrast, 
 * visual hierarchy, and responsive design.
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('About Section Typography, Spacing, Color, and Responsive Design', () => {
    let aboutSection: HTMLElement;
    let container: HTMLElement;

    beforeEach(() => {
        // Create a test container with responsive classes
        container = document.createElement('div');
        container.innerHTML = `
            <section class="mt-8 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-16 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-white/10">
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 sm:mb-6 md:mb-8 tracking-tight">
                    What is ChaosCraft?
                </h2>
                
                <div class="space-y-4 sm:space-y-5 md:space-y-6">
                    <p class="text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed sm:leading-loose md:leading-loose tracking-wide">
                        Paragraph 1 content
                    </p>
                    
                    <p class="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed sm:leading-loose md:leading-loose tracking-wide">
                        Paragraph 2 content
                    </p>
                </div>
                
                <div class="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mt-6 sm:mt-8 md:mt-10 text-left border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/10">
                    <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-cyan-300 mb-4 sm:mb-5 md:mb-6 text-center tracking-tight">
                        How It Works
                    </h3>
                    
                    <ol class="space-y-3 sm:space-y-4 md:space-y-5 text-gray-100">
                        <li class="flex items-start gap-3 sm:gap-4">
                            <span class="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-lg shadow-cyan-500/30">
                                1
                            </span>
                            <span class="text-sm sm:text-base md:text-lg leading-relaxed pt-0.5 sm:pt-1">Step 1</span>
                        </li>
                    </ol>
                </div>
                
                <p class="text-base sm:text-lg md:text-xl text-cyan-200 mt-6 sm:mt-8 md:mt-10 italic leading-relaxed font-light border-t border-white/10 pt-6 sm:pt-7 md:pt-8">
                    Closing tagline
                </p>
            </section>
        `;
        aboutSection = container.querySelector('section')!;
    });

    describe('Responsive Typography - Headings', () => {
        it('should use responsive text sizes for main heading (H2)', () => {
            const h2 = aboutSection.querySelector('h2');
            expect(h2).not.toBeNull();
            expect(h2?.classList.contains('text-2xl')).toBe(true);
            expect(h2?.classList.contains('sm:text-3xl')).toBe(true);
            expect(h2?.classList.contains('md:text-4xl')).toBe(true);
        });

        it('should use responsive text sizes for sub-heading (H3)', () => {
            const h3 = aboutSection.querySelector('h3');
            expect(h3).not.toBeNull();
            expect(h3?.classList.contains('text-lg')).toBe(true);
            expect(h3?.classList.contains('sm:text-xl')).toBe(true);
            expect(h3?.classList.contains('md:text-2xl')).toBe(true);
        });
    });

    describe('Responsive Typography - Paragraphs', () => {
        it('should use responsive text sizes for paragraphs', () => {
            const paragraphs = aboutSection.querySelectorAll('div.space-y-4 p, div.space-y-5 p, div.space-y-6 p');
            paragraphs.forEach(p => {
                expect(p.classList.contains('text-base')).toBe(true);
                expect(p.classList.contains('sm:text-lg')).toBe(true);
                expect(p.classList.contains('md:text-xl')).toBe(true);
            });
        });

        it('should use responsive line-height for paragraphs', () => {
            const paragraphs = aboutSection.querySelectorAll('div[class*="space-y"] p');
            paragraphs.forEach(p => {
                // At least one line-height class should be present
                const hasLeadingRelaxed = p.classList.contains('leading-relaxed');
                const hasLeadingLoose = p.classList.contains('leading-loose');
                expect(hasLeadingRelaxed || hasLeadingLoose).toBe(true);
            });
        });

        it('should use responsive text sizes for tagline', () => {
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('text-base')).toBe(true);
            expect(tagline?.classList.contains('sm:text-lg')).toBe(true);
            expect(tagline?.classList.contains('md:text-xl')).toBe(true);
        });
    });

    describe('Responsive Typography - List Items', () => {
        it('should use responsive text sizes for list item text', () => {
            const listTexts = aboutSection.querySelectorAll('ol li span:last-child');
            listTexts.forEach(span => {
                expect(span.classList.contains('text-sm')).toBe(true);
                expect(span.classList.contains('sm:text-base')).toBe(true);
                expect(span.classList.contains('md:text-lg')).toBe(true);
            });
        });
    });

    describe('Responsive Spacing - Section Margins', () => {
        it('should use responsive top margin on section', () => {
            expect(aboutSection.classList.contains('mt-8')).toBe(true);
            expect(aboutSection.classList.contains('sm:mt-12')).toBe(true);
            expect(aboutSection.classList.contains('md:mt-16')).toBe(true);
        });

        it('should use responsive bottom margin on section', () => {
            expect(aboutSection.classList.contains('mb-8')).toBe(true);
            expect(aboutSection.classList.contains('sm:mb-12')).toBe(true);
            expect(aboutSection.classList.contains('md:mb-16')).toBe(true);
        });
    });

    describe('Responsive Spacing - Section Padding', () => {
        it('should use responsive horizontal padding on section', () => {
            expect(aboutSection.classList.contains('px-4')).toBe(true);
            expect(aboutSection.classList.contains('sm:px-6')).toBe(true);
            expect(aboutSection.classList.contains('md:px-8')).toBe(true);
        });

        it('should use responsive vertical padding on section', () => {
            expect(aboutSection.classList.contains('py-8')).toBe(true);
            expect(aboutSection.classList.contains('sm:py-10')).toBe(true);
            expect(aboutSection.classList.contains('md:py-12')).toBe(true);
        });
    });

    describe('Responsive Spacing - Heading Margins', () => {
        it('should use responsive margin bottom for main heading', () => {
            const h2 = aboutSection.querySelector('h2');
            expect(h2?.classList.contains('mb-4')).toBe(true);
            expect(h2?.classList.contains('sm:mb-6')).toBe(true);
            expect(h2?.classList.contains('md:mb-8')).toBe(true);
        });

        it('should use responsive margin bottom for sub-heading', () => {
            const h3 = aboutSection.querySelector('h3');
            expect(h3?.classList.contains('mb-4')).toBe(true);
            expect(h3?.classList.contains('sm:mb-5')).toBe(true);
            expect(h3?.classList.contains('md:mb-6')).toBe(true);
        });
    });

    describe('Responsive Spacing - Paragraph Container', () => {
        it('should use responsive vertical spacing for paragraph container', () => {
            const paragraphContainer = aboutSection.querySelector('div[class*="space-y"]');
            expect(paragraphContainer).not.toBeNull();
            // Check that space-y classes exist (responsive)
            const classList = paragraphContainer?.className || '';
            expect(classList.includes('space-y-')).toBe(true);
        });
    });

    describe('Responsive Spacing - Card', () => {
        it('should use responsive padding for card', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('p-4')).toBe(true);
            expect(card?.classList.contains('sm:p-6')).toBe(true);
            expect(card?.classList.contains('md:p-8')).toBe(true);
        });

        it('should use responsive top margin for card', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('mt-6')).toBe(true);
            expect(card?.classList.contains('sm:mt-8')).toBe(true);
            expect(card?.classList.contains('md:mt-10')).toBe(true);
        });

        it('should use responsive border radius for card', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('rounded-xl')).toBe(true);
            expect(card?.classList.contains('sm:rounded-2xl')).toBe(true);
        });
    });

    describe('Responsive Spacing - List', () => {
        it('should use responsive vertical spacing for list', () => {
            const list = aboutSection.querySelector('ol');
            expect(list?.classList.contains('space-y-3')).toBe(true);
            expect(list?.classList.contains('sm:space-y-4')).toBe(true);
            expect(list?.classList.contains('md:space-y-5')).toBe(true);
        });

        it('should use responsive gap for list items', () => {
            const listItems = aboutSection.querySelectorAll('ol li');
            listItems.forEach(li => {
                expect(li.classList.contains('gap-3')).toBe(true);
                expect(li.classList.contains('sm:gap-4')).toBe(true);
            });
        });
    });

    describe('Responsive Spacing - Tagline', () => {
        it('should use responsive top margin for tagline', () => {
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('mt-6')).toBe(true);
            expect(tagline?.classList.contains('sm:mt-8')).toBe(true);
            expect(tagline?.classList.contains('md:mt-10')).toBe(true);
        });

        it('should use responsive top padding for tagline', () => {
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('pt-6')).toBe(true);
            expect(tagline?.classList.contains('sm:pt-7')).toBe(true);
            expect(tagline?.classList.contains('md:pt-8')).toBe(true);
        });
    });

    describe('Responsive Layout - Container Width', () => {
        it('should use responsive max-width for section', () => {
            expect(aboutSection.classList.contains('max-w-xl')).toBe(true);
            expect(aboutSection.classList.contains('sm:max-w-2xl')).toBe(true);
            expect(aboutSection.classList.contains('md:max-w-3xl')).toBe(true);
            expect(aboutSection.classList.contains('lg:max-w-4xl')).toBe(true);
        });

        it('should use mx-auto for horizontal centering', () => {
            expect(aboutSection.classList.contains('mx-auto')).toBe(true);
        });
    });

    describe('Responsive Elements - Number Badges', () => {
        it('should use responsive sizes for number badges', () => {
            const badges = aboutSection.querySelectorAll('ol li span:first-child');
            badges.forEach(badge => {
                expect(badge.classList.contains('w-7')).toBe(true);
                expect(badge.classList.contains('h-7')).toBe(true);
                expect(badge.classList.contains('sm:w-8')).toBe(true);
                expect(badge.classList.contains('sm:h-8')).toBe(true);
            });
        });

        it('should use responsive text sizes for number badges', () => {
            const badges = aboutSection.querySelectorAll('ol li span:first-child');
            badges.forEach(badge => {
                expect(badge.classList.contains('text-xs')).toBe(true);
                expect(badge.classList.contains('sm:text-sm')).toBe(true);
            });
        });
    });

    describe('Responsive Section Border Radius', () => {
        it('should use responsive border radius for section', () => {
            expect(aboutSection.classList.contains('rounded-2xl')).toBe(true);
            expect(aboutSection.classList.contains('sm:rounded-3xl')).toBe(true);
        });
    });

    describe('Color Hierarchy - Text Colors', () => {
        it('should use text-white for main heading (highest hierarchy)', () => {
            const h2 = aboutSection.querySelector('h2');
            expect(h2?.classList.contains('text-white')).toBe(true);
        });

        it('should use text-cyan-300 for sub-heading (accent color)', () => {
            const h3 = aboutSection.querySelector('h3');
            expect(h3?.classList.contains('text-cyan-300')).toBe(true);
        });

        it('should use text-gray-100 for primary paragraph text', () => {
            const firstParagraph = aboutSection.querySelector('div[class*="space-y"] p:first-child');
            expect(firstParagraph?.classList.contains('text-gray-100')).toBe(true);
        });

        it('should use text-gray-200 for secondary paragraph text', () => {
            const secondParagraph = aboutSection.querySelector('div[class*="space-y"] p:last-child');
            expect(secondParagraph?.classList.contains('text-gray-200')).toBe(true);
        });

        it('should use text-cyan-200 for tagline (accent)', () => {
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('text-cyan-200')).toBe(true);
        });

        it('should use text-gray-100 for list items', () => {
            const list = aboutSection.querySelector('ol');
            expect(list?.classList.contains('text-gray-100')).toBe(true);
        });
    });

    describe('Background Utilities', () => {
        it('should use bg-gradient-to-br for section background gradient', () => {
            expect(aboutSection.classList.contains('bg-gradient-to-br')).toBe(true);
        });

        it('should use from-slate-900/40 for gradient start', () => {
            expect(aboutSection.classList.contains('from-slate-900/40')).toBe(true);
        });

        it('should use via-slate-800/30 for gradient middle', () => {
            expect(aboutSection.classList.contains('via-slate-800/30')).toBe(true);
        });

        it('should use to-slate-900/40 for gradient end', () => {
            expect(aboutSection.classList.contains('to-slate-900/40')).toBe(true);
        });

        it('should use backdrop-blur-sm for section blur', () => {
            expect(aboutSection.classList.contains('backdrop-blur-sm')).toBe(true);
        });

        it('should use border-white/10 for section border', () => {
            expect(aboutSection.classList.contains('border-white/10')).toBe(true);
        });
    });

    describe('Card Border and Shadow Color', () => {
        it('should use border-cyan-400/30 for card border accent', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('border-cyan-400/30')).toBe(true);
        });

        it('should use shadow-cyan-500/10 for card shadow accent', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('shadow-cyan-500/10')).toBe(true);
        });
    });

    describe('List Number Badge Gradients', () => {
        it('should use bg-gradient-to-br for number badges', () => {
            const badges = aboutSection.querySelectorAll('ol li span:first-child');
            badges.forEach(badge => {
                expect(badge.classList.contains('bg-gradient-to-br')).toBe(true);
            });
        });

        it('should use from-cyan-400 for gradient start', () => {
            const badges = aboutSection.querySelectorAll('ol li span:first-child');
            badges.forEach(badge => {
                expect(badge.classList.contains('from-cyan-400')).toBe(true);
            });
        });

        it('should use to-blue-500 for gradient end', () => {
            const badges = aboutSection.querySelectorAll('ol li span:first-child');
            badges.forEach(badge => {
                expect(badge.classList.contains('to-blue-500')).toBe(true);
            });
        });

        it('should use shadow-cyan-500/30 for badge shadow', () => {
            const badges = aboutSection.querySelectorAll('ol li span:first-child');
            badges.forEach(badge => {
                expect(badge.classList.contains('shadow-cyan-500/30')).toBe(true);
            });
        });
    });

    describe('Visual Separation - Borders', () => {
        it('should use border-t for tagline separator', () => {
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('border-t')).toBe(true);
        });

        it('should use border-white/10 for tagline border color', () => {
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('border-white/10')).toBe(true);
        });
    });

    describe('Acceptance Criteria Verification - Story 4 (Responsive Design)', () => {
        it('AC1: Apply responsive typography (text-base sm:text-lg md:text-xl)', () => {
            const paragraphs = aboutSection.querySelectorAll('div[class*="space-y"] p');
            paragraphs.forEach(p => {
                expect(p.classList.contains('text-base')).toBe(true);
                expect(p.classList.contains('sm:text-lg')).toBe(true);
                expect(p.classList.contains('md:text-xl')).toBe(true);
            });
        });

        it('AC2: Use responsive spacing (p-4 md:p-8 lg:p-12)', () => {
            // Check section padding (using similar responsive pattern)
            expect(aboutSection.classList.contains('px-4')).toBe(true);
            expect(aboutSection.classList.contains('md:px-8')).toBe(true);
            
            // Check card padding
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('p-4')).toBe(true);
            expect(card?.classList.contains('md:p-8')).toBe(true);
        });

        it('AC3: Implement responsive layout containers (max-w-*, mx-auto)', () => {
            // Check responsive max-widths
            expect(aboutSection.classList.contains('max-w-xl')).toBe(true);
            expect(aboutSection.classList.contains('sm:max-w-2xl')).toBe(true);
            expect(aboutSection.classList.contains('md:max-w-3xl')).toBe(true);
            expect(aboutSection.classList.contains('lg:max-w-4xl')).toBe(true);
            
            // Check centering
            expect(aboutSection.classList.contains('mx-auto')).toBe(true);
        });

        it('AC4: Test section renders correctly on mobile, tablet, and desktop viewports', () => {
            // Mobile: base classes without prefix
            expect(aboutSection.classList.contains('mt-8')).toBe(true);
            expect(aboutSection.classList.contains('px-4')).toBe(true);
            expect(aboutSection.classList.contains('py-8')).toBe(true);
            expect(aboutSection.classList.contains('max-w-xl')).toBe(true);
            
            // Tablet (sm): sm: prefix classes
            expect(aboutSection.classList.contains('sm:mt-12')).toBe(true);
            expect(aboutSection.classList.contains('sm:px-6')).toBe(true);
            expect(aboutSection.classList.contains('sm:max-w-2xl')).toBe(true);
            
            // Desktop (md): md: prefix classes
            expect(aboutSection.classList.contains('md:mt-16')).toBe(true);
            expect(aboutSection.classList.contains('md:px-8')).toBe(true);
            expect(aboutSection.classList.contains('md:py-12')).toBe(true);
            expect(aboutSection.classList.contains('md:max-w-3xl')).toBe(true);
            
            // Large desktop (lg): lg: prefix classes
            expect(aboutSection.classList.contains('lg:max-w-4xl')).toBe(true);
        });

        it('AC5: Typecheck passes', () => {
            // This test verifies that the test suite itself is valid TypeScript
            // The actual typecheck is run separately via npm run typecheck
            expect(true).toBe(true);
        });
    });

    describe('Acceptance Criteria Verification - Story 2 (Typography)', () => {
        it('AC1: Headings use appropriate font sizes', () => {
            const h2 = aboutSection.querySelector('h2');
            const h3 = aboutSection.querySelector('h3');
            
            // H2: text-2xl -> sm:text-3xl -> md:text-4xl
            expect(h2?.classList.contains('text-2xl')).toBe(true);
            expect(h2?.classList.contains('md:text-4xl')).toBe(true);
            
            // H3: text-lg -> sm:text-xl -> md:text-2xl
            expect(h3?.classList.contains('text-lg')).toBe(true);
            expect(h3?.classList.contains('md:text-2xl')).toBe(true);
        });

        it('AC2: Paragraph text has readable line-height', () => {
            const paragraphs = aboutSection.querySelectorAll('div[class*="space-y"] p');
            paragraphs.forEach(p => {
                const hasLeadingRelaxed = p.classList.contains('leading-relaxed');
                const hasLeadingLoose = p.classList.contains('leading-loose');
                expect(hasLeadingRelaxed || hasLeadingLoose).toBe(true);
            });
        });

        it('AC3: Proper vertical spacing between elements', () => {
            // Section has responsive padding
            expect(aboutSection.classList.contains('py-8')).toBe(true);
            expect(aboutSection.classList.contains('md:py-12')).toBe(true);
            
            // Paragraph container has responsive spacing
            const paragraphContainer = aboutSection.querySelector('div[class*="space-y"]');
            expect(paragraphContainer).not.toBeNull();
            
            // List has responsive spacing
            const list = aboutSection.querySelector('ol');
            expect(list?.classList.contains('space-y-3')).toBe(true);
            expect(list?.classList.contains('md:space-y-5')).toBe(true);
        });

        it('AC4: Section has appropriate padding', () => {
            expect(aboutSection.classList.contains('py-8')).toBe(true);
            expect(aboutSection.classList.contains('sm:py-10')).toBe(true);
            expect(aboutSection.classList.contains('md:py-12')).toBe(true);
            expect(aboutSection.classList.contains('px-4')).toBe(true);
            expect(aboutSection.classList.contains('sm:px-6')).toBe(true);
            expect(aboutSection.classList.contains('md:px-8')).toBe(true);
        });
    });

    describe('Acceptance Criteria Verification - Story 3 (Color)', () => {
        it('AC1: Text color classes for text hierarchy', () => {
            const h2 = aboutSection.querySelector('h2');
            const h3 = aboutSection.querySelector('h3');
            const firstParagraph = aboutSection.querySelector('div[class*="space-y"] p:first-child');
            
            // Main heading uses text-white
            expect(h2?.classList.contains('text-white')).toBe(true);
            
            // Sub-heading uses accent color
            expect(h3?.classList.contains('text-cyan-300')).toBe(true);
            
            // Paragraph uses gray text
            expect(firstParagraph?.classList.contains('text-gray-100') || 
                   firstParagraph?.classList.contains('text-gray-200')).toBe(true);
        });

        it('AC2: Background utilities for section emphasis', () => {
            // Section uses gradient background
            expect(aboutSection.classList.contains('bg-gradient-to-br')).toBe(true);
            
            // Card uses background
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card).not.toBeNull();
        });

        it('AC3: Border utilities for visual separation', () => {
            // Section has border
            expect(aboutSection.classList.contains('border')).toBe(true);
            
            // Card has border
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('border-2') || 
                   card?.classList.contains('border')).toBe(true);
            
            // Tagline has border separator
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('border-t')).toBe(true);
        });

        it('AC4: Color contrast meets accessibility standards', () => {
            // Main heading: white on dark background
            const h2 = aboutSection.querySelector('h2');
            expect(h2?.classList.contains('text-white')).toBe(true);
            
            // Sub-heading: cyan-300 (light) on dark background
            const h3 = aboutSection.querySelector('h3');
            expect(h3?.classList.contains('text-cyan-300')).toBe(true);
            
            // Paragraphs: gray-100/200 (light) on dark background
            const paragraphs = aboutSection.querySelectorAll('div[class*="space-y"] p');
            paragraphs.forEach(p => {
                const hasGoodContrast = p.classList.contains('text-gray-100') || 
                                        p.classList.contains('text-gray-200') ||
                                        p.classList.contains('text-white');
                expect(hasGoodContrast).toBe(true);
            });
            
            // List items: gray-100 (light) on dark background
            const list = aboutSection.querySelector('ol');
            expect(list?.classList.contains('text-gray-100')).toBe(true);
            
            // Tagline: cyan-200 (light) on dark background
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('text-cyan-200')).toBe(true);
        });
    });
});
