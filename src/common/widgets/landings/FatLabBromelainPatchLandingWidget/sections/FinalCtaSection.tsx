import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';
import { LandingCtaButton } from '../components/LandingCtaButton';
import { useReveal } from '../hooks/useReveal';

const benefits = ['FLB_FINAL_BENEFIT_1', 'FLB_FINAL_BENEFIT_2', 'FLB_FINAL_BENEFIT_3'] as const;

function Content({ prefix, withCta }: { prefix: string; withCta?: boolean }) {
  const t = useTranslationOnPage('landings');
  return (
    <div className={`${prefix}__content`}>
      <h2>{t('FLB_FINAL_TITLE')}</h2>
      <p className={`${prefix}__subtitle`}>{t('FLB_FINAL_SUBTITLE')}</p>
      <ul className={`${prefix}__benefits`}>
        {benefits.map((key) => (
          <li key={key}>
            <svg viewBox='0 0 32 32' aria-hidden='true'>
              <circle cx='16' cy='16' r='16' fill='#e69b01' />
              <path
                d='m9.5 16.5 4.2 4.2 8.8-9.4'
                fill='none'
                stroke='#1f1500'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span>{t(key)}</span>
          </li>
        ))}
      </ul>
      <h3>{t('FLB_FINAL_PACK_TITLE')}</h3>
      <p className={`${prefix}__pack`}>{t('FLB_FINAL_PACK_DESCRIPTION')}</p>
      <p className={`${prefix}__lead`}>{t('FLB_FINAL_LEAD')}</p>
      {withCta && <LandingCtaButton className={`${prefix}__cta`} />}
    </div>
  );
}

export function FinalCtaSection() {
  const t = useTranslationOnPage('landings');
  const { ref, isVisible } = useReveal<HTMLElement>();
  const revealClass = isVisible ? 'flb-reveal is-visible' : 'flb-reveal';

  return (
    <section ref={ref} className={revealClass}>
      <div className='flb-d'>
        <div className='flb-final-wrap'>
          <div className='flb-final'>
            <div className='flb-final__bg' aria-hidden='true'>
              <img
                className='flb-final__pattern'
                src={asset('final-pattern.svg')}
                width={1440}
                height={800}
                alt=''
                loading='lazy'
                decoding='async'
              />
            </div>
            <img
              className='flb-final__shadow flb-final__shadow--left'
              src={asset('final-shadow-left.svg')}
              width={452}
              height={139}
              alt=''
              aria-hidden='true'
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-final__shadow flb-final__shadow--right'
              src={asset('final-shadow-right.svg')}
              width={411}
              height={71}
              alt=''
              aria-hidden='true'
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-final__product'
              src={asset('final-product.webp')}
              width={1023}
              height={1137}
              alt={t('FLB_FINAL_PRODUCT_ALT')}
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-final__leaf'
              data-flb-parallax='0.09'
              src={asset('final-leaf.webp')}
              width={592}
              height={620}
              alt=''
              aria-hidden='true'
              loading='lazy'
              decoding='async'
            />
            <Content prefix='flb-final' withCta />
          </div>
        </div>
      </div>

      <div className='flb-m'>
        <div className='flb-final-wrap-m'>
          <div className='flb-final-m'>
            <div className='flb-final-m__bg' aria-hidden='true'>
              <img
                className='flb-final-m__pattern'
                src={asset('final-pattern-m.svg')}
                width={393}
                height={708}
                alt=''
                loading='lazy'
                decoding='async'
              />
            </div>
            <Content prefix='flb-final-m' />
            <div className='flb-final-m__art'>
              <img
                className='flb-final-m__shadow'
                src={asset('final-shadow-left-m.svg')}
                width={181}
                height={68}
                alt=''
                aria-hidden='true'
                loading='lazy'
                decoding='async'
              />
              <img
                className='flb-final-m__product'
                src={asset('final-product-m.webp')}
                width={498}
                height={546}
                alt={t('FLB_FINAL_PRODUCT_ALT')}
                loading='lazy'
                decoding='async'
              />
              <img
                className='flb-final-m__leaf'
                data-flb-parallax='0.09'
                src={asset('final-leaf-m.webp')}
                width={324}
                height={340}
                alt=''
                aria-hidden='true'
                loading='lazy'
                decoding='async'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
