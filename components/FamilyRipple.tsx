import { useEffect, useRef, useState } from 'react';
import { House } from 'lucide-react';

const RINGS = [
  { label: 'Marriage', delay: 0, size: 160, description: 'Where love is first tested' },
  { label: 'Children', delay: 400, size: 260, description: 'Where love is absorbed and repeated' },
  { label: 'Community', delay: 800, size: 360, description: 'Where love becomes visible to others' },
  { label: 'Nation', delay: 1200, size: 460, description: 'Where love reshapes the future' },
] as const;

export default function FamilyRipple() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRing, setActiveRing] = useState(-1);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timers = RINGS.map((ring, index) =>
      setTimeout(() => setActiveRing(index), ring.delay + 600)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className="relative mx-auto flex flex-col items-center py-12"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      {/* Ripple rings container */}
      <div className="relative flex h-[500px] w-[500px] max-w-full items-center justify-center">
        {/* Rings */}
        {RINGS.map((ring, index) => (
          <div
            key={ring.label}
            className="absolute rounded-full border transition-all duration-1000"
            style={{
              width: `${ring.size}px`,
              height: `${ring.size}px`,
              borderColor: activeRing >= index
                ? `rgba(193, 114, 73, ${0.3 - index * 0.05})`
                : 'rgba(193, 114, 73, 0.05)',
              backgroundColor: activeRing >= index
                ? `rgba(193, 114, 73, ${0.04 - index * 0.008})`
                : 'transparent',
              transform: activeRing >= index ? 'scale(1)' : 'scale(0.85)',
              opacity: activeRing >= index ? 1 : 0.3,
            }}
          >
            {/* Label on ring */}
            <div
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-700"
              style={{
                top: '-12px',
                opacity: activeRing >= index ? 1 : 0,
                transform: activeRing >= index ? 'translateY(0)' : 'translateY(8px)',
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <span className="rounded-full bg-[#f6eadb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#9d4b2a] shadow-sm">
                {ring.label}
              </span>
            </div>
          </div>
        ))}

        {/* Center home */}
        <div
          className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#5a2818_0%,_#8e331f_100%)] shadow-[0_8px_30px_rgba(90,40,24,0.3)] transition-all duration-700"
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(0.5)',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <House className="h-8 w-8 text-[#ffd2af]" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(255,210,175,0.15)_0%,_transparent_70%)]" />
        </div>
      </div>

      {/* Description below */}
      <div className="mt-6 text-center">
        <p className="font-serif text-xl italic text-[#8d5339]">
          Love starts in one home. It ends in a nation.
        </p>
        <div className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-4">
          {RINGS.map((ring, index) => (
            <div
              key={ring.label}
              className="rounded-xl border border-[rgba(176,111,74,0.1)] bg-white/80 p-3 text-center transition-all duration-500"
              style={{
                opacity: activeRing >= index ? 1 : 0.3,
                transform: activeRing >= index ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              <p className="text-xs font-semibold text-[#9d4b2a]">{ring.label}</p>
              <p className="mt-1 text-[10px] leading-4 text-[#6b4332]">{ring.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
