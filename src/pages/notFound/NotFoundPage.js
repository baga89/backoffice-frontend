import React from 'react';
import './style.css';

const NotFoundPage = () => {
  return (
    <section className='not-found'>
      <div className='not-found__wrapper shadow'>
        <img alt='Favbet backoffice' src='/images/logo__primary.svg' className='login__img' />
        <h1>Stranica nije pronađena!</h1>
      </div>
    </section>
  );
};

export default NotFoundPage;
