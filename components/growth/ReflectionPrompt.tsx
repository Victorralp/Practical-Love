/**
 * ReflectionPrompt Component
 * Displays a reflection question with text input for response
 * Requirements: 3.1
 */

import { useState } from 'react';
import type { ReflectionPrompt as ReflectionPromptType } from '../../types/growth';
import { CARD, INSET, KICKER, LABEL, TEXT_LINK, titleCase } from './ui';

interface ReflectionPromptProps {
  prompt: ReflectionPromptType;
  onSubmit: (promptId: string, response: string) => void;
  initialResponse?: string;
}

export default function ReflectionPrompt({
  prompt,
  onSubmit,
  initialResponse = '',
}: ReflectionPromptProps) {
  const [response, setResponse] = useState(initialResponse);
  const [showFollowUp, setShowFollowUp] = useState(false);

  const handleSubmit = () => {
    if (response.trim()) {
      onSubmit(prompt.id, response.trim());
    }
  };

  const isValid = response.trim().length > 0;

  return (
    <div className={`${CARD} overflow-hidden`}>
      {/* Header */}
      <div className="bg-pl-yellow p-[clamp(20px,4vw,32px)]">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="pl-tag bg-white text-pl-ink">{titleCase(prompt.category)}</span>
          <span className={KICKER}>Reflection</span>
        </div>

        {/* Main Question */}
        <h3 className="m-0 text-[clamp(24px,3vw,34px)] font-extrabold leading-[1.1] tracking-[-0.03em]">{prompt.question}</h3>
      </div>

      {/* Response Input */}
      <div className="space-y-4 border-t-2 border-pl-ink p-[clamp(20px,4vw,32px)]">
        <label htmlFor={`reflection-${prompt.id}`} className="sr-only">
          Your response
        </label>
        <textarea
          id={`reflection-${prompt.id}`}
          value={response}
          onChange={e => setResponse(e.target.value)}
          placeholder="Take your time to reflect and write your thoughts..."
          className="pl-textarea min-h-[160px]"
          rows={5}
        />

        {/* Follow-up Question */}
        {prompt.followUp &&
          (!showFollowUp ? (
            <button type="button" onClick={() => setShowFollowUp(true)} className={TEXT_LINK}>
              Show follow-up question
            </button>
          ) : (
            <div className={INSET}>
              <b className={LABEL}>Follow-up</b>
              <p className="pl-serif mb-0 mt-[6px] text-[22px] leading-[1.3]">{prompt.followUp}</p>
            </div>
          ))}

        {/* Submit Button */}
        <button type="button" onClick={handleSubmit} disabled={!isValid} className="pl-btn pl-btn-red w-full">
          Save response
        </button>
      </div>
    </div>
  );
}
