import React, { useState } from "react";
import "./Search.css";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define your searchable items with their corresponding routes
const searchableItems = [
  { name: "Home", path: "/" },
  { name: "Sign In", path: "/signin" },
  { name: "Customer Support", path: "/support" },
  { name: "Gift Cards", path: "/giftcard" },
  { name: "Tariff Information", path: "/tariff" },
  { name: "Maharaja Club", path: "/maharajaclub" },
  { name: "Hotel Booking", path: "/HotelBooking" },
  { name: "Travel Preparation", path: "/prepare" },
  { name: "Destinations We Fly", path: "/wherewefly" },
  { name: "Book & Manage", path: "/book-manage" },
  { name: "Easy Booking", path: "/ezbooking" },
  { name: "Contact Us", path: "/contact" },
  { name: "Manage Booking", path: "/manage-booking" },
  { name: "FAQs", path: "/faq" },
  { name: "Flight Schedule", path: "/schedule" },
  // You can add more specific items related to your services
  { name: "Domestic Flights", keywords: ["flight", "domestic"] },
  { name: "International Flights", keywords: ["flight", "international"] },
  { name: "Baggage Information", keywords: ["luggage", "baggage"] },
  { name: "Check-in Options", keywords: ["checkin", "boarding"] },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 0) {
      const results = searchableItems.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        (item.keywords && item.keywords.some(keyword => 
          keyword.toLowerCase().includes(term.toLowerCase())
        ))
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "" && searchResults.length > 0) {
      // Navigate to the first result
      navigate(searchResults[0].path || "/");
    }
  };

  const handleResultClick = (path) => {
    if (path) {
      navigate(path);
      setShowResults(false);
    }
  };

  return (
    <div className="search-wrapper">
      <h1 className="search-heading">Explore Bharat Yatra Services</h1>
      <p className="search-subtext">Find info about offers, gift cards & more.</p>

      <form className="search-box" onSubmit={handleSearchSubmit}>
        <SearchIcon className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search services or help..."
          value={searchTerm}
          onChange={handleSearch}
          autoComplete="off"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
        
        {showResults && (
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div 
                  key={index} 
                  className="search-result-item"
                  onClick={() => handleResultClick(result.path)}
                >
                  {result.name}
                </div>
              ))
            ) : (
              <div className="search-result-item no-results">
                No services found matching your search
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;