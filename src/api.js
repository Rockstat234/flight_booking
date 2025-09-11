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
  const res = await fetch(`${BASE}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket), // 👈 full booking object पास करा
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`❌ createBooking failed: ${err}`);
  }
  return res.json();
}

/* 💳 Pay for Booking */
export async function payBooking({ bookingId, amount, method = "credit" }) {
  if (!bookingId || !amount || !method) {
    throw new Error("bookingId, amount आणि method required आहेत");
  }

  const res = await fetch(`${BASE}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookingId,
      amount: Number(amount),
      method,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`❌ payBooking failed: ${err}`);
  }
  return res.json();
}

/* 🎫 Get Ticket by PNR */
export async function getTicket(pnr) {
  const res = await fetch(`${BASE}/ticket/${pnr}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`❌ getTicket failed: ${err}`);
  }
  return res.json();
}

/* 📋 Get All Bookings */
export async function getAllBookings() {
  const res = await fetch(`${BASE}/all`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`❌ getAllBookings failed: ${err}`);
  }
  return res.json();
}
