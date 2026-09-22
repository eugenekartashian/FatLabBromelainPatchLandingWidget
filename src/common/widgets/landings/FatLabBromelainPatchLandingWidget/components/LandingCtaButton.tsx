import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useTranslationOnPage } from '@translate';
import { useLandingBuyAction } from '@widgets/landings/ProductLandingWidget/hooks/useLandingBuyAction';

type Props = { className?: string };

export function LandingCtaButton({ className }: Props) {
  const t = useTranslationOnPage('general');
  const { handleBuyClick } = useLandingBuyAction();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onClick = useCallback(async () => {
    const wasAdded = await handleBuyClick();
    if (!wasAdded) return;
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  }, [handleBuyClick]);

  const label = t('ADD_TO_CART_PRODUCT_CARD');
  return (
    <button type='button' className={classNames('flb-cta', { 'is-added': added }, className)} onClick={onClick}>
      {added ? `✓ ${label}` : label}
    </button>
  );
}
