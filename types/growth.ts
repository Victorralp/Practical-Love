/**
 * Type definitions for the Practical Love Growth feature
 * Requirements: 1.2, 2.3, 4.1
 */

// Love Category Types
export type LoveCategory =
  | 'patience'
  | 'kindness'
  | 'forgiveness'
  | 'empathy'
  | 'humility'
  | 'trust'
  | 'perseverance';

// Challenge Types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  actionStep: string;
  category: LoveCategory;
  timeframe: 'daily' | 'weekly';
  scriptureReference?: string;
}

export interface ChallengeCompletion {
  challengeId: string;
  completedAt: string; // ISO date
  reflection?: string;
}

// Growth Tip Types
export interface Exercise {
  id: string;
  title: string;
  steps: string[];
  duration: string;
}

export interface GrowthTip {
  id: string;
  title: string;
  category: LoveCategory;
  summary: string;
  content: string;
  exercises: Exercise[];
}

// Self-Reflection Types
export interface ReflectionPrompt {
  id: string;
  question: string;
  category: LoveCategory;
  followUp?: string;
}

export interface ReflectionEntry {
  id: string;
  promptId: string;
  response: string;
  createdAt: string; // ISO date
}

export interface ReflectionSession {
  id: string;
  entries: ReflectionEntry[];
  completedAt: string;
}

// Journey Types
export interface JourneyStep {
  id: string;
  dayNumber: number;
  title: string;
  content: string;
  scriptureReference?: string;
  actionItem: string;
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  steps: JourneyStep[];
  category: LoveCategory;
}

export interface JourneyProgress {
  journeyId: string;
  currentStepIndex: number;
  startedAt: string;
  completedSteps: number[];
  completedAt?: string;
}

// Progress Types
export interface UserProgress {
  completedChallenges: ChallengeCompletion[];
  reflectionSessions: ReflectionSession[];
  journeyProgress: JourneyProgress[];
  lastVisit: string;
}

// Storage Types
export interface StoredProgress {
  version: number;
  data: UserProgress;
  updatedAt: string;
}

export interface StoredReflections {
  sessions: ReflectionSession[];
}

// Search Types
export interface SearchResult {
  type: 'challenge' | 'tip' | 'journey' | 'reflection';
  id: string;
  title: string;
  description: string;
  category: LoveCategory;
}
