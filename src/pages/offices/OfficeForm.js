import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Spinner } from 'react-bootstrap';

export const OfficeForm = ({ defaultValues, submitLoading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues ? defaultValues : {},
  });

  return (
    <Form className='office__form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form.Group className='mb-3' controlId='number'>
        <Form.Label>Broj poslovnice</Form.Label>
        <Form.Control
          type='text'
          {...register('number', { required: 'Broj poslovnice je obvezan.' })}
          isInvalid={!!errors.number}
          disabled={defaultValues}
        />
        <Form.Control.Feedback type='invalid'>{errors.number?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3' controlId='place'>
        <Form.Label>Oznaka lokacije</Form.Label>
        <Form.Control
          type='text'
          {...register('locationTag', {
            required: 'Oznaka lokacije je obvezna.',
          })}
          isInvalid={!!errors.locationTag}
        />
        <Form.Control.Feedback type='invalid'>{errors.locationTag?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3' controlId='place'>
        <Form.Label>Mjesto</Form.Label>
        <Form.Control
          type='text'
          {...register('place', {
            required: 'Mjesto poslovnice je obvezno.',
          })}
          isInvalid={!!errors.place}
        />
        <Form.Control.Feedback type='invalid'>{errors.place?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3' controlId='place'>
        <Form.Label>Ulica</Form.Label>
        <Form.Control
          type='text'
          {...register('street', {
            required: 'Ulica je obvezna.',
          })}
          isInvalid={!!errors.street}
        />
        <Form.Control.Feedback type='invalid'>{errors.street?.message}</Form.Control.Feedback>
      </Form.Group>
      <Button variant='primary' type='submit' className='login__btn' disabled={submitLoading}>
        {submitLoading ? <Spinner animation='border' size='sm' /> : 'Dodaj'}
      </Button>
    </Form>
  );
};
