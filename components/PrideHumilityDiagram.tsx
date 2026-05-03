import { useEffect, useRef, useState } from 'react';
import { Heart, ShieldAlert, Sprout } from 'lucide-react';

const PRIDE_SIGNS = [
  'I must be right',
  'I resist correction',
  'I blame others',
  'I need praise',
  'I hide weakness',
  'I struggle to say sorry',
] as const;

const HUMILITY_SIGNS = [
  'I can be corrected',
  'I confess quickly',
  'I listen before answering',
  'I serve quietly',
  'I honor others',
  'I depend on God',
] as const;

export default function PrideHumilityDiagram() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timers = Array.from({ length: PRIDE_SIGNS.length }, (_, index) =>
      setTimeout(() => setActiveStep(index), 450 + index * 320)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className="relative mx-auto max-w-6xl py-8"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.8s ease' }}
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:items-center">
        <div className="rounded-[1.75rem] border border-[rgba(105,42,26,0.16)] bg-[linear-gradient(160deg,_#2f1713_0%,_#5f2116_58%,_#8e331f_100%)] p-5 text-[#fff4e7] shadow-[0_24px_48px_rgba(95,53,30,0.12)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#ffd2af]">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd2af]">
                Pride says
              </p>
              <h3 className="font-serif text-2xl text-white">Close the heart</h3>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {PRIDE_SIGNS.map((sign, index) => (
              <div
                key={sign}
                className="rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-3 transition-all duration-500"
                style={{
                  opacity: activeStep >= index ? 1 : 0.35,
                  transform: activeStep >= index ? 'translateX(0)' : 'translateX(-12px)',
                }}
              >
                <p className="text-sm leading-6 text-[#fff1e3]">{sign}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[30rem] items-center justify-center rounded-[2rem] border border-[rgba(176,111,74,0.14)] bg-[radial-gradient(circle_at_center,_rgba(255,239,219,0.96)_0%,_rgba(248,232,211,0.78)_52%,_rgba(255,255,255,0.7)_100%)] p-5 shadow-[0_24px_48px_rgba(95,53,30,0.08)]">
          <div className="absolute inset-8 rounded-full border border-[#d7a27a]/30" />
          <div className="absolute inset-16 rounded-full border border-[#d7a27a]/24" />
          <div className="absolute inset-24 rounded-full border border-[#d7a27a]/18" />

          <div
            className="absolute left-8 top-10 hidden rounded-full bg-[#5f2116]/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd2af] shadow-lg sm:block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.7s ease',
            }}
          >
            Self first
          </div>
          <div
            className="absolute bottom-10 right-8 hidden rounded-full bg-[#fff8f1]/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9d4b2a] shadow-lg sm:block"
            style={{
              opacity: activeStep >= 2 ? 1 : 0,
              transform: activeStep >= 2 ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.7s ease',
            }}
          >
            God first
          </div>

          <div className="relative z-10 text-center">
            <div
              className="mx-auto flex h-28 w-28 items-center justify-center rounded-full shadow-[0_20px_50px_rgba(117,53,32,0.22)] transition-all duration-700"
              style={{
                background:
                  activeStep >= 3
                    ? 'linear-gradient(135deg, #8e331f 0%, #d27a3f 100%)'
                    : 'linear-gradient(135deg, #3a1811 0%, #742617 100%)',
                transform: isVisible ? 'scale(1)' : 'scale(0.55)',
              }}
            >
              <Heart className="h-11 w-11 text-[#fff2e2]" />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#a45f3c]">
              Heart check
            </p>
            <h3 className="mt-2 font-serif text-3xl text-[#3d1d17]">
              Pride bends inward. Humility opens upward.
            </h3>
            <p className="mx-auto mt-4 max-w-md leading-7 text-[#6e4737]">
              Love grows where pride is confessed and humility is practiced before God and people.
            </p>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[rgba(176,111,74,0.16)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.96)_0%,_rgba(248,238,227,0.96)_100%)] p-5 shadow-[0_24px_48px_rgba(95,53,30,0.08)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3dfcb] text-[#9d4b2a]">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a45f3c]">
                Humility says
              </p>
              <h3 className="font-serif text-2xl text-[#3d1d17]">Open the heart</h3>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {HUMILITY_SIGNS.map((sign, index) => (
              <div
                key={sign}
                className="rounded-[1.25rem] border border-[rgba(176,111,74,0.14)] bg-white/86 px-4 py-3 transition-all duration-500"
                style={{
                  opacity: activeStep >= index ? 1 : 0.35,
                  transform: activeStep >= index ? 'translateX(0)' : 'translateX(12px)',
                }}
              >
                <p className="text-sm leading-6 text-[#6e4737]">{sign}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
