// bookingService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/bookings'; // backend URL

export const createBooking = async (bookingData) => {
    try {
        const response = await axios.post(API_URL, bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

export const getBookings = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error;
    }
};
