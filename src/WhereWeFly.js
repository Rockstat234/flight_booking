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
      description: "The city that never sleeps with iconic landmarks like Times Square and Statue of Liberty",
      highlights: ["Statue of Liberty", "Central Park", "Broadway shows"],
      bestTime: "April-June, September-November"
    },
    {
      id: 2,
      city: "London",
      country: "UK",
      image: "/images/london.jpg",
      distance: "6,700 km",
      flightDuration: "8-9 hrs",
      price: "₹35,000",
      description: "Historic capital with Buckingham Palace and the London Eye",
      highlights: ["Buckingham Palace", "London Eye", "Tower Bridge"],
      bestTime: "May-September"
    },
    {
      id: 3,
      city: "Tokyo",
      country: "Japan",
      image: "/images/tokyo.jpg",
      distance: "5,800 km",
      flightDuration: "7-8 hrs",
      price: "₹38,000",
      description: "Vibrant metropolis blending tradition and cutting-edge technology",
      highlights: ["Shibuya Crossing", "Tokyo Skytree", "Senso-ji Temple"],
      bestTime: "March-May, September-November"
    },
    {
      id: 4,
      city: "Paris",
      country: "France",
      image: "/images/paris.jpg",
      distance: "6,700 km",
      flightDuration: "8-9 hrs",
      price: "₹42,000",
      description: "Romantic city of lights with the Eiffel Tower and Louvre",
      highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
      bestTime: "April-June, September-October"
    },
    {
      id: 5,
      city: "Dubai",
      country: "UAE",
      image: "/images/dubai.jpg",
      distance: "2,200 km",
      flightDuration: "3-4 hrs",
      price: "₹18,000",
      description: "Ultra-modern desert city with Burj Khalifa and Palm Islands",
      highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall"],
      bestTime: "November-March"
    },
    {
      id: 6,
      city: "Singapore",
      country: "Singapore",
      image: "/images/singapore.jpg",
      distance: "3,900 km",
      flightDuration: "5-6 hrs",
      price: "₹25,000",
      description: "Garden city with futuristic architecture and diverse culture",
      highlights: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island"],
      bestTime: "February-April"
    },
    {
      id: 7,
      city: "Bangkok",
      country: "Thailand",
      image: "/images/bangkok.jpg",
      distance: "2,500 km",
      flightDuration: "3-4 hrs",
      price: "₹20,000",
      description: "Vibrant city known for temples, street food and nightlife",
      highlights: ["Grand Palace", "Chatuchak Market", "Wat Arun"],
      bestTime: "November-February"
    },
    {
      id: 8,
      city: "Istanbul",
      country: "Turkey",
      image: "/images/istanbul.jpg",
      distance: "4,200 km",
      flightDuration: "6-7 hrs",
      price: "₹30,000",
      description: "Crossroads of Europe and Asia with rich history",
      highlights: ["Hagia Sophia", "Blue Mosque", "Grand Bazaar"],
      bestTime: "April-May, September-October"
    },
    {
      id: 9,
      city: "Rome",
      country: "Italy",
      image: "/images/rome.jpg",
      distance: "5,800 km",
      flightDuration: "8-9 hrs",
      price: "₹40,000",
      description: "Eternal city with ancient ruins and Renaissance art",
      highlights: ["Colosseum", "Vatican City", "Trevi Fountain"],
      bestTime: "April-June, September-October"
    },
    {
      id: 10,
      city: "Sydney",
      country: "Australia",
      image: "/images/sydney.jpg",
      distance: "10,500 km",
      flightDuration: "12-14 hrs",
      price: "₹50,000",
      description: "Stunning harbor city with the Opera House and Bondi Beach",
      highlights: ["Sydney Opera House", "Bondi Beach", "Harbour Bridge"],
      bestTime: "September-November, March-May"
    },
    {
      id: 11,
      city: "Cape Town",
      country: "South Africa",
      image: "/images/capetown.jpg",
      distance: "8,900 km",
      flightDuration: "10-11 hrs",
      price: "₹48,000",
      description: "Stunning coastal city with Table Mountain and vineyards",
      highlights: ["Table Mountain", "Robben Island", "Cape Point"],
      bestTime: "November-February"
    },
    {
      id: 12,
      city: "Toronto",
      country: "Canada",
      image: "/images/toronto.jpg",
      distance: "11,500 km",
      flightDuration: "14-16 hrs",
      price: "₹52,000",
      description: "Cosmopolitan city with CN Tower and Niagara Falls nearby",
      highlights: ["CN Tower", "Niagara Falls", "Royal Ontario Museum"],
      bestTime: "May-September"
    }
  ];

  const handleExploreClick = (destination) => {
    navigate(`/destination/${destination.id}`, { 
      state: { destinationData: destination }
    });
  };

  return (
    <div className="where-we-fly">
      <div className="hero-section">
        <h1>Where We Fly</h1>
        <p>Discover our global network of premium destinations</p>
      </div>

      <div className="destination-grid">
        {destinations.map((destination) => (
          <div className="destination-card" key={destination.id}>
            <div className="card-image">
              <img 
                src={process.env.PUBLIC_URL + destination.image} 
                alt={`${destination.city}, ${destination.country}`}
              />
              <div className="price-badge">{destination.price}</div>
              <div className="city-overlay">
                <h3>{destination.city}</h3>
                <p>{destination.country}</p>
              </div>
            </div>
            <div className="card-content">
              <div className="flight-info">
                <div className="info-item">
                  <span className="label">Distance:</span>
                  <span>{destination.distance}</span>
                </div>
                <div className="info-item">
                  <span className="label">Flight Time:</span>
                  <span>{destination.flightDuration}</span>
                </div>
              </div>
              <button 
                className="explore-btn"
                onClick={() => handleExploreClick(destination)}
              >
                Explore Destination
                <span className="arrow">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhereWeFly;