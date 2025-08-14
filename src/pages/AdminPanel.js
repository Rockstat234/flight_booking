import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/flights")
      .then(response => setFlights(response.data))
      .catch(error => console.error("Error fetching flights:", error));
  }, []);

  return (
    <div>
      <h2>Admin Panel - All Flights</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Airline</th>
            <th>Flight Number</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight._id}>
              <td>{flight.airline}</td>
              <td>{flight.flightNumber}</td>
              <td>{flight.from}</td>
              <td>{flight.to}</td>
              <td>{flight.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
