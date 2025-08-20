import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FlightList() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/flights?${searchParams}`);
        setFlights(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFlights();
  }, [location.search]);

  const handleSelectFlight = (flightId) => {
    navigate(`/passengers?flightId=${flightId}`);
  };

  if (loading) return <div>Loading flights...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flight-list">
      <h2>Available Flights</h2>
      {flights.length === 0 ? (
        <div className="alert alert-info">No flights found for your search criteria.</div>
      ) : (
        <div className="list-group">
          {flights.map(flight => (
            <div key={flight._id} className="list-group-item mb-3">
              <div className="d-flex justify-content-between">
                <div>
                  <h5>{flight.airline} - {flight.flightNumber}</h5>
                  <div>
                    {new Date(flight.departure.time).toLocaleTimeString()} - 
                    {new Date(flight.arrival.time).toLocaleTimeString()}
                  </div>
                  <div>
                    {flight.departure.airport} → {flight.arrival.airport}
                  </div>
                </div>
                <div className="text-right">
                  <h4>${flight.price}</h4>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleSelectFlight(flight._id)}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlightList;