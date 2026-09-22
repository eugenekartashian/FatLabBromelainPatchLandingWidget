import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useProductContext } from 'common/pages/ProductPage/stores';
import { LandingChunkTranslations } from '@widgets/landings/LandingChunkTranslations';
import LandingsTranslations from '@widgets/landings/translations';
import {
  HeadlineSection,
  HeroSection,
  BeforeAfterSection,
  TechnologiesSection,
  RitualSection,
  ReviewsSection,
  GuaranteeSection,
  ScheduleSection,
} from './sections';
import './index.scss';

type Props = {
  className?: string;
};

/**
 * Coded, fully-responsive landing for `medicube-age-r-booster-pro-ex`.
 * Layout/structure ported from the Figma design (frame 27:971) and the
 * `medicu-landing.html` mockup. Copy lives in the shared landings translations
 * (`@widgets/landings/translations`, partition `landings`) — code-split per
 * language, loaded only on landing pages, never in the global per-page blob.
 *
 * The outer container follows the existing landing standard (85rem column,
 * 24px auto margins, 1.25rem side padding on mobile). Each section renders a
 * desktop and a mobile composition toggled by `display` at the 700px breakpoint;
 * both are fluid (container queries + clamp), no transform-scale, no JS scaler.
 */
function MedicubeBoosterLandingWidget({ className }: Props) {
  const { productStore } = useProductContext();
  const alias = productStore.currentProduct?.alias;

  if (!alias) {
    return null;
  }

  return (
    <LandingChunkTranslations Lib={LandingsTranslations} partition='landings'>
      <div
        className={classNames('mb-landing', className)}
        data-qa='medicube-booster-landing-widget'
        data-product-alias={alias}
      >
        {/* Stage = the query container for the section `cqi` units. Fills the full
            85rem column (like the other landings), so the 1200 design fills the
            column with no side fields. See index.scss. */}
        <div className='mb-landing__stage'>
          <HeadlineSection />
          <HeroSection />
          <BeforeAfterSection />
          <TechnologiesSection />
          <RitualSection />
          <ReviewsSection />
          <GuaranteeSection />
          <ScheduleSection />
        </div>
      </div>
    </LandingChunkTranslations>
  );
}

export default observer(MedicubeBoosterLandingWidget);
