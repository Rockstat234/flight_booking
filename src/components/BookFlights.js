import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import './BookFlights.css';

function BookFlights() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tripType: 'oneway',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });

  const popularDestinations = [
    { name: 'Delhi (DEL)', code: 'DEL' },
    { name: 'Mumbai (BOM)', code: 'BOM' },
    { name: 'Bangalore (BLR)', code: 'BLR' },
    { name: 'Hyderabad (HYD)', code: 'HYD' },
    { name: 'Dubai (DXB)', code: 'DXB' },
    { name: 'Singapore (SIN)', code: 'SIN' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    if (!formData.from || !formData.to || !formData.departureDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Navigate to booking page with search parameters
    navigate(`/ezbooking?from=${formData.from}&to=${formData.to}&date=${formData.departureDate}&passengers=${formData.passengers}&class=${formData.class}`);
  };

  const handleDestinationSelect = (code) => {
    if (!formData.from) {
      setFormData(prev => ({ ...prev, from: code }));
    } else if (!formData.to) {
      setFormData(prev => ({ ...prev, to: code }));
    }
  };

  return (
    <div className="book-flights-container">
      <h1>Book Your Flight</h1>
      <p className="subtitle">Find and book flights to destinations across India and beyond</p>

      <form onSubmit={handleSubmit} className="flight-search-form">
        <div className="trip-type">
          <label>
            <input
              type="radio"
              name="tripType"
              value="oneway"
              checked={formData.tripType === 'oneway'}
              onChange={handleInputChange}
            />
            One Way
          </label>
          <label>
            <input
              type="radio"
              name="tripType"
              value="roundtrip"
              checked={formData.tripType === 'roundtrip'}
              onChange={handleInputChange}
            />
            Round Trip
          </label>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="from">
              <MapPin size={18} /> From
            </label>
            <input
              type="text"
              id="from"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              placeholder="City or Airport"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="to">
              <MapPin size={18} /> To
            </label>
            <input
              type="text"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              placeholder="City or Airport"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="departureDate">
              <Calendar size={18} /> Departure
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              required
            />
          </div>

          {formData.tripType === 'roundtrip' && (
            <div className="form-group">
              <label htmlFor="returnDate">
                <Calendar size={18} /> Return
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                required={formData.tripType === 'roundtrip'}
              />
            </div>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="passengers">
              <Users size={18} /> Passengers
            </label>
            <select
              id="passengers"
              name="passengers"
              value={formData.passengers}
              onChange={handleInputChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="class">Class</label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
        </div>

        <button type="submit" className="search-btn">
          Search Flights <ArrowRight size={18} />
        </button>
      </form>

      <div className="popular-destinations">
        <h3>Popular Destinations</h3>
        <div className="destination-grid">
          {popularDestinations.map((dest) => (
            <div
              key={dest.code}
              className="destination-card"
              onClick={() => handleDestinationSelect(dest.code)}
            >
              {dest.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookFlights;