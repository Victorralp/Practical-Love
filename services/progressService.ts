/**
 * Progress Service for user progress management
 * Requirements: 1.4, 3.2, 4.3, 4.4, 5.1
 */

import type {
  UserProgress,
  ChallengeCompletion,
  ReflectionSession,
  JourneyProgress,
  StoredProgress,
} from '../types/growth';
import { StorageService, storageService } from './storageService';

const PROGRESS_STORAGE_KEY = 'practical-love-progress';
const CURRENT_VERSION = 1;

export interface ProgressService {
  getProgress(): UserProgress;
  saveProgress(progress: UserProgress): void;
  completeChallenge(challengeId: string, reflection?: string): void;
  saveReflectionSession(session: ReflectionSession): void;
  startJourney(journeyId: string): void;
  completeJourneyStep(journeyId: string, stepIndex: number, totalSteps?: number): void;
  getJourneyProgress(journeyId: string): JourneyProgress | null;
  finishCompletedJourneys(stepCounts: Record<string, number>): boolean;
}

/**
 * Create an empty UserProgress object
 */
function createEmptyProgress(): UserProgress {
  return {
    completedChallenges: [],
    reflectionSessions: [],
    journeyProgress: [],
    lastVisit: new Date().toISOString(),
  };
}

/**
 * Implementation of ProgressService
 */
class ProgressServiceImpl implements ProgressService {
  constructor(private storage: StorageService) {}

  getProgress(): UserProgress {
    const stored = this.storage.load<StoredProgress>(PROGRESS_STORAGE_KEY);
    if (!stored || !stored.data) {
      return createEmptyProgress();
    }
    return stored.data;
  }

  saveProgress(progress: UserProgress): void {
    const stored: StoredProgress = {
      version: CURRENT_VERSION,
      data: {
        ...progress,
        lastVisit: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    };
    this.storage.save(PROGRESS_STORAGE_KEY, stored);
  }

  completeChallenge(challengeId: string, reflection?: string): void {
    const progress = this.getProgress();
    const completion: ChallengeCompletion = {
      challengeId,
      completedAt: new Date().toISOString(),
      reflection,
    };
    progress.completedChallenges.push(completion);
    this.saveProgress(progress);
  }

  saveReflectionSession(session: ReflectionSession): void {
    const progress = this.getProgress();
    progress.reflectionSessions.push(session);
    this.saveProgress(progress);
  }

  startJourney(journeyId: string): void {
    const progress = this.getProgress();

    // Check if journey already started
    const existing = progress.journeyProgress.find(jp => jp.journeyId === journeyId);
    if (existing) {
      return; // Journey already started
    }

    const journeyProgress: JourneyProgress = {
      journeyId,
      currentStepIndex: 0,
      startedAt: new Date().toISOString(),
      completedSteps: [],
    };
    progress.journeyProgress.push(journeyProgress);
    this.saveProgress(progress);
  }

  completeJourneyStep(journeyId: string, stepIndex: number, totalSteps?: number): void {
    const progress = this.getProgress();
    const journeyProgress = progress.journeyProgress.find(jp => jp.journeyId === journeyId);

    if (!journeyProgress) {
      return; // Journey not started
    }

    // Add step to completed steps if not already completed
    if (!journeyProgress.completedSteps.includes(stepIndex)) {
      journeyProgress.completedSteps.push(stepIndex);
    }

    // Update current step index to next step
    journeyProgress.currentStepIndex = stepIndex + 1;

    // Mark the journey finished once every step has been completed
    if (
      totalSteps !== undefined &&
      totalSteps > 0 &&
      !journeyProgress.completedAt &&
      Array.from({ length: totalSteps }, (_, i) => i).every(i => journeyProgress.completedSteps.includes(i))
    ) {
      journeyProgress.completedAt = new Date().toISOString();
    }

    this.saveProgress(progress);
  }

  getJourneyProgress(journeyId: string): JourneyProgress | null {
    const progress = this.getProgress();
    return progress.journeyProgress.find(jp => jp.journeyId === journeyId) || null;
  }

  /**
   * Progress saved before journeys recorded completion can have every step
   * done but no completedAt. Finish those; returns true if any changed.
   */
  finishCompletedJourneys(stepCounts: Record<string, number>): boolean {
    const progress = this.getProgress();
    const now = new Date().toISOString();
    let changed = false;

    progress.journeyProgress.forEach(jp => {
      const total = stepCounts[jp.journeyId];
      if (jp.completedAt || !total) return;
      if (Array.from({ length: total }, (_, i) => i).every(i => jp.completedSteps.includes(i))) {
        jp.completedAt = now;
        changed = true;
      }
    });

    if (changed) this.saveProgress(progress);
    return changed;
  }
}

/**
 * Create a ProgressService instance with the given storage
 */
export function createProgressService(storage: StorageService = storageService): ProgressService {
  return new ProgressServiceImpl(storage);
}

// Default progress service instance
export const progressService: ProgressService = createProgressService();
