import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';
import { useReveal } from '../hooks/useReveal';

function vars(images: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(images).map(([key, file]) => [`--flb-${key}`, `url(${asset(file)})`]),
  ) as React.CSSProperties;
}

// natural sizes of the step artwork, used as width/height hints to avoid layout shift
const NUM_SIZES = [[110, 245], [173, 250], [180, 250]] as const;
const PHOTO_SIZES = [[522, 341], [500, 374], [536, 400]] as const;

const steps = [
  ['FLB_USAGE_STEP_1_TITLE', 'FLB_USAGE_STEP_1_DESCRIPTION'],
  ['FLB_USAGE_STEP_2_TITLE', 'FLB_USAGE_STEP_2_DESCRIPTION'],
  ['FLB_USAGE_STEP_3_TITLE', 'FLB_USAGE_STEP_3_DESCRIPTION'],
] as const;

const days = [
  ['FLB_USAGE_DAY_1', true],
  ['FLB_USAGE_DAY_2', false],
  ['FLB_USAGE_DAY_3', true],
  ['FLB_USAGE_DAY_4', false],
  ['FLB_USAGE_DAY_5', true],
  ['FLB_USAGE_DAY_6', false],
  ['FLB_USAGE_DAY_7', true],
] as const;

function Steps({ prefix }: { prefix: string }) {
  const t = useTranslationOnPage('landings');
  return (
    <>
      {steps.map(([titleKey, descriptionKey], index) => {
        const n = index + 1;
        return (
          <article className={`${prefix}__step ${prefix}__step--${n}`} key={titleKey}>
            <img
              className={`${prefix}__num`}
              src={asset(`usage-num-${n}.svg`)}
              width={NUM_SIZES[index][0]}
              height={NUM_SIZES[index][1]}
              alt=''
              aria-hidden='true'
              loading='lazy'
              decoding='async'
            />
            <span className={`${prefix}__step-label`}>{t('FLB_USAGE_STEP_LABEL')}</span>
            <div className={`${prefix}__card`}>
              <img
                className={`${prefix}__photo`}
                src={asset(`usage-step-${n}.webp`)}
                width={PHOTO_SIZES[index][0]}
                height={PHOTO_SIZES[index][1]}
                alt=''
                aria-hidden='true'
                loading='lazy'
                decoding='async'
              />
              {/* invisible spacer: keeps the title/description where the number badge used to sit */}
              <span className={`${prefix}__badge-spacer`} aria-hidden='true' />
              <h3>{t(titleKey)}</h3>
              <p>{t(descriptionKey)}</p>
            </div>
          </article>
        );
      })}
    </>
  );
}

function Days({ prefix }: { prefix: string }) {
  const t = useTranslationOnPage('landings');
  return (
    <ul className={`${prefix}__days`}>
      {days.map(([dayKey, on]) => (
        <li className={`${prefix}__day${on ? ' is-on' : ''}`} key={dayKey}>
          <span className={`${prefix}__day-name`}>{t(dayKey)}</span>
          <span className={`${prefix}__day-hex`}>{t(on ? 'FLB_USAGE_DAY_ON' : 'FLB_USAGE_DAY_OFF')}</span>
        </li>
      ))}
    </ul>
  );
}

export function HowToUseSection() {
  const t = useTranslationOnPage('landings');
  const { ref, isVisible } = useReveal<HTMLElement>();
  const revealClass = isVisible ? 'flb-reveal is-visible' : 'flb-reveal';

  return (
    <section ref={ref} className={revealClass}>
      <div className='flb-d'>
        <div
          className='flb-usage'
          style={vars({
            shape: 'usage-shape.svg',
            pattern: 'safety-pattern-top.webp',
            hexOn: 'usage-hex-on.svg',
            hexOff: 'usage-hex-off.svg',
          })}
        >
          <div className='flb-usage__bg' aria-hidden='true' />
          <h2>{t('FLB_USAGE_TITLE')}</h2>
          <Steps prefix='flb-usage' />
          <img
            className='flb-usage__leaf'
            data-flb-parallax='0.09'
            src={asset('usage-leaf.webp')}
            width={426}
            height={462}
            alt=''
            aria-hidden='true'
            loading='lazy'
            decoding='async'
          />
          <div className='flb-usage__schedule-head'>
            <h3>{t('FLB_USAGE_SCHEDULE_TITLE')}</h3>
            <p>{t('FLB_USAGE_SCHEDULE_DESCRIPTION')}</p>
          </div>
          <Days prefix='flb-usage' />
          <p className='flb-usage__note'>{t('FLB_USAGE_NOTE')}</p>
        </div>
      </div>

      <div className='flb-m'>
        <div
        className='flb-usage-m'
        style={vars({
          shape: 'usage-shape-m.svg',
          pattern: 'safety-pattern-top-m.webp',
          hexOn: 'usage-hex-on.svg',
          hexOff: 'usage-hex-off.svg',
        })}
      >
          <div className='flb-usage-m__steps-block'>
            <div className='flb-usage-m__bg' aria-hidden='true' />
            <h2>{t('FLB_USAGE_TITLE')}</h2>
            <Steps prefix='flb-usage-m' />
          </div>
          <div className='flb-usage-m__schedule-block'>
            <img
              className='flb-usage-m__leaf'
              data-flb-parallax='0.09'
              src={asset('usage-leaf-m.webp')}
              width={216}
              height={216}
              alt=''
              aria-hidden='true'
              loading='lazy'
              decoding='async'
            />
            <div className='flb-usage-m__schedule-head'>
              <h3>{t('FLB_USAGE_SCHEDULE_TITLE')}</h3>
              <p>{t('FLB_USAGE_SCHEDULE_DESCRIPTION')}</p>
            </div>
            <Days prefix='flb-usage-m' />
            <p className='flb-usage-m__note'>{t('FLB_USAGE_NOTE')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
