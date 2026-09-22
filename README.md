# Лендінг товару — інструкція для верстки

Як зверстати лендінг товару для сайту ksisters так, щоб ми вставили його в проєкт без правок. У пісочниці (`sandbox/`) лежить приклад готового лендінгу; там само ви запускаєте свій.

> **Перед стартом** напишіть нам, що з п. 7 є у вашому макеті, і дочекайтеся відповіді.

---

## 1. Контекст

- Лендінг — не окрема сторінка, а блок на сторінці товару: під блоком товару (фото, ціна, кнопка «В кошик») і над рекомендаціями та відгуками. Шапку, футер, кошик і ціну ви не робите.
- Сайт — React 18 + TypeScript + SCSS із серверним рендером (SSR). Лендінг — React-компонент в окремій папці.
- Сайт працює 23 мовами: текстів у коді немає, лише ключі (п. 5).
- Картинки лежать на нашому CDN, а не в коді (п. 6).

---

## 2. Пісочниця

```
landing-kit/
├── README.md
└── sandbox/
    ├── src/copy.ts                              тексти
    └── src/common/widgets/landings/
        └── MedicubeBoosterLandingWidget/        приклад
```

Потрібен Node.js 18+ та інтернет (картинки прикладу вантажаться з CDN).

```bash
cd sandbox
npm install
npm run dev
```

