import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useTranslationOnPage } from '@translate';
import { useLandingBuyAction } from '@widgets/landings/ProductLandingWidget/hooks/useLandingBuyAction';

type Props = {
  className?: string;
};

/**
 * "Add to cart" CTA shared by the landing sections. Wires the standard landing
 * buy action (add to cart + cart preview, or scroll to the variant picker) and
 * flashes a brief confirmation, mirroring the mockup's `[data-cart]` behaviour.
 */
export function LandingCtaButton({ className }: Props) {
  const t = useTranslationOnPage('general');
  const { handleBuyClick } = useLandingBuyAction();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const onClick = useCallback(async () => {
    const added = await handleBuyClick();
    if (!added) {
      return;
    }
    setAdded(true);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setAdded(false), 1800);
  }, [handleBuyClick]);

  const label = t('ADD_TO_CART_PRODUCT_CARD');

  return (
    <button
      type='button'
      className={classNames('mb-cta', { 'is-added': added }, className)}
      onClick={onClick}
    >
      {added ? `✓ ${label}` : label}
    </button>
  );
}
