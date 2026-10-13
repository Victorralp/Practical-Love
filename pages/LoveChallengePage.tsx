import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Em } from '../components/pl/primitives';
import { EASE_POP, animate, prefersReducedMotion, useEntrance, usePopOnChange } from '../components/pl/motion';
import { challenges } from '../data/challenges';
import { challengeDays, getChallengeDayContent } from '../data/challengeDays';
import type { LoveCategory } from '../types/growth';
import { downloadCertificate, printCertificate } from '../services/certificateService';
import {
  loadChallengeProgress,
  resetChallengeProgress,
  saveChallengeProgress,
  toggleDayCompletion,
  updateCurrentDay,
  type ChallengeProgress,
} from '../services/challengeProgressService';

const TOTAL_DAYS = 30;

const PHASES = [
  { title: 'Foundation', start: 1, end: 7 },
  { title: 'Inner work', start: 8, end: 14 },
  { title: 'Relational practice', start: 15, end: 21 },
  { title: 'Enduring love', start: 22, end: 30 },
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

const MILESTONES = [
  { day: 7, title: 'Consistency check', text: 'Love is becoming intentional instead of occasional.' },
  { day: 14, title: 'Inner work check', text: 'You notice patterns in anger, pride and honesty.' },
  { day: 21, title: 'Relational shift', text: 'It shows in how you speak, repair and serve.' },
  { day: 30, title: 'Lasting practice', text: 'The challenge becomes a lifestyle.' },
];

function phaseIndexOf(day: number) {
  return Math.max(
    0,
    PHASES.findIndex(p => day >= p.start && day <= p.end)
  );
}

/** One visible action for the day, drawn from the challenge cards that share its category. */
function actionFor(day: number, characteristicNumber: number) {
  const category = CHARACTERISTIC_CATEGORY_MAP[characteristicNumber] ?? 'kindness';
  const pool = challenges.filter(c => c.category === category);
  if (!pool.length) return 'Do one unasked-for kindness for someone close to you.';
  return pool[(day - 1) % pool.length].actionStep;
}

export default function LoveChallengePage() {
  const [progress, setProgress] = useState<ChallengeProgress>(() => loadChallengeProgress());
  const [phase, setPhase] = useState(() => phaseIndexOf(progress.currentDay));
  const rootRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const { completedDays, currentDay: selected } = progress;
  const done = new Set(completedDays);
  const doneCount = done.size;
  let streak = 0;
  while (streak < TOTAL_DAYS && done.has(streak + 1)) streak += 1;

  const day = getChallengeDayContent(selected) ?? challengeDays[0];
  const isDone = done.has(selected);
  const complete = doneCount >= TOTAL_DAYS;

  useEntrance(rootRef);
  usePopOnChange(cardRef, selected, [
    { transform: 'translateY(16px) rotate(-.6deg)', opacity: 0.4 },
    { transform: 'none', opacity: 1 },
  ]);

  useEffect(() => {
    saveChallengeProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gridRef.current?.querySelectorAll<HTMLElement>('[data-day]').forEach((el, i) =>
      animate(
        el,
        [
          { transform: 'scale(.4)', opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 500, delay: 300 + i * 25, easing: EASE_POP, fill: 'backwards' }
      )
    );
  }, []);

  const select = (n: number) => {
    setProgress(p => updateCurrentDay(p, n));
    setPhase(phaseIndexOf(n));
  };

  const pickPhase = (i: number) => {
    setPhase(i);
    setProgress(p => updateCurrentDay(p, PHASES[i].start));
  };

  const reset = () => {
    if (!window.confirm('Clear all 30 days and start the challenge again?')) return;
    setProgress(resetChallengeProgress());
    setPhase(0);
  };

  const certificate = () => ({
    completionDate: new Date().toISOString(),
    startDate: progress.startDate,
    daysCompleted: TOTAL_DAYS,
  });

  return (
    <div ref={rootRef}>
      <section className="pl-wrap flex flex-wrap items-end justify-between gap-x-14 gap-y-8 pb-[clamp(28px,4vw,48px)] pt-[clamp(48px,8vw,96px)]">
        <div>
          <h1 data-in className="m-0 text-[clamp(56px,10vw,140px)] font-extrabold leading-[.88] tracking-[-0.055em]">
            <span className="text-pl-red">30</span> days of <Em>love.</Em>
          </h1>
          <p data-in className="mb-0 mt-5 max-w-[40ch] text-[clamp(18px,1.8vw,22px)] leading-[1.45] text-pl-body">
            Daily focus, honest self-examination, and one visible action. Your progress is saved on this device.
          </p>
        </div>
        <div data-in className="flex gap-3">
          <div className="min-w-[120px] rounded-[24px] bg-pl-ink px-6 py-[18px] text-white">
            <div className="text-[48px] font-extrabold leading-none tracking-[-0.04em]" aria-live="polite">
              {doneCount}
            </div>
            <div className="mt-[6px] text-[14px] opacity-75">of 30 days</div>
          </div>
          <div className="min-w-[120px] rounded-[24px] bg-pl-yellow px-6 py-[18px] text-pl-ink">
            <div className="text-[48px] font-extrabold leading-none tracking-[-0.04em]">
              {streak}
              <span aria-hidden="true">🔥</span>
            </div>
            <div className="mt-[6px] text-[14px]">day streak</div>
          </div>
        </div>
      </section>

      <section className="pl-wrap">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Challenge phases">
          {PHASES.map((p, i) => (
            <button
              key={p.title}
              type="button"
              aria-pressed={phase === i}
              onClick={() => pickPhase(i)}
              className={`min-h-[44px] rounded-full border-2 border-pl-ink px-[18px] text-[15px] font-semibold transition-colors duration-200 ${
                phase === i ? 'bg-pl-ink text-white' : 'bg-white text-pl-ink'
              }`}
            >
              {p.title}{' '}
              <span className="opacity-60">
                {p.start}–{p.end}
              </span>
            </button>
          ))}
        </div>
        <div ref={gridRef} className="mt-5 grid gap-2 [grid-template-columns:repeat(auto-fill,minmax(64px,1fr))]">
          {challengeDays.map(({ day: n }) => {
            const on = n === selected;
            const d = done.has(n);
            const inPhase = phaseIndexOf(n) === phase;
            return (
              <button
                key={n}
                type="button"
                data-day
                onClick={() => select(n)}
                aria-label={`Day ${n}${d ? ', done' : ''}`}
                aria-current={on ? 'true' : undefined}
                className={`relative aspect-square rounded-[18px] border-2 text-[22px] font-extrabold transition-[transform,background-color,opacity] [transition-duration:350ms] [transition-timing-function:cubic-bezier(.3,1.6,.5,1)] ${
                  on ? 'scale-[1.08] bg-pl-red text-white' : d ? 'bg-pl-blush text-pl-ink' : 'bg-white text-pl-ink'
                } ${on || inPhase ? 'border-pl-ink' : 'border-[#e6dad8]'} ${inPhase || d ? 'opacity-100' : 'opacity-45'}`}
              >
                {n}
                {d && (
                  <span aria-hidden="true" className="absolute right-[6px] top-1 text-[12px]">
                    ♥
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="pl-wrap pb-[clamp(64px,9vw,120px)] pt-[clamp(28px,4vw,48px)]">
        <div
          ref={cardRef}
          className="grid overflow-hidden rounded-[32px] border-2 border-pl-ink shadow-[12px_12px_0_#e1251b] [grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr))]"
        >
          <div className="bg-pl-red p-[clamp(24px,4vw,48px)] text-white">
            <p className="m-0 text-[14px] font-bold uppercase tracking-[0.08em]">
              Day {day.day} · {PHASES[phaseIndexOf(day.day)].title}
            </p>
            <h2 className="mb-0 mt-[14px] text-[clamp(40px,5vw,72px)] font-extrabold leading-[.92] tracking-[-0.045em]">{day.characteristic}</h2>
            <p className="pl-serif mb-0 mt-5 text-[clamp(22px,2.4vw,28px)] leading-[1.25]">{day.focus}.</p>
            <p className="mb-0 mt-3 text-[15px] font-semibold text-white/80">{day.scriptureReference}</p>
          </div>
          <div className="flex flex-col gap-4 p-[clamp(24px,4vw,48px)]">
            <div>
              <b className="text-[14px] uppercase tracking-[0.08em] text-pl-red">Do this today</b>
              <p className="mb-0 mt-[6px] text-[20px] font-semibold leading-[1.4]">{actionFor(day.day, day.characteristicNumber)}</p>
            </div>
            <div>
              <b className="text-[14px] uppercase tracking-[0.08em] text-pl-red">Reflect tonight</b>
              <p className="mb-0 mt-[6px] text-[18px] leading-[1.5] text-pl-body">{day.reflectionQuestions[0]}</p>
            </div>
            <button
              type="button"
              aria-pressed={isDone}
              onClick={() => setProgress(p => toggleDayCompletion(p, selected))}
              className={`mt-auto min-h-[58px] rounded-full border-2 border-pl-ink text-[18px] font-bold transition-colors duration-200 ${
                isDone ? 'bg-pl-blush text-pl-ink' : 'bg-pl-ink text-white'
              }`}
            >
              {isDone ? 'Done ♥ (tap to undo)' : `Mark day ${day.day} complete`}
            </button>
          </div>
        </div>

        <div className="mt-[clamp(40px,6vw,64px)] grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
          {MILESTONES.map(m => {
            const hit = doneCount >= m.day;
            return (
              <div
                key={m.day}
                className={`rounded-[24px] border-2 border-pl-ink p-[22px] transition-colors [transition-duration:400ms] ${
                  hit ? 'bg-pl-ink text-white' : 'bg-white text-pl-ink'
                }`}
              >
                <b className="text-[15px]">
                  Day {m.day} {hit && <span aria-label="reached">✓</span>}
                </b>
                <h3 className="mb-0 mt-2 text-[22px] font-extrabold tracking-[-0.02em]">{m.title}</h3>
                <p className="mb-0 mt-[6px] text-[15px] leading-[1.45] opacity-85">{m.text}</p>
              </div>
            );
          })}
        </div>

        {complete && (
          <div className="mt-[clamp(40px,6vw,64px)] rounded-[32px] bg-pl-red p-[clamp(28px,5vw,56px)] text-white">
            <h2 className="m-0 text-[clamp(36px,5vw,64px)] font-extrabold leading-[.95] tracking-[-0.045em]">
              All 30 days. <span className="pl-serif">Well done.</span>
            </h2>
            <p className="mb-0 mt-4 max-w-[46ch] text-[18px] leading-[1.5] text-white/90">
              Keep the rhythm alive, and mark the milestone with your certificate.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => downloadCertificate(certificate())} className="pl-btn pl-btn-white">
                Download certificate
              </button>
              <button type="button" onClick={() => printCertificate(certificate())} className="pl-btn pl-btn-outline-light">
                Print certificate
              </button>
            </div>
          </div>
        )}

        <div className="mt-[clamp(32px,5vw,48px)] flex flex-wrap items-center justify-between gap-4 text-[16px]">
          <Link to="/growth" className="font-semibold">
            Open the wider growth journey →
          </Link>
          {doneCount > 0 && (
            <button type="button" onClick={reset} className="min-h-[44px] font-semibold text-pl-muted underline underline-offset-4 hover:text-pl-ink">
              Start over
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
