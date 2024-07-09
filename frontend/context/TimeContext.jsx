import React, { createContext, useContext, useState } from 'react';

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
    const [timeSpent, setTimeSpent] = useState(0);

    const updateTotalTime = (newTime) => {
        setTimeSpent(prevTimeSpent => prevTimeSpent + newTime); // Use functional update to ensure correct state update
    };

    return (
        <TimeContext.Provider value={{ timeSpent, updateTotalTime }}>
            {children}
        </TimeContext.Provider>
    );
};

export const useTime = () => useContext(TimeContext);
