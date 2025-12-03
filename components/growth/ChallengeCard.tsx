/**
 * ChallengeCard Component
 * Displays a love challenge with title, description, action step, and completion functionality
 * Requirements: 1.1, 1.2, 1.4
 */

import { useState } from 'react';
import { CheckCircle, Clock, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import type { Challenge } from '../../types/growth';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted?: boolean;
  onComplete?: (challengeId: string, reflection?: string) => void;
}

export default function ChallengeCard({ 
  challenge, 
  isCompleted = false, 
  onComplete 
}: ChallengeCardProps) {
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleComplete = () => {
    if (onComplete) {
      onComplete(challenge.id, reflection.trim() || undefined);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      patience: 'bg-blue-100 text-blue-800 border-blue-200',
      kindness: 'bg-green-100 text-green-800 border-green-200',
      forgiveness: 'bg-purple-100 text-purple-800 border-purple-200',
      empathy: 'bg-pink-100 text-pink-800 border-pink-200',
      humility: 'bg-amber-100 text-amber-800 border-amber-200',
      trust: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      perseverance: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
      isCompleted ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-xl'
    }`}>
      {/* Header */}
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(challenge.category)}`}>
                {challenge.category.charAt(0).toUpperCase() + challenge.category.slice(1)}
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {challenge.timeframe === 'daily' ? 'Daily' : 'Weekly'}
              </span>
              {isCompleted && (
                <span className="flex items-center text-sm text-green-600 font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Completed
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{challenge.title}</h3>
          </div>
          <div className="ml-4">
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="pt-4 space-y-4">
            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{challenge.description}</p>

            {/* Action Step */}
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                <span className="mr-2">🎯</span>
                Action Step
              </h4>
              <p className="text-orange-700 text-sm">{challenge.actionStep}</p>
            </div>

            {/* Scripture Reference */}
            {challenge.scriptureReference && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Scripture
                </h4>
                <p className="text-blue-700 text-sm italic">{challenge.scriptureReference}</p>
              </div>
            )}

            {/* Completion Section */}
            {!isCompleted && onComplete && (
              <div className="pt-4 border-t border-gray-100">
                {!showReflection ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleComplete}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Mark Complete
                    </button>
                    <button
                      onClick={() => setShowReflection(true)}
                      className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Add Reflection
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Reflection (optional)
                    </label>
                    <textarea
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      placeholder="How did this challenge impact you? What did you learn?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                      rows={3}
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleComplete}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Complete with Reflection
                      </button>
                      <button
                        onClick={() => setShowReflection(false)}
                        className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
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
