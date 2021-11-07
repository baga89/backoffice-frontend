import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Alert, Button, Card, Modal, Row, Col } from 'react-bootstrap';
import { PencilSquare, Trash, Plus } from 'react-bootstrap-icons';

import { getUsers, deleteUser } from '../../services/userService';
import Pagination from '../../components/common/Pagination';
import Spinner from '../../components/common/Spinner';

const UsersPage = (props) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  let history = useHistory();
  let location = useLocation();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      error.response && setError(error.response.data);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deletedUser = await deleteUser(id);
      const newUsers = users.filter((user) => user._id !== id);
      setUsers(newUsers);
      toast.success(`Korisnik ${deletedUser.email} uspješno obrisan!`);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    history.push(location.pathname + '/' + id + '/edit');
  };

  if (loading) return <Spinner />;
  if (error) return <Alert variant='danger'>{error}</Alert>;

  return (
    <>
      <h1 className='mb-4'>Registrirani korisnici</h1>
      <Card>
        <Card.Header as='h5'>
          <Row className='align-items-center'>
            <Col>Korisnici</Col>
            <Col className='col-auto'>
              <Link to={props.location.pathname + '/new'}>
                <Button variant='primary'>
                  Dodaj korisnika
                  <Plus className='ms-2' size={24} />
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Header>
        <table className='table'>
          <thead className='table-light'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Ime</th>
              <th scope='col'>Prezime</th>
              <th scope='col'>Email</th>
              <th scope='col'>Rola</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className='btn-transparent me-3'>
                      <PencilSquare size={20} onClick={() => handleEdit(user._id)} />
                    </button>
                    <button className='btn-transparent'>
                      <Trash
                        size={20}
                        onClick={() => {
                          openModal();
                          setUserToDelete(user);
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
            Sigurno želiš izbrisati korisnika
            <br /> <strong>{userToDelete && userToDelete.firstName + ' ' + userToDelete.lastName}</strong>?
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
              handleDelete(userToDelete._id);
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

export default UsersPage;
