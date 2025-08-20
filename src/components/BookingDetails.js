import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BookingDetails.css';

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const { bookingId } = location.state || {};
    if (!bookingId) {
      navigate('/manage-booking');
      return;
    }

    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const currentBooking = savedBookings.find((b) => b.id === bookingId);

    if (currentBooking) setBooking(currentBooking);
    else navigate('/manage-booking');
  }, [location.state, navigate]);

  if (!booking) return null;

  const handleChange = (field, value) => {
    setBooking({ ...booking, [field]: value });
  };

  const handleSave = () => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    let updatedBooking = { ...booking };
    if (updatedBooking.status === 'Cancelled') {
      updatedBooking.seat = '';
    }

    const updatedBookings = savedBookings.map((b) =>
      b.id === updatedBooking.id ? updatedBooking : b
    );

    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBooking(updatedBooking);
    alert('Booking updated successfully!');
  };

  return (
    <div className="booking-details-wrapper">
      <div className="booking-details-card">
        <h1>Booking Details</h1>

        <div className="detail-row">
          <span>PNR:</span>
          <input
            type="text"
            value={booking.pnr}
            onChange={(e) => handleChange('pnr', e.target.value.toUpperCase())}
          />
        </div>
        <div className="detail-row">
          <span>Passenger Name:</span>
          <input
            type="text"
            value={booking.passengerName}
            onChange={(e) => handleChange('passengerName', e.target.value)}
          />
        </div>
        <div className="detail-row">
          <span>Flight:</span>
          <input
            type="text"
            value={booking.flight}
            onChange={(e) => handleChange('flight', e.target.value)}
          />
        </div>
        <div className="detail-row">
          <span>Date:</span>
          <input
            type="date"
            value={booking.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </div>
        <div className="detail-row">
          <span>From:</span>
          <input
            type="text"
            value={booking.from}
            onChange={(e) => handleChange('from', e.target.value)}
          />
        </div>
        <div className="detail-row">
          <span>To:</span>
          <input
            type="text"
            value={booking.to}
            onChange={(e) => handleChange('to', e.target.value)}
          />
        </div>
        <div className="detail-row">
          <span>Seat:</span>
          <input
            type="text"
            value={booking.seat}
            onChange={(e) => handleChange('seat', e.target.value)}
            disabled={booking.status === 'Cancelled'}
          />
        </div>
        <div className="detail-row">
          <span>Meal:</span>
          <input
            type="text"
            value={booking.meal}
            onChange={(e) => handleChange('meal', e.target.value)}
          />
        </div>
        <div className="detail-row">
          <span>Status:</span>
          <select
            value={booking.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <button className="btn-save" onClick={handleSave}>
          Save Changes
        </button>

        <button className="btn-back" onClick={() => navigate('/manage-booking')}>
          Back to Manage Booking
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;
