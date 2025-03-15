// src/context/VisionContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const VisionContext = createContext();

export const VisionProvider = ({ children }) => {
    const [vision, setVision] = useState(() => {
        const savedVision = localStorage.getItem('userVision');
        return savedVision ? JSON.parse(savedVision) : {
            personalVision: '',
            careerGoals: [],
            skillGoals: [],
            timelineGoals: [],
            aiIntegration: {},
            progressMetrics: {},
            lastUpdated: null
        };
    });

    useEffect(() => {
        localStorage.setItem('userVision', JSON.stringify(vision));
    }, [vision]);

    return (
        <VisionContext.Provider value={{ vision, setVision }}>
            {children}
        </VisionContext.Provider>
    );
};

export const useVision = () => {
    const context = useContext(VisionContext);
    if (!context) {
        throw new Error('useVision must be used within a VisionProvider');
    }
    return context;
};

export default VisionContext;