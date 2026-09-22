import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';
import { LandingCtaButton } from '../components/LandingCtaButton';
import { useReveal } from '../hooks/useReveal';

// React 18.2 typings lack fetchPriority; the lowercase DOM attribute works at runtime
const HIGH_PRIORITY = { fetchpriority: 'high' };

function HeroFacts({ mobile = false }: { mobile?: boolean }) {
  const t = useTranslationOnPage('landings');
  const factClass = mobile ? 'flb-hero-m__fact' : 'flb-hero__fact';
  return (
    <div className={mobile ? 'flb-hero-m__facts' : 'flb-hero__facts'}>
      <div
        className={factClass}><img
        src={asset('hero-icon-clock.svg')}
        width={27}
        height={27}
        alt=''
        aria-hidden='true'
        loading='eager'
        decoding='async'
        /><span>{t('FLB_HERO_DURATION')}</span></div
      >
      <div
        className={factClass}><img
        src={asset('hero-icon-pack.svg')}
        width={32}
        height={32}
        alt=''
        aria-hidden='true'
        loading='eager'
        decoding='async'
        /><span>{t('FLB_HERO_PACK')}</span></div
      >
    </div>
  );
}

export function HeroSection() {
  const t = useTranslationOnPage('landings');
  const { ref, isVisible } = useReveal<HTMLElement>();
  const revealClass = isVisible ? 'flb-reveal is-visible' : 'flb-reveal';

  return (
    <section ref={ref} className={revealClass}>
      <div className='flb-d'>
        <div className='flb-hero'>
          <img
            className='flb-hero__product'
            src={asset('hero-product.webp')}
            width={2752}
            height={1536}
            {...HIGH_PRIORITY}
            alt={t('FLB_HERO_IMAGE_ALT')}
            loading='eager'
            decoding='async'
          />
          <img
            className='flb-hero__leaves'
            data-flb-parallax='0.09'
            src={asset('hero-leaves.webp')}
            width={556}
            height={716}
            alt=''
            aria-hidden='true'
            loading='eager'
            decoding='async'
          />
          <img
            className='flb-hero__logo'
            src={asset('hero-logo.svg')}
            width={112}
            height={22}
            alt={t('FLB_BRAND_ALT')}
            loading='eager'
            decoding='async'
          />
          <div className='flb-hero__content'>
            <h1>{t('FLB_HERO_TITLE')}</h1>
            <p className='flb-hero__subtitle'>{t('FLB_HERO_SUBTITLE')}</p>
            <p className='flb-hero__description'>{t('FLB_HERO_DESCRIPTION')}</p>
            <p className='flb-hero__instruction'>{t('FLB_HERO_INSTRUCTION')}</p>
            <HeroFacts />
            <LandingCtaButton className='flb-hero__cta' />
          </div>
        </div>
      </div>

      <div className='flb-m'>
        <div className='flb-hero-m'>
          <div className='flb-hero-m__media'>
            <img
              className='flb-hero-m__product'
              src={asset('hero-product.webp')}
              width={2752}
              height={1536}
              {...HIGH_PRIORITY}
              alt={t('FLB_HERO_IMAGE_ALT')}
              loading='eager'
              decoding='async'
            />
            <img
              className='flb-hero-m__leaves'
              data-flb-parallax='0.09'
              src={asset('hero-leaves.webp')}
              width={556}
              height={716}
              alt=''
              aria-hidden='true'
              loading='eager'
              decoding='async'
            />
            <img
              className='flb-hero-m__logo'
              src={asset('hero-logo.svg')}
              width={112}
              height={22}
              alt={t('FLB_BRAND_ALT')}
              loading='eager'
              decoding='async'
            />
          </div>
          <div className='flb-hero-m__content'>
            <h1>{t('FLB_HERO_TITLE')}</h1>
            <p className='flb-hero-m__subtitle'>{t('FLB_HERO_SUBTITLE')}</p>
            <p className='flb-hero-m__description'>{t('FLB_HERO_DESCRIPTION')}</p>
            <p className='flb-hero-m__instruction'>{t('FLB_HERO_INSTRUCTION')}</p>
            <HeroFacts mobile />
          </div>
        </div>
      </div>
    </section>
  );
}
