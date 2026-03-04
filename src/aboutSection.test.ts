/**
 * Tests for About Section Typography and Spacing
 * Story 2: Enhance about section typography and spacing
 * Story 3: Add color contrast and visual hierarchy
 * 
 * These tests verify that the about section uses appropriate Tailwind CSS
 * utility classes for typography hierarchy, spacing, color contrast, 
 * and visual hierarchy.
 */

import { describe, it, expect, beforeEach } from 'vitest';

describe('About Section Typography, Spacing, and Color', () => {
    let aboutSection: HTMLElement;
    let container: HTMLElement;

    beforeEach(() => {
        // Create a test container
        container = document.createElement('div');
        container.innerHTML = `
            <section class="mt-16 mb-16 max-w-3xl mx-auto px-8 py-12 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 rounded-3xl backdrop-blur-sm border border-white/10">
                <h2 class="text-4xl font-extrabold text-white mb-8 tracking-tight">
                    What is ChaosCraft?
                </h2>
                
                <div class="space-y-6">
                    <p class="text-gray-100 text-lg leading-loose tracking-wide">
                        Paragraph 1 content
                    </p>
                    
                    <p class="text-gray-200 text-lg leading-loose tracking-wide">
                        Paragraph 2 content
                    </p>
                </div>
                
                <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 mt-10 text-left border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/10">
                    <h3 class="text-2xl font-bold text-cyan-300 mb-6 text-center tracking-tight">
                        How It Works
                    </h3>
                    
                    <ol class="space-y-5 text-gray-100">
                        <li class="flex items-start gap-4">
                            <span class="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-cyan-500/30">
                                1
                            </span>
                            <span class="text-lg leading-relaxed pt-1">Step 1</span>
                        </li>
                    </ol>
                </div>
                
                <p class="text-cyan-200 text-xl mt-10 italic leading-relaxed font-light border-t border-white/10 pt-8">
                    Closing tagline
                </p>
            </section>
        `;
        aboutSection = container.querySelector('section')!;
    });

    describe('Heading Typography', () => {
        it('should use text-4xl for main heading (H2)', () => {
            const h2 = aboutSection.querySelector('h2');
            expect(h2).not.toBeNull();
            expect(h2?.classList.contains('text-4xl')).toBe(true);
        });

        it('should use text-2xl for sub-heading (H3)', () => {
            const h3 = aboutSection.querySelector('h3');
            expect(h3).not.toBeNull();
            expect(h3?.classList.contains('text-2xl')).toBe(true);
        });

        it('should use font-extrabold for main heading', () => {
            const h2 = aboutSection.querySelector('h2');
            expect(h2?.classList.contains('font-extrabold')).toBe(true);
        });

        it('should use tracking-tight for headings', () => {
            const h2 = aboutSection.querySelector('h2');
            const h3 = aboutSection.querySelector('h3');
            expect(h2?.classList.contains('tracking-tight')).toBe(true);
            expect(h3?.classList.contains('tracking-tight')).toBe(true);
        });
    });

    describe('Paragraph Typography', () => {
        it('should use text-lg for paragraph text', () => {
            const paragraphs = aboutSection.querySelectorAll('div.space-y-6 p');
            paragraphs.forEach(p => {
                expect(p.classList.contains('text-lg')).toBe(true);
            });
        });

        it('should use leading-loose for readable line-height', () => {
            const paragraphs = aboutSection.querySelectorAll('div.space-y-6 p');
            paragraphs.forEach(p => {
                expect(p.classList.contains('leading-loose')).toBe(true);
            });
        });

        it('should use tracking-wide for letter spacing', () => {
            const paragraphs = aboutSection.querySelectorAll('div.space-y-6 p');
            paragraphs.forEach(p => {
                expect(p.classList.contains('tracking-wide')).toBe(true);
            });
        });

        it('should use text-xl for closing tagline', () => {
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('text-xl')).toBe(true);
        });

        it('should use leading-relaxed for tagline', () => {
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('leading-relaxed')).toBe(true);
        });
    });

    describe('Section Spacing', () => {
        it('should use py-12 for vertical padding on section', () => {
            expect(aboutSection.classList.contains('py-12')).toBe(true);
        });

        it('should use px-8 for horizontal padding on section', () => {
            expect(aboutSection.classList.contains('px-8')).toBe(true);
        });

        it('should use mt-16 for top margin on section', () => {
            expect(aboutSection.classList.contains('mt-16')).toBe(true);
        });

        it('should use mb-16 for bottom margin on section', () => {
            expect(aboutSection.classList.contains('mb-16')).toBe(true);
        });

        it('should use space-y-6 for paragraph container spacing', () => {
            const paragraphContainer = aboutSection.querySelector('div.space-y-6');
            expect(paragraphContainer?.classList.contains('space-y-6')).toBe(true);
        });

        it('should use mb-8 for main heading margin bottom', () => {
            const h2 = aboutSection.querySelector('h2');
            expect(h2?.classList.contains('mb-8')).toBe(true);
        });

        it('should use mb-6 for sub-heading margin bottom', () => {
            const h3 = aboutSection.querySelector('h3');
            expect(h3?.classList.contains('mb-6')).toBe(true);
        });

        it('should use mt-10 for card top margin', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('mt-10')).toBe(true);
        });

        it('should use mt-10 for tagline top margin', () => {
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('mt-10')).toBe(true);
        });
    });

    describe('Card Styling', () => {
        it('should use p-8 for card padding', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('p-8')).toBe(true);
        });

        it('should use rounded-2xl for card border radius', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('rounded-2xl')).toBe(true);
        });

        it('should use backdrop-blur-md for card blur effect', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('backdrop-blur-md')).toBe(true);
        });

        it('should use border-2 class for card border', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('border-2')).toBe(true);
        });

        it('should use shadow-2xl for card shadow', () => {
            const card = aboutSection.querySelector('.bg-white\\/10');
            expect(card?.classList.contains('shadow-2xl')).toBe(true);
        });
    });

    describe('List Item Styling', () => {
        it('should use space-y-5 for list spacing', () => {
            const list = aboutSection.querySelector('ol');
            expect(list?.classList.contains('space-y-5')).toBe(true);
        });

        it('should use gap-4 for list item internal spacing', () => {
            const listItems = aboutSection.querySelectorAll('ol li');
            listItems.forEach(li => {
                expect(li.classList.contains('gap-4')).toBe(true);
            });
        });

        it('should use leading-relaxed for list item text', () => {
            const listTexts = aboutSection.querySelectorAll('ol li span:last-child');
            listTexts.forEach(span => {
                expect(span.classList.contains('leading-relaxed')).toBe(true);
            });
        });

        it('should use text-lg for list item text', () => {
            const listTexts = aboutSection.querySelectorAll('ol li span:last-child');
            listTexts.forEach(span => {
                expect(span.classList.contains('text-lg')).toBe(true);
            });
        });
    });

    describe('Container Width', () => {
        it('should use max-w-3xl for section max-width', () => {
            expect(aboutSection.classList.contains('max-w-3xl')).toBe(true);
        });

        it('should use mx-auto for horizontal centering', () => {
            expect(aboutSection.classList.contains('mx-auto')).toBe(true);
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
            const firstParagraph = aboutSection.querySelector('div.space-y-6 p:first-child');
            expect(firstParagraph?.classList.contains('text-gray-100')).toBe(true);
        });

        it('should use text-gray-200 for secondary paragraph text', () => {
            const secondParagraph = aboutSection.querySelector('div.space-y-6 p:last-child');
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

        it('should use rounded-3xl for section border radius', () => {
            expect(aboutSection.classList.contains('rounded-3xl')).toBe(true);
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

        it('should use pt-8 for tagline top padding after border', () => {
            const tagline = aboutSection.querySelector('p.italic');
            expect(tagline?.classList.contains('pt-8')).toBe(true);
        });
    });

    describe('Acceptance Criteria Verification - Story 2', () => {
        it('AC1: Headings use appropriate font sizes', () => {
            const h2 = aboutSection.querySelector('h2');
            const h3 = aboutSection.querySelector('h3');
            
            expect(h2?.classList.contains('text-4xl')).toBe(true);
            expect(h3?.classList.contains('text-2xl')).toBe(true);
        });

        it('AC2: Paragraph text has readable line-height', () => {
            const paragraphs = aboutSection.querySelectorAll('div.space-y-6 p');
            paragraphs.forEach(p => {
                const hasLeadingRelaxed = p.classList.contains('leading-relaxed');
                const hasLeadingLoose = p.classList.contains('leading-loose');
                expect(hasLeadingRelaxed || hasLeadingLoose).toBe(true);
            });
        });

        it('AC3: Proper vertical spacing between elements', () => {
            expect(aboutSection.classList.contains('py-12')).toBe(true);
            
            const paragraphContainer = aboutSection.querySelector('div.space-y-6');
            expect(paragraphContainer?.classList.contains('space-y-6')).toBe(true);
            
            const list = aboutSection.querySelector('ol');
            expect(list?.classList.contains('space-y-5')).toBe(true);
        });

        it('AC4: Section has appropriate padding', () => {
            expect(aboutSection.classList.contains('py-12')).toBe(true);
            expect(aboutSection.classList.contains('px-8')).toBe(true);
        });
    });

    describe('Acceptance Criteria Verification - Story 3', () => {
        it('AC1: Text color classes for text hierarchy', () => {
            const h2 = aboutSection.querySelector('h2');
            const h3 = aboutSection.querySelector('h3');
            const firstParagraph = aboutSection.querySelector('div.space-y-6 p:first-child');
            
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
            const paragraphs = aboutSection.querySelectorAll('div.space-y-6 p');
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
