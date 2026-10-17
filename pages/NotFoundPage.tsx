import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { EASE_POP, heartBurst, prefersReducedMotion } from '../components/pl/motion';

export default function NotFoundPage() {
  const skyRef = useRef<HTMLDivElement | null>(null);
  const heartRef = useRef<HTMLButtonElement | null>(null);
  const digitsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    digitsRef.current?.querySelectorAll<HTMLElement>('[data-d]').forEach((el, i) =>
      el.animate([{ transform: `translateY(-120%) rotate(${i ? 20 : -20}deg)`, opacity: 0 }, { transform: 'none', opacity: 1 }], {
        duration: 900,
        delay: i * 150,
        easing: EASE_POP,
        fill: 'backwards',
      })
    );
    const beat = heartRef.current?.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }],
      { duration: 1400, iterations: Infinity, easing: 'ease-in-out' }
    );
    return () => beat?.cancel();
  }, []);

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-5 py-10 text-center">
      <div ref={skyRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        ref={digitsRef}
        className="relative flex items-center justify-center gap-[clamp(4px,1vw,12px)] text-[clamp(120px,26vw,320px)] font-extrabold leading-[.85] tracking-[-0.06em]"
        aria-hidden="true"
      >
        <span data-d className="inline-block">
          4
        </span>
        <button
          ref={heartRef}
          type="button"
          tabIndex={-1}
          onClick={() => heartBurst(skyRef.current, heartRef.current, { count: 18, min: 120, max: 340, lift: 80, size: [14, 36] })}
          className="inline-block cursor-pointer border-0 bg-transparent p-0 text-[.9em] leading-[inherit] text-pl-red"
        >
          ♥
        </button>
        <span data-d className="inline-block">
          4
        </span>
      </div>
      <h1 className="relative mb-0 mt-6 text-[clamp(32px,5vw,56px)] font-extrabold tracking-[-0.04em]">This page wandered off.</h1>
      <p className="pl-serif relative mb-0 mt-3 max-w-[34ch] text-[clamp(22px,2.6vw,30px)] leading-[1.25] text-pl-body">
        But love keeps no record of wrongs, so let’s get you home.
      </p>
      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="pl-btn pl-btn-red">
          Back to home
        </Link>
        <Link to="/messages" className="pl-btn pl-btn-outline">
          Read a message
        </Link>
      </div>
      <p className="relative mb-0 mt-7 text-[14px] text-pl-muted" aria-hidden="true">
        Tap the heart.
      </p>
    </div>
  );
}
