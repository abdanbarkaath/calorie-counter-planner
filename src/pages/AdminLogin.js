import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setError('Both username and password are required.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5001/api/admin/login', {
        username,
        password,
      });
  
      // Store the JWT token in localStorage
      localStorage.setItem('adminToken', response.data.token);
  
      // Navigate to Admin Dashboard
      navigate('/admin-dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
