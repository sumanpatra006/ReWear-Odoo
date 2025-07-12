import { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("rewear_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fetch user profile when user is available
  useEffect(() => {
    if (user && !userProfile) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    setProfileLoading(true);
    try {
      const response = await getUserProfile();
      setUserProfile(response);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setProfileLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Simulate API call
      const mockUser = {
        id: "1",
        email,
        name: "John Doe",
        points: 150,
        isAdmin: email === "admin@rewear.com",
      };
      setUser(mockUser);
      localStorage.setItem("rewear_user", JSON.stringify(mockUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate API call
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        points: 0,
        isAdmin: false,
      };
      setUser(newUser);
      localStorage.setItem("rewear_user", JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setUserProfile(null);
    localStorage.removeItem("rewear_user");
  };

  const value = {
    user,
    userProfile,
    profileLoading,
    fetchUserProfile,
    login,
    signup,
    logout,
    loading: loading || profileLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
