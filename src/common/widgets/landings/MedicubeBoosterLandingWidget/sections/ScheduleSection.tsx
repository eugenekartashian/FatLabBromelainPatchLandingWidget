import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslationOnPage } from '@translate';

type SchedTab = 'standard' | 'pro';

type CalEvent = { label: string; variant: string; col?: number; full?: boolean };
type CalRow = CalEvent[];

// Standard guide — 4 rows (Figma S7).
const STANDARD_CAL: CalRow[] = [
  [{ label: 'TUNE', variant: 'tune', full: true }],
  [{ label: 'PRO·BOOSTER', variant: 'booster', full: true }],
  [
    { label: 'PRO·MC', variant: 'mc', col: 1 },
    { label: 'PRO·AIR', variant: 'air', col: 2 },
    { label: 'PRO·MC', variant: 'mc', col: 3 },
    { label: 'PRO·MC', variant: 'mc', col: 5 },
    { label: 'PRO·AIR', variant: 'air', col: 6 },
    { label: 'PRO·MC', variant: 'mc', col: 7 },
  ],
  [
    { label: 'PRO·DERMA', variant: 'derma', col: 1 },
    { label: 'PRO·DERMA', variant: 'derma', col: 3 },
    { label: 'PRO·DERMA', variant: 'derma', col: 5 },
    { label: 'PRO·DERMA', variant: 'derma', col: 7 },
  ],
];

// Pro guide — 7 rows (Figma S7-2): adds a full-width Derma, a Body row, a
// full-width Line-Booster and a Line-Shot row.
const PRO_CAL: CalRow[] = [
  [{ label: 'TUNE', variant: 'tune', full: true }],
  [{ label: 'PRO·BOOSTER', variant: 'booster', full: true }],
  [
    { label: 'PRO·MC', variant: 'mc', col: 1 },
    { label: 'PRO·AIR', variant: 'air', col: 2 },
    { label: 'PRO·MC', variant: 'mc', col: 3 },
    { label: 'PRO·MC', variant: 'mc', col: 5 },
    { label: 'PRO·AIR', variant: 'air', col: 6 },
    { label: 'PRO·MC', variant: 'mc', col: 7 },
  ],
  [{ label: 'PRO·DERMA', variant: 'derma', full: true }],
  [
    { label: 'BODY', variant: 'body', col: 1 },
    { label: 'BODY', variant: 'body', col: 4 },
    { label: 'BODY', variant: 'body', col: 6 },
  ],
  [{ label: 'LINE·BOOSTER', variant: 'line-booster', full: true }],
  [
    { label: 'LINE·SHOT', variant: 'line-shot', col: 3 },
    { label: 'LINE·SHOT', variant: 'line-shot', col: 6 },
  ],
];

const CAL: Record<SchedTab, CalRow[]> = { standard: STANDARD_CAL, pro: PRO_CAL };
const SUB_KEY: Record<SchedTab, string> = {
  standard: 'MB_SCHEDULE_SUB_1',
  pro: 'MB_SCHEDULE_SUB_2',
};
const NOTE_KEY: Record<SchedTab, string> = {
  standard: 'MB_SCHEDULE_NOTE_STANDARD',
  pro: 'MB_SCHEDULE_NOTE_PRO',
};

const DAYS = [
  { key: 'MB_SCHEDULE_DAY_SUN', hl: true },
  { key: 'MB_SCHEDULE_DAY_MON', hl: false },
  { key: 'MB_SCHEDULE_DAY_TUE', hl: false },
  { key: 'MB_SCHEDULE_DAY_WED', hl: false },
  { key: 'MB_SCHEDULE_DAY_THU', hl: false },
  { key: 'MB_SCHEDULE_DAY_FRI', hl: false },
  { key: 'MB_SCHEDULE_DAY_SAT', hl: true },
];

export function ScheduleSection() {
  const t = useTranslationOnPage('landings');
  const [tab, setTab] = useState<SchedTab>('standard');

  const subLines = t(SUB_KEY[tab]).split('\n');
  const note = t(NOTE_KEY[tab]);
  const isPro = tab === 'pro';

  const renderTabs = (base: string) => (
    <div className={`${base}__tabs`}>
      <button
        type='button'
        className={classNames({ 'is-active': tab === 'standard' })}
        aria-pressed={tab === 'standard'}
        onClick={() => setTab('standard')}
      >
        {t('MB_SCHEDULE_TAB_STANDARD')}
      </button>
      <button
        type='button'
        className={classNames({ 'is-active': tab === 'pro' })}
        aria-pressed={tab === 'pro'}
        onClick={() => setTab('pro')}
      >
        {t('MB_SCHEDULE_TAB_PRO')}
      </button>
    </div>
  );

  const renderWeek = (base: string) => (
    <div className={`${base}__week`}>
      {DAYS.map((d) => (
        <span key={d.key} className={classNames({ 'is-hl': d.hl })}>
          {t(d.key)}
        </span>
      ))}
    </div>
  );

  // The calendar container animates `max-height` between the Standard and Pro
  // heights (overflow hidden). Switching tabs therefore eases the height change
  // instead of snapping it, so the content below the section never jumps.
  const renderCal = (base: string) => (
    <div className={classNames(`${base}__cal`, { 'is-pro': isPro })}>
      {CAL[tab].map((row, ri) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={`${base}__row`} key={ri}>
          {row.map((ev, ei) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={ei}
              className={classNames(`${base}__ev`, `${base}__ev--${ev.variant}`, {
                [`${base}__ev--full`]: ev.full,
              })}
              style={ev.col ? { gridColumn: ev.col } : undefined}
            >
              {ev.label}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className='mb-d'>
        <section className='mb-sched'>
          <div className='mb-sched__blur mb-sched__blur--b1' aria-hidden='true' />
          <div className='mb-sched__blur mb-sched__blur--b2' aria-hidden='true' />
          <div className='mb-sched__inner'>
            <div className='mb-sched__top'>
              <h2>{t('MB_SCHEDULE_TITLE')}</h2>
              {renderTabs('mb-sched')}
            </div>
            <div className='mb-sched__sub'>
              {subLines.map((line, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <p key={i}>{line}</p>
              ))}
            </div>
            {renderWeek('mb-sched')}
            {renderCal('mb-sched')}
            <div className='mb-sched__note'>{note}</div>
          </div>
        </section>
      </div>

      <div className='mb-m'>
        <section className='mb-sched-m'>
          <div className='mb-sched-m__top'>
            <h2>{t('MB_SCHEDULE_TITLE')}</h2>
            {renderTabs('mb-sched-m')}
          </div>
          <div className='mb-sched-m__sub'>
            {subLines.map((line, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <p key={i}>{line}</p>
            ))}
          </div>
          {renderWeek('mb-sched-m')}
          {renderCal('mb-sched-m')}
          <div className='mb-sched-m__note'>{note}</div>
        </section>
      </div>
    </>
  );
}
