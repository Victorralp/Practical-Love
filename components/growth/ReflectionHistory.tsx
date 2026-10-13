/**
 * ReflectionHistory Component
 * Displays previous reflection entries with dates
 * Requirements: 3.4
 */

import { useState } from 'react';
import type { ReflectionSession, ReflectionPrompt } from '../../types/growth';
import { CARD, CARD_HOVER, INSET, KICKER, LABEL } from './ui';

interface ReflectionHistoryProps {
  sessions: ReflectionSession[];
  prompts: ReflectionPrompt[];
}

export default function ReflectionHistory({ sessions, prompts }: ReflectionHistoryProps) {
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  // Sort sessions by date, most recent first
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getPromptById = (promptId: string): ReflectionPrompt | undefined => {
    return prompts.find(p => p.id === promptId);
  };

  const toggleSession = (sessionId: string) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  if (sortedSessions.length === 0) {
    return (
      <div className="rounded-[28px] border-2 border-dashed border-pl-input px-6 py-12 text-center">
        <h3 className="m-0 text-[24px] font-extrabold tracking-[-0.02em]">No reflections yet</h3>
        <p className="mb-0 mt-2 text-[17px] text-pl-muted">
          Start your first reflection session to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="m-0 text-[clamp(24px,2.6vw,32px)] font-extrabold tracking-[-0.03em]">Reflection history</h3>
        <span className="text-[15px] text-pl-muted">
          {sortedSessions.length} session{sortedSessions.length !== 1 ? 's' : ''}
        </span>
      </div>

      {sortedSessions.map(session => {
        const isOpen = expandedSession === session.id;
        return (
          <div key={session.id} className={`${CARD} ${CARD_HOVER} overflow-hidden`}>
            {/* Session Header */}
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleSession(session.id)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="min-w-0">
                <span className="block text-[18px] font-bold tracking-[-0.01em]">{formatDate(session.completedAt)}</span>
                <span className={`${KICKER} mt-1 block text-pl-muted`}>
                  {formatTime(session.completedAt)} · {session.entries.length} reflection
                  {session.entries.length !== 1 ? 's' : ''}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`pl-serif text-[26px] leading-none transition-transform duration-300 motion-reduce:transition-none ${
                  isOpen ? 'rotate-90' : ''
                }`}
              >
                →
              </span>
            </button>

            {/* Expanded Entries */}
            {isOpen && (
              <div className="space-y-5 border-t-2 border-pl-ink p-5">
                {session.entries.map((entry, index) => {
                  const prompt = getPromptById(entry.promptId);
                  return (
                    <div key={entry.id}>
                      <span className={`${KICKER} text-pl-muted`}>Question {index + 1}</span>
                      <p className="mb-3 mt-1 text-[18px] font-semibold leading-[1.4]">
                        {prompt?.question || 'Question not found'}
                      </p>
                      <div className={INSET}>
                        <b className={LABEL}>Your response</b>
                        <p className="mb-0 mt-1 whitespace-pre-wrap text-[16px] leading-[1.5] text-pl-body">{entry.response}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
