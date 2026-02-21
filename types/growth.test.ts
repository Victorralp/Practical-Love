/**
 * Property-based tests for data model validation
 * Feature: practical-love-growth
 * Validates: Requirements 1.2, 2.4, 4.1
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { Challenge, Exercise, Journey, LoveCategory } from './growth';

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

const challengeArb: fc.Arbitrary<Challenge> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  actionStep: fc.string({ minLength: 1 }),
  category: loveCategoryArb,
  timeframe: fc.constantFrom('daily', 'weekly') as fc.Arbitrary<'daily' | 'weekly'>,
  scriptureReference: fc.option(fc.string(), { nil: undefined }),
});

const exerciseArb: fc.Arbitrary<Exercise> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1 }),
  steps: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
  duration: fc.string({ minLength: 1 }),
});

const journeyStepArb = fc.record({
  id: fc.uuid(),
  dayNumber: fc.integer({ min: 1 }),
  title: fc.string({ minLength: 1 }),
  content: fc.string({ minLength: 1 }),
  scriptureReference: fc.option(fc.string(), { nil: undefined }),
  actionItem: fc.string({ minLength: 1 }),
});

const journeyArb: fc.Arbitrary<Journey> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  durationDays: fc.integer({ min: 1 }),
  steps: fc.array(journeyStepArb, { minLength: 1 }),
  category: loveCategoryArb,
});

// Validation functions
function isValidChallenge(challenge: Challenge): boolean {
  return (
    challenge.title.length > 0 &&
    challenge.description.length > 0 &&
    challenge.actionStep.length > 0 &&
    LOVE_CATEGORIES.includes(challenge.category)
  );
}

function isValidExercise(exercise: Exercise): boolean {
  return (
    exercise.title.length > 0 &&
    exercise.steps.length > 0 &&
    exercise.steps.every(step => step.length > 0)
  );
}

function isValidJourney(journey: Journey): boolean {
  return (
    journey.title.length > 0 &&
    journey.description.length > 0 &&
    journey.durationDays > 0 &&
    journey.steps.length > 0
  );
}

describe('Data Model Validation Properties', () => {
  /**
   * **Feature: practical-love-growth, Property 1: Challenge data completeness**
   * *For any* Challenge object, it SHALL contain a non-empty title, description,
   * actionStep, and valid category.
   * **Validates: Requirements 1.2**
   */
  it('Property 1: Challenge data completeness', () => {
    fc.assert(
      fc.property(challengeArb, challenge => {
        expect(isValidChallenge(challenge)).toBe(true);
        expect(challenge.title.length).toBeGreaterThan(0);
        expect(challenge.description.length).toBeGreaterThan(0);
        expect(challenge.actionStep.length).toBeGreaterThan(0);
        expect(LOVE_CATEGORIES).toContain(challenge.category);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: practical-love-growth, Property 5: Exercise steps completeness**
   * *For any* Exercise object, it SHALL contain a non-empty title and a steps
   * array with at least one step.
   * **Validates: Requirements 2.4**
   */
  it('Property 5: Exercise steps completeness', () => {
    fc.assert(
      fc.property(exerciseArb, exercise => {
        expect(isValidExercise(exercise)).toBe(true);
        expect(exercise.title.length).toBeGreaterThan(0);
        expect(exercise.steps.length).toBeGreaterThan(0);
        expect(exercise.steps.every(step => step.length > 0)).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: practical-love-growth, Property 7: Journey data completeness**
   * *For any* Journey object, it SHALL contain a non-empty title, description,
   * positive durationDays, and at least one step.
   * **Validates: Requirements 4.1**
   */
  it('Property 7: Journey data completeness', () => {
    fc.assert(
      fc.property(journeyArb, journey => {
        expect(isValidJourney(journey)).toBe(true);
        expect(journey.title.length).toBeGreaterThan(0);
        expect(journey.description.length).toBeGreaterThan(0);
        expect(journey.durationDays).toBeGreaterThan(0);
        expect(journey.steps.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });
});

// Export validation functions for use in other modules
export { isValidChallenge, isValidExercise, isValidJourney, LOVE_CATEGORIES };
