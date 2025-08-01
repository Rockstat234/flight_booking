import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div className="footer-column">
          <h4>ABOUT US</h4>
          <ul>
            <li>About Air India</li>
            <li>Newsroom</li>
            <li>Corporate Information</li>
            <li>Safety</li>
            <li>Tenders</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>BOOK & MANAGE</h4>
          <ul>
            <li>Search Flights</li>
            <li>Manage Booking</li>
            <li>Flight Schedule</li>
            <li>Cargo</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>WHERE WE FLY</h4>
          <ul>
            <li>Route Map</li>
            <li>Non-stop Flights</li>
            <li>Popular Flights</li>
            <li>Partner Airlines</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>PREPARE TO TRAVEL</h4>
          <ul>
            <li>Baggage Guidelines</li>
            <li>Airport Information</li>
            <li>First-time Travellers</li>
            <li>Travel Documents</li>
            <li>Health Assistance</li>
          </ul>
        </div>
      </div>

      <hr />

      <div className="footer-links">
        <div className="footer-column">
          <h4>AIR INDIA EXPERIENCE</h4>
          <ul>
            <li>At the Airport</li>
            <li>In the Air</li>
            <li>Travel Experience</li>
            <li>Our Fleet</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>MAHARAJA CLUB</h4>
          <ul>
            <li>About Maharaja Club</li>
            <li>Points Calculator</li>
            <li>Earn Points</li>
            <li>Redeem Points</li>
            <li>Maharaja Club FAQs</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>SUPPORT</h4>
          <ul>
            <li>Contact</li>
            <li>FAQs</li>
            <li>Grievance Resolution</li>
            <li>EU/UK Flight Delay Claim</li>
          </ul>
        </div>
      </div>

      <div className="footer-legal">
        <div className="legal-links">
          <a>Sitemap</a>
          <a>Terms & Conditions</a>
          <a>Privacy Notice</a>
          <a>Accessibility</a>
          <a>Cookie Policy</a>
          <a>Travel Agents</a>
          <a>Conditions of Carriage</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
