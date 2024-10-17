import React, { useEffect, useState } from 'react';
import { AuthService } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        console.log("Current user: ", currentUser);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      await AuthService.login(credentials);
      setSuccess('Login successful!');
  
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
        }
      }
  
      setCredentials({ username: '', password: '' });
    } catch (err) {
      if (err.message === 'Your email is not verified. Please verify your email before logging in.') {
        setError(err.message);
      } else {
        setError(err.message || 'Failed to log in.');
      }
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
            {success && <div className="alert alert-success mb-4">{success}</div>}

            <div className="mb-3">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
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
                value={credentials.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-100">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
