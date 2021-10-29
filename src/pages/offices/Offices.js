import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

import { getOffices, deleteOffice } from '../../services/officeService';
import Pagination from '../../components/common/Pagination';
import Spinner from '../../components/common/Spinner';

const Offices = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [officeToDelete, setOfficeToDelete] = useState(null);

  let history = useHistory();
  let location = useLocation();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchOffices = async () => {
    try {
      const offices = await getOffices();
      setOffices(offices);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deletedOffice = await deleteOffice(id);
      const newOffices = offices.filter((office) => office._id !== id);
      setOffices(newOffices);
      toast.success(`Poslovnica ${deletedOffice.number} uspješno obrisana!`);
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
      <table className='table table-striped'>
        <thead className='table-secondary'>
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
          {offices &&
            offices.map((office, index) => (
              <tr key={office.number}>
                <th scope='row'>{index + 1}</th>
                <td>{office.number}</td>
                <td>{office.locationTag}</td>
                <td>{office.place}</td>
                <td>{office.street}</td>
                <td>
                  <button className='btn-transparent me-3'>
                    <PencilSquare size={20} onClick={() => handleEdit(office._id)} />
                  </button>
                  <button className='btn-transparent'>
                    <Trash
                      size={20}
                      onClick={() => {
                        openModal();
                        setOfficeToDelete(office);
                      }}
                      className='me-3 text-danger'
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal show={modalIsOpen} onHide={closeModal} backdrop='static'>
        <Modal.Header className='border-bottom-0' closeButton>
          <Modal.Title>
            Sigurno želiš izbrisati poslovnicu
            <br /> <strong>{officeToDelete && officeToDelete.place + ' ' + officeToDelete.number}</strong>?
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
              handleDelete(officeToDelete._id);
              closeModal();
            }}
          >
            Obriši
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Pagination itemsCount={this.state.offices.length} pageSize={this.state.pageSize} /> */}
    </>
  );
};

export default Offices;
