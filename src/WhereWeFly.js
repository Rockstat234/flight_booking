import React, { useState } from "react";
import "./WhereWeFly.css";

const WhereWeFly = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); // Initially show 6 destinations

  const destinations = [
    {
      city: "New York",
      country: "USA",
      image: "/images/newyork.jpg",
      distance: "11,800 km from Delhi",
      flightDuration: "15-17 hrs",
      description: "The city that never sleeps with iconic landmarks like Times Square and Statue of Liberty",
      flights: "Daily flights from Delhi, Mumbai",
      special: ["Statue of Liberty", "Central Park", "Broadway shows", "Empire State Building"],
      bestTime: "April-June, September-November",
      price: "₹45,000"
    },
    {
      city: "London",
      country: "UK",
      image: "/images/london.jpg",
      distance: "6,700 km from Delhi",
      flightDuration: "8-9 hrs",
      description: "Historic capital with Buckingham Palace and the London Eye",
      flights: "10 flights weekly from major Indian cities",
      special: ["Buckingham Palace", "London Eye", "Tower Bridge", "British Museum"],
      bestTime: "May-September",
      price: "₹35,000"
    },
    {
      city: "Tokyo",
      country: "Japan",
      image: "/images/tokyo.jpg",
      distance: "5,800 km from Delhi",
      flightDuration: "7-8 hrs",
      description: "Vibrant metropolis blending tradition and cutting-edge technology",
      flights: "Direct flights from Delhi, Bangalore",
      special: ["Shibuya Crossing", "Tokyo Skytree", "Senso-ji Temple", "Tsukiji Market"],
      bestTime: "March-May, September-November",
      price: "₹38,000"
    },
    {
      city: "Sydney",
      country: "Australia",
      image: "/images/sydney.jpg",
      distance: "10,500 km from Delhi",
      flightDuration: "12-14 hrs",
      description: "Stunning harbor city with the Opera House and Bondi Beach",
      flights: "5 flights weekly from Mumbai, Delhi",
      special: ["Sydney Opera House", "Bondi Beach", "Harbour Bridge", "Taronga Zoo"],
      bestTime: "September-November, March-May",
      price: "₹50,000"
    },
    {
      city: "Paris",
      country: "France",
      image: "/images/paris.jpg",
      distance: "6,700 km from Delhi",
      flightDuration: "8-9 hrs",
      description: "Romantic city of lights with the Eiffel Tower and Louvre",
      flights: "Daily flights from Delhi",
      special: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral", "Montmartre"],
      bestTime: "April-June, September-October",
      price: "₹42,000"
    },
    {
      city: "Dubai",
      country: "UAE",
      image: "/images/dubai.jpg",
      distance: "2,200 km from Delhi",
      flightDuration: "3-4 hrs",
      description: "Ultra-modern desert city with Burj Khalifa and Palm Islands",
      flights: "Multiple daily flights from all major Indian cities",
      special: ["Burj Khalifa", "Desert Safari", "Dubai Mall", "Palm Jumeirah"],
      bestTime: "November-March",
      price: "₹18,000"
    },
    {
      city: "Singapore",
      country: "Singapore",
      image: "/images/singapore.jpg",
      distance: "3,900 km from Delhi",
      flightDuration: "5-6 hrs",
      description: "Garden city with futuristic architecture and diverse culture",
      flights: "Multiple daily flights from all metros",
      special: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island", "Chinatown"],
      bestTime: "February-April",
      price: "₹25,000"
    },
    {
      city: "Bangkok",
      country: "Thailand",
      image: "/images/bangkok.jpg",
      distance: "2,500 km from Delhi",
      flightDuration: "3-4 hrs",
      description: "Vibrant city known for temples, street food and nightlife",
      flights: "Daily flights from all major cities",
      special: ["Grand Palace", "Chatuchak Market", "Wat Arun", "Floating Markets"],
      bestTime: "November-February",
      price: "₹20,000"
    },
    {
      city: "Istanbul",
      country: "Turkey",
      image: "/images/istanbul.jpg",
      distance: "4,200 km from Delhi",
      flightDuration: "6-7 hrs",
      description: "Crossroads of Europe and Asia with rich history",
      flights: "Daily flights from Delhi, Mumbai",
      special: ["Hagia Sophia", "Blue Mosque", "Grand Bazaar", "Bosphorus Cruise"],
      bestTime: "April-May, September-October",
      price: "₹30,000"
    },
    {
      city: "Rome",
      country: "Italy",
      image: "/images/rome.jpg",
      distance: "5,800 km from Delhi",
      flightDuration: "8-9 hrs",
      description: "Eternal city with ancient ruins and Renaissance art",
      flights: "Daily flights from Delhi",
      special: ["Colosseum", "Vatican City", "Trevi Fountain", "Pantheon"],
      bestTime: "April-June, September-October",
      price: "₹40,000"
    },
    {
      city: "Cape Town",
      country: "South Africa",
      image: "/images/capetown.jpg",
      distance: "8,900 km from Delhi",
      flightDuration: "10-11 hrs",
      description: "Stunning coastal city with Table Mountain and vineyards",
      flights: "5 flights weekly from Mumbai",
      special: ["Table Mountain", "Robben Island", "Cape Point", "Kirstenbosch Gardens"],
      bestTime: "November-February",
      price: "₹48,000"
    },
    {
      city: "Toronto",
      country: "Canada",
      image: "/images/toronto.jpg",
      distance: "11,500 km from Delhi",
      flightDuration: "14-16 hrs",
      description: "Cosmopolitan city with CN Tower and Niagara Falls nearby",
      flights: "Daily flights from Delhi",
      special: ["CN Tower", "Niagara Falls", "Royal Ontario Museum", "Distillery District"],
      bestTime: "May-September",
      price: "₹52,000"
    }
  ];

  const handleCardClick = (destination) => {
    setSelectedDestination(destination);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showMoreDestinations = () => {
    setVisibleCount(prev => prev + 6); // Show 6 more each click
  };

  return (
    <div className="fly-section">
      <div className="fly-container">
        <div className="fly-header">
          <h1>WHERE WE FLY</h1>
          <p>Discover Bharat Yatra's premium destinations</p>
        </div>

        <div className="fly-grid">
          {destinations.slice(0, visibleCount).map((item, i) => (
            <div 
              className="fly-card" 
              key={i}
              onClick={() => handleCardClick(item)}
            >
              <div className="card-image-container">
                <img src={process.env.PUBLIC_URL + item.image} alt={item.city} />
                <div className="card-overlay">
                  <h3>{item.city}, {item.country}</h3>
                  <button className="explore-btn">
                    <span>Explore</span>
                    <span className="arrow-icon">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Only show if more destinations available */}
        {visibleCount < destinations.length && (
          <div className="load-more-container">
            <button 
              className="explore-btn load-more-btn"
              onClick={showMoreDestinations}
            >
              Explore More Destinations
            </button>
          </div>
        )}
      </div>

      {showModal && selectedDestination && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>×</button>
            <div className="modal-header">
              <h2>{selectedDestination.city}, {selectedDestination.country}</h2>
              <div className="modal-image-container">
                <img 
                  src={process.env.PUBLIC_URL + selectedDestination.image} 
                  alt={selectedDestination.city}
                />
                <div className="modal-badges">
                  <div className="modal-badge"> {selectedDestination.distance}</div>
                  <div className="modal-badge">{selectedDestination.flightDuration}</div>
                  <div className="modal-badge price"> {selectedDestination.price}</div>
                </div>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>About {selectedDestination.city}</h3>
                <p className="modal-description">{selectedDestination.description}</p>
                <div className="special-attractions">
                  <h4>Must-Visit Attractions:</h4>
                  <ul className="attractions-list">
                    {selectedDestination.special.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="modal-section flight-info">
                <h3>Travel Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Best Time to Visit:</span>
                    <span className="info-value">{selectedDestination.bestTime}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Available Flights:</span>
                    <span className="info-value">{selectedDestination.flights}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Flight Frequency:</span>
                    <span className="info-value">Daily/Multiple weekly</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Baggage Allowance:</span>
                    <span className="info-value">2 pieces (23kg each)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="explore-btn book-now-btn">
                <span>Book Now for {selectedDestination.price}</span>
                <span className="arrow-icon">→</span>
              </button>
              <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhereWeFly;