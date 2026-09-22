import React from 'react';
import { useTranslationOnPage } from '@translate';

export function HeadlineSection() {
  const t = useTranslationOnPage('landings');

  return (
    <section className="mb-headline">
      <span className="mb-headline__eyebrow">{t('MB_HEADLINE_EYEBROW')}</span>
      <h2 className="mb-headline__title">{t('MB_HEADLINE_TITLE')}</h2>
    </section>
  );
}
