/**
 * GuidedJourneysSection Component
 * Lists available journeys, shows active journey with current step, tracks progress
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */

import { useState, useMemo, useCallback } from 'react';
import { Map as MapIcon, ArrowLeft, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import JourneyCard from './JourneyCard';
import JourneyStep from './JourneyStep';
import { dataService } from '../../services/dataService';
import { progressService } from '../../services/progressService';
import type { Journey, JourneyProgress } from '../../types/growth';

type ViewMode = 'list' | 'active';

export default function GuidedJourneysSection() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get all journeys from DataService
  const journeys: Journey[] = useMemo(() => {
    return dataService.getJourneys();
  }, []);

  // Get progress for all journeys
  const journeyProgressMap = useMemo(() => {
    const map = new Map<string, JourneyProgress | null>();
    journeys.forEach(journey => {
      map.set(journey.id, progressService.getJourneyProgress(journey.id));
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [journeys, refreshKey]);

  // Get active journey and its progress
  const activeJourney = useMemo(() => {
    if (!activeJourneyId) return null;
    return dataService.getJourney(activeJourneyId);
  }, [activeJourneyId]);

  const activeProgress = useMemo(() => {
    if (!activeJourneyId) return null;
    return journeyProgressMap.get(activeJourneyId) || null;
  }, [activeJourneyId, journeyProgressMap]);

  // Handle starting a journey
  const handleStartJourney = useCallback((journeyId: string) => {
    progressService.startJourney(journeyId);
    setActiveJourneyId(journeyId);
    setViewMode('active');
    setRefreshKey(k => k + 1);
  }, []);

  // Handle continuing a journey
  const handleContinueJourney = useCallback((journeyId: string) => {
    setActiveJourneyId(journeyId);
    setViewMode('active');
  }, []);

  // Handle completing a step
  const handleCompleteStep = useCallback(
    (stepIndex: number) => {
      if (!activeJourneyId) return;
      progressService.completeJourneyStep(activeJourneyId, stepIndex);
      setRefreshKey(k => k + 1);
    },
    [activeJourneyId]
  );

  // Handle going back to list
  const handleBackToList = useCallback(() => {
    setViewMode('list');
    setActiveJourneyId(null);
  }, []);

  // Get current step index for active journey
  const currentStepIndex = activeProgress?.currentStepIndex ?? 0;

  // Check if journey is completed
  const isJourneyCompleted = activeProgress?.completedAt !== undefined;

  // Render journey list view
  const renderListView = () => (
    <>
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <MapIcon className="w-8 h-8 text-orange-600" />
          <h2 className="text-3xl font-serif text-red-800">Guided Journeys</h2>
        </div>
        <p className="text-gray-600">
          Multi-day devotional paths to help you grow spiritually and develop deeper love.
        </p>
      </div>

      {/* Journey Stats */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="bg-orange-50 rounded-lg px-4 py-2 border border-orange-100">
          <span className="text-sm text-orange-700">
            {journeys.length} journey{journeys.length !== 1 ? 's' : ''} available
          </span>
        </div>
        {Array.from(journeyProgressMap.values()).filter(p => p && !p.completedAt).length > 0 && (
          <div className="bg-orange-50 rounded-lg px-4 py-2 border border-orange-100">
            <span className="text-sm text-red-700">
              {Array.from(journeyProgressMap.values()).filter(p => p && !p.completedAt).length} in
              progress
            </span>
          </div>
        )}
        {Array.from(journeyProgressMap.values()).filter(p => p?.completedAt).length > 0 && (
          <div className="bg-amber-50 rounded-lg px-4 py-2 border border-amber-100">
            <span className="text-sm text-orange-700">
              {Array.from(journeyProgressMap.values()).filter(p => p?.completedAt).length} completed
            </span>
          </div>
        )}
      </div>

      {/* Journeys Grid */}
      {journeys.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {journeys.map(journey => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              progress={journeyProgressMap.get(journey.id)}
              onStart={handleStartJourney}
              onContinue={handleContinueJourney}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <MapIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No journeys available yet.</p>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
        <div className="flex items-start">
          <MapIcon className="w-6 h-6 text-orange-600 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">About Guided Journeys</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Each journey spans multiple days with daily devotions</li>
              <li>• Complete each day's action item before moving to the next</li>
              <li>• Your progress is saved automatically</li>
              <li>• Return anytime to continue where you left off</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  // Render active journey view
  const renderActiveView = () => {
    if (!activeJourney) return null;

    const totalSteps = activeJourney.steps.length;
    const completedSteps = activeProgress?.completedSteps.length ?? 0;

    return (
      <>
        {/* Back Button */}
        <button
          onClick={handleBackToList}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to all journeys
        </button>

        {/* Journey Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-serif text-red-800 mb-2">{activeJourney.title}</h2>
              <p className="text-gray-600">{activeJourney.description}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Journey Progress</span>
              <span className="font-medium text-gray-800">
                {completedSteps} / {totalSteps} days completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  isJourneyCompleted ? 'bg-amber-500' : 'bg-orange-500'
                }`}
                style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {isJourneyCompleted && (
            <div className="mt-4 bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="text-orange-700 font-medium text-center inline-flex items-center justify-center gap-2 w-full">
                <Sparkles className="w-4 h-4" />
                Congratulations! You've completed this journey!
              </p>
            </div>
          )}
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {isJourneyCompleted
              ? 'Review Your Journey'
              : `Day ${currentStepIndex + 1} of ${totalSteps}`}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const newIndex = Math.max(0, currentStepIndex - 1);
                if (activeProgress && newIndex !== currentStepIndex) {
                  setActiveJourneyId(activeJourneyId);
                  // Navigate to previous step for viewing
                }
              }}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600 min-w-[80px] text-center">
              Step {currentStepIndex + 1}
            </span>
            <button
              type="button"
              onClick={() => {
                const newIndex = Math.min(totalSteps - 1, currentStepIndex + 1);
                if (activeProgress && newIndex !== currentStepIndex) {
                  setActiveJourneyId(activeJourneyId);
                  // Navigate to next step for viewing
                }
              }}
              disabled={currentStepIndex >= totalSteps - 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Step */}
        {activeJourney.steps[currentStepIndex] && (
          <JourneyStep
            step={activeJourney.steps[currentStepIndex]}
            isCompleted={activeProgress?.completedSteps.includes(currentStepIndex) ?? false}
            isActive={!isJourneyCompleted}
            onComplete={handleCompleteStep}
          />
        )}

        {/* Steps Overview */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">All Steps</h4>
          <div className="space-y-2">
            {activeJourney.steps.map((step, index) => {
              const isStepCompleted = activeProgress?.completedSteps.includes(index) ?? false;
              const isCurrentStep = index === currentStepIndex;

              return (
                <div
                  key={step.id}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isCurrentStep
                      ? 'bg-orange-50 border border-orange-200'
                      : isStepCompleted
                        ? 'bg-amber-50 border border-amber-200'
                        : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
                      isStepCompleted
                        ? 'bg-amber-500 text-white'
                        : isCurrentStep
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {isStepCompleted ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        isStepCompleted
                          ? 'text-orange-700'
                          : isCurrentStep
                            ? 'text-orange-700'
                            : 'text-gray-600'
                      }`}
                    >
                      Day {step.dayNumber}: {step.title}
                    </p>
                  </div>
                  {isCurrentStep && !isStepCompleted && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <section className="py-8">
      {viewMode === 'list' ? renderListView() : renderActiveView()}
    </section>
  );
}


