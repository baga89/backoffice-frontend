import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router';

import { addOffice } from '../../services/officeService';
import { OfficeForm } from './OfficeForm';

const NewOfficePage = (props) => {
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmit = async ({ number, locationTag, place, street }) => {
    setSubmitLoading(true);
    try {
      const office = await addOffice({ number, locationTag, place, street });
      props.history.push('/offices');
      toast.success(`Poslovnica ${office.number} je uspješno dodana.`);
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
      <h2 className='mb-4 text-primary'>Dodaj novu poslovnicu</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <OfficeForm onSubmit={onSubmit} submitLoading={submitLoading} />
    </div>
  );
};

export default NewOfficePage;
