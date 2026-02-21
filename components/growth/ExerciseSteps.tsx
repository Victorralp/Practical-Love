/**
 * ExerciseSteps Component
 * Displays numbered steps with duration for a practical exercise
 * Requirements: 2.4
 */

import { Clock } from 'lucide-react';
import type { Exercise } from '../../types/growth';

interface ExerciseStepsProps {
  exercise: Exercise;
}

export default function ExerciseSteps({ exercise }: ExerciseStepsProps) {
  return (
    <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
      {/* Exercise Header */}
      <div className="flex items-center justify-between mb-3">
        <h5 className="font-medium text-orange-800">{exercise.title}</h5>
        <span className="flex items-center text-sm text-orange-600">
          <Clock className="w-4 h-4 mr-1" />
          {exercise.duration}
        </span>
      </div>

      {/* Numbered Steps */}
      <ol className="space-y-2">
        {exercise.steps.map((step, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
              {index + 1}
            </span>
            <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

