import { useEffect, useRef, useState } from 'react';
import { Em } from '../components/pl/primitives';
import { EASE_POP, animate, prefersReducedMotion, useEntrance } from '../components/pl/motion';
import { CHARACTERISTICS } from '../data/yellowCard';

const STORAGE_KEY = 'pl-chars-got';

// One small action per characteristic, in Yellow Card order.
const PRACTICE = [
  'Wait three seconds before you answer anyone who irritates you, then do one kind thing for them.',
  'Congratulate someone on a win you wish were yours.',
  'Let someone else tell the story of your good deed, or no one.',
  'Ask a question of the quietest person in the room.',
  'Ask “what do you think?” before giving your view.',
  'Say please and thank you to everyone, including family.',
  'Behave in private as you would in public.',
  'Let someone else choose today: the food, the route, the plan.',
  'Spend an hour on something that only benefits another person.',
  'When offended, assume the best explanation first.',
  'Let go of one old grievance and don’t mention it again.',
  'When someone hurts you today, don’t replay it to anyone.',
  'Tell the truth when a small lie would be easier, and speak up kindly for anyone treated unfairly.',
  'Stay calm and present in one hard conversation.',
  'Give someone the benefit of the doubt out loud.',
  'Keep one promise today that has become inconvenient.',
  'Show up again for someone you have been tempted to give up on.',
];

const RED = new Set([0, 1, 11, 16]);

function readGot(): Record<number, true> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<number, true>) : {};
  } catch {
    return {};
  }
}

export default function CharacteristicsPage() {
  const [flipped, setFlipped] = useState(-1);
  const [got, setGot] = useState<Record<number, true>>(readGot);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const count = Object.keys(got).length;
  const total = CHARACTERISTICS.length;

  useEntrance(rootRef);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gridRef.current?.querySelectorAll<HTMLElement>('[data-card]').forEach((el, i) =>
      animate(
        el,
        [
          { transform: `translateY(50px) rotate(${i % 2 ? 3 : -3}deg)`, opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 700, delay: 250 + i * 45, easing: EASE_POP, fill: 'backwards' }
      )
    );
  }, []);

  const toggleGot = (i: number) =>
    setGot(current => {
      const next = { ...current };
      if (next[i]) delete next[i];
      else next[i] = true;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage can be unavailable (private mode); progress just won't persist.
      }
      return next;
    });

  return (
    <div ref={rootRef}>
      <section className="pl-wrap pb-[clamp(28px,4vw,48px)] pt-[clamp(48px,8vw,104px)]">
        <h1 data-in className="m-0 text-[clamp(56px,10vw,140px)] font-extrabold leading-[.88] tracking-[-0.055em]">
          <span className="text-pl-red">17</span> ways love <Em>shows up.</Em>
        </h1>
        <div data-in className="mt-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <p className="m-0 max-w-[40ch] text-[clamp(18px,1.8vw,22px)] leading-[1.45] text-pl-body">
            From 1 Corinthians 13:4–8. Tap a card to see how to practise it. Tick the ones you’ve memorised.
          </p>
          <div className="min-w-[240px] flex-[0_1_320px]">
            <div className="flex justify-between text-[15px] font-bold">
              <span>Memorised</span>
              <span aria-live="polite">
                {count} / {total}
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-[6px] bg-[#f6eeed]">
              <div
                className="h-full w-full origin-left rounded-[6px] bg-pl-red transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(.3,1.3,.5,1)]"
                style={{ transform: `scaleX(${count / total})` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pl-wrap pb-[clamp(64px,9vw,120px)]">
        <div ref={gridRef} className="grid gap-[14px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))]">
          {CHARACTERISTICS.map((trait, i) => {
            const on = !!got[i];
            const red = RED.has(i);
            const isFlipped = flipped === i;
            const front = on ? 'bg-pl-yellow text-pl-ink' : red ? 'bg-pl-red text-white' : 'bg-white text-pl-ink';
            return (
              <div key={trait.short} data-card className="relative min-h-[230px] [perspective:1000px]">
                <button
                  type="button"
                  onClick={() => setFlipped(f => (f === i ? -1 : i))}
                  aria-pressed={isFlipped}
                  aria-label={`Love ${trait.short}. ${isFlipped ? `Practise it: ${PRACTICE[i]}` : 'Show how to practise it'}`}
                  className="absolute inset-0 w-full text-left transition-transform duration-700 [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(.3,1.3,.5,1)]"
                  style={{ transform: `rotateY(${isFlipped ? 180 : 0}deg)` }}
                >
                  <span
                    className={`absolute inset-0 flex flex-col justify-between rounded-[24px] border-2 border-pl-ink p-[22px] transition-colors duration-300 [backface-visibility:hidden] ${front}`}
                  >
                    <span className="pl-serif text-[44px] leading-[.8]">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block text-[14px] opacity-75">Love…</span>
                      <span className="block pr-2 text-[24px] font-extrabold leading-[1.02] tracking-[-0.03em]">{trait.short}</span>
                    </span>
                  </span>
                  <span className="absolute inset-0 flex flex-col justify-between rounded-[24px] border-2 border-pl-ink bg-pl-ink p-[22px] text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-pl-coral">Practise it</span>
                    <span className="text-[18px] leading-[1.4]">{PRACTICE[i]}</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleGot(i)}
                  aria-pressed={on}
                  aria-label={on ? `Unmark “${trait.short}” as memorised` : `Mark “${trait.short}” as memorised`}
                  className={`absolute right-3 top-3 z-[2] h-11 w-11 rounded-full border-2 text-[18px] font-extrabold transition-[transform,background-color] [transition-duration:350ms] [transition-timing-function:cubic-bezier(.3,1.7,.5,1)] ${
                    on ? 'scale-110 border-pl-ink bg-pl-ink text-white' : 'border-[#e6dad8] bg-white text-[#c9bcba]'
                  } ${isFlipped ? 'invisible' : ''}`}
                >
                  ✓
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
