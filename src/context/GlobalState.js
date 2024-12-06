import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [dailyLog, setDailyLog] = useState([]);
  const [calorieGoal, setCalorieGoal] = useState(2000); // Default goal
  const [totalCalories, setTotalCalories] = useState(0);

  // Function to add food item to log and update total calories
  const addToLog = (food) => {
    const foodEntry = {
      name: food.food_name,                  // Food name
      calories: food.nf_calories || 0,      // Calories (fallback to 0 if undefined)
      servingQty: food.serving_qty || 1,    // Serving quantity
      servingUnit: food.serving_unit || '', // Serving unit
      fat: food.nf_total_fat || 0,          // Total fat
      protein: food.nf_protein || 0,        // Protein
      carbs: food.nf_total_carbohydrate || 0, // Carbohydrates
      time: new Date().toLocaleString(),    // Current timestamp when logged
    };

    setDailyLog([...dailyLog, foodEntry]);
    setTotalCalories((prevTotal) => prevTotal + foodEntry.calories);
  };

  // Function to clear the daily log
  const clearLog = () => {
    setDailyLog([]); // Clear the daily log
    setTotalCalories(0); // Reset total calories
  };

  // Function to update calorie goal
  const updateCalorieGoal = (goal) => {
    setCalorieGoal(goal);
  };

  // Function to get exercise recommendations
  const getExerciseRecommendations = (excessCalories) => {
    // Hardcoded exercise data
    const exercises = [
      { name: "Running", caloriesPerMinute: 10 },
      { name: "Cycling", caloriesPerMinute: 8 },
      { name: "Jumping Rope", caloriesPerMinute: 12 },
      { name: "Swimming", caloriesPerMinute: 7 },
      { name: "Walking", caloriesPerMinute: 4 },
    ];
  
    // Calculate recommendations
    const recommendations = exercises.map((exercise) => {
      const duration = Math.ceil(excessCalories / exercise.caloriesPerMinute); // in minutes
      return {
        name: exercise.name,
        duration,
        caloriesBurned: duration * exercise.caloriesPerMinute,
      };
    });
  
    return recommendations;
  };
  

  return (
    <GlobalContext.Provider
      value={{
        dailyLog,
        calorieGoal,
        totalCalories,
        addToLog,
        updateCalorieGoal,
        clearLog,
        getExerciseRecommendations,
        setTotalCalories,
        setDailyLog
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
