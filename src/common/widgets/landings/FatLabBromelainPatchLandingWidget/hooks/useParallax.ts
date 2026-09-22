import { useEffect } from 'react';

const SELECTOR = '[data-flb-parallax]';
const CURSOR_RANGE = 40;
const MAX_SHIFT = 60;

export function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const canHover = window.matchMedia('(hover: hover)').matches;
    let nodes: HTMLElement[] = [];
    let mouseX = 0;
    let mouseY = 0;
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
        const x = mouseX * CURSOR_RANGE * speed * 5;
        const y = offset + mouseY * CURSOR_RANGE * speed * 5;
        node.style.setProperty('--flb-px', `${x.toFixed(1)}px`);
        node.style.setProperty('--flb-py', `${y.toFixed(1)}px`);
      });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
      schedule();
    };

    nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    if (canHover) window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);
}
