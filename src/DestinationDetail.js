import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DestinationDetails.css';

const DestinationDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const { destinationData } = state || {};
  
  if (!destinationData) {
    return (
      <div className="error-state">
        <h2>Destination Not Found</h2>
        <p>We couldn't load the destination details.</p>
        <button 
          className="back-btn"
          onClick={() => navigate('/wherewefly')}
        >
          Back to Destinations
        </button>
      </div>
    );
  }

  const {
    city = '',
    country = '',
    image = '',
    distance = '',
    flightDuration = '',
    price = '',
    description = '',
    highlights = [],
    bestTime = ''
  } = destinationData;

  return (
    <div className="destination-details">
      <div className="detail-header">
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back to All Destinations
        </button>
        <h1>{city}, {country}</h1>
      </div>

      <div className="detail-hero">
        <img 
          src={process.env.PUBLIC_URL + image} 
          alt={`${city}, ${country}`}
        />
        <div className="hero-overlay">
          <div className="price-tag">{price}</div>
          <div className="flight-meta">
            <span>{distance}</span>
            <span>•</span>
            <span>{flightDuration}</span>
          </div>
        </div>
      </div>

      <div className="detail-content">
        <section className="about-section">
          <h2>About {city}</h2>
          <p>{description}</p>
        </section>

        <section className="highlights-section">
          <h2>Top Attractions</h2>
          <div className="highlights-grid">
            {highlights.map((item, index) => (
              <div className="highlight-card" key={index}>
                <div className="highlight-number">{index + 1}</div>
                <div className="highlight-text">{item}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="travel-info">
          <h2>Travel Information</h2>
          <div className="info-cards">
            <div className="info-card">
              <h3>Best Time to Visit</h3>
              <p>{bestTime}</p>
            </div>
            <div className="info-card">
              <h3>Flight Duration</h3>
              <p>{flightDuration}</p>
            </div>
            <div className="info-card">
              <h3>Distance from Delhi</h3>
              <p>{distance}</p>
            </div>
          </div>
        </section>

        <div className="action-buttons">
          <button className="book-btn">
            Book Flight for {price}
          </button>
          <button className="save-btn">
            Save for Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;