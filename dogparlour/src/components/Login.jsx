import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export default function Login({ setUser }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  
  const validateForm = () => {
    const errors = {};
    if (!credentials.username) errors.username = "Username is required";
    if (!credentials.password) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Ensure the form is validated
  
    setLoading(true);
    setError(null);
  
    try {
      await AuthService.login(credentials);
      const currentUser = await AuthService.getCurrentUser();
      setUser(currentUser);
  
      const needsProfileUpdate = !currentUser.firstName || !currentUser.lastName || !currentUser.phoneNumber || !currentUser.dogs || currentUser.dogs.length === 0;
      if (needsProfileUpdate) {
        navigate("/profile");
      } else {
        const hasAdminAuthority = currentUser.authorities.some(authority => authority.authority === "ROLE_ADMIN");
        if (hasAdminAuthority) {
          navigate("/admin");
        } else {
          navigate("/");
          window.location.reload();
        }
      }
    } catch (err) {
      setError(err.message === "Invalid username or password" ? "Incorrect credentials. Please try again." : err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: '60px' }}>
      <div className="row w-100">
        <div className="col-md-4 mx-auto">
          <form onSubmit={handleSubmit} className="bg-light shadow p-4 rounded">
            <h2 className="text-center mb-4">Login</h2>
            {error && <div className="alert alert-danger mb-4">{error}</div>}

            <div className="mb-3">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                required
              />
              {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                required
              />
              {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-100">
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <div className="text-center mt-3">
              <p className="mb-0">
                Don't have an account? <Link to="/register" className="text-primary">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
