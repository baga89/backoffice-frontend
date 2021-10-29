import React from 'react';
import { Redirect } from 'react-router';

import { useAuth } from '../../services/useAuth';
import LoginForm from './LoginForm';
import './style.css';

const LoginPage = () => {
  const { token } = useAuth();

  if (token) {
    return <Redirect to='/' />;
  }

  return (
    <section className='login'>
      <div className='login__wrapper shadow'>
        <img alt='Favbet backoffice' src='/images/logo__primary.svg' className='login__img' />
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
