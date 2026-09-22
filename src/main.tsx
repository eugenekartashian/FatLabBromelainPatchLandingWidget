import React from 'react';
import { createRoot } from 'react-dom/client';
import Landing from 'common/widgets/landings/FatLabBromelainPatchLandingWidget';
import './page.scss';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='page'>
      <div className='page__product'>Тут на сайті стоїть блок товару: фото, ціна, кнопка «В кошик»</div>
      <Landing />
      <div className='page__product'>Тут на сайті йдуть рекомендації та відгуки</div>
    </div>
  </React.StrictMode>,
);
