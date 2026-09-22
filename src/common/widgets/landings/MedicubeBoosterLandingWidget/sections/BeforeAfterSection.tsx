import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

const BENEFITS = [1, 2, 3, 4] as const;

export function BeforeAfterSection() {
  const t = useTranslationOnPage('landings');

  const benefits = BENEFITS.map((n) => ({
    num: n,
    icon: asset(`before-after-benefit-${n}.svg`),
    title: t(`MB_BENEFIT_${n}_TITLE`),
    desc: t(`MB_BENEFIT_${n}_DESC`),
  }));

  // Title emphasis per the mockup: first word in --mb-accent, last two words
  // carry the squiggle underline (`.mb-uline` scopes the squiggle to just those
  // words). Positional split — no translation edits; for very short copy we fall
  // back to underlining the whole title. NOTE: per-locale the accent/underline
  // follow word position, not meaning (see index.scss i18n note).
  const renderTitle = () => {
    const sq = (
      <img className="mb-squiggle" src={asset('before-after-title-underline.svg')} alt="" aria-hidden="true" />
    );
    const words = t('MB_BA_TITLE').trim().split(/\s+/);
    if (words.length < 3) {
      return (
        <span className="mb-uline">
          {t('MB_BA_TITLE')}
          {sq}
        </span>
      );
    }
    const first = words[0];
    const middle = words.slice(1, -2).join(' ');
    const lastTwo = words.slice(-2).join(' ');
    return (
      <>
        <span className="mb-ba__accent">{first}</span>
        {middle ? ` ${middle} ` : ' '}
        <span className="mb-uline">
          {lastTwo}
          {sq}
        </span>
      </>
    );
  };

  return (
    <section className="mb-ba-section">
      <div className="mb-d mb-ba">
        <div
          className="mb-ba__pattern"
          style={{ backgroundImage: `url(${asset('pattern-desktop.svg')})` }}
          aria-hidden="true"
        />
        <div className="mb-sec-head mb-ba__head">
          <h2>{renderTitle()}</h2>
          <p>{t('MB_BA_DESC')}</p>
        </div>
        <div className="mb-ba__row">
          <BeforeAfterSlider
            beforeUrl={asset('before-after-photo-before.webp')}
            afterUrl={asset('before-after-photo-after.webp')}
            beforeLabel={t('PL_SKIN_BEFORE')}
            afterLabel={t('PL_SKIN_AFTER')}
            className="mb-ba__compare"
          />
          <div className="mb-ba__benefits">
            {benefits.map((b) => (
              <div className="mb-ba__bcard" key={b.num}>
                <span className="mb-ba__bubble mb-ba__bubble--1" aria-hidden="true" />
                <span className="mb-ba__bubble mb-ba__bubble--2" aria-hidden="true" />
                <div className="mb-ba__bcard-inner">
                  <span className="mb-ba__bcard-icon">
                    <img src={b.icon} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                  </span>
                  <div className="mb-ba__bcard-txt">
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                  </div>
                </div>
                <span className="mb-ba__bcard-num">{b.num}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle class (.mb-m) lives on a bare wrapper so the section's own
          display:flex isn't clobbered by `.mb-landing .mb-m{display:block}`
          (same pattern as Technologies/Ritual). */}
      <div className="mb-m">
        <div className="mb-ba-m">
          <div
            className="mb-ba-m__pattern"
            style={{ backgroundImage: `url(${asset('pattern-mobile.svg')})` }}
            aria-hidden="true"
          />
          <div className="mb-head-m mb-ba-m__head">
            <h2>{renderTitle()}</h2>
            <p>{t('MB_BA_DESC')}</p>
          </div>
          <BeforeAfterSlider
            beforeUrl={asset('before-after-photo-before.webp')}
            afterUrl={asset('before-after-photo-after.webp')}
            beforeLabel={t('PL_SKIN_BEFORE')}
            afterLabel={t('PL_SKIN_AFTER')}
            className="mb-ba__compare mb-ba__compare--m"
          />
          <div className="mb-ba-m__benefits">
            {benefits.map((b) => (
              <div className="mb-ba-m__bcard" key={b.num}>
                <span className="mb-ba-m__bcard-num">{b.num}</span>
                <span className="mb-ba-m__bcard-icon">
                  <img src={b.icon} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                </span>
                <div className="mb-ba-m__bcard-txt">
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
