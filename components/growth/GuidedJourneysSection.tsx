/**
 * GuidedJourneysSection Component
 * Lists available journeys, shows active journey with current step, tracks progress
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */

import { useState, useMemo, useCallback, useRef } from 'react';
import JourneyCard from './JourneyCard';
import JourneyStep from './JourneyStep';
import HowItWorks from './HowItWorks';
import { useStagger } from '../pl/motion';
import { dataService } from '../../services/dataService';
import { progressService } from '../../services/progressService';
import type { Journey, JourneyProgress } from '../../types/growth';
import { CARD, FILL, KICKER, LABEL, TEXT_LINK, TRACK } from './ui';

const STEP_NAV =
  'flex h-11 w-11 items-center justify-center rounded-full border-2 border-pl-ink text-[18px] font-bold transition-colors hover:bg-pl-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-pl-ink';

type ViewMode = 'list' | 'active';

export default function GuidedJourneysSection() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // Cards pop in each time the list is shown.
  useStagger(gridRef, viewMode, { delay: 0 });

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

  const inProgressCount = Array.from(journeyProgressMap.values()).filter(p => p && !p.completedAt).length;
  const completedCount = Array.from(journeyProgressMap.values()).filter(p => p?.completedAt).length;

  // Render journey list view
  const renderListView = () => (
    <>
      <p className="mb-6 mt-0 max-w-[52ch] text-[18px] leading-[1.5] text-pl-body">
        Multi-day devotional paths to help you grow spiritually and develop deeper love.
      </p>

      {/* Journey Stats */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="pl-tag bg-pl-ink text-white">
          {journeys.length} journey{journeys.length !== 1 ? 's' : ''} available
        </span>
        {inProgressCount > 0 && <span className="pl-tag bg-pl-blush text-pl-deep">{inProgressCount} in progress</span>}
        {completedCount > 0 && <span className="pl-tag bg-pl-yellow text-pl-ink">{completedCount} completed</span>}
      </div>

      {/* Journeys Grid */}
      {journeys.length > 0 ? (
        <div ref={gridRef} className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
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
        <div className="rounded-[28px] border-2 border-dashed border-pl-input px-6 py-12 text-center">
          <p className="m-0 text-[20px] text-pl-muted">No journeys available yet.</p>
        </div>
      )}

      <HowItWorks
        title="About guided journeys"
        items={[
          'Each journey spans multiple days with daily devotions',
          "Complete each day's action item before moving to the next",
          'Your progress is saved automatically',
          'Return anytime to continue where you left off',
        ]}
      />
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
        <button type="button" onClick={handleBackToList} className={`${TEXT_LINK} mb-5`}>
          ← Back to all journeys
        </button>

        {/* Journey Header */}
        <div className={`${CARD} mb-8 p-[clamp(20px,4vw,32px)]`}>
          <h3 className="m-0 text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[.98] tracking-[-0.04em]">
            {activeJourney.title}
          </h3>
          <p className="mb-0 mt-3 text-[17px] leading-[1.5] text-pl-body">{activeJourney.description}</p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[14px]">
              <span className={`${KICKER} text-pl-muted`}>Journey progress</span>
              <span className="font-bold">
                {completedSteps} / {totalSteps} days completed
              </span>
            </div>
            <div className={TRACK}>
              <div className={FILL} style={{ width: `${(completedSteps / totalSteps) * 100}%` }} />
            </div>
          </div>

          {isJourneyCompleted && (
            <div role="status" className="mt-5 rounded-[20px] bg-pl-red p-5 text-white">
              <p className="m-0 text-[18px] font-extrabold tracking-[-0.02em]">
                Journey complete. <span className="pl-serif font-normal">Well done.</span>
              </p>
            </div>
          )}
        </div>

        {/* Step Navigation */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h4 className="m-0 text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.03em]">
            {isJourneyCompleted
              ? 'Review your journey'
              : `Day ${currentStepIndex + 1} of ${totalSteps}`}
          </h4>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous step"
              onClick={() => {
                const newIndex = Math.max(0, currentStepIndex - 1);
                if (activeProgress && newIndex !== currentStepIndex) {
                  setActiveJourneyId(activeJourneyId);
                  // Navigate to previous step for viewing
                }
              }}
              disabled={currentStepIndex === 0}
              className={STEP_NAV}
            >
              ←
            </button>
            <span className="min-w-[72px] text-center text-[14px] font-semibold text-pl-muted">
              Step {currentStepIndex + 1}
            </span>
            <button
              type="button"
              aria-label="Next step"
              onClick={() => {
                const newIndex = Math.min(totalSteps - 1, currentStepIndex + 1);
                if (activeProgress && newIndex !== currentStepIndex) {
                  setActiveJourneyId(activeJourneyId);
                  // Navigate to next step for viewing
                }
              }}
              disabled={currentStepIndex >= totalSteps - 1}
              className={STEP_NAV}
            >
              →
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
        <div className="mt-[clamp(32px,5vw,48px)]">
          <h4 className={`${LABEL} mb-4 mt-0`}>All steps</h4>
          <ol className="m-0 list-none space-y-2 p-0">
            {activeJourney.steps.map((step, index) => {
              const isStepCompleted = activeProgress?.completedSteps.includes(index) ?? false;
              const isCurrentStep = index === currentStepIndex;

              return (
                <li
                  key={step.id}
                  aria-current={isCurrentStep ? 'step' : undefined}
                  className={`flex items-center gap-3 rounded-[20px] border-2 p-3 ${
                    isCurrentStep
                      ? 'border-pl-ink bg-white'
                      : isStepCompleted
                        ? 'border-transparent bg-pl-yellow'
                        : 'border-transparent bg-pl-hair'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[14px] font-bold ${
                      isStepCompleted
                        ? 'bg-pl-ink text-white'
                        : isCurrentStep
                          ? 'bg-pl-red text-white'
                          : 'bg-white text-pl-muted'
                    }`}
                  >
                    {isStepCompleted ? '✓' : index + 1}
                  </span>
                  <p
                    className={`m-0 min-w-0 flex-1 text-[16px] font-semibold ${
                      isStepCompleted || isCurrentStep ? 'text-pl-ink' : 'text-pl-muted'
                    }`}
                  >
                    Day {step.dayNumber}: {step.title}
                  </p>
                  {isCurrentStep && !isStepCompleted && (
                    <span className="pl-tag bg-pl-blush text-pl-deep">Current</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </>
    );
  };

  return <div>{viewMode === 'list' ? renderListView() : renderActiveView()}</div>;
}
