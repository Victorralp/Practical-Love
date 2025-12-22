import { useState, useEffect, useCallback } from 'react';
import { Heart, Target, Award, CheckCircle, Download, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [progress, setProgress] = useState<ChallengeProgress>(() => loadChallengeProgress());

  // Persist progress to localStorage whenever it changes
  useEffect(() => {
    saveChallengeProgress(progress);
  }, [progress]);

  const toggleDay = useCallback((day: number) => {
    setProgress((prev) => toggleDayCompletion(prev, day));
  }, []);

  const handleDaySelect = useCallback((day: number) => {
    setProgress((prev) => updateCurrentDay(prev, day));
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


  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-100 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-8 shadow-xl animate-pulse">
            <Heart className="w-10 h-10 text-white fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-red-800 mb-6 font-bold">
            30-Day Love Challenge
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Transform your relationships, your character, and your life through the daily intentional practice of practical love.
          </p>
        </div>

        {/* Challenge Progress */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl mb-16 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-serif text-red-800 mb-6">Your Transformation Journey</h2>
              <div className="mb-8">
                <div className="flex justify-between mb-3 text-lg">
                  <span className="text-gray-700 font-medium">Days Completed</span>
                  <span className="text-red-600 font-bold">{completedDays.length}/30</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-6 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-6 rounded-full transition-all duration-700 ease-out shadow-sm"
                    style={{ width: `${(completedDays.length / 30) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-6 sm:grid-cols-7 gap-3 mb-8">
                {Array.from({ length: 30 }).map((_, index) => {
                  const day = index + 1;
                  const isCompleted = completedDays.includes(day);
                  const isSelected = day === currentDay;
                  return (
                    <button
                      key={day}
                      onClick={() => handleDaySelect(day)}
                      onDoubleClick={() => toggleDay(day)}
                      title={`Day ${day} - Click to view, double-click to ${isCompleted ? 'unmark' : 'mark'} complete`}
                      className={`aspect-square rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 transform hover:scale-105 ${isCompleted
                        ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg border-none'
                        : isSelected
                          ? 'bg-orange-100 border-2 border-orange-400 text-orange-600 shadow-md'
                          : 'bg-white border-2 border-gray-200 text-gray-400 hover:border-orange-300 hover:text-orange-500 hover:shadow-md'
                        } ${isSelected && !isCompleted ? 'ring-2 ring-orange-300 ring-offset-2' : ''}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-red-800 text-lg">Day {currentDay} Focus</h3>
                  <button
                    onClick={() => toggleDay(currentDay)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      completedDays.includes(currentDay)
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {completedDays.includes(currentDay) ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>
                <p className="text-xl text-gray-800 font-medium">
                  {dayFocus}
                </p>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-3xl font-serif text-red-800 mb-6">Day {currentDay} Love Practice</h2>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 mb-8 shadow-sm">
                <h3 className="text-lg font-bold text-orange-800 uppercase tracking-wide mb-3">Characteristic of Love</h3>
                <p className="text-2xl font-serif text-gray-800 mb-5 leading-snug italic">
                  "{dayCharacteristic}"
                </p>
                <div className="flex items-center text-red-600 font-semibold bg-white/80 inline-flex px-4 py-2 rounded-lg shadow-sm">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>{dayScripture}</span>
                </div>
              </div>

              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Reflection</h3>
                <ul className="space-y-4">
                  {dayReflectionQuestions.map((question, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 text-lg">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-center text-red-800 mb-6">Benefits of the Challenge</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover the transformative power of consistently practicing God's kind of love.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-red-500 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Stronger Relationships</h3>
              <p className="text-gray-600 leading-relaxed">Build deeper, more resilient connections with family, friends, and colleagues through genuine care.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-orange-500 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Personal Growth</h3>
              <p className="text-gray-600 leading-relaxed">Develop emotional maturity, patience, and character strength that withstands life's pressures.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center border-t-4 border-yellow-500 hover:shadow-2xl transition-shadow duration-300">
              <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Divine Blessing</h3>
              <p className="text-gray-600 leading-relaxed">Experience God's mandatory blessing on your life and family as you align with His nature of love.</p>
            </div>
          </div>
        </div>

        {/* Completion Certificate */}
        {completedDays.length === 30 && (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-12 text-white text-center mb-16 shadow-2xl transform scale-100 animate-fade-in-up">
            <Award className="w-24 h-24 mx-auto mb-6 fill-current text-yellow-300" />
            <h2 className="text-4xl md:text-5xl font-serif mb-4 font-bold">Challenge Completed!</h2>
            <p className="text-orange-100 mb-8 max-w-3xl mx-auto text-xl leading-relaxed">
              Congratulations! You've faithfully completed the 30-Day Love Challenge. You have taken a monumental step toward a life transformed by love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => downloadCertificate({
                  completionDate: new Date().toISOString(),
                  startDate: progress.startDate,
                  daysCompleted: 30,
                })}
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Certificate
              </button>
              <button
                onClick={() => printCertificate({
                  completionDate: new Date().toISOString(),
                  startDate: progress.startDate,
                  daysCompleted: 30,
                })}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Print Certificate
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl p-12 shadow-xl border border-gray-100">
          <h2 className="text-4xl font-serif text-red-800 mb-6">Continue Your Journey</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Don't stop here. Share your experience or dive deeper into the scriptures to keep your love growing.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/share-testimony"
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
            >
              Share Your Testimony
            </Link>
            <Link
              to="/bible-passages"
              className="bg-white border-2 border-red-600 text-red-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-all shadow-md hover:shadow-lg"
            >
              Explore 50 Love Passages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}