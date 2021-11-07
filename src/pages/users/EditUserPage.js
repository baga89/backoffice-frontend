import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { getUser, updateUser } from '../../services/userService';
import { UserForm } from './UserForm';
import Spinner from '../../components/common/Spinner';

const EditUserPage = (props) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  let { id: userID } = props.match.params;

  const fetchUser = async (userID) => {
    setLoading(true);
    try {
      const user = await getUser(userID);
      setUser(user);
    } catch (error) {
      error.response && setError(error.response.data);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(userID);
  }, [userID]);

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    setSubmitLoading(true);
    setError(null);
    try {
      const updatedUser = await updateUser(userID, {
        firstName,
        lastName,
        email,
        password: password ? password : undefined,
      });
      setUser(updatedUser);
      toast.success(`Korisnik ${updatedUser.firstName} je uspješno ažuriran.`);
    } catch (error) {
      error.response && setError(error.response.data);
      console.log(error.response);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className='fav-container'>
      <Button onClick={props.history.goBack} variant='light' className='mb-4'>
        <ArrowLeftShort className='me-2' size={24} />
        Idi nazad
      </Button>
      <h2 className='mb-4 text-primary'>Uredi korisnika {user && user.firstName}</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <UserForm
        defaultValues={user}
        onSubmit={onSubmit}
        submitLoading={submitLoading}
        location={props.location.pathname}
      />
    </div>
  );
};

export default EditUserPage;
