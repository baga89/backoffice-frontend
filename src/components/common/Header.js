import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const activeStyle = {
  color: '#6002ee',
  backgroundColor: '#efe5fd',
};

export default function Header() {
  return (
    <header>
      <div className='logo'>
        <Link to='/' className='logo__link'>
          <img alt='Favbet backoffice' src='/images/logo.svg' className='logo__img' />
        </Link>
      </div>
      <nav className='main-nav'>
        <ul className='main-nav__list'>
          <li className='main-nav__item'>
            <NavLink to='/' activeStyle={activeStyle} exact className='main-nav__link'>
              Dashboard
            </NavLink>
          </li>
          <li className='main-nav__item'>
            <NavLink to='/offices' activeStyle={activeStyle} className='main-nav__link'>
              Poslovnice
            </NavLink>
          </li>
          <li className='main-nav__item'>
            <NavLink to='/users' activeStyle={activeStyle} className='main-nav__link'>
              Korisnici
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
