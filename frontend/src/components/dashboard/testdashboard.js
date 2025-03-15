import React, { useEffect, useState } from 'react';

export const TestDashboard = () => {
    const [testResults, setTestResults] = useState({});

    useEffect(() => {
        const runTests = async () => {
            try {
                // Test dashboard load
                const dashboardResponse = await fetch('/api/dashboard');
                const dashboardData = await dashboardResponse.json();
                
                // Test analytics
                const analyticsResponse = await fetch('/api/analytics/impact');
                const analyticsData = await analyticsResponse.json();
                
                // Test learning path
                const learningResponse = await fetch('/api/ai-learning-path');
                const learningData = await learningResponse.json();

                setTestResults({
                    dashboard: dashboardData,
                    analytics: analyticsData,
                    learning: learningData
                });
            } catch (error) {
                console.error('Test Error:', error);
            }
        };

        runTests();
    }, []);

    return (
        <div>
            <h2>Dashboard Test Results</h2>
            <pre>{JSON.stringify(testResults, null, 2)}</pre>
        </div>
    );
};