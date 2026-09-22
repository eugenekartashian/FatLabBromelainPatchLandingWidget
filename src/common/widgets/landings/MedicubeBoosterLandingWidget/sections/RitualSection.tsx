import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';

interface RitualStep {
  num: string;
  title: string;
  desc: string;
  img: string;
}

export function RitualSection() {
  const t = useTranslationOnPage('landings');

  const stepLabel = t('MB_RITUAL_STEP_LABEL');
  const steps: RitualStep[] = [
    {
      num: '1',
      title: t('MB_RITUAL_STEP_1_TITLE'),
      desc: t('MB_RITUAL_STEP_1_DESC'),
      img: 'ritual-step-1.webp',
    },
    {
      num: '2',
      title: t('MB_RITUAL_STEP_2_TITLE'),
      desc: t('MB_RITUAL_STEP_2_DESC'),
      img: 'ritual-step-2.webp',
    },
    {
      num: '3',
      title: t('MB_RITUAL_STEP_3_TITLE'),
      desc: t('MB_RITUAL_STEP_3_DESC'),
      img: 'ritual-step-3.webp',
    },
  ];

  const infoTitle = t('MB_RITUAL_INFO_TITLE');
  const infoDesc = t('MB_RITUAL_INFO_DESC');

  // Underline only the last two words (e.g. "Booster Pro") to match the mockup,
  // like the other section heads. Positional split — no translation edits.
  const renderTitle = () => {
    const sq = (
      <img className="mb-squiggle" src={asset('ritual-title-underline.svg')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
    );
    const words = t('MB_RITUAL_TITLE').trim().split(/\s+/);
    if (words.length < 3) return <span className="mb-uline">{t('MB_RITUAL_TITLE')}{sq}</span>;
    const head = words.slice(0, -2).join(' ');
    const lastTwo = words.slice(-2).join(' ');
    return (
      <>
        {head}{' '}
        <span className="mb-uline">{lastTwo}{sq}</span>
      </>
    );
  };

  // Accent the mockup's highlighted phrase in the info text. Substring split on
  // the English phrase; in locales where it doesn't match, the text stays fully
  // muted — graceful, consistent with the other positional splits.
  const INFO_ACCENT = 'the most effective and safe';
  const renderInfoDesc = () => {
    const i = infoDesc.indexOf(INFO_ACCENT);
    if (i === -1) return infoDesc;
    return (
      <>
        {infoDesc.slice(0, i)}
        <span className="mb-ritual__info-accent">{INFO_ACCENT}</span>
        {infoDesc.slice(i + INFO_ACCENT.length)}
      </>
    );
  };

  return (
    <>
      {/* ── Desktop ─────────────────────────────────────────────────────── */}
      <div className="mb-d">
        <section className="mb-ritual">
          <div className="mb-sec-head mb-ritual__head">
            <h2>{renderTitle()}</h2>
            <p className="mb-grad-gray">{t('MB_RITUAL_SUBTITLE')}</p>
          </div>

          <div className="mb-ritual__steps">
            {steps.map((step) => (
              <div className="mb-ritual__step" key={step.num}>
                <span className="mb-ritual__krok">{stepLabel}</span>
                <span className="mb-ritual__num">{step.num}</span>
                <div className="mb-ritual__card">
                  <div className="mb-ritual__head-card">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                  <div className="mb-ritual__img">
                    <img
                      src={asset(step.img)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-ritual__info">
            <span className="mb-ritual__info-bubble mb-ritual__info-bubble--1" aria-hidden="true" />
            <span className="mb-ritual__info-bubble mb-ritual__info-bubble--2" aria-hidden="true" />
            <div className="mb-ritual__info-row">
              <div className="mb-ritual__info-icon" aria-hidden="true">
                💡
              </div>
              <div className="mb-ritual__info-txt">
                <h4>{infoTitle}</h4>
                <p>{renderInfoDesc()}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Mobile ──────────────────────────────────────────────────────── */}
      <div className="mb-m">
        <section className="mb-ritual-m">
          <div className="mb-head-m mb-ritual-m__head">
            <h2>
              <span className="mb-grad-gray">{renderTitle()}</span>
            </h2>
            <p className="mb-grad-gray">{t('MB_RITUAL_SUBTITLE')}</p>
          </div>

          <div className="mb-ritual-m__steps">
            {steps.map((step) => (
              <div className="mb-ritual-m__step" key={step.num}>
                <span className="mb-ritual-m__krok">{stepLabel}</span>
                <span className="mb-ritual-m__num">{step.num}</span>
                <div className="mb-ritual-m__card">
                  <div className="mb-ritual-m__txt">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                  <div className="mb-ritual-m__img">
                    <img
                      src={asset(step.img)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-ritual-m__info">
            <span className="mb-ritual-m__info-bubble mb-ritual-m__info-bubble--1" aria-hidden="true" />
            <div className="mb-ritual-m__info-icon" aria-hidden="true">
              💡
            </div>
            <div className="mb-ritual-m__info-txt">
              <h4>{infoTitle}</h4>
              <p>{renderInfoDesc()}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
