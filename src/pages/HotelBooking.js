import React, { useState } from "react";
import axios from "axios";
import "./HotelBooking.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

const hotelsData = [
  {
    id: 1,
    name: "Taj Mahal Palace",
    location: "Mumbai",
    pricePerNight: 12000,
    image: "/images/hotel1.jpg",
    amenities: ["Free WiFi", "Pool", "Spa", "Breakfast"],
    rating: 4.8,
    discount: "10% Weekend Discount",
    maxOccupancy: 4,
    cancellationPolicy: "Free cancellation until 24 hours before"
  },
  {
    id: 2,
    name: "The Oberoi",
    location: "Delhi",
    pricePerNight: 15000,
    image: "/images/hotel2.jpg",
    amenities: ["Free WiFi", "Gym", "Restaurant", "Pool"],
    rating: 4.7,
    discount: "15% Early Bird",
    maxOccupancy: 3,
    cancellationPolicy: "Free cancellation until 48 hours before"
  },
  {
    id: 3,
    name: "Leela Palace",
    location: "Bangalore",
    pricePerNight: 11000,
    image: "/images/hotel3.jpg",
    amenities: ["Spa", "Free Parking", "Breakfast", "Pool"],
    rating: 4.6,
    discount: "5% Member Discount",
    maxOccupancy: 2,
    cancellationPolicy: "Non-refundable"
  },
  {
    id: 4,
    name: "ITC Grand Chola",
    location: "Chennai",
    pricePerNight: 10000,
    image: "/images/hotel4.jpg",
    amenities: ["Free WiFi", "Spa", "3 Restaurants", "Pool"],
    rating: 4.5,
    discount: "20% Long Stay",
    maxOccupancy: 4,
    cancellationPolicy: "Free cancellation until 72 hours before"
  },
  {
    id: 5,
    name: "Radisson Blu",
    location: "Hyderabad",
    pricePerNight: 9000,
    image: "/images/hotel5.jpg",
    amenities: ["Free WiFi", "Breakfast", "Pool", "Gym"],
    rating: 4.4,
    discount: "8% Online Booking Discount",
    maxOccupancy: 3,
    cancellationPolicy: "Free cancellation until 48 hours before"
  },
  {
    id: 6,
    name: "JW Marriott",
    location: "Pune",
    pricePerNight: 14000,
    image: "/images/hotel6.jpg",
    amenities: ["Free WiFi", "Spa", "Pool", "Bar"],
    rating: 4.7,
    discount: "12% Corporate Discount",
    maxOccupancy: 4,
    cancellationPolicy: "Non-refundable"
  },
  {
    id: 7,
    name: "Lalit Resort",
    location: "Goa",
    pricePerNight: 13000,
    image: "/images/hotel7.jpg",
    amenities: ["Beach Access", "Pool", "Spa", "Free WiFi"],
    rating: 4.9,
    discount: "18% Festive Offer",
    maxOccupancy: 5,
    cancellationPolicy: "Free cancellation until 24 hours before"
  },
  {
    id: 8,
    name: "Novotel",
    location: "Kolkata",
    pricePerNight: 8500,
    image: "/images/hotel8.jpg",
    amenities: ["Free WiFi", "Gym", "Pool", "Restaurant"],
    rating: 4.3,
    discount: "10% Seasonal Discount",
    maxOccupancy: 3,
    cancellationPolicy: "Free cancellation until 48 hours before"
  },
  {
    id: 9,
    name: "Park Hyatt",
    location: "Ahmedabad",
    pricePerNight: 9500,
    image: "/images/hotel9.jpg",
    amenities: ["Free WiFi", "Pool", "Breakfast", "Parking"],
    rating: 4.4,
    discount: "7% Limited Time Offer",
    maxOccupancy: 4,
    cancellationPolicy: "Non-refundable"
  },
  {
    id: 10,
    name: "Trident Hotel",
    location: "Jaipur",
    pricePerNight: 10500,
    image: "/images/hotel10.jpg",
    amenities: ["Spa", "Pool", "Gym", "Restaurant"],
    rating: 4.5,
    discount: "15% Holiday Special",
    maxOccupancy: 3,
    cancellationPolicy: "Free cancellation until 72 hours before"
  }
];

  

