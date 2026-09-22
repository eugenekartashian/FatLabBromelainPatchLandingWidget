import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';
import { useReveal } from '../hooks/useReveal';

type BenefitKind = 'flow' | 'result' | 'temperature';

const BENEFITS = {
  flow: {
    descriptionKey: 'FLB_CIRCULATION_FLOW_DESCRIPTION',
    icon: 'circulation-flow.svg',
    titleKey: 'FLB_CIRCULATION_FLOW_TITLE',
  },
  result: {
    descriptionKey: 'FLB_CIRCULATION_RESULT_DESCRIPTION',
    icon: 'circulation-result.svg',
    titleKey: 'FLB_CIRCULATION_RESULT_TITLE',
  },
  temperature: {
    descriptionKey: 'FLB_CIRCULATION_TEMPERATURE_DESCRIPTION',
    icon: 'circulation-temperature.svg',
    titleKey: 'FLB_CIRCULATION_TEMPERATURE_TITLE',
  },
} as const;

function Benefit({ kind, mobile = false }: { kind: BenefitKind; mobile?: boolean }) {
  const t = useTranslationOnPage('landings');
  const benefit = BENEFITS[kind];
  const rootClass = mobile
    ? `flb-circulation-m__benefit flb-circulation-m__benefit--${kind}`
    : `flb-circulation__benefit flb-circulation__benefit--${kind}`;

  return (
    <div className={rootClass}>
      <span className='flb-circulation__icon' aria-hidden='true'>
        <img src={asset(benefit.icon)} alt='' loading='lazy' decoding='async' />
      </span>
      <div className='flb-circulation__benefit-copy'>
        <h3>{t(benefit.titleKey)}</h3>
        <p>{t(benefit.descriptionKey)}</p>
      </div>
    </div>
  );
}

export function CirculationSection() {
  const t = useTranslationOnPage('landings');
  const { ref, isVisible } = useReveal<HTMLElement>();
  const revealClass = isVisible ? 'flb-circulation-wrap flb-reveal is-visible' : 'flb-circulation-wrap flb-reveal';

  return (
    <section ref={ref} className={revealClass}>
      <img
        className='flb-circulation-molecule'
        data-flb-parallax='0.05'
        src={asset('circulation-molecule.webp')}
        width={1208}
        height={860}
        alt=''
        aria-hidden='true'
        loading='lazy'
        decoding='async'
      />
      <img
        className='flb-circulation-molecule flb-circulation-molecule--m'
        data-flb-parallax='0.05'
        src={asset('circulation-molecule-m.webp')}
        width={712}
        height={538}
        alt=''
        aria-hidden='true'
        loading='lazy'
        decoding='async'
      />
      <div className='flb-d'>
        <div className='flb-circulation'>
          <img
            className='flb-circulation__leaf'
            data-flb-parallax='0.09'
            src={asset('circulation-leaf.webp')}
            width={232}
            height={170}
            alt=''
            aria-hidden='true'
            loading='lazy'
            decoding='async'
          />
          <div className='flb-circulation__heading'>
            <h2>{t('FLB_CIRCULATION_TITLE')}</h2>
            <p>{t('FLB_CIRCULATION_DESCRIPTION')}</p>
            <p className='flb-circulation__lead'>{t('FLB_CIRCULATION_LEAD')}</p>
          </div>
          <img
            className='flb-circulation__model'
            src={asset('circulation-model.webp')}
            width={2400}
            height={1792}
            alt={t('FLB_CIRCULATION_MODEL_ALT')}
            loading='lazy'
            decoding='async'
          />
          <Benefit kind='flow' />
          <Benefit kind='temperature' />
          <Benefit kind='result' />
        </div>
      </div>

      <div className='flb-m'>
        <div className='flb-circulation-m'>
          <img
            className='flb-circulation-m__leaf'
            data-flb-parallax='0.06'
            data-flb-parallax-range='0,24'
            src={asset('circulation-leaf.webp')}
            width={232}
            height={170}
            alt=''
            aria-hidden='true'
            loading='lazy'
            decoding='async'
          />
          <div className='flb-circulation-m__heading'>
            <h2>{t('FLB_CIRCULATION_TITLE')}</h2>
            <p>{t('FLB_CIRCULATION_DESCRIPTION')}</p>
            <p className='flb-circulation-m__lead'>{t('FLB_CIRCULATION_LEAD')}</p>
          </div>
          <div className='flb-circulation-m__model-wrap'>
            <img
              className='flb-circulation-m__model'
              src={asset('circulation-model.webp')}
              width={2400}
              height={1792}
              alt={t('FLB_CIRCULATION_MODEL_ALT')}
              loading='lazy'
              decoding='async'
            />
          </div>
          <div className='flb-circulation-m__benefits'>
            <Benefit kind='temperature' mobile />
            <Benefit kind='flow' mobile />
            <Benefit kind='result' mobile />
          </div>
        </div>
      </div>
    </section>
  );
}
