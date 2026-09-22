import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';
import { useReveal } from '../hooks/useReveal';

function vars(images: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(images).map(([key, file]) => [`--flb-${key}`, `url(${asset(file)})`]),
  ) as React.CSSProperties;
}

const ingredients = [
  ['caffeine', 'FLB_INGREDIENTS_CAFFEINE_TITLE', 'FLB_INGREDIENTS_CAFFEINE_DESCRIPTION'],
  ['capsicum', 'FLB_INGREDIENTS_CAPSICUM_TITLE', 'FLB_INGREDIENTS_CAPSICUM_DESCRIPTION'],
  ['peptides', 'FLB_INGREDIENTS_PEPTIDES_TITLE', 'FLB_INGREDIENTS_PEPTIDES_DESCRIPTION'],
  ['green-tea', 'FLB_INGREDIENTS_GREEN_TEA_TITLE', 'FLB_INGREDIENTS_GREEN_TEA_DESCRIPTION'],
  ['bromelain', 'FLB_INGREDIENTS_BROMELAIN_TITLE', 'FLB_INGREDIENTS_BROMELAIN_DESCRIPTION'],
] as const;

function IngredientCards({ mobile = false }: { mobile?: boolean }) {
  const t = useTranslationOnPage('landings');
  const prefix = mobile ? 'flb-ingredients-m' : 'flb-ingredients';

  return (
    <div className={`${prefix}__cards`}>
      {ingredients.map(([kind, titleKey, descriptionKey]) => (
        <article className={`${prefix}__card ${prefix}__card--${kind}`} key={kind}>
          <h3>{t(titleKey)}</h3>
          <p>{t(descriptionKey)}</p>
        </article>
      ))}
    </div>
  );
}

export function IngredientsSection() {
  const t = useTranslationOnPage('landings');
  const { ref, isVisible } = useReveal<HTMLElement>();
  const revealClass = isVisible ? 'flb-ingredients-wrap flb-reveal is-visible' : 'flb-ingredients-wrap flb-reveal';

  return (
    <section ref={ref} className={revealClass}>
      <div className='flb-d'>
        <img
          className='flb-ingredients-molecule'
          data-flb-parallax='0.05'
          src={asset('ingredients-molecule.webp')}
          width={1074}
          height={1738}
          alt=''
          aria-hidden='true'
          loading='lazy'
          decoding='async'
        />
        <div className='flb-ingredients' style={vars({ roof: 'ingredients-roof.svg', hex: 'ingredients-hex.svg' })}>
          <header className='flb-ingredients__heading'>
            <h2>{t('FLB_INGREDIENTS_TITLE')}</h2>
            <p>{t('FLB_INGREDIENTS_DESCRIPTION')}</p>
          </header>
          <IngredientCards />
          <div className='flb-ingredients__art' aria-hidden='true'>
            <img
              className='flb-ingredients__pattern'
              src={asset('ingredients-pattern.webp')}
              width={2872}
              height={1578}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-ingredients__patch'
              src={asset('ingredients-graphene.webp')}
              width={1062}
              height={1068}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-ingredients__stones'
              src={asset('ingredients-stones.webp')}
              width={858}
              height={434}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-ingredients__leaf'
              data-flb-parallax='0.09'
              src={asset('ingredients-leaf.webp')}
              width={292}
              height={344}
              alt=''
              loading='lazy'
              decoding='async'
            />
          </div>
        </div>
      </div>

      <div className='flb-m'>
        <div
          className='flb-ingredients-m'
          style={vars({
            roof: 'ingredients-roof-m.svg',
            hex: 'ingredients-hex.svg',
            pattern: 'ingredients-pattern-m.webp',
          })}
        >
          <header className='flb-ingredients-m__heading'>
            <h2>{t('FLB_INGREDIENTS_TITLE')}</h2>
            <p>{t('FLB_INGREDIENTS_DESCRIPTION')}</p>
          </header>
          <IngredientCards mobile />
          <div className='flb-ingredients-m__art' aria-hidden='true'>
            <img
              className='flb-ingredients-m__patch'
              src={asset('ingredients-graphene-m.webp')}
              width={584}
              height={568}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-ingredients-m__stones'
              src={asset('ingredients-stones-m.webp')}
              width={476}
              height={232}
              alt=''
              loading='lazy'
              decoding='async'
            />
            <img
              className='flb-ingredients-m__leaf'
              data-flb-parallax='0.09'
              src={asset('ingredients-leaf-m.webp')}
              width={170}
              height={228}
              alt=''
              loading='lazy'
              decoding='async'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
