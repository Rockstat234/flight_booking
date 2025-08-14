import React, { useState } from "react";
import { searchFlights, createBooking, payBooking } from "../api";

export default function FlightBooking() {
  const [formData, setFormData] = useState({ from: "", to: "", date: "" });
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showForm, setShowForm] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [bookedTicketId, setBookedTicketId] = useState(null);

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

  // 🧾 Create booking
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
    <div>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="From"
            value={formData.from}
            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          />
          <input
            placeholder="To"
            value={formData.to}
            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <button type="submit">Search Flights</button>
        </form>
      )}

      {message && <p>{message}</p>}

      {!showForm &&
        tickets.map((t) => (
          <div key={t.id}>
            <p>{t.airline} - {t.price}₹</p>
            <button onClick={() => handleBookTicket(t.id)}>Book</button>
          </div>
        ))}

      {showPayment && (
        <form onSubmit={handlePaymentSubmit}>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
          </select>
          <button type="submit">Pay</button>
        </form>
      )}

      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
}
