import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AdminLogin from '../AdminLogin';

jest.mock('axios'); // Mock axios
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('AdminLogin Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
    jest.spyOn(window.localStorage.__proto__, 'setItem'); // Spy on localStorage.setItem
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate); // Mock useNavigate
  });

  test('stores token and navigates on successful login', async () => {
    const mockedToken = 'mocked-jwt-token';

    // Mock successful login response
    axios.post.mockResolvedValueOnce({
      data: { token: mockedToken },
    });

    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Enter username'), {
      target: { value: 'adminuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'adminpass' },
    });

    // Simulate login submission
    fireEvent.click(screen.getByText('Login'));

    // Wait for assertions
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('adminToken', mockedToken);
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(mockNavigate).toHaveBeenCalledWith('/admin-dashboard');
    });
  });

  test('does not allow login with empty username or password', async () => {
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    // Leave fields empty and click the login button
    fireEvent.click(screen.getByText('Login'));

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Both username and password are required.')).toBeInTheDocument();
    });

    // Ensure the API was not called
    expect(axios.post).not.toHaveBeenCalled();
  });

  test('displays error message for invalid credentials', async () => {
    // Mock failed login response
    axios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Enter username'), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'wrongpass' },
    });

    // Simulate login submission
    fireEvent.click(screen.getByText('Login'));

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials. Please try again.')).toBeInTheDocument();
    });
  });
});
