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
          setDestinationData(data.data || data);
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
    bestTime = '',
    protectedLocations = []
  } = destinationData;

  /* ✅ City-specific defaults */
  const cityDefaults = {
    London: {
      bestTime: "April to June or September to October",
      highlights: ["Buckingham Palace", "London Eye", "Tower of London"],
      protected: ["Natural History Museum", "UNESCO Westminster Abbey"]
    },
    Paris: {
      bestTime: "April to June or September to November",
      highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
      protected: ["Palace of Versailles", "Sainte-Chapelle"]
    },
    Tokyo: {
      bestTime: "March to May (Cherry Blossom) or October to November",
      highlights: ["Tokyo Tower", "Shinjuku Gyoen", "Meiji Shrine"],
      protected: ["Mount Fuji National Park", "Imperial Palace Grounds"]
    },
    NewYork: {
      bestTime: "April to June or September to November",
      highlights: ["Statue of Liberty", "Central Park", "Times Square"],
      protected: ["Ellis Island Museum", "UNESCO Statue of Liberty Site"]
    },
    Dubai: {
      bestTime: "November to March",
      highlights: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah"],
      protected: ["Dubai Desert Conservation Reserve"]
    },
    Singapore: {
      bestTime: "February to April or July to September",
      highlights: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island"],
      protected: ["Bukit Timah Nature Reserve", "Sungei Buloh Wetland Reserve"]
    },
    Sydney: {
      bestTime: "September to November or March to May",
      highlights: ["Sydney Opera House", "Harbour Bridge", "Bondi Beach"],
      protected: ["Blue Mountains National Park"]
    },
    Rome: {
      bestTime: "April to June or September to October",
      highlights: ["Colosseum", "Roman Forum", "Trevi Fountain"],
      protected: ["UNESCO Vatican City", "Pantheon"]
    },
    Bangkok: {
      bestTime: "November to February",
      highlights: ["Grand Palace", "Wat Arun", "Chatuchak Market"],
      protected: ["Ayutthaya Historical Park"]
    }
  };

  const defaults = cityDefaults[city] || {
    bestTime: "March to May or September to November",
    highlights: ["Famous Landmark 1", "Famous Landmark 2"],
    protected: ["Protected Site 1", "Protected Site 2"]
  };

  /* ✅ Book Flight Function */
  const handleBooking = async () => {
    try {
      const bookingData = {
        userName: "Test User",
        email: "test@example.com",
        destinationId: _id,
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
        {/* ✅ About Section */}
        <section className="about-section">
          <h2>About {city}</h2>
          <p>{description}</p>
        </section>

        {/* ✅ Best Time Section */}
        <section className="besttime-section">
          <h2>Best Time to Visit</h2>
          <p>{bestTime || defaults.bestTime}</p>
        </section>

        {/* ✅ Top Attractions Section */}
        <section className="highlights-section">
          <h2>Top Attractions</h2>
          <div className="highlights-grid">
            {(highlights.length > 0 ? highlights : defaults.highlights).map((item, index) => (
              <div className="highlight-card" key={index}>
                <div className="highlight-number">{index + 1}</div>
                <div className="highlight-text">{item}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ Protected Locations Section */}
        <section className="protected-section">
          <h2>Protected Locations</h2>
          <div className="protected-grid">
            {(protectedLocations.length > 0 ? protectedLocations : defaults.protected).map((place, index) => (
              <div className="protected-card" key={index}>
                <div className="protected-icon">🛡️</div>
                <div className="protected-text">{place}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ Travel Information Section */}
        <section className="travel-info">
          <h2>Travel Information</h2>
          <div className="info-cards">
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
