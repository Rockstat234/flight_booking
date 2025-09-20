import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookManage.css";
import { 
  Search, Edit, CheckCircle, Clock, 
  ArrowRight, Ticket, Plane, User, 
  CreditCard, Luggage, MapPin, Calendar,
  ChevronRight, ShieldCheck, Info,
  BookOpen, XCircle, AlertCircle
} from "lucide-react";

function BookManage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("book");
  const [formData, setFormData] = useState({
    pnr: "",
    lastName: "",
    flightNumber: "",
    departureDate: ""
  });
  const [searchType, setSearchType] = useState("flightNumber");
  const [flightStatusQuery, setFlightStatusQuery] = useState("");
  const [errors, setErrors] = useState({});
  
  // Sample data for demonstration
  const recentBookings = [
    { 
      pnr: "ABC123", 
      flight: "AI-101", 
      date: "15 Aug 2023", 
      route: "DEL → BOM",
      status: "Confirmed",
      passengers: 2,
      departureTime: "14:30",
      arrivalTime: "17:00"
    },
    { 
      pnr: "XYZ456", 
      flight: "AI-202", 
      date: "20 Aug 2023", 
      route: "BOM → GOI",
      status: "Checked-in",
      passengers: 1,
      departureTime: "10:15",
      arrivalTime: "11:30"
    }
  ];

  const upcomingTrips = [
    {
      date: "25 Aug 2023",
      route: "DEL → JAI",
      flight: "AI-305",
      time: "08:45 - 10:15",
      terminal: "T3",
      status: "Scheduled"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (type) => {
    const newErrors = {};
    
    if (type === "manage") {
      if (!formData.pnr) newErrors.pnr = "PNR is required";
      else if (formData.pnr.length !== 6) newErrors.pnr = "PNR must be 6 characters";
      
      if (!formData.lastName) newErrors.lastName = "Last name is required";
    }
    
    if (type === "checkin") {
      if (!formData.flightNumber) newErrors.flightNumber = "Flight number is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
    }
    
    if (type === "status" && !flightStatusQuery) {
      newErrors.flightStatus = "Search query is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleManageSubmit = (e) => {
    e.preventDefault();
    if (validateForm("manage")) {
      navigate(`/manage-booking?pnr=${formData.pnr}&lastName=${formData.lastName}`);
    }
  };

  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    if (validateForm("checkin")) {
      navigate(`/prepare?flight=${formData.flightNumber}&lastName=${formData.lastName}`);
    }
  };

  const handleFlightStatusSubmit = (e) => {
    e.preventDefault();
    if (validateForm("status")) {
      navigate(`/schedule?query=${flightStatusQuery}&type=${searchType}`);
    }
  };

  const services = [
    {
      id: "book",
      icon: <Search size={24} />,
      title: "Book a Flight",
      description: "Find and book your next journey with our wide network of domestic and international flights.",
      action: "Search Flights",
      route: "/ezbooking",
      color: "#3b82f6"
    },
    {
      id: "manage",
      icon: <Edit size={24} />,
      title: "Manage Booking",
      description: "Modify seats, add baggage, or cancel your existing reservation.",
      action: "Retrieve Booking",
      route: "/manage-booking",
      color: "#10b981"
    },
    {
      id: "checkin",
      icon: <CheckCircle size={24} />,
      title: "Web Check-in",
      description: "Check-in online and save time at the airport. Available 48 hours to 1 hour before departure.",
      action: "Check-in Now",
      route: "/prepare",
      color: "#f59e0b"
    },
    {
      id: "status",
      icon: <Clock size={24} />,
      title: "Flight Status",
      description: "Get real-time updates about your flight's schedule and gate information.",
      action: "Check Status",
      route: "/schedule",
      color: "#8b5cf6"
    }
  ];

  const quickActions = [
    {
      icon: <Plane size={20} />,
      title: "Flight Schedule",
      route: "/schedule",
      desc: "View all flight timings"
    },
    {
      icon: <Ticket size={20} />,
      title: "My Bookings",
      route: "/manage-booking",
      desc: "View all your bookings"
    },
    {
      icon: <Luggage size={20} />,
      title: "Baggage",
      route: "/baggage-info",
      desc: "Baggage rules & fees"
    },
    {
      icon: <User size={20} />,
      title: "Profile",
      route: "/signin",
      desc: "Manage your account"
    },
    {
      icon: <CreditCard size={20} />,
      title: "Payment",
      route: "/payment",
      desc: "Payment options"
    },
    {
      icon: <MapPin size={20} />,
      title: "Airport Info",
      route: "/airport-info",
      desc: "Terminal maps & services"
    }
  ];

  return (
    <div className="book-manage-section">
      <div className="book-manage-container">
        <div className="book-manage-header">
          <div className="welcome-banner">
            <h1>Welcome back, Traveler!</h1>
            <p className="subtitle">
              Everything you need to plan, book, and manage your flights in one place
            </p>
          </div>
          
          {upcomingTrips.length > 0 && (
            <div className="upcoming-trip-card">
              <div className="trip-header">
                <div className="trip-title">
                  <Plane size={20} />
                  <h3>Upcoming Trip</h3>
                </div>
                <span className="trip-date">{upcomingTrips[0].date}</span>
              </div>
              <div className="trip-details">
                <div className="route">
                  <span className="airports">{upcomingTrips[0].route}</span>
                  <span className="flight-number">{upcomingTrips[0].flight}</span>
                </div>
                <div className="timing">
                  <span>{upcomingTrips[0].time}</span>
                  <span>Terminal {upcomingTrips[0].terminal}</span>
                </div>
                <div className="trip-status">
                  <span className={`status ${upcomingTrips[0].status.toLowerCase()}`}>
                    {upcomingTrips[0].status}
                  </span>
                </div>
              </div>
              <button 
                className="action-btn outline"
                onClick={() => navigate(`/manage-booking?flight=${upcomingTrips[0].flight}`)}
              >
                View Details <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="tabs-container">
          <div className="tabs">
            {services.map((service) => (
              <button
                key={service.id}
                className={`tab-btn ${activeTab === service.id ? "active" : ""}`}
                onClick={() => setActiveTab(service.id)}
                style={{ 
                  borderBottomColor: service.color,
                  backgroundColor: activeTab === service.id ? `${service.color}15` : "transparent"
                }}
              >
                <span className="tab-icon" style={{ color: service.color }}>
                  {service.icon}
                </span>
                {service.title}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === "book" && (
              <div className="service-content">
                <div className="service-header">
                  <span className="service-icon" style={{ backgroundColor: services[0].color }}>
                    {services[0].icon}
                  </span>
                  <div>
                    <h2>{services[0].title}</h2>
                    <p className="service-description">{services[0].description}</p>
                  </div>
                </div>
                
                <div className="action-container">
                  <button 
                    className="action-btn primary"
                    style={{ backgroundColor: services[0].color }}
                    onClick={() => navigate(services[0].route)}
                  >
                    {services[0].action} <ArrowRight size={18} />
                  </button>
                  
                  <div className="recent-bookings">
                    <h3><Clock size={20} /> Your Recent Bookings</h3>
                    {recentBookings.length > 0 ? (
                      <div className="booking-cards">
                        {recentBookings.map((booking, index) => (
                          <div key={index} className="booking-card">
                            <div className="booking-header">
                              <span className="pnr">{booking.pnr}</span>
                              <span className={`status ${booking.status.toLowerCase().replace('-', '')}`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="booking-info">
                              <div className="flight-info">
                                <span className="flight">{booking.flight}</span>
                                <span className="route">{booking.route}</span>
                              </div>
                              <div className="timing-info">
                                <span className="date">{booking.date}</span>
                                <span className="time-range">{booking.departureTime} - {booking.arrivalTime}</span>
                              </div>
                              <div className="passenger-info">
                                <span className="passengers">{booking.passengers} passenger(s)</span>
                              </div>
                            </div>
                            <button 
                              className="action-btn outline"
                              onClick={() => navigate(`/manage-booking?pnr=${booking.pnr}`)}
                            >
                              View Details <ChevronRight size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-bookings">
                        <BookOpen size={32} />
                        <p>You don't have any recent bookings</p>
                        <button 
                          className="action-btn text"
                          onClick={() => navigate(services[0].route)}
                        >
                          Book a flight now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "manage" && (
              <div className="service-content">
                <div className="service-header">
                  <span className="service-icon" style={{ backgroundColor: services[1].color }}>
                    {services[1].icon}
                  </span>
                  <div>
                    <h2>{services[1].title}</h2>
                    <p className="service-description">{services[1].description}</p>
                  </div>
                </div>
                
                <form onSubmit={handleManageSubmit} className="service-form">
                  <div className="form-group">
                    <label htmlFor="pnr">PNR/Booking Reference</label>
                    <div className="input-with-hint">
                      <input
                        type="text"
                        id="pnr"
                        name="pnr"
                        value={formData.pnr}
                        onChange={handleInputChange}
                        placeholder="6-character code"
                        className={errors.pnr ? "error" : ""}
                        maxLength="6"
                      />
                      <span className="hint">e.g. ABC123</span>
                    </div>
                    {errors.pnr && <div className="error-message"><AlertCircle size={14} /> {errors.pnr}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="As on booking"
                      className={errors.lastName ? "error" : ""}
                    />
                    {errors.lastName && <div className="error-message"><AlertCircle size={14} /> {errors.lastName}</div>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="action-btn primary"
                    style={{ backgroundColor: services[1].color }}
                  >
                    {services[1].action} <ArrowRight size={18} />
                  </button>
                </form>
                
                <div className="form-footer">
                  <ShieldCheck size={16} />
                  <span>Your booking information is secure and encrypted</span>
                </div>
              </div>
            )}

            {activeTab === "checkin" && (
              <div className="service-content">
                <div className="service-header">
                  <span className="service-icon" style={{ backgroundColor: services[2].color }}>
                    {services[2].icon}
                  </span>
                  <div>
                    <h2>{services[2].title}</h2>
                    <p className="service-description">{services[2].description}</p>
                  </div>
                </div>
                
                <form onSubmit={handleCheckInSubmit} className="service-form">
                  <div className="form-group">
                    <label htmlFor="flightNumber">Flight Number</label>
                    <div className="input-with-hint">
                      <input
                        type="text"
                        id="flightNumber"
                        name="flightNumber"
                        value={formData.flightNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. AI-101"
                        className={errors.flightNumber ? "error" : ""}
                      />
                      <span className="hint">Find on your ticket</span>
                    </div>
                    {errors.flightNumber && <div className="error-message"><AlertCircle size={14} /> {errors.flightNumber}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="As on ticket"
                      className={errors.lastName ? "error" : ""}
                    />
                    {errors.lastName && <div className="error-message"><AlertCircle size={14} /> {errors.lastName}</div>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="action-btn primary"
                    style={{ backgroundColor: services[2].color }}
                  >
                    {services[2].action} <ArrowRight size={18} />
                  </button>
                </form>
                
                <div className="checkin-tips">
                  <h4>Check-in Tips</h4>
                  <ul>
                    <li>Check-in opens 48 hours before departure</li>
                    <li>Have your passport/ID ready for international flights</li>
                    <li>Print or download your boarding pass</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "status" && (
              <div className="service-content">
                <div className="service-header">
                  <span className="service-icon" style={{ backgroundColor: services[3].color }}>
                    {services[3].icon}
                  </span>
                  <div>
                    <h2>{services[3].title}</h2>
                    <p className="service-description">{services[3].description}</p>
                  </div>
                </div>
                
                <form onSubmit={handleFlightStatusSubmit} className="flight-status-form">
                  <div className="form-group">
                    <label>Search by:</label>
                    <div className="search-options">
                      <button 
                        type="button"
                        className={`search-option ${searchType === "flightNumber" ? "active" : ""}`}
                        onClick={() => setSearchType("flightNumber")}
                      >
                        Flight Number
                      </button>
                      <button 
                        type="button"
                        className={`search-option ${searchType === "route" ? "active" : ""}`}
                        onClick={() => setSearchType("route")}
                      >
                        Route
                      </button>
                      <button 
                        type="button"
                        className={`search-option ${searchType === "date" ? "active" : ""}`}
                        onClick={() => setSearchType("date")}
                      >
                        Date
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      value={flightStatusQuery}
                      onChange={(e) => setFlightStatusQuery(e.target.value)}
                      placeholder={
                        searchType === "flightNumber" ? "Enter flight number (e.g. AI-101)" :
                        searchType === "route" ? "Enter route (e.g. DEL-BOM)" :
                        "Enter date (e.g. 15 Aug 2023)"
                      }
                      className={errors.flightStatus ? "error" : ""}
                    />
                    {errors.flightStatus && <div className="error-message"><AlertCircle size={14} /> {errors.flightStatus}</div>}
                  </div>
                  
                  <button 
                    type="submit"
                    className="action-btn primary"
                    style={{ backgroundColor: services[3].color }}
                  >
                    {services[3].action} <ArrowRight size={18} />
                  </button>
                </form>
                
                <div className="flight-status-info">
                  <h4>Popular Flights Status</h4>
                  <div className="status-cards">
                    <div className="status-card">
                      <div className="flight-info">
                        <span className="flight">AI-101</span>
                        <span className="route">DEL → BOM</span>
                      </div>
                      <div className="status-info">
                        <span className="status on-time">On Time</span>
                        <span className="time">Departs 14:30</span>
                      </div>
                    </div>
                    <div className="status-card">
                      <div className="flight-info">
                        <span className="flight">AI-202</span>
                        <span className="route">BOM → GOI</span>
                      </div>
                      <div className="status-info">
                        <span className="status delayed">Delayed</span>
                        <span className="time">Now 16:45</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-grid">
            {quickActions.map((action, index) => (
              <div 
                key={index} 
                className="action-card"
                onClick={() => navigate(action.route)}
              >
                <div className="action-icon" style={{ 
                  backgroundColor: `rgba(${hexToRgb(services[index % services.length].color)}, 0.1)`,
                  color: services[index % services.length].color
                }}>
                  {action.icon}
                </div>
                <div className="action-text">
                  <span className="action-title">{action.title}</span>
                  <span className="action-desc">{action.desc}</span>
                </div>
                <ChevronRight size={18} className="action-arrow" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export default BookManage;