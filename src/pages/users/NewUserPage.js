import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { addUser } from '../../services/userService';
import { UserForm } from './UserForm';

const NewUserPage = (props) => {
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    setSubmitLoading(true);
    setError(null);
    try {
      const user = await addUser({ firstName, lastName, email, password });
      props.history.push('/users');
      toast.success(`Korisnik ${user.firstName} je uspješno dodan.`);
    } catch (error) {
      error.response && setError(error.response.data);
      console.log(error.response);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className='fav-container'>
      <Button onClick={props.history.goBack} variant='light' className='mb-4'>
        <ArrowLeftShort className='me-2' size={24} />
        Idi nazad
      </Button>
      <h2 className='mb-4 text-primary'>Dodaj novog korisnika</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <UserForm onSubmit={onSubmit} submitLoading={submitLoading} location={props.location.pathname} />
    </div>
  );
};

export default NewUserPage;
