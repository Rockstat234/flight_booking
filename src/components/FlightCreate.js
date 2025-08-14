import React, { useState } from 'react';
import { createFlight } from '../services/flightsService';

const FlightCreate = () => {
  const [flightData, setFlightData] = useState({
    flightNumber: '',
    departure: '',
    arrival: '',
    date: '',
    price: ''
  });

  const handleChange = (e) => {
    setFlightData({
      ...flightData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createFlight(flightData);
      alert('Flight created successfully!');
      console.log(response);
    } catch (error) {
      console.error('Error creating flight:', error);
    }
  };

  return (
    <div>
      <h2>Create Flight</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="flightNumber"
          placeholder="Flight Number"
          value={flightData.flightNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="departure"
          placeholder="Departure"
          value={flightData.departure}
          onChange={handleChange}
        />
        <input
          type="text"
          name="arrival"
          placeholder="Arrival"
          value={flightData.arrival}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={flightData.date}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={flightData.price}
          onChange={handleChange}
        />
        <button type="submit">Create Flight</button>
      </form>
    </div>
  );
};

export default FlightCreate;
