import React, { useEffect, useState } from "react";
import API from "../services/api";

const FlightsList = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const res = await API.get("/flights");
                setFlights(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFlights();
    }, []);

    return (
        <div>
            <h2>Available Flights</h2>
            {flights.map(flight => (
                <div key={flight._id}>
                    <h3>{flight.airline} - {flight.flightNumber}</h3>
                    <p>{flight.from} → {flight.to}</p>
                    <p>Price: ₹{flight.price}</p>
                </div>
            ))}
        </div>
    );
};

export default FlightsList;
