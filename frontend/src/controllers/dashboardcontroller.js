// src/controllers/dashboardcontroller.js
import authService from '../services/authservice';

const BASE_URL = 'http://localhost:5001';

class dashboardcontrollerclass {
    static async fetchdashboarddata() {
        try {
            console.log('Starting to fetch dashboard data...');
            
            // Get token
            const token = localStorage.getItem('auth_token');
            console.log('Token found:', !!token);
            
            if (!token) {
                throw new Error('Not authenticated');
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            console.log('Making requests with headers:', {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer [hidden]'
            });

            // First, try to fetch analytics data
            console.log('Fetching analytics data...');
            const analytics = await fetch(`${BASE_URL}/api/analytics/dashboard`, {
                method: 'GET',
                headers
            });

            // Log the analytics response status
            console.log('Analytics response status:', analytics.status);

            if (!analytics.ok) {
                throw new Error('Failed to fetch analytics data: ' + analytics.statusText);
            }

            const analyticsData = await analytics.json();
            console.log('Analytics data received:', analyticsData);

            // Next, try to fetch transformation data
            console.log('Fetching transformation data...');
            const transformation = await fetch(`${BASE_URL}/api/analytics/transformation`, {
                method: 'GET',
                headers
            });

            if (!transformation.ok) {
                throw new Error('Failed to fetch transformation data: ' + transformation.statusText);
            }

            const transformationData = await transformation.json();

            // Finally, fetch enterprise data
            console.log('Fetching enterprise data...');
            const enterprise = await fetch(`${BASE_URL}/api/enterprise/analytics/impact`, {
                method: 'GET',
                headers
            });

            if (!enterprise.ok) {
                throw new Error('Failed to fetch enterprise data: ' + enterprise.statusText);
            }

            const enterpriseData = await enterprise.json();

            // Combine all data
            return {
                dashboard: {
                    enterprisemetrics: enterpriseData,
                    transformationmetrics: transformationData,
                    ...analyticsData
                },
                analytics: analyticsData,
                transformation: transformationData
            };

        } catch (error) {
            console.error('Error in fetchdashboarddata:', error);
            if (error.message.includes('Unauthorized')) {
                // Clear token and force re-login
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user_data');
                window.location.reload();
            }
            throw error;
        }
    }
}

export const dashboardcontroller = dashboardcontrollerclass;