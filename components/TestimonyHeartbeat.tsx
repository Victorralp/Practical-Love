import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const TESTIMONIES = [
  {
    message:
      'When love of money leads a home, peace disappears quietly before anyone notices. We almost lost everything before we discovered that restoring love meant restoring order.',
    attribution: 'A family learning to rebuild',
    tag: 'Conviction',
  },
  {
    message:
      'Between ages 3 and 13, children absorb more than parents realize — including what is done behind closed doors. My children were watching when I thought nobody was.',
    attribution: 'A father confronting the mirror',
    tag: 'Awakening',
  },
  {
    message:
      'The first place a nation changes is the private life of the family. We stopped waiting for government and started governing our own household with the love of Christ.',
    attribution: 'A household in transformation',
    tag: 'National hope',
  },
  {
    message:
      'I put my name in 1 Corinthians 13 and it broke me. I was not patient. I was not kind. But for the first time, I had a mirror clear enough to show me where to start.',
    attribution: 'A member in the love challenge',
    tag: 'The mirror',
  },
  {
    message:
      'Practical love is not a feeling you wait to have. It is a discipline you practice until your family no longer recognizes the old version of you.',
    attribution: 'A testimony from Lagos',
    tag: 'Discipline',
  },
] as const;

export default function TestimonyHeartbeat() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // Once someone picks a testimony themselves, stop rotating so it never moves under them.
  const [hasTakenControl, setHasTakenControl] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Intersection observer
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Auto-rotation: only while visible, not hovered or focused, and never under reduced motion.
  useEffect(() => {
    if (!isInView || isPaused || hasTakenControl || prefersReducedMotion) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isInView, isPaused, hasTakenControl, prefersReducedMotion]);

  const goTo = (index: number) => {
    setHasTakenControl(true);
    setActiveIndex(index);
  };

  const goPrev = () => {
    goTo((activeIndex - 1 + TESTIMONIES.length) % TESTIMONIES.length);
  };

  const goNext = () => {
    goTo((activeIndex + 1) % TESTIMONIES.length);
  };

  const current = TESTIMONIES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="testimony-heartbeat"
      className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b76840]">
              Living voices
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[0.94] text-[#341a15] md:text-5xl">
              Hearts in the process of becoming what love demands.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setHasTakenControl((stopped) => !stopped)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(176,111,74,0.2)] bg-white/80 text-[#8d4a2b] transition-[transform,background-color,box-shadow] duration-200 hover:bg-white hover:shadow-md active:scale-95 active:duration-75"
                aria-label={hasTakenControl ? 'Play testimonies' : 'Pause testimonies'}
              >
                {hasTakenControl ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            )}
            <button
              onClick={goPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(176,111,74,0.2)] bg-white/80 text-[#8d4a2b] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:translate-y-0 active:scale-95 active:duration-75"
              aria-label="Previous testimony"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(176,111,74,0.2)] bg-white/80 text-[#8d4a2b] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:translate-y-0 active:scale-95 active:duration-75"
              aria-label="Next testimony"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Testimony card */}
        <div className="surface testimony-card relative overflow-hidden bg-[linear-gradient(145deg,_#fdfaf7_0%,_#fff8f1_40%,_#f9ede0_100%)] p-8 md:p-12 lg:p-16">
          {/* Breathing quote icon */}
          <div className="testimony-quote-icon absolute right-8 top-8 md:right-12 md:top-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f3dfcb]">
              <Quote className="h-7 w-7 text-[#c17249]" />
            </div>
          </div>

          {/* Golden mist decoration */}
          <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(255,200,130,0.1)_0%,_transparent_70%)]" />
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(226,123,67,0.06)_0%,_transparent_70%)]" />

          {/* Tag */}
          <div className="relative">
            <span className="inline-block rounded-full bg-[#f5e4d3] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#b86b43]">
              {current.tag}
            </span>
          </div>

          {/* Message: swaps immediately, then fades in, so a tap never waits on the old one leaving. */}
          <div key={activeIndex} className="relative mt-8 animate-[fadeSlideIn_300ms_ease-out]">
            <p className="max-w-4xl font-serif text-3xl leading-snug text-[#3e1e17] md:text-4xl lg:text-5xl lg:leading-[1.15]">
              {current.message}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-[rgba(176,111,74,0.2)] to-transparent" />
              <p className="text-sm font-medium tracking-[0.14em] text-[#9d6542]">
                {current.attribution}
              </p>
            </div>
          </div>

          {/* Progress dots */}
          {/* Dots stay small; each button is a 44px-tall hit area around its dot. */}
          <div className="-ml-1 mt-8 flex items-center">
            {TESTIMONIES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                className="group flex h-11 min-w-11 items-center justify-center px-1"
                aria-label={`Go to testimony ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              >
                <span
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                    index === activeIndex
                      ? 'w-10 bg-[#c17249]'
                      : 'w-4 bg-[#d4bca8] group-hover:bg-[#c4a28a]'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
