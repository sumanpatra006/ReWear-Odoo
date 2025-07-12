import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axios";
const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/users/profile");
        setUser(data.profile);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* — standard user login — */
  const login = async (email, password) => {
    try {
      await axios.post("/users/login", { email, password });
      const { data } = await axios.get("/users/profile");
      setUser({
        // new
        ...data.profile,
        isAdmin: data.profile.role === "admin",
      });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  /* — ADMIN login — */
  const loginAdmin = async (email, password) => {
    try {
      await axios.post("/admin/login", { email, password });
      const { data } = await axios.get("/users/profile"); // now contains role:"admin"
      setUser({ ...data.profile, isAdmin: data.profile.role === "admin" });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  /* — signup — */
  const signup = async ({ name, email, password }) => {
    try {
      await axios.post("/users/new", { name, email, password, role: "user" });
      const { data } = await axios.get("/users/profile");
      setUser(data.profile);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || err.message,
      };
    }
  };

  /* — logout — */
  const logout = async () => {
    try {
      await axios.get("/users/logout"); // clears cookie on backend
    } finally {
      setUser(null);
    }
  };

  /* — value memo (simple) — */
  const value = { user, login, loginAdmin, signup, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {/* render children only after initial check */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
