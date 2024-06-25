import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserForm.css';

const LoginForm = ({ onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/login', formData)
      .then(response => {
        console.log('Login successful', response);
        alert('Login successful');
        // Redirect to dashboard or another page upon successful login if needed
      })
      .catch(error => {
        console.error('Error logging in', error);
        alert('Invalid credentials');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <div className="forgot-password-link-container">
        <Link to="/ForgotPasswordForm" className="forgot-password-link">Forgot Password?</Link>
      </div>

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
