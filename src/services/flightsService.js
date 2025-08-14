import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/flights';

// ✅ नवीन फ्लाइट तयार करण्यासाठी
export const createFlight = async (flightData) => {
    try {
        const response = await axios.post(API_URL, flightData);
        return response.data;
    } catch (error) {
        console.error('❌ Flight creation failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to create flight');
    }
};

// ✅ सर्व flights मिळवण्यासाठी
export const getFlights = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('❌ Fetching flights failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch flights');
    }
};
