/**
 * ReflectionPrompt Component
 * Displays a reflection question with text input for response
 * Requirements: 3.1
 */

import { useState } from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';
import type { ReflectionPrompt as ReflectionPromptType } from '../../types/growth';

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

  const handleSubmit = () => {
    if (response.trim()) {
      onSubmit(prompt.id, response.trim());
    }
  };

  const isValid = response.trim().length > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(prompt.category)}`}>
            {prompt.category.charAt(0).toUpperCase() + prompt.category.slice(1)}
          </span>
          <span className="flex items-center text-sm text-gray-500">
            <MessageCircle className="w-4 h-4 mr-1" />
            Reflection
          </span>
        </div>

        {/* Main Question */}
        <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
          {prompt.question}
        </h3>
      </div>

      {/* Response Input */}
      <div className="p-6 space-y-4">
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Take your time to reflect and write your thoughts..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none min-h-[150px]"
          rows={5}
        />

        {/* Follow-up Question */}
        {prompt.followUp && (
          <div className="mt-4">
            {!showFollowUp ? (
              <button
                onClick={() => setShowFollowUp(true)}
                className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
              >
                <ChevronRight className="w-4 h-4 mr-1" />
                Show follow-up question
              </button>
            ) : (
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                <p className="text-orange-800 font-medium text-sm mb-2">Follow-up:</p>
                <p className="text-orange-700">{prompt.followUp}</p>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
              isValid
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Save Response
          </button>
        </div>
      </div>
    </div>
  );
}
