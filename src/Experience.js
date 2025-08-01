import React from "react";
import "./Experience.css";
import maharajaBanner from "./images/experience.jpg";

function Experience() {
  return (
    <div className="experience-wrapper">
      <div className="experience-hero">
        <img
          src={maharajaBanner}
          alt="Maharaja Banner"
          className="hero-banner-img"
        />
      </div>

      <div className="experience-grid-section">
        <h2>Discover the Royal Experience</h2>
        <div className="experience-grid">
          <div className="exp-card">
            <h3>Timeless Hospitality</h3>
            <p>
              The Maharaja shows warmth, luxury, and personal care. Enjoy Indian hospitality in the skies.
            </p>
          </div>

          <div className="exp-card">
            <h3>Iconic Legacy</h3>
            <p>
              Since 1946, the Maharaja has shown Air India’s image. A symbol with royal style.
            </p>
          </div>

          <div className="exp-card">
            <h3>Unforgettable Journeys</h3>
            <p>
              From lounges to meals, everything is made to give you a royal trip like the Maharaja.
            </p>
          </div>
        </div>
      </div>

      <div className="experience-grid-section">
        <button className="glow-button">Explore More</button>
      </div>
    </div>
  );
}

export default Experience;
