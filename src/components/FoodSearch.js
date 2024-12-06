import React from 'react';

export const FoodSearch = ({ searchResults, addToLog, currentPage, setCurrentPage, resultsPerPage }) => {
  // Calculate paginated results
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedResults = searchResults.slice(startIndex, startIndex + resultsPerPage);
  const totalPages = Math.ceil(searchResults.length / resultsPerPage);

  return (
    <div>
      <h2>Search Results:</h2>
      <ul className="list-group">
        {paginatedResults.length > 0 ? (
          paginatedResults.map((food) => (
            <li key={food.tag_id || food.nix_item_id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <img src={food.photo?.thumb || 'default_thumb.jpg'} alt={food.food_name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                <span>
                  {food.food_name} (Calories: {food.nf_calories || food.serving_qty})
                </span>
                {food.tag_id && <span className="badge bg-info ms-2">Common</span>}
                {food.nix_item_id && <span className="badge bg-warning ms-2">Branded</span>}
                {food.tag_id && (
                  <div>
                    <p>Protein: {food.nf_protein}g</p>
                    <p>Fat: {food.nf_total_fat}g</p>
                    <p>Carbs: {food.nf_total_carbohydrate}g</p>
                  </div>
                )}
              </div>
              <button onClick={() => addToLog(food)} className="btn btn-sm btn-success">
                Log
              </button>
            </li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination-controls mt-3">
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)} className="btn btn-secondary me-2">
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)} className="btn btn-secondary">
            Next
          </button>
        )}
      </div>
    </div>
  );
};
