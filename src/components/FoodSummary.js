import React from 'react';

export const FoodSummary = ({ loggedFoods, onDelete }) => {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h4>Daily Log</h4>
        {loggedFoods.length === 0 ? (
          <p>No food logged</p>
        ) : (
          <ul className="list-group mt-3">
            {loggedFoods.map((food, index) => (
              <li key={index} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>{food.name}</h5>
                    <p>
                      Calories: {food.calories} kcal | Serving: {food.servingQty}{' '}
                      {food.servingUnit}
                    </p>
                    <p>
                      Protein: {food.protein}g | Fat: {food.fat}g | Carbs: {food.carbs}g
                    </p>
                    <small>Logged at: {food.time}</small>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
