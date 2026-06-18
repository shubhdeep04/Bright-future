// import { createContext, useContext, useState, useEffect } from "react";
// import api from "../utils/api";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const stored = localStorage.getItem("bf_user");
//     const token = localStorage.getItem("bf_token");
//     if (stored && token) {
//       setUser(JSON.parse(stored));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     const { data } = await api.post("/auth/login", { email, password });
//     localStorage.setItem("bf_token", data.token);
//     localStorage.setItem("bf_user", JSON.stringify(data));
//     setUser(data);
//     return data;
//   };

//   const register = async (payload) => {
//     const { data } = await api.post("/auth/register", payload);
//     localStorage.setItem("bf_token", data.token);
//     localStorage.setItem("bf_user", JSON.stringify(data));
//     setUser(data);
//     return data;
//   };

//   const logout = () => {
//     localStorage.removeItem("bf_token");
//     localStorage.removeItem("bf_user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
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

  const persistSession = (data) => {
    localStorage.setItem("bf_token", data.token);
    localStorage.setItem("bf_user", JSON.stringify(data));
    setUser(data);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    persistSession(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    // Registration may require email verification, so only persist when a token is returned.
    if (data.token) {
      persistSession(data);
    }
    return data;
  };

  // Google Sign-In: credential is the ID token returned by Google's button
  const googleLogin = async (credential) => {
    const { data } = await api.post("/auth/google", { credential });
    persistSession(data);
    return data;
  };

  // Step 1 of email-OTP flow: send a 6-digit code to the email.
  // `name` is only required the first time (new account signup).
  const requestOtp = async (email, name) => {
    const { data } = await api.post("/auth/otp/request", { email, name });
    return data;
  };

  // Step 2 of email-OTP flow: verify the code and log in.
  const verifyOtp = async (email, otp) => {
    const { data } = await api.post("/auth/otp/verify", { email, otp });
    persistSession(data);
    return data;
  };

  // Email verification: verify registration email with token
  const verifyEmail = async (token, email) => {
    const { data } = await api.post("/auth/verify-email", { token, email });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("bf_token");
    localStorage.removeItem("bf_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, googleLogin, requestOtp, verifyOtp, verifyEmail, logout, loading, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);