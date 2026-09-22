import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';
import { CountUp } from '../components/CountUp';
import { useReveal } from '../hooks/useReveal';

function Comparison({ mobile = false }: { mobile?: boolean }) {
  const t = useTranslationOnPage('landings');
  return (
    <div className={mobile ? 'flb-heat-m__comparison' : 'flb-heat__comparison'}>
      <figure>
        <img src={asset('heat-before.webp')} alt={t('FLB_HEAT_BEFORE_ALT')} loading='lazy' decoding='async' />
        <figcaption>{t('FLB_HEAT_BEFORE')}</figcaption>
      </figure>
      <figure>
        <img src={asset('heat-after.webp')} alt={t('FLB_HEAT_AFTER_ALT')} loading='lazy' decoding='async' />
        <figcaption>{t('FLB_HEAT_AFTER')}</figcaption>
      </figure>
    </div>
  );
}

function HeatStats({ mobile = false }: { mobile?: boolean }) {
  const t = useTranslationOnPage('landings');
  const statClass = mobile ? 'flb-heat-m__stat' : 'flb-heat__stat';
  const valueClass = mobile ? 'flb-heat-m__value' : 'flb-heat__value';
  const labelClass = mobile ? 'flb-heat-m__label' : 'flb-heat__label';
  return (
    <div className={mobile ? 'flb-heat-m__stats' : 'flb-heat__stats'}>
      <div className={statClass}>
        <CountUp className={valueClass} value={t('FLB_HEAT_STAT_TEMP_VALUE')} />
        <div className={labelClass}>{t('FLB_HEAT_STAT_TEMP_LABEL')}</div>
      </div>
      <div className={statClass}>
        <CountUp className={valueClass} value={t('FLB_HEAT_STAT_FLOW_VALUE')} />
        <div className={labelClass}>{t('FLB_HEAT_STAT_FLOW_LABEL')}</div>
      </div>
    </div>
  );
}

export function HeatSection() {
  const t = useTranslationOnPage('landings');
  const { ref, isVisible } = useReveal<HTMLElement>();
  const revealClass = isVisible ? 'flb-reveal is-visible' : 'flb-reveal';

  return (
    <section ref={ref} className={revealClass}>
      <div className='flb-d'>
        <div className='flb-heat'>
          <img
            className='flb-heat__pattern'
            src={asset('heat-honeycomb.svg')}
            width={1440}
            height={864}
            alt=''
            aria-hidden='true'
            loading='lazy'
            decoding='async'
          />
          <div className='flb-heat__model-wrap'>
            <img
              className='flb-heat__model'
              src={asset('heat-model.webp')}
              width={1200}
              height={1200}
              alt={t('FLB_HEAT_MODEL_ALT')}
              loading='lazy'
              decoding='async'
            />
          </div>
          <div className='flb-heat__content'>
            <h2>{t('FLB_HEAT_TITLE')}</h2>
            <Comparison />
            <div
              className='flb-heat__copy'><p>{t('FLB_HEAT_DESCRIPTION_1')}</p><p>{t('FLB_HEAT_DESCRIPTION_2')}</p></div
            >
            <HeatStats />
            <p className='flb-heat__note'>{t('FLB_HEAT_NOTE')}</p>
          </div>
        </div>
      </div>

      <div className='flb-m'>
        <div className='flb-heat-m'>
          <img
            className='flb-heat-m__pattern'
            src={asset('heat-honeycomb-m.svg')}
            width={393}
            height={826}
            alt=''
            aria-hidden='true'
            loading='lazy'
            decoding='async'
          />
          <div className='flb-heat-m__content'>
            <h2>{t('FLB_HEAT_TITLE')}</h2>
            <div
              className='flb-heat-m__copy'><p>{t('FLB_HEAT_DESCRIPTION_1')}</p><p>{t('FLB_HEAT_DESCRIPTION_2')}</p></div
            >
            <Comparison mobile />
            <div className='flb-heat-m__model-wrap'>
              <img
                className='flb-heat-m__model'
                src={asset('heat-model.webp')}
                width={1200}
                height={1200}
                alt={t('FLB_HEAT_MODEL_ALT')}
                loading='lazy'
                decoding='async'
              />
            </div>
            <HeatStats mobile />
            <p className='flb-heat-m__note'>{t('FLB_HEAT_NOTE')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
