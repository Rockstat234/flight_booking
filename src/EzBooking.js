import React, { useState } from "react";
import "./EzBooking.css";
import { searchFlights, createBooking, payBooking } from "./api";

function EzBooking() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    passengers: 1,
    travelClass: "economy",
  });

  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [bookedTicketId, setBookedTicketId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  // 🔎 Search flights from backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setConfirmationMessage("");
    try {
      const { count, flights } = await searchFlights(formData);
      setTickets(flights);
      setMessage(`We found ${count} flights for you!`);
      setShowForm(false);
      setBookedTicketId(null);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch flights. Please check backend (8000) & try again.");
    }
  };

  // field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((x) => ({ ...x, [name]: value }));
  };

  // 🧾 Create booking on backend, then open payment UI
  const handleBookTicket = async (id) => {
    const t = tickets.find((x) => x.id === id);
    try {
      const { booking } = await createBooking(t);
      setSelectedTicket({ ...t, _dbId: booking._id });
      setShowPayment(true);
    } catch (e) {
      console.error(e);
      setMessage("Booking failed. Please try again.");
    }
  };

  const handleNewSearch = () => {
    setShowForm(true);
    setMessage("");
    setConfirmationMessage("");
    setTickets([]);
    setBookedTicketId(null);
    setShowPayment(false);
  };

  const handleCancelTicket = (id) => {
    const remaining = tickets.filter((t) => t.id !== id);
    setTickets(remaining);
    if (remaining.length === 0) {
      setMessage("All tickets removed. Please search again.");
      setConfirmationMessage("");
    }
  };

  // 💳 Simulate payment and mark booking paid
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const { booking } = await payBooking(selectedTicket._dbId, paymentMethod);
      setBookedTicketId(selectedTicket.id);
      setConfirmationMessage(
        `Booking confirmed with ${selectedTicket.airline}! Txn: ${booking.payment.txnId}`
      );
      setShowPayment(false);
      setTimeout(() => setConfirmationMessage(""), 5000);
    } catch (err) {
      console.error(err);
      setConfirmationMessage("Payment failed. Please try again.");
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
                max="10"
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
      ) : showPayment ? (
        <div className="payment-container">
          <div className="payment-summary">
            <h3>Payment Summary</h3>
            <div className="ticket-info">
              <p>
                <strong>Flight:</strong> {selectedTicket.airline}{" "}
                {selectedTicket.flightNumber}
              </p>
              <p>
                <strong>Route:</strong> {selectedTicket.from} →{" "}
                {selectedTicket.to}
              </p>
              <p>
                <strong>Departure:</strong> {selectedTicket.departure} at{" "}
                {selectedTicket.departureTime}
              </p>
              <p>
                <strong>Class:</strong> {selectedTicket.travelClass}
              </p>
              <p>
                <strong>Passengers:</strong> {selectedTicket.passengers}
              </p>
              <p className="total-price">
                <strong>Total:</strong> ₹{selectedTicket.price.toLocaleString()}
              </p>
            </div>
          </div>

          <form className="payment-form" onSubmit={handlePaymentSubmit}>
            <div className="form-group">
              <label>Payment Method</label>
              <div className="payment-options">
                {["credit", "debit", "upi", "netbanking"].map((m) => (
                  <label key={m}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m}
                      checked={paymentMethod === m}
                      onChange={() => setPaymentMethod(m)}
                    />
                    {m === "credit"
                      ? "Credit Card"
                      : m === "debit"
                      ? "Debit Card"
                      : m === "upi"
                      ? "UPI"
                      : "Net Banking"}
                  </label>
                ))}
              </div>
            </div>

            {paymentMethod === "credit" || paymentMethod === "debit" ? (
              <>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" required />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
              </>
            ) : paymentMethod === "upi" ? (
              <div className="form-group">
                <label>UPI ID</label>
                <input type="text" placeholder="name@upi" required />
              </div>
            ) : (
              <div className="form-group">
                <label>Select Bank</label>
                <select required>
                  <option value="">Select your bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="pnb">Punjab National Bank</option>
                </select>
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowPayment(false)}
              >
                Back
              </button>
              <button type="submit" className="pay-now-btn">
                Pay Now
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="tickets-container">
          {tickets.map((t) => (
            <div
              key={t.id}
              className={`ticket-card ${bookedTicketId === t.id ? "booked" : ""}`}
            >
              <div className="ticket-header">
                <div className="airline-info">
                  <span className="airline-logo">{t.logo}</span>
                  <h3>{t.airline}</h3>
                </div>
                {bookedTicketId !== t.id && (
                  <button
                    className="remove-ticket"
                    onClick={() => handleCancelTicket(t.id)}
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="ticket-details">
                <div className="route-info">
                  <div className="time-place">
                    <strong>{t.departureTime}</strong>
                    <p>{t.from}</p>
                  </div>
                  <div className="duration">
                    <span>{t.duration}</span>
                    <div className="flight-line"></div>
                  </div>
                  <div className="time-place">
                    <strong>{t.arrivalTime}</strong>
                    <p>{t.to}</p>
                  </div>
                </div>

                <div className="flight-class">
                  <span>Flight: {t.flightNumber}</span>
                  <span>Class: {t.travelClass}</span>
                </div>

                <div className="price-section">
                  <span className="price">₹{t.price.toLocaleString()}</span>
                  <span>
                    {t.passengers} {t.passengers > 1 ? "passengers" : "passenger"}
                  </span>
                </div>
              </div>

              {bookedTicketId === t.id ? (
                <div className="booked-label">Ticket Confirmed</div>
              ) : (
                <div className="ticket-actions">
                  <button className="book-btn" onClick={() => handleBookTicket(t.id)}>
                    Book Now
                  </button>
                  <button className="cancel-btn" onClick={() => handleCancelTicket(t.id)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EzBooking;
