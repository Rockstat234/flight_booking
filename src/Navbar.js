import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import bharatYatraLogo from "./images/bharat.png";
import menuIcon from "./images/menu-icon.svg";
import closeIcon from "./images/close-icon.svg";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll hide / show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`by-navbar ${!showNavbar ? "hidden" : ""}`}>
      {/* 🔹 Utility Bar */}
      <div className="utility-bar">
        <div className="container util-flex">
          {/* Logo on left */}
          <div className="nav-brand">
            <Link to="/" className="logo-link">
              <img
                src={bharatYatraLogo}
                alt="Bharat Yatra"
                className="brand-logo"
              />
            </Link>
          </div>

          {/* Utility links on right */}
          <ul className="utility-links">
            <li><Link to="/tariff"><i className="fas fa-tag"></i> Tariff</Link></li>
            <li><Link to="/giftcard"><i className="fas fa-gift"></i> Giftcard</Link></li>
            <li><Link to="/search"><i className="fas fa-search"></i> Search</Link></li>
            <li><Link to="/support"><i className="fas fa-headset"></i> Support</Link></li>
            <li className="sign-in"><Link to="/signin"><i className="fas fa-user-circle"></i> Sign In</Link></li>
          </ul>
        </div>
      </div>

      {/* 🔹 Main Navigation */}
      <div className="main-navigation">
        <div className="container nav-flex">
          {/* Mobile toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <img
              src={mobileMenuOpen ? closeIcon : menuIcon}
              alt={mobileMenuOpen ? "Close menu" : "Open menu"}
            />
          </button>

          {/* Centered Menu */}
          <nav className={`primary-navigation ${mobileMenuOpen ? "open" : ""}`}>
            <ul>
              <li className="nav-highlight">
                <Link to="/ezbooking"><i className="fas fa-bolt"></i> EZBooking</Link>
              </li>
              <li><Link to="/book-manage"><i className="fas fa-calendar-alt"></i> Book & Manage</Link></li>
              <li><Link to="/wherewefly"><i className="fas fa-map-marked-alt"></i> Where We Fly</Link></li>
              <li><Link to="/prepare"><i className="fas fa-suitcase"></i> Prepare to Travel</Link></li>
              <li className="nav-featured">
                <Link to="/HotelBooking"><i className="fas fa-hotel"></i> Hotels</Link>
              </li>
              <li className="nav-premium">
                <Link to="/maharajaclub"><i className="fas fa-crown"></i> Maharaja Club</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
