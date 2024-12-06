import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FoodSearchPage } from '../FoodSearchPage';
import { useGlobalContext } from '../../context/GlobalState';
import useNutritionixApi from '../../hooks/useNutritionixApi';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../context/GlobalState', () => {
  const actualModule = jest.requireActual('../../context/GlobalState');
  return {
    ...actualModule,
    useGlobalContext: jest.fn(),
  };
});

jest.mock('../../hooks/useNutritionixApi', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('FoodSearchPage Component', () => {
  const mockAddToLog = jest.fn();
  const mockSearchProducts = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useGlobalContext.mockReturnValue({
      addToLog: mockAddToLog,
    });

    useNutritionixApi.mockReturnValue({
      searchProducts: mockSearchProducts,
      results: [
        {
          food_name: 'Apple',
          nf_calories: 95,
          serving_qty: 1,
          serving_unit: 'piece',
          photo: { thumb: 'apple_thumb.jpg' },
          tag_id: 'common_apple',
        },
        {
          food_name: 'Banana',
          nf_calories: 105,
          serving_qty: 1,
          serving_unit: 'piece',
          photo: {}, // Missing thumbnail
          nix_item_id: 'branded_banana',
        },
      ],
      currentPage: 1,
      setCurrentPage: jest.fn(),
      resultsPerPage: 10,
      loading: false,
      error: null,
    });
  });

  test('renders search and calorie goal sections', () => {
    render(
      <BrowserRouter>
        <FoodSearchPage />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Search for food...')).toBeInTheDocument();
    expect(screen.getByText('Set Calorie Goal')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('handles search input and submission', async () => {
    render(
      <BrowserRouter>
        <FoodSearchPage />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search for food...');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'apple' } });
    expect(searchInput.value).toBe('apple');

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSearchProducts).toHaveBeenCalledWith('apple');
    });
  });

  test('displays loading indicator during search', () => {
    useNutritionixApi.mockReturnValueOnce({
      ...useNutritionixApi(),
      loading: true,
    });

    render(
      <BrowserRouter>
        <FoodSearchPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message if search fails', () => {
    useNutritionixApi.mockReturnValueOnce({
      ...useNutritionixApi(),
      error: 'Network Error',
    });

    render(
      <BrowserRouter>
        <FoodSearchPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Network Error')).toBeInTheDocument();
  });

  test('calls addToLog when a food item is logged', () => {
    render(
      <BrowserRouter>
        <FoodSearchPage />
      </BrowserRouter>
    );

    const logButtons = screen.getAllByText('Log');
    fireEvent.click(logButtons[0]); // Log the first item

    expect(mockAddToLog).toHaveBeenCalledWith({
      food_name: 'Apple',
      nf_calories: 95,
      serving_qty: 1,
      serving_unit: 'piece',
      photo: { thumb: 'apple_thumb.jpg' },
      tag_id: 'common_apple',
    });
  });
});
