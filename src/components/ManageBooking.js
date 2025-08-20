import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageBooking.css';
import { v4 as uuidv4 } from 'uuid';

const seatRows = Array.from({ length: 30 }, (_, i) => i + 1);
const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

const generateSeat = (pnr, savedBookings) => {
  const samePNRBookings = savedBookings.filter((b) => b.pnr === pnr);
  const takenSeats = samePNRBookings.map((b) => b.seat);

  for (let row of seatRows) {
    for (let letter of seatLetters) {
      const seat = `${row}${letter}`;
      if (!takenSeats.includes(seat)) return seat;
    }
  }
  return '00X';
};

const ManageBooking = () => {
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(savedBookings);
    setFilteredBookings(savedBookings);
  }, []);

  useEffect(() => {
    const filtered = bookings.filter(
      (b) =>
        b.pnr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.passengerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  }, [searchTerm, bookings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const newBooking = {
      id: uuidv4(),
      pnr: pnr.toUpperCase(),
      passengerName: `${lastName} / John`,
      flight: 'AI 101',
      date: '2025-09-05',
      from: 'Delhi (DEL)',
      to: 'Mumbai (BOM)',
      seat: generateSeat(pnr.toUpperCase(), savedBookings),
      meal: 'Vegetarian',
      status: 'Confirmed',
    };

    const updatedBookings = [...savedBookings, newBooking];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setFilteredBookings(updatedBookings);
    setSearchTerm('');
    setPnr('');
    setLastName('');

    navigate('/booking-details', {
      state: { bookingId: newBooking.id },
    });
  };

  const handleViewBooking = (b) => {
    navigate('/booking-details', {
      state: { bookingId: b.id },
    });
  };

  const handleDeleteBooking = (b) => {
    if (window.confirm(`Delete booking for ${b.passengerName}?`)) {
      const updatedBookings = bookings.filter((item) => item.id !== b.id);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      setFilteredBookings(updatedBookings);
    }
  };

  return (
    <div className="manage-booking-wrapper">
      <div className="manage-booking-card">
        <h1>Manage Your Booking</h1>
        <p className="subtitle">Enter your PNR and last name to retrieve your booking</p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pnr">PNR Number</label>
            <input
              type="text"
              id="pnr"
              value={pnr}
              onChange={(e) => setPnr(e.target.value.toUpperCase())}
              placeholder="ABC123"
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

        {bookings.length > 0 && (
          <div className="booking-list">
            <h3>Saved Bookings</h3>
            <input
              type="text"
              placeholder="Search by PNR or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <ul>
              {filteredBookings.map((b) => (
                <li key={b.id}>
                  <span onClick={() => handleViewBooking(b)}>
                    {b.pnr} - {b.passengerName} ({b.seat}) ({b.status})
                  </span>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteBooking(b)}
                  >
                    Delete
                  </button>
                </li>
              ))}
              {filteredBookings.length === 0 && <li>No bookings found</li>}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBooking;
