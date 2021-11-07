import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Spinner } from 'react-bootstrap';

export const PasswordForm = ({ onSubmit, submitLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form className='password-form w-75' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form.Group className='mb-3' controlId='currentPassword'>
        <Form.Label>Trenutna lozinka</Form.Label>
        <Form.Control
          type='password'
          {...register('currentPassword', {
            required: 'Trenutna lozinka je obvezna.',
          })}
          isInvalid={!!errors.currentPassword}
          autoComplete='new-password'
        />
        <Form.Control.Feedback type='invalid'>{errors.currentPassword?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3' controlId='newPassword'>
        <Form.Label>Nova lozinka</Form.Label>
        <Form.Control
          type='password'
          {...register('newPassword', {
            required: 'Nova lozinka je obvezna.',
          })}
          isInvalid={!!errors.newPassword}
          autoComplete='new-password'
        />
        <Form.Control.Feedback type='invalid'>{errors.newPassword?.message}</Form.Control.Feedback>
      </Form.Group>
      <Button variant='primary' type='submit' disabled={submitLoading}>
        {submitLoading ? <Spinner animation='border' size='sm' /> : 'Spremi'}
      </Button>
    </Form>
  );
};
