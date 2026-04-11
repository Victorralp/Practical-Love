import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

const IMPACT_STATS = [
  { value: 247, label: 'Families touched by love', suffix: '+' },
  { value: 1800, label: 'Love cards distributed', suffix: '+' },
  { value: 34, label: 'Communities reached', suffix: '' },
] as const;

function AnimatedCounter({ target, duration = 2000, isActive }: { target: number; duration?: number; isActive: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isActive, target, duration]);

  return <>{count}</>;
}

export default function GivingHeart() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative my-8 overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_at_center,_#2d1612_0%,_#1d0f0b_60%,_#120907_100%)] px-6 py-16 text-center md:px-10 md:py-20"
    >
      {/* Warm light */}
      <div className="absolute left-1/2 top-0 h-[60%] w-[40rem] -translate-x-1/2 bg-[radial-gradient(ellipse,_rgba(255,180,100,0.06)_0%,_transparent_70%)]" />

      {/* Beating heart */}
      <div
        className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.6)',
        }}
      >
        <div className="giving-pulse-ring absolute h-full w-full rounded-full border border-white/10" />
        <div className="giving-pulse-ring-delayed absolute h-full w-full rounded-full border border-white/6" />
        <Heart
          className="giving-heart-icon relative z-10 h-10 w-10 text-[#ff8a65] drop-shadow-[0_0_16px_rgba(255,138,101,0.4)]"
          fill="currentColor"
        />
      </div>

      {/* Text */}
      <div
        className="relative transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '0.4s',
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4864f]">
          Your giving carries this message further
        </p>
        <h2 className="mx-auto mt-4 max-w-xl font-serif text-3xl text-white md:text-4xl">
          Every gift plants love in a home that needs it.
        </h2>
      </div>

      {/* Impact counters */}
      <div
        className="relative mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 1s ease',
          transitionDelay: '0.8s',
        }}
      >
        {IMPACT_STATS.map(stat => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/8 bg-white/5 px-4 py-5 backdrop-blur-sm"
          >
            <p className="font-serif text-3xl font-bold text-[#ffb380]">
              <AnimatedCounter target={stat.value} isActive={isVisible} />
              {stat.suffix}
            </p>
            <p className="mt-2 text-xs text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
