import { useEffect } from 'react';

const SELECTOR = '[data-flb-parallax]';
const MAX_SHIFT = 60;

export function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let nodes: HTMLElement[] = [];
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      nodes.forEach((node) => {
        const speed = Number(node.dataset.flbParallax) || 0.08;
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const [min, max] = (node.dataset.flbParallaxRange || `${-MAX_SHIFT},${MAX_SHIFT}`).split(',').map(Number);
        const offset = Math.max(min, Math.min(max, (rect.top + rect.height / 2 - vh / 2) * -speed));
        node.style.setProperty('--flb-py', `${offset.toFixed(1)}px`);
      });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
}
