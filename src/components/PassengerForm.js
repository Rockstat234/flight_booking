import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PassengerForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const flightId = query.get('flightId');
  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState([{ name: '', age: '', passport: '' }]);
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/flights/${flightId}`);
        setFlight(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching flight:', err);
        setLoading(false);
      }
    };
    fetchFlight();
  }, [flightId]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleContactChange = (field, value) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', passport: '' }]);
  };

  const removePassenger = (index) => {
    const updatedPassengers = [...passengers];
    updatedPassengers.splice(index, 1);
    setPassengers(updatedPassengers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        flightId,
        passengers,
        contact,
        payment: { method: 'credit' } // Default, will be updated in payment page
      };
      navigate('/payment', { state: { bookingData } });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading) return <div>Loading flight details...</div>;
  if (!flight) return <div>Flight not found</div>;

  return (
    <div className="passenger-form">
      <h2>Passenger Details</h2>
      <div className="flight-info mb-4">
        <h4>{flight.airline} - {flight.flightNumber}</h4>
        <p>
          {flight.departure.airport} → {flight.arrival.airport} | 
          {new Date(flight.departure.time).toLocaleDateString()} | 
          ${flight.price}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <h4>Passengers</h4>
        {passengers.map((passenger, index) => (
          <div key={index} className="passenger-card mb-3 p-3 border">
            <h5>Passenger {index + 1}</h5>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    className="form-control"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                    min="1"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Passport Number (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={passenger.passport}
                    onChange={(e) => handlePassengerChange(index, 'passport', e.target.value)}
                  />
                </div>
              </div>
            </div>
            {passengers.length > 1 && (
              <button
                type="button"
                className="btn btn-sm btn-danger mt-2"
                onClick={() => removePassenger(index)}
              >
                Remove Passenger
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-4"
          onClick={addPassenger}
        >
          Add Passenger
        </button>

        <h4>Contact Information</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                value={contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4>Total: ${flight.price * passengers.length}</h4>
          <button type="submit" className="btn btn-primary">
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default PassengerForm;