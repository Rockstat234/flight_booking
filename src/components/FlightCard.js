import React from "react";

export default function FlightCard({ f, onBook }){
  return (
    <div className="flight">
      <div className="airline">
        <span style={{fontSize:20}}>{f.logo || "🛩️"}</span>
        {f.airline}
        <span className="chip">{f.flightNumber}</span>
      </div>
      <div>
        <div><b>{f.from}</b> → <b>{f.to}</b></div>
        <div className="helper">Duration: {f.duration || "—"}</div>
      </div>
      <div>
        <div><b>{f.departureTime}</b> depart</div>
        <div className="helper">{f.departure || f.date}</div>
      </div>
      <div>
        <div><b>{f.arrivalTime}</b> arrive</div>
        <div className="helper">{f.travelClass}</div>
      </div>
      <div className="price">₹{Number(f.price).toLocaleString()}</div>
      <div className="actions">
        <button className="btn" onClick={() => onBook(f)}>Book</button>
      </div>
    </div>
  );
}
