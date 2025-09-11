// src/pages/GiftCards.js
import React, { useState, useEffect } from "react";
import axios from "axios"; 
import airIndiaLogo from "./images/bharat.png";
import giftCardImage from "./images/gift-card-design.png";
import rakshaImage from "./images/raksha.jpg";
import wowImage from "./images/wow.jpg";
import newwImage from "./images/neww.jpg";
import "./GiftCards.css";

function GiftCards() {
  const [activeTab, setActiveTab] = useState("travel");
  const [denomination, setDenomination] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("self");
  const [deliveryDate, setDeliveryDate] = useState("today");
  const [senderDetails, setSenderDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [receiverDetails, setReceiverDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);

  // Carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    { image: rakshaImage, title: "Raksha Bandhan Offer", subtitle: "Save up to ₹3000", promoCode: "AIOFFER08" },
    { image: wowImage, title: "Summer Travel Sale", subtitle: "Discounts on flights", promoCode: "AISUMMER24" },
    { image: newwImage, title: "Festive Season", subtitle: "Extra 10% Off Gift Cards", promoCode: "AIFESTIVE10" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const denominations = [2000, 4000, 6000, 10000, 20000, 50000, 100000, 200000];
  const occasions = ["Anniversary", "Freedom", "Birthday", "Special Moments", "Wedding"];

  const handleApplyPromo = () => {
    const validCodes = {
      AIOFFER08: 3000,
      AISUMMER24: 2000,
      AIFESTIVE10: "10%", // percent discount
    };

    const code = promoCode.trim().toUpperCase();
    if (validCodes[code]) {
      setAppliedPromo(code);

      let total = denomination * quantity;
      if (typeof validCodes[code] === "string") {
        let percent = parseInt(validCodes[code]);
        setDiscount((total * percent) / 100);
      } else {
        setDiscount(validCodes[code]);
      }

      alert(`Promo code ${code} applied successfully!`);
    } else {
      setAppliedPromo("");
      setDiscount(0);
      alert("Invalid promo code. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!denomination) {
      alert("Please select a denomination");
      return;
    }
    if (!senderDetails.firstName || !senderDetails.lastName || !senderDetails.email) {
      alert("Please fill sender details");
      return;
    }
    if (!receiverDetails.firstName || !receiverDetails.lastName || !receiverDetails.email) {
      alert("Please fill receiver details");
      return;
    }

    const totalAmount = denomination * quantity - discount;

    const formData = {
      occasion: activeTab,
      denomination,
      quantity,
      deliveryOption,
      deliveryDate,
      senderDetails,
      receiverDetails,
      message,
      promoCode: appliedPromo,
      discount,
      totalAmount,
    };

    try {
      const res = await axios.post("http://localhost:8000/api/giftcards", formData);
      console.log("✅ Saved:", res.data);
      setSubmittedData(res.data); // confirmation
    } catch (error) {
      console.error("❌ Error saving gift card:", error);
      alert("Error while saving. Please try again.");
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="giftcard-form">
      {/* Denomination */}
      <div className="form-section">
        <h3>Enter Denomination</h3>
        <div className="denomination-options">
          {denominations.map((amount) => (
            <button
              type="button"
              key={amount}
              className={`denomination-button ${denomination === amount ? "selected" : ""}`}
              onClick={() => setDenomination(amount)}
            >
              ₹{amount.toLocaleString("en-IN")}
            </button>
          ))}
        </div>
      </div>

      {/* Delivery Options */}
      <div className="form-section">
        <h3>Delivery Options</h3>
        <label>
          <input type="radio" name="deliveryOption" checked={deliveryOption === "gift"} onChange={() => setDeliveryOption("gift")} />
          Send As Gift
        </label>
        <label>
          <input type="radio" name="deliveryOption" checked={deliveryOption === "self"} onChange={() => setDeliveryOption("self")} />
          Buy For Self
        </label>
      </div>

      {/* Delivery Date */}
      <div className="form-section">
        <h3>Pick a Delivery Date</h3>
        <label>
          <input type="radio" name="deliveryDate" checked={deliveryDate === "today"} onChange={() => setDeliveryDate("today")} />
          Today
        </label>
        <label>
          <input type="radio" name="deliveryDate" checked={deliveryDate === "later"} onChange={() => setDeliveryDate("later")} />
          Send Later
        </label>
      </div>

      {/* Quantity */}
      <div className="form-section">
        <h3>Enter Quantity*</h3>
        <input type="number" min="1" max="10" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      </div>

      {/* Sender / Receiver */}
      <div className="form-section">
        <h3>Sender Details</h3>
        <input type="text" placeholder="First Name*" required value={senderDetails.firstName} onChange={(e) => setSenderDetails({ ...senderDetails, firstName: e.target.value })} />
        <input type="text" placeholder="Last Name*" required value={senderDetails.lastName} onChange={(e) => setSenderDetails({ ...senderDetails, lastName: e.target.value })} />
        <input type="email" placeholder="Email*" required value={senderDetails.email} onChange={(e) => setSenderDetails({ ...senderDetails, email: e.target.value })} />
        <input type="tel" placeholder="Mobile*" required value={senderDetails.mobile} onChange={(e) => setSenderDetails({ ...senderDetails, mobile: e.target.value })} />

        <h3>Receiver Details</h3>
        <input type="text" placeholder="First Name*" required value={receiverDetails.firstName} onChange={(e) => setReceiverDetails({ ...receiverDetails, firstName: e.target.value })} />
        <input type="text" placeholder="Last Name*" required value={receiverDetails.lastName} onChange={(e) => setReceiverDetails({ ...receiverDetails, lastName: e.target.value })} />
        <input type="email" placeholder="Email*" required value={receiverDetails.email} onChange={(e) => setReceiverDetails({ ...receiverDetails, email: e.target.value })} />
      </div>

      {/* Message */}
      <div className="form-section">
        <h3>Message</h3>
        <textarea value={message} maxLength="125" placeholder="Write a message..." onChange={(e) => setMessage(e.target.value)} />
        <p>{125 - message.length} characters left</p>
      </div>

      {/* Payment */}
      <div className="payment-section">
        <h3>Payment</h3>
        <input type="text" placeholder="Promo Code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
        <button type="button" onClick={handleApplyPromo}>Apply</button>
        {appliedPromo && <p>Applied: {appliedPromo} (Saved ₹{discount})</p>}
        <p>
          Total: ₹
          {denomination ? (denomination * quantity - discount).toLocaleString("en-IN") : "0"}
        </p>
        <button type="submit" className="pay-now-button" disabled={!denomination}>Pay Now</button>
      </div>
    </form>
  );

  const renderConfirmation = () => (
    <div className="confirmation-page">
      <img src={airIndiaLogo} alt="Air India" className="confirmation-logo" />
      <h1>Thank You for Your Purchase!</h1>
      <p>Order Summary:</p>
      <ul>
        <li>Occasion: {submittedData.occasion}</li>
        <li>Amount: ₹{submittedData.denomination}</li>
        <li>Quantity: {submittedData.quantity}</li>
        <li>Total: ₹{submittedData.totalAmount}</li>
        {submittedData.promoCode && <li>Promo Applied: {submittedData.promoCode}</li>}
      </ul>
      <button onClick={() => setSubmittedData(null)}>Buy Another</button>
    </div>
  );

  return (
    <div className="giftcards-page">
      <header className="air-india-header">
        <img src={airIndiaLogo} alt="Air India" />
        <h1>BHARATYATRA GIFTCARDS</h1>
      </header>
      {submittedData ? renderConfirmation() : (
        <>
          {/* Carousel */}
          <div className="carousel-container">
            <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {banners.map((banner, i) => (
                <div key={i} className="carousel-slide">
                  <img src={banner.image} alt={banner.title} />
                  <h2>{banner.title}</h2>
                  <p>{banner.subtitle}</p>
                  {banner.promoCode && <p>Use Code: {banner.promoCode}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="occasion-tabs">
            {occasions.map((occasion) => (
              <button key={occasion} className={activeTab === occasion.toLowerCase() ? "active" : ""} onClick={() => setActiveTab(occasion.toLowerCase())}>
                {occasion}
              </button>
            ))}
          </div>

          {/* Gift Card Form */}
          <div className="giftcard-content">
            <h2>Experience the Joy of Flying</h2>
            <img src={giftCardImage} alt="Gift Card" />
            {renderForm()}
          </div>
        </>
      )}
    </div>
  );
}

export default GiftCards;
