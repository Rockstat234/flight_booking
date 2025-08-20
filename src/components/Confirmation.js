import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (booking) {
      setBookingDetails(booking);
      setLoading(false);
    } else {
      navigate('/');
    }
  }, [booking, navigate]);

  if (loading) return <div>Loading booking confirmation...</div>;
  if (!bookingDetails) return <div>No booking information found.</div>;

  return (
    <div className="confirmation">
      <div className="alert alert-success">
        <h2>Booking Confirmed!</h2>
        <p>Your booking reference is: <strong>{bookingDetails.reference}</strong></p>
      </div>

      <div className="confirmation-details mt-4">
        <h4>Booking Summary</h4>
        <div className="card mb-3">
          <div className="card-body">
            <h5>Flight Information</h5>
            <p>
              <strong>Flight:</strong> {bookingDetails.flight.airline} - {bookingDetails.flight.flightNumber}
            </p>
            <p>
              <strong>Route:</strong> {bookingDetails.flight.departure.airport} → {bookingDetails.flight.arrival.airport}
            </p>
            <p>
              <strong>Departure:</strong> {new Date(bookingDetails.flight.departure.time).toLocaleString()}
            </p>
            <p>
              <strong>Arrival:</strong> {new Date(bookingDetails.flight.arrival.time).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <h5>Passenger Information</h5>
            {bookingDetails.passengers.map((passenger, index) => (
              <div key={index} className="mb-2">
                <p><strong>Passenger {index + 1}:</strong> {passenger.name} (Age: {passenger.age})</p>
                {passenger.passport && <p>Passport: {passenger.passport}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-body">
            <h5>Payment Information</h5>
            <p><strong>Amount Paid:</strong> ${bookingDetails.payment.amount}</p>
            <p><strong>Payment Method:</strong> {bookingDetails.payment.method === 'credit' ? 'Credit Card' : 'Debit Card'}</p>
            <p><strong>Status:</strong> {bookingDetails.payment.status}</p>
          </div>
        </div>

        <div className="contact-info mb-4">
          <h5>Contact Information</h5>
          <p>Email: {bookingDetails.contact.email}</p>
          <p>Phone: {bookingDetails.contact.phone}</p>
        </div>

        <div className="alert alert-info">
          A confirmation email has been sent to {bookingDetails.contact.email}.
          Please check your inbox (and spam folder) for your e-ticket.
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Confirmation;