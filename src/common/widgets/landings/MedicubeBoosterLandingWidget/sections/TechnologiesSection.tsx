import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';

interface TechCard {
  emoji: string;
  titleKey: string;
  descKey: string;
  bar: string;
}

const TECH_CARDS: TechCard[] = [
  {
    emoji: '⚡',
    titleKey: 'MB_TECH_1_TITLE',
    descKey: 'MB_TECH_1_DESC',
    bar: 'linear-gradient(to right,#ffeda9,#f2cba6)',
  },
  {
    emoji: '💪',
    titleKey: 'MB_TECH_2_TITLE',
    descKey: 'MB_TECH_2_DESC',
    bar: 'linear-gradient(to right,#000,#f2cba6)',
  },
  {
    emoji: '〰️',
    titleKey: 'MB_TECH_3_TITLE',
    descKey: 'MB_TECH_3_DESC',
    bar: 'linear-gradient(to right,#f2cba6,#463b1d)',
  },
  {
    emoji: '💡',
    titleKey: 'MB_TECH_4_TITLE',
    descKey: 'MB_TECH_4_DESC',
    bar: 'linear-gradient(to right,#696969,#dedede)',
  },
  {
    emoji: '📱',
    titleKey: 'MB_TECH_5_TITLE',
    descKey: 'MB_TECH_5_DESC',
    bar: 'linear-gradient(to right,#9c9c9c,#101010)',
  },
  {
    emoji: '🎯',
    titleKey: 'MB_TECH_6_TITLE',
    descKey: 'MB_TECH_6_DESC',
    bar: 'linear-gradient(to right,#f2cba6,#de7d21)',
  },
];

export function TechnologiesSection() {
  const t = useTranslationOnPage('landings');

  // Mockup underlines the last word of the title with the squiggle (same pattern
  // as the other section heads). Positional split (no translation edits) — per
  // locale the underline follows the last word, consistent with the BA title.
  const renderTitle = () => {
    const words = t('MB_TECH_TITLE').trim().split(/\s+/);
    if (words.length < 2) return t('MB_TECH_TITLE');
    const head = words.slice(0, -1).join(' ');
    const last = words[words.length - 1];
    return (
      <>
        {head}{' '}
        <span className="mb-uline">
          {last}
          <img className="mb-squiggle" src={asset('before-after-title-underline.svg')} alt="" aria-hidden="true" />
        </span>
      </>
    );
  };

  return (
    <React.Fragment>
      {/* ── Desktop ─────────────────────────────────────────────────────── */}
      <div className="mb-d">
        <div className="mb-tech">
          <div className="mb-tech__band">
            <img src={asset('technologies-band.svg')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
          <div className="mb-sec-head mb-tech__sec-head">
            <h2>{renderTitle()}</h2>
            <p>{t('MB_TECH_DESC')}</p>
          </div>
          <div className="mb-tech__main">
            <div className="mb-tech__device">
              <img
                src={asset('technologies-devices.webp')}
                alt="Age-R Booster Pro Ex"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="mb-tech__grid">
              {TECH_CARDS.map((card) => (
                <div className="mb-tcard" key={card.titleKey}>
                  <div className="mb-tcard__top">
                    <div className="mb-tcard__emoji" aria-hidden="true">
                      {card.emoji}
                    </div>
                    <div className="mb-tcard__txt">
                      <h3>{t(card.titleKey)}</h3>
                      <p>{t(card.descKey)}</p>
                    </div>
                  </div>
                  <div className="mb-tcard__bar" style={{ background: card.bar }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile ──────────────────────────────────────────────────────── */}
      <div className="mb-m">
        <div className="mb-tech-m">
          <div className="mb-tech-m__band">
            <img src={asset('technologies-band.svg')} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
          <div className="mb-head-m mb-tech-m__head">
            <h2>{renderTitle()}</h2>
            <p>{t('MB_TECH_DESC')}</p>
          </div>
          <div className="mb-tech-m__body">
            <div className="mb-tgrid">
              {TECH_CARDS.map((card) => (
                <div className="mb-tcard-m" key={card.titleKey}>
                  <div className="mb-tcard-m__emoji" aria-hidden="true">
                    {card.emoji}
                  </div>
                  <h3>{t(card.titleKey)}</h3>
                  <p>{t(card.descKey)}</p>
                  <div className="mb-tcard-m__bar" style={{ background: card.bar }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
