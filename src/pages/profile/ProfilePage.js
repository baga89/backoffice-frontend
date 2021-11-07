import React, { useState } from 'react';
import { Accordion, Alert, Button, Container, Row, Col } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { useAuth } from '../../services/useAuth';
import { ProfileForm } from './ProfileForm';
import { PasswordForm } from './PasswordForm';
import Spinner from '../../components/common/Spinner';

const ProfilePage = (props) => {
  const [submitError, setSubmitError] = useState(null);
  const [submitProfileLoading, setSubmitProfileLoading] = useState(false);
  const [submitPasswordLoading, setSubmitPasswordLoading] = useState(false);

  const { loading, error, user, updateUser, updatePassword } = useAuth();

  const onSubmitProfile = async ({ firstName, lastName, email }) => {
    setSubmitProfileLoading(true);
    setSubmitError(null);
    try {
      const updatedUser = await updateUser(firstName, lastName, email);
      toast.success(`Korisnik ${updatedUser.firstName} je uspješno ažuriran.`);
    } catch (error) {
      error.response && setSubmitError(error.response.data);
      console.log(error.response);
    } finally {
      setSubmitProfileLoading(false);
    }
  };

  const onSubmitPassword = async ({ currentPassword, newPassword }) => {
    setSubmitPasswordLoading(true);
    setSubmitError(null);
    try {
      await updatePassword(currentPassword, newPassword);
      toast.success(`Lozinka je uspješno ažurirana.`);
    } catch (error) {
      error.response && setSubmitError(error.response.data);
      console.log(error.response);
    } finally {
      setSubmitPasswordLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <Container fluid>
      <Button onClick={props.history.goBack} variant='light' className='mb-5'>
        <ArrowLeftShort className='me-2' size={24} />
        Idi nazad
      </Button>
      {error && (
        <Alert variant='danger' className='w-50'>
          Nije moguće učitati podatke od korisnika.
        </Alert>
      )}
      {submitError && (
        <Alert variant='danger' className='w-50'>
          {submitError}
        </Alert>
      )}
      <Accordion defaultActiveKey='0' className='w-50'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Moj profil</Accordion.Header>
          <Accordion.Body>
            {user && (
              <ProfileForm defaultValues={user} onSubmit={onSubmitProfile} submitLoading={submitProfileLoading} />
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Promijeni lozinku</Accordion.Header>
          <Accordion.Body>
            <PasswordForm onSubmit={onSubmitPassword} submitLoading={submitPasswordLoading} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default ProfilePage;
