import { Alert, Button } from 'react-bootstrap';

const DashboardPage = (props) => {
  return (
    <>
      <h1>Dashboard</h1>
      <Alert variant='primary' className='w-50'>
        Ovdje će se prikazivati statistika..npr. broj poslovnica, reg. korisnika itd..
      </Alert>
    </>
  );
};

export default DashboardPage;
