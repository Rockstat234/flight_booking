import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-image-placeholder"></div>

      <div className="banner-content">
        <h1>YOUR SAFETY, OUR PRIORITY</h1>
        <button className="btn btn-danger">Learn More</button>
      </div>

      <div className="dots">
        <span className="dot"></span>
        <span className="dot active"></span>
        <span className="dot"></span>
      </div>

      <div className="feedback-btn">Feedback</div>

      <div className="chat-bot-placeholder"></div>
    </div>
  );
};

export default Banner;
