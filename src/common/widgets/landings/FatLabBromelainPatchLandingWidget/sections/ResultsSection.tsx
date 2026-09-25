import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';
import { CountUp } from '../components/CountUp';
import { useReveal } from '../hooks/useReveal';

const statKeys = [
  ['FLB_RESULTS_STAT_1_VALUE', 'FLB_RESULTS_STAT_1_LABEL'],
  ['FLB_RESULTS_STAT_2_VALUE', 'FLB_RESULTS_STAT_2_LABEL'],
  ['FLB_RESULTS_STAT_3_VALUE', 'FLB_RESULTS_STAT_3_LABEL'],
  ['FLB_RESULTS_STAT_4_VALUE', 'FLB_RESULTS_STAT_4_LABEL'],
] as const;

function ResultStats({ mobile = false }: { mobile?: boolean }) {
  const t = useTranslationOnPage('landings');
  const prefix = mobile ? 'flb-results-m' : 'flb-results';

  return (
    <div className={`${prefix}__stats`}>
      {statKeys.map(([valueKey, labelKey]) => (
        <div className={`${prefix}__stat`} key={valueKey}>
          <CountUp className={`${prefix}__value`} value={t(valueKey)} />
          <p className={`${prefix}__label`}>{t(labelKey)}</p>
        </div>
      ))}
    </div>
  );
}

export function ResultsSection() {
  const t = useTranslationOnPage('landings');
  const { ref, isVisible } = useReveal<HTMLElement>();
  const revealClass = isVisible ? 'flb-reveal is-visible' : 'flb-reveal';

  return (
    <section ref={ref} className={revealClass}>
      <div className='flb-d'>
        <div className='flb-results'>
          <div className='flb-results__copy'>
            <h2>{t('FLB_RESULTS_TITLE')}</h2>
            <p className='flb-results__description'>{t('FLB_RESULTS_DESCRIPTION')}</p>
            <ResultStats />
            <p className='flb-results__note'>{t('FLB_RESULTS_NOTE')}</p>
          </div>
          <div className='flb-results__composition' aria-hidden='true'>
            <img
              className='flb-results__shape'
              src={asset('results-shape.svg')}
              width={887}
              height={779}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-results__leaf'
              data-flb-parallax='0.09'
              src={asset('results-leaf.webp')}
              width={932}
              height={904}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-results__product'
              src={asset('results-product.webp')}
              width={1402}
              height={1141}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img className='flb-results__logo' src={asset('results-logo.svg')} alt='' loading='lazy' decoding='async' />
          </div>
        </div>
      </div>

      <div className='flb-m'>
        <div className='flb-results-m'>
          <div className='flb-results-m__copy'>
            <h2>{t('FLB_RESULTS_TITLE')}</h2>
            <p>{t('FLB_RESULTS_DESCRIPTION')}</p>
          </div>
          <ResultStats mobile />
          <p className='flb-results-m__note'>{t('FLB_RESULTS_NOTE')}</p>
          <div className='flb-results-m__composition' aria-hidden='true'>
            <img
              className='flb-results-m__shape'
              src={asset('results-shape.svg')}
              width={887}
              height={779}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-results-m__leaf'
              data-flb-parallax='0.09'
              src={asset('results-leaf-m.webp')}
              width={412}
              height={398}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-results-m__product'
              src={asset('results-product-m.webp')}
              width={1402}
              height={1141}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-results-m__logo'
              src={asset('results-logo-m.svg')}
              width={50}
              height={10}
              alt=''
              loading='lazy'
              decoding='async'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
