import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { prefersReducedMotion } from './motion';

/** The one emphasised word per headline: Instrument Serif italic, red. */
export function Em({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`pl-em ${className}`}>{children}</span>;
}

/**
 * Falling hearts and snow: `count` particles drifting down 10–19s, every third a ♥.
 * Purely decorative; renders nothing under reduced motion.
 */
export function FallingSky({
  count = 30,
  color = '#e1251b',
  height = 1000,
  className = '',
}: {
  count?: number;
  color?: string;
  height?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sky = ref.current;
    if (!sky || prefersReducedMotion()) return;
    const anims: Animation[] = [];
    const nodes: HTMLElement[] = [];
    for (let k = 0; k < count; k++) {
      const s = document.createElement('span');
      const heart = k % 3 === 0;
      const size = heart ? 10 + Math.random() * 14 : 3 + Math.random() * 5;
      s.textContent = heart ? '♥' : '';
      Object.assign(s.style, {
        position: 'absolute',
        left: `${Math.random() * 100}%`,
        top: '-30px',
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size}px`,
        lineHeight: '1',
        color,
        background: heart ? 'transparent' : color,
        borderRadius: '50%',
        opacity: heart ? '.85' : '.3',
      });
      sky.appendChild(s);
      nodes.push(s);
      const dx = (Math.random() - 0.5) * 120;
      anims.push(
        s.animate(
          [
            { transform: 'translate(0,0) rotate(0)' },
            { transform: `translate(${dx}px, ${height}px) rotate(${dx * 2}deg)` },
          ],
          { duration: 10000 + Math.random() * 9000, delay: -Math.random() * 16000, iterations: Infinity }
        )
      );
    }
    return () => {
      anims.forEach(a => a.cancel());
      nodes.forEach(n => n.remove());
    };
  }, [count, color, height]);

  return <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} />;
}

/** Infinite marquee: content duplicated, translateX(0 → -50%). */
export function Marquee({
  items,
  duration = 26000,
  className = '',
  itemClassName = '',
  heartClassName = 'text-pl-red',
  gap = 48,
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
  heartClassName?: string;
  gap?: number;
}) {
  const track = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    const a = el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], {
      duration,
      iterations: Infinity,
    });
    return () => a.cancel();
  }, [duration]);

  const doubled = [...items, ...items];
  return (
    <div className={`flex items-center overflow-hidden ${className}`}>
      <div ref={track} className="flex whitespace-nowrap" style={{ gap, paddingLeft: gap }}>
        {doubled.map((m, i) => (
          <span key={i} aria-hidden={i >= items.length || undefined} className={`flex items-center ${itemClassName}`} style={{ gap }}>
            {m}
            <span className={heartClassName}>♥</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Photo slot. Shows the image when `src` is given, otherwise a quiet labelled
 * placeholder where real photography belongs.
 */
export function ImageSlot({
  src,
  alt = '',
  label,
  className = '',
  style,
  tone = 'blush',
}: {
  src?: string;
  alt?: string;
  label: string;
  className?: string;
  style?: CSSProperties;
  tone?: 'blush' | 'dark';
}) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${className}`} style={style} />;
  }
  return (
    <div
      role="img"
      aria-label={alt || label}
      className={`absolute inset-0 flex items-center justify-center p-6 text-center ${
        tone === 'dark' ? 'bg-[#2a2020] text-pl-ondark' : 'bg-pl-blush text-pl-deep'
      } ${className}`}
      style={style}
    >
      <span className="flex flex-col items-center gap-2 text-[15px] font-semibold opacity-70">
        <span className="text-[clamp(34px,6vw,72px)] leading-none text-pl-red" aria-hidden="true">
          ♥
        </span>
        {/* The slot's brief is only shown while developing, so production never says "drop a photo". */}
        {import.meta.env.DEV && label}
      </span>
    </div>
  );
}

/** Small status pill used across the public pages and admin. */
export function Toast({ message, onDone, tone = 'ink' }: { message: string | null; onDone: () => void; tone?: 'ink' | 'red' }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!message) return;
    const el = ref.current;
    if (el && !prefersReducedMotion()) {
      el.animate(
        [
          { transform: 'translate(-50%, 40px)', opacity: 0 },
          { transform: 'translate(-50%, 0)', opacity: 1 },
        ],
        { duration: 450, easing: 'cubic-bezier(.3,1.5,.5,1)' }
      );
    }
    const t = window.setTimeout(onDone, 2600);
    return () => window.clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full px-6 py-3 text-[15px] font-semibold text-white shadow-[6px_6px_0_rgba(20,16,16,.15)] ${
        tone === 'red' ? 'bg-pl-red' : 'bg-pl-ink'
      }`}
    >
      {message}
    </div>
  );
}
