import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Ticket({ booking }) {
  return (
    <div className="flex justify-center mt-6">
      <Card className="w-[400px] border-2 border-dashed shadow-2xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center">🎟️ EasyAir E-Ticket</h2>
          <hr className="my-3" />
          <p><b>Passenger:</b> {booking.userName}</p>
          <p><b>Email:</b> {booking.email}</p>
          <p><b>Flight:</b> {booking.flight.airline} ({booking.flight.flightNumber})</p>
          <p><b>Route:</b> {booking.flight.from} → {booking.flight.to}</p>
          <p><b>Departure:</b> {new Date(booking.flight.departure).toLocaleString()}</p>
          <p><b>Arrival:</b> {new Date(booking.flight.arrival).toLocaleString()}</p>
          <p><b>Seats:</b> {booking.seats}</p>
          <p className="text-green-600 font-bold text-lg">Paid: ₹{booking.flight.price * booking.seats}</p>
          <hr className="my-3" />
          <p className="text-sm text-gray-600 text-center">Bank: {booking.bankName} | A/c: {booking.accountNo} | IFSC: {booking.ifsc}</p>
          <p className="text-xs text-center mt-2">Thank you for choosing EasyAir ✈️</p>
        </CardContent>
      </Card>
    </div>
  );
}
