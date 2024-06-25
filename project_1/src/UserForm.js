import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate each field as it changes
    let errorMessages = { ...errors };

    switch (name) {
      case 'name':
        errorMessages.name = value.trim() ? (value.trim().length > 20 ? 'Name should be less than or equal to 20 characters' : '') : 'Name is required';
        break;
      case 'dob':
        errorMessages.dob = value.trim() ? '' : 'Date of Birth is required';
        break;
      case 'gender':
        errorMessages.gender = value ? '' : 'Gender is required';
        break;
      case 'phone':
        errorMessages.phone = value.trim() ? (/^\d{10}$/i.test(value.trim()) ? '' : 'Phone number must be 10 digits') : 'Phone number is required';
        break;
      case 'email':
        errorMessages.email = value.trim() ? (/\S+@\S+\.\S+/.test(value.trim()) ? '' : 'Email address is invalid') : 'Email is required';
        break;
      case 'password':
        errorMessages.password = value.trim() ? (value.trim().length >= 6 ? '' : 'Password must be at least 6 characters long') : 'Password is required';
        break;
      case 'confirmPassword':
        errorMessages.confirmPassword = value === formData.password ? '' : 'Passwords do not match';
        break;
      default:
        break;
    }

    setErrors(errorMessages);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios.post('http://localhost:5000/api/register', formData)
        .then(response => {
          console.log('Registration successful', response);
          alert('Registration successful');
          // Optionally, you can redirect to another page after successful registration
        })
        .catch(error => {
          console.error('Error registering', error);
          alert('Error registering');
        });
    } else {
      console.log('Form has errors, please correct them');
    }
  };

  const validateForm = () => {
    const { name, dob, gender, phone, email, password, confirmPassword } = formData;

    let errorMessages = {};

    if (!name.trim()) {
      errorMessages.name = 'Name is required';
    } else if (name.trim().length > 20) {
      errorMessages.name = 'Name should be less than or equal to 20 characters';
    }

    if (!dob.trim()) {
      errorMessages.dob = 'Date of Birth is required';
    }

    if (!gender) {
      errorMessages.gender = 'Gender is required';
    }

    if (!phone.trim()) {
      errorMessages.phone = 'Phone number is required';
    } else if (!/^\d{10}$/i.test(phone.trim())) {
      errorMessages.phone = 'Phone number must be 10 digits';
    }

    if (!email.trim()) {
      errorMessages.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errorMessages.email = 'Email address is invalid';
    }

    if (!password.trim()) {
      errorMessages.password = 'Password is required';
    } else if (password.trim().length < 6) {
      errorMessages.password = 'Password must be at least 6 characters long';
    }

    if (password !== confirmPassword) {
      errorMessages.confirmPassword = 'Passwords do not match';
    }

    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0; // Return true if no errors
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
        {errors.dob && <p className="error">{errors.dob}</p>}
      </div>

      <div className="form-group">
        <label>Gender:</label>
        <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="error">{errors.gender}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default UserForm;
