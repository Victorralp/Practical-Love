import { useEffect, useRef, useState } from 'react';

const TRANSFORMATIONS = [
  {
    darkness: 'Anger',
    light: 'Patience',
    verse: '"Love is patient…" — 1 Cor 13:4',
    description: 'The same mouth that screams can learn to wait.',
  },
  {
    darkness: 'Cruelty',
    light: 'Kindness',
    verse: '"Love is kind…" — 1 Cor 13:4',
    description: 'Every home deserves a voice that heals instead of wounds.',
  },
  {
    darkness: 'Jealousy',
    light: 'Contentment',
    verse: '"It does not envy…" — 1 Cor 13:4',
    description: 'When you stop comparing, you start living.',
  },
  {
    darkness: 'Pride',
    light: 'Humility',
    verse: '"It is not proud…" — 1 Cor 13:4',
    description: 'The strongest person in the room is the one who kneels first.',
  },
  {
    darkness: 'Bitterness',
    light: 'Forgiveness',
    verse: '"It keeps no record of wrongs…" — 1 Cor 13:5',
    description: 'Unforgiveness is a prison. Love holds the key.',
  },
  {
    darkness: 'Selfishness',
    light: 'Sacrifice',
    verse: '"It is not self-seeking…" — 1 Cor 13:5',
    description: 'Love asks: what do you need? — not: what do I deserve?',
  },
] as const;

function TransformCard({
  item,
  isRevealed,
  index,
}: {
  item: (typeof TRANSFORMATIONS)[number];
  isRevealed: boolean;
  index: number;
}) {
  const [isTransformed, setIsTransformed] = useState(false);

  useEffect(() => {
    if (!isRevealed) {
      return;
    }

    const timer = setTimeout(
      () => {
        setIsTransformed(true);
      },
      800 + index * 200
    );

    return () => clearTimeout(timer);
  }, [isRevealed, index]);

  return (
    <div
      className="group relative"
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* The transformation card */}
      <div className="weight-transform-card relative overflow-hidden rounded-[1.75rem] border border-[rgba(176,111,74,0.12)] bg-white/90 p-6 shadow-[0_20px_50px_rgba(95,53,30,0.06)] transition-all duration-700 hover:shadow-[0_24px_60px_rgba(95,53,30,0.12)] md:p-8">
        {/* Background transition */}
        <div
          className="absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(135deg,_rgba(255,248,240,0.95)_0%,_rgba(255,243,231,0.95)_100%)] transition-opacity duration-1000"
          style={{ opacity: isTransformed ? 1 : 0 }}
        />

        {/* Warm glow when transformed */}
        <div
          className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(255,180,80,0.15)_0%,_transparent_70%)] transition-opacity duration-1000"
          style={{ opacity: isTransformed ? 1 : 0 }}
        />

        <div className="relative">
          {/* Word transformation — stacked vertically */}
          <div className="mb-5">
            {/* Darkness word */}
            <div>
              <span
                className="font-serif text-2xl transition-all duration-1000 md:text-3xl"
                style={{
                  color: isTransformed ? '#d4bca8' : '#3e1e17',
                  textDecorationLine: isTransformed ? 'line-through' : 'none',
                  textDecorationColor: '#c17249',
                  opacity: isTransformed ? 0.4 : 1,
                }}
              >
                {item.darkness}
              </span>
            </div>

            {/* Arrow (vertical) */}
            <div
              className="my-2 flex items-center gap-2 transition-all duration-700"
              style={{
                opacity: isTransformed ? 1 : 0,
                transform: isTransformed ? 'translateY(0)' : 'translateY(-6px)',
              }}
            >
              <svg viewBox="0 0 12 16" className="h-4 w-3 text-[#c17249]">
                <path
                  d="M6 2v12M3 11l3 3 3-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="h-px flex-1 bg-[#c17249]/20" />
            </div>

            {/* Light word */}
            <div>
              <span
                className="font-serif text-3xl font-semibold transition-all duration-1000 md:text-4xl"
                style={{
                  color: isTransformed ? '#912018' : 'transparent',
                  transform: isTransformed ? 'translateY(0)' : 'translateY(-10px)',
                  textShadow: isTransformed ? '0 0 30px rgba(145, 32, 24, 0.1)' : 'none',
                  display: 'inline-block',
                }}
              >
                {item.light}
              </span>
            </div>
          </div>

          {/* Verse */}
          <p
            className="mb-3 text-sm font-medium tracking-[0.1em] text-[#b86b43] transition-all duration-1000"
            style={{
              opacity: isTransformed ? 1 : 0,
              transform: isTransformed ? 'translateY(0)' : 'translateY(8px)',
              transitionDelay: '0.3s',
            }}
          >
            {item.verse}
          </p>

          {/* Description */}
          <p
            className="text-base leading-7 text-[#6b4332] transition-all duration-1000"
            style={{
              opacity: isTransformed ? 1 : 0.5,
              transitionDelay: '0.5s',
            }}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TheWeightOfWords() {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="weight-of-words"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(246,234,219,0)_0%,_rgba(240,224,204,0.5)_50%,_rgba(246,234,219,0)_100%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div
          className="mb-16 text-center transition-all duration-1000"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b76840]">
            The transformation
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-[0.94] text-[#3e1e17] md:text-5xl lg:text-6xl">
            Love does not erase the darkness.
            <br />
            <span className="text-[#912018]">It replaces it.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6b4332]">
            Every vice has a virtue waiting to take its place. Scroll through what love demands —
            and what it offers in return.
          </p>
        </div>

        {/* Transformation grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRANSFORMATIONS.map((item, index) => (
            <TransformCard key={item.darkness} item={item} isRevealed={isRevealed} index={index} />
          ))}
        </div>

        {/* Bottom reflection */}
        <div
          className="mt-16 text-center transition-all duration-1000"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '2s',
          }}
        >
          <p className="mx-auto max-w-xl font-serif text-xl italic leading-relaxed text-[#8d5339]">
            "The question is not whether you carry darkness. Everyone does. The question is whether
            you will let love replace it — one word, one day, one home at a time."
          </p>
        </div>
      </div>
    </section>
  );
}
