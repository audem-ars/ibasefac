import axios from 'axios';

const API_URL = '/api/learning';

const handleApiError = (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    throw new Error(message);
};

export const learningService = {
    // Get module details
    getModuleDetails: async (moduleId) => {
        try {
            const response = await axios.get(`${API_URL}/${moduleId}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // Start learning module
    startModule: async (moduleId) => {
        try {
            const response = await axios.get(`${API_URL}/start/${moduleId}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // Track module progress
    saveProgress: async (moduleId, progress) => {
        try {
            const response = await axios.post(`${API_URL}/progress/${moduleId}`, { progress });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // Get saved progress
    getProgress: async (moduleId) => {
        try {
            const response = await axios.get(`${API_URL}/progress/${moduleId}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // Get learning history
    getLearningHistory: async () => {
        try {
            const response = await axios.get(`${API_URL}/history`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    // Get module analytics
    getModuleAnalytics: async (moduleId) => {
        try {
            const response = await axios.get(`${API_URL}/analytics/${moduleId}`);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
};

export default learningService;