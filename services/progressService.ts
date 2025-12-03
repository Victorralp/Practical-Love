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
  completeJourneyStep(journeyId: string, stepIndex: number): void;
  getJourneyProgress(journeyId: string): JourneyProgress | null;
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

  completeJourneyStep(journeyId: string, stepIndex: number): void {
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

    this.saveProgress(progress);
  }

  getJourneyProgress(journeyId: string): JourneyProgress | null {
    const progress = this.getProgress();
    return progress.journeyProgress.find(jp => jp.journeyId === journeyId) || null;
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
