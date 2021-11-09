import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

import { addBettingMachine } from '../../services/bettingMachineService';
import { BettingMachineForm } from './BettingMachineForm';

const NewBettingMachinePage = (props) => {
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmit = async ({ number, locationTag, place, street }) => {
    setSubmitLoading(true);
    try {
      const bettingMachine = await addBettingMachine({ number, locationTag, place, street });
      props.history.push('/betting-machines');
      toast.success(`Kladomat ${bettingMachine.number} je uspješno dodan.`);
    } catch (error) {
      error.response && setError(error.response.data);
      console.log(error.response);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className='fav-container'>
      <Button onClick={props.history.goBack} variant='white' className='mb-4'>
        <ArrowLeftShort className='me-2' size={24} />
        Idi nazad
      </Button>
      <h2 className='mb-4 text-primary'>Dodaj novi kladomat</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <BettingMachineForm onSubmit={onSubmit} submitLoading={submitLoading} />
    </div>
  );
};

export default NewBettingMachinePage;
