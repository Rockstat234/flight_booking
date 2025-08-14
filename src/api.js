// simple fetch helpers
const BASE = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

export async function searchFlights(payload) {
  const res = await fetch(`${BASE}/flights/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("searchFlights failed");
  return res.json(); // {count, flights}
}

export async function createBooking(ticket) {
  const res = await fetch(`${BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket)
  });
  if (!res.ok) throw new Error("createBooking failed");
  return res.json(); // {message, booking}
}

export async function payBooking(bookingId, method) {
  const res = await fetch(`${BASE}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId, method })
  });
  if (!res.ok) throw new Error("payBooking failed");
  return res.json(); // {message, booking}
}
