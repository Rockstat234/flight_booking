import React from "react";
import "./App.css";

const services = [
  { 
    title: "Mumbai to NYC", 
    desc: "Popular Route", 
    img: "/images/mumbai.jpg",
    backContent: "Daily flights with premium amenities. Experience luxury at 40,000 feet."
  },
  { 
    title: "Maharaja Club", 
    img: "/images/maharaja.jpg",
    backContent: "Exclusive benefits including lounge access, priority boarding, and extra baggage allowance."
  },
  { 
    title: "Star Alliance", 
    img: "/images/star-alliance.jpg",
    backContent: "Access to a global network of airlines with seamless connections worldwide."
  },
  { 
    title: "E-Store", 
    img: "/images/estore.jpg",
    backContent: "Shop exclusive Air India merchandise and collectibles online."
  },
  { 
    title: "Talk to Us", 
    img: "/images/talktous.jpg",
    backContent: "24/7 customer support for all your travel queries and assistance."
  },
];

const prepareToTravel = [
  {
    title: "Baggage Essentials",
    desc: "Travel light on worries and heavy on information. Baggage rules decoded.",
    img: "/images/baggage.jpg",
    backContent: "Learn about baggage allowances, restricted items, and packing tips for stress-free travel."
  },
  {
    title: "Airport Adventures",
    desc: "Turn layovers into mini vacations",
    img: "/images/airport.jpg",
    backContent: "Discover airport lounges, shopping, dining options and relaxation areas during your wait."
  },
  {
    title: "Before You Fly",
    desc: "Everything you need to know",
    img: "/images/beforeflight.jpg",
    backContent: "Checklist for documents, health requirements, and pre-flight preparations."
  },
];

export default function App() {
  return (
    <div className="air-india-app">
      {/* Hero Section */}
      <section className="hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/best.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>EXPERIENCE THE BHARAT YATRA</h1>
          <p>Fly with India's premier airline</p>
          <button className="cta-button">Book Your Flight</button>
        </div>
      </section>

      {/* Services Section with Hover Effect */}
      <section className="services">
        <div className="section-header">
          <h2>DISCOVER OUR SERVICES</h2>
          <div className="divider"></div>
        </div>
        <div className="services-container">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div 
                className="card-image" 
                style={{ backgroundImage: `url(${service.img})` }}
              ></div>
              <div className="card-content">
                <h3>{service.title}</h3>
                <p className="card-desc">{service.desc}</p>
                <div className="hidden-content">
                  <p>{service.backContent}</p>
                  <button className="card-button">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prepare to Travel Section */}
      <section className="travel-guides">
        <div className="section-header">
          <h2>PREPARE TO TRAVEL</h2>
          <div className="divider"></div>
        </div>
        <div className="travel-cards">
          {prepareToTravel.map((item, index) => (
            <div className="travel-card" key={index}>
              <div className="card-inner">
                <div className="card-front">
                  <div 
                    className="card-image" 
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
                <div className="card-back">
                  <p>{item.backContent}</p>
                  <button className="card-button">
                    Details <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}