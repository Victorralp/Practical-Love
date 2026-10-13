/**
 * ExerciseSteps Component
 * Displays numbered steps with duration for a practical exercise
 * Requirements: 2.4
 */

import type { Exercise } from '../../types/growth';
import { INSET, KICKER } from './ui';

interface ExerciseStepsProps {
  exercise: Exercise;
}

export default function ExerciseSteps({ exercise }: ExerciseStepsProps) {
  return (
    <div className={INSET}>
      {/* Exercise Header */}
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h5 className="m-0 text-[18px] font-extrabold tracking-[-0.02em]">{exercise.title}</h5>
        <span className={`${KICKER} text-pl-deep`}>{exercise.duration}</span>
      </div>

      {/* Numbered Steps */}
      <ol className="m-0 list-none space-y-3 p-0">
        {exercise.steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-pl-ink text-[13px] font-bold text-white">
              {index + 1}
            </span>
            <span className="text-[16px] leading-[1.5] text-pl-body">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
