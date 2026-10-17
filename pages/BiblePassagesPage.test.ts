/**
 * Property-based tests for Bible Passages Page
 * Feature: page-redesign
 * Validates: Requirements 2.3
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { PASSAGES, type BiblePassage, type PassageCategory } from '../data/lovePassages';

const VALID_CATEGORIES: readonly PassageCategory[] = ['command', 'example', 'promise', 'warning'];
const passages = PASSAGES;

// Validation function for passage category
function isValidCategory(category: string): category is PassageCategory {
  return VALID_CATEGORIES.includes(category as PassageCategory);
}

// Validation function for complete passage
function isValidPassage(passage: BiblePassage): boolean {
  return (
    passage.reference.length > 0 && passage.text.length > 0 && isValidCategory(passage.category)
  );
}

describe('Bible Passages Page - Property Tests', () => {
  /**
   * **Feature: page-redesign, Property 1: Passage Category Validity**
   * *For any* Bible passage displayed on the Bible Passages page, the passage
   * category SHALL be one of the four valid types: 'command', 'example',
   * 'promise', or 'warning'.
   * **Validates: Requirements 2.3**
   */
  it('Property 1: Passage Category Validity - all passages have valid categories', () => {
    fc.assert(
      fc.property(fc.constantFrom(...passages), passage => {
        // Verify the category is one of the valid types
        expect(VALID_CATEGORIES).toContain(passage.category);
        expect(isValidPassage(passage)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Additional property test: Generated passages with valid categories pass validation
   * This tests the validation function itself with generated data
   */
  it('Property 1b: Generated passages with valid categories pass validation', () => {
    const passageArb: fc.Arbitrary<BiblePassage> = fc.record({
      reference: fc.string({ minLength: 1 }),
      text: fc.string({ minLength: 1 }),
      explanation: fc.string({ minLength: 1 }),
      application: fc.string({ minLength: 1 }),
      category: fc.constantFrom(...VALID_CATEGORIES),
    });

    fc.assert(
      fc.property(passageArb, passage => {
        expect(isValidPassage(passage)).toBe(true);
        expect(VALID_CATEGORIES).toContain(passage.category);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Verify all actual passages in the data have valid categories
   */
  it('Every passage has a valid category', () => {
    passages.forEach((passage, index) => {
      expect(
        isValidCategory(passage.category),
        `Passage ${index + 1} (${passage.reference}) has invalid category: ${passage.category}`
      ).toBe(true);
    });
  });
});

// Export for potential reuse
export { VALID_CATEGORIES, isValidCategory, isValidPassage, passages };

