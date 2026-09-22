import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';

// Box glyph = the mockup's "package" icon (Lucide package — note the diagonal
// tape line that the plain "box" icon lacks). Inlined so it needs no CDN asset;
// stroke baked to --mb-accent-d (#e8b17d).
function PackageGlyph() {
  return (
    <svg className="mb-guarantee__pkg-svg" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="#e8b17d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.16667 18.1083C9.42003 18.2546 9.70744 18.3316 10 18.3316C10.2926 18.3316 10.58 18.2546 10.8333 18.1083L16.6667 14.775C16.9198 14.6289 17.13 14.4187 17.2763 14.1657C17.4225 13.9127 17.4997 13.6256 17.5 13.3333V6.66667C17.4997 6.3744 17.4225 6.08734 17.2763 5.8343C17.13 5.58126 16.9198 5.37114 16.6667 5.225L10.8333 1.89167C10.58 1.74539 10.2926 1.66838 10 1.66838C9.70744 1.66838 9.42003 1.74539 9.16667 1.89167L3.33333 5.225C3.08022 5.37114 2.86998 5.58126 2.72372 5.8343C2.57745 6.08734 2.5003 6.3744 2.5 6.66667V13.3333C2.5003 13.6256 2.57745 13.9127 2.72372 14.1657C2.86998 14.4187 3.08022 14.6289 3.33333 14.775L9.16667 18.1083Z" />
        <path d="M10 18.3333V10" />
        <path d="M2.74167 5.83333L10 10L17.2583 5.83333" />
        <path d="M6.25 3.55833L13.75 7.85" />
      </g>
    </svg>
  );
}

// Clean check icon (matches the mockup); replaces the font ✓ glyph that rendered
// inconsistently across fonts. Colour inherited from the card icon (currentColor).
function CheckGlyph() {
  return (
    <svg className="mb-gcard__check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GuaranteeSection() {
  const t = useTranslationOnPage('landings');

  const included = [
    t('MB_GUARANTEE_INCLUDED_1'),
    t('MB_GUARANTEE_INCLUDED_2'),
    t('MB_GUARANTEE_INCLUDED_3'),
  ];

  return (
    <section>
      {/* ── Desktop composition ─────────────────────────────────────────── */}
      <div className="mb-d mb-guarantee">
        <div className="mb-guarantee__row">
          <div className="mb-guarantee__img">
            <img
              src={asset('guarantee-device.webp')}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mb-guarantee__txt">
            <h2 className="mb-guarantee__title">{t('MB_GUARANTEE_TITLE')}</h2>
            <p className="mb-guarantee__desc">{t('MB_GUARANTEE_DESC')}</p>
            <span className="mb-guarantee__inc-title">
              {t('MB_GUARANTEE_INCLUDED_TITLE')}
            </span>
            <ul className="mb-guarantee__inc-list">
              {included.map((item) => (
                <li key={item} className="mb-guarantee__inc-item">
                  <span className="mb-guarantee__inc-ic">
                    <PackageGlyph />
                  </span>
                  <span className="mb-guarantee__inc-label">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mb-guarantee__cards">
              <div className="mb-gcard mb-gcard--white">
                <span className="mb-gcard__ic" aria-hidden="true">
                  <CheckGlyph />
                </span>
                <h3 className="mb-gcard__title">{t('MB_GUARANTEE_WARRANTY')}</h3>
              </div>
              <div className="mb-gcard mb-gcard--peach">
                <span className="mb-gcard__ic" aria-hidden="true">
                  <img
                    src={asset('guarantee-card-icon.svg')}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <h3 className="mb-gcard__title">
                  {t('MB_GUARANTEE_WARRANTY_PERIOD')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile composition ──────────────────────────────────────────── */}
      {/* Toggle class (.mb-m) on a bare wrapper so the section's display:flex
          (horizontal: image left / copy right) isn't clobbered by
          `.mb-landing .mb-m{display:block}`. */}
      <div className="mb-m">
        <div className="mb-guarantee-m">
          <div className="mb-guarantee-m__img">
            <img
              src={asset('guarantee-device.webp')}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mb-guarantee-m__txt">
            <h2 className="mb-guarantee-m__title">{t('MB_GUARANTEE_TITLE')}</h2>
            <p className="mb-guarantee-m__desc">{t('MB_GUARANTEE_DESC')}</p>
            <span className="mb-guarantee-m__inc-title">
              {t('MB_GUARANTEE_INCLUDED_TITLE')}
            </span>
            <ul className="mb-guarantee-m__inc-list">
              {included.map((item) => (
                <li key={item} className="mb-guarantee-m__inc-item">
                  <span className="mb-guarantee-m__inc-ic">
                    <PackageGlyph />
                  </span>
                  <span className="mb-guarantee-m__inc-label">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mb-guarantee-m__cards">
              <div className="mb-gcard-m mb-gcard-m--white">
                <span className="mb-gcard-m__ic" aria-hidden="true">
                  <CheckGlyph />
                </span>
                <h3 className="mb-gcard-m__title">{t('MB_GUARANTEE_WARRANTY')}</h3>
              </div>
              <div className="mb-gcard-m mb-gcard-m--peach">
                <span className="mb-gcard-m__ic" aria-hidden="true">
                  <img
                    src={asset('guarantee-card-icon.svg')}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <h3 className="mb-gcard-m__title">
                  {t('MB_GUARANTEE_WARRANTY_PERIOD')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
