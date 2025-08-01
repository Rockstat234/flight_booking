import React from 'react';
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa';
import { FaPlane } from 'react-icons/fa6';
import './SignIn.css';

function AirIndiaPage() {
  const handleFacebookLogin = () => console.log('Facebook login clicked');
  const handleGoogleLogin = () => console.log('Google login clicked');
  const handleAppleLogin = () => console.log('Apple login clicked');
  const handleEmailLogin = () => console.log('Email login clicked');

  return (
    <div className="air-india-wrapper">
      <header className="air-india-header">
        <h1 className="air-india-title">
          <FaPlane className="logo-icon" /> Air India
        </h1>
        <nav className="air-india-nav">
          <span className="nav-link">Help</span>
          <span className="nav-link">Log in</span>
        </nav>
      </header>

      <div className="search-section">
        <h2 className="section-title">Skills of cheap flights.</h2>
        
        <div className="flight-options">
          <div className="option-row">
            <span className="option-label">Return</span>
          </div>
          
          <div className="option-row">
            <span className="option-label">From Mumbai (BOM)</span>
            <span className="option-value">To Country, city</span>
          </div>
          
          <div className="option-row">
            <span className="option-label">Add nearby airports</span>
            <span className="option-value">Add nearby</span>
          </div>
          
          <div className="option-row">
            <span className="option-label">Direct flights</span>
          </div>
        </div>

        <div className="travelers-section">
          <span className="travelers-label">Travelers and cabin class</span>
          <span className="travelers-value">1 Adult, Economy</span>
        </div>

        <button className="search-button">Search</button>
        <button className="explore-button">Explore everywhere</button>
      </div>

      <div className="signin-section">
        <h3 className="signin-title">Air India</h3>
        <p className="signin-subtitle">Get the full experience</p>
        <p className="signin-description">Track prices, make trip planning easier and enjoy faster booking.</p>

        <div className="auth-options">
          <button className="email-button" onClick={handleEmailLogin}>Continue with email</button>
          <button className="social-button facebook" onClick={handleFacebookLogin}>
            <FaFacebook className="social-icon" /> Facebook
          </button>
          <button className="social-button google" onClick={handleGoogleLogin}>
            <FaGoogle className="social-icon" /> Google
          </button>
          <button className="social-button apple" onClick={handleAppleLogin}>
            <FaApple className="social-icon" /> Apple
          </button>
        </div>

        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <p className="terms-text">
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default AirIndiaPage;