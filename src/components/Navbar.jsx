import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css components/navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/notes">
        All Notes
      </NavLink>
    </div>
  );
};

export default Navbar;
