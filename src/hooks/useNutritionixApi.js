import { useState } from 'react';
import axios from 'axios';

const useNutritionixApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const searchProducts = async (query) => {
    setLoading(true);
    try {
      // Step 1: Perform initial search for both common and branded foods
      const res = await axios.get('https://trackapi.nutritionix.com/v2/search/instant', {
        headers: {
          'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
          'x-app-key': process.env.REACT_APP_NUTRITIONIX_APP_KEY,
        },
        params: {
          query,
          common: true,
          branded: true,
        },
      });

      // Combine common and branded results
      let combinedResults = [...res.data.common, ...res.data.branded];

      // Step 2: Fetch detailed nutrition info for common foods
      const commonFoods = await Promise.all(
        res.data.common.map(async (food) => {
          const nutrientRes = await axios.post(
            'https://trackapi.nutritionix.com/v2/natural/nutrients',
            { query: food.food_name },
            {
              headers: {
                'x-app-id': process.env.REACT_APP_NUTRITIONIX_APP_ID,
                'x-app-key': process.env.REACT_APP_NUTRITIONIX_APP_KEY,
                'Content-Type': 'application/json',
              },
            }
          );
          return nutrientRes.data.foods[0]; // Get the first item in the returned foods array
        })
      );

      // Merge common foods with branded foods
      combinedResults = [...commonFoods, ...res.data.branded];

      // Step 3: Remove duplicates based on unique ID (either 'tag_id' or 'nix_item_id')
      const uniqueResults = combinedResults.reduce((acc, current) => {
        const id = current.tag_id || current.nix_item_id;
        if (!acc.find(item => (item.tag_id || item.nix_item_id) === id)) {
          acc.push(current);
        }
        return acc;
      }, []);

      setResults(uniqueResults);
      setCurrentPage(1); // Reset to first page on new search
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchProducts,
    results,
    currentPage,
    setCurrentPage,
    resultsPerPage,
    loading,
    error,
  };
};

export default useNutritionixApi;
