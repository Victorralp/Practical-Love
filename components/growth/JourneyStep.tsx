/**
 * JourneyStep Component
 * Displays step content, scripture, action item with completion button
 * Requirements: 4.2, 4.4
 */

import { CheckCircle, BookOpen, Target, Calendar } from 'lucide-react';
import type { JourneyStep as JourneyStepType } from '../../types/growth';

interface JourneyStepProps {
  step: JourneyStepType;
  isCompleted?: boolean;
  isActive?: boolean;
  onComplete?: (stepIndex: number) => void;
}

export default function JourneyStep({
  step,
  isCompleted = false,
  isActive = false,
  onComplete,
}: JourneyStepProps) {
  const handleComplete = () => {
    if (onComplete && !isCompleted) {
      onComplete(step.dayNumber - 1); // Convert to 0-based index
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
        isCompleted
          ? 'ring-2 ring-green-500 bg-green-50'
          : isActive
          ? 'ring-2 ring-orange-500'
          : 'opacity-75'
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isActive
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                step.dayNumber
              )}
            </div>
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Calendar className="w-4 h-4 mr-1" />
                Day {step.dayNumber}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
            </div>
          </div>
          {isCompleted && (
            <span className="flex items-center text-sm text-green-600 font-medium">
              <CheckCircle className="w-4 h-4 mr-1" />
              Completed
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">{step.content}</p>

          {/* Scripture Reference */}
          {step.scriptureReference && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Scripture
              </h4>
              <p className="text-blue-700 text-sm italic">{step.scriptureReference}</p>
            </div>
          )}

          {/* Action Item */}
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
            <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Today's Action
            </h4>
            <p className="text-orange-700 text-sm">{step.actionItem}</p>
          </div>

          {/* Completion Button */}
          {isActive && !isCompleted && onComplete && (
            <button
              onClick={handleComplete}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark Day {step.dayNumber} Complete
            </button>
          )}

          {isCompleted && (
            <div className="text-center py-2 text-green-600 font-medium">
              ✓ You've completed this day's journey
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
