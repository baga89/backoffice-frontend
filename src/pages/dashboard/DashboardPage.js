import React, { useEffect, useState } from 'react';

import { Alert, Card, Col, Row, Spinner } from 'react-bootstrap';

import { getOfficesCount } from '../../services/officeService';
import { getBettingMachinesCount } from '../../services/bettingMachineService';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({ officesCount: null, bettingMachinesCount: null });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [officesCount, bettingMachinesCount] = await Promise.all([getOfficesCount(), getBettingMachinesCount()]);
      setDashboardData({ officesCount, bettingMachinesCount });
    } catch (error) {
      error && setError(error.response.data);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      <h1 className='mb-4'>Dashboard</h1>
      {error && (
        <Alert variant='danger' className='w-75'>
          {error}
        </Alert>
      )}
      <Row>
        <Col xs={4}>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title className='mb-3 text-secondary'>Poslovnice</Card.Title>
              {loading ? (
                <Spinner animation='border' variant='primary' />
              ) : (
                <Card.Text className='h2 text-primary fw-bold'>{dashboardData.officesCount}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Card className='shadow-sm'>
            <Card.Body>
              <Card.Title className='mb-3 text-secondary'>Kladomati</Card.Title>
              {loading ? (
                <Spinner animation='border' variant='primary' />
              ) : (
                <Card.Text className='h2 text-primary fw-bold'>{dashboardData.bettingMachinesCount}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;
