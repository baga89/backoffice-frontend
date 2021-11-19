import React from 'react';
import { Card } from 'react-bootstrap';
import { Calendar, CalendarCheck, Person } from 'react-bootstrap-icons';
import isoToLocaleDate from '../utils/helpers/isoToLocaleDate';

export default function InfoCard({ createdAt, updatedAt, userFullName }) {
  return (
    <Card>
      <Card.Header className='fw-bold'>Info</Card.Header>
      <Card.Body>
        <Card.Text className='text-secondary'>
          <Calendar className='me-2' size={16} />
          Kreirano: {isoToLocaleDate(createdAt)}
        </Card.Text>
        <Card.Text className='text-secondary'>
          <CalendarCheck className='me-2' size={16} />
          Uređeno: {isoToLocaleDate(updatedAt)}
        </Card.Text>
        {userFullName && (
          <Card.Text className='text-secondary'>
            <Person className='me-2' size={16} />
            Autor: {userFullName}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}
