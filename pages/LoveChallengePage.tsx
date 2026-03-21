import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarRange,
  CheckCircle,
  Clock,
  Download,
  Flame,
  HeartHandshake,
  ListChecks,
  Printer,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTASection, PageHero, PageShell, SectionCard } from '../components/ui';
import challenges from '../data/challenges';
import challengeDays, { getChallengeDayContent, type ChallengeDay } from '../data/challengeDays';
import {
  loadChallengeProgress,
  resetChallengeProgress,
  saveChallengeProgress,
  toggleDayCompletion,
  updateCurrentDay,
  type ChallengeProgress,
} from '../services/challengeProgressService';
import { downloadCertificate, printCertificate } from '../services/certificateService';
import type { LoveCategory } from '../types/growth';

const TOTAL_DAYS = 30;

const PHASES = [
  {
    id: 'phase-1',
    title: 'Foundation',
    start: 1,
    end: 7,
    description: 'Slow down, pay attention, and start choosing love deliberately in everyday moments.',
    focus: 'Patience, kindness, and humility',
  },
  {
    id: 'phase-2',
    title: 'Inner Work',
    start: 8,
    end: 14,
    description: 'Work on anger, trust, forgiveness, and the reactions that shape your relationships.',
    focus: 'Self-control, honesty, and repair',
  },
  {
    id: 'phase-3',
    title: 'Relational Practice',
    start: 15,
    end: 21,
    description: 'Move from reflection into visible action through service, truth, and sacrificial care.',
    focus: 'Visible acts of love',
  },
  {
    id: 'phase-4',
    title: 'Enduring Love',
    start: 22,
    end: 30,
    description: 'Turn what you have practiced into a durable lifestyle that keeps loving under pressure.',
    focus: 'Consistency, hope, and endurance',
  },
] as const;

const CHARACTERISTIC_CATEGORY_MAP: Record<number, LoveCategory> = {
  1: 'patience',
  2: 'kindness',
  3: 'humility',
  4: 'humility',
  5: 'humility',
  6: 'empathy',
  7: 'empathy',
  8: 'patience',
  9: 'forgiveness',
  10: 'kindness',
  11: 'trust',
  12: 'empathy',
  13: 'trust',
  14: 'perseverance',
  15: 'perseverance',
  16: 'perseverance',
  17: 'kindness',
};

const CATEGORY_PROMPTS: Record<LoveCategory, string> = {
  patience: 'Where am I most tempted to react quickly instead of lovingly?',
  kindness: 'Who needs a deliberate act of warmth, generosity, or encouragement from me today?',
  forgiveness: 'What hurt am I still carrying that keeps love from flowing freely?',
  empathy: 'Whose perspective do I need to understand before I speak or respond?',
  humility: 'Where do I still want recognition, control, or the last word?',
  trust: 'How can I choose truthful, reliable, transparent love in one key relationship today?',
  perseverance: 'What relationship or responsibility needs me to keep showing up with love?',
};

const QUICK_START_STEPS = [
  {
    title: 'Choose a day',
    description: 'Open the current day or pick any day inside the active phase to review the focus and scripture.',
    icon: <CalendarRange className="h-5 w-5" />,
  },
  {
    title: 'Practice it visibly',
    description: 'Use the reflection prompts and the extra practice card so the day becomes action, not just reading.',
    icon: <ListChecks className="h-5 w-5" />,
  },
  {
    title: 'Mark your progress',
    description: 'Complete the day, keep the streak alive, and watch the challenge build long-term momentum.',
    icon: <Flame className="h-5 w-5" />,
  },
] as const;

