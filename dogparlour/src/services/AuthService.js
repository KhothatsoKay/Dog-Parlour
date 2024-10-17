const BASE_URL = "http://localhost:8080";

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
        let errorResponse;

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          errorResponse = await response.json();
        } else {
          errorResponse = await response.text();
        }

        if (response.status === 401) {
          if (
            typeof errorResponse === "string" &&
            errorResponse.includes("Email is not verified")
          ) {
            throw new Error(
              "Your email is not verified. Please verify your email before logging in."
            );
          } else if (
            errorResponse.message &&
            errorResponse.message.includes("Email is not verified")
          ) {
            throw new Error(
              "Your email is not verified. Please verify your email before logging in."
            );
          }
        }

        throw new Error(errorResponse || "Login failed");
      }

      const token = response.headers.get("Authorization");
      if (token) {
        localStorage.setItem("jwt", token);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    const token = this.getToken();

    if (!token) {
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
        throw new Error("Failed to fetch current user");
      }

      return await response.json();
    } catch (error) {
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
