import React, { useEffect, useState } from "react";

function Flights() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/flights")
      .then((res) => res.json())
      .then((data) => setFlights(data))
      .catch(() => setError("Failed to fetch flights. Please check backend (8000)."));
  }, []);

  return (
    <div>
      <h1>✈️ Available Flights</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {flights.map((f, idx) => (
          <li key={idx}>
            {f.flightNumber} - {f.origin} → {f.destination} ({f.date}) 💰 {f.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Flights;
