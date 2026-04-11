import { useState, useRef, useEffect } from 'react';
import { Heart, Pen } from 'lucide-react';

const LOVE_VERSES = [
  { before: '', after: ' is patient,' },
  { before: '', after: ' is kind.' },
  { before: '', after: ' does not envy,' },
  { before: '', after: ' does not boast,' },
  { before: '', after: ' is not proud.' },
  { before: '', after: ' does not dishonor others,' },
  { before: '', after: ' is not self-seeking,' },
  { before: '', after: ' is not easily angered,' },
  { before: '', after: ' keeps no record of wrongs.' },
  { before: '', after: ' does not delight in evil but rejoices with the truth.' },
  { before: '', after: ' always protects, always trusts, always hopes, always perseveres.' },
] as const;

export default function ScriptureMirror() {
  const [name, setName] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

  const displayName = name.trim() || 'Love';

  // Intersection observer for reveal
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsRevealed(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Typewriter reveal of verse lines
  useEffect(() => {
    if (!isRevealed) {
      return;
    }

    if (visibleLines >= LOVE_VERSES.length) {
      return;
    }

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 280);

    return () => clearTimeout(timer);
  }, [isRevealed, visibleLines]);

  // Reset animation when name changes
  useEffect(() => {
    if (name.trim() && hasAnimated.current) {
      setVisibleLines(0);

      const timer = setTimeout(() => {
        setVisibleLines(LOVE_VERSES.length);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [name]);

  return (
    <section
      ref={sectionRef}
      id="scripture-mirror"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Warm ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,200,140,0.12)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="pill glass-border mx-auto inline-flex items-center gap-2 bg-white/10 text-[#8f4729]">
            <Heart className="h-4 w-4 text-red-700" />
            Put your name in love
          </div>
          <h2 className="mt-6 font-serif text-4xl leading-[0.92] text-[#3e1e17] md:text-5xl lg:text-6xl">
            Make it personal. Make it a mirror.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#6b4332]">
            Type your name below and let 1 Corinthians 13 stop being poetry — and start being a
            standard you either meet or fall short of.
          </p>
        </div>

        {/* Name input */}
        <div className="mx-auto mb-12 flex max-w-md items-center gap-3">
          <div className="relative flex-1">
            <Pen className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#b86b43]" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name…"
              maxLength={30}
              className="w-full rounded-full border border-[rgba(176,111,74,0.24)] bg-white/90 py-4 pl-12 pr-6 font-serif text-xl text-[#3e1e17] shadow-[0_12px_32px_rgba(95,53,30,0.08)] outline-none transition-all duration-300 placeholder:text-[#c4a28a] focus:border-[#d4864f] focus:shadow-[0_16px_40px_rgba(210,122,63,0.16)] focus:ring-2 focus:ring-[#e8a05c]/30"
              id="scripture-mirror-input"
            />
          </div>
        </div>

        {/* Scripture display */}
        <div className="scripture-mirror-container surface relative overflow-hidden bg-[linear-gradient(145deg,_#fdfaf7_0%,_#fff8f1_40%,_#f9ede0_100%)] p-8 md:p-12">
          {/* Decorative corner flourish */}
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(226,123,67,0.08)_0%,_transparent_70%)]" />
          <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(226,123,67,0.06)_0%,_transparent_70%)]" />

          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#b86b43]">
            1 Corinthians 13:4–7
          </p>

          <div className="relative space-y-3">
            {LOVE_VERSES.map((verse, index) => {
              const isVisible = index < visibleLines;

              return (
                <div
                  key={index}
                  className="scripture-verse-line transition-all duration-700"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                    transitionDelay: `${index * 60}ms`,
                  }}
                >
                  <p className="font-serif text-2xl leading-relaxed text-[#4c2b20] md:text-3xl">
                    <span
                      className={`scripture-name inline-block transition-all duration-500 ${
                        name.trim()
                          ? 'font-semibold text-[#912018] drop-shadow-[0_0_12px_rgba(145,32,24,0.15)]'
                          : 'text-[#b86b43]'
                      }`}
                    >
                      {verse.before}
                      {displayName}
                    </span>
                    <span className="text-[#6b4332]">{verse.after}</span>
                  </p>
                </div>
              );
            })}
          </div>

          {/* Reflection prompt */}
          <div
            className="mt-10 border-t border-[rgba(176,111,74,0.12)] pt-8 transition-all duration-1000"
            style={{
              opacity: visibleLines >= LOVE_VERSES.length ? 1 : 0,
              transform:
                visibleLines >= LOVE_VERSES.length ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            <p className="font-serif text-xl italic leading-relaxed text-[#8d5339]">
              "Is this true of you? Not in public performance — but in the private moments where no
              one claps, no one sees, and the only audience is God and the people who live with you."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
