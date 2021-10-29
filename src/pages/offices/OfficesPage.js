import { Button } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import Offices from './Offices';

const OfficesPage = (props) => {
  return (
    <div className='fav-container'>
      <h1 className='mb-4'>Poslovnice</h1>
      <Link to={props.location.pathname + '/new'}>
        <Button variant='primary' size='lg' className='mb-4'>
          Dodaj poslovnicu
          <Plus className='ms-2' size={24} />
        </Button>
      </Link>
      <Offices />
    </div>
  );
};

export default OfficesPage;
