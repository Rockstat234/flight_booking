import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";

export default function SignIn() {
  const [activeTab, setActiveTab] = useState("personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
        accountType: activeTab
      });

      // API ने role परत दिला आहे असं गृहीत धरून
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("token", res.data.token);

      setError("");

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE */}
        <div className="login-right">
          {/* Tabs */}
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

          {/* Email */}
          <label className="label">
            {activeTab === "personal" ? "Email Id / Mobile Number" : "Work Email"}
          </label>
          <input
            type="text"
            placeholder={
              activeTab === "personal" ? "Email Id / Mobile Number" : "Enter Work Email"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          {/* Password */}
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

          {/* Error message */}
          {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}

          {/* Login Button */}
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="terms">
            By proceeding, you agree with our{" "}
            <a href="/terms">Terms of Service</a>,{" "}
            <a href="/privacy">Privacy Policy</a> &{" "}
            <a href="/agreement">Master User Agreement</a>.
          </p>

          <div className="divider">Or</div>

          {/* Google Sign In */}
          <button className="google-btn">
            <img src="/images/google-icon.png" alt="Google" /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
