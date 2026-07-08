import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  PenLine,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDailyDevotionForDate } from '../data/dailyDevotions';

const COMPLETED_DEVOTION_KEY = 'pl_completed_devotions';

function getCompletedDevotions(): Set<string> {
  try {
    const raw = localStorage.getItem(COMPLETED_DEVOTION_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompletedDevotions(completed: Set<string>) {
  try {
    localStorage.setItem(COMPLETED_DEVOTION_KEY, JSON.stringify([...completed]));
  } catch {
    // localStorage can be unavailable in private or restricted contexts.
  }
}

type DailyDevotionCardProps = {
  variant?: 'full' | 'compact';
  showActions?: boolean;
};

export default function DailyDevotionCard({
  variant = 'full',
  showActions = true,
}: DailyDevotionCardProps) {
  const devotion = useMemo(() => getDailyDevotionForDate(), []);
  const todayKey = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [isComplete, setIsComplete] = useState(() => getCompletedDevotions().has(todayKey));
  const isCompact = variant === 'compact';

  const handleComplete = () => {
    const completed = getCompletedDevotions();
    completed.add(todayKey);
    saveCompletedDevotions(completed);
    setIsComplete(true);
  };

  return (
    <section
      id="daily-devotion"
      className={`relative overflow-hidden rounded-[2rem] border border-orange-100 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96)_0%,_rgba(255,247,237,0.98)_45%,_rgba(255,237,213,0.9)_100%)] shadow-[0_24px_56px_rgba(127,58,27,0.12)] ${
        isCompact ? 'p-6 md:p-7' : 'p-6 md:p-8'
      }`}
    >
      <div className="absolute right-[-4rem] top-[-5rem] h-48 w-48 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="absolute bottom-[-5rem] left-[10%] h-40 w-40 rounded-full bg-red-200/25 blur-3xl" />

      <div className="relative grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-red-700">
            <Sparkles className="h-3.5 w-3.5" />
            Today on Practical Love
          </div>
          <h2
            className={`mt-4 font-serif leading-[0.96] text-[#341a15] ${
              isCompact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'
            }`}
          >
            {devotion.title}
          </h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#b76840]">
            Day {devotion.day} · {devotion.scriptureReference}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e4737]">
            {devotion.focus}. {devotion.actionStep}
          </p>

          {showActions && (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/messages#daily-devotion"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Open devotion
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/messages#prayer-wall"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-[#8d4a2b] transition hover:bg-orange-50"
              >
                Ask for prayer
                <HeartHandshake className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>

        <div className="rounded-[1.6rem] border border-orange-100 bg-white/86 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-red-700">
            <BookOpen className="h-5 w-5" />
            <h3 className="font-serif text-xl text-[#3d1d17]">Reflect today</h3>
          </div>
          <div className="mt-4 space-y-3">
            {devotion.reflectionQuestions.slice(0, isCompact ? 2 : 3).map(question => (
              <div
                key={question}
                className="flex gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4"
              >
                <PenLine className="mt-0.5 h-4 w-4 shrink-0 text-[#b76840]" />
                <p className="text-sm leading-6 text-[#5c382b]">{question}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleComplete}
            disabled={isComplete}
            className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${
              isComplete
                ? 'bg-green-50 text-green-700'
                : 'bg-[#341a15] text-white hover:bg-[#4a261d]'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isComplete ? 'Completed today' : 'Mark today complete'}
          </button>
        </div>
      </div>
    </section>
  );
}
