import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="ai-footer">
      <div className="footer-top">
        {[
          {
            title: "Book & Manage",
            links: [
              { to: "/book-flights", label: "Book Flights" },
              { to: "/manage-booking", label: "Manage Booking" },
              { to: "/checkin", label: "Check-in" },
              { to: "/flight-schedule", label: "Flight Schedule" },
            ],
          },
          {
            title: "Where We Fly",
            links: [
              { to: "/domestic-routes", label: "Domestic Routes" },
              { to: "/international-routes", label: "International Routes" },
              { to: "/route-map", label: "Route Map" },
            ],
          },
          {
            title: "Information",
            links: [
              { to: "/travel-guidelines", label: "Travel Guidelines" },
              { to: "/baggage", label: "Baggage" },
              { to: "/visa-docs", label: "Visa & Documents" },
              { to: "/special-assistance", label: "Special Assistance" },
            ],
          },
          {
            title: "Support",
            links: [
              { to: "/customer-care", label: "Customer Care" },
              { to: "/feedback", label: "Feedback" },
              { to: "/faqs", label: "FAQs" },
              { to: "/contact", label: "Contact Us" },
            ],
          },
        ].map((col, index) => (
          <div className="footer-column" key={index}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((link, i) => (
                <li key={i}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-middle">
        <div className="footer-logo">Air India</div>
        <p className="footer-tagline">Wings of Change. Welcome Aboard.</p>
        <div className="footer-social">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {year} Air India Ltd. | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
