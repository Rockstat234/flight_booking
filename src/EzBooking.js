import React, { useState } from "react";
import "./EzBooking.css";

function EzBooking() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    passengers: 1,
    travelClass: "economy"
  });

  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [bookedTicketId, setBookedTicketId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const basePrice = 3000;
    let multiplier = 1;

    switch (formData.travelClass) {
      case "premium": multiplier = 1.5; break;
      case "business": multiplier = 2; break;
      case "first": multiplier = 2.5; break;
      default: multiplier = 1;
    }

    const totalPrice = Math.round(basePrice * multiplier * formData.passengers);

    const newTickets = [
      {
        id: 1,
        ...formData,
        price: totalPrice,
        flightNumber: "AI-202",
        departureTime: "08:45",
        arrivalTime: "11:00"
      },
      {
        id: 2,
        ...formData,
        price: totalPrice + 1200,
        flightNumber: "AI-304",
        departureTime: "14:30",
        arrivalTime: "16:45"
      }
    ];

    setTickets(newTickets);
    setMessage("We found these flights for you!");
    setShowForm(false);
    setConfirmationMessage("");
    setBookedTicketId(null);
  };

  const handleNewSearch = () => {
    setShowForm(true);
    setMessage("");
    setConfirmationMessage("");
    setTickets([]);
    setBookedTicketId(null);
  };

  const handleBookTicket = (id) => {
    setBookedTicketId(id);
    setConfirmationMessage("Booking confirmed! Thank you for choosing Air India.");
    setTimeout(() => setConfirmationMessage(""), 3000);
  };

  const handleCancelTicket = (id) => {
    const remaining = tickets.filter(t => t.id !== id);
    setTickets(remaining);
    if (remaining.length === 0) {
      setMessage("All tickets removed. Please search again.");
      setConfirmationMessage("");
    }
  };

  return (
    <div className="ezbooking-wrapper">
      <div className="booking-header">
        <h2>EzBooking</h2>
        <p>Book your next journey with ease ✈</p>
      </div>

      {message && (
        <div className="message-box">
          {message}
          {!showForm && (
            <button className="new-search-btn" onClick={handleNewSearch}>
              New Search
            </button>
          )}
        </div>
      )}

      {confirmationMessage && (
        <div className="confirmation-banner">{confirmationMessage}</div>
      )}

      {showForm ? (
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>From</label>
              <input
                type="text"
                name="from"
                placeholder="Enter Departure City"
                value={formData.from}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>To</label>
              <input
                type="text"
                name="to"
                placeholder="Enter Destination City"
                value={formData.to}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Departure</label>
              <input
                type="date"
                name="departure"
                value={formData.departure}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Return</label>
              <input
                type="date"
                name="return"
                value={formData.return}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Passengers</label>
              <input
                type="number"
                name="passengers"
                min="1"
                value={formData.passengers}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Class</label>
              <select
                name="travelClass"
                value={formData.travelClass}
                onChange={handleChange}
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          </div>

          <div className="form-row full-width">
            <button className="submit-btn" type="submit">
              Search Flights
            </button>
          </div>
        </form>
      ) : (
        <div className="tickets-container">
          {tickets.map((t) => (
            <div key={t.id} className="ticket-card">
              <div className="ticket-header">
                <h3>{t.from} → {t.to}</h3>
                <button className="remove-ticket" onClick={() => handleCancelTicket(t.id)}>×</button>
              </div>

              <div className="ticket-details">
                <div className="flight-info">
                  <span>Flight: {t.flightNumber}</span>
                  <span>Class: {t.travelClass}</span>
                </div>

                <div className="time-info">
                  <div>
                    <strong>Departure</strong>
                    <p>{t.departure} at {t.departureTime}</p>
                  </div>
                  <div>
                    <strong>Arrival</strong>
                    <p>{t.return} at {t.arrivalTime}</p>
                  </div>
                </div>

                <div className="passenger-price">
                  <span>Passengers: {t.passengers}</span>
                  <span className="price">₹{t.price.toLocaleString()}</span>
                </div>
              </div>

              {bookedTicketId === t.id ? (
                <div className="booked-label"> ticket confirmed</div>
              ) : (
                <>
                  <button className="book-btn" onClick={() => handleBookTicket(t.id)}>Book Now</button>
                  <button className="cancel-btn" onClick={() => handleCancelTicket(t.id)}>Cancel</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EzBooking;
