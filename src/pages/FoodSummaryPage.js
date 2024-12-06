import React from 'react';
import { FoodSummary } from '../components/FoodSummary';
import { useGlobalContext } from '../context/GlobalState';

export const FoodSummaryPage = () => {
  const { dailyLog, setDailyLog, setTotalCalories } = useGlobalContext();

  // Delete food item
  const handleDelete = (index) => {
    const foodToRemove = dailyLog[index];
    const updatedLog = dailyLog.filter((_, i) => i !== index);
    setDailyLog(updatedLog); // Update the log
    setTotalCalories((prevTotal) => prevTotal - foodToRemove.calories); // Adjust total calories
  };

  return <FoodSummary loggedFoods={dailyLog} onDelete={handleDelete} />;
};
