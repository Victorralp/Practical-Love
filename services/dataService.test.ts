/**
 * Property-based tests for DataService
 * Feature: practical-love-growth
 * Validates: Requirements 1.3, 2.3, 6.3
 */
import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import type { LoveCategory } from '../types/growth';
import { createDataService, DataService } from './dataService';

// Valid LoveCategory values for generators
const LOVE_CATEGORIES: LoveCategory[] = [
  'patience',
  'kindness',
  'forgiveness',
  'empathy',
  'humility',
  'trust',
  'perseverance',
];

// Arbitraries (generators) for property-based testing
const loveCategoryArb = fc.constantFrom(...LOVE_CATEGORIES);

// Date arbitrary that generates valid dates (filter out NaN dates)
const dateArb = fc.date({
  min: new Date('2020-01-01'),
  max: new Date('2030-12-31'),
}).filter(d => !isNaN(d.getTime()));

// Search query arbitrary - non-empty strings that could match content
const searchQueryArb = fc.string({ minLength: 1, maxLength: 20 })
  .filter(s => /^[a-zA-Z ]+$/.test(s) && s.trim().length > 0);

describe('DataService Properties', () => {
  let dataService: DataService;

  beforeEach(() => {
    dataService = createDataService();
  });

  /**
   * **Feature: practical-love-growth, Property 2: Daily challenge determinism**
   * *For any* given date, the getDailyChallenge function SHALL return the same
   * challenge when called multiple times with that date.
   * **Validates: Requirements 1.3**
   */
  it('Property 2: Daily challenge determinism', () => {
    fc.assert(
      fc.property(dateArb, (date) => {
        // Call getDailyChallenge multiple times with the same date
        const challenge1 = dataService.getDailyChallenge(date);
        const challenge2 = dataService.getDailyChallenge(date);
        const challenge3 = dataService.getDailyChallenge(date);

        // All calls should return the same challenge
        expect(challenge1.id).toBe(challenge2.id);
        expect(challenge2.id).toBe(challenge3.id);
        expect(challenge1.title).toBe(challenge2.title);
        expect(challenge2.title).toBe(challenge3.title);
      }),
      { numRuns: 100 }
    );
  });


  /**
   * **Feature: practical-love-growth, Property 4: Growth tips category validity**
   * *For any* GrowthTip object, its category SHALL be one of the valid LoveCategory
   * values, and getTipsByCategory SHALL return only tips matching the requested category.
   * **Validates: Requirements 2.3**
   */
  it('Property 4: Growth tips category validity', () => {
    fc.assert(
      fc.property(loveCategoryArb, (category) => {
        // Get tips filtered by category
        const filteredTips = dataService.getTipsByCategory(category);

        // All returned tips should have the requested category
        filteredTips.forEach(tip => {
          expect(tip.category).toBe(category);
          expect(LOVE_CATEGORIES).toContain(tip.category);
        });

        // Verify all tips have valid categories
        const allTips = dataService.getTips();
        allTips.forEach(tip => {
          expect(LOVE_CATEGORIES).toContain(tip.category);
        });
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: practical-love-growth, Property 10: Search results relevance**
   * *For any* search query, all returned results SHALL contain the query string
   * (case-insensitive) in their title, description, or content.
   * **Validates: Requirements 6.3**
   */
  it('Property 10: Search results relevance', () => {
    // Get all source data to verify search results against original content
    const allChallenges = dataService.getChallenges();
    const allTips = dataService.getTips();
    const allJourneys = dataService.getJourneys();
    const allPrompts = dataService.getReflectionPrompts();

    fc.assert(
      fc.property(searchQueryArb, (query) => {
        const results = dataService.searchContent(query);
        const lowerQuery = query.toLowerCase().trim();

        // All returned results should contain the query in their searchable fields
        results.forEach(result => {
          let foundMatch = false;

          if (result.type === 'challenge') {
            const challenge = allChallenges.find(c => c.id === result.id);
            if (challenge) {
              foundMatch = 
                challenge.title.toLowerCase().includes(lowerQuery) ||
                challenge.description.toLowerCase().includes(lowerQuery) ||
                challenge.actionStep.toLowerCase().includes(lowerQuery);
            }
          } else if (result.type === 'tip') {
            const tip = allTips.find(t => t.id === result.id);
            if (tip) {
              foundMatch = 
                tip.title.toLowerCase().includes(lowerQuery) ||
                tip.summary.toLowerCase().includes(lowerQuery) ||
                tip.content.toLowerCase().includes(lowerQuery);
            }
          } else if (result.type === 'journey') {
            const journey = allJourneys.find(j => j.id === result.id);
            if (journey) {
              foundMatch = 
                journey.title.toLowerCase().includes(lowerQuery) ||
                journey.description.toLowerCase().includes(lowerQuery);
            }
          } else if (result.type === 'reflection') {
            const prompt = allPrompts.find(p => p.id === result.id);
            if (prompt) {
              foundMatch = 
                prompt.question.toLowerCase().includes(lowerQuery) ||
                (prompt.followUp?.toLowerCase().includes(lowerQuery) ?? false);
            }
          }

          expect(foundMatch).toBe(true);
        });
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Additional test: Empty query returns no results
   */
  it('Empty search query returns no results', () => {
    const results = dataService.searchContent('');
    expect(results).toEqual([]);

    const whitespaceResults = dataService.searchContent('   ');
    expect(whitespaceResults).toEqual([]);
  });

  /**
   * Additional test: All tips from getTipsByCategory are subset of getTips
   */
  it('Filtered tips are subset of all tips', () => {
    fc.assert(
      fc.property(loveCategoryArb, (category) => {
        const allTips = dataService.getTips();
        const filteredTips = dataService.getTipsByCategory(category);

        // Every filtered tip should exist in all tips
        filteredTips.forEach(filteredTip => {
          const found = allTips.some(tip => tip.id === filteredTip.id);
          expect(found).toBe(true);
        });
      }),
      { numRuns: 100 }
    );
  });
});
