import React from 'react';
import { LOGO } from '../utils/constant';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO} alt="logo" />
      </div>
      <div className="navigation">
        <ul className="nav-items">
          <li>Home</li>
          <li>Search</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default Header;