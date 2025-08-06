import React, { useState } from 'react';
import './ManageBooking.css';

const ManageBooking = () => {
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // यहाँ API कॉल करें जैसे: fetch(/api/manage-booking?pnr=${pnr}&lastName=${lastName})
    console.log('Submitting', { pnr, lastName });
    // response आधारित आगे का UI दिखाएं
  };

  return (
    <div className="manage-booking-container">
      <h1>ManageBooking</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pnr">PNR Number</label>
          <input
            type="text"
            id="pnr"
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            placeholder="Enter 6‑digit PNR"
            maxLength="6"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            required
          />
        </div>
        <button type="submit" className="btn-submit">Retrieve Booking</button>
      </form>
      <div className="info-note">
        <p>Example PNR: ABC123</p>
      </div>
    </div>
  );
};

export default ManageBooking;