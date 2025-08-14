import React, { useState } from 'react';
import axios from 'axios';

const AddFlight = () => {
  const [flight, setFlight] = useState({
    airline: '',
    flightNumber: '',
    from: '',
    to: '',
    departureDate: '',
    departureTime: '',
    arrivalTime: '',
    class: '',
    price: ''
  });

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/flights', flight);
      alert('Flight added successfully!');
      setFlight({
        airline: '',
        flightNumber: '',
        from: '',
        to: '',
        departureDate: '',
        departureTime: '',
        arrivalTime: '',
        class: '',
        price: ''
      });
    } catch (error) {
      console.error('Error adding flight:', error);
      alert('Failed to add flight');
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Add Flight</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="airline" placeholder="Airline" value={flight.airline} onChange={handleChange} required />
        <input type="text" name="flightNumber" placeholder="Flight Number" value={flight.flightNumber} onChange={handleChange} required />
        <input type="text" name="from" placeholder="From" value={flight.from} onChange={handleChange} required />
        <input type="text" name="to" placeholder="To" value={flight.to} onChange={handleChange} required />
        <input type="date" name="departureDate" value={flight.departureDate} onChange={handleChange} required />
        <input type="time" name="departureTime" value={flight.departureTime} onChange={handleChange} required />
        <input type="time" name="arrivalTime" value={flight.arrivalTime} onChange={handleChange} required />
        <input type="text" name="class" placeholder="Class (economy/business)" value={flight.class} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={flight.price} onChange={handleChange} required />
        <button type="submit">Add Flight</button>
      </form>
    </div>
  );
};

export default AddFlight;
