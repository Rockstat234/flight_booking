import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

import './CheckIn.css';

const CheckIn = () => {
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkedInBooking, setCheckedInBooking] = useState(null);

  const handleCheckIn = (e) => {
    e.preventDefault();
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const booking = savedBookings.find(
      (b) =>
        b.pnr === pnr.toUpperCase() &&
        b.passengerName.toLowerCase().includes(lastName.toLowerCase())
    );

    if (!booking) {
      alert('Booking not found.');
      return;
    }

    if (booking.status === 'Cancelled') {
      alert('Cannot check-in a cancelled booking.');
      return;
    }

    booking.status = 'Checked-In';
    localStorage.setItem('bookings', JSON.stringify(savedBookings));
    setCheckedInBooking(booking);
    alert(`Checked-In successfully! Seat: ${booking.seat}`);
  };

  return (
    <div className="checkin-wrapper">
      <div className="checkin-card">
        <h1>Check-In</h1>
        {!checkedInBooking && (
          <form onSubmit={handleCheckIn}>
            <div className="form-group">
              <label>PNR Number</label>
              <input
                type="text"
                value={pnr}
                onChange={(e) => setPnr(e.target.value.toUpperCase())}
                required
                placeholder="Enter PNR"
                maxLength="6"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Enter Last Name"
              />
            </div>
            <button type="submit" className="btn-checkin">
              Check-In
            </button>
          </form>
        )}

        {checkedInBooking && (
          <div className="boarding-pass">
            <h2>Boarding Pass</h2>
            <p><strong>PNR:</strong> {checkedInBooking.pnr}</p>
            <p><strong>Passenger:</strong> {checkedInBooking.passengerName}</p>
            <p><strong>Flight:</strong> {checkedInBooking.flight}</p>
            <p><strong>Date:</strong> {checkedInBooking.date}</p>
            <p><strong>From:</strong> {checkedInBooking.from}</p>
            <p><strong>To:</strong> {checkedInBooking.to}</p>
            <p><strong>Seat:</strong> {checkedInBooking.seat}</p>
            <p><strong>Status:</strong> {checkedInBooking.status}</p>

            {/* QR Code */}
            <div className="qr-code">
              <QRCodeCanvas
                value={`${checkedInBooking.pnr}|${checkedInBooking.passengerName}`}
                size={150}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
              />
            </div>

            <button
              className="btn-back"
              onClick={() => setCheckedInBooking(null)}
            >
              Back to Check-In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
