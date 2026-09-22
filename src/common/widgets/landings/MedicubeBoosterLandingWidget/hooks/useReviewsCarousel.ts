import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent, TransitionEvent as ReactTransitionEvent } from 'react';

type TrackProps = {
  onPointerDown: (e: ReactPointerEvent) => void;
  onPointerMove: (e: ReactPointerEvent) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
  onTransitionEnd: (e: ReactTransitionEvent) => void;
};

type Carousel = {
  index: number;
  dragging: boolean;
  next: () => void;
  prev: () => void;
  go: (to: number) => void;
  trackProps: TrackProps;
  trackStyle: CSSProperties;
};

/**
 * Swipeable, infinitely-looping mobile reviews carousel.
 *
 * The track is rendered as `[cloneOf(last), ...reals, cloneOf(first)]`, so the
 * real slides live at positions 1..count. `pos` walks that cloned track. Stepping
 * forward off the last real slide animates onto the trailing clone of the first,
 * then snaps — transition disabled — to the real first slide; stepping back off
 * the first does the mirror. So last→first keeps moving forward instead of
 * rewinding through 2,1. Horizontal pointer-drag has a directional-intent
 * threshold (so vertical page scroll isn't hijacked) and an 18% commit threshold.
 */
export function useReviewsCarousel(count: number): Carousel {
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [dragDx, setDragDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef({ x: 0, y: 0, width: 1, decided: false, horizontal: false });

  // Active real slide (0..count-1) for the dots, derived from the cloned position.
  const index = count > 0 ? (((pos - 1) % count) + count) % count : 0;

  const next = useCallback(() => setPos((p) => Math.min(p + 1, count + 1)), [count]);
  const prev = useCallback(() => setPos((p) => Math.max(p - 1, 0)), []);
  // Jump straight to a real slide (used by the dots) — not looped.
  const go = useCallback(
    (to: number) => {
      if (count > 0) setPos(((((to % count) + count) % count) + 1));
    },
    [count],
  );

  // When a move lands on a clone, snap to its real twin with the transition off.
  const onTransitionEnd = useCallback(
    (e: ReactTransitionEvent) => {
      if (e.target !== e.currentTarget || e.propertyName !== 'transform') {
        return;
      }
      if (pos === count + 1) {
        setAnimate(false);
        setPos(1);
      } else if (pos === 0) {
        setAnimate(false);
        setPos(count);
      }
    },
    [pos, count],
  );

  // Re-enable the transition the frame after a snap (the no-transition jump has
  // painted), so the next move animates again without rewinding the snap.
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
    return undefined;
  }, [animate]);

  const onPointerDown = useCallback((e: ReactPointerEvent) => {
    setDragging(true);
    setDragDx(0);
    gesture.current = {
      x: e.clientX,
      y: e.clientY,
      width: e.currentTarget.clientWidth || 1,
      decided: false,
      horizontal: false,
    };
  }, []);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent) => {
      if (!dragging) {
        return;
      }
      const g = gesture.current;
      const mx = e.clientX - g.x;
      const my = e.clientY - g.y;
      if (!g.decided) {
        if (Math.abs(mx) < 6 && Math.abs(my) < 6) {
          return;
        }
        g.decided = true;
        g.horizontal = Math.abs(mx) > Math.abs(my);
        if (g.horizontal) {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            /* setPointerCapture can throw if the pointer is already released */
          }
        }
      }
      if (g.horizontal) {
        setDragDx(mx);
      }
    },
    [dragging],
  );

  const endDrag = useCallback(() => {
    if (!dragging) {
      return;
    }
    setDragging(false);
    const g = gesture.current;
    if (g.horizontal) {
      const threshold = g.width * 0.18;
      if (dragDx <= -threshold) {
        next();
      } else if (dragDx >= threshold) {
        prev();
      }
    }
    setDragDx(0);
  }, [dragging, dragDx, next, prev]);

  const trackStyle: CSSProperties = {
    transform: `translateX(calc(${-pos * 100}% + ${dragging ? dragDx : 0}px))`,
    transition: dragging || !animate ? 'none' : 'transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)',
  };

  return {
    index,
    dragging,
    next,
    prev,
    go,
    trackProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onTransitionEnd,
    },
    trackStyle,
  };
}
