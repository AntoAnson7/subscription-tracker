import { useLayoutEffect, useRef } from 'react';

export function useFlipTransition<T extends HTMLElement>(trigger: unknown) {
  const ref = useRef<T | null>(null);
  const prevRectRef = useRef<DOMRect | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const currentRect = el.getBoundingClientRect();

    if (prevRectRef.current) {
      const dx = prevRectRef.current.left - currentRect.left;
      const dy = prevRectRef.current.top - currentRect.top;

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if ((dx !== 0 || dy !== 0) && !prefersReduced) {
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.transition = 'none';

        const rafId = requestAnimationFrame(() => {
          if (!ref.current) return;
          ref.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
          ref.current.style.transform = 'translate(0, 0)';
        });

        const handleTransitionEnd = () => {
          if (!ref.current) return;
          ref.current.style.transform = '';
          ref.current.style.transition = '';
        };

        el.addEventListener('transitionend', handleTransitionEnd, { once: true });

        prevRectRef.current = currentRect;
        return () => {
          cancelAnimationFrame(rafId);
          el.removeEventListener('transitionend', handleTransitionEnd);
        };
      }
    }

    prevRectRef.current = currentRect;
  }, [trigger]);

  return ref;
}
