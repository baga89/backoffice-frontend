import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Spinner } from 'react-bootstrap';

export const UserForm = ({ defaultValues, submitLoading, onSubmit, location }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues ? defaultValues : {},
  });

  return (
    <Form className='user-form w-50' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form.Group className='mb-3' controlId='firstName'>
        <Form.Label>Ime</Form.Label>
        <Form.Control
          type='text'
          {...register('firstName', {
            required: 'Ime korisnika je obvezno.',
          })}
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3' controlId='lastName'>
        <Form.Label>Prezime</Form.Label>
        <Form.Control
          type='text'
          {...register('lastName', {
            required: 'Prezime korisnika je obvezno.',
          })}
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3' controlId='email'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='text'
          {...register('email', { required: 'Email korisnika je obvezan.' })}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      {location === '/users/new' ? (
        <>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              type='password'
              {...register('password', { required: 'Lozinka korisnika je obvezna.' })}
              isInvalid={!!errors.password}
              autoComplete='new-password'
            />
            <Form.Control.Feedback type='invalid'>{errors.password?.message}</Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit' disabled={submitLoading}>
            {submitLoading ? <Spinner animation='border' size='sm' /> : 'Dodaj'}
          </Button>
        </>
      ) : (
        <>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Nova Lozinka</Form.Label>
            <Form.Control type='password' {...register('password')} autoComplete='new-password' />
          </Form.Group>
          <Button variant='primary' type='submit' disabled={submitLoading}>
            {submitLoading ? <Spinner animation='border' size='sm' /> : 'Spremi'}
          </Button>
        </>
      )}
    </Form>
  );
};
