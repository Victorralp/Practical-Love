/**
 * DailyChallengeSection Component
 * Displays the current daily challenge using DataService and handles completion with ProgressService
 * Requirements: 1.1, 1.3, 1.4
 */

import { useState, useEffect, useMemo } from 'react';
import { Calendar, RefreshCw, Trophy } from 'lucide-react';
import ChallengeCard from './ChallengeCard';
import { dataService } from '../../services/dataService';
import { progressService } from '../../services/progressService';
import type { Challenge, ChallengeCompletion } from '../../types/growth';

export default function DailyChallengeSection() {
  // State management for challenge completion
  const [completedChallenges, setCompletedChallenges] = useState<ChallengeCompletion[]>([]);
  const [justCompleted, setJustCompleted] = useState(false);

  // Get today's challenge using DataService
  const todayChallenge: Challenge = useMemo(() => {
    return dataService.getDailyChallenge(new Date());
  }, []);

  // Load completed challenges from ProgressService
  useEffect(() => {
    const progress = progressService.getProgress();
    setCompletedChallenges(progress.completedChallenges);
  }, []);

  // Check if today's challenge is already completed
  const isTodayCompleted = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return completedChallenges.some(
      c => c.challengeId === todayChallenge.id && c.completedAt.startsWith(today)
    );
  }, [completedChallenges, todayChallenge.id]);

  const handleComplete = (challengeId: string, reflection?: string) => {
    progressService.completeChallenge(challengeId, reflection);
    const progress = progressService.getProgress();
    setCompletedChallenges(progress.completedChallenges);
    setJustCompleted(true);
  };

  // Format today's date
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Count total completed challenges
  const totalCompleted = completedChallenges.length;

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-serif text-red-800 mb-2">Daily Love Challenge</h2>
            <p className="text-gray-600 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formattedDate}
            </p>
          </div>
          {totalCompleted > 0 && (
            <div className="flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
              <Trophy className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {totalCompleted} challenge{totalCompleted !== 1 ? 's' : ''} completed
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Success Message */}
      {justCompleted && (
        <div className="mb-6 bg-amber-100 border border-amber-300 rounded-lg p-4 flex items-center">
          <Trophy className="w-6 h-6 text-orange-600 mr-3" />
          <div>
            <p className="font-medium text-orange-800">Challenge Completed!</p>
            <p className="text-orange-700 text-sm">
              Great job! Come back tomorrow for a new challenge.
            </p>
          </div>
        </div>
      )}

      {/* Challenge Card */}
      <ChallengeCard
        challenge={todayChallenge}
        isCompleted={isTodayCompleted}
        onComplete={handleComplete}
      />

      {/* Info Section */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
        <div className="flex items-start">
          <RefreshCw className="w-6 h-6 text-orange-600 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How Daily Challenges Work</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• A new challenge appears each day at midnight</li>
              <li>• Complete the challenge and optionally add a reflection</li>
              <li>• Track your progress over time in the Progress Dashboard</li>
              <li>• Challenges rotate through different love categories</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

