import React, { createContext, useContext, useState } from 'react';

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
    const [timeSpent, setTimeSpent] = useState(0);
    const [exercisesDone, setExercisesDone] = useState(0);

    const updateTotalTime = (newTime) => {
        setTimeSpent(prevTimeSpent => prevTimeSpent + newTime);
    };

    const incrementExercisesDone = () => {
        setExercisesDone((prevCount) => prevCount + 1);
    };

    return (
        <TimeContext.Provider value={{ timeSpent, setTimeSpent, exercisesDone, setExercisesDone, incrementExercisesDone, updateTotalTime }}>
            {children}
        </TimeContext.Provider>
    );
};

export const useTime = () => useContext(TimeContext);
