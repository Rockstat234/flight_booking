import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WhereWeFly.css';

const WhereWeFly = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      id: 1,
      city: "New York",
      country: "USA",
      image: "/images/newyork.jpg",
      distance: "11,800 km",
      flightDuration: "15-17 hrs",
      price: "₹45,000",
      description: "The city that never sleeps with iconic landmarks like Times Square and Statue of Liberty"
    },
    {
      id: 2,
      city: "London",
      country: "UK",
      image: "/images/london.jpg",
      distance: "6,700 km",
      flightDuration: "8-9 hrs",
      price: "₹35,000",
      description: "Historic capital with Buckingham Palace and the London Eye"
    },
    {
      id: 3,
      city: "Tokyo",
      country: "Japan",
      image: "/images/tokyo.jpg",
      distance: "5,800 km",
      flightDuration: "7-8 hrs",
      price: "₹38,000",
      description: "Vibrant metropolis blending tradition and cutting-edge technology"
    },
    {
      id: 4,
      city: "Paris",
      country: "France",
      image: "/images/paris.jpg",
      distance: "6,700 km",
      flightDuration: "8-9 hrs",
      price: "₹42,000",
      description: "Romantic city of lights with the Eiffel Tower and Louvre"
    },
    {
      id: 5,
      city: "Dubai",
      country: "UAE",
      image: "/images/dubai.jpg",
      distance: "2,200 km",
      flightDuration: "3-4 hrs",
      price: "₹18,000",
      description: "Ultra-modern desert city with Burj Khalifa and Palm Islands"
    },
    {
      id: 6,
      city: "Singapore",
      country: "Singapore",
      image: "/images/singapore.jpg",
      distance: "3,900 km",
      flightDuration: "5-6 hrs",
      price: "₹25,000",
      description: "Garden city with futuristic architecture and diverse culture"
    },
    {
      id: 7,
      city: "Bangkok",
      country: "Thailand",
      image: "/images/bangkok.jpg",
      distance: "2,500 km",
      flightDuration: "3-4 hrs",
      price: "₹20,000",
      description: "Vibrant city known for temples, street food and nightlife"
    },
    {
      id: 8,
      city: "Istanbul",
      country: "Turkey",
      image: "/images/istanbul.jpg",
      distance: "4,200 km",
      flightDuration: "6-7 hrs",
      price: "₹30,000",
      description: "Crossroads of Europe and Asia with rich history"
    }
  ];

  const handleExploreClick = (destination) => {
    navigate(`/destination/${destination.id}`, { 
      state: { destinationData: destination }
    });
  };

  return (
    <div className="where-we-fly">
      <div className="hero-banner">
        <h1>Where We Fly</h1>
        <p>Discover our global network of premium destinations</p>
      </div>

      <div className="destinations-container">
        {destinations.map((destination) => (
          <div className="destination-card" key={destination.id}>
            <div className="card-image">
              <img 
                src={process.env.PUBLIC_URL + destination.image} 
                alt={`${destination.city}, ${destination.country}`}
              />
              <div className="city-label">
                <h3>{destination.city}</h3>
                <p>{destination.country}</p>
              </div>
            </div>
            
            <div className="card-details">
              <div className="flight-info">
                <div className="info-item">
                  <span className="label">Distance:</span>
                  <span>{destination.distance}</span>
                </div>
                <div className="info-item">
                  <span className="label">Flight Time:</span>
                  <span>{destination.flightDuration}</span>
                </div>
                <div className="info-item">
                  <span className="label">Price From:</span>
                  <span className="price">{destination.price}</span>
                </div>
              </div>
              
              <p className="description">{destination.description}</p>
              
              <button 
                className="explore-btn"
                onClick={() => handleExploreClick(destination)}
              >
                Explore Destination
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhereWeFly;