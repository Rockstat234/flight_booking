import React from "react";
import "./BookManage.css";

function BookManage() {
  return (
    <div className="book-manage-section">
      <div className="book-manage-container">
        <h1>Book & Manage</h1>
        <p className="subtitle">
          Plan your travel with ease — book, manage, and modify your journey seamlessly.
        </p>

        <div className="book-manage-grid">
          <Card 
            img="/images/manage.jpg"
            title="Book a Flight"
            text="Search and book domestic or international flights quickly and easily."
            button="Book Now"
          />
          <Card 
            img="/images/booking.jpg"
            title="Manage Booking"
            text="View, update, or cancel your existing bookings with your PNR and last name."
            button="Manage"
          />
          <Card 
            img="/images/web.jpg"
            title="Web Check-in"
            text="Save time at the airport with our convenient web check-in options."
            button="Check-in"
          />
          <Card 
            img="/images/status.jpg"
            title="Flight Status"
            text="Track your flight in real-time and stay updated on schedule changes."
            button="Track"
          />
        </div>
      </div>
    </div>
  );
}

function Card({ img, title, text, button }) {
  return (
    <div className="manage-card">
      <img src={img} alt={title} className="card-img" />
      <h3>{title}</h3>
      <p>{text}</p>
      <button className="manage-btn">{button}</button>
    </div>
  );
}

export default BookManage;
