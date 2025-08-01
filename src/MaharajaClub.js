import React from "react";
import "./MaharajaClub.css";
import promoImage from "./images/maharaja.jpg";

const MaharajaClub = () => {
  return (
    <div className="maharaja-wrapper">
      <div className="maharaja-hero">
        <img
          src={promoImage}
          alt="Introducing Maharaja Club"
          className="promo-image"
        />
      </div>

      <div className="maharaja-section tiers-section">
        <h2>Explore Membership Tiers</h2>
        <div className="maharaja-grid">
          <div className="maharaja-card">
            <h3 className="tier silver">Silver Tier</h3>
            <p>Enjoy priority check-in, exclusive partner offers, and reward miles.</p>
          </div>
          <div className="maharaja-card">
            <h3 className="tier gold">Gold Tier</h3>
            <p>Includes lounge access, preferred seats, and extra baggage allowance.</p>
          </div>
          <div className="maharaja-card">
            <h3 className="tier platinum">Platinum Tier</h3>
            <p>Top-tier upgrades, dedicated concierge, and personalized experiences.</p>
          </div>
        </div>
      </div>

      <div className="maharaja-section">
        <button className="maharaja-btn">Join the Maharaja Club</button>
      </div>
    </div>
  );
};

export default MaharajaClub;
