/**
 * Challenge Progress Service for localStorage persistence
 * Requirements: 4.1, 4.2
 */

import { storageService } from './storageService';

const CHALLENGE_PROGRESS_KEY = 'love-challenge-progress';

export interface ChallengeProgress {
  completedDays: number[];
  currentDay: number;
  startDate: string;
  lastUpdated: string;
}

/**
 * Get the default initial progress state
 */
export function getDefaultProgress(): ChallengeProgress {
  return {
    completedDays: [],
    currentDay: 1,
    startDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Load challenge progress from localStorage
 */
export function loadChallengeProgress(): ChallengeProgress {
  const stored = storageService.load<ChallengeProgress>(CHALLENGE_PROGRESS_KEY);
  if (!stored) {
    return getDefaultProgress();
  }
  // Validate the loaded data
  if (!Array.isArray(stored.completedDays) || typeof stored.currentDay !== 'number') {
    return getDefaultProgress();
  }
  return stored;
}

/**
 * Save challenge progress to localStorage
 */
export function saveChallengeProgress(progress: ChallengeProgress): void {
  const updatedProgress: ChallengeProgress = {
    ...progress,
    lastUpdated: new Date().toISOString(),
  };
  storageService.save(CHALLENGE_PROGRESS_KEY, updatedProgress);
}

/**
 * Toggle a day's completion status
 */
export function toggleDayCompletion(progress: ChallengeProgress, day: number): ChallengeProgress {
  const completedDays = progress.completedDays.includes(day)
    ? progress.completedDays.filter(d => d !== day)
    : [...progress.completedDays, day].sort((a, b) => a - b);

  return {
    ...progress,
    completedDays,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Update the current day being viewed
 */
export function updateCurrentDay(progress: ChallengeProgress, day: number): ChallengeProgress {
  return {
    ...progress,
    currentDay: Math.max(1, Math.min(30, day)),
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Reset challenge progress
 */
export function resetChallengeProgress(): ChallengeProgress {
  const defaultProgress = getDefaultProgress();
  storageService.save(CHALLENGE_PROGRESS_KEY, defaultProgress);
  return defaultProgress;
}

/**
 * Check if the challenge is complete
 */
export function isChallengeComplete(progress: ChallengeProgress): boolean {
  return progress.completedDays.length === 30;
}
