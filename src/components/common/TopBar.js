import React, { useState, useEffect, forwardRef } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import { List, PersonFill, BoxArrowRight } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { useAuth } from '../../services/useAuth';

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href=''
    className='user-profile__link'
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export default function TopBar() {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const fetchUser = async () => {
    setLoading(true);
    try {
      await auth.getCurrentUser();
    } catch (error) {
      error.response && toast.error('Nije moguće dohvatiti podatke od korisnika');
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
    toast('Uspješno ste odjavljeni');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='top-bar'>
      <button className='btn-menu-trigger'>
        <List size={24} />
      </button>

      <Dropdown className='user-profile' autoClose='outside'>
        <Dropdown.Toggle as={CustomToggle}>
          {loading ? (
            <Spinner animation='border' size='sm' />
          ) : (
            <>
              <PersonFill size={24} className='me-2 text-primary' /> {auth.user.firstName} {auth.user.lastName}
            </>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu align='end' className='w-100 rounded-0 mt-2'>
          <Dropdown.Item onClick={handleLogout}>
            <BoxArrowRight size={18} className='me-2 text-primary' />
            Odjavi se
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
