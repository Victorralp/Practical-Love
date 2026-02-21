/**
 * ReflectionHistory Component
 * Displays previous reflection entries with dates
 * Requirements: 3.4
 */

import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, MessageSquare, Clock } from 'lucide-react';
import type { ReflectionSession, ReflectionPrompt } from '../../types/growth';

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
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Reflections Yet</h3>
        <p className="text-gray-500">
          Start your first reflection session to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-800">Reflection History</h3>
        <span className="text-sm text-gray-500">({sortedSessions.length} sessions)</span>
      </div>

      {sortedSessions.map(session => (
        <div
          key={session.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
        >
          {/* Session Header */}
          <div
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSession(session.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 rounded-full p-2">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{formatDate(session.completedAt)}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTime(session.completedAt)} • {session.entries.length} reflection
                    {session.entries.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div>
                {expandedSession === session.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Expanded Entries */}
          {expandedSession === session.id && (
            <div className="border-t border-gray-100 p-4 space-y-4 bg-gray-50">
              {session.entries.map((entry, index) => {
                const prompt = getPromptById(entry.promptId);
                return (
                  <div key={entry.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="mb-3">
                      <span className="text-xs font-medium text-gray-400 uppercase">
                        Question {index + 1}
                      </span>
                      <p className="text-gray-700 font-medium mt-1">
                        {prompt?.question || 'Question not found'}
                      </p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                      <span className="text-xs font-medium text-orange-600 uppercase">
                        Your Response
                      </span>
                      <p className="text-gray-700 mt-1 whitespace-pre-wrap">{entry.response}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

