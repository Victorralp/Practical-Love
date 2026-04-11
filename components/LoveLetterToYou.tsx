import { useEffect, useRef, useState } from 'react';

const LETTER_LINES = [
  { text: 'My child,', delay: 0, className: 'text-4xl md:text-5xl' },
  { text: '', delay: 600, className: '' },
  {
    text: 'Before you were formed, I knew you.',
    delay: 900,
    className: 'text-2xl md:text-3xl',
  },
  {
    text: 'Before the world told you what you were worth,',
    delay: 1500,
    className: 'text-2xl md:text-3xl',
  },
  {
    text: 'I had already decided — you are priceless.',
    delay: 2100,
    className: 'text-2xl md:text-3xl',
  },
  { text: '', delay: 2700, className: '' },
  {
    text: 'I did not send love as a theory for you to study.',
    delay: 3000,
    className: 'text-xl md:text-2xl',
  },
  {
    text: 'I sent it as a Person for you to receive.',
    delay: 3600,
    className: 'text-xl md:text-2xl',
  },
  {
    text: 'And that love does not expire when you fail.',
    delay: 4200,
    className: 'text-xl md:text-2xl',
  },
  {
    text: 'It does not leave when you are difficult.',
    delay: 4800,
    className: 'text-xl md:text-2xl',
  },
  {
    text: 'It stays. It corrects. It rebuilds. It waits.',
    delay: 5400,
    className: 'text-xl md:text-2xl font-semibold',
  },
  { text: '', delay: 5800, className: '' },
  {
    text: 'You did not find this page by accident.',
    delay: 6200,
    className: 'text-2xl md:text-3xl',
  },
  {
    text: 'Something in you is searching for what love truly means.',
    delay: 7000,
    className: 'text-2xl md:text-3xl',
  },
  { text: '', delay: 7600, className: '' },
  {
    text: 'Let me show you.',
    delay: 8000,
    className: 'text-3xl md:text-4xl font-semibold',
  },
  { text: '', delay: 8600, className: '' },
  {
    text: '— Your Father, who art in heaven',
    delay: 9000,
    className: 'text-lg md:text-xl',
  },
] as const;

export default function LoveLetterToYou() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Intersection observer
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasStarted]);

  // Sequential line reveal
  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    if (visibleLines >= LETTER_LINES.length) {
      return;
    }

    const currentLine = LETTER_LINES[visibleLines];
    const prevDelay = visibleLines > 0 ? LETTER_LINES[visibleLines - 1].delay : 0;
    const wait = currentLine.delay - prevDelay;

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, Math.max(wait, 200));

    return () => clearTimeout(timer);
  }, [hasStarted, visibleLines]);

  return (
    <section
      ref={sectionRef}
      id="love-letter"
      className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      {/* Parchment texture background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,248,240,0.9)_0%,_rgba(246,234,219,0.95)_50%,_rgba(240,224,204,1)_100%)]" />

      {/* Warm light from top */}
      <div className="absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,210,160,0.18)_0%,_transparent_60%)]" />

      {/* Ink stain decorations */}
      <div className="absolute left-[8%] top-[15%] h-2 w-2 rounded-full bg-[#3e1e17]/10" />
      <div className="absolute right-[12%] top-[25%] h-1.5 w-1.5 rounded-full bg-[#3e1e17]/8" />
      <div className="absolute left-[15%] bottom-[20%] h-1 w-1 rounded-full bg-[#3e1e17]/6" />

      <div className="relative mx-auto max-w-3xl">
        {/* Letter header */}
        <div
          className="mb-16 text-center transition-all duration-1000"
          style={{
            opacity: hasStarted ? 1 : 0,
            transform: hasStarted ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="mx-auto mb-6 h-px w-16 bg-[#c17249]/30" />
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#b86b43]">
            A letter written before time
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-[#c17249]/30" />
        </div>

        {/* Letter body */}
        <div className="love-letter-body relative rounded-[2rem] border border-[rgba(176,111,74,0.1)] bg-white/60 p-10 shadow-[0_30px_80px_rgba(95,53,30,0.06)] backdrop-blur-sm md:p-14 lg:p-20">
          {/* Decorative corner */}
          <div className="absolute -left-3 -top-3 h-12 w-12 border-l-2 border-t-2 border-[#c17249]/20 rounded-tl-lg" />
          <div className="absolute -bottom-3 -right-3 h-12 w-12 border-b-2 border-r-2 border-[#c17249]/20 rounded-br-lg" />

          <div className="space-y-4">
            {LETTER_LINES.map((line, index) => {
              const isVisible = index < visibleLines;

              if (line.text === '') {
                return (
                  <div
                    key={index}
                    className="h-4"
                    style={{ opacity: isVisible ? 1 : 0 }}
                  />
                );
              }

              return (
                <div
                  key={index}
                  className="love-letter-line overflow-hidden"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: '0.1s',
                  }}
                >
                  <p
                    className={`font-serif leading-relaxed text-[#3e1e17] ${line.className}`}
                  >
                    {line.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Final flourish */}
          <div
            className="mt-12 flex justify-center transition-all duration-1500"
            style={{
              opacity: visibleLines >= LETTER_LINES.length ? 1 : 0,
              transform:
                visibleLines >= LETTER_LINES.length
                  ? 'translateY(0) scale(1)'
                  : 'translateY(20px) scale(0.9)',
              transition: 'all 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: '0.5s',
            }}
          >
            <svg
              viewBox="0 0 120 40"
              className="h-8 w-24 text-[#c17249]/40"
              aria-hidden="true"
            >
              <path
                d="M10 20 Q30 5 60 20 Q90 35 110 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="60" cy="20" r="3" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
