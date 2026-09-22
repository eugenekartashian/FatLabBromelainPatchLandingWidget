import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useProductContext } from 'common/pages/ProductPage/stores';
import { LandingChunkTranslations } from '@widgets/landings/LandingChunkTranslations';
import LandingsTranslations from '@widgets/landings/translations';
import {
  CirculationSection,
  FinalCtaSection,
  HeatSection,
  HeroSection,
  HowToUseSection,
  IngredientsSection,
  ResultsSection,
  SafetyZonesSection,
} from './sections';
import { useParallax } from './hooks/useParallax';
import './index.scss';

type Props = { className?: string };

function FatLabBromelainPatchLandingWidget({ className }: Props) {
  const { productStore } = useProductContext();
  const alias = productStore.currentProduct?.alias;
  useParallax();
  if (!alias) return null;

  return (
    <LandingChunkTranslations Lib={LandingsTranslations} partition='landings'>
      <div
        className={classNames('flb-landing', className)}
        data-qa='fat-lab-bromelain-patch-landing-widget'
        data-product-alias={alias}
      >
        <div className='flb-landing__stage'>
          <div className='flb-landing__warm-flow'>
            <HeroSection />
            <CirculationSection />
          </div>
          <HeatSection />
          <ResultsSection />
          <IngredientsSection />
          <SafetyZonesSection />
          <HowToUseSection />
          <FinalCtaSection />
        </div>
      </div>
    </LandingChunkTranslations>
  );
}

export default observer(FatLabBromelainPatchLandingWidget);
