/**
 * Property-based tests for storage round-trip operations
 * Feature: practical-love-growth
 * Validates: Requirements 1.4, 3.2, 3.4, 4.2, 4.5, 5.3
 */
import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import type { 
  ReflectionSession, 
  ReflectionEntry,
  LoveCategory 
} from '../types/growth';
import { StorageService } from './storageService';
import { createProgressService, ProgressService } from './progressService';

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

// In-memory storage for testing (avoids localStorage issues in test environment)
class TestStorage implements StorageService {
  private storage: Map<string, string> = new Map();

  save<T>(key: string, data: T): void {
    this.storage.set(key, JSON.stringify(data));
  }

  load<T>(key: string): T | null {
    const item = this.storage.get(key);
    if (item === undefined) {
      return null;
    }
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  remove(key: string): void {
    this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

// Arbitraries (generators) for property-based testing
const loveCategoryArb = fc.constantFrom(...LOVE_CATEGORIES);

// Valid date arbitrary that filters out NaN dates
const validDateArb = fc.date({
  min: new Date('2020-01-01'),
  max: new Date('2030-12-31'),
}).filter(d => !isNaN(d.getTime()));

const reflectionEntryArb: fc.Arbitrary<ReflectionEntry> = fc.record({
  id: fc.uuid(),
  promptId: fc.uuid(),
  response: fc.string({ minLength: 1 }),
  createdAt: validDateArb.map(d => d.toISOString()),
});


const reflectionSessionArb: fc.Arbitrary<ReflectionSession> = fc.record({
  id: fc.uuid(),
  entries: fc.array(reflectionEntryArb, { minLength: 1 }),
  completedAt: validDateArb.map(d => d.toISOString()),
});

describe('Storage Round-Trip Properties', () => {
  let testStorage: TestStorage;
  let progressService: ProgressService;

  beforeEach(() => {
    testStorage = new TestStorage();
    progressService = createProgressService(testStorage);
  });

  /**
   * **Feature: practical-love-growth, Property 3: Challenge completion persistence round-trip**
   * *For any* challenge completion saved via completeChallenge, retrieving progress
   * via getProgress SHALL include that completion with matching challengeId and reflection.
   * **Validates: Requirements 1.4, 3.2, 5.3**
   */
  it('Property 3: Challenge completion persistence round-trip', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
        (challengeId, reflection) => {
          // Clear storage before each test
          testStorage.clear();
          progressService = createProgressService(testStorage);

          // Complete the challenge
          progressService.completeChallenge(challengeId, reflection);

          // Retrieve progress
          const progress = progressService.getProgress();

          // Verify the completion exists with matching data
          const completion = progress.completedChallenges.find(
            c => c.challengeId === challengeId
          );

          expect(completion).toBeDefined();
          expect(completion!.challengeId).toBe(challengeId);
          expect(completion!.reflection).toBe(reflection);
          expect(completion!.completedAt).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });


  /**
   * **Feature: practical-love-growth, Property 6: Reflection session round-trip**
   * *For any* ReflectionSession saved via saveReflectionSession, retrieving progress
   * SHALL include that session with all original entries preserved.
   * **Validates: Requirements 3.2, 3.4**
   */
  it('Property 6: Reflection session round-trip', () => {
    fc.assert(
      fc.property(reflectionSessionArb, (session) => {
        // Clear storage before each test
        testStorage.clear();
        progressService = createProgressService(testStorage);

        // Save the reflection session
        progressService.saveReflectionSession(session);

        // Retrieve progress
        const progress = progressService.getProgress();

        // Verify the session exists with all entries preserved
        const savedSession = progress.reflectionSessions.find(
          s => s.id === session.id
        );

        expect(savedSession).toBeDefined();
        expect(savedSession!.id).toBe(session.id);
        expect(savedSession!.completedAt).toBe(session.completedAt);
        expect(savedSession!.entries.length).toBe(session.entries.length);

        // Verify each entry is preserved
        session.entries.forEach((entry, index) => {
          expect(savedSession!.entries[index].id).toBe(entry.id);
          expect(savedSession!.entries[index].promptId).toBe(entry.promptId);
          expect(savedSession!.entries[index].response).toBe(entry.response);
          expect(savedSession!.entries[index].createdAt).toBe(entry.createdAt);
        });
      }),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: practical-love-growth, Property 8: Journey step progression**
   * *For any* journey, completing step N via completeJourneyStep SHALL update
   * currentStepIndex to N+1 (if not final step) and add N to completedSteps.
   * **Validates: Requirements 4.3, 4.4**
   */
  it('Property 8: Journey step progression', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        fc.integer({ min: 0, max: 99 }), // Step index to complete
        (journeyId, stepIndex) => {
          // Clear storage before each test
          testStorage.clear();
          progressService = createProgressService(testStorage);

          // Start the journey first
          progressService.startJourney(journeyId);

          // Complete the step
          progressService.completeJourneyStep(journeyId, stepIndex);

          // Retrieve journey progress
          const journeyProgress = progressService.getJourneyProgress(journeyId);

          // Verify the step was added to completedSteps
          expect(journeyProgress).toBeDefined();
          expect(journeyProgress!.completedSteps).toContain(stepIndex);

          // Verify currentStepIndex is updated to N+1
          expect(journeyProgress!.currentStepIndex).toBe(stepIndex + 1);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * **Feature: practical-love-growth, Property 9: Journey progress persistence**
   * *For any* journey started via startJourney, getJourneyProgress SHALL return
   * progress with currentStepIndex of 0 and the correct journeyId.
   * **Validates: Requirements 4.2, 4.5**
   */
  it('Property 9: Journey progress persistence', () => {
    fc.assert(
      fc.property(fc.uuid(), (journeyId) => {
        // Clear storage before each test
        testStorage.clear();
        progressService = createProgressService(testStorage);

        // Start the journey
        progressService.startJourney(journeyId);

        // Retrieve journey progress
        const journeyProgress = progressService.getJourneyProgress(journeyId);

        // Verify the journey progress exists with correct initial state
        expect(journeyProgress).toBeDefined();
        expect(journeyProgress!.journeyId).toBe(journeyId);
        expect(journeyProgress!.currentStepIndex).toBe(0);
        expect(journeyProgress!.completedSteps).toEqual([]);
        expect(journeyProgress!.startedAt).toBeDefined();
      }),
      { numRuns: 100 }
    );
  });
});
