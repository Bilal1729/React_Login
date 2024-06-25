import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

const ForgotPasswordForm = ({ onResetSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    axios.post('http://localhost:5000/api/reset-password', {
      email: formData.email,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword
    })
      .then(response => {
        console.log('Password reset successful', response);
        alert('Password reset successful');
        onResetSuccess();
      })
      .catch(error => {
        console.error('Error resetting password', error);
        alert('Error resetting password');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

      <label htmlFor="oldPassword">Old Password:</label>
      <input type="password" id="oldPassword" name="oldPassword" value={formData.oldPassword} onChange={handleChange} required />

      <label htmlFor="newPassword">New Password:</label>
      <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} required />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ForgotPasswordForm;
