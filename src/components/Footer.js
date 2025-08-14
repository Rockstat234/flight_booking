import React from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, Headphones, HelpCircle, Phone, Download, 
  Facebook, Twitter, Instagram, Youtube, Linkedin,
  ArrowRight
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      {/* Main Footer Content */}
      <div className="footer-content">
        {/* Left Side - Navigation */}
        <div className="footer-nav">
          <div className="nav-section">
            <h3 className="nav-title">
              <span className="title-underline">Book & Manage</span>
            </h3>
            <ul className="nav-links">
              <li>
                <Link to="/BookFlights" className="nav-link">
                  <ArrowRight size={14} /> Book Flights
                </Link>
              </li>
              <li>
                <Link to="/manage-booking" className="nav-link">
                  <ArrowRight size={14} /> Manage Booking
                </Link>
              </li>
              <li>
                <Link to="/checkin" className="nav-link">
                  <ArrowRight size={14} /> Check-in
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="nav-link">
                  <ArrowRight size={14} /> Flight Schedule
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav-section">
            <h3 className="nav-title">
              <span className="title-underline">Destinations</span>
            </h3>
            <ul className="nav-links">
              <li>
                <Link to="/domestic-routes" className="nav-link">
                  <MapPin size={14} /> Domestic Routes
                </Link>
              </li>
              <li>
                <Link to="/international-routes" className="nav-link">
                  <MapPin size={14} /> International Routes
                </Link>
              </li>
              <li>
                <Link to="/route-map" className="nav-link">
                  <MapPin size={14} /> Route Map
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav-section">
            <h3 className="nav-title">
              <span className="title-underline">Support</span>
            </h3>
            <ul className="nav-links">
              <li>
                <Link to="/customer-care" className="nav-link">
                  <Headphones size={14} /> Customer Care
                </Link>
              </li>
              <li>
                <Link to="/faq" className="nav-link">
                  <HelpCircle size={14} /> FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link">
                  <Phone size={14} /> Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - App Download */}
        <div className="app-promo">
          <div className="app-content">
            <h3>Fly Better with Our App</h3>
            <p>Download now for exclusive deals and easier booking</p>
            
            <div className="app-badges">
              <a href="#" className="app-badge">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="App Store" 
                />
              </a>
              <a href="#" className="app-badge">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Google Play" 
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-brand">
          <div className="logo-wrapper">
            <img src="/images/bharat.jpg" alt="Bharat Yatra" className="footer-logo" />
            <span className="brand-name">Bharat Yatra</span>
          </div>
          <p className="tagline">Wings of Change. Welcome Aboard.</p>
        </div>

        <div className="footer-legal">
          <div className="social-icons">
            <a href="#" className="social-icon">
              <Facebook size={18} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={18} />
            </a>
            <a href="#" className="social-icon">
              <Instagram size={18} />
            </a>
            <a href="#" className="social-icon">
              <Youtube size={18} />
            </a>
            <a href="#" className="social-icon">
              <Linkedin size={18} />
            </a>
          </div>

          <div className="legal-links">
            <span>&copy; {year} Bharat Yatra</span>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;