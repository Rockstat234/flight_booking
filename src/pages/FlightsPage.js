import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingForm from "../components/BookingForm";

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/flights")
      .then((res) => {
        setFlights(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Flights fetch error:", err.message);
        setError("Failed to fetch flights");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading flights...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Flights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flights.map((flight) => (
          <div
            key={flight._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">
              {flight.from} → {flight.to}
            </h2>
            <p>Departure: {new Date(flight.departure).toLocaleString()}</p>
            <p>Price: ₹{flight.price}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setSelectedFlight(flight)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {selectedFlight && (
        <div className="mt-8">
          <BookingForm flight={selectedFlight} onClose={() => setSelectedFlight(null)} />
        </div>
      )}
    </div>
  );
}
