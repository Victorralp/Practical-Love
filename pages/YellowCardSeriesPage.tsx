import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Em } from '../components/pl/primitives';
import { useEntrance, usePopOnChange } from '../components/pl/motion';
import { CHARACTERISTICS, LOVE_PASSAGES, SUMMARY_POINTS } from '../data/yellowCard';

const CARDS = [
  {
    big: '17',
    title: 'Characteristics of Love',
    text: 'The full 1 Corinthians 13 list, numbered so you can memorise one a day and test it in real relationships.',
    face: 'bg-pl-yellow text-pl-ink',
    shadow: 'shadow-[12px_12px_0_#e1251b]',
  },
  {
    big: '50',
    title: 'Love Passages',
    text: 'Fifty New Testament scriptures on love, for meditation, teaching, and speaking aloud. Study each one with a Life Application Bible Commentary.',
    face: 'bg-pl-red text-white',
    shadow: 'shadow-[12px_12px_0_#ffd23f]',
  },
  {
    big: '1',
    title: 'Summary of the Message',
    text: 'Why love must return to Nigerian homes, and the promise for every family that memorises and practises it. The whole ministry on one card you can hand to anyone.',
    face: 'bg-pl-ink text-white',
    shadow: 'shadow-[12px_12px_0_#ffd23f]',
  },
];

// Stack slots: front, right, left.
const SLOTS = [
  { x: 0, r: -2, s: 1 },
  { x: 22, r: 8, s: 0.9 },
  { x: -22, r: -9, s: 0.9 },
];

type PrintScope = 'all' | 0 | 1 | 2;

function CardText({ index }: { index: 0 | 1 | 2 }) {
  if (index === 0)
    return (
      <>
        <p className="mb-3 mt-1 text-[0.8em] font-semibold uppercase tracking-[0.08em]">Insert your name wherever you see “LOVE”</p>
        <ol className="m-0 grid gap-1 pl-6">
          {CHARACTERISTICS.map(c => (
            <li key={c.full}>{c.full}</li>
          ))}
        </ol>
        <p className="mb-0 mt-3 font-bold">1 Corinthians 13 (Amplified)</p>
      </>
    );
  if (index === 1)
    return (
      <>
        <ol className="m-0 mt-3 pl-6 [columns:2_220px]">
          {LOVE_PASSAGES.map(p => (
            <li key={p}>{p}</li>
          ))}
        </ol>
        <p className="mb-0 mt-3">Study each verse (1–50) using a Life Application Bible Commentary. Reproduce and give to every Nigerian.</p>
      </>
    );
  return (
    <>
      <p className="mb-3 mt-1 text-[0.8em] font-semibold uppercase tracking-[0.08em]">Love Ministry for Nigeria</p>
      <ol className="m-0 grid gap-2 pl-6">
        {SUMMARY_POINTS.map(p => (
          <li key={p}>{p}</li>
        ))}
      </ol>
    </>
  );
}

