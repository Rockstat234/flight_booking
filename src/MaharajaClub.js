import React, { useState } from "react";
import "./MaharajaClub.css";
import promoImage from "./images/maharaja.jpg";
import axios from "axios";

const MaharajaClub = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tier: "",
  });
  const [message, setMessage] = useState("");

  const toggleCardExpand = (tier) => {
    setExpandedCard(expandedCard === tier ? null : tier);
  };

  const handleJoinClick = (tier) => {
    setShowJoinForm(true);
    setFormData({ ...formData, tier });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API request to backend
      const res = await axios.post("http://localhost:5000/api/membership", formData);

      if (res.data.success) {
        setMessage(`🎉 Thank you ${formData.name}! Your ${formData.tier} application is received.`);
        setShowJoinForm(false);
        setFormData({ name: "", email: "", tier: "" });
      } else {
        setMessage("❌ Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error submitting membership:", error);
      setMessage("⚠️ Failed to connect to server. Try again later.");
    }
  };

  const membershipTiers = [
    {
      id: "silver",
      name: "Silver Tier",
      price: "₹5,999/year",
      shortDesc: "Essential benefits for frequent travelers",
      mainBenefits: [
        "Priority check-in",
        "Exclusive partner offers",
        "Reward miles program",
        "5% bonus on all miles",
      ],
      fullBenefits: [
        "Priority check-in at all counters",
        "Exclusive discounts with 50+ partners",
        "Earn 2x miles on every flight",
        "5% bonus miles on all flights",
        "Free ticket cancellation once per year",
        "Dedicated customer support line",
      ],
    },
    {
      id: "gold",
      name: "Gold Tier",
      price: "₹12,999/year",
      shortDesc: "Enhanced comfort and privileges",
      mainBenefits: [
        "All Silver benefits",
        "Airport lounge access",
        "Preferred seating",
        "Extra baggage allowance",
        "10% bonus on all miles",
      ],
      fullBenefits: [
        "Access to 100+ airport lounges worldwide",
        "Preferred seating at time of booking",
        "+10kg extra baggage allowance",
        "10% bonus miles on all flights",
        "Free date changes (twice per year)",
        "Priority baggage handling",
        "Complimentary travel insurance",
      ],
    },
    {
      id: "platinum",
      name: "Platinum Tier",
      price: "₹24,999/year",
      shortDesc: "Ultimate luxury travel experience",
      mainBenefits: [
        "All Gold benefits",
        "Complimentary upgrades",
        "Dedicated concierge",
        "Personalized experiences",
        "15% bonus on all miles",
        "Priority boarding",
      ],
      fullBenefits: [
        "Complimentary upgrades when available",
        "24/7 dedicated concierge service",
        "Personalized travel planning",
        "15% bonus miles on all flights",
        "Priority boarding in all flights",
        "Unlimited free changes to bookings",
        "Complimentary hotel upgrades at partner hotels",
        "Fast-track immigration at select airports",
        "Annual complimentary companion ticket",
      ],
    },
  ];

  return (
    <div className="maharaja-wrapper">
      {/* Hero Section */}
      <div className="maharaja-hero">
        <img
          src={promoImage}
          alt="Introducing Maharaja Club"
          className="promo-image"
        />
        <div className="hero-overlay">
          <h1>Welcome to Maharaja Club</h1>
          <p>Experience luxury travel like never before</p>
        </div>
      </div>

      {/* Membership Tiers Section */}
      <div className="maharaja-section tiers-section">
        <h2 className="section-title">Exclusive Membership Tiers</h2>
        <div className="maharaja-grid">
          {membershipTiers.map((tier) => (
            <div
              key={tier.id}
              className={`maharaja-card ${tier.id}-card ${
                expandedCard === tier.id ? "expanded" : ""
              }`}
            >
              <div className="card-header">
                <h3 className="tier">{tier.name}</h3>
                <div className="price">{tier.price}</div>
                <p className="short-desc">{tier.shortDesc}</p>
              </div>

              <div className="card-main-content">
                <ul className="benefits-list">
                  {tier.mainBenefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>

                {expandedCard === tier.id && (
                  <div className="expanded-content">
                    <h4>All Benefits:</h4>
                    <ul className="full-benefits-list">
                      {tier.fullBenefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="card-actions">
                <button
                  className="details-btn"
                  onClick={() => toggleCardExpand(tier.id)}
                >
                  {expandedCard === tier.id ? "Show Less" : "More Details"}
                </button>
                <button
                  className="join-btn"
                  onClick={() => handleJoinClick(tier.name)}
                >
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="maharaja-section cta-section">
        <h2>Ready to Elevate Your Travel Experience?</h2>
        <p>Join thousands of satisfied members enjoying exclusive benefits</p>
        <button
          className="maharaja-btn"
          onClick={() => setShowJoinForm(true)}
        >
          Join Maharaja Club Today
        </button>
        <div className="guarantee-badge">
          <span>30-Day Satisfaction Guarantee</span>
        </div>
      </div>

      {/* Join Form Modal */}
      {showJoinForm && (
        <div className="join-modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowJoinForm(false)}
            >
              &times;
            </button>
            <h2>Join Maharaja Club</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tier">Membership Tier:</label>
                <select
                  id="tier"
                  name="tier"
                  value={formData.tier}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Tier</option>
                  <option value="Silver Tier">Silver Tier (₹5,999/year)</option>
                  <option value="Gold Tier">Gold Tier (₹12,999/year)</option>
                  <option value="Platinum Tier">Platinum Tier (₹24,999/year)</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">
                Submit Application
              </button>
            </form>
            {message && <p className="response-msg">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaharajaClub;
