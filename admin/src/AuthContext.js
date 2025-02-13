import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
