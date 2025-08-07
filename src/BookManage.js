import React, { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiEdit, 
  FiCheckCircle, 
  FiClock, 
  FiMapPin, 
  FiCalendar, 
  FiUsers,
  FiChevronDown,
  FiNavigation,
  FiStar,
  FiHeart
} from 'react-icons/fi';
import './BookManage.css';

function BookManage() {
  const [activeTab, setActiveTab] = useState('flights');
  const [location, setLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState('roundtrip');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [destination, setDestination] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const popularDestinations = [
    { name: 'New York', code: 'NYC', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { name: 'London', code: 'LON', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { name: 'Paris', code: 'PAR', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { name: 'Tokyo', code: 'TYO', image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { name: 'Dubai', code: 'DXB', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  ];

  const testimonials = [
    {
      quote: "The easiest booking experience I've ever had. Found great deals on flights!",
      author: "Sarah J.",
      rating: 5
    },
    {
      quote: "Location-based hotel recommendations were spot on. Saved me hours of research!",
      author: "Michael T.",
      rating: 4
    },
    {
      quote: "Changed my flight last minute with zero hassle. Amazing service!",
      author: "Priya K.",
      rating: 5
    }
  ];

  const getLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setDepartureDate(today.toISOString().split('T')[0]);
    setReturnDate(tomorrow.toISOString().split('T')[0]);

    // Load recent searches from localStorage
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let searchData = {};
    
    if (activeTab === 'flights') {
      searchData = {
        type: 'flight',
        tripType,
        location,
        departureDate,
        returnDate: tripType === 'roundtrip' ? returnDate : null,
        passengers,
        destination,
        timestamp: new Date().toISOString()
      };
    } else if (activeTab === 'hotels') {
      searchData = {
        type: 'hotel',
        destination,
        checkIn: departureDate,
        checkOut: returnDate,
        guests: passengers,
        timestamp: new Date().toISOString()
      };
    } else {
      searchData = {
        type: 'booking',
        reference: bookingRef,
        timestamp: new Date().toISOString()
      };
    }
    
    // Save to recent searches
    const updatedSearches = [searchData, ...recentSearches].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    
    alert(`Searching for ${activeTab} to ${destination || bookingRef || 'your destination'}`);
  };

  const handleDestinationSelect = (dest) => {
    setDestination(dest.name);
    setShowLocationDropdown(false);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FiStar 
        key={i} 
        className={`star ${i < rating ? 'filled' : ''}`} 
      />
    ));
  };

  return (
    <div className="book-manage-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Next Adventure</h1>
          <p>Book flights, hotels, and manage your trips with our smart travel planner</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Search Section */}
        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'flights' ? 'active' : ''}`}
              onClick={() => setActiveTab('flights')}
            >
              <FiSearch className="tab-icon" /> Flights
            </button>
            <button 
              className={`tab ${activeTab === 'hotels' ? 'active' : ''}`}
              onClick={() => setActiveTab('hotels')}
            >
              <FiCheckCircle className="tab-icon" /> Hotels
            </button>
            <button 
              className={`tab ${activeTab === 'manage' ? 'active' : ''}`}
              onClick={() => setActiveTab('manage')}
            >
              <FiEdit className="tab-icon" /> Manage Trips
            </button>
          </div>

          <div className="search-container">
            <form onSubmit={handleSearch}>
              {activeTab === 'flights' && (
                <>
                  <div className="trip-type-selector">
                    <button 
                      type="button"
                      className={`trip-type ${tripType === 'roundtrip' ? 'active' : ''}`}
                      onClick={() => setTripType('roundtrip')}
                    >
                      Round Trip
                    </button>
                    <button 
                      type="button"
                      className={`trip-type ${tripType === 'oneway' ? 'active' : ''}`}
                      onClick={() => setTripType('oneway')}
                    >
                      One Way
                    </button>
                  </div>

                  <div className="input-row">
                    <div className="input-group">
                      <label>
                        <FiMapPin className="input-icon" /> From
                        <div className="location-input-container">
                          <input 
                            type="text" 
                            placeholder="City or Airport" 
                            value={location ? "Your Location" : ""}
                            readOnly
                            className="location-input"
                          />
                          <button 
                            type="button" 
                            className="location-btn"
                            onClick={getLocation}
                            disabled={isLoadingLocation}
                          >
                            {isLoadingLocation ? (
                              <span className="spinner"></span>
                            ) : (
                              <FiNavigation className="location-icon" />
                            )}
                          </button>
                        </div>
                      </label>
                    </div>

                    <div className="input-group">
                      <label>
                        <FiMapPin className="input-icon" /> To
                        <div className="destination-input-container">
                          <input 
                            type="text" 
                            placeholder="Destination" 
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onFocus={() => setShowLocationDropdown(true)}
                            onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
                            required
                          />
                          {showLocationDropdown && (
                            <div className="destination-dropdown">
                              <div className="dropdown-header">Popular Destinations</div>
                              {popularDestinations.map((dest) => (
                                <div 
                                  key={dest.code} 
                                  className="dropdown-item"
                                  onClick={() => handleDestinationSelect(dest)}
                                >
                                  <div className="destination-image" style={{backgroundImage: `url(${dest.image})`}}></div>
                                  <div className="destination-info">
                                    <div className="destination-name">{dest.name}</div>
                                    <div className="destination-code">{dest.code}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="input-row">
                    <div className="input-group">
                      <label>
                        <FiCalendar className="input-icon" /> Departure
                        <input 
                          type="date" 
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </label>
                    </div>

                    {tripType === 'roundtrip' && (
                      <div className="input-group">
                        <label>
                          <FiCalendar className="input-icon" /> Return
                          <input 
                            type="date" 
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            required={tripType === 'roundtrip'}
                            min={departureDate}
                          />
                        </label>
                      </div>
                    )}

                    <div className="input-group passengers-group">
                      <label>
                        <FiUsers className="input-icon" /> Passengers
                        <div className="passengers-select">
                          <select 
                            value={passengers}
                            onChange={(e) => setPassengers(parseInt(e.target.value))}
                          >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                            ))}
                          </select>
                          <FiChevronDown className="chevron-icon" />
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'hotels' && (
                <>
                  <div className="input-row">
                    <div className="input-group">
                      <label>
                        <FiMapPin className="input-icon" /> Destination
                        <input 
                          type="text" 
                          placeholder="City or Hotel" 
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          required
                        />
                      </label>
                    </div>
                  </div>

                  <div className="input-row">
                    <div className="input-group">
                      <label>
                        <FiCalendar className="input-icon" /> Check-in
                        <input 
                          type="date" 
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </label>
                    </div>

                    <div className="input-group">
                      <label>
                        <FiCalendar className="input-icon" /> Check-out
                        <input 
                          type="date" 
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          required
                          min={departureDate}
                        />
                      </label>
                    </div>

                    <div className="input-group passengers-group">
                      <label>
                        <FiUsers className="input-icon" /> Guests
                        <div className="passengers-select">
                          <select 
                            value={passengers}
                            onChange={(e) => setPassengers(parseInt(e.target.value))}
                          >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                            ))}
                          </select>
                          <FiChevronDown className="chevron-icon" />
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'manage' && (
                <div className="input-row">
                  <div className="input-group full-width">
                    <label>
                      <FiSearch className="input-icon" /> Booking Reference
                      <input 
                        type="text" 
                        placeholder="Enter PNR or Booking ID" 
                        value={bookingRef}
                        onChange={(e) => setBookingRef(e.target.value)}
                        required 
                      />
                    </label>
                  </div>
                </div>
              )}

              <button type="submit" className="search-btn">
                <FiSearch className="search-icon" /> 
                {activeTab === 'flights' && (
                  tripType === 'roundtrip' ? 'Search Flights' : 'Find One-Way Flights'
                )}
                {activeTab === 'hotels' && 'Find Hotels'}
                {activeTab === 'manage' && 'Find Booking'}
              </button>
            </form>
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <h2>Your Recent Searches</h2>
            <div className="searches-grid">
              {recentSearches.map((search, index) => (
                <div key={index} className="search-card">
                  <div className="search-type">{search.type}</div>
                  <div className="search-destination">
                    {search.destination || search.reference || 'Your location'}
                  </div>
                  <div className="search-dates">
                    {search.departureDate || search.checkIn} 
                    {search.returnDate && ` - ${search.returnDate}`}
                    {search.checkOut && ` - ${search.checkOut}`}
                  </div>
                  <button className="search-again-btn">
                    <FiSearch /> Search Again
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Destinations */}
        <div className="popular-destinations">
          <h2>Popular Destinations</h2>
          <div className="destinations-grid">
            {popularDestinations.map((dest) => (
              <div key={dest.code} className="destination-card">
                <div 
                  className="destination-image" 
                  style={{backgroundImage: `url(${dest.image})`}}
                >
                  <button className="favorite-btn">
                    <FiHeart />
                  </button>
                </div>
                <div className="destination-info">
                  <h3>{dest.name}</h3>
                  <div className="destination-code">{dest.code}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2>Why Book With Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon real-time">
                <FiClock />
              </div>
              <h3>Real-Time Tracking</h3>
              <p>Live flight status and location-based alerts</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon flexible">
                <FiEdit />
              </div>
              <h3>Flexible Changes</h3>
              <p>Modify bookings with no fees</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon secure">
                <FiCheckCircle />
              </div>
              <h3>Secure Payments</h3>
              <p>256-bit encrypted transactions</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon support">
                <FiUsers />
              </div>
              <h3>24/7 Support</h3>
              <p>Dedicated customer service team</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonial-section">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <div className="testimonial-content">
                  "{testimonial.quote}"
                </div>
                <div className="testimonial-author">- {testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookManage;