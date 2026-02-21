/**
 * ProgressDashboard Component
 * Combines stats, history, and milestones with encouraging empty state
 * Requirements: 5.1, 5.2, 5.4
 */

import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Target, Star, Trophy, MessageCircle, Map, PartyPopper } from 'lucide-react';
import type { UserProgress } from '../../types/growth';
import { progressService } from '../../services/progressService';
import { dataService } from '../../services/dataService';
import ProgressStats from './ProgressStats';
import CompletionHistory from './CompletionHistory';
import Logo from '../Logo';

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
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
        <Logo className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Begin Your Growth Journey</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Every journey starts with a single step. Complete challenges, reflect on your growth, and
        follow guided journeys to develop your capacity to love others.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={() => onNavigateToSection?.('challenges')}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Start Today's Challenge
        </button>
        <button
          type="button"
          onClick={() => onNavigateToSection?.('journeys')}
          className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-5 h-5" />
          Explore Journeys
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
      title: 'First Step',
      description: 'Complete your first challenge',
      achieved: progress.completedChallenges.length >= 1,
      icon: <Target className="w-5 h-5" />,
    },
    {
      id: 'five-challenges',
      title: 'Getting Started',
      description: 'Complete 5 challenges',
      achieved: progress.completedChallenges.length >= 5,
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: 'ten-challenges',
      title: 'Dedicated',
      description: 'Complete 10 challenges',
      achieved: progress.completedChallenges.length >= 10,
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      id: 'first-reflection',
      title: 'Self-Aware',
      description: 'Complete your first reflection',
      achieved: progress.reflectionSessions.length >= 1,
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      id: 'first-journey',
      title: 'Journey Begun',
      description: 'Start a guided journey',
      achieved: progress.journeyProgress.length >= 1,
      icon: <Map className="w-5 h-5" />,
    },
    {
      id: 'journey-complete',
      title: 'Journey Master',
      description: 'Complete a guided journey',
      achieved: progress.journeyProgress.some(jp => jp.completedAt !== undefined),
      icon: <PartyPopper className="w-5 h-5" />,
    },
  ];

  const achievedCount = milestones.filter(m => m.achieved).length;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Milestones</h3>
        <span className="text-sm text-gray-500">
          {achievedCount} / {milestones.length} achieved
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {milestones.map(milestone => (
          <div
            key={milestone.id}
            className={`p-3 rounded-lg border-2 transition-all ${
              milestone.achieved
                ? 'border-amber-200 bg-amber-50'
                : 'border-gray-100 bg-gray-50 opacity-60'
            }`}
          >
            <div
              className={`inline-flex items-center justify-center w-9 h-9 rounded-lg mb-2 ${
                milestone.achieved ? 'bg-amber-100 text-orange-700' : 'bg-white text-gray-600'
              }`}
            >
              {milestone.icon}
            </div>
            <p
              className={`font-medium text-sm ${milestone.achieved ? 'text-orange-800' : 'text-gray-600'}`}
            >
              {milestone.title}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{milestone.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProgressDashboard({ onNavigateToSection }: ProgressDashboardProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [totalJourneys, setTotalJourneys] = useState(0);

  useEffect(() => {
    const userProgress = progressService.getProgress();
    setProgress(userProgress);
    setTotalJourneys(dataService.getJourneys().length);
  }, []);

  if (!progress) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-gray-500">Loading progress...</div>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion History */}
        <CompletionHistory progress={progress} maxItems={8} />

        {/* Milestones */}
        <Milestones progress={progress} />
      </div>
    </div>
  );
}

