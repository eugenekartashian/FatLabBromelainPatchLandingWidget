import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useTranslationOnPage } from '@translate';
import { useLandingBuyAction } from '@widgets/landings/ProductLandingWidget/hooks/useLandingBuyAction';

type Props = { className?: string };

// Keeps the spinner visible for at least this long so it reads as a real
// loading state even when handleBuyClick resolves almost instantly (as it
// does in the sandbox stub) — on the real site the request itself will
// usually take longer than this anyway.
const MIN_LOADING_MS = 450;

export function LandingCtaButton({ className }: Props) {
  const t = useTranslationOnPage('general');
  const { handleBuyClick } = useLandingBuyAction();
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onClick = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const start = Date.now();
    await handleBuyClick();
    const rest = MIN_LOADING_MS - (Date.now() - start);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLoading(false), Math.max(rest, 0));
  }, [handleBuyClick, loading]);

  const label = t('ADD_TO_CART_PRODUCT_CARD');
  return (
    <button
      type='button'
      className={classNames('flb-cta', { 'is-loading': loading }, className)}
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
    >
      <span className='flb-cta__label'>{label}</span>
      <span className='flb-cta__spinner' aria-hidden='true' />
    </button>
  );
}
