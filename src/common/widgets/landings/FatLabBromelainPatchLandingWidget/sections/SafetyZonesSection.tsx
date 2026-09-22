import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';
import { useReveal } from '../hooks/useReveal';

const zones = [
  ['arms', 'FLB_ZONES_ARMS'],
  ['hips', 'FLB_ZONES_HIPS'],
  ['calves', 'FLB_ZONES_CALVES'],
  ['waist', 'FLB_ZONES_WAIST'],
] as const;

function ZoneDots({ prefix }: { prefix: string }) {
  return (
    <>
      {[1, 2, 3, 4].map((n) => (
        <span className={`${prefix}__dot ${prefix}__dot--${n}`} key={n} aria-hidden='true' />
      ))}
    </>
  );
}

function ZoneList({ prefix }: { prefix: string }) {
  const t = useTranslationOnPage('landings');
  return (
    <ul className={`${prefix}__list`}>
      {zones.map(([kind, key]) => (
        <li className={`${prefix}__item`} key={kind}>
          <img
            className={`${prefix}__icon`}
            src={asset(`safety-icon-${kind}.svg`)}
            width={61}
            height={61}
            alt=''
            aria-hidden='true'
            loading='lazy'
            decoding='async'
          />
          <span className={`${prefix}__label`}>{t(key)}</span>
        </li>
      ))}
    </ul>
  );
}

export function SafetyZonesSection() {
  const t = useTranslationOnPage('landings');
  const { ref, isVisible } = useReveal<HTMLElement>();
  const revealClass = isVisible ? 'flb-reveal is-visible' : 'flb-reveal';

  return (
    <section ref={ref} className={revealClass}>
      <div className='flb-d'>
        <div className='flb-safety'>
          <img
            className='flb-safety__pattern flb-safety__pattern--top'
            src={asset('safety-pattern-top.webp')}
            width={2880}
            height={1036}
            alt=''
            aria-hidden='true'
            loading='lazy'
            decoding='async'
          />
          <img
            className='flb-safety__pattern flb-safety__pattern--bottom'
            src={asset('safety-pattern-bottom.webp')}
            width={2880}
            height={494}
            alt=''
            aria-hidden='true'
            loading='lazy'
            decoding='async'
          />
          <div className='flb-safety__visual'>
            <img
              className='flb-safety__photo'
              src={asset('safety-photo.webp')}
              width={1196}
              height={1600}
              alt={t('FLB_SAFETY_MODEL_ALT')}
              loading='lazy'
              decoding='async'
            />
            <ZoneDots prefix='flb-safety' />
            <img
              className='flb-safety__logo'
              src={asset('results-logo.svg')}
              width={112}
              height={22}
              alt=''
              aria-hidden='true'
              loading='lazy'
              decoding='async'
            />
            <div className='flb-safety__card'>
              <h3>{t('FLB_SAFETY_TITLE')}</h3>
              <p>{t('FLB_SAFETY_DESCRIPTION')}</p>
            </div>
          </div>
          <div className='flb-zones'>
            <h2>{t('FLB_ZONES_TITLE')}</h2>
            <p className='flb-zones__description'>{t('FLB_ZONES_DESCRIPTION')}</p>
            <ZoneList prefix='flb-zones' />
            <p className='flb-zones__footnote'>{t('FLB_ZONES_FOOTNOTE')}</p>
          </div>
        </div>
      </div>

      <div className='flb-m'>
        <div className='flb-safety-m'>
          <img
            className='flb-safety-m__pattern flb-safety-m__pattern--top'
            src={asset('safety-pattern-top-m.webp')}
            width={786}
            height={254}
            alt=''
            aria-hidden='true'
            loading='lazy'
            decoding='async'
          />
          <img
            className='flb-safety-m__pattern flb-safety-m__pattern--bottom'
            src={asset('safety-pattern-bottom-m.webp')}
            width={786}
            height={120}
            alt=''
            aria-hidden='true'
            loading='lazy'
            decoding='async'
          />
          <div className='flb-safety-m__head'>
            <h2>{t('FLB_ZONES_TITLE')}</h2>
            <p>{t('FLB_ZONES_DESCRIPTION')}</p>
          </div>
          <div className='flb-safety-m__visual'>
            <img
              className='flb-safety-m__photo'
              src={asset('safety-photo-m.webp')}
              width={750}
              height={686}
              alt={t('FLB_SAFETY_MODEL_ALT')}
              loading='lazy'
              decoding='async'
            />
            <ZoneDots prefix='flb-safety-m' />
          </div>
          <div className='flb-safety-m__card'>
            <h3>{t('FLB_SAFETY_TITLE')}</h3>
            <p>{t('FLB_SAFETY_DESCRIPTION')}</p>
          </div>
          <ZoneList prefix='flb-safety-m' />
          <p className='flb-safety-m__footnote'>{t('FLB_ZONES_FOOTNOTE')}</p>
        </div>
      </div>
    </section>
  );
}
