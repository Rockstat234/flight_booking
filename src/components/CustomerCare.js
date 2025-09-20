import React from "react";
import "./CustomerCare.css";

export default function CustomerCare() {
  return (
    <div className="customer-care-wrapper">
      <div className="customer-care-header">
        <h2>Customer Care</h2>
        <p>We are here to help you 24/7</p>
      </div>

      <div className="contact-info">
        <p>📞 Toll Free: 1800-123-4567</p>
        <p>✉ Email: support@Bharatyatra.com</p>
        <p>📍 Address: Mumbai, India</p>
      </div>

      <form className="support-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea rows="4" placeholder="Your Message" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
