// src/services/authservice.js
const AUTH_TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

class AuthService {
    setAuth(token, userData) {
        console.log('Setting auth token:', token ? 'Token exists' : 'No token');
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        if (userData) {
            localStorage.setItem(USER_KEY, JSON.stringify(userData));
        }
    }

    getToken() {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        console.log('Getting token:', token ? 'Token exists' : 'No token');
        return token;
    }

    isAuthenticated() {
        const token = this.getToken();
        console.log('Checking auth:', token ? 'Is authenticated' : 'Not authenticated');
        return !!token;
    }

    getUser() {
        const userData = localStorage.getItem(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }

    logout() {
        console.log('Logging out, clearing storage');
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    getAuthHeader() {
        const token = this.getToken();
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
}

const authService = new AuthService();
export default authService;