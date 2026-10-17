import { useEffect, useRef, useState, type RefObject } from 'react';

/** Easing curves from the design handoff. */
export const EASE_OUT = 'cubic-bezier(.2,.9,.2,1.1)';
export const EASE_SPRING = 'cubic-bezier(.3,1.5,.5,1)';
export const EASE_POP = 'cubic-bezier(.3,1.6,.5,1)';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** Live `prefers-reduced-motion` flag. Every animation in the redesign checks it. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return;
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** Runs `el.animate` only when motion is allowed. */
export function animate(
  el: Element | null | undefined,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions
): Animation | null {
  if (!el || prefersReducedMotion() || typeof (el as HTMLElement).animate !== 'function') return null;
  return (el as HTMLElement).animate(keyframes, options);
}

/**
 * Page entrance: every `[data-in]` inside the root rises 40px and fades in,
 * staggered 120ms, once on mount.
 */
export function useEntrance(rootRef: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const anims: Animation[] = [];
    root.querySelectorAll('[data-in]').forEach((el, i) => {
      const a = animate(
        el,
        [
          { transform: 'translateY(40px)', opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 800, delay: i * 120, easing: EASE_OUT, fill: 'backwards' }
      );
      if (a) anims.push(a);
    });
    return () => anims.forEach(a => a.cancel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Staggered pop-in for a list of cards (`[data-card]` by default), re-run whenever
 * `key` changes, e.g. when a filter changes.
 */
export function useStagger(
  rootRef: RefObject<HTMLElement | null>,
  key: unknown,
  { selector = '[data-card]', delay = 150, step = 70 }: { selector?: string; delay?: number; step?: number } = {}
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const anims: Animation[] = [];
    root.querySelectorAll(selector).forEach((el, i) => {
      const a = animate(
        el,
        [
          { transform: 'translateY(50px) scale(.94)', opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 700, delay: delay + i * step, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'backwards', composite: 'add' }
      );
      if (a) anims.push(a);
    });
    return () => anims.forEach(a => a.cancel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

/**
 * Scroll reveal: `[data-reveal]` children fade up when 15% visible. Elements already
 * above the viewport (e.g. after a hash jump) are revealed immediately.
 */
export function useScrollReveal(rootRef: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
      el => el.dataset.plReveal !== 'done'
    );
    const reveal = (el: HTMLElement, i = 0) => {
      el.dataset.plReveal = 'done';
      animate(
        el,
        [
          { transform: 'translateY(40px)', opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 800, delay: i * 110, easing: EASE_OUT, fill: 'backwards' }
      );
    };
    const io = new IntersectionObserver(
      entries => {
        let i = 0;
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          reveal(entry.target as HTMLElement, i++);
        });
      },
      { threshold: 0.15 }
    );
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0) {
        el.dataset.plReveal = 'done';
        return;
      }
      el.dataset.plReveal = 'pending';
      io.observe(el);
    });
    return () => {
      io.disconnect();
      els.forEach(el => {
        if (el.dataset.plReveal === 'pending') el.dataset.plReveal = 'done';
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Fires once when the element is 15% visible. */
export function useInView<T extends Element>(threshold = 0.15): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, threshold]);

  return [ref, inView];
}

/** Ease-out count-up from 0 to `target`, started when `start` turns true. */
export function useCountUp(target: number, { duration = 1200, start = true, decimals = 0 } = {}) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let frame = 0;
    const from = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      const factor = Math.pow(10, decimals);
      setValue(Math.round((from + (target - from) * eased) * factor) / factor);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start, decimals]);

  return value;
}

/** Animates from the previous value to the new one whenever `target` changes. */
export function useTween(target: number, duration = 900) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    let frame = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (target - from) * eased;
      fromRef.current = v;
      setValue(v);
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

/** Re-animates an element with a springy pop whenever `key` changes (skips first render). */
export function usePopOnChange(ref: RefObject<HTMLElement | null>, key: unknown, keyframes?: Keyframe[]) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    animate(
      ref.current,
      keyframes ?? [
        { transform: 'scale(.8)', opacity: 0 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 600, easing: EASE_POP }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

/**
 * Heart burst: ♥ spans fly radially from the centre of `origin`, inside `layer`
 * (which must be positioned). Red with every third heart yellow.
 */
export function heartBurst(
  layer: HTMLElement | null,
  origin: HTMLElement | null,
  { count = 14, min = 40, max = 160, lift = 0, size = [12, 26] }: { count?: number; min?: number; max?: number; lift?: number; size?: [number, number] } = {}
) {
  if (!layer || !origin || prefersReducedMotion()) return;
  const r = origin.getBoundingClientRect();
  const b = layer.getBoundingClientRect();
  const cx = r.left + r.width / 2 - b.left;
  const cy = r.top + r.height / 2 - b.top;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.textContent = '♥';
    s.setAttribute('aria-hidden', 'true');
    Object.assign(s.style, {
      position: 'absolute',
      left: `${cx}px`,
      top: `${cy}px`,
      color: i % 3 ? '#e1251b' : '#ffd23f',
      fontSize: `${size[0] + Math.random() * (size[1] - size[0])}px`,
      pointerEvents: 'none',
      lineHeight: '1',
      zIndex: '5',
    });
    layer.appendChild(s);
    const a = Math.random() * Math.PI * 2;
    const d = min + Math.random() * (max - min);
    const anim = s.animate(
      [
        { transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 },
        {
          transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + lift}px) rotate(${a * 60}deg) scale(1)`,
          opacity: 0,
        },
      ],
      { duration: 800 + Math.random() * 600, easing: 'cubic-bezier(.2,.8,.3,1)' }
    );
    anim.onfinish = () => s.remove();
  }
}