export default function YellowCardSeriesPage() {
  const [active, setActive] = useState(0);
  const [printScope, setPrintScope] = useState<PrintScope>('all');
  const rootRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  useEntrance(rootRef);
  usePopOnChange(detailRef, active, [
    { transform: 'translateY(20px)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ]);

  const print = (scope: PrintScope) => {
    setPrintScope(scope);
    // Let React render the chosen card into the print layout first.
    window.setTimeout(() => window.print(), 50);
  };

  const shows = (i: 0 | 1 | 2) => printScope === 'all' || printScope === i;
  const current = CARDS[active];

  return (
    <div ref={rootRef}>
      <div className="pl-noprint">
        <section className="pl-wrap pb-6 pt-[clamp(48px,7vw,96px)]">
          <Link to="/resources" className="text-[15px] font-semibold text-pl-ink no-underline">
            ← Resources
          </Link>
          <h1 data-in className="mb-0 mt-5 text-[clamp(52px,9vw,128px)] font-extrabold leading-[.88] tracking-[-0.055em]">
            Three cards. <Em>One message.</Em>
          </h1>
          <p data-in className="pl-lede max-w-[42ch]">
            Print the set: the 17 characteristics of love, 50 love passages, and the summary message. Tap a card to bring it forward.
          </p>
        </section>

        <section className="pl-wrap grid items-center gap-[clamp(40px,6vw,88px)] pb-[clamp(64px,9vw,120px)] pt-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          <div data-in className="relative h-[clamp(420px,52vw,600px)]">
            {CARDS.map((card, i) => {
              const pos = (i - active + CARDS.length) % CARDS.length;
              const slot = SLOTS[pos];
              return (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={card.title}
                  aria-pressed={i === active}
                  className={`absolute left-1/2 top-1/2 m-0 box-border flex aspect-[5/7] w-[min(78%,340px)] flex-col justify-between rounded-[24px] border-2 border-pl-ink p-6 text-left transition-[transform,box-shadow] [transition-duration:800ms] [transition-timing-function:cubic-bezier(.3,1.35,.5,1)] ${card.face} ${pos === 0 ? card.shadow : 'shadow-none'}`}
                  style={{
                    zIndex: CARDS.length - pos,
                    transform: `translate(-50%,-50%) translateX(${slot.x}%) rotate(${slot.r}deg) scale(${slot.s})`,
                  }}
                >
                  <span className="text-[12px] font-bold uppercase tracking-[0.08em]">Card {i + 1} of 3</span>
                  <span>
                    <span className="pl-serif block text-[clamp(64px,7vw,96px)] leading-[.85]">{card.big}</span>
                    <span className="mt-[10px] block text-[clamp(24px,2.4vw,30px)] font-extrabold leading-none tracking-[-0.03em]">{card.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div>
            <p className="m-0 text-[14px] font-bold uppercase tracking-[0.08em] text-pl-red">Card {active + 1}</p>
            <div ref={detailRef} aria-live="polite">
              <h2 className="mb-0 mt-[10px] text-[clamp(40px,5vw,72px)] font-extrabold leading-[.92] tracking-[-0.045em]">{current.title}</h2>
              <p className="mb-0 mt-4 max-w-[38ch] text-[18px] leading-[1.5] text-pl-body">{current.text}</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => print(active as 0 | 1 | 2)} className="pl-btn pl-btn-red">
                Print this card
              </button>
              <button type="button" onClick={() => print('all')} className="pl-btn pl-btn-outline">
                Print all 3
              </button>
            </div>
            <div className="mt-8 flex gap-2">
              {CARDS.map((card, i) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${card.title}`}
                  className="flex h-11 w-11 items-center border-0 bg-transparent"
                >
                  <span className={`block h-1 w-full rounded-sm transition-colors duration-300 ${i === active ? 'bg-pl-red' : 'bg-[#f1d9d6]'}`} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-pl-blush">
          <div className="pl-wrap py-[clamp(48px,7vw,96px)]">
            <p className="m-0 text-[14px] font-bold uppercase tracking-[0.08em] text-pl-red">On card {active + 1}</p>
            <h2 className="pl-h2 mb-0 mt-3">{current.title}</h2>
            <div className="mt-6 max-w-[860px] text-[17px] leading-[1.55] text-pl-body">
              <CardText index={active as 0 | 1 | 2} />
            </div>
          </div>
        </section>
      </div>

      {/* Printed cards: the full text of each card, as distributed. */}
      <div className="pl-print-only p-6 text-[13px] leading-[1.4] text-pl-ink">
        {([0, 1, 2] as const).filter(shows).map(i => (
          <section key={i} className="mb-6 break-after-page last:break-after-auto">
            <h2 className="m-0 text-[22px] font-extrabold">{CARDS[i].title}</h2>
            <CardText index={i} />
          </section>
        ))}
      </div>
    </div>
  );
}
