// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

// Common Layout Components
import Navbar from "./Navbar";
import Footer from "./components/Footer";
import Banner from "./components/Banner";

// Pages & Components
import SignIn from "./SignIn";
import Support from "./Support";
import Search from "./Search";
import GiftCards from "./GiftCards";
import Tariff from "./Tariff";
import Home from "./components/Home";
import MaharajaClub from "./MaharajaClub";
import HotelBooking from "./pages/HotelBooking";
import Prepare from "./Prepare";
import WhereWeFly from "./WhereWeFly";
import BookManage from "./BookManage";
import EzBooking from "./EzBooking";
import ContactUs from "./ContactUs";
import ManageBooking from "./components/ManageBooking";
import FaqPage from "./components/FaqPage";
import FlightSchedule from "./components/FlightSchedule";
import DestinationDetails from "./DestinationDetail";
import BookFlights from "./components/BookFlights";
import FlightCreate from "./components/FlightCreate";
import HotelList from "./pages/HotelList";
import BookingDetails from './components/BookingDetails';
import CheckIn from './components/CheckIn';
// ✈ New Page for Flight Search + Booking


function App() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "125px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/support" element={<Support />} />
          <Route path="/search" element={<Search />} />
          <Route path="/giftcard" element={<GiftCards />} />
          <Route path="/tariff" element={<Tariff />} />
          <Route path="/maharajaclub" element={<MaharajaClub />} />
          <Route path="/hotelbooking" element={<HotelBooking />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/wherewefly" element={<WhereWeFly />} />
          <Route path="/book-manage" element={<BookManage />} />
          <Route path="/ezbooking" element={<EzBooking />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/manage-booking" element={<ManageBooking />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/schedule" element={<FlightSchedule />} />
          <Route path="/destination/:city" element={<DestinationDetails />} />
          <Route path="/bookflights" element={<BookFlights />} />
          <Route path="/create-flight" element={<FlightCreate />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path="/booking-details" element={<BookingDetails />}
           /><Route path="/checkIn" element={<CheckIn />} />
          {/* ✈ Flight Search + Booking Page */}
 
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
