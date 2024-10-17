import React, { useState } from 'react';
import { AuthService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await AuthService.signup(userData);
      setSuccess('Signup successful! Please log in.');
      setUserData({ firstname: '', lastname: '', username: '', email: '', password: '' });
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
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-100">
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
