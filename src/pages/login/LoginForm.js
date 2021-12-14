import React, { useState } from 'react';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../services/useAuth';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await auth.login(email, password);
      toast('Dobro došli u Backoffice aplikaciju.');
    } catch (error) {
      error.response && setError(error.response.data);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert variant='danger'>{error}</Alert>}

      <Form className='login__form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Upiši svoj email'
            {...register('email', {
              required: 'Email je obvezan.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Unesite ispravnu email adresu.',
              },
            })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Lozinka</Form.Label>
          <Form.Control
            type='password'
            placeholder='Lozinka'
            {...register('password', { required: 'Lozinka je obvezna.' })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type='invalid'>{errors.password?.message}</Form.Control.Feedback>
        </Form.Group>
        <Button variant='primary' type='submit' className='login__btn'>
          {loading ? <Spinner animation='border' size='sm' /> : 'Prijavi se'}
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
