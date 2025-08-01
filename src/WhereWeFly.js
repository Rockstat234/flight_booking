import React from "react";
import "./WhereWeFly.css";

const WhereWeFly = () => {
  const destinations = [
    { city: "New York", country: "USA", image: "/images/newyork.jpg" },
    { city: "London", country: "UK", image: "/images/london.jpg" },
    { city: "Tokyo", country: "Japan", image: "/images/tokyo.jpg" },
    { city: "Sydney", country: "Australia", image: "/images/sydney.jpg" },
  ];

  return (
    <div className="fly-section">
      <div className="fly-container">
        <h1>WHERE WE FLY</h1>
        <p>Explore Air India's growing network of global destinations.</p>

        <div className="fly-grid">
          {destinations.map((item, i) => (
            <div className="fly-card" key={i}>
              <img src={item.image} alt={item.city} />
              <div className="fly-info">
                <h3>{item.city}</h3>
                <p>{item.country}</p>
                <button className="fly-btn">Explore</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhereWeFly;
