import React from 'react';
import './Support.css';

function Support() {
  return (
    <div className="support-wrapper">
      <div className="support-box">
        <h2 className="support-title">Customer Support</h2>
        <p className="support-sub">Need help? We're here 24x7 to assist you</p>

        <div className="support-row">
          <div className="support-card">
            <h4>Call Us</h4>
            <p>1800-180-1407 (Toll-free)</p>
            <p>+91-22-12345678 (International)</p>
          </div>

          <div className="support-card">
            <h4>Email</h4>
            <p>support@airindia.com</p>
            <p>For refund: refunds@airindia.com</p>
          </div>

          <div className="support-card">
            <h4>Chat Support</h4>
            <p>Live Chat available on website</p>
            <p>Monday to Sunday - 24x7</p>
          </div>
        </div>

        <h4 className="quick-title">Quick Help Links</h4>
        <ul className="quick-list">
          <li><a href="#">Manage Booking</a></li>
          <li><a href="#">Flight Status</a></li>
          <li><a href="#">Refund Status</a></li>
          <li><a href="#">Baggage Info</a></li>
          <li><a href="#">Complaints & Feedback</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Support;
