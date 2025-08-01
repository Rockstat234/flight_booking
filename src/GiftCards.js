import React, { useState, useEffect } from "react";
import airIndiaLogo from "./images/airindia-logo.png";
import giftCardImage from "./images/gift-card-design.png";
import specialOfferImage from "./images/special-offer-banner.png";
import rakshaImage from "./images/raksha.jpg";
import wowImage from "./images/wow.jpg";
import newwImage from "./images/neww.jpg";
import "./GiftCards.css";

function GiftCards() {
  // Form state
  const [activeTab, setActiveTab] = useState("travel");
  const [denomination, setDenomination] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("self");
  const [deliveryDate, setDeliveryDate] = useState("today");
  const [senderDetails, setSenderDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: ""
  });
  const [receiverDetails, setReceiverDetails] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [message, setMessage] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    {
      image: rakshaImage,
      //stitle: "SPECIAL OFFERS FOR RAKSHA BANDHAN",
      // subtitle: "Up to INR 3000 off",
      // promoCode: "AIOFFER08"
    },
    {
      image: wowImage, // You can replace with different banner images
      // title: "SUMMER TRAVEL SALE",
      // subtitle: "Limited time discounts",
      // promoCode: "AISUMMER24"
    },
    {
      image:  newwImage, // You can replace with different banner images
      // title: "FESTIVE SEASON OFFER",
      // subtitle: "Extra 10% off on gift cards",
      // promoCode: "AIFESTIVE10"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [banners.length]);

  // Constants
  const denominations = [2000, 4000, 6000, 10000, 20000, 50000, 100000, 200000];
  const occasions = ["Anniversary", "Freedom", "Birthday", "Special Moments", "Wedding"];

  // Handlers
  const handleApplyPromo = () => {
    if (promoCode === "AIOFFER08" || promoCode === "AITRAVELGIFT01") {
      setAppliedPromo(promoCode);
      alert(`Promo code ${promoCode} applied successfully!`);
    } else {
      alert("Invalid promo code. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!denomination) {
      alert("Please select a denomination");
      return;
    }

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
      totalAmount: denomination * quantity
    };

    setSubmittedData(formData);
  };

  // Render functions
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="giftcard-form">
      {/* Denomination Selection */}
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
        <div className="delivery-options">
          <label className="delivery-option">
            <input
              type="radio"
              name="deliveryOption"
              checked={deliveryOption === "gift"}
              onChange={() => setDeliveryOption("gift")}
            />
            Send As Gift
          </label>
          <label className="delivery-option">
            <input
              type="radio"
              name="deliveryOption"
              checked={deliveryOption === "self"}
              onChange={() => setDeliveryOption("self")}
            />
            Buy For Self
          </label>
        </div>
      </div>

      {/* Delivery Date */}
      <div className="form-section">
        <h3>Pick a Delivery Date</h3>
        <div className="delivery-date-options">
          <label className="date-option">
            <input
              type="radio"
              name="deliveryDate"
              checked={deliveryDate === "today"}
              onChange={() => setDeliveryDate("today")}
            />
            Today
          </label>
          <label className="date-option">
            <input
              type="radio"
              name="deliveryDate"
              checked={deliveryDate === "later"}
              onChange={() => setDeliveryDate("later")}
            />
            Send Later
          </label>
        </div>
      </div>

      {/* Quantity */}
      <div className="form-section">
        <h3>Enter Quantity*</h3>
        <p>Min: 1 Max: 10</p>
        <input
          type="number"
          min="1"
          max="10"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Math.min(10, e.target.value)))}
          className="quantity-input"
        />
      </div>

      {/* Customization */}
      <div className="form-section">
        <h3>Customize your gift card</h3>
        <div className="sender-receiver-details">
          <div className="sender-details">
            <h4>Sender's Details</h4>
            <input type="text" placeholder="First Name*" required 
              value={senderDetails.firstName}
              onChange={(e) => setSenderDetails({...senderDetails, firstName: e.target.value})}
            />
            <input type="text" placeholder="Last Name*" required 
              value={senderDetails.lastName}
              onChange={(e) => setSenderDetails({...senderDetails, lastName: e.target.value})}
            />
            <input type="email" placeholder="Email Address*" required 
              value={senderDetails.email}
              onChange={(e) => setSenderDetails({...senderDetails, email: e.target.value})}
            />
            <input type="tel" placeholder="Mobile Number*" required 
              value={senderDetails.mobile}
              onChange={(e) => setSenderDetails({...senderDetails, mobile: e.target.value})}
            />
          </div>

          <div className="receiver-details">
            <h4>Receiver's Details</h4>
            <input type="text" placeholder="First Name*" required 
              value={receiverDetails.firstName}
              onChange={(e) => setReceiverDetails({...receiverDetails, firstName: e.target.value})}
            />
            <input type="text" placeholder="Last Name*" required 
              value={receiverDetails.lastName}
              onChange={(e) => setReceiverDetails({...receiverDetails, lastName: e.target.value})}
            />
            <input type="email" placeholder="Email Address*" required 
              value={receiverDetails.email}
              onChange={(e) => setReceiverDetails({...receiverDetails, email: e.target.value})}
            />
            <label className="same-as-sender">
              <input type="checkbox" 
                onChange={(e) => {
                  if (e.target.checked) {
                    setReceiverDetails({
                      ...receiverDetails,
                      firstName: senderDetails.firstName,
                      lastName: senderDetails.lastName,
                      email: senderDetails.email
                    });
                  }
                }}
              />
              Same as Sender's Details
            </label>
          </div>
        </div>

        <div className="gift-message">
          <h4>Write a Message...</h4>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength="125"
            placeholder="Your personal message (125 characters max)"
          />
          <p className="char-count">{125 - message.length} characters left</p>
        </div>

        <button type="button" className="preview-button">
          PREVIEW E-GIFT-CARD
        </button>
      </div>

      {/* Payment Section */}
      <div className="payment-section">
        <h3>Payment method</h3>
        <div className="promo-code">
          <input
            type="text"
            placeholder="Promo Code?"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button type="button" onClick={handleApplyPromo} className="apply-button">
            APPLY
          </button>
          {appliedPromo && <span className="applied-promo">Applied: {appliedPromo}</span>}
        </div>

        <div className="payable-amount">
          <p>Payable Amount: ₹{denomination ? (denomination * quantity).toLocaleString("en-IN") : "0.00"}</p>
        </div>

        <button type="submit" className="pay-now-button" disabled={!denomination}>
          PAY NOW
        </button>

        <p className="terms-conditions">
          *Terms and Conditions apply. Gift cards are valid for 6 months from date of purchase.
        </p>
      </div>
    </form>
  );

  const renderConfirmation = () => (
    <div className="confirmation-page">
      <div className="confirmation-header">
        <img src={airIndiaLogo} alt="Air India" className="confirmation-logo" />
        <h1>Thank You for Your Purchase!</h1>
        <p>Your Air India Gift Card order has been confirmed</p>
      </div>

      <div className="confirmation-details">
        <h2>Order Summary</h2>
        
        <div className="detail-row">
          <span>Occasion:</span>
          <span>{submittedData.occasion}</span>
        </div>
        
        <div className="detail-row">
          <span>Denomination:</span>
          <span>₹{submittedData.denomination.toLocaleString("en-IN")}</span>
        </div>
        
        <div className="detail-row">
          <span>Quantity:</span>
          <span>{submittedData.quantity}</span>
        </div>
        
        <div className="detail-row">
          <span>Total Amount:</span>
          <span>₹{submittedData.totalAmount.toLocaleString("en-IN")}</span>
        </div>
        
        <div className="detail-row">
          <span>Delivery Option:</span>
          <span>{submittedData.deliveryOption === "gift" ? "Send As Gift" : "Buy For Self"}</span>
        </div>
        
        <div className="detail-row">
          <span>Delivery Date:</span>
          <span>{submittedData.deliveryDate === "today" ? "Today" : "Later"}</span>
        </div>
        
        {appliedPromo && (
          <div className="detail-row">
            <span>Promo Code Applied:</span>
            <span>{submittedData.promoCode}</span>
          </div>
        )}

        <div className="sender-receiver-info">
          <div className="info-section">
            <h3>Sender Details</h3>
            <p>{submittedData.senderDetails.firstName} {submittedData.senderDetails.lastName}</p>
            <p>{submittedData.senderDetails.email}</p>
            <p>{submittedData.senderDetails.mobile}</p>
          </div>

          <div className="info-section">
            <h3>Receiver Details</h3>
            <p>{submittedData.receiverDetails.firstName} {submittedData.receiverDetails.lastName}</p>
            <p>{submittedData.receiverDetails.email}</p>
          </div>
        </div>

        {submittedData.message && (
          <div className="gift-message">
            <h3>Your Message</h3>
            <p>{submittedData.message}</p>
          </div>
        )}

        <div className="confirmation-note">
          <p>Your e-gift card will be delivered to the recipient's email address shortly.</p>
          <p>A confirmation has been sent to your email at {submittedData.senderDetails.email}</p>
        </div>

        <button 
          className="back-to-giftcards"
          onClick={() => setSubmittedData(null)}
        >
          BUY ANOTHER GIFT CARD
        </button>
      </div>
    </div>
  );

  return (
    <div className="giftcards-page">
      {/* Header with Air India Logo */}
      <header className="air-india-header">
        <img src={airIndiaLogo} alt="Air India" className="air-india-logo" />
        <h1>Air India Gift Cards</h1>
      </header>

      {submittedData ? renderConfirmation() : (
        <>
          {/* Carousel/Slider for Special Offers */}
          <div className="carousel-container">
            <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {banners.map((banner, index) => (
                <div key={index} className="carousel-slide">
                  <img src={banner.image} alt={banner.title} className="banner-image" />
                  <div className="banner-content">
                    <h2>{banner.title}</h2>
                    <p>{banner.subtitle}</p>
                    {banner.promoCode && <p>Use Promo Code <strong>{banner.promoCode}</strong></p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-dots">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Occasion Tabs */}
          <div className="occasion-tabs">
            {occasions.map((occasion) => (
              <button
                key={occasion}
                className={`tab-button ${activeTab === occasion.toLowerCase() ? "active" : ""}`}
                onClick={() => setActiveTab(occasion.toLowerCase())}
              >
                {occasion}
              </button>
            ))}
          </div>

          {/* Gift Card Content */}
          <div className="giftcard-content">
            <div className="giftcard-hero">
              <div className="giftcard-text">
                <h1>Gift Card for Travels</h1>
                <h2>Experience the Joy of Flying with Air India</h2>
                <p className="giftcard-description">
                  Our one-of-a-kind gift card has been crafted to give your loved ones an unparalleled travel experience. 
                  Embrace the joy of exploration, the allure of undiscovered destinations, and the beauty of unforgettable moments. 
                  It's the quintessential gift every travel enthusiast will adore!
                </p>
                <p className="validity-info">
                  Card valid for 6 months from activation with a 2.5% discount up to INR 3,000 valid till 31st July, 2025. 
                  Promo Code: <strong>AITRAVELGIFT01</strong>
                </p>
              </div>
              <img src={giftCardImage} alt="Air India Gift Card" className="giftcard-image" />
            </div>

            {renderForm()}
          </div>
        </>
      )}
    </div>
  );
}

export default GiftCards;