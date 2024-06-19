import React, { createContext, useContext, useEffect, useState } from "react";
import { saveToken, getToken, deleteToken } from "../utils/tokenStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken("auth_token");
      if (token) {
        setIsAuthenticated(true);
      }
    };

    loadToken();
  }, []);

  const signIn = async (token) => {
    await saveToken("auth_token", token);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await deleteToken("auth_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
