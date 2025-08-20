import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import './DestinationDetails.css';

const DestinationDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [destinationData, setDestinationData] = useState(state?.destinationData || null);
  const [loading, setLoading] = useState(!state?.destinationData);
  const [message, setMessage] = useState("");

  // ✅ जर state मधून data आला नाही तर backend वरून fetch करणार
  useEffect(() => {
    if (!destinationData && id) {
      const fetchDestination = async () => {
        try {
          const res = await fetch(`http://localhost:8000/api/destinations/${id}`);
          const data = await res.json();
          setDestinationData(data.data || data); // API response मध्ये data आहे का check
        } catch (error) {
          console.error("❌ Error fetching destination:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDestination();
    }
  }, [id, destinationData]);

  if (loading) return <div className="loading">Loading destination details...</div>;
  if (!destinationData) return <div className="error-state">❌ Destination Not Found</div>;

  const {
    _id,
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

  /* ✅ Book Flight Function */
  const handleBooking = async () => {
    try {
      const bookingData = {
        userName: "Test User", // 👉 नंतर login झालेल्या user चे नाव
        email: "test@example.com", // 👉 user email
        destinationId: _id,        // ✅ आता ObjectId जातोय
        passengers: 1,
        travelClass: "economy",
        price: parseInt(price.toString().replace(/[^0-9]/g, "")) || 0,
      };

      const res = await axios.post("http://localhost:8000/api/bookings", bookingData);
      setMessage(res.data.message || "✅ Booking Successful!");
    } catch (err) {
      setMessage("❌ Booking failed, please try again.");
      console.error(err);
    }
  };

  return (
    <div className="destination-details">
      <div className="detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to All Destinations
        </button>
        <h1>{city}, {country}</h1>
      </div>

      <div className="detail-hero">
        <img src={process.env.PUBLIC_URL + image} alt={`${city}, ${country}`} />
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
            <div className="info-card"><h3>Best Time to Visit</h3><p>{bestTime}</p></div>
            <div className="info-card"><h3>Flight Duration</h3><p>{flightDuration}</p></div>
            <div className="info-card"><h3>Distance from Delhi</h3><p>{distance}</p></div>
          </div>
        </section>

        {/* ✅ Action Buttons */}
        <div className="action-buttons">
          <button className="book-btn" onClick={handleBooking}>
            Book Flight for {price}
          </button>
          <button className="save-btn">Save for Later</button>
        </div>

        {message && <p className="booking-message">{message}</p>}
      </div>
    </div>
  );
};

export default DestinationDetails;
