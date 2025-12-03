/**
 * Data Service for content retrieval
 * Requirements: 1.3, 2.1, 2.3, 6.3
 */

import type {
  Challenge,
  GrowthTip,
  Journey,
  ReflectionPrompt,
  LoveCategory,
  SearchResult,
} from '../types/growth';
import { challenges } from '../data/challenges';
import { tips } from '../data/tips';
import { journeys } from '../data/journeys';
import { reflectionPrompts } from '../data/reflectionPrompts';

export interface DataService {
  getDailyChallenge(date: Date): Challenge;
  getChallenges(): Challenge[];
  getTips(): GrowthTip[];
  getTipsByCategory(category: LoveCategory): GrowthTip[];
  getJourneys(): Journey[];
  getJourney(id: string): Journey | null;
  getReflectionPrompts(): ReflectionPrompt[];
  searchContent(query: string): SearchResult[];
}

/**
 * Get a deterministic index based on a date
 * Uses the date's day-of-year to rotate through available items
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Implementation of DataService
 */
class DataServiceImpl implements DataService {
  /**
   * Get the daily challenge for a given date
   * Uses date-based rotation to ensure deterministic results
   * **Feature: practical-love-growth, Property 2: Daily challenge determinism**
   */
  getDailyChallenge(date: Date): Challenge {
    const dayOfYear = getDayOfYear(date);
    const index = dayOfYear % challenges.length;
    return challenges[index];
  }


  /**
   * Get all challenges
   */
  getChallenges(): Challenge[] {
    return [...challenges];
  }

  /**
   * Get all growth tips
   */
  getTips(): GrowthTip[] {
    return [...tips];
  }

  /**
   * Get tips filtered by category
   * **Feature: practical-love-growth, Property 4: Growth tips category validity**
   */
  getTipsByCategory(category: LoveCategory): GrowthTip[] {
    return tips.filter(tip => tip.category === category);
  }

  /**
   * Get all journeys
   */
  getJourneys(): Journey[] {
    return [...journeys];
  }

  /**
   * Get a specific journey by ID
   */
  getJourney(id: string): Journey | null {
    return journeys.find(journey => journey.id === id) || null;
  }

  /**
   * Get all reflection prompts
   */
  getReflectionPrompts(): ReflectionPrompt[] {
    return [...reflectionPrompts];
  }

  /**
   * Search content across challenges, tips, journeys, and reflection prompts
   * Returns results that contain the query string (case-insensitive)
   * **Feature: practical-love-growth, Property 10: Search results relevance**
   */
  searchContent(query: string): SearchResult[] {
    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
      return results;
    }

    // Search challenges
    for (const challenge of challenges) {
      if (
        challenge.title.toLowerCase().includes(lowerQuery) ||
        challenge.description.toLowerCase().includes(lowerQuery) ||
        challenge.actionStep.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'challenge',
          id: challenge.id,
          title: challenge.title,
          description: challenge.description,
          category: challenge.category,
        });
      }
    }

    // Search tips
    for (const tip of tips) {
      if (
        tip.title.toLowerCase().includes(lowerQuery) ||
        tip.summary.toLowerCase().includes(lowerQuery) ||
        tip.content.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'tip',
          id: tip.id,
          title: tip.title,
          description: tip.summary,
          category: tip.category,
        });
      }
    }

    // Search journeys
    for (const journey of journeys) {
      if (
        journey.title.toLowerCase().includes(lowerQuery) ||
        journey.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'journey',
          id: journey.id,
          title: journey.title,
          description: journey.description,
          category: journey.category,
        });
      }
    }

    // Search reflection prompts
    for (const prompt of reflectionPrompts) {
      if (
        prompt.question.toLowerCase().includes(lowerQuery) ||
        (prompt.followUp && prompt.followUp.toLowerCase().includes(lowerQuery))
      ) {
        results.push({
          type: 'reflection',
          id: prompt.id,
          title: prompt.question.substring(0, 50) + (prompt.question.length > 50 ? '...' : ''),
          description: prompt.question,
          category: prompt.category,
        });
      }
    }

    return results;
  }
}

/**
 * Create a DataService instance
 */
export function createDataService(): DataService {
  return new DataServiceImpl();
}

// Default data service instance
export const dataService: DataService = createDataService();