Відкрийте адресу з консолі (зазвичай http://localhost:5173).

### Команди

| Команда | Що робить |
|---|---|
| `npm run dev` | локальний сервер |
| `npm run typecheck` | перевірка TypeScript — 0 помилок |
| `npm run build` | typecheck + збірка |
| `npm run check:keys -- src/common/widgets/landings/<Назва>LandingWidget AT` | звіряє ключі `AT_*` у коді з `src/copy.ts` (`AT` — ваш префікс); успіх — рівно `OK: keys match` |
| `npm run check:text -- src/common/widgets/landings/<Назва>LandingWidget` | шукає текст прямо в JSX (приблизно — код перегляньте й очима) |

### Свій лендінг

1. Створіть папку поруч із прикладом: `sandbox/src/common/widgets/landings/<Назва>LandingWidget/`.
2. У `sandbox/src/main.tsx` замініть імпорт на `import Landing from 'common/widgets/landings/<Назва>LandingWidget';`.
3. Видаліть із `sandbox/src/copy.ts` ключі прикладу (`MB_*`, `PL_*`, `PIL_*`) і пишіть свої. Приклад після цього показуватиме ключі замість текстів — це нормально.
4. Картинки покладіть у `sandbox/public/assets/` (п. 6).

Приклад і решту `sandbox/src/common/` не змінюйте й нічого туди не додавайте — це заглушки нашого коду. Усе, що потрібно лендінгу, — лише в його папці.

### Чим пісочниця відрізняється від сайту

| Пісочниця | Сайт |
|---|---|
| `t('KEY')` читає `src/copy.ts` | читає переклад обраної мови |
| `{{country}}`, `{{currency}}`, `{{year}}` не підставляються | підставляються |
| «В кошик» лише показує «✓» | додає товар або прокручує до вибору варіанта |
| посилання на товар — звичайний `<a>` | навігація сайту з мовним префіксом |
| `ArrowIconLarge` — інлайн-SVG | спрайт через `<use>`: стилізуйте лише `color` і розміри `svg`, не `path` |
| немає SSR | є SSR — див. п. 7 |

---

## 3. Папка лендінгу

**Назва** — `<Назва>LandingWidget` у PascalCase, за товаром: `AnuaTonerLandingWidget`.

**Префікс** — 2–4 латинські літери за назвою товару (Anua Toner → `at`), один на все: класи `at-`, змінні `--at-`, SCSS-функції, ключі `AT_`. Зайняті: `mb`, `pl`, `pil`, `plw`, `product`.

```
<Назва>LandingWidget/
├── index.tsx              корінь: обгортка перекладів + секції
├── index.scss             контейнер, токени, спільні класи, перемикач, скидання
├── cdn.ts                 asset('file.webp') → адреса картинки
├── sections/
│   ├── index.ts           реекспорт секцій
│   ├── sections.scss      @import усіх _*.scss
│   ├── HeroSection.tsx    одна секція = .tsx + _*.scss
│   └── _hero.scss
├── components/            LandingCtaButton.tsx, слайдер тощо
└── hooks/                 хуки інтерактиву
```

З прикладу візьміть `index.tsx`, `index.scss`, `cdn.ts`, `components/LandingCtaButton.tsx` і замініть префікс `mb` на свій: у `index.tsx` (класи, `data-qa`), `index.scss` (класи, `--mb-*`, `$mb-fluid-bump`, `mb-fluid()`), `components/` і всіх `sections/`. Команда нижче не має нічого знайти:

```bash
grep -rniE "(^|[^a-z0-9])mb[-_]" <Назва>LandingWidget
```

### `index.tsx`

```tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { useProductContext } from 'common/pages/ProductPage/stores';
import { LandingChunkTranslations } from '@widgets/landings/LandingChunkTranslations';
import LandingsTranslations from '@widgets/landings/translations';
import { HeroSection, BenefitsSection } from './sections';
import './index.scss';

type Props = {
  className?: string;
};

function AnuaTonerLandingWidget({ className }: Props) {
  const { productStore } = useProductContext();
  const alias = productStore.currentProduct?.alias;

  if (!alias) {
    return null;
  }

  return (
    <LandingChunkTranslations Lib={LandingsTranslations} partition='landings'>
      <div
        className={classNames('at-landing', className)}
        data-qa='anua-toner-landing-widget'
        data-product-alias={alias}
      >
        <div className='at-landing__stage'>
          <HeroSection />
          <BenefitsSection />
        </div>
      </div>
    </LandingChunkTranslations>
  );
}

export default observer(AnuaTonerLandingWidget);
```

- `data-qa` — назва папки в kebab-case.
- `LandingChunkTranslations`, `useProductContext`, `observer`, `export default` не змінюйте.
- Розділ перекладів — завжди `'landings'`, тут і в секціях.

### Секція

```tsx
import React from 'react';
import { useTranslationOnPage } from '@translate';
import { asset } from '../cdn';

export function BenefitsSection() {
  const t = useTranslationOnPage('landings');

  return (
    <section>
      <div className='at-d'>
        <div className='at-benefits'>
          <h2 className='at-benefits__title'>{t('AT_BENEFITS_TITLE')}</h2>
          <img src={asset('benefits-device.webp')} alt='' aria-hidden='true' loading='lazy' decoding='async' />
        </div>
      </div>

      <div className='at-m'>
        <div className='at-benefits-m'>
          <h2 className='at-benefits-m__title'>{t('AT_BENEFITS_TITLE')}</h2>
        </div>
      </div>
    </section>
  );
}
```

`import React from 'react'` — у кожному `.tsx`. Заголовки секцій — `h2`.

### Імпорти

Шляхи — точно як у прикладі (`@translate`, `@widgets/...`, `common/...`). З нашого коду можна брати лише:

- те, що імпортують `index.tsx` і `LandingCtaButton.tsx` прикладу;
- `import ArrowIconLarge from '@components/_icons/ArrowIconLarge';`;
- `Link` і `createProductUrl` — імпорти з `HeroSection.tsx` дослівно.

Інші елементи «як на сайті» (зірочки, хрестик) робіть у своїй папці як SVG.

---

## 4. Верстка

### 4.1 Контейнер і точка перемикання

- Корінь — як `.mb-landing` у прикладі: `max-width: 85rem; width: 100%; margin: 24px auto; background: #fff; overflow-x: clip;`; на мобільному ще `padding-left/right: 1.25rem; margin: 8px auto 16px;`.
- Кореневий шрифт сайту 15px, тож колонка — до 1275px.
- Точка перемикання одна — 700px: `@media (max-width: 43.74875em) { … }` — мобільний. Десктоп тягнеться від 700 до 1275px, мобільний — від 320 до 699px. Інших не додавайте.

### 4.2 Дві композиції

Кожна секція рендерить і десктопну, і мобільну розмітку; CSS показує одну:

```scss
.at-landing .at-d { display: block; }
.at-landing .at-m { display: none; }
@media (max-width: 43.74875em) {
  .at-landing .at-d { display: none; }
  .at-landing .at-m { display: block; }
  .at-landing .at-cta { display: none; }
}
```

- `.at-d`/`.at-m` — окрема «гола» обгортка, інакше вона переб'є `display: flex` кореня секції:
  ```tsx
  <div className='at-d'><div className='at-hero'>…</div></div>   // ✅
  <div className='at-d at-hero'>…</div>                           // ❌
  ```
- Композиції перемикає лише CSS, не JS (`window.innerWidth`).
- Класи розмітки й розмірів у композицій свої (`.at-hero` / `.at-hero-m`); допоміжні класи з `index.scss` (кнопка, градієнт тексту) — можна в обох.

### 4.3 Десктоп: `cqi`

Корінь має обгортку-«сцену» з `container-type: inline-size` (`.mb-landing__stage`); усі десктопні розміри — у `cqi` (100cqi = ширина колонки).

- Макет 1200px: **`cqi = px / 12`** (48px → `4cqi`). Макет ширини W — `px / (W / 100)`: 1440 → `px / 14.4`. Ширина макета одна на весь лендінг; вкажіть її в `NOTES.md`.
- Шрифт: `clamp(<≈60% від px, не менше 12px>, <px/12>cqi, <px>)`, наприклад `clamp(18px, 2.5cqi, 30px)`.
- Висота секцій і блоків із текстом — `min-height`, не `height` (картинкам і декору можна `height`).
- Без `transform: scale()`, JS-скейлерів і вимірювань ширини скриптом.
- `cqi` рахується від найближчого контейнера: усередині елемента з власним `container-type` (слайдер «до/після» у прикладі) `px / 12` не діє. Не додавайте `container-type` без потреби.

### 4.4 Мобільний

Без `cqi`: ширини — `%` і flex, розміри — з мобільного макета (375–390px), відступи — `px` або `clamp()`. Шрифти — через копію функції з прикладу:

```scss
$at-fluid-bump: 1;
@function at-fluid($s) {
  $s: $s * $at-fluid-bump;
  @return clamp(#{$s}px, calc(#{$s * 0.46}px + #{$s * 0.12}vw), #{$s * 1.3}px);
}
```

- До 450px — розмір із макета, до 700px шрифт плавно росте на +30%.
- `$at-fluid-bump` — `1` (у прикладі `1.20` — окреме побажання для того товару).
- Дрібні елементи керування — звичайний `clamp()`, без функції.
- Бічний відступ дає лише корінь (1.25rem); секції свого не додають, крім внутрішнього 15–16px у кольорових картках.
- Від 320px нічого не обрізається, горизонтального скролу немає.

### 4.5 Шрифти

- Лише Gilroy 400, 500, 600 через `var(--at-font)`.
- 700 і жирніше немає; `<strong>`/`<b>` сайт робить 700 — замість них `<span>` із `font-weight: 600`.
- Інші шрифти, `@font-face`, `@import url()` — ні. Інший шрифт у макеті — скажіть нам.

### 4.6 Стилі

- Кожен клас — із префікса, BEM-подібно: `.at-hero`, `.at-hero__title`, `--mod`, `is-state`. Класи й змінні `mb-*` прикладу — лише як основа під своїм префіксом.
- Повторювані кольори — змінні на корені (`.at-landing { --at-accent: … }`), не на `:root`; разові — hex у секції.
- Без селекторів без префікса (`body`, `img`, `h1`, `*`…), без `id`, без `!important` (крім блоку reduced-motion із прикладу).

У лендінг «протікають» глобальні стилі сайту (пісочниця їх відтворює): `img { max-width: 100%; height: auto }`; розміри, вага 500 і відступи `h1–h6`; `p { margin-bottom }`; маркери й відступи `ul/ol`; `a { color: #000 }` разом із `:hover`/`:focus`; `button { padding: 0; border: 0; background: transparent }`; `strong`/`b` — 700; `:focus { outline: none }`.

- Блок скидання з `index.scss` прикладу (`box-sizing`, `img { max-width: none }`, `h1–h4, p { margin: 0 }`) скопіюйте на те саме місце — одразу після `@import './sections/sections.scss'`.
- Решту закривайте в секціях: спискам `list-style: none; margin: 0; padding: 0`; посиланням — колір і для `:hover`/`:focus`; кнопкам — `padding`, `border`, `background`, `line-height`, `cursor: pointer`; кожному тексту — `font-size` і `line-height`.
- Секційні стилі підключаються раніше за скидання з тією самою специфічністю, тож `.at-card h3 { margin-bottom: 8px }` не спрацює. Пишіть двома класами: `.at-card .at-card__txt h3 { … }`.
- `@import '../../../settings';` на початку `index.scss` залиште; звідти — лише `$body-font-family`.

### 4.7 Довгі тексти

Німецькою, фінською, угорською, грецькою тексти в 1,5–2 рази довші.

- Блокам із текстом — `min-height`, не `height`; кнопкам і бейджам — запас за шириною.
- `overflow-wrap: anywhere` — лише там, де обрізання неприпустиме: кнопки, бейджі, вузькі картки (для `h1–h4`, `p` — двома класами).
- Перевірка: подвойте тексти в `copy.ts`.

### 4.8 Кнопка «В кошик»

- `components/LandingCtaButton.tsx` із прикладу: у компоненті змінюється лише клас `mb-cta` → `at-cta`.
- Вигляд підганяйте під макет; варіанти — через проп: `<LandingCtaButton className='at-cta--light' />`.
- Не змінюйте логіку (`useLandingBuyAction`, `is-added`), `:focus-visible` і приховування на мобільному (п. 4.2). Своїх кнопок купівлі не робіть.

### 4.9 Доступність та інтерактив

- Декоративні картинки: `alt=''` + `aria-hidden='true'`; змістовні — `alt` із `t()` або назва товару.
- Клікабельне — `<button type='button'>`. Інший товар — `<Link to={createProductUrl('<alias>')}>`, не `<a href>`; alias — кінець адреси `…/product/<alias>`.
- Кожній кнопці й посиланню — `:focus-visible`. Усе керується з клавіатури (Tab, Enter); слайдер «до/після» — ще й ←/→.
- Блок `prefers-reduced-motion` із прикладу скопіюйте. Іконки — SVG, не емодзі.
- Слайдери, каруселі, вкладки — самі на React + CSS, як `BeforeAfterSlider.tsx` і `useReviewsCarousel.ts`; `touch-action: none` на слайдері й `pan-y` на доріжці каруселі залиште.

### 4.10 Код

2 пробіли, одинарні лапки, крапка з комою, рядок до 120 символів. TypeScript 5, строгий режим, типи реекспортуйте через `export type`. SCSS — `@import`, не `@use`. Коментарі — лише де без них незрозуміло.

---

## 5. Тексти: `copy.ts`

Усе, що бачить чи чує користувач, — заголовки, підписи, `alt`, `aria-label` — через `t('КЛЮЧ')`. Виняток — назви бренду, товару, режимів пристрою, однакові всіма мовами. Ключ без значення показується на екрані як є.

**Ключі**

- `ПРЕФІКС_СЕКЦІЯ_ЩО[_НОМЕР]` — великі латинські літери, цифри, `_`: `AT_HERO_TITLE`, `AT_BENEFIT_1_DESC`.
- У `t()` — лише повний ключ; не збирайте його з частин (`` t(`AT_BENEFIT_${n}_TITLE`) ``). Списки — масив із повними ключами:
  ```tsx
  const BENEFITS = [
    { title: 'AT_BENEFIT_1_TITLE', desc: 'AT_BENEFIT_1_DESC' },
    { title: 'AT_BENEFIT_2_TITLE', desc: 'AT_BENEFIT_2_DESC' },
  ] as const;
  ```
- Один ключ — один напис: підпис і значення («Гарантія» / «2 роки») — два ключі, не один через `\n`. Однаковий текст у двох місцях — один ключ.
- Підпис кнопки «В кошик» не дублюйте — вона бере його сама.

**Значення**

- Лише текст, без HTML.
- Перенос — `\n` + `white-space: pre-line` на елементі. Пробіли по краях обрізаються.
- Підстановки: `{{country}}`, `{{currency}}`, `{{year}}`; інших немає.
- Виділити частину фрази: окремі ключі (`AT_HERO_TITLE_1` + `AT_HERO_TITLE_ACCENT` + `AT_HERO_TITLE_2`) або пошук назви товару в рядку, як `renderTitle()` у `HeroSection.tsx`, — із запасним варіантом без виділення.
- Одна мова на весь файл — мова макета (англійська або українська).

**Формат** — точно такий: ключі за абеткою, одинарні лапки, апостроф — `\'`.

```ts
const translations: Record<string, string> = {
  AT_BENEFIT_1_TITLE: 'Hydration',
  AT_HERO_DESC: 'Line one\nLine two',
  AT_HERO_TITLE: 'Toner that respects your skin',
};

export default translations;
```

---

## 6. Картинки: `assets/`

- Плоска папка `assets/`; у коді — лише `asset('назва')`. Нічого не імпортуйте, у папку лендінгу не кладіть, `url()` у SCSS не пишіть.
- Назви: `<секція>-<що>[-номер].<розширення>`, малими латинськими, через дефіс: `hero-device.webp`, `benefits-icon-1.svg`. Мобільний варіант — `-m` (`hero-device-m.webp`), лише якщо на мобільному інше зображення чи кадрування.
- Фото — webp (якість ~80); декор — оптимізований svg без вбудованих растрів (`<image>`, base64); png — лише для прозорості, якщо webp не підходить.
- Розмір фото — удвічі більший за найбільший на екрані (десктоп — у колонці 1275px, мобільний — на ширині 699px); на всю колонку — 2550px.
- Вага: фото до 300 KB, svg до 100 KB, усе разом до 3 MB. Один набір на всі мови.
- **Без тексту на картинках** — крім надрукованого на товарі чи упаковці.
- Кожній картинці чи обгортці — явні розміри в CSS (скидання ставить `max-width: none`).

```tsx
<img src={asset('hero-device.webp')} alt='Anua Toner' loading='eager' decoding='async' />   // головне фото першої секції
<img src={asset('hero-wave.svg')} alt='' aria-hidden='true' loading='lazy' decoding='async' /> // решта
<div className='at-ba__bg' style={{ backgroundImage: `url(${asset('ba-pattern.svg')})` }} aria-hidden='true' />
```

У `cdn.ts` змініть один рядок і так і здавайте — картинки тоді беруться з `sandbox/public/assets/`:

```ts
export const ASSETS_BASE = '/assets';
```

---

## 7. Обмеження

Сайт рендериться на сервері, тому:

- `window`, `document`, `navigator`, `localStorage`, `matchMedia` — лише в `useEffect` чи обробниках подій, ніколи під час рендеру чи на рівні модуля. Пісочниця без SSR такої помилки не покаже.
- Без `Date.now()`, `Math.random()`, перевірок ширини під час рендеру; початковий стан сталий (слайдер на 50%, перший слайд).
- Хуки — до будь-якого `return null`.

Також без нових npm-пакетів (лише `react`, `classnames`, `mobx-react-lite`), `fetch`, cookies, аналітики, `<script>`, `<iframe>`, роутингу, base64 і великих інлайн-SVG (маленькі гліфи, як `PackageGlyph`, можна).

**Спершу спитайте нас**, якщо в макеті є:

- відео чи GIF;
- форма, підписка, промокод, чат;
- таймер чи зворотний відлік;
- карта, YouTube, соцмережі, будь-який embed;
- посилання на категорію, блог, акцію;
- секція, що повторює блок сайту: відгуки покупців із сайту, «схожі товари», FAQ. Власні картки-відгуки через `t()`, як `ReviewsSection` у прикладі, — можна.

Посилання на зовнішній сайт — `<a href='https://…' target='_blank' rel='noopener noreferrer'>` із текстом через `t()`.

---

## 8. Що в прикладі не копіювати

- `mb-d mb-ba` на одному елементі (`BeforeAfterSection.tsx`) — п. 4.2.
- `height` на блоках із текстом: `.mb-hero`, `.mb-tcard`, `.mb-ba__bcard` — п. 4.3, 4.7.
- `HeadlineSection`: одна композиція, розміри на `vw`, власний бічний відступ; бічний відступ і в `.mb-tgrid` — п. 4.2–4.4.
- `$mb-fluid-bump: 1.20` — п. 4.4.
- `font-weight: 700` у `_guarantee`, `_ritual`, `_schedule` — п. 4.5.
- Ключі іншого лендінгу `PL_SKIN_BEFORE`/`PL_SKIN_AFTER`; ключ із частин `` `MB_BENEFIT_${n}_TITLE` ``; два написи в `MB_HERO_SPEC_*` через `\n`; англійські `pink`/`black` в `aria-label` (`HeroSection.tsx`); підкреслення «двох останніх слів» заголовка (`RitualSection.tsx`, `ReviewsSection.tsx`) — п. 5.
- `pattern-desktop.svg`, `pattern-mobile.svg` без назви секції — п. 6.
- `<img>` без `loading`/`decoding` — п. 6; `aria-hidden` без значення, емодзі-іконки, слайдер без стрілок — п. 4.9.

---

## 9. Здача

Zip-архів або доступ на читання до git-репозиторію:

```
<Назва>LandingWidget/    код; у cdn.ts — ASSETS_BASE = '/assets'
copy.ts                  лише ваші ключі (sandbox/src/copy.ts)
assets/                  картинки (sandbox/public/assets/)
NOTES.md                 префікс; ширина десктопного й мобільного макета; секції;
                         інтерактив і керування з клавіатури; що не зверстано і чому; відхилення від макета
screenshots/             уся сторінка: 1440px і 390px
```

**Відповідність Figma.** Десктоп — на вікні, де колонка дорівнює ширині макета (макет ширший за 1275px — на колонці 1275px, у масштабі 1275/W); мобільний — на ширині мобільного фрейму. На інших ширинах нічого не ламається, не обрізається, не накладається. Папка має працювати в проєкті без правок.

### Чекліст

- [ ] `npm run typecheck` і `npm run build` без помилок.
- [ ] У `copy.ts` лише ваші ключі; `check:keys` — рівно `OK: keys match`.
- [ ] `check:text` — нічого, крім назв бренду й товару; `.tsx` переглянуто очима.
- [ ] `grep` із п. 3 нічого не знаходить.
- [ ] 320, 360, 390, 430, 699, 700, 900, 1024, 1280, 1440, 1920: без горизонтального скролу, обрізань, накладань.
- [ ] Обидві композиції в кожній секції; перемикач — гола обгортка.
- [ ] Тексти ×2 не ламають макет.
- [ ] Лише Gilroy 400–600, `$at-fluid-bump: 1`, без `<strong>`/`<b>`.
- [ ] Селектори лише з префіксом; `!important` лише в reduced-motion.
- [ ] Немає `window`/`navigator` поза `useEffect`, `fetch`, нових пакетів (п. 7).
- [ ] Картинки за п. 6; `cdn.ts` — з `'/assets'`.
- [ ] Клавіатура й фокус працюють; у кожної картинки є `alt` чи `aria-hidden`.
