/**
 * CompletionHistory Component
 * Visual timeline of completed activities
 * Requirements: 5.2
 */

import { CheckCircle, BookOpen, MapPin, Calendar } from 'lucide-react';
import type { UserProgress, ChallengeCompletion, ReflectionSession, JourneyProgress } from '../../types/growth';

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
  icon: React.ReactNode;
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
      title: 'Challenge Completed',
      description: completion.reflection || undefined,
      date: completion.completedAt,
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'bg-green-500',
    });
  });

  // Add reflection sessions
  progress.reflectionSessions.forEach((session: ReflectionSession) => {
    items.push({
      id: `reflection-${session.id}`,
      type: 'reflection',
      title: 'Reflection Session',
      description: `${session.entries.length} reflection${session.entries.length !== 1 ? 's' : ''} completed`,
      date: session.completedAt,
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-purple-500',
    });
  });

  // Add journey progress
  progress.journeyProgress.forEach((jp: JourneyProgress) => {
    // Add completed journey if applicable
    if (jp.completedAt) {
      items.push({
        id: `journey-complete-${jp.journeyId}`,
        type: 'journey_complete',
        title: 'Journey Completed',
        description: 'Finished all steps',
        date: jp.completedAt,
        icon: <MapPin className="w-5 h-5" />,
        color: 'bg-amber-500',
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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-gray-500" />
        Recent Activity
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        {/* Timeline items */}
        <div className="space-y-4">
          {timelineItems.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4 pl-10">
              {/* Timeline dot */}
              <div className={`absolute left-2 w-5 h-5 rounded-full ${item.color} text-white flex items-center justify-center -translate-x-1/2`}>
                {item.icon}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatRelativeTime(item.date)}
                  </span>
                </div>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1 truncate">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
