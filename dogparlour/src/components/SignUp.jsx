import React, { useState } from 'react';
import { AuthService } from '../services/AuthService';
import { useNavigate, Link } from 'react-router-dom'; 

export default function SignUp() {
  const [userData, setUserData] = useState({ 
    firstName: '', 
    lastName: '', 
    username: '', 
    email: '', 
    password: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6; 
  const validateUsername = (username) => username.length >= 4; 

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    if (!userData.firstName) errors.firstName = "First Name is required";
    if (!userData.lastName) errors.lastName = "Last Name is required";
    if (!validateUsername(userData.username)) errors.username = "Username must be at least 4 characters long";
    if (!validateEmail(userData.email)) errors.email = "Email is not valid";
    if (!validatePassword(userData.password)) errors.password = "Password must be at least 6 characters long";

    setFormErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      await AuthService.signup(userData);
      setSuccess('Signup successful! Please log in.');
      setUserData({ firstName: '', lastName: '', username: '', email: '', password: '' });
      setTimeout(() => {
        navigate("/login");
      }, 2000); 
    } catch (err) {
      setError(err.message || 'Failed to sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: '60px' }}>
      <div className="row w-100">
        <div className="col-md-4 mx-auto">
          <form onSubmit={handleSubmit} className="bg-light shadow p-4 rounded">
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <div className="alert alert-danger mb-4">{error}</div>}
            {success && <div className="alert alert-success mb-4">{success}</div>}

            <div className="mb-3">
              <label className="form-label" htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                required
              />
              {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                required
              />
              {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                required
              />
              {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                required
              />
              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                required
              />
              {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-100">
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            <div className="text-center mt-3">
              <p className="mb-0">
                Already have an account? <Link to="/login" className="text-primary">Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
