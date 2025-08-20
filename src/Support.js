import React, { useState } from 'react';
import axios from 'axios';
import './Support.css';

function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/support", formData);
      setIsSubmitted(true);
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="support-wrapper">
      <div className="support-box">
        <div className="bharat-yatra-header">
          <div className="saffron-stripe"></div>
          <div className="white-stripe">
            <h2 className="support-title">Bharat Yatra Support</h2>
          </div>
          <div className="green-stripe"></div>
        </div>

        <p className="support-sub">We're here to help you 24x7</p>

        <div className="support-row">
          <div className="support-card">
            <h4><span className="icon">📞</span> Call Us</h4>
            <p>1800-180-1407 (Toll-free)</p>
            <p>+91-22-12345678 (International)</p>
          </div>

          <div className="support-card">
            <h4><span className="icon">✉️</span> Email</h4>
            <p>support@bharatyatra.com</p>
            <p>refunds@bharatyatra.com</p>
          </div>

          <div className="support-card">
            <h4><span className="icon">💬</span> Chat</h4>
            <p>Live Chat (24x7)</p>
            <p>WhatsApp: +91 9876543210</p>
          </div>
        </div>

        <div className="quick-help">
          <h4 className="quick-title">Quick Help</h4>
          <div className="quick-links">
            <a href="/manage-booking" className="link-button">Manage Booking</a>
            <a href="/flight-status" className="link-button">Flight Status</a>
            <a href="/refund-status" className="link-button">Refund Status</a>
            <a href="/baggage-info" className="link-button">Baggage Info</a>
          </div>
        </div>

        <div className="support-form">
          <h4>Contact Our Team</h4>
          {isSubmitted ? (
            <div className="success-message">
              Thank you! We'll contact you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                required
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <textarea
                placeholder="How can we help?"
                required
                onChange={(e) => setFormData({...formData, issue: e.target.value})}
              ></textarea>
              <button type="submit" className="submit-button">Submit Request</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Support;