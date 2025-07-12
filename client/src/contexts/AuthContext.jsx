import axios from "../utils/axios"; // <- custom axios instance

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/user/profile");
        setUser(data.profile); // assuming data.profile structure
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post("/user/login", { email, password });
      const { data } = await axios.get("/user/profile");
      setUser(data.profile);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const signup = async ({ name, email, password }) => {
    try {
      await axios.post("/user/new", { name, email, password, role: "user" });
      const { data } = await axios.get("/user/profile");
      setUser(data.profile);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  const logout = async () => {
    try {
      await axios.get("/user/logout");
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
