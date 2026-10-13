/**
 * TipCard Component
 * Displays a growth tip with title, category, summary, and expandable content with exercises
 * Requirements: 2.2
 */

import { useState } from 'react';
import type { GrowthTip } from '../../types/growth';
import ExerciseSteps from './ExerciseSteps';
import { CARD, CARD_HOVER, KICKER, LABEL, TAG, titleCase } from './ui';

interface TipCardProps {
  tip: GrowthTip;
}

export default function TipCard({ tip }: TipCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div data-card className={`${CARD} ${CARD_HOVER}`}>
      {/* Header - Always visible */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        className="cursor-pointer rounded-[26px] p-[clamp(20px,4vw,28px)]"
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={TAG}>{titleCase(tip.category)}</span>
              <span className={`${KICKER} text-pl-muted`}>
                {tip.exercises.length} exercise{tip.exercises.length !== 1 ? 's' : ''}
              </span>
            </div>
            <h3 className="m-0 text-[clamp(22px,2.4vw,28px)] font-extrabold leading-[1.05] tracking-[-0.03em]">{tip.title}</h3>
            <p className="mb-0 mt-2 text-[17px] leading-[1.45] text-pl-body">{tip.summary}</p>
          </div>
          <span
            aria-hidden="true"
            className={`pl-serif text-[28px] leading-none transition-transform duration-300 motion-reduce:transition-none ${
              isExpanded ? 'rotate-90' : ''
            }`}
          >
            →
          </span>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t-2 border-pl-ink px-[clamp(20px,4vw,28px)] pb-[clamp(20px,4vw,28px)]">
          <div className="space-y-6 pt-5">
            {/* Full Content */}
            <p className="m-0 text-[18px] leading-[1.6] text-pl-body">{tip.content}</p>

            {/* Exercises */}
            {tip.exercises.length > 0 && (
              <div>
                <h4 className={`${LABEL} mb-3 mt-0`}>Practical exercises</h4>
                <div className="space-y-3">
                  {tip.exercises.map(exercise => (
                    <ExerciseSteps key={exercise.id} exercise={exercise} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
