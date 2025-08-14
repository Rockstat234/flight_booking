import React, { useEffect, useState } from "react";

export default function HotelList() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/hotels")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotels:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading hotels...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Hotels</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              width: "300px",
              padding: "10px"
            }}
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
            <h3>{hotel.name}</h3>
            <p>{hotel.location}</p>
            <p>₹{hotel.pricePerNight} / night</p>
            <p>{hotel.description}</p>
            <button style={{ padding: "8px", background: "blue", color: "white", border: "none", borderRadius: "4px" }}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
