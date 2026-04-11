import { useState, useEffect, useRef, useCallback } from 'react';

const PRAYER_VERSES = [
  {
    text: '"Be still, and know that I am God."',
    ref: '— Psalm 46:10',
  },
  {
    text: '"The Lord is near to the brokenhearted and saves the crushed in spirit."',
    ref: '— Psalm 34:18',
  },
  {
    text: '"Cast all your anxiety on Him because He cares for you."',
    ref: '— 1 Peter 5:7',
  },
  {
    text: '"Come to me, all who are weary and burdened, and I will give you rest."',
    ref: '— Matthew 11:28',
  },
  {
    text: '"I have loved you with an everlasting love; I have drawn you with unfailing kindness."',
    ref: '— Jeremiah 31:3',
  },
] as const;

function CandleFlame() {
  return (
    <div className="candle-container relative mx-auto mb-10 flex h-40 w-24 items-end justify-center">
      {/* Glow behind flame */}
      <div className="candle-glow absolute -top-6 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,180,80,0.3)_0%,_rgba(255,140,50,0.08)_50%,_transparent_70%)]" />

      {/* Flame */}
      <svg
        viewBox="0 0 40 72"
        className="candle-flame relative z-10 h-16 w-8"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ff6b1a" />
            <stop offset="40%" stopColor="#ffa726" />
            <stop offset="70%" stopColor="#ffcc02" />
            <stop offset="100%" stopColor="#fff8e1" />
          </linearGradient>
          <linearGradient id="innerFlameGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#42a5f5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fff8e1" />
          </linearGradient>
        </defs>
        {/* Outer flame */}
        <path
          d="M20 2 C20 2, 6 28, 6 46 C6 58, 12 68, 20 70 C28 68, 34 58, 34 46 C34 28, 20 2, 20 2Z"
          fill="url(#flameGrad)"
          opacity="0.9"
        />
        {/* Inner flame */}
        <path
          d="M20 24 C20 24, 13 40, 13 50 C13 58, 16 64, 20 66 C24 64, 27 58, 27 50 C27 40, 20 24, 20 24Z"
          fill="url(#innerFlameGrad)"
          opacity="0.7"
        />
      </svg>

      {/* Candle body */}
      <div className="absolute bottom-0 h-14 w-8 rounded-b-lg rounded-t-sm bg-gradient-to-b from-[#f5e6d0] to-[#e8d5bc] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.06)]">
        <div className="absolute left-1/2 top-0 h-2 w-[2px] -translate-x-1/2 bg-[#3e2c1e]" />
      </div>
    </div>
  );
}

export default function PrayerPause() {
  const [activeVerse, setActiveVerse] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [prayerCount, setPrayerCount] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const rippleIdRef = useRef(0);

  // Rotate verses
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setActiveVerse((prev) => (prev + 1) % PRAYER_VERSES.length);
        setIsFading(false);
      }, 600);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handlePrayerClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = rippleIdRef.current++;

      setRipples((prev) => [...prev, { id, x, y }]);
      setPrayerCount((prev) => prev + 1);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1500);
    },
    []
  );

  const currentVerse = PRAYER_VERSES[activeVerse];

  return (
    <section
      ref={sectionRef}
      id="prayer-pause"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Deep warm background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(45,21,18,0.97)_0%,_rgba(30,14,11,0.99)_60%,_#1a0e0b_100%)]" />

      {/* Subtle ambient orbs */}
      <div className="absolute left-[20%] top-[20%] h-64 w-64 rounded-full bg-[#f7a84e]/6 blur-[80px]" />
      <div className="absolute bottom-[10%] right-[15%] h-48 w-48 rounded-full bg-[#d4683b]/8 blur-[60px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Pre-text */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#d4864f]">
          A sacred pause
        </p>
        <p className="mb-8 font-serif text-2xl leading-snug text-[#fff3e7]/70 md:text-3xl">
          Before you continue… take a breath.
          <br />
          Let this word settle.
        </p>

        {/* Candle */}
        <CandleFlame />

        {/* Rotating verse */}
        <div className="relative mx-auto min-h-[10rem] max-w-2xl">
          <div
            className={`transition-all duration-600 ${
              isFading ? 'scale-[0.98] opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <p className="font-serif text-3xl leading-snug text-[#fff8f1] md:text-4xl">
              {currentVerse.text}
            </p>
            <p className="mt-4 text-sm font-medium tracking-[0.16em] text-[#ffca9e]">
              {currentVerse.ref}
            </p>
          </div>
        </div>

        {/* Verse indicator dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {PRAYER_VERSES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsFading(true);
                setTimeout(() => {
                  setActiveVerse(index);
                  setIsFading(false);
                }, 400);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === activeVerse
                  ? 'w-6 bg-[#e8a05c]'
                  : 'w-2 bg-[#fff3e7]/20 hover:bg-[#fff3e7]/40'
              }`}
              aria-label={`Go to verse ${index + 1}`}
            />
          ))}
        </div>

        {/* Prayer button */}
        <div className="mt-12">
          <button
            onClick={handlePrayerClick}
            className="prayer-btn group relative overflow-hidden rounded-full border border-[#fff3e7]/16 bg-[#fff3e7]/8 px-8 py-4 font-medium text-[#ffe7d3] transition-all duration-500 hover:border-[#fff3e7]/28 hover:bg-[#fff3e7]/12 hover:shadow-[0_0_40px_rgba(255,200,140,0.1)]"
            id="prayer-button"
          >
            {/* Ripples */}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="prayer-ripple absolute rounded-full bg-[#ffc182]/20"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 0,
                  height: 0,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}

            <span className="relative z-10 flex items-center gap-3">
              <span className="prayer-heart-icon inline-block text-[#ffb87a]">♥</span>
              {prayerCount === 0
                ? "I'm praying right now"
                : `Praying${prayerCount > 1 ? ` (${prayerCount})` : ''} — amen`}
            </span>
          </button>

          {prayerCount > 0 && (
            <p className="mt-4 text-sm text-[#fff3e7]/40 transition-all duration-700">
              Your prayer is heard. God is near.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
