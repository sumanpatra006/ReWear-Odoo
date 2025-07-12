const API_BASE_URL = "http://localhost:5000/api/v1";

// Helper function to get auth token
const getAuthToken = () => {
  const user = localStorage.getItem("rewear_user");
  return user ? JSON.parse(user).token : null;
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// User profile API
export const getUserProfile = async () => {
  return apiCall("/users/profile");
};

// Auth APIs (placeholder for future implementation)
export const loginUser = async (credentials) => {
  return apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const signupUser = async (userData) => {
  return apiCall("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

// Items APIs (placeholder for future implementation)
export const getItems = async () => {
  return apiCall("/items");
};

export const createItem = async (itemData) => {
  return apiCall("/items", {
    method: "POST",
    body: JSON.stringify(itemData),
  });
};

export default {
  getUserProfile,
  loginUser,
  signupUser,
  getItems,
  createItem,
};