const CHALLENGE_MODES = [
  {
    title: 'Personal Mode',
    description: 'Use the challenge as a daily private discipline for heart work, repentance, and intentional action.',
    prompt: 'Best for morning devotion, journaling, and one focused act of love each day.',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: 'Family Mode',
    description: 'Read the day together, ask one reflection question aloud, and agree on one family action before night.',
    prompt: 'Best for homes that want shared conversation and practical accountability.',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Group Mode',
    description: 'Use this in small groups, fellowships, or mentorship circles and review progress each week.',
    prompt: 'Best for churches, teams, or friendship circles that want a common love practice.',
    icon: <HeartHandshake className="h-5 w-5" />,
  },
] as const;

const DAILY_RHYTHM = [
  {
    label: 'Morning',
    title: 'Set the tone',
    description: 'Read the day characteristic aloud and decide where you are most likely to need it before the day gets busy.',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    label: 'Midday',
    title: 'Check your reactions',
    description: 'Pause in the middle of the day and ask whether your words, tone, and pace still match the challenge.',
    icon: <Clock className="h-5 w-5" />,
  },
  {
    label: 'Evening',
    title: 'Review and reset',
    description: 'Answer the reflection prompts honestly, mark the day, and prepare one practical adjustment for tomorrow.',
    icon: <BookOpen className="h-5 w-5" />,
  },
] as const;

const MILESTONES = [
  {
    day: 7,
    title: 'Consistency Check',
    description: 'Your first full week reveals whether love is becoming intentional instead of occasional.',
  },
  {
    day: 14,
    title: 'Inner Work Check',
    description: 'By this point you should start noticing patterns in anger, pride, patience, and honesty.',
  },
  {
    day: 21,
    title: 'Relational Shift',
    description: 'The challenge should now be visible in how you speak, repair conflict, and serve other people.',
  },
  {
    day: 30,
    title: 'Lasting Practice',
    description: 'This is where the challenge stops being an event and starts becoming a lifestyle.',
  },
] as const;

function getPhaseForDay(day: number) {
  return PHASES.find(phase => day >= phase.start && day <= phase.end) ?? PHASES[0];
}

