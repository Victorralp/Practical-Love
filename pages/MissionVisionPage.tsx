import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Em } from '../components/pl/primitives';
import { prefersReducedMotion, useEntrance, usePopOnChange, useScrollReveal } from '../components/pl/motion';

const RINGS = [
  {
    title: 'Heart change',
    text: 'It starts inside one person: pride surrendered, the 17 characteristics memorised and practised until they become reflex.',
  },
  {
    title: 'Household change',
    text: 'A changed heart changes the tone of a home. Marriage, parenting and siblings become the first proving ground of love.',
  },
  {
    title: 'National change',
    text: 'Every corrupt or righteous leader comes from a home. Heal enough families and you heal the nation.',
  },
];

// Inner ring first in the data, drawn outermost first so the inner one sits on top.
const RING_SIZE = [38, 68, 98];
const RING_PAD = [16, 8, 5];
const RING_IDLE = ['bg-pl-blush', 'bg-white', 'bg-white'];

const BELIEFS = [
  { title: 'Family first', text: 'Every corrupt or righteous leader comes from a home. Heal the family, heal the nation.' },
  { title: 'Love transforms', text: 'Love is not weak sentiment. It turns selfishness into service and division into unity.' },
  { title: 'Blessing follows', text: 'Families that practise love position themselves under the blessing that follows honour and obedience.' },
];

const STEPS = [
  { title: 'Equip with the Yellow Card', text: 'Put the 17 characteristics in every hand, wallet and kitchen.' },
  { title: 'Teach the characteristics', text: 'In homes, churches and schools, one trait at a time.' },
  { title: 'Build daily practice', text: 'Morning reflection, daily goal, evening review. Repeat until it is habit.' },
];

export default function MissionVisionPage() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  useEntrance(rootRef);
  useScrollReveal(rootRef);
  usePopOnChange(detailRef, active, [
    { transform: 'translateY(20px)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ]);

  // Walk through the rings until the visitor picks one.
  useEffect(() => {
    if (touched || prefersReducedMotion()) return;
    const timer = window.setInterval(() => setActive(a => (a + 1) % RINGS.length), 3500);
    return () => window.clearInterval(timer);
  }, [touched]);

  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  return (
    <div ref={rootRef}>
      <section className="pl-wrap pb-[clamp(32px,5vw,56px)] pt-[clamp(48px,8vw,104px)]">
        <h1 data-in className="m-0 max-w-[13ch] text-[clamp(52px,9vw,124px)] font-extrabold leading-[.88] tracking-[-0.055em]">
          One family <Em>at a time.</Em>
        </h1>
        <p data-in className="pl-lede max-w-[44ch]">
          Transforming Nigeria through the overwhelming, winning power of God’s practical love.
        </p>
      </section>

      <section className="pl-wrap grid items-center gap-[clamp(40px,6vw,88px)] pb-[clamp(64px,9vw,120px)] pt-[clamp(24px,4vw,48px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
        <div className="relative aspect-square w-[min(100%,520px)] justify-self-center">
          {[2, 1, 0].map(i => {
            const on = active === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => pick(i)}
                onMouseEnter={() => pick(i)}
                aria-pressed={on}
                aria-label={RINGS[i].title}
                className={`absolute left-1/2 top-1/2 flex aspect-square items-start justify-center rounded-full border-2 border-pl-ink transition-[transform,background-color,color] duration-[700ms] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] ${
                  on ? 'bg-pl-red text-white' : `${RING_IDLE[i]} text-pl-ink`
                }`}
                style={{
                  width: `${RING_SIZE[i]}%`,
                  paddingTop: `${RING_PAD[i]}%`,
                  zIndex: 3 - i,
                  transform: `translate(-50%,-50%) scale(${on ? 1.04 : 1})`,
                }}
              >
                <span className="text-[clamp(16px,1.8vw,22px)] font-extrabold tracking-[-0.02em]">{RINGS[i].title.replace(' change', '')}</span>
              </button>
            );
          })}
        </div>
        <div>
          <p className="m-0 text-[14px] font-bold uppercase tracking-[0.08em] text-pl-red">How change spreads · {active + 1} of 3</p>
          <div ref={detailRef} aria-live="polite">
            <h2 className="mb-0 mt-3 text-[clamp(40px,5vw,72px)] font-extrabold leading-[.92] tracking-[-0.045em]">{RINGS[active].title}</h2>
            <p className="mb-0 mt-4 max-w-[38ch] text-[19px] leading-[1.5] text-pl-body">{RINGS[active].text}</p>
          </div>
        </div>
      </section>

      <section className="bg-pl-red text-white">
        <div className="pl-wrap py-[clamp(56px,8vw,112px)]">
          <h2 data-reveal className="mb-[clamp(28px,4vw,48px)] mt-0 text-[clamp(36px,5vw,64px)] font-extrabold leading-[.95] tracking-[-0.045em]">
            What we believe
          </h2>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
            {BELIEFS.map((belief, i) => (
              <div key={belief.title} data-reveal className="rounded-[28px] bg-white p-7 text-pl-ink">
                <span className="pl-serif text-[48px] leading-[.8] text-pl-red">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mb-0 mt-4 text-[28px] font-extrabold tracking-[-0.03em]">{belief.title}</h3>
                <p className="mb-0 mt-[10px] text-[17px] leading-[1.5] text-pl-body">{belief.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pl-wrap py-[clamp(56px,8vw,112px)]">
        <h2 data-reveal className="mb-[clamp(28px,4vw,48px)] mt-0 text-[clamp(36px,5vw,64px)] font-extrabold leading-[.95] tracking-[-0.045em]">
          How the vision becomes <Em>practical</Em>
        </h2>
        <div className="grid gap-[clamp(24px,3vw,40px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {STEPS.map((step, i) => (
            <div key={step.title} data-reveal className="border-t-4 border-pl-ink pt-5">
              <span className="text-[15px] font-extrabold text-pl-red">Step {i + 1}</span>
              <h3 className="mb-0 mt-2 text-[28px] font-extrabold tracking-[-0.03em]">{step.title}</h3>
              <p className="mb-0 mt-[10px] text-[17px] leading-[1.5] text-pl-body">{step.text}</p>
            </div>
          ))}
        </div>
        <Link to="/contact" data-reveal className="pl-btn pl-btn-ink mt-[clamp(40px,6vw,64px)]">
          Join the movement →
        </Link>
      </section>
    </div>
  );
}
