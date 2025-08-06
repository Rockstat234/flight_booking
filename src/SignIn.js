import React, { useState } from "react";
import "./SignIn.css"; // Make sure the filename matches exactly

export default function SignIn() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          {activeTab === "personal" ? (
            <>
              <img src="/images/personal.png" alt="Traveler" className="login-img" />
              <ul className="benefits">
                <li>Unlock Exclusive Deals on every booking</li>
                <li>Zero Convenience Fee with Yatra Prime</li>
                <li>Easily View, Modify, or Cancel Bookings</li>
              </ul>
            </>
          ) : (
            <>
              <img src="/images/business.jpg" alt="Businessman" className="login-img" />
              <ul className="benefits">
                <li>Access to Special Corporate Fares</li>
                <li>Real-time Booking & Cancellation Reports</li>
                <li>GST Invoice Assurance & Solutions</li>
              </ul>
            </>
          )}
        </div>

        <div className="login-right">
          <div className="tabs">
            <button
              className={activeTab === "personal" ? "tab active" : "tab"}
              onClick={() => setActiveTab("personal")}
            >
              Personal Account
            </button>
            <button
              className={activeTab === "sme" ? "tab active" : "tab"}
              onClick={() => setActiveTab("sme")}
            >
              SME Account
            </button>
          </div>

          <h3>Login or Create an Account</h3>

          <label className="label">
            {activeTab === "personal" ? "Email Id / Mobile Number" : "Work Email"}
          </label>
          <input
            type="text"
            placeholder={
              activeTab === "personal" ? "Email Id / Mobile Number" : "Enter Work Email"
            }
            className="input"
          />

          <button className="login-btn">Login</button>

          <p className="terms">
            By proceeding, you agree with our{" "}
            <a href="/terms">Terms of Service</a>,{" "}
            <a href="/privacy">Privacy Policy</a> &{" "}
            <a href="/agreement">Master User Agreement</a>.
          </p>

          <div className="divider">Or</div>

          <button className="google-btn">
            <img src="/images/google-icon.png" alt="Google" /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
