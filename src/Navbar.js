import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import bharatYatraLogo from './images/bharat.png';
import menuIcon from './images/menu-icon.svg';
import closeIcon from './images/close-icon.svg';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`by-navbar ${!showNavbar ? 'hidden' : ''}`}>
      {/* Top Utility Bar */}
      <div className="utility-bar">
        <div className="container">
          <ul className="utility-links">
            <li><Link to="/tariff"><i className="fas fa-tag"></i> TARIFF</Link></li>
            <li><Link to="/giftcard"><i className="fas fa-gift"></i> GIFTCARD</Link></li>
            <li><Link to="/search"><i className="fas fa-search"></i> Q SEARCH</Link></li>
            <li><Link to="/support"><i className="fas fa-headset"></i> SUPPORT</Link></li>
            <li className="sign-in"><Link to="/signin"><i className="fas fa-user-circle"></i> SIGN IN</Link></li>
          </ul>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="main-navigation">
        <div className="container">
          <div className="nav-brand">
            <Link to="/" className="logo-link">
              <img 
                src={bharatYatraLogo} 
                alt="Bharat Yatra" 
                className="brand-logo" 
              />
            </Link>
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <img 
              src={mobileMenuOpen ? closeIcon : menuIcon} 
              alt={mobileMenuOpen ? "Close menu" : "Open menu"} 
            />
          </button>

          <nav className={`primary-navigation ${mobileMenuOpen ? 'open' : ''}`}>
            <ul>
              <li className="nav-highlight">
                <Link to="/ezbooking"><i className="fas fa-bolt"></i> EZBOOKING</Link>
              </li>
              <li><Link to="/book-manage"><i className="fas fa-calendar-alt"></i> BOOK & MANAGE</Link></li>
              <li><Link to="/wherewefly"><i className="fas fa-map-marked-alt"></i> WHERE WE FLY</Link></li>
              <li><Link to="/prepare"><i className="fas fa-suitcase"></i> PREPARE TO TRAVEL</Link></li>
              <li className="nav-featured"><Link to="/experience"><i className="fas fa-star"></i> BHARAT YATRA EXPERIENCE</Link></li>
              <li className="nav-premium"><Link to="/maharajaclub"><i className="fas fa-crown"></i> MAHARAJA CLUB</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
