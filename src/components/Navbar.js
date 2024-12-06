import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('adminToken'); // Changed for JWT

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // JWT Token
    navigate('/admin-login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Calorie Counter</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/food-search">Food Search</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/food-summary">Food Summary</Link>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <>
                  <Link className="nav-link" to="/admin-dashboard">Admin</Link>
                  <button
                    className="btn btn-link nav-link"
                    style={{ textDecoration: 'none' }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link className="nav-link" to="/admin-login">Admin</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
