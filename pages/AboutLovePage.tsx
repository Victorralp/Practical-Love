import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Em, ImageSlot } from '../components/pl/primitives';
import { prefersReducedMotion, useEntrance, useScrollReveal } from '../components/pl/motion';

const STORY = [
  {
    title: 'The message already has tools people can carry.',
    text: 'The Yellow Card, the 17 characteristics and 50 love passages turn teaching into something you can hold, memorise and pass on.',
  },
  {
    title: 'Families should see how to practise it at once.',
    text: 'Every page ends in an action: one sentence to say, one habit to try, one person to love on purpose today.',
  },
  {
    title: 'The ministry is rooted in real homes.',
    text: 'Practical love is proved at the dinner table and in the car before it is preached from a stage.',
  },
];

const ROUTES = [
  {
    title: 'Characteristics of Love',
    text: 'The 17 traits from 1 Corinthians 13.',
    to: '/characteristics',
    tone: 'bg-pl-yellow text-pl-ink hover:text-pl-ink',
  },
  {
    title: 'Bible Passages',
    text: '50 scriptures on love to read aloud.',
    to: '/bible-passages',
    tone: 'bg-white text-pl-ink hover:text-pl-ink',
  },
  {
    title: 'Mission and Vision',
    text: 'Heart, household, nation.',
    to: '/mission-vision',
    tone: 'bg-pl-red text-white hover:text-white',
  },
];

export default function AboutLovePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEntrance(rootRef);
  useScrollReveal(rootRef);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const spin = ringRef.current?.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], {
      duration: 40000,
      iterations: Infinity,
    });
    return () => spin?.cancel();
  }, []);

  return (
    <div ref={rootRef}>
      <section className="pl-wrap grid items-center gap-[clamp(40px,6vw,88px)] pb-[clamp(48px,6vw,80px)] pt-[clamp(48px,8vw,104px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
        <div>
          <h1 data-in className="m-0 text-[clamp(52px,9vw,124px)] font-extrabold leading-[.88] tracking-[-0.055em]">
            What love is <Em>trying to restore.</Em>
          </h1>
          <p data-in className="pl-lede max-w-[38ch]">
            How the ministry began, why it starts with the home, and how practical love is meant to become visible in Nigerian family life.
          </p>
        </div>
        <div data-in className="relative aspect-square w-[min(100%,460px)] justify-self-center">
          <div className="absolute inset-[28px] overflow-hidden rounded-full border-2 border-pl-ink bg-pl-blush">
            <ImageSlot src="/love-hero.webp" alt="A family sharing a moment of love at home" label="A family at home" />
          </div>
          <div ref={ringRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <path id="about-ring" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
              </defs>
              <text className="fill-pl-red text-[11px] font-bold uppercase tracking-[3px]">
                <textPath href="#about-ring">Memorise · Meditate · Verbalise · Practicalise · </textPath>
              </text>
            </svg>
          </div>
        </div>
      </section>

      <section className="bg-pl-ink text-white">
        <div className="pl-wrap py-[clamp(56px,8vw,112px)]">
          <p className="m-0 text-[14px] font-bold uppercase tracking-[0.08em] text-pl-coral">Our story</p>
          <div className="mt-[clamp(24px,3vw,40px)] grid">
            {STORY.map((item, i) => (
              <div
                key={item.title}
                data-reveal
                className="grid gap-[clamp(16px,3vw,40px)] border-t border-white/20 py-[clamp(24px,3vw,36px)] [grid-template-columns:clamp(56px,10vw,140px)_minmax(0,1fr)]"
              >
                <span className="pl-serif text-[clamp(40px,5vw,72px)] leading-[.9] text-pl-red">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="m-0 text-[clamp(28px,3.4vw,44px)] font-extrabold leading-none tracking-[-0.035em]">{item.title}</h2>
                  <p className="mb-0 mt-3 max-w-[52ch] text-[18px] leading-[1.55] text-pl-ondark">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pl-wrap py-[clamp(56px,8vw,112px)]">
        <h2 data-reveal className="mb-[clamp(24px,3vw,40px)] mt-0 text-[clamp(36px,5vw,64px)] font-extrabold leading-[.95] tracking-[-0.045em]">
          Go deeper
        </h2>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
          {ROUTES.map(route => (
            <Link
              key={route.to}
              to={route.to}
              data-reveal
              className={`group flex min-h-[200px] items-end justify-between gap-4 rounded-[28px] border-2 border-pl-ink p-7 no-underline transition-[transform,box-shadow] [transition-duration:450ms] [transition-timing-function:cubic-bezier(.3,1.5,.5,1)] hover:-translate-y-2 hover:shadow-[8px_8px_0_#141010] motion-reduce:hover:translate-y-0 ${route.tone}`}
            >
              <span>
                <span className="block text-[clamp(26px,2.6vw,34px)] font-extrabold leading-none tracking-[-0.03em]">{route.title}</span>
                <span className="mt-2 block max-w-[26ch] text-[16px] opacity-85">{route.text}</span>
              </span>
              <span className="pl-serif text-[32px] transition-transform [transition-duration:400ms] group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
