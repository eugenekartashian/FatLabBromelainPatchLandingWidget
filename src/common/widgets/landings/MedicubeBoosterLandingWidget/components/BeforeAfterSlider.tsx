import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

type Props = {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
};

/**
 * Pointer-drag before/after comparison. The drag position is exposed as the
 * `--mb-pct` custom property; the section SCSS uses it for the clipped
 * `.mb-compare__before` width and the `.mb-compare__divider` offset. The before
 * image is sized at `100cqi` (full compare width) via `container-type` on
 * `.mb-compare`, so no JS image sizing is needed. Used in both the desktop and
 * mobile compositions.
 */
export function BeforeAfterSlider({ beforeUrl, afterUrl, beforeLabel, afterLabel, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pct, setPct] = useState(50);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPct(rect.width ? (x / rect.width) * 100 : 50);
  }, []);

  return (
    <div
      ref={ref}
      className={classNames('mb-compare', className)}
      style={{ '--mb-pct': `${pct}%` } as React.CSSProperties}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) {
          setFromClientX(e.clientX);
        }
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <img
        className='mb-compare__img mb-compare__after'
        src={afterUrl}
        alt={afterLabel}
        loading='lazy'
        decoding='async'
      />
      <div className='mb-compare__before'>
        <img
          className='mb-compare__img mb-compare__before-img'
          src={beforeUrl}
          alt={beforeLabel}
          loading='lazy'
          decoding='async'
        />
      </div>
      <span className='mb-compare__tag mb-compare__tag--before'>{beforeLabel}</span>
      <span className='mb-compare__tag mb-compare__tag--after'>{afterLabel}</span>
      <div className='mb-compare__divider'>
        <div className='mb-compare__handle'>
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
