// src/pages/FlightsPage.js
import React, { useState } from "react";
import { searchFlights, createBooking, payBooking } from "../api";

export default function FlightsPage() {
  const [formData, setFormData] = useState({});
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  // 🔎 Search flights
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setConfirmationMessage("");
    try {
      const { count, flights } = await searchFlights(formData);
      setTickets(flights);
      setMessage(`We found ${count} flights for you!`);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch flights. Please check backend (8000) & try again.");
    }
  };

  // 🧾 Book ticket
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

  // 💳 Payment
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const { booking } = await payBooking(selectedTicket._dbId, paymentMethod);
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
    <div>
      <h1>Flights Booking</h1>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="From"
            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          />
          <input
            placeholder="To"
            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          />
          <button type="submit">Search Flights</button>
        </form>
      )}

      {message && <p>{message}</p>}

      {tickets.length > 0 &&
        tickets.map((t) => (
          <div key={t.id}>
            <p>{t.airline} — {t.price}₹</p>
            <button onClick={() => handleBookTicket(t.id)}>Book</button>
          </div>
        ))}

      {showPayment && (
        <form onSubmit={handlePaymentSubmit}>
          <input
            placeholder="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <button type="submit">Pay</button>
        </form>
      )}

      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
}
