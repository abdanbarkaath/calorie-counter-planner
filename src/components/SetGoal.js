import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalState';

export const SetGoal = () => {
  const { calorieGoal, updateCalorieGoal } = useGlobalContext();
  const [newGoal, setNewGoal] = useState(calorieGoal);

  const handleGoalUpdate = () => {
    updateCalorieGoal(newGoal);
  };

  return (
    <div className="d-flex row gap-2">
      <input
        type="number"
        value={newGoal}
        onChange={(e) => setNewGoal(e.target.value)}
        className="form-control me-2"
        placeholder="Enter your calorie goal"
      />
      <button onClick={handleGoalUpdate} className="btn btn-success">Set Calorie Goal</button>
    </div>
  );
};
