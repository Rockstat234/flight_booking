import React, { useEffect, useState } from "react";
import axios from "axios";

function HotelBooking() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/hotels")
      .then(res => {
        setHotels(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load hotels");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p style={{color: "red"}}>{error}</p>;

  return (
    <div>
      <h2>Available Hotels</h2>
      <ul>
        {hotels.map(hotel => (
          <li key={hotel._id}>
            <strong>{hotel.name}</strong> - {hotel.city} - ₹{hotel.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HotelBooking;
