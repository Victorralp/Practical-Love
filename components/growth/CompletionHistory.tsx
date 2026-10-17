/**
 * CompletionHistory Component
 * Visual timeline of completed activities
 * Requirements: 5.2
 */

import type {
  UserProgress,
  ChallengeCompletion,
  ReflectionSession,
  JourneyProgress,
} from '../../types/growth';
import { CARD, KICKER } from './ui';

interface CompletionHistoryProps {
  progress: UserProgress;
  maxItems?: number;
}

type ActivityType = 'challenge' | 'reflection' | 'journey_step' | 'journey_complete';

interface TimelineItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  date: string;
  color: string;
}

/**
 * Format a date string for display
 */
function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a relative time string
 */
function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return formatDate(isoDate);
}

/**
 * Convert progress data into timeline items
 */
function buildTimelineItems(progress: UserProgress): TimelineItem[] {
  const items: TimelineItem[] = [];

  // Add challenge completions
  progress.completedChallenges.forEach((completion: ChallengeCompletion, index: number) => {
    items.push({
      id: `challenge-${completion.challengeId}-${index}`,
      type: 'challenge',
      title: 'Challenge completed',
      description: completion.reflection || undefined,
      date: completion.completedAt,
      color: 'bg-pl-red',
    });
  });

  // Add reflection sessions
  progress.reflectionSessions.forEach((session: ReflectionSession) => {
    items.push({
      id: `reflection-${session.id}`,
      type: 'reflection',
      title: 'Reflection session',
      description: `${session.entries.length} reflection${session.entries.length !== 1 ? 's' : ''} completed`,
      date: session.completedAt,
      color: 'bg-pl-yellow',
    });
  });

  // Add journey progress
  progress.journeyProgress.forEach((jp: JourneyProgress) => {
    // Add completed journey if applicable
    if (jp.completedAt) {
      items.push({
        id: `journey-complete-${jp.journeyId}`,
        type: 'journey_complete',
        title: 'Journey completed',
        description: 'Finished all steps',
        date: jp.completedAt,
        color: 'bg-pl-ink',
      });
    }
  });

  // Sort by date (most recent first)
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return items;
}

export default function CompletionHistory({ progress, maxItems = 10 }: CompletionHistoryProps) {
  const timelineItems = buildTimelineItems(progress).slice(0, maxItems);

  if (timelineItems.length === 0) {
    return null;
  }

  return (
    <div className={`${CARD} p-[clamp(20px,3vw,28px)]`}>
      <h3 className="mb-5 mt-0 text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.03em]">Recent activity</h3>

      <ol className="relative m-0 list-none space-y-4 p-0">
        {/* Timeline line */}
        <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-pl-hair2" />

        {timelineItems.map(item => (
          <li key={item.id} className="relative flex items-start gap-4 pl-8">
            {/* Timeline dot */}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-[3px] h-4 w-4 rounded-full border-2 border-pl-ink ${item.color}`}
            />

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="m-0 text-[16px] font-bold">{item.title}</p>
                <span className={`${KICKER} whitespace-nowrap text-pl-muted`}>{formatRelativeTime(item.date)}</span>
              </div>
              {item.description && <p className="mb-0 mt-1 truncate text-[15px] text-pl-body">{item.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
