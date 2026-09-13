import { useEffect, type RefObject } from 'react';

/**
 * Pauses CSS animations inside `ref` while it is off screen by toggling
 * `data-offscreen`, which globals.css maps to `animation-play-state: paused`.
 */
export function usePauseWhenOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        delete element.dataset.offscreen;
      } else {
        element.dataset.offscreen = 'true';
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      delete element.dataset.offscreen;
    };
  }, [ref]);
}
