/**
 * JourneyStep Component
 * Displays step content, scripture, action item with completion button
 * Requirements: 4.2, 4.4
 */

import { useRef } from 'react';
import type { JourneyStep as JourneyStepType } from '../../types/growth';
import { heartBurst } from '../pl/motion';
import { CARD, INSET, KICKER, LABEL } from './ui';

interface JourneyStepProps {
  step: JourneyStepType;
  isCompleted?: boolean;
  isActive?: boolean;
  onComplete?: (stepIndex: number) => void;
}

export default function JourneyStep({
  step,
  isCompleted = false,
  isActive = false,
  onComplete,
}: JourneyStepProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onComplete && !isCompleted) {
      heartBurst(cardRef.current, e.currentTarget, { count: 16 });
      onComplete(step.dayNumber - 1); // Convert to 0-based index
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${CARD} ${
        isCompleted ? '!bg-pl-yellow' : isActive ? 'shadow-[10px_10px_0_#e1251b]' : 'opacity-75'
      }`}
    >
      <div className="p-[clamp(20px,4vw,32px)]">
        {/* Header */}
        <div className="mb-5 flex items-start gap-4">
          <div
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-[18px] font-extrabold ${
              isCompleted ? 'bg-pl-ink text-white' : isActive ? 'bg-pl-red text-white' : 'bg-pl-hair text-pl-muted'
            }`}
          >
            {isCompleted ? '✓' : step.dayNumber}
          </div>
          <div className="min-w-0">
            <span className={`${KICKER} ${isCompleted ? 'text-pl-ink' : 'text-pl-red'}`}>
              Day {step.dayNumber}
              {isCompleted && ' · Completed'}
            </span>
            <h3 className="mb-0 mt-1 text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
              {step.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5">
          <p className="m-0 text-[18px] leading-[1.6] text-pl-body">{step.content}</p>

          {/* Scripture Reference */}
          {step.scriptureReference && (
            <div>
              <b className={LABEL}>Scripture</b>
              <p className="pl-serif mb-0 mt-[6px] text-[22px] leading-[1.25]">{step.scriptureReference}</p>
            </div>
          )}

          {/* Action Item */}
          <div className={isCompleted ? 'rounded-[20px] bg-white p-5' : INSET}>
            <b className={LABEL}>Today's action</b>
            <p className="mb-0 mt-[6px] text-[18px] font-semibold leading-[1.4]">{step.actionItem}</p>
          </div>

          {/* Completion Button */}
          {isActive && !isCompleted && onComplete && (
            <button type="button" onClick={handleComplete} className="pl-btn pl-btn-red w-full">
              Mark day {step.dayNumber} complete
            </button>
          )}

          {isCompleted && (
            <p className="m-0 text-center text-[16px] font-semibold">
              You've completed this day's journey <span className="text-pl-red">♥</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
