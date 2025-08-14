import React, { useState } from "react";
import "./Tariff.css";
import { ArrowRight, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tariff() {
  const navigate = useNavigate();
  const [selectedTariff, setSelectedTariff] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const tariffList = [
    {
      id: 1,
      title: "Economy Class",
      description: "Travel affordably with comfort, free meals, and in-flight entertainment.",
      price: "3,999",
      features: [
        "Seat pitch: 30-32 inches",
        "17-inch wide seats",
        "Complimentary meals",
        "In-flight entertainment",
        "Standard check-in",
        "15kg baggage allowance"
      ],
      bestFor: "Budget-conscious travelers"
    },
    {
      id: 2,
      title: "Premium Economy",
      description: "More space, more comfort, and premium check-in services.",
      price: "6,499",
      features: [
        "Seat pitch: 36-38 inches",
        "19-inch wide seats",
        "Premium meals",
        "Enhanced entertainment",
        "Priority check-in",
        "25kg baggage allowance",
        "Amenity kit"
      ],
      bestFor: "Travelers wanting extra comfort"
    },
    {
      id: 3,
      title: "Business Class",
      description: "Lie-flat seats, gourmet meals, priority boarding, and lounge access.",
      price: "12,999",
      features: [
        "Lie-flat seats",
        "22-inch wide seats",
        "Gourmet dining",
        "Premium entertainment",
        "Priority boarding",
        "35kg baggage allowance",
        "Lounge access",
        "Dedicated cabin crew"
      ],
      bestFor: "Business travelers"
    },
    {
      id: 4,
      title: "First Class",
      description: "Private suites, 5-star service, and ultimate comfort in the skies.",
      price: "21,999",
      features: [
        "Private suites",
        "24-inch wide seats",
        "5-star dining",
        "Personal entertainment",
        "Chauffeur service",
        "50kg baggage allowance",
        "Exclusive lounge",
        "Personal butler",
        "In-flight shower (on select aircraft)"
      ],
      bestFor: "Luxury seekers"
    },
  ];

  const handleBookNow = (tariffId) => {
    setSelectedTariff(tariffId);
    navigate("/ezbooking", { state: { selectedClass: tariffList.find(t => t.id === tariffId).title } });
  };

  const toggleComparison = () => {
    setShowComparison(!showComparison);
  };

  return (
    <div className="tariff-section">
      <div className="tariff-header">
        <h2>EXPLORE OUR TARIFF PLANS</h2>
        <p>Select your perfect class for a comfortable and memorable journey.</p>
        <button 
          className="compare-btn"
          onClick={toggleComparison}
        >
          {showComparison ? "Hide Comparison" : "Compare All Classes"}
        </button>
      </div>

      {showComparison ? (
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Features</th>
                {tariffList.map(tariff => (
                  <th key={tariff.id}>{tariff.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Price</td>
                {tariffList.map(tariff => (
                  <td key={tariff.id}>₹{tariff.price}</td>
                ))}
              </tr>
              <tr>
                <td>Best For</td>
                {tariffList.map(tariff => (
                  <td key={tariff.id}>{tariff.bestFor}</td>
                ))}
              </tr>
              {Array.from({ length: Math.max(...tariffList.map(t => t.features.length)) }).map((_, i) => (
                <tr key={i}>
                  <td>{i === 0 ? "Features" : ""}</td>
                  {tariffList.map(tariff => (
                    <td key={tariff.id}>
                      {tariff.features[i] ? (
                        <>
                          <Check size={16} className="feature-check" /> {tariff.features[i]}
                        </>
                      ) : (
                        <X size={16} className="feature-x" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="tariff-grid">
          {tariffList.map((tariff) => (
            <div 
              className={`tariff-card ${selectedTariff === tariff.id ? "selected" : ""}`}
              key={tariff.id}
              onClick={() => setSelectedTariff(tariff.id)}
            >
              <h3>{tariff.title}</h3>
              <p className="description">{tariff.description}</p>
              <div className="price-section">
                <p className="price">₹{tariff.price}</p>
                <small>per person</small>
              </div>
              <div className="features-list">
                <ul>
                  {tariff.features.slice(0, 3).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                  {tariff.features.length > 3 && <li>+ {tariff.features.length - 3} more</li>}
                </ul>
              </div>
              <p className="best-for">Best for: {tariff.bestFor}</p>
              <button 
                className="book-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookNow(tariff.id);
                }}
              >
                Book Now <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tariff;