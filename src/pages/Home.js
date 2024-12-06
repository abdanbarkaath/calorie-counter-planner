import React from 'react';
import { useGlobalContext } from '../context/GlobalState';

export const Home = () => {
  const { calorieGoal, totalCalories, getExerciseRecommendations } = useGlobalContext();
  const remainingCalories = calorieGoal - totalCalories;
  const progressPercent = Math.min((totalCalories / calorieGoal) * 100, 100);

  // Fetch exercise recommendations if calories exceeded
  const exerciseRecommendations =
    remainingCalories < 0 ? getExerciseRecommendations(Math.abs(remainingCalories)) : [];

  return (
    <div className="container">
      <h1>Calorie Counter Dashboard</h1>
      <div className="my-3">
        <h4>Daily Calorie Goal: {calorieGoal} kcal</h4>
        <h5>Calories Consumed: {totalCalories} kcal</h5>
        <h5>Remaining Calories: {remainingCalories >= 0 ? remainingCalories : 0} kcal</h5>
      </div>

      <div className="progress my-3">
        <div
          className={`progress-bar ${remainingCalories < 0 ? 'bg-danger' : 'bg-success'}`}
          role="progressbar"
          style={{ width: `${progressPercent}%` }}
          aria-valuenow={progressPercent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progressPercent.toFixed(0)}%
        </div>
      </div>

      {/* Show Exercise Recommendations */}
      {remainingCalories < 0 && (
        <div className="mt-4">
          <h3>Exercise Recommendations</h3>
          <ul className="list-group">
            {exerciseRecommendations.map((exercise, index) => (
              <li key={index} className="list-group-item">
                <strong>{exercise.name}</strong>: {exercise.duration} minutes to burn{' '}
                {exercise.caloriesBurned} kcal
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
