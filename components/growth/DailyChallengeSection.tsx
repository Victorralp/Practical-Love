/**
 * DailyChallengeSection Component
 * Displays the current daily challenge using DataService and handles completion with ProgressService
 * Requirements: 1.1, 1.3, 1.4
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import ChallengeCard from './ChallengeCard';
import HowItWorks from './HowItWorks';
import { usePopOnChange } from '../pl/motion';
import { dataService } from '../../services/dataService';
import { progressService } from '../../services/progressService';
import type { Challenge, ChallengeCompletion } from '../../types/growth';
import { KICKER } from './ui';

export default function DailyChallengeSection() {
  // State management for challenge completion
  const [completedChallenges, setCompletedChallenges] = useState<ChallengeCompletion[]>([]);
  const [justCompleted, setJustCompleted] = useState(false);
  const countRef = useRef<HTMLDivElement | null>(null);

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
  usePopOnChange(countRef, totalCompleted);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <p className={`${KICKER} m-0 text-pl-red`}>{formattedDate}</p>
        {totalCompleted > 0 && (
          <div ref={countRef} className="rounded-[20px] bg-pl-yellow px-5 py-3 text-pl-ink" aria-live="polite">
            <span className="text-[28px] font-extrabold leading-none tracking-[-0.04em]">{totalCompleted}</span>{' '}
            <span className="text-[15px] font-semibold">
              challenge{totalCompleted !== 1 ? 's' : ''} completed
            </span>
          </div>
        )}
      </div>

      {/* Success Message */}
      {justCompleted && (
        <div role="status" className="mb-6 rounded-[24px] bg-pl-red p-5 text-white">
          <p className="m-0 text-[20px] font-extrabold tracking-[-0.02em]">
            Challenge completed. <span className="pl-serif font-normal">Well done.</span>
          </p>
          <p className="mb-0 mt-1 text-[15px] text-white/90">Come back tomorrow for a new challenge.</p>
        </div>
      )}

      {/* Challenge Card */}
      <ChallengeCard
        challenge={todayChallenge}
        isCompleted={isTodayCompleted}
        onComplete={handleComplete}
      />

      <HowItWorks
        title="How daily challenges work"
        items={[
          'A new challenge appears each day at midnight',
          'Complete the challenge and optionally add a reflection',
          'Track your progress over time in the Progress Dashboard',
          'Challenges rotate through different love categories',
        ]}
      />
    </div>
  );
}
