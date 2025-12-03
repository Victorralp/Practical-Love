/**
 * SelfReflectionSection Component
 * Main section for self-reflection with guided questions, response saving, and history
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

import { useState, useMemo } from 'react';
import { Sparkles, History, Play, CheckCircle, RotateCcw } from 'lucide-react';
import type { ReflectionPrompt as ReflectionPromptType, ReflectionEntry, ReflectionSession, LoveCategory } from '../../types/growth';
import { reflectionPrompts } from '../../data/reflectionPrompts';
import { progressService } from '../../services/progressService';
import ReflectionPrompt from './ReflectionPrompt';
import ReflectionHistory from './ReflectionHistory';

type ViewMode = 'start' | 'session' | 'summary' | 'history';

interface CategoryOption {
  value: LoveCategory | 'all';
  label: string;
}

const categoryOptions: CategoryOption[] = [
  { value: 'all', label: 'All Categories' },
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

  // Get user progress for history
  const progress = progressService.getProgress();


  // Filter prompts by category
  const filteredPrompts = useMemo(() => {
    if (selectedCategory === 'all') {
      return reflectionPrompts;
    }
    return reflectionPrompts.filter((p) => p.category === selectedCategory);
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
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Self-Reflection</h2>
          <p className="text-gray-600">
            Take time to examine your thoughts and growth through guided reflection questions.
          </p>
        </div>

        {/* Start Session Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Begin a Reflection Session</h3>
            <p className="text-gray-600">
              Answer 3 guided questions to explore your thoughts and feelings.
            </p>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Focus Area (Optional)
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as LoveCategory | 'all')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={startSession}
              disabled={filteredPrompts.length === 0}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Session
            </button>
            <button
              onClick={() => setViewMode('history')}
              className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <History className="w-5 h-5 mr-2" />
              View History
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        {progress.reflectionSessions.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
            <p className="text-orange-800 font-medium">
              You've completed {progress.reflectionSessions.length} reflection session
              {progress.reflectionSessions.length !== 1 ? 's' : ''}.
            </p>
            <p className="text-orange-600 text-sm mt-1">
              Keep reflecting to deepen your self-awareness and growth!
            </p>
          </div>
        )}
      </div>
    );
  }


  // Session View
  if (viewMode === 'session' && currentPrompt) {
    return (
      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentPromptIndex + 1} of {sessionPrompts.length}
            </span>
            <button
              onClick={resetSession}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Start Over
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPromptIndex + 1) / sessionPrompts.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Prompt */}
        <ReflectionPrompt
          prompt={currentPrompt}
          onSubmit={handlePromptSubmit}
        />
      </div>
    );
  }

  // Summary View
  if (viewMode === 'summary') {
    return (
      <div className="space-y-6">
        {/* Success Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Session Complete!</h3>
          <p className="text-gray-600 mb-6">
            Great job taking time for self-reflection. Here's a summary of your responses.
          </p>
        </div>

        {/* Summary of Responses */}
        <div className="space-y-4">
          {sessionEntries.map((entry, index) => {
            const prompt = sessionPrompts.find((p) => p.id === entry.promptId);
            return (
              <div key={entry.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-3">
                  <span className="text-xs font-medium text-gray-400 uppercase">
                    Question {index + 1}
                  </span>
                  <p className="text-gray-700 font-medium mt-1">
                    {prompt?.question}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                  <span className="text-xs font-medium text-orange-600 uppercase">
                    Your Response
                  </span>
                  <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                    {entry.response}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={startSession}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Start New Session
          </button>
          <button
            onClick={() => setViewMode('history')}
            className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <History className="w-5 h-5 mr-2" />
            View All History
          </button>
          <button
            onClick={resetSession}
            className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Start
          </button>
        </div>
      </div>
    );
  }

  // History View
  if (viewMode === 'history') {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={resetSession}
          className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
        >
          ← Back to Reflection
        </button>

        {/* History Component */}
        <ReflectionHistory
          sessions={progress.reflectionSessions}
          prompts={reflectionPrompts}
        />

        {/* Start New Session Button */}
        <div className="text-center">
          <button
            onClick={startSession}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Start New Session
          </button>
        </div>
      </div>
    );
  }

  return null;
}