function formatDateLabel(value: string) {
  return new Date(value).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function buildPrayerPrompt(day: ChallengeDay) {
  return `Lord, teach me to live out "${day.characteristic.toLowerCase()}" today. Help me ${day.focus.toLowerCase()} and let Your love shape my words, motives, and reactions.`;
}

function buildDeclaration(day: ChallengeDay) {
  return `Today I choose ${day.characteristic.toLowerCase()}. I will carry this love into my conversations, decisions, and relationships.`;
}

export default function LoveChallengePage() {
  const [progress, setProgress] = useState<ChallengeProgress>(() => loadChallengeProgress());
  const [activePhaseId, setActivePhaseId] = useState<string>(() => getPhaseForDay(loadChallengeProgress().currentDay).id);

  useEffect(() => {
    saveChallengeProgress(progress);
  }, [progress]);

  const toggleDay = useCallback((day: number) => {
    setProgress(prev => toggleDayCompletion(prev, day));
  }, []);

  const handleDaySelect = useCallback((day: number) => {
    setProgress(prev => updateCurrentDay(prev, day));
    setActivePhaseId(getPhaseForDay(day).id);
  }, []);

  const handleResetChallenge = useCallback(() => {
    setProgress(resetChallengeProgress());
    setActivePhaseId(PHASES[0].id);
  }, []);

  const { completedDays, currentDay } = progress;
  const completedCount = completedDays.length;
  const completionPercent = Math.round((completedCount / TOTAL_DAYS) * 100);
  const daysRemaining = TOTAL_DAYS - completedCount;

  const currentDayContent: ChallengeDay | undefined = getChallengeDayContent(currentDay);
  const dayContent = currentDayContent ?? challengeDays[0];

  const currentStreak = useMemo(() => {
    if (!completedDays.length) return 0;
    const sorted = [...completedDays].sort((a, b) => a - b);
    let streak = 1;
    for (let index = sorted.length - 2; index >= 0; index -= 1) {
      if (sorted[index] === sorted[index + 1] - 1) {
        streak += 1;
      } else {
        break;
      }
    }
    return streak;
  }, [completedDays]);

  const nextUnfinishedDay = useMemo(() => {
    for (let day = 1; day <= TOTAL_DAYS; day += 1) {
      if (!completedDays.includes(day)) return day;
    }
    return null;
  }, [completedDays]);

  const selectedPhase = useMemo(
    () => PHASES.find(phase => phase.id === activePhaseId) ?? getPhaseForDay(currentDay),
    [activePhaseId, currentDay]
  );

  const visibleDays = useMemo(
    () => challengeDays.filter(day => day.day >= selectedPhase.start && day.day <= selectedPhase.end),
    [selectedPhase]
  );

  const completedInSelectedPhase = useMemo(
    () =>
      challengeDays.filter(
        day =>
          day.day >= selectedPhase.start &&
          day.day <= selectedPhase.end &&
          completedDays.includes(day.day)
      ).length,
    [completedDays, selectedPhase]
  );

  const phasePercent = Math.round(
    (completedInSelectedPhase / (selectedPhase.end - selectedPhase.start + 1)) * 100
  );
  const nextMilestone = MILESTONES.find(milestone => completedCount < milestone.day) ?? MILESTONES[MILESTONES.length - 1];

  const currentCategory = CHARACTERISTIC_CATEGORY_MAP[dayContent.characteristicNumber] ?? 'kindness';
  const relatedChallenges = useMemo(
    () => challenges.filter(challenge => challenge.category === currentCategory).slice(0, 2),
    [currentCategory]
  );

  const isCurrentDayCompleted = completedDays.includes(currentDay);
  const milestoneLabel =
    completionPercent >= 100
      ? 'Challenge finished'
      : completionPercent >= 75
        ? 'You are in the final stretch'
        : completionPercent >= 40
          ? 'Momentum is building'
          : 'You are laying the foundation';

  return (
    <PageShell
      className="bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(239,68,68,0.18),_transparent_34%),linear-gradient(180deg,_#fffaf5_0%,_#ffffff_48%,_#fff7ed_100%)]"
      containerClassName="max-w-7xl py-14 section-gap"
    >
      <PageHero
        className="border-red-100 shadow-xl"
        badge={
          <>
            <Sparkles className="w-4 h-4" />
            Guided Daily Practice
          </>
        }
        icon={
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-600 via-orange-500 to-amber-400 text-white shadow-lg">
            <HeartHandshake className="h-7 w-7" />
          </div>
        }
        title="30-Day Love Challenge"
        subtitle="A fuller journey into practical love with daily focus, deeper self-examination, and visible action steps that keep your growth moving."
        actions={
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#challenge-map" className="btn-brand px-7 py-3">
              Open Challenge Map
            </a>
            <Link to="/share-testimony" className="btn-outline-brand px-7 py-3">
              Share Your Testimony
            </Link>
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Completed</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{completedCount}/30</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Streak</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{currentStreak} days</p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Next Focus</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {nextUnfinishedDay ? `Day ${nextUnfinishedDay}` : 'Completed'}
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/80 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Current Phase</p>
            <p className="mt-2 text-xl font-bold text-gray-900">{getPhaseForDay(currentDay).title}</p>
          </div>
        </div>
      </PageHero>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Quick Start
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">How to use the challenge well</h2>
          <div className="mt-6 space-y-4">
            {QUICK_START_STEPS.map((step, index) => (
              <div
                key={step.title}
                className="flex items-start gap-4 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-white p-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  {step.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 leading-7 text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard className="border-red-100 bg-gradient-to-br from-red-50 via-white to-orange-50 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Challenge Modes
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">Use it alone or with people</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {CHALLENGE_MODES.map(mode => (
              <div
                key={mode.title}
                className="rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                  {mode.icon}
                </div>
                <h3 className="mt-4 text-xl font-serif text-gray-900">{mode.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{mode.description}</p>
                <p className="mt-4 text-sm font-medium leading-6 text-red-700">{mode.prompt}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <SectionCard className="overflow-hidden border-red-100 bg-white/95 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Journey Radar
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">Track your love formation</h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-700">
                This challenge is arranged as a progression. Each phase strengthens a different part
                of love so the practice feels layered, not repetitive.
              </p>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-orange-50 px-5 py-4">
              <p className="text-sm font-semibold text-orange-700">Milestone</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{milestoneLabel}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {PHASES.map(phase => {
              const phaseDays = challengeDays.filter(day => day.day >= phase.start && day.day <= phase.end);
              const phaseDone = phaseDays.filter(day => completedDays.includes(day.day)).length;
              const isActive = selectedPhase.id === phase.id;

              return (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => setActivePhaseId(phase.id)}
                  className={`rounded-2xl border p-5 text-left transition-all duration-200 ${
                    isActive
                      ? 'border-red-300 bg-gradient-to-br from-red-50 to-orange-50 shadow-md'
                      : 'border-orange-100 bg-white hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
                      Days {phase.start}-{phase.end}
                    </p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                      {phaseDone}/{phaseDays.length}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-serif text-gray-900">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{phase.description}</p>
                  <p className="mt-4 text-sm font-medium text-red-700">{phase.focus}</p>
                </button>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard
          variant="dark"
          className="border-red-900 bg-[linear-gradient(160deg,_rgba(127,29,29,1)_0%,_rgba(136,19,55,1)_45%,_rgba(154,52,18,1)_100%)] shadow-xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
            Momentum Board
          </p>
          <h2 className="mt-3 text-3xl font-serif text-white">Stay in motion</h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <TrendingUp className="h-5 w-5 text-orange-200" />
                </div>
                <div>
                  <p className="text-sm text-orange-100">Overall progress</p>
                  <p className="text-2xl font-bold text-white">{completionPercent}%</p>
                </div>
              </div>
              <div className="mt-4 h-2.5 rounded-full bg-white/10">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-orange-300 via-amber-300 to-white transition-all duration-700"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center gap-3">
                  <Flame className="h-5 w-5 text-orange-200" />
                  <div>
                    <p className="text-sm text-orange-100">Current streak</p>
                    <p className="text-xl font-semibold text-white">{currentStreak} days</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-200" />
                  <div>
                    <p className="text-sm text-orange-100">Days remaining</p>
                    <p className="text-xl font-semibold text-white">{daysRemaining}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
              <p className="text-sm font-semibold text-orange-200">Challenge window</p>
              <p className="mt-2 text-white">Started: {formatDateLabel(progress.startDate)}</p>
              <p className="mt-1 text-orange-100">
                Last updated: {formatDateLabel(progress.lastUpdated)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetChallenge}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Challenge Progress
            </button>
          </div>
        </SectionCard>
      </section>

      <section id="challenge-map" className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Challenge Map
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">
                Browse the current phase and select a day
              </h2>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3">
              <p className="text-sm font-medium text-orange-700">
                Phase progress: {completedInSelectedPhase}/{visibleDays.length} completed
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{phasePercent}% complete</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleDays.map(day => {
              const isCompleted = completedDays.includes(day.day);
              const isSelected = currentDay === day.day;

              return (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => handleDaySelect(day.day)}
                  className={`rounded-2xl border p-5 text-left transition-all duration-200 ${
                    isCompleted
                      ? 'border-red-300 bg-gradient-to-br from-red-50 to-orange-50 shadow-md'
                      : isSelected
                        ? 'border-orange-300 bg-orange-50 shadow-md'
                        : 'border-orange-100 bg-white hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                      Day {day.day}
                    </span>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <CalendarRange className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-serif text-gray-900">{day.characteristic}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{day.focus}</p>
                  <p className="mt-4 text-sm font-medium text-red-700">{day.scriptureReference}</p>
                </button>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard className="border-orange-200 bg-gradient-to-br from-orange-50 via-white to-red-50 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Selected Phase
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">{selectedPhase.title}</h2>
          <p className="mt-3 leading-7 text-gray-700">{selectedPhase.description}</p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-orange-100 bg-white/85 p-4">
              <p className="text-sm font-semibold text-orange-700">Range</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                Days {selectedPhase.start} to {selectedPhase.end}
              </p>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-white/85 p-4">
              <p className="text-sm font-semibold text-orange-700">Primary emphasis</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">{selectedPhase.focus}</p>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-white/85 p-4">
              <p className="text-sm font-semibold text-orange-700">Best next move</p>
              <p className="mt-1 leading-7 text-gray-700">
                {nextUnfinishedDay && nextUnfinishedDay >= selectedPhase.start && nextUnfinishedDay <= selectedPhase.end
                  ? `Continue with Day ${nextUnfinishedDay} to keep this phase moving.`
                  : 'Review one unfinished day in this phase, then use the reflection prompts before you move on.'}
              </p>
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard className="border-red-100 bg-white/95 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Current Day Studio
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">
                Day {currentDay}: {dayContent.characteristic}
              </h2>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-700">{dayContent.focus}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleDay(currentDay)}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                isCurrentDayCompleted
                  ? 'bg-amber-100 text-orange-700 hover:bg-amber-200'
                  : 'bg-red-700 text-white hover:bg-red-800'
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              {isCurrentDayCompleted ? 'Marked complete' : 'Mark this day complete'}
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-orange-100 bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Scripture anchor
              </p>
              <p className="mt-3 inline-flex rounded-full border border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-red-700">
                {dayContent.scriptureReference}
              </p>
              <p className="mt-6 text-3xl font-serif leading-tight text-gray-900">
                &quot;{dayContent.characteristic}&quot;
              </p>
              <p className="mt-5 leading-7 text-gray-700">{buildDeclaration(dayContent)}</p>
            </div>

            <div className="rounded-[1.75rem] border border-orange-100 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Reflection prompts
              </p>
              <ul className="mt-5 space-y-4">
                {dayContent.reflectionQuestions.map((question, index) => (
                  <li key={question} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                      {index + 1}
                    </div>
                    <p className="leading-7 text-gray-700">{question}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard variant="gradient" className="border-orange-200 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">
              Prayer Prompt
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-800">{buildPrayerPrompt(dayContent)}</p>
          </SectionCard>

          <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                  Relationship Audit
                </p>
                <h3 className="text-2xl font-serif text-red-800">Where this day should land</h3>
              </div>
            </div>
            <p className="mt-4 leading-7 text-gray-700">{CATEGORY_PROMPTS[currentCategory]}</p>
          </SectionCard>

          <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-700">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                  Extra Practice
                </p>
                <h3 className="text-2xl font-serif text-red-800">Go beyond the reflection</h3>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {relatedChallenges.map(challenge => (
                <div
                  key={challenge.id}
                  className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
                    {challenge.category}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-gray-900">{challenge.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{challenge.description}</p>
                  <p className="mt-3 text-sm font-medium text-red-700">{challenge.actionStep}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionCard className="border-orange-200 bg-white/95 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Daily Rhythm
          </p>
          <h2 className="mt-2 text-3xl font-serif text-red-800">A better way to move through the day</h2>
          <div className="mt-6 space-y-4">
            {DAILY_RHYTHM.map(rhythm => (
              <div
                key={rhythm.title}
                className="rounded-2xl border border-orange-100 bg-gradient-to-r from-white to-orange-50 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                    {rhythm.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                      {rhythm.label}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900">{rhythm.title}</h3>
                  </div>
                </div>
                <p className="mt-4 leading-7 text-gray-700">{rhythm.description}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard className="border-red-100 bg-white/95 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                Milestone Trail
              </p>
              <h2 className="mt-2 text-3xl font-serif text-red-800">See what each checkpoint means</h2>
            </div>
            <div className="rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3">
              <p className="text-sm font-medium text-orange-700">Next milestone</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">Day {nextMilestone.day}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {MILESTONES.map(milestone => {
              const reached = completedCount >= milestone.day;
              const isNext = nextMilestone.day === milestone.day && !reached;

              return (
                <div
                  key={milestone.day}
                  className={`rounded-2xl border p-5 transition-all duration-200 ${
                    reached
                      ? 'border-red-300 bg-gradient-to-br from-red-50 to-orange-50 shadow-sm'
                      : isNext
                        ? 'border-orange-300 bg-orange-50 shadow-sm'
                        : 'border-orange-100 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                      Day {milestone.day}
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                        reached ? 'text-red-700' : isNext ? 'text-orange-700' : 'text-gray-500'
                      }`}
                    >
                      {reached ? 'Reached' : isNext ? 'Up next' : 'Ahead'}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-serif text-gray-900">{milestone.title}</h3>
                  <p className="mt-3 leading-7 text-gray-700">{milestone.description}</p>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <SectionCard className="border-red-100 bg-white/95 shadow-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700">
            <Target className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-2xl font-serif text-red-800">Observe</h2>
          <p className="mt-3 leading-7 text-gray-700">
            Each day isolates one characteristic so you can notice the exact habits, triggers, and
            reactions shaping your love.
          </p>
        </SectionCard>

        <SectionCard className="border-orange-100 bg-white/95 shadow-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
            <ListChecks className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-2xl font-serif text-red-800">Practice</h2>
          <p className="mt-3 leading-7 text-gray-700">
            Reflection questions, action cards, and completion tracking make the challenge active,
            not passive. You are doing love, not just reading about it.
          </p>
        </SectionCard>

        <SectionCard className="border-amber-100 bg-white/95 shadow-md">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <Award className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-2xl font-serif text-red-800">Sustain</h2>
          <p className="mt-3 leading-7 text-gray-700">
            By the final phase, the goal is lasting formation: a lifestyle of practical love that
            survives pressure and keeps blessing other people.
          </p>
        </SectionCard>
      </section>

      {completedCount === TOTAL_DAYS ? (
        <section className="rounded-[2rem] bg-gradient-to-r from-red-600 via-red-500 to-orange-500 p-10 text-center text-white shadow-2xl md:p-12">
          <Award className="mx-auto h-24 w-24 fill-current text-yellow-300" />
          <h2 className="mt-6 text-4xl font-serif md:text-5xl">Challenge Completed</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-orange-50">
            You have completed all 30 days. Keep this rhythm alive and mark the milestone with your
            certificate.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                downloadCertificate({
                  completionDate: new Date().toISOString(),
                  startDate: progress.startDate,
                  daysCompleted: TOTAL_DAYS,
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-red-600 shadow-lg transition hover:bg-orange-50"
            >
              <Download className="h-5 w-5" />
              Download Certificate
            </button>
            <button
              type="button"
              onClick={() =>
                printCertificate({
                  completionDate: new Date().toISOString(),
                  startDate: progress.startDate,
                  daysCompleted: TOTAL_DAYS,
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
            >
              <Printer className="h-5 w-5" />
              Print Certificate
            </button>
          </div>
        </section>
      ) : null}

      <CTASection
        title="Keep the challenge moving into the rest of the site"
        description="When today’s work is done, share what changed in you or continue exploring scriptures that deepen practical love."
        primaryAction={{ label: 'Share Your Testimony', href: '/share-testimony' }}
        secondaryAction={{ label: 'Explore Love Passages', href: '/bible-passages' }}
      />

      <div className="flex justify-center">
        <Link
          to="/growth"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-800"
        >
          Open the wider growth journey
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </PageShell>
  );
}
