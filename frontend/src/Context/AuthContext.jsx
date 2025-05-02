// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user: { name, email, role }
  const [loading, setLoading] = useState(true); // loading state for initial check

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/get", {
          withCredentials: true,
        });
        setUser(res.data);
        console.log("User data fetched:", res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔁 Hook to use AuthContext anywhere
export const useAuth = () => useContext(AuthContext);
