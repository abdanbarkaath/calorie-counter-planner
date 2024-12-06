import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { Home } from './pages/Home';
import { FoodSearchPage } from './pages/FoodSearchPage';
import { Navbar } from './components/Navbar';
import { FoodSummaryPage } from './pages/FoodSummaryPage';

// Protected Route for Admin Dashboard
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('adminToken'));
  return isAuthenticated ? children : <Navigate to="/admin-login" />;
};

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food-search" element={<FoodSearchPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/food-summary" element={<FoodSummaryPage />} />
      </Routes>
    </Router>
  );
};
