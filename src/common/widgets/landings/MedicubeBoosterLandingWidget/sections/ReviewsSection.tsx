import React from 'react';
import { useTranslationOnPage } from '@translate';
import ArrowIconLarge from '@components/_icons/ArrowIconLarge';
import { asset } from '../cdn';
import { LandingCtaButton } from '../components/LandingCtaButton';
import { useReviewsCarousel } from '../hooks/useReviewsCarousel';

type Review = {
  tagKey: string;
  quoteKey: string;
  nameKey: string;
  countryKey: string;
  avatarBg: string;
  avatarImg: string;
  dark: boolean;
};

const REVIEWS: Review[] = [
  {
    tagKey: 'MB_REVIEW_1_TAG',
    quoteKey: 'MB_REVIEW_1_QUOTE',
    nameKey: 'MB_REVIEW_1_NAME',
    countryKey: 'MB_REVIEW_1_COUNTRY',
    avatarBg: '#ffebe4',
    avatarImg: 'reviews-avatar-1.png',
    dark: false,
  },
  {
    tagKey: 'MB_REVIEW_2_TAG',
    quoteKey: 'MB_REVIEW_2_QUOTE',
    nameKey: 'MB_REVIEW_2_NAME',
    countryKey: 'MB_REVIEW_2_COUNTRY',
    avatarBg: '#eef3df',
    avatarImg: 'reviews-avatar-2.png',
    dark: true,
  },
  {
    tagKey: 'MB_REVIEW_3_TAG',
    quoteKey: 'MB_REVIEW_3_QUOTE',
    nameKey: 'MB_REVIEW_3_NAME',
    countryKey: 'MB_REVIEW_3_COUNTRY',
    avatarBg: '#fcead2',
    avatarImg: 'reviews-avatar-3.png',
    dark: false,
  },
];

const STARS = [0, 1, 2, 3, 4];

export function ReviewsSection() {
  const t = useTranslationOnPage('landings');
  const c = useReviewsCarousel(REVIEWS.length);

  // Underline the last two words ("beauty community") with the squiggle. The
  // squiggle must wrap actual text — an empty `.mb-uline` collapses to 0 width
  // and the underline disappears. Positional split — no translation edits.
  const renderTitle = () => {
    const sq = (
      <img className='mb-squiggle' src={asset('reviews-title-underline.svg')} alt='' aria-hidden loading='lazy' decoding='async' />
    );
    const words = t('MB_REVIEWS_TITLE').trim().split(/\s+/);
    if (words.length < 3) {
      return (
        <>
          {t('MB_REVIEWS_TITLE')}{' '}
          <span className='mb-uline'>{sq}</span>
        </>
      );
    }
    const head = words.slice(0, -2).join(' ');
    const lastTwo = words.slice(-2).join(' ');
    return (
      <>
        {head}{' '}
        <span className='mb-uline'>
          {lastTwo}
          {sq}
        </span>
      </>
    );
  };

  const stars = (cls: string) => (
    <div className={cls}>
      {STARS.map((i) => (
        <img key={i} src={asset('reviews-star.svg')} alt='' aria-hidden loading='lazy' decoding='async' />
      ))}
    </div>
  );

  // One mobile review card (real or a loop clone). Clones are aria-hidden so the
  // duplicated copy isn't announced twice by screen readers.
  const renderMobileCard = (r: Review, key: string, clone = false) => (
    <div key={key} className='mb-rcard-m' aria-hidden={clone || undefined}>
      {stars('mb-stars-m')}
      <span className='mb-rtag-m'>{t(r.tagKey)}</span>
      <p className='mb-rquote-m'>{t(r.quoteKey)}</p>
      <div className='mb-rfoot'>
        <div className='mb-ravatar-m' style={{ background: r.avatarBg }}>
          <img src={asset(r.avatarImg)} alt='' aria-hidden loading='lazy' decoding='async' />
        </div>
        <div>
          <div className='mb-nm'>{t(r.nameKey)}</div>
          <div className='mb-cn'>{t(r.countryKey)}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className='mb-d'>
        <section className='mb-reviews'>
          <div className='mb-reviews__sphere'>
            <img src={asset('reviews-sphere.webp')} alt='' aria-hidden loading='lazy' decoding='async' />
          </div>

          <div className='mb-reviews__head'>
            <h2>{renderTitle()}</h2>
            <p>{t('MB_REVIEWS_SUBTITLE')}</p>
          </div>

          <div className='mb-reviews__grid'>
            {REVIEWS.map((r) => (
              <div
                key={r.tagKey}
                className={r.dark ? 'mb-rcard mb-rcard--dark' : 'mb-rcard'}
              >
                {stars('mb-stars')}
                <span className='mb-rtag'>{t(r.tagKey)}</span>
                <p className='mb-rquote'>{t(r.quoteKey)}</p>
                <div className='mb-rauthor'>
                  <div className='mb-ravatar' style={{ background: r.avatarBg }}>
                    <img src={asset(r.avatarImg)} alt='' aria-hidden loading='lazy' decoding='async' />
                  </div>
                  <div>
                    <div className='mb-nm'>{t(r.nameKey)}</div>
                    <div className='mb-cn'>{t(r.countryKey)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <LandingCtaButton />
        </section>
      </div>

      <div className='mb-m'>
        <section className='mb-reviews-m'>
          <div className='mb-reviews-m__sphere'>
            <img src={asset('reviews-sphere.webp')} alt='' aria-hidden loading='lazy' decoding='async' />
          </div>

          <div className='mb-reviews-m__head'>
            <h2>{renderTitle()}</h2>
            <p>{t('MB_REVIEWS_SUBTITLE')}</p>
          </div>

          <div className='mb-rcar'>
            <div className='mb-rcar__stage'>
              <div className='mb-rcar__viewport'>
                <div
                  className={c.dragging ? 'mb-rcar__track is-drag' : 'mb-rcar__track'}
                  style={c.trackStyle}
                  {...c.trackProps}
                >
                  {renderMobileCard(REVIEWS[REVIEWS.length - 1], 'clone-last', true)}
                  {REVIEWS.map((r) => renderMobileCard(r, r.tagKey))}
                  {renderMobileCard(REVIEWS[0], 'clone-first', true)}
                </div>
              </div>

              <button
                type='button'
                className='mb-rcar__arrow mb-rcar__arrow--prev'
                aria-label={t('MB_REVIEW_PREV')}
                onClick={() => c.prev()}
              >
                <ArrowIconLarge />
              </button>
              <button
                type='button'
                className='mb-rcar__arrow mb-rcar__arrow--next'
                aria-label={t('MB_REVIEW_NEXT')}
                onClick={() => c.next()}
              >
                <ArrowIconLarge />
              </button>
            </div>

            <div className='mb-rcar__dots'>
              {REVIEWS.map((r, i) => (
                <button
                  key={r.tagKey}
                  type='button'
                  className={c.index === i ? 'mb-rcar__dot is-active' : 'mb-rcar__dot'}
                  aria-label={`${t('MB_REVIEW_LABEL')} ${i + 1}`}
                  aria-pressed={c.index === i}
                  onClick={() => c.go(i)}
                />
              ))}
            </div>
          </div>

          <LandingCtaButton />
        </section>
      </div>
    </>
  );
}
