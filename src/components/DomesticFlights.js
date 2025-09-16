import React, { useState } from "react";
import "./DomesticFlights.css";

const DomesticFlights = () => {
  // Indian domestic routes data
  const domesticRoutes = [
    {
      id: 1,
      airline: "Air India",
      flightNo: "AI-101",
      from: "Mumbai (BOM)",
      to: "Delhi (DEL)",
      departure: "06:00",
      arrival: "08:15",
      duration: "2h 15m",
      price: 4500,
      seats: 42
    },
    {
      id: 2,
      airline: "IndiGo",
      flightNo: "6E-202",
      from: "Mumbai (BOM)",
      to: "Delhi (DEL)",
      departure: "08:30",
      arrival: "10:45",
      duration: "2h 15m",
      price: 4200,
      seats: 36
    },
    {
      id: 3,
      airline: "SpiceJet",
      flightNo: "SG-303",
      from: "Mumbai (BOM)",
      to: "Delhi (DEL)",
      departure: "11:15",
      arrival: "13:30",
      duration: "2h 15m",
      price: 4100,
      seats: 24
    },
    {
      id: 4,
      airline: "Vistara",
      flightNo: "UK-404",
      from: "Mumbai (BOM)",
      to: "Bangalore (BLR)",
      departure: "07:20",
      arrival: "09:10",
      duration: "1h 50m",
      price: 4800,
      seats: 32
    },
    {
      id: 5,
      airline: "GoAir",
      flightNo: "G8-505",
      from: "Mumbai (BOM)",
      to: "Bangalore (BLR)",
      departure: "14:45",
      arrival: "16:35",
      duration: "1h 50m",
      price: 4600,
      seats: 28
    },
    {
      id: 6,
      airline: "Air India",
      flightNo: "AI-606",
      from: "Delhi (DEL)",
      to: "Chennai (MAA)",
      departure: "09:30",
      arrival: "12:15",
      duration: "2h 45m",
      price: 5200,
      seats: 38
    },
    {
      id: 7,
      airline: "IndiGo",
      flightNo: "6E-707",
      from: "Delhi (DEL)",
      to: "Kolkata (CCU)",
      departure: "12:45",
      arrival: "15:00",
      duration: "2h 15m",
      price: 4700,
      seats: 40
    },
    {
      id: 8,
      airline: "SpiceJet",
      flightNo: "SG-808",
      from: "Bangalore (BLR)",
      to: "Hyderabad (HYD)",
      departure: "10:30",
      arrival: "11:40",
      duration: "1h 10m",
      price: 3200,
      seats: 45
    },
    {
      id: 9,
      airline: "Vistara",
      flightNo: "UK-909",
      from: "Chennai (MAA)",
      to: "Kochi (COK)",
      departure: "16:20",
      arrival: "17:45",
      duration: "1h 25m",
      price: 3800,
      seats: 30
    },
    {
      id: 10,
      airline: "IndiGo",
      flightNo: "6E-1010",
      from: "Hyderabad (HYD)",
      to: "Ahmedabad (AMD)",
      departure: "13:15",
      arrival: "15:05",
      duration: "1h 50m",
      price: 4400,
      seats: 35
    }
  ];

  // Indian airports for dropdown
  const airports = [
    "Mumbai (BOM)", "Delhi (DEL)", "Bangalore (BLR)", "Chennai (MAA)", 
    "Kolkata (CCU)", "Hyderabad (HYD)", "Ahmedabad (AMD)", "Pune (PNQ)",
    "Goa (GOI)", "Kochi (COK)", "Jaipur (JAI)", "Lucknow (LKO)"
  ];

  // State variables
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
    class: "economy"
  });
  
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    passengers: 1
  });
  const [bookingComplete, setBookingComplete] = useState(false);

  // Handle search form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  // Handle booking form changes
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value
    });
  };

  // Search for flights
  const searchFlights = (e) => {
    e.preventDefault();
    
    if (!searchParams.from || !searchParams.to || !searchParams.date) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (searchParams.from === searchParams.to) {
      alert("Departure and arrival cities cannot be the same");
      return;
    }
    
    // Filter flights based on search criteria
    const results = domesticRoutes.filter(flight => 
      flight.from === searchParams.from && 
      flight.to === searchParams.to
    );
    
    setFilteredFlights(results);
    setShowResults(true);
    setSelectedFlight(null);
    setBookingComplete(false);
  };

  // Select a flight
  const selectFlight = (flight) => {
    setSelectedFlight(flight);
    setBookingDetails({
      ...bookingDetails,
      passengers: searchParams.passengers
    });
  };

  // Book a flight
  const bookFlight = (e) => {
    e.preventDefault();
    
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone) {
      alert("Please fill in all passenger details");
      return;
    }
    
    // In a real app, you would send this data to a backend
    console.log("Booking details:", {
      flight: selectedFlight,
      passengerInfo: bookingDetails,
      totalPrice: selectedFlight.price * bookingDetails.passengers
    });
    
    setBookingComplete(true);
  };

  // Reset search
  const resetSearch = () => {
    setSearchParams({
      from: "",
      to: "",
      date: "",
      passengers: 1,
      class: "economy"
    });
    setShowResults(false);
    setSelectedFlight(null);
    setBookingComplete(false);
  };

  return (
    <div className="domestic-flights-container">
      <div className="flights-header">
        <h1><i className="fas fa-plane"></i> Domestic Flight Booking</h1>
        <p>Book your domestic flights across India</p>
      </div>
      
      {!showResults ? (
        <form className="search-form" onSubmit={searchFlights}>
          <div className="form-row">
            <div className="form-group">
              <label>From</label>
              <select 
                name="from" 
                value={searchParams.from} 
                onChange={handleInputChange}
                required
              >
                <option value="">Select departure city</option>
                {airports.map(airport => (
                  <option key={airport} value={airport}>{airport}</option>
                ))}
              </select>
            </div>
            
            <div className="swap-button">
              <button type="button" onClick={() => {
                const temp = searchParams.from;
                setSearchParams({
                  ...searchParams,
                  from: searchParams.to,
                  to: temp
                });
              }}>
                <i className="fas fa-exchange-alt"></i>
              </button>
            </div>
            
            <div className="form-group">
              <label>To</label>
              <select 
                name="to" 
                value={searchParams.to} 
                onChange={handleInputChange}
                required
              >
                <option value="">Select arrival city</option>
                {airports.map(airport => (
                  <option key={airport} value={airport}>{airport}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Departure Date</label>
              <input 
                type="date" 
                name="date" 
                value={searchParams.date} 
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Passengers</label>
              <select 
                name="passengers" 
                value={searchParams.passengers} 
                onChange={handleInputChange}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Class</label>
              <select 
                name="class" 
                value={searchParams.class} 
                onChange={handleInputChange}
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>
          
          <button type="submit" className="search-btn">
            <i className="fas fa-search"></i> Search Flights
          </button>
        </form>
      ) : (
        <div className="results-container">
          {!selectedFlight ? (
            <>
              <div className="results-header">
                <h2>Available Flights</h2>
                <p>{searchParams.from} to {searchParams.to} • {searchParams.date} • {searchParams.passengers} {searchParams.passengers === 1 ? 'Passenger' : 'Passengers'}</p>
                <button onClick={resetSearch} className="modify-search">
                  <i className="fas fa-edit"></i> Modify Search
                </button>
              </div>
              
              {filteredFlights.length === 0 ? (
                <div className="no-flights">
                  <i className="fas fa-plane-slash"></i>
                  <h3>No flights found</h3>
                  <p>We couldn't find any flights for your selected route and date.</p>
                  <button onClick={resetSearch} className="search-again">
                    Try Another Search
                  </button>
                </div>
              ) : (
                <div className="flights-list">
                  {filteredFlights.map(flight => (
                    <div key={flight.id} className="flight-card">
                      <div className="flight-info">
                        <div className="airline">
                          <div className="airline-name">{flight.airline}</div>
                          <div className="flight-number">{flight.flightNo}</div>
                        </div>
                        
                        <div className="timing">
                          <div className="departure">
                            <div className="time">{flight.departure}</div>
                            <div className="city">{flight.from}</div>
                          </div>
                          
                          <div className="duration">
                            <div className="line">
                              <div className="dot start"></div>
                              <div className="dot end"></div>
                            </div>
                            <div className="duration-text">{flight.duration}</div>
                          </div>
                          
                          <div className="arrival">
                            <div className="time">{flight.arrival}</div>
                            <div className="city">{flight.to}</div>
                          </div>
                        </div>
                        
                        <div className="seats">
                          <i className="fas fa-chair"></i>
                          <span>{flight.seats} seats left</span>
                        </div>
                      </div>
                      
                      <div className="flight-price">
                        <div className="price">₹{flight.price.toLocaleString()}</div>
                        <button onClick={() => selectFlight(flight)} className="select-flight">
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : !bookingComplete ? (
            <div className="booking-container">
              <div className="booking-header">
                <h2>Complete Your Booking</h2>
                <button onClick={() => setSelectedFlight(null)} className="back-to-flights">
                  <i className="fas fa-arrow-left"></i> Back to flights
                </button>
              </div>
              
              <div className="flight-summary">
                <h3>Flight Details</h3>
                <div className="summary-card">
                  <div className="airline">{selectedFlight.airline} • {selectedFlight.flightNo}</div>
                  <div className="route">
                    <span>{selectedFlight.from}</span>
                    <i className="fas fa-arrow-right"></i>
                    <span>{selectedFlight.to}</span>
                  </div>
                  <div className="timing">
                    <div>Departure: {selectedFlight.departure}</div>
                    <div>Arrival: {selectedFlight.arrival}</div>
                    <div>Duration: {selectedFlight.duration}</div>
                  </div>
                  <div className="price-details">
                    <div>Passengers: {bookingDetails.passengers}</div>
                    <div>Total: ₹{(selectedFlight.price * bookingDetails.passengers).toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              <form className="passenger-form" onSubmit={bookFlight}>
                <h3>Passenger Details</h3>
                
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={bookingDetails.name} 
                    onChange={handleBookingChange}
                    placeholder="Enter passenger name"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={bookingDetails.email} 
                      onChange={handleBookingChange}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={bookingDetails.phone} 
                      onChange={handleBookingChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
                
                <button type="submit" className="book-now-btn">
                  <i className="fas fa-ticket-alt"></i> Book Now
                </button>
              </form>
            </div>
          ) : (
            <div className="booking-confirmation">
              <div className="confirmation-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h2>Booking Confirmed!</h2>
              <p>Your flight from {selectedFlight.from} to {selectedFlight.to} has been successfully booked.</p>
              <div className="confirmation-details">
                <p><strong>Airline:</strong> {selectedFlight.airline} ({selectedFlight.flightNo})</p>
                <p><strong>Departure:</strong> {searchParams.date} at {selectedFlight.departure}</p>
                <p><strong>Passenger:</strong> {bookingDetails.name}</p>
                <p><strong>Total Paid:</strong> ₹{(selectedFlight.price * bookingDetails.passengers).toLocaleString()}</p>
              </div>
              <div className="confirmation-actions">
                <button onClick={() => window.print()} className="print-ticket">
                  <i className="fas fa-print"></i> Print Ticket
                </button>
                <button onClick={resetSearch} className="book-another">
                  <i className="fas fa-plus"></i> Book Another Flight
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DomesticFlights