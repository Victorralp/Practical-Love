/**
 * ProgressStats Component
 * Displays counts of completed challenges, reflections, and journey milestones
 * Requirements: 5.1
 */

import { CheckCircle, BookOpen, MapPin, Trophy } from 'lucide-react';
import type { UserProgress, JourneyProgress } from '../../types/growth';

interface ProgressStatsProps {
  progress: UserProgress;
  totalJourneys?: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

/**
 * Calculate the number of completed journeys from progress data
 */
function countCompletedJourneys(journeyProgress: JourneyProgress[]): number {
  return journeyProgress.filter(jp => jp.completedAt !== undefined).length;
}

/**
 * Calculate total journey milestones (completed steps across all journeys)
 */
function countJourneyMilestones(journeyProgress: JourneyProgress[]): number {
  return journeyProgress.reduce((total, jp) => total + jp.completedSteps.length, 0);
}

export default function ProgressStats({ progress, totalJourneys = 0 }: ProgressStatsProps) {
  const completedChallenges = progress.completedChallenges.length;
  const reflectionSessions = progress.reflectionSessions.length;
  const completedJourneys = countCompletedJourneys(progress.journeyProgress);
  const journeyMilestones = countJourneyMilestones(progress.journeyProgress);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<CheckCircle className="w-6 h-6 text-green-600" />}
        label="Challenges Completed"
        value={completedChallenges}
        color="bg-green-100"
      />
      <StatCard
        icon={<BookOpen className="w-6 h-6 text-purple-600" />}
        label="Reflection Sessions"
        value={reflectionSessions}
        color="bg-purple-100"
      />
      <StatCard
        icon={<MapPin className="w-6 h-6 text-blue-600" />}
        label="Journey Milestones"
        value={journeyMilestones}
        color="bg-blue-100"
      />
      <StatCard
        icon={<Trophy className="w-6 h-6 text-amber-600" />}
        label="Journeys Completed"
        value={completedJourneys}
        color="bg-amber-100"
      />
    </div>
  );
}
