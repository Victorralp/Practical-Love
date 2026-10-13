import { useEffect, useRef, useState } from 'react';
import { Em } from '../components/pl/primitives';
import { EASE_SPRING, animate, prefersReducedMotion, useEntrance, useScrollReveal } from '../components/pl/motion';

const CHAIN = [
  { kind: 'Starts as', title: 'Private conduct', tone: 'bg-pl-ink text-white' },
  { kind: 'Becomes', title: 'Family tone', tone: 'bg-white text-pl-ink' },
  { kind: 'Becomes', title: 'Culture', tone: 'bg-white text-pl-ink' },
  { kind: 'Becomes', title: 'The future', tone: 'bg-pl-red text-white' },
];

const PILLARS = [
  {
    title: 'Character is trained at close range',
    text: 'Children learn love by watching how parents speak when tired, correct when angry, and apologise when wrong. The home is the first classroom.',
  },
  {
    title: 'Love must survive ordinary pressure',
    text: 'Bills, noise, delays and disappointments test love more than grand moments. Patience at 7am on a school day is where the 17 characteristics are proved.',
  },
  {
    title: 'Nations inherit household patterns',
    text: 'The habits learned at home, honesty or deceit, service or selfishness, are carried into offices, churches and government.',
  },
];

const TONIGHT = [
  'Thank each person at dinner for one specific thing.',
  'Apologise plainly for one sharp word today, no “but”.',
  'Pray for your spouse or child by name, aloud.',
];

export default function FamilyFirstPage() {
  const [open, setOpen] = useState(0);
  const [done, setDone] = useState<boolean[]>(() => TONIGHT.map(() => false));
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chainRef = useRef<HTMLOListElement | null>(null);

  useEntrance(rootRef);
  useScrollReveal(rootRef);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    chainRef.current?.querySelectorAll<HTMLElement>('[data-link]').forEach((el, i) =>
      animate(
        el,
        [
          { transform: 'translateX(-40px) scale(.9)', opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 700, delay: 400 + i * 220, easing: EASE_SPRING, fill: 'backwards' }
      )
    );
  }, []);

  const count = done.filter(Boolean).length;

  return (
    <div ref={rootRef}>
      <section className="pl-wrap pb-[clamp(40px,6vw,72px)] pt-[clamp(48px,8vw,104px)]">
        <h1 data-in className="m-0 text-[clamp(56px,10vw,140px)] font-extrabold leading-[.88] tracking-[-0.055em]">
          Family <Em>first.</Em>
        </h1>
        <p data-in className="pl-lede max-w-[44ch]">
          The home is where private conduct becomes culture, and culture eventually becomes the future.
        </p>
      </section>

      <section className="pl-wrap pb-[clamp(56px,8vw,104px)]">
        <ol ref={chainRef} className="m-0 grid list-none items-stretch gap-3 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          {CHAIN.map(link => (
            <li
              key={link.title}
              data-link
              className={`flex min-h-[150px] flex-col justify-between rounded-[24px] border-2 border-pl-ink p-6 ${link.tone}`}
            >
              <span className="text-[13px] font-bold uppercase tracking-[0.08em] opacity-75">{link.kind}</span>
              <span className="text-[clamp(30px,3vw,40px)] font-extrabold leading-[.95] tracking-[-0.04em]">{link.title}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-pl-blush">
        <div className="pl-wrap py-[clamp(56px,8vw,112px)]">
          <h2 data-reveal className="mb-[clamp(28px,4vw,48px)] mt-0 max-w-[16ch] text-[clamp(36px,5vw,64px)] font-extrabold leading-[.95] tracking-[-0.045em]">
            Why love is tested <Em>at home</Em>
          </h2>
          <div className="grid gap-3">
            {PILLARS.map((pillar, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={pillar.title}
                  type="button"
                  data-reveal
                  aria-expanded={isOpen}
                  onClick={() => setOpen(current => (current === i ? -1 : i))}
                  className={`block w-full rounded-[28px] border-2 border-pl-ink p-[clamp(20px,2.6vw,32px)] text-left text-pl-ink transition-colors duration-300 ${
                    isOpen ? 'bg-white' : 'bg-transparent'
                  }`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="text-[clamp(24px,2.8vw,36px)] font-extrabold leading-[1.05] tracking-[-0.03em]">{pillar.title}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-pl-ink text-[22px] text-white transition-transform duration-[450ms] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)]"
                      style={{ transform: `rotate(${isOpen ? 45 : 0}deg)` }}
                    >
                      +
                    </span>
                  </span>
                  <span
                    className="grid transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(.3,0,0,1)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-[56ch] pt-[14px] text-[18px] leading-[1.55] text-pl-body">{pillar.text}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pl-wrap py-[clamp(56px,8vw,112px)]">
        <h2 data-reveal className="m-0 text-[clamp(36px,5vw,64px)] font-extrabold leading-[.95] tracking-[-0.045em]">
          Try this <Em>tonight</Em>
        </h2>
        <div className="mt-[clamp(24px,3vw,40px)] grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
          {TONIGHT.map((task, i) => (
            <label
              key={task}
              data-reveal
              className={`flex cursor-pointer items-start gap-[14px] rounded-[24px] border-2 border-pl-ink p-[22px] transition-colors duration-300 ${
                done[i] ? 'bg-pl-blush' : 'bg-white'
              }`}
            >
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => setDone(d => d.map((v, j) => (j === i ? !v : v)))}
                className="mt-[2px] h-6 w-6 flex-none accent-pl-red"
              />
              <span className="text-[18px] font-semibold leading-[1.35]">{task}</span>
            </label>
          ))}
        </div>
        <p className="mb-0 mt-5 text-[20px] font-extrabold" aria-live="polite">
          {count === TONIGHT.length ? 'All three. That is practical love ♥' : `${count} of ${TONIGHT.length} done`}
        </p>
      </section>
    </div>
  );
}
