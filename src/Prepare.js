import React from "react";
import "./Prepare.css";

function Prepare() {
  return (
    <section className="prepare-section">
      <div className="prepare-content">
        <h1>PREPARE TO TRAVEL</h1>
        <h2 className="subtitle">
          Get ready for a smooth and enjoyable journey
        </h2>
        <p>
          From documents to baggage, get everything in order before you fly.
          These expert travel tips will make your experience seamless.
        </p>

        <div className="prepare-grid">
          <div className="prepare-card">
            <div className="card-badge">NEW</div>
            <h3>Travel Documents</h3>
            <p>
              Check your passport, visa rules, and travel advisories for a
              worry-free trip.
            </p>
          </div>

          <div className="prepare-card">
            <h3>Baggage Rules</h3>
            <p>
              Learn what you can carry, what's restricted, and pack smartly for
              your flight.
            </p>
          </div>

          <div className="prepare-card">
            <h3>Early Check-In</h3>
            <p>
              Skip long lines. Check in online 24 hours before your departure.
            </p>
          </div>

          <div className="prepare-card">
            <h3>Insurance & Safety</h3>
            <p>
              Protect yourself with travel insurance that covers delays and
              medical support.
            </p>
          </div>
        </div>

        <button className="prepare-btn">Plan Your Journey</button>
      </div>
    </section>
  );
}

export default Prepare;
