import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import SignIn from './SignIn';
import Support from './Support';
import Search from './Search';
import GiftCards from './GiftCards';
import Tariff from './Tariff';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Home from './components/Home';
import MaharajaClub from "./MaharajaClub";
import Experience from "./Experience";
import Prepare from "./Prepare";
import WhereWeFly from "./WhereWeFly";
import BookManage from './BookManage';
import EzBooking from './EzBooking';
import ContactUs from './ContactUs';
import ManageBooking from './components/ManageBooking';
import FaqPage from './components/FaqPage';
import FlightSchedule from './components/FlightSchedule';

function App() {
  return (
    <div>
      {/* ✅ Fixed Navbar */}
      <Navbar />

      {/* ✅ Page content pushed down below fixed Navbar */}
      <div style={{ paddingTop: '125px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/support" element={<Support />} />
          <Route path="/search" element={<Search />} />
          <Route path="/giftcard" element={<GiftCards />} />
          <Route path="/tariff" element={<Tariff />} />
          <Route path="/maharajaclub" element={<MaharajaClub />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/wherewefly" element={<WhereWeFly />} />
          <Route path="/book-manage" element={<BookManage />} />
          <Route path="/ezbooking" element={<EzBooking />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/manage-booking" element={<ManageBooking />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/schedule" element={<FlightSchedule />} />
        </Routes>

        {/* ✅ Footer stays below all content */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
