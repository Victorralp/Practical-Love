import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Em } from '../components/pl/primitives';
import { animate, prefersReducedMotion, useEntrance, usePopOnChange } from '../components/pl/motion';
import { CHARACTERISTICS } from '../data/yellowCard';

const ROUTINE = [
  { when: 'Morning', what: 'Read one characteristic. Set your intention.' },
  { when: 'All day', what: 'Practise that one trait in every conversation.' },
  { when: 'Evening', what: 'Review how you loved. Note one thing for tomorrow.' },
];

function capitalise(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function YellowCardPage() {
  const [back, setBack] = useState(false);
  const [pick, setPick] = useState(() => new Date().getDate() % CHARACTERISTICS.length);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const todayRef = useRef<HTMLHeadingElement | null>(null);

  useEntrance(rootRef);
  usePopOnChange(todayRef, pick, [
    { transform: 'translateY(30px)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    animate(
      cardRef.current,
      [
        { transform: 'rotateY(-30deg) rotate(-12deg) translateY(60px)', opacity: 0 },
        { transform: 'rotateY(0) rotate(-3deg)', opacity: 1 },
      ],
      { duration: 1200, delay: 300, easing: 'cubic-bezier(.3,1.3,.5,1)', fill: 'backwards' }
    );
  }, []);

  const flip = () => setBack(b => !b);
  const shuffle = () =>
    setPick(current => {
      let next = current;
      while (next === current) next = Math.floor(Math.random() * CHARACTERISTICS.length);
      return next;
    });

  return (
    <div ref={rootRef}>
      <section className="pl-noprint pl-wrap grid items-center gap-[clamp(40px,6vw,88px)] py-[clamp(48px,7vw,96px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
        <div>
          <Link to="/resources" className="text-[15px] font-semibold text-pl-ink no-underline">
            ← Resources
          </Link>
          <h1 data-in className="mb-0 mt-5 text-[clamp(56px,9vw,128px)] font-extrabold leading-[.88] tracking-[-0.055em]">
            The Yellow <Em>Card.</Em>
          </h1>
          <p data-in className="pl-lede max-w-[36ch]">
            The 17 characteristics of love from 1 Corinthians 13, on one card. Keep it in your wallet, on the fridge, by the bed.
          </p>
          <div data-in className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={flip} className="pl-btn pl-btn-ink">
              {back ? 'Show the 17 traits' : 'Flip for the daily routine'}
            </button>
            <button type="button" onClick={() => window.print()} className="pl-btn pl-btn-outline">
              Print the card
            </button>
          </div>
        </div>

        <div data-in className="w-[min(100%,520px)] justify-self-center [perspective:1400px]">
          <div ref={cardRef}>
            <div
              role="button"
              tabIndex={0}
              aria-label={back ? 'Yellow Card, back: daily routine. Activate to flip.' : 'Yellow Card, front: 17 characteristics. Activate to flip.'}
              onClick={flip}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  flip();
                }
              }}
              className="relative aspect-[5/7] cursor-pointer transition-transform duration-[900ms] [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(.3,1.3,.5,1)]"
              style={{ transform: `rotateY(${back ? 180 : 0}deg) rotate(-3deg)` }}
            >
              <div className="absolute inset-0 flex flex-col rounded-[28px] border-2 border-pl-ink bg-pl-yellow p-[clamp(20px,3vw,32px)] shadow-[14px_14px_0_#e1251b] [backface-visibility:hidden]">
                <div className="flex items-baseline justify-between">
                  <span className="text-[16px] font-extrabold">
                    practical<span className="text-pl-red">♥</span>love
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.08em]">1 Cor 13:4–8</span>
                </div>
                <p className="pl-serif mb-[6px] mt-3 text-[clamp(26px,3vw,34px)] leading-none">Love…</p>
                <ol className="m-0 grid list-none gap-[clamp(2px,.4vw,5px)] p-0 text-[clamp(12px,1.25vw,15px)] font-semibold leading-[1.2]">
                  {CHARACTERISTICS.map((c, i) => (
                    <li key={c.full} className={`flex gap-2 rounded-[6px] px-[6px] py-[2px] transition-colors duration-300 ${i === pick ? 'bg-white' : ''}`}>
                      <span className="min-w-[1.6em] text-pl-press">{i + 1}</span>
                      {capitalise(c.short)}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="absolute inset-0 flex flex-col justify-between rounded-[28px] border-2 border-pl-ink bg-pl-red p-[clamp(24px,4vw,44px)] text-white shadow-[14px_14px_0_#ffd23f] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="text-[12px] font-bold uppercase tracking-[0.08em]">Every day</span>
                <div className="grid gap-5">
                  {ROUTINE.map(r => (
                    <div key={r.when}>
                      <b className="text-[22px]">{r.when}</b>
                      <p className="mb-0 mt-1 text-[16px] leading-[1.4]">{r.what}</p>
                    </div>
                  ))}
                </div>
                <p className="pl-serif m-0 text-[clamp(28px,3vw,38px)] leading-none">Love never fails.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pl-noprint bg-pl-yellow">
        <div className="pl-wrap py-[clamp(48px,7vw,96px)]">
          <p className="m-0 text-[14px] font-bold uppercase tracking-[0.08em]">Today’s trait</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <h2 ref={todayRef} aria-live="polite" className="m-0 max-w-[14ch] text-[clamp(44px,7vw,104px)] font-extrabold leading-[.9] tracking-[-0.05em]">
              <span className="pl-serif text-pl-press">Love</span> {CHARACTERISTICS[pick].short}.
            </h2>
            <button type="button" onClick={shuffle} className="pl-btn border-2 border-pl-ink bg-white text-pl-ink">
              Pick another ↻
            </button>
          </div>
        </div>
      </section>

      <section className="pl-noprint pl-wrap flex flex-wrap items-center justify-between gap-6 py-[clamp(48px,7vw,96px)]">
        <h2 className="pl-h2 m-0 max-w-[16ch]">
          Go deeper, <Em>one trait at a time.</Em>
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/characteristics" className="pl-btn pl-btn-red">
            The characteristics guide
          </Link>
          <Link to="/love-challenge" className="pl-btn pl-btn-outline">
            Take the 30-day challenge
          </Link>
        </div>
      </section>

      {/* Printed version: the full Amplified wording, as on the physical card. */}
      <section className="pl-print-only p-6 text-pl-ink">
        <h1 className="m-0 text-[28px] font-extrabold">Practical Love: The Yellow Card</h1>
        <p className="mb-4 mt-1 text-[13px] font-semibold uppercase tracking-[0.08em]">Insert your name wherever you see “LOVE”</p>
        <ol className="m-0 grid gap-1 pl-6 text-[14px] leading-[1.35]">
          {CHARACTERISTICS.map(c => (
            <li key={c.full}>{c.full}</li>
          ))}
        </ol>
        <p className="mb-0 mt-4 text-[13px] font-bold">1 Corinthians 13 (Amplified)</p>
      </section>
    </div>
  );
}
