
const BASE_URL = 'http://localhost:8080';

export const AuthService = {
  async signup(userData) {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const token = response.headers.get('Authorization');
      if (token) {
        localStorage.setItem('jwt', token);
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    const token = this.getToken(); 

    if (!token) {
      throw new Error('No token available');
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/current-user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch current user');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  getToken() {
    return localStorage.getItem('jwt');
  },

  async authenticatedRequest(url, options = {}) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token available');
    }
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    return response.json();
  },

  logout() {
    localStorage.removeItem('jwt');
  },
};
