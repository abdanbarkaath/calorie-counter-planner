import React, { useState } from 'react';
import { FoodSearch } from '../components/FoodSearch';
import { SetGoal } from '../components/SetGoal';
import { useGlobalContext } from '../context/GlobalState';
import useNutritionixApi from '../hooks/useNutritionixApi';

export const FoodSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { addToLog } = useGlobalContext();
  const { searchProducts, results, currentPage, setCurrentPage, resultsPerPage, loading, error } = useNutritionixApi();

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchProducts(searchQuery);
  };

  return (
    <div className="container">
      <h1>Search for Food and Set Calorie Goal</h1>

      {/* Row for Search and Goal */}
      <div className="row my-4">
        {/* Search Food Section */}
        <div className="col-md-6">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for food..."
              className="form-control me-2"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>

        {/* Set Calorie Goal Section */}
        <div className="col-md-6">
          <SetGoal />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Food Search Results */}
      <FoodSearch
        searchResults={results}
        addToLog={addToLog}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        resultsPerPage={resultsPerPage}
      />
    </div>
  );
};
