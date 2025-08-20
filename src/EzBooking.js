import React, { useState } from "react";
import "./EzBooking.css";
import { searchFlights, createBooking, payBooking, fetchHotels, bookHotel } from "./api";


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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate demo flights
  const handleSubmit = (e) => {
    e.preventDefault();
    const { from, to, departure, return: returnDate, passengers, travelClass } =
      formData;

    if (!from || !to || !departure) {
      alert("Please fill in From, To, and Departure date.");
      return;
    }

    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const airlines = ["Air India", "IndiGo", "SpiceJet", "GoAir", "Vistara"];
    const times = ["06:00", "09:30", "12:45", "15:20", "18:10", "21:00"];
    const flightsGenerated = [];

    const generateFlights = (origin, destination, date) => {
      for (let i = 0; i < 3; i++) {
        const departureTime = times[randomInt(0, times.length - 1)];
        const durationHours = randomInt(1, 3);
        const durationMinutes = randomInt(0, 59);
        const priceBase = 1500 + randomInt(0, 2000);

        flightsGenerated.push({
          id: `${origin}-${destination}-${i}-${Date.now()}`,
          airline: airlines[randomInt(0, airlines.length - 1)],
          from: origin,
          to: destination,
          departure: date,
          departureTime,
          arrivalTime: (() => {
            const [hour, min] = departureTime.split(":").map(Number);
            let arrHour = hour + durationHours;
            let arrMin = min + durationMinutes;
            if (arrMin >= 60) {
              arrHour += 1;
              arrMin -= 60;
            }
            if (arrHour >= 24) arrHour -= 24;
            return `${arrHour.toString().padStart(2, "0")}:${arrMin
              .toString()
              .padStart(2, "0")}`;
          })(),
          duration: `${durationHours}h ${durationMinutes}m`,
          travelClass,
          passengers,
          price: priceBase * passengers,
        });
      }
    };

    generateFlights(from, to, departure);

    if (returnDate) {
      generateFlights(to, from, returnDate);
    }

    setTickets(flightsGenerated);
    setMessage(`We found ${flightsGenerated.length} flights for you!`);
    setShowForm(false);
    setBookedTicketId(null);
  };

  // Book a ticket
  const handleBookTicket = async (id) => {
    const t = tickets.find((x) => x.id === id);
    if (!t) return;

    try {
      const booking = await createBooking(t);
      setSelectedTicket({ ...t, _dbId: booking.id || booking._id });
      setShowPayment(true);
    } catch (err) {
      console.error(err);
      setMessage("Booking failed. Please try again.");
    }
  };

  // Payment
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    try {
      const booking = await payBooking(selectedTicket._dbId, paymentMethod);
      setBookedTicketId(selectedTicket.id);
      setConfirmationMessage(
        `Booking confirmed with ${selectedTicket.airline}! Txn: ${
          booking.payment?.txnId || "N/A"
        }`
      );
      setShowPayment(false);
      setTimeout(() => setConfirmationMessage(""), 5000);
    } catch (err) {
      console.error(err);
      setConfirmationMessage("Payment failed. Please try again.");
    }
  };

  // Cancel ticket
  const handleCancelTicket = (id) => {
    const remaining = tickets.filter((t) => t.id !== id);
    setTickets(remaining);
    if (remaining.length === 0) {
      setMessage("All tickets removed. Please search again.");
      setConfirmationMessage("");
      setShowForm(true);
    }
  };

  const handleNewSearch = () => {
    setShowForm(true);
    setMessage("");
    setConfirmationMessage("");
    setTickets([]);
    setBookedTicketId(null);
    setShowPayment(false);
    setSelectedTicket(null);
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
          <h3>Payment for {selectedTicket?.airline}</h3>
          <form className="payment-form" onSubmit={handlePaymentSubmit}>
            <div className="form-group">
              <label>Payment Method</label>
              {["credit", "debit", "upi", "netbanking"].map((m) => (
                <label key={m}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={m}
                    checked={paymentMethod === m}
                    onChange={() => setPaymentMethod(m)}
                  />
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </label>
              ))}
            </div>
            <button type="submit" className="pay-now-btn">
              Pay Now
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowPayment(false)}
            >
              Back
            </button>
          </form>
        </div>
      ) : (
        <div className="tickets-container">
          {Array.isArray(tickets) &&
            tickets.map((t) => (
              <div
                key={t.id}
                className={`ticket-card ${
                  bookedTicketId === t.id ? "booked" : ""
                }`}
              >
                <h3>{t.airline}</h3>
                <p>
                  {t.from} → {t.to}
                </p>
                <p>
                  Departure: {t.departure} ({t.departureTime}) | Arrival:{" "}
                  {t.arrivalTime}
                </p>
                <p>Duration: {t.duration}</p>
                <p>Class: {t.travelClass}</p>
                <p>Passengers: {t.passengers}</p>
                <p>Price: ₹{t.price}</p>
                {bookedTicketId !== t.id && (
                  <>
                    <button onClick={() => handleBookTicket(t.id)}>
                      Book Now
                    </button>
                    <button onClick={() => handleCancelTicket(t.id)}>
                      Cancel
                    </button>
                  </>
                )}
                {bookedTicketId === t.id && <p>Ticket Confirmed</p>}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default EzBooking;
