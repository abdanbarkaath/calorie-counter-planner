import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FoodSummaryPage } from '../FoodSummaryPage';
import { GlobalProvider, useGlobalContext } from '../../context/GlobalState';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../context/GlobalState', () => {
  const actualModule = jest.requireActual('../../context/GlobalState');
  return {
    ...actualModule,
    useGlobalContext: jest.fn(),
  };
});

describe('FoodSummaryPage Component', () => {
  const mockSetDailyLog = jest.fn();
  const mockSetTotalCalories = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useGlobalContext.mockReturnValue({
      dailyLog: [
        {
          name: 'Apple',
          calories: 95,
          servingQty: 1,
          servingUnit: 'piece',
          protein: 0.5,
          fat: 0.3,
          carbs: 25,
          time: '10:00 AM',
        },
        {
          name: 'Banana',
          calories: 105,
          servingQty: 1,
          servingUnit: 'piece',
          protein: 1.3,
          fat: 0.4,
          carbs: 27,
          time: '11:00 AM',
        },
      ],
      setDailyLog: mockSetDailyLog,
      setTotalCalories: mockSetTotalCalories,
    });
  });

  test('renders food items correctly', () => {
    render(
      <BrowserRouter>
        <FoodSummaryPage />
      </BrowserRouter>
    );

    // Check if food items are displayed
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();

    // Check if calories and other details are displayed
    expect(screen.getByText(/Calories: 95 kcal/i)).toBeInTheDocument();
    expect(screen.getByText(/Calories: 105 kcal/i)).toBeInTheDocument();
    expect(screen.getByText(/Protein: 0.5g/i)).toBeInTheDocument();
    expect(screen.getByText(/Carbs: 25g/i)).toBeInTheDocument();
  });

  test('handles deleting a food item', () => {
    render(
      <BrowserRouter>
        <FoodSummaryPage />
      </BrowserRouter>
    );

    // Click the delete button for the first food item
    fireEvent.click(screen.getAllByText('Delete')[0]);

    // Verify the log and total calories are updated
    expect(mockSetDailyLog).toHaveBeenCalledWith([
      {
        name: 'Banana',
        calories: 105,
        servingQty: 1,
        servingUnit: 'piece',
        protein: 1.3,
        fat: 0.4,
        carbs: 27,
        time: '11:00 AM',
      },
    ]);
    expect(mockSetTotalCalories).toHaveBeenCalledWith(expect.any(Function));
  });

  test('displays "No food logged" if the daily log is empty', () => {
    useGlobalContext.mockReturnValue({
      dailyLog: [],
      setDailyLog: mockSetDailyLog,
      setTotalCalories: mockSetTotalCalories,
    });

    render(
      <BrowserRouter>
        <FoodSummaryPage />
      </BrowserRouter>
    );

    expect(screen.getByText('No food logged')).toBeInTheDocument();
  });
});
