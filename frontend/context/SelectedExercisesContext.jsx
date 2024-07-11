import React, { createContext, useContext, useState } from 'react';

const SelectedExercisesContext = createContext();

export const SelectedExercisesProvider = ({ children }) => {
    const [selectedExercises, setSelectedExercises] = useState([]);

    const toggleExercise = (exerciseId) => {
        setSelectedExercises(prevSelected => {
            if (prevSelected.includes(exerciseId)) {
                return prevSelected.filter(id => id !== exerciseId);
            } else {
                return [...prevSelected, exerciseId];
            }
        });
    };

    return (
        <SelectedExercisesContext.Provider value={{ selectedExercises, toggleExercise }}>
            {children}
        </SelectedExercisesContext.Provider>
    );
};

export const useSelectedExercises = () => useContext(SelectedExercisesContext);
