import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import airIndiaLogo from './images/airindia-logo.png'; 

const Navbar = () => {
  return (
    <div className="air-india-navbar">
      <div className="utility-bar">
        <ul className="utility-links">
          <li><Link to="/tariff">TARIFF</Link></li>
          <li><Link to="/giftcard">GIFTCARD</Link></li>
          <li><Link to="/search">Q SEARCH</Link></li>
          <li><Link to="/support">SUPPORT</Link></li>
          <li><Link to="/signin">SIGN IN</Link></li>
        </ul>
      </div>

      <div className="main-navigation">
        <Link to="/" className="logo-link">
          <img src={airIndiaLogo} alt="Air India" className="brand-logo" />
        </Link>

        <nav className="primary-navigation">
          <ul>
            <li><Link to="/ezbooking">EZBOOKING</Link></li>
            <li><Link to="/book-manage">BOOK&MANAGE</Link></li>
            <li><Link to="/wherewefly">WHEREWEFLY</Link></li>
            <li><Link to="/prepare">PREPARETOTRAVEL</Link></li>
            <li><Link to="/experience">AIRINDIAEXPERIENCE</Link></li>
            <li><Link to="/maharajaclub">MAHARAJACLUB</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