const HotelBooking = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [filterLocation, setFilterLocation] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: ""
  });
  const [showBookingForm, setShowBookingForm] = useState(false);

  const filteredHotels = filterLocation
    ? hotelsData.filter(
        (hotel) =>
          hotel.location.toLowerCase() === filterLocation.toLowerCase()
      )
    : hotelsData;

  const calculateTotalPrice = (hotel, nights) => {
    const basePrice = hotel.pricePerNight * nights;
    const discountMatch = hotel.discount.match(/(\d+)%/);
    if (discountMatch) {
      const discountPercent = parseInt(discountMatch[1]);
      return basePrice * (1 - discountPercent / 100);
    }
    return basePrice;
  };

  const handleBookHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingForm(true);
    setBookingSuccess(false);
  };

  // Booking submit => Backend ला पाठवतोय
  const confirmBooking = async (e) => {
    e.preventDefault();
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }
    if (new Date(bookingDetails.checkOut) <= new Date(bookingDetails.checkIn)) {
      alert("Check-out date must be after check-in date");
      return;
    }
    if (bookingDetails.guests > selectedHotel.maxOccupancy) {
      alert(
        `Maximum occupancy for this hotel is ${selectedHotel.maxOccupancy}`
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/hotelBookings", {
        hotelId: selectedHotel.id,
        hotelName: selectedHotel.name,
        location: selectedHotel.location,
        checkIn: bookingDetails.checkIn,
        checkOut: bookingDetails.checkOut,
        guests: bookingDetails.guests,
        totalPrice: calculateTotalPrice(selectedHotel, calculateNights())
      });

      if (response.status === 201) {
        setBookingSuccess(true);
        setShowBookingForm(false);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed! Please try again.");
    }
  };

  const calculateNights = () => {
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) return 0;
    const diffTime =
      new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = selectedHotel
    ? calculateTotalPrice(selectedHotel, nights)
    : 0;

  return (
    <div className="hotel-booking-container">
      <h1>🏨 Hotel Booking System</h1>

      {/* Filter */}
      <div className="filter-section">
        <label>Filter by Location: </label>
        <input
          type="text"
          placeholder="Enter city (e.g. Mumbai)"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
        <button onClick={() => setFilterLocation("")}>Clear</button>
      </div>

      {/* Hotels Grid */}
      <div className="hotels-grid">
        {filteredHotels.length === 0 ? (
          <p className="no-hotels">No hotels found in this location</p>
        ) : (
          filteredHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-badge">{hotel.discount}</div>
              <img
                src={process.env.PUBLIC_URL + hotel.image}
                alt={hotel.name}
                className="hotel-image"
                onError={(e) => {
                  e.target.src =
                    process.env.PUBLIC_URL + "/images/default-hotel.jpg";
                }}
              />
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p className="location">
                  <i className="fas fa-map-marker-alt"></i> {hotel.location}
                </p>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${
                        i < Math.floor(hotel.rating) ? "filled" : ""
                      }`}
                    ></i>
                  ))}
                  <span>({hotel.rating})</span>
                </div>
                <p className="price">
                  ₹{hotel.pricePerNight.toLocaleString()} <span>/night</span>
                </p>
                <button
                  className="book-btn"
                  onClick={() => handleBookHotel(hotel)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Booking Form */}
      {showBookingForm && selectedHotel && (
        <div className="booking-modal">
          <div className="booking-form-container">
            <button
              className="close-modal"
              onClick={() => setShowBookingForm(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <h2>Book {selectedHotel.name}</h2>
            <form onSubmit={confirmBooking}>
              <label>Check-in Date:</label>
              <input
                type="date"
                value={bookingDetails.checkIn}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, checkIn: e.target.value })
                }
                min={new Date().toISOString().split("T")[0]}
                required
              />

              <label>Check-out Date:</label>
              <input
                type="date"
                value={bookingDetails.checkOut}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, checkOut: e.target.value })
                }
                min={bookingDetails.checkIn || new Date().toISOString().split("T")[0]}
                required
              />

              <label>Guests:</label>
              <select
                value={bookingDetails.guests}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    guests: parseInt(e.target.value)
                  })
                }
              >
                {[...Array(selectedHotel.maxOccupancy).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>

              <p>
                <strong>Total Price:</strong> ₹{totalPrice.toLocaleString()}
              </p>

              <button type="submit" className="confirm-btn">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation */}
      {bookingSuccess && selectedHotel && (
        <div className="booking-confirmation">
          <h2>✅ Booking Confirmed!</h2>
          <p>
            Your reservation at <strong>{selectedHotel.name}</strong> is
            successful.
          </p>
          <button onClick={() => setBookingSuccess(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default HotelBooking;
