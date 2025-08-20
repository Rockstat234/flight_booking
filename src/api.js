// api.js – Simple fetch helpers
const BASE = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

/* ✈️ Search Flights */
export async function searchFlights(payload) {
  const res = await fetch(`${BASE}/flights/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`❌ searchFlights failed: ${err}`);
  }
  return res.json();
}

/* 🛒 Create Flight Booking */
export async function createBooking(ticket) {
  const res = await fetch(`${BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      flightId: ticket._id || ticket.id,
      passengers: ticket.passengers || 1,
      travelClass: ticket.travelClass || "economy",
      amount: Number(ticket.price) || 0, // ✅ backend requires amount (Number)
      customerName: ticket.customerName || "Demo User",
      customerEmail: ticket.customerEmail || "demo@example.com",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`❌ createBooking failed: ${err}`);
  }
  return res.json();
}

/* 💳 Pay for Booking */
export async function payBooking(bookingId, amount, method = "card") {
  const res = await fetch(`${BASE}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookingId,
      amount: Number(amount), // ✅ amount must be a number
      method, // must match backend enum (card / upi / netbanking)
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`❌ payBooking failed: ${err}`);
  }
  return res.json();
}

/* 🏨 Fetch Hotels */
export async function fetchHotels() {
  const res = await fetch(`${BASE}/hotels`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`❌ fetchHotels failed: ${err}`);
  }
  return res.json();
}

/* 🏨 Book Hotel */
export async function bookHotel(
  hotelId,
  rooms = 1,
  userName = "Demo User",
  email = "demo@example.com"
) {
  const res = await fetch(`${BASE}/hotel-bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hotelId, rooms, userName, email }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`❌ bookHotel failed: ${err}`);
  }
  return res.json();
}
