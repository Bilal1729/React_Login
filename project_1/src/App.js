import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './UserForm';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/UserForm" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/LoginForm" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/ForgotPasswordForm" className="nav-link">Forgot Password</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/UserForm" element={<UserForm />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/ForgotPasswordForm" element={<ForgotPasswordForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
