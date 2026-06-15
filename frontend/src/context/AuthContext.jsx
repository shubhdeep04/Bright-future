import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("bf_user");
    const token = localStorage.getItem("bf_token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("bf_token", data.token);
    localStorage.setItem("bf_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("bf_token", data.token);
    localStorage.setItem("bf_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("bf_token");
    localStorage.removeItem("bf_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
