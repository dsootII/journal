'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define the shape of the context value
interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  accessToken: null,
  login: () => {},
  logout: () => {},
});

// Define the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    router.push('/journal');  // Redirect to the home page or any other page
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    router.push('/login');  // Redirect to the login page
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);