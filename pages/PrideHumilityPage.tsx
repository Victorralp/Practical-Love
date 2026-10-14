import { useRef, useState } from 'react';
import { Em } from '../components/pl/primitives';
import { PRIDE_HUMILITY_PAIRS as PAIRS } from '../data/prideHumility';
import { useEntrance, usePopOnChange, useScrollReveal, useStagger } from '../components/pl/motion';

const SIGNS = [
  'Always defending yourself',
  'Needing to be noticed',
  'Refusing to apologise plainly',
  'Looking down on others',
  'Struggling to take correction',
  'Keeping score in arguments',
];

const RESULTS = [
  {
    title: 'Start with honesty.',
    text: 'Tap the signs that sound like you. Recognising pride is already an act of humility.',
    panel: 'bg-white text-pl-ink',
    bar: 'bg-pl-ink',
  },
  {
    title: 'A door is opening.',
    text: 'Pick one of these and practise its opposite this week. Say “I was wrong” once, plainly, with no explanation after it.',
    panel: 'bg-pl-blush text-pl-ink',
    bar: 'bg-pl-red',
  },
  {
    title: 'You are not alone in this.',
    text: 'Pride often hides pain. Bring this to God in prayer tonight, and ask one trusted person to help you notice it.',
    panel: 'bg-pl-red text-white',
    bar: 'bg-white',
  },
];

export default function PrideHumilityPage() {
  const [selected, setSelected] = useState<boolean[]>(() => SIGNS.map(() => false));
  const rootRef = useRef<HTMLDivElement | null>(null);
  const signsRef = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const count = selected.filter(Boolean).length;
  const band = count === 0 ? 0 : count <= 2 ? 1 : 2;
  const result = RESULTS[band];

  useEntrance(rootRef);
  useScrollReveal(rootRef);
  useStagger(signsRef, 'signs', { selector: '[data-sign]', delay: 300, step: 70 });
  usePopOnChange(resultRef, band, [
    { transform: 'translateY(16px)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ]);

  return (
    <div ref={rootRef}>
      <section className="pl-wrap pb-[clamp(40px,6vw,64px)] pt-[clamp(48px,8vw,104px)]">
        <h1 data-in className="m-0 text-[clamp(52px,9vw,124px)] font-extrabold leading-[.88] tracking-[-0.055em]">
          Pride closes. <Em>Humility opens.</Em>
        </h1>
        <p data-in className="pl-lede max-w-[44ch]">
          A gentle mirror for anyone who wants practical love to become real. Be honest. Nobody else sees your answers.
        </p>
      </section>

      <section className="pl-wrap grid items-start gap-[clamp(32px,5vw,72px)] pb-[clamp(56px,8vw,104px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        <div>
          <p className="mb-4 mt-0 text-[15px] font-bold">Tap any you recognise in yourself this week:</p>
          <div ref={signsRef} className="grid gap-[10px]">
            {SIGNS.map((sign, i) => {
              const on = selected[i];
              return (
                <button
                  key={sign}
                  type="button"
                  data-sign
                  aria-pressed={on}
                  onClick={() => setSelected(s => s.map((v, j) => (j === i ? !v : v)))}
                  className={`flex min-h-[64px] w-full items-center justify-between gap-4 rounded-[20px] border-2 border-pl-ink px-[22px] text-left text-[18px] font-semibold transition-[background-color,color,transform] [transition-duration:350ms] [transition-timing-function:cubic-bezier(.3,1.6,.5,1)] ${
                    on ? 'scale-[1.02] bg-pl-ink text-white' : 'bg-white text-pl-ink'
                  }`}
                >
                  {sign}
                  <span className="text-[20px]" aria-hidden="true">
                    {on ? '✓' : '+'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`sticky top-24 rounded-[32px] border-2 border-pl-ink p-[clamp(24px,3.4vw,40px)] transition-colors duration-500 ${result.panel}`}
        >
          <p className="m-0 text-[13px] font-bold uppercase tracking-[0.08em] opacity-80">The mirror</p>
          <div className="mt-4 h-[14px] overflow-hidden rounded-[7px] bg-black/10">
            <div
              className={`h-full w-full origin-left rounded-[7px] transition-transform [transition-duration:600ms] [transition-timing-function:cubic-bezier(.3,1.3,.5,1)] ${result.bar}`}
              style={{ transform: `scaleX(${Math.max(0.04, count / SIGNS.length)})` }}
            />
          </div>
          <div ref={resultRef} aria-live="polite">
            <h2 className="mb-0 mt-5 text-[clamp(32px,3.6vw,48px)] font-extrabold leading-[.98] tracking-[-0.04em]">{result.title}</h2>
            <p className="mb-0 mt-3 text-[18px] leading-[1.5]">{result.text}</p>
          </div>
          <p className="pl-serif mb-0 mt-6 border-t border-current pt-5 text-[24px] leading-[1.2]">
            “God opposes the proud but shows favour to the humble.”{' '}
            <span className="font-sans text-[13px] font-bold not-italic tracking-[0.08em]">JAMES 4:6</span>
          </p>
        </div>
      </section>

      <section className="bg-pl-ink text-white">
        <div className="pl-wrap py-[clamp(56px,8vw,112px)]">
          <h2 data-reveal className="mb-[clamp(28px,4vw,48px)] mt-0 text-[clamp(36px,5vw,64px)] font-extrabold leading-[.95] tracking-[-0.045em]">
            Pride says. <span className="pl-serif text-pl-coral">Humility says.</span>
          </h2>
          <div className="grid gap-[10px]">
            {PAIRS.map(pair => (
              <div key={pair.pride} data-reveal className="grid gap-[10px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
                <div className="rounded-[20px] border border-white/25 px-6 py-5 text-[19px] text-[#cbbcba] line-through decoration-pl-red">
                  <span className="sr-only">Pride says: </span>
                  {pair.pride}
                </div>
                <div className="rounded-[20px] bg-pl-red px-6 py-5 text-[19px] font-semibold">
                  <span className="sr-only">Humility says: </span>
                  {pair.humility}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
