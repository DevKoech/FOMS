import { createContext, useEffect, useState } from 'react';
import { API } from '../api/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  console.log('[AuthContext] Initializing with token from localStorage:', storedToken ? 'TOKEN EXISTS' : 'NO TOKEN');
  
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))||null
  );

  const [token, setToken] = useState(storedToken);
  const [loading, setLoading] = useState(true);
  
  const login = (token, userData) => {
    console.log('[AuthContext.login] Setting token:', token ? 'TOKEN EXISTS' : 'NO TOKEN');
    setToken(token)
    setUser(userData);

    localStorage.setItem('token', token);
    console.log('[AuthContext.login] Token saved to localStorage');
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    setLoading(false);
  }, []);



  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};