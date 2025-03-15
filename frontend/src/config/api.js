import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:5001',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;