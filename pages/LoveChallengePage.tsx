import { useState, useEffect, useCallback, useMemo } from 'react';
import { Target, Award, CheckCircle, Download, Printer, Flame, Sparkles, Clock, ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { PageHero, PageShell } from '../components/ui';
import {
  loadChallengeProgress,
  saveChallengeProgress,
  toggleDayCompletion,
  updateCurrentDay,
  ChallengeProgress,
} from '../services/challengeProgressService';
import { getChallengeDayContent, ChallengeDay } from '../data/challengeDays';
import { downloadCertificate, printCertificate } from '../services/certificateService';

export default function LoveChallengePage() {
  // Challenge progress state management
  const [progress, setProgress] = useState<ChallengeProgress>(() => loadChallengeProgress());

  // Persist progress to localStorage whenever it changes
  useEffect(() => {
    saveChallengeProgress(progress);
  }, [progress]);

  // Toggle day completion status
  const toggleDay = useCallback((day: number) => {
    setProgress(prev => toggleDayCompletion(prev, day));
  }, []);

  const handleDaySelect = useCallback((day: number) => {
    setProgress(prev => updateCurrentDay(prev, day));
  }, []);

  // Derived state for easier access
  const { completedDays, currentDay } = progress;

  // Get the current day's content
  const currentDayContent: ChallengeDay | undefined = getChallengeDayContent(currentDay);

  // Fallback values if day content not found
  const dayCharacteristic = currentDayContent?.characteristic ?? 'Love is patient';
  const dayFocus = currentDayContent?.focus ?? 'Practicing love daily';
  const dayScripture = currentDayContent?.scriptureReference ?? '1 Corinthians 13:4';
  const dayReflectionQuestions = currentDayContent?.reflectionQuestions ?? [
    'How did I demonstrate this characteristic today?',
    'In what moment could I have shown more love?',
    'What is one way I will practice this tomorrow?',
  ];

  const completedCount = completedDays.length;
  const completionPercent = Math.round((completedCount / 30) * 100);

  const currentStreak = useMemo(() => {
    if (!completedDays.length) return 0;
    const sorted = [...completedDays].sort((a, b) => a - b);
    let streak = 1;
    for (let i = sorted.length - 2; i >= 0; i--) {
      if (sorted[i] === sorted[i + 1] - 1) {
        streak += 1;
      } else {
        break;
      }
    }
    return streak;
  }, [completedDays]);

  const nextUnfinishedDay = useMemo(() => {
    for (let i = 1; i <= 30; i++) {
      if (!completedDays.includes(i)) return i;
    }
    return null;
  }, [completedDays]);

  // Main render function
  return (
    <PageShell className="bg-white" containerClassName="max-w-6xl py-14 section-gap">
      <PageHero
        className="mb-8 bg-white bg-none shadow-md border border-orange-100 [&>div.absolute]:hidden"
        badge={
          <>
            <CheckCircle className="w-4 h-4" />
            Daily Practice
          </>
        }
        icon={
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-sm">
            <div className="w-8 h-8 rounded-full bg-white/95 p-1 shadow-sm">
              <Logo className="w-full h-full" />
            </div>
          </div>
        }
        title="30-Day Love Challenge"
        subtitle="Transform your relationships, your character, and your life through daily intentional practice of practical love."
      />

      {/* Challenge Progress */}
      <div className="surface p-6 md:p-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="surface-soft p-4 rounded-xl flex items-center gap-4 border border-orange-100">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center shadow-md">
              <ListChecks className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedCount}/30 days</p>
            </div>
          </div>
          <div className="surface-soft p-4 rounded-xl flex items-center gap-4 border border-orange-100">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-md">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">{currentStreak} days</p>
            </div>
          </div>
          <div className="surface-soft p-4 rounded-xl flex items-center gap-4 border border-orange-100">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-300 text-white flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500">Next up</p>
              <p className="text-2xl font-bold text-gray-900">
                {nextUnfinishedDay ? `Day ${nextUnfinishedDay}` : 'All done!'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-600 font-semibold">Overall progress</p>
            </div>
            <span className="text-sm font-semibold text-red-700">{completionPercent}%</span>
          </div>
          <div className="w-full bg-orange-50 rounded-full h-3 shadow-inner border border-orange-100">
            <div
              className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 h-3 rounded-full transition-all duration-700 ease-out shadow"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              Choose a day to review
            </h2>
            <p className="text-sm text-gray-500">Click to view • double-click to toggle complete</p>
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2 max-h-52 overflow-auto pr-1 justify-items-center">
            {Array.from({ length: 30 }).map((_, index) => {
              const day = index + 1;
              const isCompleted = completedDays.includes(day);
              const isSelected = day === currentDay;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDaySelect(day)}
                  onDoubleClick={() => toggleDay(day)}
                  className={`w-12 h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                    isCompleted
                      ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg'
                      : isSelected
                        ? 'bg-orange-50 border border-orange-400 text-orange-700 shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-500 hover:shadow-sm'
                  } ${isSelected && !isCompleted ? 'ring-2 ring-orange-200 ring-offset-1' : ''}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-7 border border-orange-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm uppercase text-orange-700 font-semibold">Day {currentDay}</p>
                <h2 className="text-2xl font-serif text-red-800">Today&apos;s Focus</h2>
              </div>
              <button
                onClick={() => toggleDay(currentDay)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  completedDays.includes(currentDay)
                    ? 'bg-amber-100 text-orange-700 hover:bg-amber-200'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {completedDays.includes(currentDay) ? '✓ Completed' : 'Mark Complete'}
              </button>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 bg-white rounded-full text-orange-700 font-semibold shadow-sm border border-orange-100">
                <CheckCircle className="w-4 h-4 mr-2" />
                {dayScripture}
              </div>
              <p className="text-2xl font-serif text-gray-900 leading-snug italic">"{dayCharacteristic}"</p>
              <p className="text-gray-700 text-lg leading-relaxed">{dayFocus}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Logo className="w-5 h-5" />
              Daily Reflection
            </h3>
            <ul className="space-y-3">
              {dayReflectionQuestions.map((question, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 text-base leading-relaxed">{question}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Challenge Benefits */}
      <div className="surface p-8 md:p-10 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif text-red-800 font-bold">Benefits of the Challenge</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the transformative power of consistently practicing God&apos;s kind of love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="surface-soft rounded-2xl p-8 text-center border-t-4 border-red-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Logo className="w-11 h-11" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Stronger Relationships</h3>
            <p className="text-gray-600 leading-relaxed">
              Build deeper, more resilient connections with family, friends, and colleagues through genuine care.
            </p>
          </div>

          <div className="surface-soft rounded-2xl p-8 text-center border-t-4 border-orange-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
            <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Personal Growth</h3>
            <p className="text-gray-600 leading-relaxed">
              Develop emotional maturity, patience, and character strength that withstands life&apos;s pressures.
            </p>
          </div>

          <div className="surface-soft rounded-2xl p-8 text-center border-t-4 border-amber-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
            <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Divine Blessing</h3>
            <p className="text-gray-600 leading-relaxed">
              Experience God&apos;s blessing on your life and family as you align with His nature of love.
            </p>
          </div>
        </div>
      </div>

      {/* Completion Certificate */}
      {completedDays.length === 30 && (
        <div className="surface-soft bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-12 text-white text-center shadow-2xl">
          <Award className="w-24 h-24 mx-auto mb-6 fill-current text-yellow-300" />
          <h2 className="text-4xl md:text-5xl font-serif mb-4 font-bold">Challenge Completed!</h2>
          <p className="text-orange-100 mb-8 max-w-3xl mx-auto text-xl leading-relaxed">
            Congratulations! You&apos;ve faithfully completed the 30-Day Love Challenge. You have taken a monumental step toward a life transformed by love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() =>
                downloadCertificate({
                  completionDate: new Date().toISOString(),
                  startDate: progress.startDate,
                  daysCompleted: 30,
                })
              }
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Certificate
            </button>
            <button
              type="button"
              onClick={() =>
                printCertificate({
                  completionDate: new Date().toISOString(),
                  startDate: progress.startDate,
                  daysCompleted: 30,
                })
              }
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Print Certificate
            </button>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center surface p-10 shadow-xl border border-gray-100">
        <h2 className="text-4xl font-serif text-red-800 mb-6">Continue Your Journey</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Don&apos;t stop here. Share your experience or dive deeper into the scriptures to keep your love growing.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/share-testimony"
            className="btn-brand px-10 py-4"
          >
            Share Your Testimony
          </Link>
          <Link
            to="/bible-passages"
            className="btn-outline-brand px-10 py-4"
          >
            Explore 50 Love Passages
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

