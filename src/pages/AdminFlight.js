import React, { useState, useEffect } from "react";
import { searchFlights } from "../api";

function AdminFlights() {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({
    flightNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    airline: "",
    price: ""
  });

  // सर्व flights load करायला
  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    const result = await searchFlights({});
    setFlights(result.flights);
  };

  // Add Flight
  const handleAdd = async () => {
    await fetch("http://localhost:8000/api/flights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Flight Added!");
    setForm({ flightNumber: "", from: "", to: "", departureTime: "", arrivalTime: "", airline: "", price: "" });
    loadFlights();
  };

  // Delete Flight
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/api/flights/${id}`, { method: "DELETE" });
    alert("Flight Deleted!");
    loadFlights();
  };

  return (
    <div className="p-4">
      <h2>✈ Admin Panel – Manage Flights</h2>

      <div>
        <input placeholder="Flight Number" value={form.flightNumber} onChange={(e) => setForm({ ...form, flightNumber: e.target.value })} />
        <input placeholder="From" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
        <input placeholder="To" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
        <input placeholder="Departure Time" value={form.departureTime} onChange={(e) => setForm({ ...form, departureTime: e.target.value })} />
        <input placeholder="Arrival Time" value={form.arrivalTime} onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })} />
        <input placeholder="Airline" value={form.airline} onChange={(e) => setForm({ ...form, airline: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <button onClick={handleAdd}>Add Flight</button>
      </div>

      <h3>Existing Flights</h3>
      <ul>
        {flights.map((f) => (
          <li key={f._id}>
            {f.flightNumber} – {f.from} → {f.to} ({f.airline}) ₹{f.price}
            <button onClick={() => handleDelete(f._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminFlights;
