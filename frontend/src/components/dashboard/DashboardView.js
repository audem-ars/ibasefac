// src/components/dashboard/DashboardView.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { dashboardcontroller } from '../../controllers/dashboardcontroller';
import { 
    Box, Stack, Container,
    useColorModeValue
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import DashboardContent from './DashboardContent';

const DashboardView = () => {
    const [dashboarddata, setdashboarddata] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(null);
    const [selectedTimeframe, setselectedtimeframe] = useState('month');
    const [activeView, setActiveView] = useState('overview');
    const navigate = useNavigate();

    const fetchdata = useCallback(async () => {
        try {
            const data = await dashboardcontroller.fetchdashboarddata();
            setdashboarddata(data);
            seterror(null);
        } catch (err) {
            seterror(err.message);
            console.error('Error fetching dashboard data:', err);
        } finally {
            setloading(false);
        }
    }, []);

    useEffect(() => {
        fetchdata();
        const interval = setInterval(fetchdata, 300000); // Refresh every 5 minutes
        return () => clearInterval(interval);
    }, [fetchdata]);

    const calculatetrend = (current, previous) => {
        if (!previous) return 0;
        return ((current - previous) / previous) * 100;
    };

    const handleViewChange = (view) => {
        setActiveView(view);
        if (view === 'learning_path') {
            navigate('/learning-path');
        }
    };

    const handleQuickAction = (action) => {
        if (action === 'Learning Path') {
            navigate('/learning-path');
        }
        // Handle other quick actions here
    };

    return (
        <Box 
            minH="100vh" 
            bg={useColorModeValue('gray.50', 'gray.900')} 
            p={{ base: 4, md: 8 }}
        >
            <Container maxW="8xl">
                <DashboardContent 
                    dashboarddata={dashboarddata}
                    loading={loading}
                    error={error}
                    selectedTimeframe={selectedTimeframe}
                    setselectedtimeframe={setselectedtimeframe}
                    activeView={activeView}
                    setActiveView={handleViewChange}
                    calculatetrend={calculatetrend}
                    onQuickAction={handleQuickAction}
                />
            </Container>
        </Box>
    );
};

export default DashboardView;