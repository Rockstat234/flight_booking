import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";

export default function SignIn() {
  const [activeTab, setActiveTab] = useState("personal");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        accountType: activeTab,
      });

      // ✅ Token localStorage मध्ये save कर
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.user.email);

      setError("");
      navigate("/"); // login झाल्यावर home ला redirect
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

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
              <img src="/images/business.png" alt="Businessman" className="login-img" />
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
          <label className="label">{activeTab === "personal" ? "Email Id / Mobile Number" : "Work Email"}</label>
          <input
            type="text"
            placeholder={activeTab === "personal" ? "Email Id / Mobile Number" : "Enter Work Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="terms">
            By proceeding, you agree with our{" "}
            <a href="/terms">Terms of Service</a>,{" "}
            <a href="/privacy">Privacy Policy</a> &{" "}
            <a href="/agreement">Master User Agreement</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
