import React from "react";
import "./Tariff.css";

function Tariff() {
  const tariffList = [
    {
      id: 1,
      title: "Economy Class",
      description: "Travel affordably with comfort, free meals, and in-flight entertainment.",
      price: "3,999",
    },
    {
      id: 2,
      title: "Premium Economy",
      description: "More space, more comfort, and premium check-in services.",
      price: "6,499",
    },
    {
      id: 3,
      title: "Business Class",
      description: "Lie-flat seats, gourmet meals, priority boarding, and lounge access.",
      price: "12,999",
    },
    {
      id: 4,
      title: "First Class",
      description: "Private suites, 5-star service, and ultimate comfort in the skies.",
      price: "21,999",
    },
  ];

  return (
    <div className="tariff-section">
      <div className="tariff-header">
        <h2>EXPLORE OUR TARIFF PLANS</h2>
        <p>Select your perfect class for a comfortable and memorable journey.</p>
      </div>

      <div className="tariff-grid">
        {tariffList.map((tariff) => {
          return (
            <div className="tariff-card" key={tariff.id}>
              <h3>{tariff.title}</h3>
              <p className="description">{tariff.description}</p>
              <p className="price">₹{tariff.price}</p>
              <button className="book-btn">Book Now</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tariff;
