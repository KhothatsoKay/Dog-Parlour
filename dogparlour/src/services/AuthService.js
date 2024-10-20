const BASE_URL = import.meta.env.VITE_API_URL;
console.log(BASE_URL);
export const AuthService = {
  async signup(userData) {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      console.log("Sign Up successful", response.json);
    } catch (error) {
      throw error;
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorResponse = await response.text(); 
        throw new Error(errorResponse.message || "Invalid username or password");
      }
  
      const token = response.headers.get("Authorization");
      if (token) {
        localStorage.setItem("jwt", token);
      } else {
        throw new Error("Login failed, no token received.");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },  

  async getCurrentUser() {
    const token = this.getToken();

    if (!token) {
      console.error("No token found, user might not be logged in.");
      throw new Error("Please log in!");
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/current-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch user, response:", response);
        throw new Error("Failed to fetch current user");
      }

      const userData = await response.json();
      console.log("User data fetched successfully:", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  getToken() {
    return localStorage.getItem("jwt");
  },

  async authenticatedRequest(url, options = {}) {
    const token = this.getToken();
    if (!token) {
      throw new Error("No token available");
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
      throw new Error("Request failed");
    }

    return response.json();
  },

  logout() {
    localStorage.removeItem("jwt");
  },

  async updateProfile(updatedUser) {
    const token = localStorage.getItem("jwt");
    if (!token) throw new Error("No token available");

    const response = await fetch(`${BASE_URL}/api/auth/update-user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error("Profile update failed");
    }

    console.log(response);
  },
};
