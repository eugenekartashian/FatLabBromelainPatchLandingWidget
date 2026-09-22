import React from 'react';
import { Link } from 'common/lib/router';
import { useTranslationOnPage } from '@translate';
import { createProductUrl } from '../../../../tools/url';
import { asset } from '../cdn';
import { LandingCtaButton } from '../components/LandingCtaButton';

const SPEC_KEYS = ['MB_HERO_SPEC_1', 'MB_HERO_SPEC_2', 'MB_HERO_SPEC_3', 'MB_HERO_SPEC_4'] as const;
// Icons aligned to SPEC_KEYS so each card matches the mockup:
//   SPEC_1 Warranty      → hero-spec-3 (shield)
//   SPEC_2 Radiant        → hero-spec-1 (sparkle)
//   SPEC_3 Compatibility → hero-spec-4 (person/accessibility)
//   SPEC_4 One device    → hero-spec-2 (lightning)
const SPEC_ICONS = ['hero-spec-3.svg', 'hero-spec-1.svg', 'hero-spec-4.svg', 'hero-spec-2.svg'];

// This landing is the BLACK edition; the pink swatch links to the pink
// edition's product page (which runs ProductImageLandingWidget and links back).
const PINK_EDITION_ALIAS = 'medicube-age-r-booster-pro-pink-edition-ex';

// The headline's product name is accented (--mb-accent / #f2cba6) per the mockup.
// It's a constant Latin brand string that sits verbatim inside MB_HERO_TITLE in
// every locale, so we can safely tint just this run — unlike the arbitrary
// mid-sentence emphasis that index.scss documents as unsafe to wrap. If a locale
// ever lacks it, the headline renders all-black (the prior behaviour).
const PRODUCT_NAME = 'Medicube Age-R Booster Pro';

export function HeroSection() {
  const t = useTranslationOnPage('landings');

  const colorLabel = t('MB_HERO_COLOR_LABEL');
  const badge = `${t('MB_HERO_BADGE_1')} • ${t('MB_HERO_BADGE_2')}`;
  const title = t('MB_HERO_TITLE');
  const desc = t('MB_HERO_DESC');

  // Tint the brand run of the headline to match the mockup; the rest stays black.
  const renderTitle = () => {
    const i = title.indexOf(PRODUCT_NAME);
    if (i === -1) return title;
    return (
      <>
        {title.slice(0, i)}
        <span className='mb-hero__brand'>{PRODUCT_NAME}</span>
        {title.slice(i + PRODUCT_NAME.length)}
      </>
    );
  };

  const specs = SPEC_KEYS.map((key, i) => {
    const [lbl, val] = t(key).split('\n');
    return { key, icon: SPEC_ICONS[i], lbl, val };
  });

  const renderSwatches = (cls: string) => (
    <div className={cls}>
      <Link
        className='mb-hero__swatch'
        style={{ background: '#f2c5c6' }}
        to={createProductUrl(PINK_EDITION_ALIAS)}
        aria-label={`${colorLabel}: pink`}
      />
      <span
        className='mb-hero__swatch is-active'
        style={{ background: '#000' }}
        role='img'
        aria-label={`${colorLabel}: black`}
      />
    </div>
  );

  return (
    <section>
      {/* ── Desktop ─────────────────────────────────────────────── */}
      <div className='mb-d mb-hero'>
        <div className='mb-hero__bg'>
          <img
            src={asset('hero-device.webp')}
            alt='Medicube Age-R Booster Pro Ex'
            loading='eager'
            decoding='async'
          />
        </div>
        <div className='mb-hero__wave'>
          <img src={asset('hero-wave.svg')} alt='' aria-hidden='true' loading='lazy' decoding='async' />
        </div>

        <div className='mb-hero__colors'>
          <b>{colorLabel}</b>
          {renderSwatches('mb-hero__swatches')}
        </div>

        <div className='mb-hero__content'>
          <span className='mb-hero__badge'>{badge}</span>
          <h2>{renderTitle()}</h2>
          <p className='mb-hero__lead'>{desc}</p>
          <LandingCtaButton />
        </div>

        {specs.map((s, i) => (
          <div key={s.key} className={`mb-hero__spec mb-hero__spec--${i + 1}`}>
            <img src={asset(s.icon)} alt='' aria-hidden='true' loading='lazy' decoding='async' />
            <div>
              <div className='mb-hero__spec-lbl'>{s.lbl}</div>
              <div className='mb-hero__spec-val'>{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Mobile ──────────────────────────────────────────────── */}
      <div className='mb-m mb-hero-m'>
        <div className='mb-hero-m__top'>
          <span className='mb-hero-m__badge'>{badge}</span>
          <h2>{renderTitle()}</h2>
          <p className='mb-hero-m__lead'>{desc}</p>
          <div className='mb-hero-m__colors'>
            <b>{colorLabel}</b>
            {renderSwatches('mb-hero-m__swatches')}
          </div>
          <LandingCtaButton />
        </div>

        <div className='mb-hero-m__media'>
          <img
            src={asset('hero-device.webp')}
            alt='Medicube Age-R Booster Pro Ex'
            loading='lazy'
            decoding='async'
          />
          {specs.map((s, i) => (
            <div key={s.key} className={`mb-hero-m__chip mb-hero-m__chip--${i + 1}`}>
              <img src={asset(s.icon)} alt='' aria-hidden='true' loading='lazy' decoding='async' />
              <div>
                <div className='mb-hero-m__chip-lbl'>{s.lbl}</div>
                <div className='mb-hero-m__chip-val'>{s.val}</div>
              </div>
            </div>
          ))}
        </div>

        <img
          className='mb-hero-m__wave'
          src={asset('hero-wave.svg')}
          alt=''
          aria-hidden='true'
          loading='lazy'
          decoding='async'
        />
      </div>
    </section>
  );
}
