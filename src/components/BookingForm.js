import React, { useState } from "react";
import axios from "axios";

export default function BookingForm({ flight, onClose }) {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    passengers: 1,
    travelClass: "economy",
    bankName: "",
    accountNumber: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/bookings", {
        ...formData,
        flightId: flight._id,
      });
      setMessage("✅ Booking successful!");
      console.log("Booking response:", res.data);
    } catch (err) {
      console.error("❌ Booking error:", err.message);
      setMessage("❌ Booking failed. Please try again.");
    }
  };

  return (
    <div className="border rounded-lg p-6 shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">
        Booking for {flight.from} → {flight.to}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={formData.userName}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="passengers"
          min="1"
          value={formData.passengers}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <select
          name="travelClass"
          value={formData.travelClass}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>

        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          value={formData.bankName}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Confirm Booking
        </button>
      </form>

      {message && <p className="mt-3 text-center">{message}</p>}

      <button
        onClick={onClose}
        className="mt-3 w-full bg-gray-500 text-white py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
