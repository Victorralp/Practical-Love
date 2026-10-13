/**
 * ProgressDashboard Component
 * Combines stats, history, and milestones with encouraging empty state
 * Requirements: 5.1, 5.2, 5.4
 */

import { useState, useEffect } from 'react';
import type { UserProgress } from '../../types/growth';
import { progressService } from '../../services/progressService';
import { dataService } from '../../services/dataService';
import ProgressStats from './ProgressStats';
import CompletionHistory from './CompletionHistory';
import { CARD, KICKER } from './ui';

interface ProgressDashboardProps {
  onNavigateToSection?: (section: string) => void;
}

/**
 * Check if user has any progress data
 */
function hasProgress(progress: UserProgress): boolean {
  return (
    progress.completedChallenges.length > 0 ||
    progress.reflectionSessions.length > 0 ||
    progress.journeyProgress.length > 0
  );
}

/**
 * Empty state component shown when user has no progress
 */
function EmptyState({ onNavigateToSection }: { onNavigateToSection?: (section: string) => void }) {
  return (
    <div className="rounded-[28px] bg-pl-blush p-[clamp(24px,5vw,48px)] text-center">
      <span aria-hidden="true" className="text-[40px] leading-none text-pl-red">
        ♥
      </span>
      <h3 className="mb-3 mt-4 text-[clamp(26px,3.2vw,38px)] font-extrabold leading-[1] tracking-[-0.04em]">
        Begin your <span className="pl-serif font-normal text-pl-red">growth journey.</span>
      </h3>
      <p className="mx-auto mb-7 mt-0 max-w-[46ch] text-[18px] leading-[1.5] text-pl-body">
        Every journey starts with a single step. Complete challenges, reflect on your growth, and
        follow guided journeys to develop your capacity to love others.
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" onClick={() => onNavigateToSection?.('challenges')} className="pl-btn pl-btn-red">
          Start today's challenge
        </button>
        <button type="button" onClick={() => onNavigateToSection?.('journeys')} className="pl-btn pl-btn-outline">
          Explore journeys
        </button>
      </div>
    </div>
  );
}

/**
 * Milestones section showing achievements
 */
function Milestones({ progress }: { progress: UserProgress }) {
  const milestones = [
    {
      id: 'first-challenge',
      title: 'First step',
      description: 'Complete your first challenge',
      achieved: progress.completedChallenges.length >= 1,
    },
    {
      id: 'five-challenges',
      title: 'Getting started',
      description: 'Complete 5 challenges',
      achieved: progress.completedChallenges.length >= 5,
    },
    {
      id: 'ten-challenges',
      title: 'Dedicated',
      description: 'Complete 10 challenges',
      achieved: progress.completedChallenges.length >= 10,
    },
    {
      id: 'first-reflection',
      title: 'Self-aware',
      description: 'Complete your first reflection',
      achieved: progress.reflectionSessions.length >= 1,
    },
    {
      id: 'first-journey',
      title: 'Journey begun',
      description: 'Start a guided journey',
      achieved: progress.journeyProgress.length >= 1,
    },
    {
      id: 'journey-complete',
      title: 'Journey master',
      description: 'Complete a guided journey',
      achieved: progress.journeyProgress.some(jp => jp.completedAt !== undefined),
    },
  ];

  const achievedCount = milestones.filter(m => m.achieved).length;

  return (
    <div className={`${CARD} p-[clamp(20px,3vw,28px)]`}>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="m-0 text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.03em]">Milestones</h3>
        <span className={`${KICKER} text-pl-muted`}>
          {achievedCount} / {milestones.length} achieved
        </span>
      </div>
      <ul className="m-0 grid list-none gap-3 p-0 [grid-template-columns:repeat(auto-fill,minmax(min(100%,150px),1fr))]">
        {milestones.map(milestone => (
          <li
            key={milestone.id}
            className={`rounded-[20px] p-4 ${milestone.achieved ? 'bg-pl-yellow text-pl-ink' : 'bg-pl-hair text-pl-muted'}`}
          >
            <span
              aria-hidden="true"
              className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold ${
                milestone.achieved ? 'bg-pl-ink text-white' : 'bg-white text-pl-muted'
              }`}
            >
              {milestone.achieved ? '✓' : '♥'}
            </span>
            <p className="m-0 text-[16px] font-bold">
              {milestone.title}
              <span className="sr-only">{milestone.achieved ? ' (achieved)' : ' (not yet achieved)'}</span>
            </p>
            <p className="mb-0 mt-1 text-[14px] leading-[1.4] opacity-80">{milestone.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProgressDashboard({ onNavigateToSection }: ProgressDashboardProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [totalJourneys, setTotalJourneys] = useState(0);

  useEffect(() => {
    const journeys = dataService.getJourneys();
    // Finish journeys saved with every step done but no completion date
    progressService.finishCompletedJourneys(Object.fromEntries(journeys.map(j => [j.id, j.steps.length])));
    setProgress(progressService.getProgress());
    setTotalJourneys(journeys.length);
  }, []);

  if (!progress) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-[18px] text-pl-muted motion-reduce:animate-none">Loading progress…</div>
      </div>
    );
  }

  if (!hasProgress(progress)) {
    return <EmptyState onNavigateToSection={onNavigateToSection} />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <ProgressStats progress={progress} totalJourneys={totalJourneys} />

      {/* Two column layout for history and milestones */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Completion History */}
        <CompletionHistory progress={progress} maxItems={8} />

        {/* Milestones */}
        <Milestones progress={progress} />
      </div>
    </div>
  );
}

