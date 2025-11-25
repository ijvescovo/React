import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Simular verificación de token al cargar
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simular validación
      if (email && password) {
        const mockUser = {
          id: 1,
          email: email,
          name: email.split('@')[0],
          role: 'user'
        };
        const mockToken = 'token_' + Math.random().toString(36).substr(2, 9);
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setToken(mockToken);
        setUser(mockUser);
        resolve(mockUser);
      } else {
        reject(new Error('Email o contraseña inválidos'));
      }
    });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Registro
  const register = (email, password, name) => {
    return new Promise((resolve, reject) => {
      if (email && password && name) {
        const mockUser = {
          id: Math.random(),
          email: email,
          name: name,
          role: 'user'
        };
        const mockToken = 'token_' + Math.random().toString(36).substr(2, 9);
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setToken(mockToken);
        setUser(mockUser);
        resolve(mockUser);
      } else {
        reject(new Error('Todos los campos son requeridos'));
      }
    });
  };

  const isAuthenticated = () => !!user && !!token;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        loading, 
        login, 
        logout, 
        register,
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
