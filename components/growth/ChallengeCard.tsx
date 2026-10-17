/**
 * ChallengeCard Component
 * Displays a love challenge with title, description, action step, and completion functionality
 * Requirements: 1.1, 1.2, 1.4
 */

import { useRef, useState } from 'react';
import type { Challenge } from '../../types/growth';
import { heartBurst } from '../pl/motion';
import { CARD, CARD_HOVER, INSET, KICKER, LABEL, TAG, titleCase } from './ui';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted?: boolean;
  onComplete?: (challengeId: string, reflection?: string) => void;
}

export default function ChallengeCard({
  challenge,
  isCompleted = false,
  onComplete,
}: ChallengeCardProps) {
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    heartBurst(cardRef.current, e.currentTarget, { count: 16 });
    if (onComplete) {
      onComplete(challenge.id, reflection.trim() || undefined);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${CARD} ${CARD_HOVER} ${isCompleted ? '!bg-pl-yellow' : ''}`}
    >
      {/* Header */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        className="cursor-pointer rounded-[26px] p-[clamp(20px,4vw,32px)]"
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
              <span className={TAG}>{titleCase(challenge.category)}</span>
              <span className={`${KICKER} text-pl-muted`}>
                {challenge.timeframe === 'daily' ? 'Daily' : 'Weekly'}
              </span>
              {isCompleted && <span className="pl-tag bg-pl-ink text-white">✓ Completed</span>}
            </div>
            <h3 className="m-0 text-[clamp(26px,3vw,36px)] font-extrabold leading-[1] tracking-[-0.035em]">
              {challenge.title}
            </h3>
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
        <div className="border-t-2 border-pl-ink px-[clamp(20px,4vw,32px)] pb-[clamp(20px,4vw,32px)]">
          <div className="space-y-5 pt-5">
            {/* Description */}
            <p className="m-0 text-[18px] leading-[1.5] text-pl-body">{challenge.description}</p>

            {/* Action Step */}
            <div className={INSET}>
              <b className={LABEL}>Do this today</b>
              <p className="mb-0 mt-[6px] text-[18px] font-semibold leading-[1.4] text-pl-ink">{challenge.actionStep}</p>
            </div>

            {/* Scripture Reference */}
            {challenge.scriptureReference && (
              <div>
                <b className={LABEL}>Scripture</b>
                <p className="pl-serif mb-0 mt-[6px] text-[22px] leading-[1.25]">{challenge.scriptureReference}</p>
              </div>
            )}

            {/* Completion Section */}
            {!isCompleted && onComplete && (
              <div className="pt-2">
                {!showReflection ? (
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={handleComplete} className="pl-btn pl-btn-red flex-1">
                      Mark complete
                    </button>
                    <button type="button" onClick={() => setShowReflection(true)} className="pl-btn pl-btn-outline">
                      Add reflection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label htmlFor={`challenge-reflection-${challenge.id}`} className="pl-label">
                      Reflection (optional)
                    </label>
                    <textarea
                      id={`challenge-reflection-${challenge.id}`}
                      value={reflection}
                      onChange={e => setReflection(e.target.value)}
                      placeholder="How did this challenge impact you? What did you learn?"
                      className="pl-textarea"
                      rows={3}
                    />
                    <div className="flex flex-wrap gap-3">
                      <button type="button" onClick={handleComplete} className="pl-btn pl-btn-red flex-1">
                        Complete with reflection
                      </button>
                      <button type="button" onClick={() => setShowReflection(false)} className="pl-btn pl-btn-outline">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
