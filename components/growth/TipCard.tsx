/**
 * TipCard Component
 * Displays a growth tip with title, category, summary, and expandable content with exercises
 * Requirements: 2.2
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import type { GrowthTip } from '../../types/growth';
import ExerciseSteps from './ExerciseSteps';

interface TipCardProps {
  tip: GrowthTip;
}

export default function TipCard({ tip }: TipCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      patience: 'bg-orange-100 text-red-800 border-orange-200',
      kindness: 'bg-amber-100 text-orange-800 border-amber-200',
      forgiveness: 'bg-orange-100 text-red-800 border-orange-200',
      empathy: 'bg-red-100 text-red-800 border-red-200',
      humility: 'bg-amber-100 text-amber-800 border-amber-200',
      trust: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      perseverance: 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Header - Always visible */}
      <div className="p-6 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(tip.category)}`}
              >
                {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <Lightbulb className="w-4 h-4 mr-1" />
                {tip.exercises.length} exercise{tip.exercises.length !== 1 ? 's' : ''}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{tip.title}</h3>
            <p className="text-gray-600">{tip.summary}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
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
          <div className="pt-4 space-y-6">
            {/* Full Content */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed">{tip.content}</p>
            </div>

            {/* Exercises */}
            {tip.exercises.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📝</span>
                  Practical Exercises
                </h4>
                <div className="space-y-4">
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


