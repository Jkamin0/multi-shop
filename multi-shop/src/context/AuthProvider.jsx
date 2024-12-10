import React, { createContext, useState, useEffect, useContext } from "react";
import useApi from "../hooks/UseApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [adminSettings, setAdminSettings] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const api = useApi();

  useEffect(() => {
    const fetchAdminSettings = async () => {
      try {
        const response = await api.getAdminSettings();
        setAdminSettings(response.data?.admin);
      } catch (error) {
        console.error("Failed to fetch admin settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminSettings();
  }, []);

  const login = (username, password) => {
    if (!adminSettings) {
      console.error("Admin settings not loaded.");
      return false;
    }

    if (
      username === adminSettings.username &&
      password === adminSettings.password
    ) {
      setIsAuthenticated(true);
      return true;
    } else {
      console.error("Invalid credentials.");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
