/**
 * JourneyCard Component
 * Displays a journey with title, description, duration, and progress indicator
 * Requirements: 4.1
 */

import { MapPin, Calendar, CheckCircle, Play, ChevronRight } from 'lucide-react';
import type { Journey, JourneyProgress } from '../../types/growth';

interface JourneyCardProps {
  journey: Journey;
  progress?: JourneyProgress | null;
  onStart?: (journeyId: string) => void;
  onContinue?: (journeyId: string) => void;
}

export default function JourneyCard({
  journey,
  progress,
  onStart,
  onContinue,
}: JourneyCardProps) {
  const isStarted = !!progress;
  const isCompleted = progress?.completedAt !== undefined;
  const completedSteps = progress?.completedSteps.length || 0;
  const totalSteps = journey.steps.length;
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

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

  const handleAction = () => {
    if (isCompleted) return;
    if (isStarted && onContinue) {
      onContinue(journey.id);
    } else if (!isStarted && onStart) {
      onStart(journey.id);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isCompleted ? 'ring-2 ring-green-500' : ''
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                  journey.category
                )}`}
              >
                {journey.category.charAt(0).toUpperCase() + journey.category.slice(1)}
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {journey.durationDays} days
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{journey.title}</h3>
          </div>
          {isCompleted && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">{journey.description}</p>

        {/* Progress Bar */}
        {isStarted && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-800">
                {completedSteps} / {totalSteps} steps
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  isCompleted ? 'bg-green-500' : 'bg-orange-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Steps Preview */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{totalSteps} steps in this journey</span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAction}
          disabled={isCompleted}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
            isCompleted
              ? 'bg-green-100 text-green-700 cursor-default'
              : isStarted
              ? 'bg-orange-600 hover:bg-orange-700 text-white'
              : 'bg-gray-800 hover:bg-gray-900 text-white'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Journey Completed
            </>
          ) : isStarted ? (
            <>
              Continue Journey
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Start Journey
            </>
          )}
        </button>
      </div>
    </div>
  );
}
