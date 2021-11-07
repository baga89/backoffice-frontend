import React, { useState, useEffect, forwardRef } from 'react';
import { Dropdown, Spinner } from 'react-bootstrap';
import { List, PersonFill, BoxArrowRight } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
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
  const { loading, error, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast('Uspješno ste odjavljeni');
  };

  return (
    <div className='top-bar'>
      <button className='btn-menu-trigger'>
        <List size={24} />
      </button>

      <Dropdown className='user-profile' autoClose='outside'>
        <Dropdown.Toggle as={CustomToggle}>
          {error && 'Korisnik nije učitan'}
          {loading ? (
            <Spinner animation='border' size='sm' />
          ) : (
            <>
              <PersonFill size={24} className='me-2 text-primary' /> {user && user.firstName} {user && user.lastName}
            </>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu align='end' className='w-100 rounded-0'>
          <Dropdown.Item as={Link} to='/profile'>
            Moj profil
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>
            <BoxArrowRight size={18} className='me-2 text-primary' />
            Odjavi se
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
