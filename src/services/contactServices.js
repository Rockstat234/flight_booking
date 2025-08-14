// contactService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/contact'; // backend URL

export const sendContactForm = async (contactData) => {
    try {
        const response = await axios.post(API_URL, contactData);
        return response.data;
    } catch (error) {
        console.error('Error sending contact form:', error);
        throw error;
    }
};
