/**
 * ProgressStats Component
 * Displays counts of completed challenges, reflections, and journey milestones
 * Requirements: 5.1
 */

import type { UserProgress, JourneyProgress } from '../../types/growth';
import { useCountUp, useInView } from '../pl/motion';

interface ProgressStatsProps {
  progress: UserProgress;
  totalJourneys?: number;
}

interface StatCardProps {
  label: string;
  value: number;
  tone: string;
  start: boolean;
}

function StatCard({ label, value, tone, start }: StatCardProps) {
  const shown = useCountUp(value, { start });
  return (
    <div className={`rounded-[24px] px-6 py-5 ${tone}`}>
      <p className="m-0 text-[48px] font-extrabold leading-none tracking-[-0.04em]">{shown}</p>
      <p className="mb-0 mt-2 text-[15px] font-semibold opacity-85">{label}</p>
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

export default function ProgressStats({ progress }: ProgressStatsProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const completedChallenges = progress.completedChallenges.length;
  const reflectionSessions = progress.reflectionSessions.length;
  const completedJourneys = countCompletedJourneys(progress.journeyProgress);
  const journeyMilestones = countJourneyMilestones(progress.journeyProgress);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
      <StatCard label="Challenges completed" value={completedChallenges} tone="bg-pl-red text-white" start={inView} />
      <StatCard label="Reflection sessions" value={reflectionSessions} tone="bg-pl-yellow text-pl-ink" start={inView} />
      <StatCard label="Journey milestones" value={journeyMilestones} tone="bg-pl-ink text-white" start={inView} />
      <StatCard
        label="Journeys completed"
        value={completedJourneys}
        tone="border-2 border-pl-ink bg-white text-pl-ink"
        start={inView}
      />
    </div>
  );
}
