/**
 * JourneyCard Component
 * Displays a journey with title, description, duration, and progress indicator
 * Requirements: 4.1
 */

import type { Journey, JourneyProgress } from '../../types/growth';
import { CARD, CARD_HOVER, FILL, KICKER, TAG, TRACK, titleCase } from './ui';

interface JourneyCardProps {
  journey: Journey;
  progress?: JourneyProgress | null;
  onStart?: (journeyId: string) => void;
  onContinue?: (journeyId: string) => void;
}

export default function JourneyCard({ journey, progress, onStart, onContinue }: JourneyCardProps) {
  const isStarted = !!progress;
  const isCompleted = progress?.completedAt !== undefined;
  const completedSteps = progress?.completedSteps.length || 0;
  const totalSteps = journey.steps.length;
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const handleAction = () => {
    if (isCompleted) return;
    if (isStarted && onContinue) {
      onContinue(journey.id);
    } else if (!isStarted && onStart) {
      onStart(journey.id);
    }
  };

  return (
    <div
      data-card
      className={`flex flex-col p-[clamp(20px,3vw,28px)] ${CARD} ${CARD_HOVER} ${isCompleted ? '!bg-pl-yellow' : ''}`}
    >
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={isCompleted ? 'pl-tag bg-white text-pl-ink' : TAG}>{titleCase(journey.category)}</span>
        <span className={`${KICKER} text-pl-muted`}>{journey.durationDays} days</span>
        {isCompleted && <span className="pl-tag bg-pl-ink text-white">✓ Done</span>}
      </div>
      <h3 className="m-0 text-[clamp(24px,2.6vw,30px)] font-extrabold leading-[1.02] tracking-[-0.035em]">{journey.title}</h3>

      {/* Description */}
      <p className="mb-0 mt-3 text-[16px] leading-[1.5] text-pl-body">{journey.description}</p>

      <div className="mt-auto pt-5">
        {/* Progress Bar */}
        {isStarted ? (
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between text-[14px]">
              <span className="text-pl-muted">Progress</span>
              <span className="font-bold">
                {completedSteps} / {totalSteps} steps
              </span>
            </div>
            <div className={TRACK}>
              <div className={FILL} style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        ) : (
          <p className="mb-4 mt-0 text-[14px] text-pl-muted">{totalSteps} steps in this journey</p>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={handleAction}
          disabled={isCompleted}
          className={`pl-btn w-full ${isCompleted ? 'pl-btn-white !opacity-100' : isStarted ? 'pl-btn-red' : 'pl-btn-ink'}`}
        >
          {isCompleted ? 'Journey completed' : isStarted ? 'Continue journey →' : 'Start journey'}
        </button>
      </div>
    </div>
  );
}
