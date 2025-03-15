import axios from 'axios';

const API_URL = '/api/quizzes';

// Error handler utility
const handleApiError = (error) => {
  const message = error.response?.data?.message || 'An error occurred';
  throw new Error(message);
};

export const quizService = {
  // Get quiz details
  getQuizDetails: async (quizId) => {
    try {
      const response = await axios.get(`${API_URL}/${quizId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Start a quiz session
  startQuiz: async (quizId) => {
    try {
      const response = await axios.get(`${API_URL}/start/${quizId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Submit quiz answers
  submitQuiz: async (attemptId, answers) => {
    try {
      const response = await axios.post(`${API_URL}/submit/${attemptId}`, { answers });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get quiz results
  getQuizResults: async (attemptId) => {
    try {
      const response = await axios.get(`${API_URL}/results/${attemptId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get quiz analytics
  getQuizAnalytics: async (quizId) => {
    try {
      const response = await axios.get(`${API_URL}/analytics/${quizId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Save quiz progress
  saveProgress: async (attemptId, answers) => {
    try {
      const response = await axios.post(`${API_URL}/progress/${attemptId}`, { answers });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get saved progress
  getProgress: async (attemptId) => {
    try {
      const response = await axios.get(`${API_URL}/progress/${attemptId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Submit individual answer (for real-time saving)
  submitAnswer: async (attemptId, questionId, answer) => {
    try {
      const response = await axios.post(`${API_URL}/answer/${attemptId}`, {
        questionId,
        answer
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get user's quiz history
  getQuizHistory: async () => {
    try {
      const response = await axios.get(`${API_URL}/history`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};

export default quizService;