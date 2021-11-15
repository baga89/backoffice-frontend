import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Row, Card, InputGroup, Spinner } from 'react-bootstrap';

const formatDate = (ISOString) => {
  if (ISOString) return ISOString.substring(0, 10);
};

export const BettingMachineForm = ({ defaultValues, submitLoading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          decisionMonth: formatDate(defaultValues.decisionMonth),
          openedAt: formatDate(defaultValues.openedAt),
          closedAt: formatDate(defaultValues.closedAt),
          obligationsFrom: formatDate(defaultValues.obligationsFrom),
          dateOfAgreement: formatDate(defaultValues.dateOfAgreement),
        }
      : {},
  });

  return (
    <Form className='bettingMachine-form w-50' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Row className='mb-5'>
        <Form.Group className='col-6 mb-3' controlId='number'>
          <Form.Label>Broj kladomata</Form.Label>
          <Form.Control
            type='text'
            {...register('number', { required: 'Broj kladomata je obvezan.' })}
            isInvalid={!!errors.number}
            disabled={defaultValues}
          />
          <Form.Control.Feedback type='invalid'>{errors.number?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='locationTag'>
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
        <Form.Group className='col-6 mb-3' controlId='place'>
          <Form.Label>Mjesto</Form.Label>
          <Form.Control
            type='text'
            {...register('place', {
              required: 'Mjesto kladomata je obvezno.',
            })}
            isInvalid={!!errors.place}
          />
          <Form.Control.Feedback type='invalid'>{errors.place?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='street'>
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
        <Form.Group className='col-6 mb-3' controlId='spaceName'>
          <Form.Label>Naziv</Form.Label>
          <Form.Control type='text' {...register('spaceName')} />
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='caffeBar'>
          <Form.Label>Caffe bar</Form.Label>
          <Form.Control type='text' {...register('caffeBar')} />
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='owner'>
          <Form.Label>Vlasnik</Form.Label>
          <Form.Control type='text' {...register('owner')} />
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='decisionMonth'>
          <Form.Label>Mjesec rješenja</Form.Label>
          <Form.Control type='date' {...register('decisionMonth')} />
        </Form.Group>
        <Form.Group className='col-6' controlId='decisionClass'>
          <Form.Label>Klasa rješenja</Form.Label>
          <Form.Control type='text' {...register('decisionClass')} />
        </Form.Group>
      </Row>
      <Row className='mb-5'>
        <Form.Group className='col-6 mb-3' controlId='contract'>
          <Card className='px-3 py-2'>
            <Form.Check label='Ugovor' {...register('contract')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='electricCertificate'>
          <Card className='px-3 py-2'>
            <Form.Check label='Atest struje' {...register('electricCertificate')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='statement200m'>
          <Card className='px-3 py-2'>
            <Form.Check label='Izjava 200m od škole' {...register('statement200m')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='fireExtinguisher'>
          <Card className='px-3 py-2'>
            <Form.Check label='Protupožarni aparat' {...register('fireExtinguisher')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='submittedToMinistryOfFinance'>
          <Card className='px-3 py-2'>
            <Form.Check label='Predano na min. financija' {...register('submittedToMinistryOfFinance')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='taxExpires'>
          <Card className='px-3 py-2'>
            <Form.Check label='Porezna izlazi' {...register('taxExpires')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='taxRecord'>
          <Card className='px-3 py-2'>
            <Form.Check label='Porezna zapisnik' {...register('taxRecord')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6' controlId='taxDecision'>
          <Card className='px-3 py-2'>
            <Form.Check label='Porezno rješenje' {...register('taxDecision')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='insuranceApplication'>
          <Card className='px-3 py-2'>
            <Form.Check label='Prijava osiguranja' {...register('insuranceApplication')} />
          </Card>
        </Form.Group>
      </Row>
      <Row className='mb-5'>
        <Form.Group className='col-12 mb-3' controlId='openedAt'>
          <Form.Label>Otvoreno od</Form.Label>
          <Form.Control type='date' {...register('openedAt')} />
        </Form.Group>
        <Form.Group className='col-12' controlId='closedAt'>
          <Form.Label>Zatvoreno od</Form.Label>
          <Form.Control type='date' {...register('closedAt')} />
        </Form.Group>
      </Row>
      <Row className='mb-5'>
        <Form.Group className='col-6 mb-3' controlId='stickers'>
          <Card className='px-3 py-2'>
            <Form.Check label='Naljepnice' {...register('stickers')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='tcomLine'>
          <Card className='px-3 py-2'>
            <Form.Check label='T-com linija' {...register('tcomLine')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='informatics'>
          <Card className='px-3 py-2'>
            <Form.Check label='Informatika' {...register('informatics')} />
          </Card>
        </Form.Group>
        <Form.Group className='col-6' controlId='maxTV'>
          <Card className='px-3 py-2'>
            <Form.Check label='maxTV' {...register('maxTV')} />
          </Card>
        </Form.Group>
      </Row>
      <Row className='mb-5'>
        <Form.Group className='col-6 mb-3' controlId='feeWithVat'>
          <Form.Label>Naknada s PDV-om</Form.Label>
          <Form.Control type='text' {...register('feeWithVat')} />
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='rent'>
          <Form.Label>Zakupnina</Form.Label>
          <Form.Control type='number' {...register('rent')} />
        </Form.Group>
        <Form.Group className='col-6' controlId='lockdown'>
          <Form.Label>Lockdown</Form.Label>
          <Form.Control type='string' {...register('lockdown')} />
        </Form.Group>
        <Form.Group className='col-6' controlId='contactPerson'>
          <Form.Label>Kontakt osoba</Form.Label>
          <Form.Control type='string' {...register('contactPerson')} />
        </Form.Group>
      </Row>
      <Row className='mb-4'>
        <Form.Group className='col-6 mb-3' controlId='obligationsFrom'>
          <Form.Label>Obveze od</Form.Label>
          <Form.Control type='date' {...register('obligationsFrom')} />
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='price'>
          <Form.Label>Cijena</Form.Label>
          <InputGroup>
            <Form.Control type='number' {...register('price')} />
            <InputGroup.Text>HRK</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='currency'>
          <Form.Label>Valuta</Form.Label>
          <Form.Control type='text' {...register('currency')} />
        </Form.Group>
        <Form.Group className='col-12 mb-3' controlId='remark'>
          <Form.Label>Napomena</Form.Label>
          <Form.Control as='textarea' rows={3} {...register('remark')} />
        </Form.Group>
        <Form.Group className='col-12 mb-3' controlId='manager'>
          <Form.Label>Voditelj</Form.Label>
          <Form.Control type='text' {...register('manager')} />
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='dateOfAgreement'>
          <Form.Label>Datum dogovora</Form.Label>
          <Form.Control type='date' {...register('dateOfAgreement')} />
        </Form.Group>
        <Form.Group className='col-6 mb-3' controlId='agreementPerson'>
          <Form.Label>Dogovorio</Form.Label>
          <Form.Control type='text' {...register('agreementPerson')} />
        </Form.Group>
        <Form.Group className='col-6' controlId='fee'>
          <Card className='px-3 py-2'>
            <Form.Check label='Pristojba' {...register('fee')} />
          </Card>
        </Form.Group>
      </Row>
      <Button variant='primary' type='submit' disabled={submitLoading}>
        {submitLoading ? <Spinner animation='border' size='sm' /> : 'Spremi'}
      </Button>
    </Form>
  );
};
