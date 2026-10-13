/**
 * SelfReflectionSection Component
 * Main section for self-reflection with guided questions, response saving, and history
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

import { useState, useMemo, useRef } from 'react';
import type {
  ReflectionPrompt as ReflectionPromptType,
  ReflectionEntry,
  ReflectionSession,
  LoveCategory,
} from '../../types/growth';
import { reflectionPrompts } from '../../data/reflectionPrompts';
import { progressService } from '../../services/progressService';
import ReflectionPrompt from './ReflectionPrompt';
import ReflectionHistory from './ReflectionHistory';
import { usePopOnChange } from '../pl/motion';
import { CARD, FILL, INSET, KICKER, LABEL, TEXT_LINK, TRACK } from './ui';

type ViewMode = 'start' | 'session' | 'summary' | 'history';

interface CategoryOption {
  value: LoveCategory | 'all';
  label: string;
}

const categoryOptions: CategoryOption[] = [
  { value: 'all', label: 'All' },
  { value: 'patience', label: 'Patience' },
  { value: 'kindness', label: 'Kindness' },
  { value: 'forgiveness', label: 'Forgiveness' },
  { value: 'empathy', label: 'Empathy' },
  { value: 'humility', label: 'Humility' },
  { value: 'trust', label: 'Trust' },
  { value: 'perseverance', label: 'Perseverance' },
];

export default function SelfReflectionSection() {
  const [viewMode, setViewMode] = useState<ViewMode>('start');
  const [selectedCategory, setSelectedCategory] = useState<LoveCategory | 'all'>('all');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [sessionEntries, setSessionEntries] = useState<ReflectionEntry[]>([]);
  const [sessionPrompts, setSessionPrompts] = useState<ReflectionPromptType[]>([]);
  const viewRef = useRef<HTMLDivElement | null>(null);

  // Each view change, and each new question, rises in.
  usePopOnChange(viewRef, `${viewMode}-${currentPromptIndex}`, [
    { transform: 'translateY(24px)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ]);

  // Get user progress for history
  const progress = progressService.getProgress();

  // Filter prompts by category
  const filteredPrompts = useMemo(() => {
    if (selectedCategory === 'all') {
      return reflectionPrompts;
    }
    return reflectionPrompts.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  // Get random prompts for a session (3 prompts)
  const getSessionPrompts = (): ReflectionPromptType[] => {
    const shuffled = [...filteredPrompts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(3, shuffled.length));
  };

  const startSession = () => {
    const prompts = getSessionPrompts();
    setSessionPrompts(prompts);
    setCurrentPromptIndex(0);
    setSessionEntries([]);
    setViewMode('session');
  };

  const handlePromptSubmit = (promptId: string, response: string) => {
    const entry: ReflectionEntry = {
      id: `entry-${Date.now()}-${currentPromptIndex}`,
      promptId,
      response,
      createdAt: new Date().toISOString(),
    };

    const newEntries = [...sessionEntries, entry];
    setSessionEntries(newEntries);

    // Move to next prompt or show summary
    if (currentPromptIndex < sessionPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    } else {
      // Session complete - save and show summary
      const session: ReflectionSession = {
        id: `session-${Date.now()}`,
        entries: newEntries,
        completedAt: new Date().toISOString(),
      };
      progressService.saveReflectionSession(session);
      setViewMode('summary');
    }
  };

  const resetSession = () => {
    setViewMode('start');
    setCurrentPromptIndex(0);
    setSessionEntries([]);
    setSessionPrompts([]);
  };

  const currentPrompt = sessionPrompts[currentPromptIndex];

  // Start View
  if (viewMode === 'start') {
    return (
      <div ref={viewRef} className="space-y-6">
        <p className="m-0 max-w-[52ch] text-[18px] leading-[1.5] text-pl-body">
          Take time to examine your thoughts and growth through guided reflection questions.
        </p>

        {/* Start Session Card */}
        <div className={`${CARD} p-[clamp(20px,4vw,40px)]`}>
          <h3 className="m-0 text-[clamp(26px,3vw,36px)] font-extrabold leading-[1] tracking-[-0.035em]">
            Begin a reflection <span className="pl-serif font-normal text-pl-red">session</span>
          </h3>
          <p className="mb-0 mt-3 text-[17px] leading-[1.5] text-pl-body">
            Answer 3 guided questions to explore your thoughts and feelings.
          </p>

          {/* Category Selection */}
          <div className="mt-6">
            <p id="reflection-focus" className={`${KICKER} mb-3 mt-0 text-pl-muted`}>
              Focus area (optional)
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="reflection-focus">
              {categoryOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selectedCategory === option.value}
                  onClick={() => setSelectedCategory(option.value)}
                  className="pl-chip"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startSession}
              disabled={filteredPrompts.length === 0}
              className="pl-btn pl-btn-red flex-1"
            >
              Start session
            </button>
            <button type="button" onClick={() => setViewMode('history')} className="pl-btn pl-btn-outline flex-1">
              View history
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        {progress.reflectionSessions.length > 0 && (
          <div className="rounded-[24px] bg-pl-yellow p-5 text-pl-ink">
            <p className="m-0 text-[18px] font-bold">
              You've completed {progress.reflectionSessions.length} reflection session
              {progress.reflectionSessions.length !== 1 ? 's' : ''}.
            </p>
            <p className="mb-0 mt-1 text-[15px]">Keep reflecting to deepen your self-awareness and growth.</p>
          </div>
        )}
      </div>
    );
  }

  // Session View
  if (viewMode === 'session' && currentPrompt) {
    return (
      <div ref={viewRef} className="space-y-5">
        {/* Progress Indicator */}
        <div>
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className={`${KICKER} text-pl-muted`} aria-live="polite">
              Question {currentPromptIndex + 1} of {sessionPrompts.length}
            </span>
            <button type="button" onClick={resetSession} className={TEXT_LINK}>
              Start over
            </button>
          </div>
          <div className={TRACK}>
            <div
              className={FILL}
              style={{ width: `${((currentPromptIndex + 1) / sessionPrompts.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Prompt */}
        <ReflectionPrompt prompt={currentPrompt} onSubmit={handlePromptSubmit} />
      </div>
    );
  }

  // Summary View
  if (viewMode === 'summary') {
    return (
      <div ref={viewRef} className="space-y-5">
        {/* Success Header */}
        <div role="status" className="rounded-[28px] bg-pl-red p-[clamp(24px,4vw,40px)] text-white">
          <h3 className="m-0 text-[clamp(30px,4vw,48px)] font-extrabold leading-[.95] tracking-[-0.04em]">
            Session complete. <span className="pl-serif font-normal">Well done.</span>
          </h3>
          <p className="mb-0 mt-3 text-[17px] text-white/90">
            Great job taking time for self-reflection. Here's a summary of your responses.
          </p>
        </div>

        {/* Summary of Responses */}
        <div className="space-y-3">
          {sessionEntries.map((entry, index) => {
            const prompt = sessionPrompts.find(p => p.id === entry.promptId);
            return (
              <div key={entry.id} className={`${CARD} p-[clamp(20px,4vw,28px)]`}>
                <span className={`${KICKER} text-pl-muted`}>Question {index + 1}</span>
                <p className="mb-3 mt-1 text-[18px] font-semibold leading-[1.4]">{prompt?.question}</p>
                <div className={INSET}>
                  <b className={LABEL}>Your response</b>
                  <p className="mb-0 mt-1 whitespace-pre-wrap text-[16px] leading-[1.5] text-pl-body">{entry.response}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={startSession} className="pl-btn pl-btn-red flex-1">
            Start new session
          </button>
          <button type="button" onClick={() => setViewMode('history')} className="pl-btn pl-btn-outline flex-1">
            View all history
          </button>
          <button type="button" onClick={resetSession} className="pl-btn pl-btn-outline flex-1">
            Back to start
          </button>
        </div>
      </div>
    );
  }

  // History View
  if (viewMode === 'history') {
    return (
      <div ref={viewRef} className="space-y-6">
        {/* Back Button */}
        <button type="button" onClick={resetSession} className={TEXT_LINK}>
          ← Back to reflection
        </button>

        {/* History Component */}
        <ReflectionHistory sessions={progress.reflectionSessions} prompts={reflectionPrompts} />

        {/* Start New Session Button */}
        <div className="text-center">
          <button type="button" onClick={startSession} className="pl-btn pl-btn-red">
            Start new session
          </button>
        </div>
      </div>
    );
  }

  return null;
}
