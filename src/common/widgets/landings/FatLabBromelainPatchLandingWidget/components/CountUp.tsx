import React, { useEffect, useRef, useState } from 'react';

const NUMBER = /\d+(?:[.,]\d+)?/;
const DURATION = 1600;

type Props = { value: string; className?: string };

export function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const match = value.match(NUMBER);
    if (!node || !match || typeof IntersectionObserver === 'undefined'
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const raw = match[0];
    const separator = raw.includes(',') ? ',' : '.';
    const decimals = raw.includes(separator) ? raw.split(separator)[1].length : 0;
    const target = parseFloat(raw.replace(',', '.'));
    const before = value.slice(0, match.index);
    const after = value.slice((match.index || 0) + raw.length);
    const format = (n: number) => `${before}${n.toFixed(decimals).replace('.', separator)}${after}`;

    let frame = 0;
    setText(format(0));
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1);
        setText(format(target * (1 - (1 - p) ** 3)));
        if (p < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return <div ref={ref} className={className}>{text}</div>;
}
