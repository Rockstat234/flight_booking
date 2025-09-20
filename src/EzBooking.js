import React, { useState } from "react";
import "./EzBooking.css";
import { v4 as uuidv4 } from "uuid";

function EzBooking() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: "",
    passengers: 1,
    travelClass: "economy",
    aadhar: "", // ✅ Aadhaar added
  });

  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [bookedTicketId, setBookedTicketId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { from, to, departure, aadhar } = formData;

    if (!from || !to || !departure) {
      alert("Please fill in From, To, and Departure date.");
      return;
    }

    if (!aadhar || !/^\d{12}$/.test(aadhar)) {
      alert("Please enter a valid 12-digit Aadhaar number.");
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
          travelClass: formData.travelClass,
          passengers: formData.passengers,
          price: priceBase * formData.passengers,
          status: "available",
          aadhar: formData.aadhar, // ✅ Aadhaar linked with ticket
        });
      }
    };

    generateFlights(from, to, departure);
    if (formData.return) generateFlights(to, from, formData.return);

    setTickets(flightsGenerated);
    setMessage(`We found ${flightsGenerated.length} flights for you!`);
    setShowForm(false);
    setBookedTicketId(null);
  };

  const handleBookTicket = async (id) => {
    const t = tickets.find((x) => x.id === id);
    if (!t) return;

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: "processing" } : ticket
      )
    );

    const payload = {
      ticketId: uuidv4(),
      airline: t.airline,
      flightId: t.id,
      from: t.from,
      to: t.to,
      departure: t.departure,
      departureTime: t.departureTime,
      arrivalTime: t.arrivalTime,
      duration: t.duration,
      travelClass: t.travelClass,
      passengers: t.passengers,
      price: t.price,
      customerName: "Demo User",
      customerEmail: "demo@example.com",
      aadhar: t.aadhar, // ✅ Aadhaar sent to backend
    };

    try {
      const response = await fetch("http://localhost:8000/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const savedTicket = await response.json();

      setSelectedTicket({ ...t, _dbId: savedTicket._id });
      setShowPayment(true);

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id ? { ...ticket, status: "booked" } : ticket
        )
      );
    } catch (err) {
      console.error("Booking error:", err);
      setMessage("Booking failed. Please try again.");
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id ? { ...ticket, status: "available" } : ticket
        )
      );
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    setBookedTicketId(selectedTicket.id);
    setConfirmationMessage(
      `Booking confirmed with ${selectedTicket.airline}! Txn: MOCK123`
    );
    setShowPayment(false);
    setTimeout(() => setConfirmationMessage(""), 5000);
  };

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
    <div className="EzBooking-wrapper">
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
            <input
              type="text"
              name="from"
              placeholder="From"
              value={formData.from}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="to"
              placeholder="To"
              value={formData.to}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="date"
              name="departure"
              value={formData.departure}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="return"
              value={formData.return}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <input
              type="number"
              name="passengers"
              min="1"
              max="10"
              value={formData.passengers}
              onChange={handleChange}
              required
            />
            <select
              name="travelClass"
              value={formData.travelClass}
              onChange={handleChange}
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
          {/* ✅ Aadhaar Input */}
          <div className="form-row">
            <input
              type="text"
              name="aadhar"
              placeholder="Enter Aadhaar Number"
              value={formData.aadhar}
              onChange={handleChange}
              required
              maxLength="12"
              pattern="\d{12}"
              title="Enter valid 12-digit Aadhaar number"
            />
          </div>
          <button type="submit">Search Flights</button>
        </form>
      ) : showPayment ? (
        <div className="payment-container">
          <h3>Payment for {selectedTicket?.airline}</h3>
          <form onSubmit={handlePaymentSubmit}>
            <div>
              {["credit", "debit", "upi", "netbanking"].map((m) => (
                <label key={m}>
                  <input
                    type="radio"
                    value={m}
                    checked={paymentMethod === m}
                    onChange={() => setPaymentMethod(m)}
                  />
                  {m}
                </label>
              ))}
            </div>
            <button type="submit">Pay Now</button>
            <button type="button" onClick={() => setShowPayment(false)}>
              Back
            </button>
          </form>
        </div>
      ) : (
        <div className="tickets-container">
          {tickets.map((t) => (
            <div key={t.id} className="ticket-card">
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
              <p>Aadhaar: {t.aadhar}</p> {/* ✅ Show Aadhaar */}
              <p>Price: ₹{t.price}</p>
              {t.status === "available" && (
                <>
                  <button onClick={() => handleBookTicket(t.id)}>
                    Book Now
                  </button>
                  <button onClick={() => handleCancelTicket(t.id)}>
                    Cancel
                  </button>
                </>
              )}
              {t.status === "processing" && <p>Booking in progress...</p>}
              {t.status === "booked" && <p>Ticket Confirmed</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EzBooking;
