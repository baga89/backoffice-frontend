import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Button, Card, Modal, Row, Col } from 'react-bootstrap';
import { PencilSquare, Trash, Plus } from 'react-bootstrap-icons';

import { getBettingMachines, deleteBettingMachine } from '../../services/bettingMachineService';
import Pagination from '../../components/common/Pagination';
import Spinner from '../../components/common/Spinner';

const BettingMachinesPage = (props) => {
  const [bettingMachines, setBettingMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bettingMachineToDelete, setBettingMachineToDelete] = useState(null);

  let history = useHistory();
  let location = useLocation();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchBettingMachines = async () => {
    try {
      const bettingMachines = await getBettingMachines();
      setBettingMachines(bettingMachines);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBettingMachines();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deletedBettingMachine = await deleteBettingMachine(id);
      const newBettingMachines = bettingMachines.filter((bettingMachine) => bettingMachine._id !== id);
      setBettingMachines(newBettingMachines);
      toast.success(`Kladomat ${deletedBettingMachine.number} uspješno obrisana!`);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    history.push(location.pathname + '/' + id + '/edit');
  };

  if (loading) return <Spinner />;

  return (
    <>
      <h1 className='mb-4'>Kladomati</h1>
      <Card className='shadow-sm'>
        <Card.Header as='h5'>
          <Row className='align-items-center'>
            <Col>Kladomati</Col>
            <Col className='col-auto'>
              <Link to={props.location.pathname + '/new'}>
                <Button variant='primary'>
                  Dodaj kladomat
                  <Plus className='ms-2' size={24} />
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Header>
        <table className='table mb-0'>
          <thead className='table-light'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Broj</th>
              <th scope='col'>Oznaka lokacije</th>
              <th scope='col'>Mjesto</th>
              <th scope='col'>Ulica</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bettingMachines &&
              bettingMachines.map((bettingMachine, index) => (
                <tr key={bettingMachine.number}>
                  <th scope='row'>{index + 1}</th>
                  <td>{bettingMachine.number}</td>
                  <td>{bettingMachine.locationTag}</td>
                  <td>{bettingMachine.place}</td>
                  <td>{bettingMachine.street}</td>
                  <td>
                    <button className='btn-transparent me-3'>
                      <PencilSquare size={20} onClick={() => handleEdit(bettingMachine._id)} />
                    </button>
                    <button className='btn-transparent'>
                      <Trash
                        size={20}
                        onClick={() => {
                          openModal();
                          setBettingMachineToDelete(bettingMachine);
                        }}
                        className='me-3 text-danger'
                      />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>
      <Modal show={modalIsOpen} onHide={closeModal} backdrop='static'>
        <Modal.Header className='border-bottom-0' closeButton>
          <Modal.Title>
            Sigurno želiš izbrisati kladomat
            <br />{' '}
            <strong>
              {bettingMachineToDelete && bettingMachineToDelete.place + ' ' + bettingMachineToDelete.number}
            </strong>
            ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Ovu radnju nije moguće poništiti.</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Odustani
          </Button>
          <Button
            variant='danger'
            onClick={() => {
              handleDelete(bettingMachineToDelete._id);
              closeModal();
            }}
          >
            Obriši
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Pagination itemsCount={this.state.bettingMachines.length} pageSize={this.state.pageSize} /> */}
    </>
  );
};

export default BettingMachinesPage;
